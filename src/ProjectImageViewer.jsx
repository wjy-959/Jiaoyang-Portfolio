import React,{useLayoutEffect,useRef,useState} from 'react';
import './project-image-viewer.css';

export default function ProjectImageViewer({images,index,onClose,getSource,title,compact=false}){
 const dialog=useRef(),stage=useRef(),imageRef=useRef(),closeTimer=useRef();
 const [size,setSize]=useState({width:1000,height:560}),[loaded,setLoaded]=useState(false),[failed,setFailed]=useState(false),[closing,setClosing]=useState(false);
 const current=images[index],source=getSource(current);
 useLayoutEffect(()=>{
  const previousFocus=document.activeElement,previousOverflow=document.body.style.overflow;
  dialog.current.showModal();document.body.style.overflow='hidden';
  const observer=new ResizeObserver(([entry])=>setSize({width:entry.contentRect.width,height:entry.contentRect.height}));observer.observe(stage.current);
  if(imageRef.current?.complete&&imageRef.current.naturalWidth)setLoaded(true);
  return()=>{observer.disconnect();clearTimeout(closeTimer.current);document.body.style.overflow=previousOverflow;if(previousFocus?.isConnected)previousFocus.focus({preventScroll:true})};
 },[]);
 function close(){
  if(closing)return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){onClose();return}
  setClosing(true);closeTimer.current=setTimeout(onClose,200);
 }
 const ratio=(current.width||1)/(current.height||1);
 const height=Math.min(size.height*(compact?.94:.86),Math.min(1000,size.width*(compact?.66:.70))/ratio);
 return <dialog className={'project-image-viewer'+(compact?' is-compact':'')+(closing?' is-closing':'')} ref={dialog} aria-label="作品图片预览" onCancel={event=>{event.preventDefault();close()}} onClick={event=>{if(event.target===dialog.current)close()}}>
  <div className="viewer-header"><span>{current.label}</span><button type="button" onClick={close} aria-label="关闭图片预览">✕</button></div>
  <div className="viewer-stage" ref={stage} onClick={event=>{if(event.target===stage.current)close()}}>
   <div className={'viewer-card'+(loaded?' is-loaded':'')} style={{width:height*ratio,height}}>
    <img ref={imageRef} src={source} alt={title+' — '+current.label} draggable="false" onLoad={()=>setLoaded(true)} onError={()=>setFailed(true)}/>
   </div>
   {!loaded&&!failed&&<span className="viewer-loading" role="status" aria-label="正在加载图片"/>}
   {failed&&<span className="viewer-error" role="status">图片暂时未能加载，可尝试打开原图</span>}
  </div>
  <div className="viewer-footer"><span>点击空白处或按 Esc 关闭</span><a href={source} target="_blank" rel="noopener noreferrer">打开原图 ↗</a></div>
 </dialog>;
}
