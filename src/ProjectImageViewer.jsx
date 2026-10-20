import React,{useEffect,useLayoutEffect,useRef,useState} from 'react';
import {swipeDirection} from './gallery-layout';
import './project-image-viewer.css';

export default function ProjectImageViewer({images,index,onIndexChange,onClose,getSource,getPreview,title,compact=false}){
 const dialog=useRef(),stage=useRef(),gesture=useRef(null),transitioning=useRef(false),timer=useRef(),changeRef=useRef();
 const [size,setSize]=useState({width:1000,height:560}),[loadedKey,setLoadedKey]=useState(null);
 const current=images[index];
 const loading=loadedKey!==current.key;
 function change(step){
  if(images.length<2||transitioning.current)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  transitioning.current=true;
  onIndexChange((index+step+images.length)%images.length);
  clearTimeout(timer.current);timer.current=setTimeout(()=>{transitioning.current=false},reduced?0:380);
 }
 changeRef.current=change;
 useLayoutEffect(()=>{
  const previousFocus=document.activeElement,previousOverflow=document.body.style.overflow;
  dialog.current.showModal();document.body.style.overflow='hidden';
  const observer=new ResizeObserver(([entry])=>setSize({width:entry.contentRect.width,height:entry.contentRect.height}));observer.observe(stage.current);
  return()=>{observer.disconnect();clearTimeout(timer.current);document.body.style.overflow=previousOverflow;previousFocus?.focus()};
 },[]);
 useLayoutEffect(()=>{
  const image=stage.current?.querySelector('.viewer-depth-0 img');
  if(image?.complete&&image.naturalWidth)setLoadedKey(current.key);
 },[index,current.key]);
 useEffect(()=>{
  for(const offset of [-1,1]){if(images.length>1){const neighbor=images[(index+offset+images.length)%images.length];const image=new Image();image.src=getPreview?.(neighbor)||neighbor.preview||getSource(neighbor)}}
 },[index,current.key]);
 useEffect(()=>{
  let distance=0,reset;
  function wheel(event){
   if(event.ctrlKey||Math.abs(event.deltaX)<=Math.abs(event.deltaY)*1.25||Math.abs(event.deltaX)<1)return;
   event.preventDefault();if(transitioning.current)return;
   clearTimeout(reset);distance+=event.deltaX;
   if(Math.abs(distance)>=65){changeRef.current(distance>0?1:-1);distance=0}
   reset=setTimeout(()=>{distance=0},140);
  }
  const element=stage.current;element.addEventListener('wheel',wheel,{passive:false});
  return()=>{clearTimeout(reset);element.removeEventListener('wheel',wheel)};
 },[]);
 function pointerDown(event){
  if(event.button!==0||transitioning.current)return;
  gesture.current={id:event.pointerId,x:event.clientX,y:event.clientY,time:performance.now()};stage.current.classList.add('is-dragging');event.currentTarget.setPointerCapture(event.pointerId);
 }
 function pointerMove(event){
  const start=gesture.current;if(!start||start.id!==event.pointerId)return;
  const dx=event.clientX-start.x,dy=event.clientY-start.y;
  if(Math.abs(dx)<Math.abs(dy)||Math.abs(dx)<6)return;
  stage.current.style.setProperty('--drag-x',`${Math.max(-160,Math.min(160,dx*.45))}px`);
 }
 function finishPointer(event,cancel=false){
  const start=gesture.current;if(!start||start.id!==event.pointerId)return;gesture.current=null;
  if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);
  stage.current.classList.remove('is-dragging');stage.current.style.removeProperty('--drag-x');
  const step=cancel?0:swipeDirection(event.clientX-start.x,event.clientY-start.y,performance.now()-start.time,stage.current.clientWidth);
  if(step)changeRef.current(step);

 }
 return <dialog className={"project-image-viewer"+(compact?" is-compact":"")} ref={dialog} aria-label="作品图片预览" onCancel={event=>{event.preventDefault();onClose()}} onClick={event=>{if(event.target===dialog.current)onClose()}} onKeyDown={event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();change(event.key==='ArrowRight'?1:-1)}}}>
  <div className="viewer-header"><div><span>{current.label}</span><small aria-live="polite">{String(index+1).padStart(2,'0')} / {images.length}</small></div><button onClick={onClose} aria-label="关闭图片预览">✕</button></div>
  <div className="viewer-stage" ref={stage} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={event=>finishPointer(event)} onPointerCancel={event=>finishPointer(event,true)}>
   {(images.length===1?[0]:images.length===2?[0,1]:images.length===3?[-1,0,1]:images.length===4?[-1,0,1,2]:[-2,-1,0,1,2]).map(offset=>{
    const image=images[(index+offset+images.length)%images.length],depth=Math.abs(offset),ratio=image.width/image.height;
    const maxWidth=Math.min(1000,size.width*(depth===0?(compact?.66:.70):depth===1?.44:.34)),maxHeight=size.height*(compact?(depth===0?.94:depth===1?.72:.58):(depth===0?.86:depth===1?.74:.61));
    const height=Math.min(maxHeight,maxWidth/ratio),width=height*ratio;
    const activeRatio=current.width/current.height,activeWidth=Math.min(Math.min(1000,size.width*(compact?.66:.70)),size.height*(compact?.94:.86)*activeRatio);
    const x=offset===0?0:Math.sign(offset)*(activeWidth*.44+size.width*.06+(depth-1)*size.width*.16);
    const source=getSource(image),displaySource=depth===0?source:(getPreview?.(image)||image.preview||source);
    const style={width,height,'--card-x':`${x}px`,'--card-z':`${-depth*110}px`,'--card-angle':`${-Math.sign(offset)*(depth===1?15:23)}deg`,zIndex:20-depth*7};
    return <div key={image.key} className={'viewer-card viewer-depth-'+depth} style={style} aria-hidden={depth>0?true:undefined}>
     <img src={displaySource} alt={depth===0?title+' — '+image.label:''} draggable="false" onDragStart={event=>event.preventDefault()} onLoad={()=>{if(depth===0)setLoadedKey(image.key)}} onError={()=>{if(depth===0)setLoadedKey(image.key)}}/>
    </div>;
   })}
   {loading&&<span className="viewer-loading" aria-label="正在加载图片"/>}
  </div>
  {images.length>1&&<><button className="viewer-arrow viewer-arrow-prev" aria-label="上一张图片" onClick={()=>change(-1)}>←</button><button className="viewer-arrow viewer-arrow-next" aria-label="下一张图片" onClick={()=>change(1)}>→</button></>}
  <div className="viewer-footer"><span>拖动 / 左右滑动浏览 · 方向键切换 · Esc 关闭</span><a href={getSource(current)} target="_blank" rel="noopener noreferrer">打开原图 ↗</a></div>
 </dialog>;
}
