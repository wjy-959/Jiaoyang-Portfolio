import React,{useState} from 'react';
import {canEdit} from './editor-mode';

async function readRecords(){
 return new Promise((resolve,reject)=>{
  const request=indexedDB.open('jiaoyang-portfolio-media',1);
  request.onerror=()=>reject(request.error);
  request.onsuccess=()=>{
   const db=request.result;
   if(!db.objectStoreNames.contains('media')){db.close();reject(new Error('请先等待图片加载完成'));return}
   const tx=db.transaction('media','readonly'),read=tx.objectStore('media').getAll();
   read.onsuccess=()=>{resolve(read.result);db.close()};read.onerror=()=>{reject(read.error);db.close()};
  };
 });
}
export default function ReleasePackageButton(){
 const [busy,setBusy]=useState(false),[status,setStatus]=useState('');
 if(!canEdit)return null;
 async function save(){
  setBusy(true);setStatus('正在保存浏览器素材并打包，请保持页面打开…');
  try{
   const records=await readRecords(),storage={};
   if(!records.some(record=>record.file instanceof Blob))throw new Error('当前浏览器没有上传素材，请在之前替换好图片的 GPT 预览中打包');
   for(let i=0;i<localStorage.length;i++){
    const key=localStorage.key(i);
    if(['jiaoyang-portfolio-copy','jiaoyang-background-framing'].includes(key)||key.startsWith('jiaoyang-collection-order-'))storage[key]=JSON.parse(localStorage.getItem(key));
   }
   const data=new FormData(),metadata=[];
   for(const [index,record] of records.entries()){
    const {file,...meta}=record;metadata.push({...meta,part:file instanceof Blob?'image-'+index:null});
    if(file instanceof Blob)data.append('image-'+index,file,'image');
   }
   data.append('snapshot',JSON.stringify({records:metadata,storage}));
   const response=await fetch('/__portfolio_release',{method:'POST',headers:{'X-Portfolio-Export':'1'},body:data});
   const result=await response.json();
   if(!response.ok)throw new Error(result.error||'打包未完成');
   setStatus('已打包到：'+result.folder);
   window.alert('完整版本已打包到：\n'+result.folder+'\n\n包括GitHub部署源码包和正式静态网站包。正式版本没有编辑权限。');
  }catch(error){setStatus('打包失败：'+error.message)}finally{setBusy(false)}
 }
 return <><button disabled={busy} onClick={save} style={{color:'var(--accent)'}}>{busy?'正在打包…':'打包发布版本'}</button>{status&&<span role="status" style={{maxWidth:320,fontSize:10,overflowWrap:'anywhere'}}>{status}</span>}</>;
}
