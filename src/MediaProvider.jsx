import {criticalImages,previewForUpload} from './media-performance';
import {publishedState,currentRoute} from './published-state';
import {canEdit} from './editor-mode';
import React,{createContext,useContext,useEffect,useRef,useState} from 'react';
import {heroMedia} from './hero-media';
import {portfolioProjects} from './project-summaries';
import './site-loader.css';

const MediaContext=createContext(null);
export const useMedia=()=>useContext(MediaContext);
const allowedImages=['image/jpeg','image/png','image/webp','image/avif','image/gif'];
function openDB(){return new Promise((resolve,reject)=>{const request=indexedDB.open('jiaoyang-portfolio-media',1);request.onupgradeneeded=()=>request.result.createObjectStore('media');request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);request.onblocked=()=>reject(new Error('Storage is busy'))})}
async function mediaStore(action,key,value){const db=await openDB();try{return await new Promise((resolve,reject)=>{const tx=db.transaction('media',action==='getAll'?'readonly':'readwrite');const store=tx.objectStore('media');const request=action==='getAll'?store.getAll():action==='put'?store.put(value,key):action==='delete'?store.delete(key):store.clear();let result;request.onsuccess=()=>{result=request.result};tx.oncomplete=()=>resolve(result);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error)})}finally{db.close()}}
const bounded=(promise,ms,fallback)=>new Promise(resolve=>{const timer=setTimeout(()=>resolve(fallback),ms);promise.then(value=>{clearTimeout(timer);resolve(value)},()=>{clearTimeout(timer);resolve(fallback)})});
function decodeImage(src,priority='auto'){return new Promise(resolve=>{const image=new Image();let done=false;const finish=()=>{if(done)return;done=true;clearTimeout(timer);resolve()};const timer=setTimeout(finish,8000);image.onload=()=>{if(image.decode)image.decode().catch(()=>{}).finally(finish);else finish()};image.onerror=finish;image.decoding='async';image.fetchPriority=priority;image.src=src})}

