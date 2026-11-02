import {previewForUpload} from './media-performance';
import {publishedState,currentRoute} from './published-state';
import {canEdit} from './editor-mode';
import avifReplacements from './avif-replacements.json';
import React,{createContext,useContext,useEffect,useRef,useState} from 'react';

const MediaContext=createContext(null);
export const useMedia=()=>useContext(MediaContext);
const allowedImages=['image/jpeg','image/png','image/webp','image/avif','image/gif'];
function openDB(){return new Promise((resolve,reject)=>{const request=indexedDB.open('jiaoyang-portfolio-media',1);request.onupgradeneeded=()=>request.result.createObjectStore('media');request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);request.onblocked=()=>reject(new Error('Storage is busy'))})}
async function mediaStore(action,key,value){const db=await openDB();try{return await new Promise((resolve,reject)=>{const tx=db.transaction('media',action==='getAll'?'readonly':'readwrite');const store=tx.objectStore('media');const request=action==='getAll'?store.getAll():action==='put'?store.put(value,key):action==='delete'?store.delete(key):store.clear();let result;request.onsuccess=()=>{result=request.result};tx.oncomplete=()=>resolve(result);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error)})}finally{db.close()}}
const bounded=(promise,ms,fallback)=>new Promise(resolve=>{const timer=setTimeout(()=>resolve(fallback),ms);promise.then(value=>{clearTimeout(timer);resolve(value)},()=>{clearTimeout(timer);resolve(fallback)})});
function decodeImage(src,priority='auto'){return new Promise(resolve=>{const image=new Image();let done=false;const finish=()=>{if(done)return;done=true;clearTimeout(timer);resolve()};const timer=setTimeout(finish,8000);image.onload=()=>{if(image.decode)image.decode().catch(()=>{}).finally(finish);else finish()};image.onerror=finish;image.decoding='async';image.fetchPriority=priority;image.src=src})}

export function MediaProvider({children}){
 const [hidden,setHidden]=useState(()=>({...publishedState.hidden})),[uploaded,setUploaded]=useState(()=>[...publishedState.uploaded]);
 const [previewMedia,setPreviewMedia]=useState(()=>({...publishedState.previews}));
 const [media,setMedia]=useState(()=>({...publishedState.media})),[busy,setBusy]=useState(false),[notice,setNotice]=useState('');
 const [ready,setReady]=useState(!canEdit);
 const urls=useRef(new Set());
 const urlFor=file=>{const url=URL.createObjectURL(file);urls.current.add(url);return url};
 useEffect(()=>{
  let alive=true;
  const previousRestoration=window.history.scrollRestoration;window.history.scrollRestoration='manual';
  // Fresh visits and reloads always open on the hero, even from a saved #work URL.
  // In-page navigation and returning from a project still keep their own anchors.
  if(currentRoute()==='/'){
   window.history.replaceState(window.history.state,'',window.location.pathname+window.location.search);
   window.scrollTo({top:0,behavior:'instant'});
  }
  async function load(){
   const records=canEdit?await bounded(mediaStore('getAll'),6000,[]):[];
   if(!alive)return;
   const saved={...publishedState.media},hiddenImages={...publishedState.hidden};for(const record of records||[]){if(record.key?.startsWith('hidden:')&&record.hidden)hiddenImages[record.key.slice(7)]=true;else if(record.key!=='video'&&record.file instanceof Blob)saved[record.key]=urlFor(record.file)}
   const uploadedRecords=new Map(publishedState.uploaded.map(record=>[record.key,record]));
   for(const {file,...meta} of (records||[]).filter(record=>record.projectSlug&&record.file instanceof Blob))uploadedRecords.set(meta.key,meta);
   setUploaded([...uploadedRecords.values()]);
   setHidden(hiddenImages);
   const previews={...publishedState.previews};
   // Only local saved settings are restored before mounting the editor preview.
   // The public site mounts immediately; images and fonts never gate the page.
   for(const record of records||[])if(record.file instanceof Blob&&record.key!=='video')previews[record.key]=saved[record.key];
   setMedia(saved);setPreviewMedia({...previews});setReady(true);
   await Promise.all((records||[]).filter(record=>record.file instanceof Blob&&record.key!=='video').map(async record=>{
    const matchedPreview=await previewForUpload(record,publishedState.previews[record.key],publishedState.fingerprints[record.key]);
    previews[record.key]=matchedPreview||saved[record.key];
    // Recognize the previous upload without overwriting browser storage. A new
    // upload with different contents still takes precedence over the replacement.
    if(matchedPreview&&avifReplacements[record.key])saved[record.key]=matchedPreview;
   }));
   if(!alive)return;
   setMedia({...saved});setPreviewMedia({...previews});
  }
  load().catch(()=>{if(alive)setReady(true)});
  return()=>{window.history.scrollRestoration=previousRestoration;alive=false;urls.current.forEach(url=>URL.revokeObjectURL(url))};
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
 return <MediaContext.Provider value={{media,previewMedia,uploaded,uploadProjectImages,hidden,setImageHidden,busy,notice,setNotice,upload,reset,remove}}>{ready&&children}</MediaContext.Provider>;
}
