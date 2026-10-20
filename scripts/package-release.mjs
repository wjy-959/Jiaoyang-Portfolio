import {cp,mkdir,readFile,writeFile,stat,access,readdir} from 'node:fs/promises';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
let outputSettings={};
try{outputSettings=JSON.parse(await readFile(path.join(root,'.history/release-output.json'),'utf8'))}catch(error){if(error.code!=='ENOENT')throw error}
const stamp=new Date().toISOString().replace(/[:.]/g,'-');
const folder=outputSettings.directory?path.resolve(outputSettings.directory):path.resolve(root,'../本地发布包',stamp);
try{await access(folder);throw new Error('输出文件夹已经存在，请先检查现有发布包，避免覆盖：'+folder)}catch(error){if(error.code!=='ENOENT')throw error}
const snapshot=JSON.parse(await readFile(path.join(root,'public/published/site.json'),'utf8'));
if(!snapshot.exportedAt)throw new Error('请先在本地预览点击「打包发布版本」，保存浏览器中的完整素材。');
function run(command,args,options={}){return new Promise((resolve,reject)=>{
 const child=spawn(command,args,{cwd:root,windowsHide:true,stdio:'inherit',...options});
 child.on('error',reject);child.on('exit',code=>code===0?resolve():reject(new Error('打包步骤失败：'+code)));
})}
await run(process.platform==='win32'?'python':'python3',[path.join(root,'scripts/optimize-media.py'),root]);
// Vite's dev server sets NODE_ENV=development. Do not inherit that value when
// a browser-triggered export launches a production build as its child process.
await run(process.execPath,['node_modules/vite/bin/vite.js','build'],{env:{...process.env,NODE_ENV:'production',SITE_BASE:'/'}});
for(const name of await readdir(path.join(root,'dist/assets'))){
 if(!name.endsWith('.js'))continue;
 const code=await readFile(path.join(root,'dist/assets',name),'utf8');
 if(['__portfolio_release','上传 / 管理图片','点击任意文字修改','调整图片顺序'].some(text=>code.includes(text)))throw new Error('正式包编辑入口检查未通过，停止交付。');
}
await mkdir(path.dirname(folder),{recursive:true});await mkdir(folder);
const source=path.join(folder,'github-source');await mkdir(source);
for(const name of ['src','public','scripts','.github','index.html','package.json','pnpm-lock.yaml','vite.config.js','.gitignore','DEPLOY.md'])await cp(path.join(root,name),path.join(source,name),{recursive:true});
await cp(path.join(root,'dist'),path.join(folder,'static-site'),{recursive:true});
await writeFile(path.join(folder,'使用说明.txt'),'GitHub部署请解压 Jiaoyang-Portfolio.zip，把里面的文件（包含.github文件夹）放到仓库根目录。按github-source/DEPLOY.md设置GitHub Pages。\nJiaoyang-Portfolio-static.zip 是根域名静态托管包，不需要安装依赖。\n对应未压缩文件夹为github-source和static-site。\n正式版已经关闭所有编辑入口。最新素材、文案、图片顺序、构图和性能优化均已包含。\n');
await run(process.platform==='win32'?'python':'python3',[path.join(root,'scripts/zip-release.py'),folder]);
const report={folder,exportedAt:snapshot.exportedAt,images:Object.keys(snapshot.media).length,extraImages:snapshot.uploaded.length,hiddenImages:Object.keys(snapshot.hidden).length,storageKeys:Object.keys(snapshot.storage),sourceZipBytes:(await stat(path.join(folder,'Jiaoyang-Portfolio.zip'))).size};
await writeFile(path.join(folder,'打包记录.json'),JSON.stringify(report,null,2));
await writeFile(path.join(root,'.history/latest-release.json'),JSON.stringify(report,null,2));
console.log('RELEASE_RESULT='+JSON.stringify(report));