export function MediaProvider({children}){
 const [hidden,setHidden]=useState({}),[uploaded,setUploaded]=useState([]);
 const [previewMedia,setPreviewMedia]=useState({});
 const [media,setMedia]=useState({}),[busy,setBusy]=useState(false),[notice,setNotice]=useState('');
 const [displayProgress,setDisplayProgress]=useState(0),[mounted,setMounted]=useState(false),[finished,setFinished]=useState(false);
 const urls=useRef(new Set()),target=useRef(0),loaded=useRef(false),lastDisplayed=useRef(-1);
 const urlFor=file=>{const url=URL.createObjectURL(file);urls.current.add(url);return url};
 useEffect(()=>{
  let alive=true,frame=0,exitTimer,last=performance.now(),progress=0;
  const previousRestoration=window.history.scrollRestoration;window.history.scrollRestoration='manual';
  // Fresh visits and reloads always open on the hero, even from a saved #work URL.
  // In-page navigation and returning from a project still keep their own anchors.
  if(currentRoute()==='/'){
   window.history.replaceState(window.history.state,'',window.location.pathname+window.location.search);
   window.scrollTo({top:0,behavior:'instant'});
  }
  document.documentElement.classList.add('is-site-loading');
  async function load(){
   const fontsReady=bounded(document.fonts?.ready||Promise.resolve(),1500,null);
   const records=canEdit?await bounded(mediaStore('getAll'),6000,[]):[];
   if(!alive)return;
   const saved={...publishedState.media},hiddenImages={...publishedState.hidden};for(const record of records||[]){if(record.key?.startsWith('hidden:')&&record.hidden)hiddenImages[record.key.slice(7)]=true;else if(record.key!=='video'&&record.file instanceof Blob)saved[record.key]=urlFor(record.file)}
   const uploadedRecords=new Map(publishedState.uploaded.map(record=>[record.key,record]));
   for(const {file,...meta} of (records||[]).filter(record=>record.projectSlug&&record.file instanceof Blob))uploadedRecords.set(meta.key,meta);
   setUploaded([...uploadedRecords.values()]);
   setHidden(hiddenImages);
   const previews={...publishedState.previews};
   await Promise.all((records||[]).filter(record=>record.file instanceof Blob&&record.key!=='video').map(async record=>{
    previews[record.key]=await previewForUpload(record,publishedState.previews[record.key],publishedState.fingerprints[record.key])||saved[record.key];
   }));
   if(!alive)return;
   setMedia(saved);setPreviewMedia(previews);target.current=12;
   const assets=criticalImages(currentRoute(),saved,previews,heroMedia,portfolioProjects);
   const unique=[...new Set(assets)];let complete=0;
   await Promise.all(unique.map(async (src,index)=>{await decodeImage(src,index===0?'high':'auto');if(alive)target.current=12+80*(++complete/unique.length)}));
   await fontsReady;
   if(alive){target.current=100;loaded.current=true}
  }
  load().catch(()=>{if(alive){target.current=100;loaded.current=true}});
  function tick(now){
   if(!alive)return;
   const elapsed=Math.min(now-last,80);last=now;
   progress=Math.min(target.current,progress+elapsed*.085);
   const nextProgress=Math.floor(progress);
   if(nextProgress!==lastDisplayed.current){lastDisplayed.current=nextProgress;setDisplayProgress(nextProgress)}
   if(progress>=100&&loaded.current){setMounted(true);exitTimer=setTimeout(()=>{if(alive){const section=window.location.hash.slice(1);if(section&&section!=='home')document.getElementById(section)?.scrollIntoView({behavior:'instant',block:'start'});else window.scrollTo({top:0,behavior:'instant'});setFinished(true);document.documentElement.classList.remove('is-site-loading');window.dispatchEvent(new Event('resize'))}},380);return}
   frame=requestAnimationFrame(tick);
  }
  frame=requestAnimationFrame(tick);
  return()=>{window.history.scrollRestoration=previousRestoration;alive=false;cancelAnimationFrame(frame);clearTimeout(exitTimer);document.documentElement.classList.remove('is-site-loading');urls.current.forEach(url=>URL.revokeObjectURL(url))};
 },[]);
 async function upload(key,file){if(!canEdit)return false;
  if(!file)return false;
  if(!allowedImages.includes(file.type)){setNotice('请选择 JPG、PNG、WebP、AVIF 或 GIF 图片。');return false}
  setBusy(true);setNotice('正在保存图片…');
  try{await mediaStore('put',key,{...uploaded.find(image=>image.key===key),key,file});const url=urlFor(file);await decodeImage(url);setMedia(previous=>({...previous,[key]:url}));setPreviewMedia(previous=>({...previous,[key]:url}));await mediaStore('delete','hidden:'+key);setHidden(previous=>{const next={...previous};delete next[key];return next});setNotice('已替换并保存在当前浏览器，刷新后仍会保留。');return true}
  catch{setNotice('图片保存失败，请尝试较小的文件。');return false}finally{setBusy(false)}
 }
 async function uploadProjectImages(projectSlug,type,files){if(!canEdit)return false;
  const batch=Array.from(files||[]).sort((a,b)=>a.name.localeCompare(b.name,undefined,{numeric:true}));if(!batch.length)return;
  setBusy(true);let added=0,failed=0;
  try{for(const file of batch){
   if(!allowedImages.includes(file.type)){failed++;continue}
   setNotice(`正在上传 ${added+failed+1} / ${batch.length}…`);
   const url=urlFor(file);
   try{
    const dimensions=await new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve({width:image.naturalWidth,height:image.naturalHeight});image.onerror=reject;image.src=url});
    const key='uploaded-'+crypto.randomUUID(),meta={key,projectSlug,type,label:file.name.replace(/\.[^.]+$/,''),...dimensions};
    await mediaStore('put',key,{...meta,file});setMedia(previous=>({...previous,[key]:url}));setPreviewMedia(previous=>({...previous,[key]:url}));setUploaded(previous=>[...previous,meta]);added++;
   }catch{failed++}
  }}finally{setBusy(false);setNotice(`已新增 ${added} 张图片${failed?`，${failed} 张未能保存`:''}，按文件名排列并保存在当前浏览器。`)}
 }
 async function remove(key){if(!canEdit)return false;setBusy(true);try{await mediaStore('delete',key);setMedia(previous=>{const next={...previous};delete next[key];return next});setPreviewMedia(previous=>{const next={...previous};delete next[key];return next});setNotice('已恢复该模块的默认图片。')}catch{setNotice('恢复失败，请重试。')}finally{setBusy(false)}}
 async function setImageHidden(key,value){if(!canEdit)return false;setBusy(true);try{if(value)await mediaStore('put','hidden:'+key,{key:'hidden:'+key,hidden:true});else await mediaStore('delete','hidden:'+key);setHidden(previous=>{const next={...previous};if(value)next[key]=true;else delete next[key];return next});setNotice(value?'图片已从作品页删除，可随时恢复。原始文件已保留。':'图片已恢复展示。');return true}catch{setNotice('未能保存图片状态，请重试。');return false}finally{setBusy(false)}}
 async function reset(){if(!canEdit)return false;setBusy(true);try{await mediaStore('clear');setMedia({});setPreviewMedia({});setHidden({});setUploaded([]);setNotice('已恢复默认图片。');return true}catch{setNotice('暂时无法恢复，请重试。');return false}finally{setBusy(false)}}
 return <MediaContext.Provider value={{media,previewMedia,uploaded,uploadProjectImages,hidden,setImageHidden,busy,notice,setNotice,upload,reset,remove}}>{mounted&&children}{!finished&&<div className={'site-loader '+(mounted?'is-leaving':'')} role="status" aria-live="polite" aria-label="作品集正在加载"><div className="loader-brand"><span className="loader-mark">W</span><span>WU JIAOYANG<small>VISUAL DESIGNER</small></span></div><div className="loader-center"><div className="loader-eyebrow">VISUAL / AI / BRAND</div><div className="loader-title">JIAOYANG<span>✦</span></div><div className="loader-progress-line"><span className="loader-caption">正在构建我的视觉世界</span><span className="loader-number">{String(displayProgress).padStart(2,'0')}<small>%</small></span></div><div className="loader-track" role="progressbar" aria-label="加载进度" aria-valuenow={displayProgress} aria-valuemin={0} aria-valuemax={100}><i style={{transform:`scaleX(${displayProgress/100})`}}/></div><div className="loader-meta"><span>{displayProgress<12?'读取图片与构图设置':displayProgress<93?'准备视觉素材':displayProgress<100?'准备字体与页面':'准备就绪'}</span><span>PORTFOLIO — {new Date().getFullYear()}</span></div></div><div className="loader-footer"><span>DESIGNED WITH INTENTION.</span><span>SHENZHEN / CN</span></div></div>}</MediaContext.Provider>;
}
