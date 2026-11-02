import {useEffect, useRef} from 'react';

// One transform drives both the automatic loop and pointer momentum.
export default function useGalleryDrag(rootRef, paused){
 const pausedRef=useRef(paused),resumeRef=useRef(null);
 pausedRef.current=paused;
 useEffect(()=>{resumeRef.current?.(!paused)},[paused]);
 useEffect(()=>{
  const root=rootRef.current;
  const viewport=root?.querySelector('.gallery-window');
  const track=viewport?.querySelector('.gallery-track');
  const group=track?.querySelector('.gallery-group');
  if(!group)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let width=0,target=0,position=0,velocity=0,frame=0,last=0;
  let visible=false,hover=false,resuming=false,pointer=null,suppressClick=false,clickTimer;
  const wrap=value=>((value%width)+width)%width;
  function wake(){if(!frame&&visible&&!document.hidden){last=0;frame=requestAnimationFrame(tick)}}
  resumeRef.current=resume=>{if(resume){hover=false;resuming=true}wake()};
  function tick(time){
   frame=0;
   const dt=Math.min((time-(last||time))/1000,.032);last=time;
   const auto=!pausedRef.current&&!hover&&!pointer&&(resuming||!viewport.querySelector('.gallery-card:focus-visible'))&&!reduced.matches;
   if(!pointer){
    target+=(auto?-width/39:0)*dt;
    if(!reduced.matches){target+=velocity*dt;velocity*=Math.exp(-5*dt)}else velocity=0;
    if(Math.abs(velocity)<2)velocity=0;
   }
   position+= (target-position)*(reduced.matches?1:1-Math.exp(-20*dt));
   if(width){
    track.style.transform=`translate3d(${-wrap(-position)}px,0,0)`;
    // Keep coordinates bounded without a visible seam, in either direction.
    const turns=Math.trunc(position/width)*width;
    position-=turns;target-=turns;
   }
   if(visible&&!document.hidden&&(pointer||auto||velocity||Math.abs(target-position)>.05))frame=requestAnimationFrame(tick);
  }
  function down(event){
   if((event.pointerType==='mouse'&&event.button!==0)||pointer)return;
   pointer={id:event.pointerId,x:event.clientX,y:event.clientY,lastX:event.clientX,time:event.timeStamp,dragged:false};
   // Leave taps on their original button. Capture only after an actual drag.
   velocity=0;target=position;
   clearTimeout(clickTimer);suppressClick=false;
   wake();
  }
  function move(event){
   if(pointer?.id!==event.pointerId)return;
   const dx=event.clientX-pointer.x,dy=event.clientY-pointer.y;
   if(!pointer.dragged){
    if(Math.abs(dx)<6&&Math.abs(dy)<6)return;
    if(event.pointerType!=='mouse'&&Math.abs(dy)>Math.abs(dx)){pointer=null;if(viewport.hasPointerCapture(event.pointerId))viewport.releasePointerCapture(event.pointerId);return}
    pointer.dragged=true;suppressClick=true;
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add('is-dragging');
   }
   if(event.cancelable)event.preventDefault();
   const elapsed=Math.max(8,event.timeStamp-pointer.time);
   const delta=event.clientX-pointer.lastX;
   velocity=velocity*.35+Math.max(-2200,Math.min(2200,delta/elapsed*1000))*.65;
   target+=delta;
   pointer.lastX=event.clientX;pointer.time=event.timeStamp;
   wake();
  }
  function up(event){
   if(event.type==='lostpointercapture'&&event.target!==viewport)return;
   if(pointer?.id!==event.pointerId)return;
   if(event.type!=='pointerup'||event.timeStamp-pointer.time>100)velocity=0;
   pointer=null;
   viewport.classList.remove('is-dragging');
   if(viewport.hasPointerCapture(event.pointerId))viewport.releasePointerCapture(event.pointerId);
   // Consume the synthetic click after dragging, while normal taps still open images.
   clickTimer=setTimeout(()=>{suppressClick=false},350);
   wake();
  }
  function click(event){if(suppressClick){event.preventDefault();event.stopPropagation();suppressClick=false}}
  function enter(event){if(event.pointerType!=='mouse'||resuming)return;hover=true;wake()}
  function leave(){hover=false;resuming=false;wake()}
  function keydown(){resuming=false;hover=false;wake()}
  function drag(event){event.preventDefault()}
  function visibility(){if(document.hidden){cancelAnimationFrame(frame);frame=0;velocity=0}else wake()}
  const resize=new ResizeObserver(()=>{width=group.getBoundingClientRect().width;wake()});
  resize.observe(group);
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)wake();else{cancelAnimationFrame(frame);frame=0}}, {threshold:0});
  observer.observe(viewport);
  viewport.addEventListener('pointerdown',down);
  viewport.addEventListener('pointermove',move,{passive:false});
  viewport.addEventListener('pointerup',up);
  viewport.addEventListener('pointercancel',up);
  viewport.addEventListener('lostpointercapture',up);
  viewport.addEventListener('pointerenter',enter);
  viewport.addEventListener('pointerleave',leave);
  viewport.addEventListener('click',click,true);
  viewport.addEventListener('dragstart',drag);
  viewport.addEventListener('focusout',wake);
  viewport.addEventListener('keydown',keydown);
  document.addEventListener('visibilitychange',visibility);
  reduced.addEventListener('change',wake);
  return()=>{
   cancelAnimationFrame(frame);clearTimeout(clickTimer);resize.disconnect();observer.disconnect();resumeRef.current=null;
   for(const [type,handler] of [['pointerdown',down],['pointermove',move],['pointerup',up],['pointercancel',up],['lostpointercapture',up],['pointerenter',enter],['pointerleave',leave],['dragstart',drag]])viewport.removeEventListener(type,handler);
   viewport.removeEventListener('click',click,true);
   viewport.removeEventListener('focusout',wake);
   viewport.removeEventListener('keydown',keydown);
   document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',wake);
   track.style.removeProperty('transform');viewport.classList.remove('is-dragging');
  };
 },[rootRef]);
}
