import {mkdir,writeFile,readFile,rename,access,stat} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {Readable} from 'node:stream';
import {spawn} from 'node:child_process';

const extensions={'image/jpeg':'.jpg','image/png':'.png','image/webp':'.webp','image/avif':'.avif','image/gif':'.gif'};
const projectSlugs=['inverter','36v-battery','24v-charger','12v-battery','electric-outboard','energy-selection','3c-selection'];
export default function releasePlugin(){
 let root,building=false;
 return {
  name:'portfolio-local-release',
  configResolved(config){root=config.root},
  configureServer(server){
   // These folders are excluded from Windows file watching. Serve newly generated
   // assets directly rather than relying on Vite's startup public-file inventory.
   for(const directory of ['optimized','published'])server.middlewares.use('/images/'+directory,async(req,res,next)=>{
    if(!['GET','HEAD'].includes(req.method))return next();
    const filename=req.url.split('?')[0].slice(1);
    const allowed=directory==='optimized'?/^[a-f0-9]{64}-\d+-q(?:82|90)\.webp$/:/^[a-f0-9]{64}\.(png|jpg|webp|avif|gif)$/;
    if(!allowed.test(filename))return next();
    const file=path.join(root,'public/images',directory,filename);
    try{
     const info=await stat(file);
     res.setHeader('Content-Type',{'webp':'image/webp','png':'image/png','jpg':'image/jpeg','avif':'image/avif','gif':'image/gif'}[path.extname(file).slice(1)]);
     res.setHeader('Content-Length',info.size);res.setHeader('Cache-Control','no-cache');
     if(req.method==='HEAD'){res.end();return}
     const stream=createReadStream(file);stream.on('error',()=>res.destroy());res.on('close',()=>stream.destroy());stream.pipe(res);
    }catch(error){if(error.code==='ENOENT')next();else next(error)}
   });
   server.middlewares.use('/__portfolio_release',async(req,res)=>{
    res.setHeader('Content-Type','application/json; charset=utf-8');
    const respond=(code,value)=>{res.statusCode=code;res.end(JSON.stringify(value))};
    const origin=req.headers.origin;
    if(req.method!=='POST'||req.headers['x-portfolio-export']!=='1'||!['127.0.0.1','::1','::ffff:127.0.0.1'].includes(req.socket.remoteAddress)||origin!==`http://${req.headers.host}`){respond(403,{error:'仅允许当前本地预览保存'});return}
    if(building){respond(409,{error:'正在打包，请稍候'});return}
    building=true;
    try{
     const request=new Request('http://localhost/__portfolio_release',{method:'POST',headers:req.headers,body:Readable.toWeb(req),duplex:'half'});
     const data=await request.formData(),snapshot=JSON.parse(data.get('snapshot'));
     if(!Array.isArray(snapshot.records)||snapshot.records.length>5000)throw new Error('素材数据格式异常');
     const state={media:{},uploaded:[],hidden:{},storage:{},exportedAt:new Date().toISOString()};
     const assetDirectory=path.join(root,'public/images/published');await mkdir(assetDirectory,{recursive:true});
     for(const record of snapshot.records){
      if(typeof record.key!=='string'||record.key.length>300)throw new Error('素材标识异常');
      if(record.key.startsWith('hidden:')){if(record.hidden)state.hidden[record.key.slice(7)]=true;continue}
      if(!record.part||record.key==='video')continue;
      const file=data.get(record.part),extension=extensions[file?.type];
      if(!extension)throw new Error('无法识别图片格式：'+record.key);
      const bytes=Buffer.from(await file.arrayBuffer());
      const filename=createHash('sha256').update(bytes).digest('hex')+extension;
      await writeFile(path.join(assetDirectory,filename),bytes);
      state.media[record.key]='/images/published/'+filename;
      if(record.projectSlug){
       if(!projectSlugs.includes(record.projectSlug)||!['listing','aplus','products','posters'].includes(record.type))throw new Error('作品图片分类异常');
       state.uploaded.push({key:record.key,projectSlug:record.projectSlug,type:record.type,label:String(record.label||''),width:Number(record.width)||1,height:Number(record.height)||1});
      }
     }
     for(const [key,value] of Object.entries(snapshot.storage||{})){
      if(['jiaoyang-portfolio-copy','jiaoyang-background-framing'].includes(key)||projectSlugs.some(slug=>key==='jiaoyang-collection-order-'+slug))state.storage[key]=value;
     }
     const snapshotPath=path.join(root,'public/published/site.json');
     // Keep the preceding export recoverable before atomically installing the new snapshot.
     const backupDir=path.join(root,'.history/release-snapshots');await mkdir(backupDir,{recursive:true});
     await writeFile(path.join(backupDir,Date.now()+'.json'),await readFile(snapshotPath));
     await writeFile(snapshotPath+'.tmp',JSON.stringify(state,null,2));await rename(snapshotPath+'.tmp',snapshotPath);
     const output=await new Promise((resolve,reject)=>{
      const child=spawn(process.execPath,['scripts/package-release.mjs'],{cwd:root,windowsHide:true});let log='';
      child.stdout.on('data',chunk=>log+=chunk);child.stderr.on('data',chunk=>log+=chunk);
      child.on('error',reject);child.on('exit',code=>code===0?resolve(log):reject(new Error(log.slice(-1800))));
     });
     const marker=output.trim().split('\n').findLast(line=>line.startsWith('RELEASE_RESULT='));
     if(!marker)throw new Error('打包结果未能读取');
     respond(200,JSON.parse(marker.slice('RELEASE_RESULT='.length)));
    }catch(error){respond(500,{error:error.message})}finally{building=false}
   });
  },
  async closeBundle(){
   const directory=path.join(root,'dist');
   try{await access(path.join(directory,'index.html'))}catch{return}
   const html=await readFile(path.join(directory,'index.html'));
   for(const slug of projectSlugs){const target=path.join(directory,'projects',slug);await mkdir(target,{recursive:true});await writeFile(path.join(target,'index.html'),html)}
   await writeFile(path.join(directory,'404.html'),html);
   await writeFile(path.join(directory,'.nojekyll'),'');
  }
 };
}
