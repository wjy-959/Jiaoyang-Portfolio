import {useLayoutEffect,useRef} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {CustomEase} from 'gsap/CustomEase';
import './case-motion.css';

gsap.registerPlugin(ScrollTrigger,CustomEase);
// Measured on EcoFlow's DELTA 3 product modules: 700ms, 200ms stagger.
const referenceEase=CustomEase.create('case-reference','0.25,0.46,0.45,0.94');
export default function useCaseMotion(rootRef,contentKey,editing){
 const enteredRef=useRef(new WeakSet());
 useLayoutEffect(()=>{
  const root=rootRef.current;
  if(!root)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const entered=enteredRef.current,animations=new Map();
  let context,frame=0,refreshFrame=0,disposed=false;
  function scene(el,from,{trigger=el,delay=.2,duration=.7,mount=false,ease=referenceEase}={}){
   if(entered.has(el))return;
   const tween=gsap.fromTo(el,from,{
    opacity:1,y:0,duration,delay,ease,
    onStart:()=>{entered.add(el);el.style.willChange='transform, opacity'},
    onComplete:()=>gsap.set(el,{clearProps:'transform,opacity,willChange'}),
    ...(mount?{}:{scrollTrigger:{trigger,start:'top 94%',once:true,invalidateOnRefresh:true}})
   });
   animations.set(el,tween);
  }
  function build(){
   frame=0;if(disposed)return;
   context?.revert();animations.clear();
   if(reduced.matches||editing||root.closest('.copy-editing')||root.querySelector('dialog[open]')){ScrollTrigger.refresh();return}
   const mobile=window.innerWidth<=760;
   context=gsap.context(()=>{
    const title=root.querySelector('.case-title-row h1');
    if(title){
     scene(title,
      {opacity:0,y:mobile?18:28},
      {mount:true});
    }
    root.querySelectorAll('.case-eyebrow').forEach(el=>scene(el,
     {opacity:0,y:12},{mount:true,delay:0}));
    root.querySelectorAll('.case-meta>div').forEach((el,index)=>scene(el,
     {opacity:0,y:16},{delay:.4+index*.12}));
    root.querySelectorAll('.case-section-heading,.collection-heading,.case-end h2').forEach(el=>scene(el,
     {opacity:0,y:mobile?16:24},
     {}));
    root.querySelectorAll('.collection-order-toolbar,.case-end>.section-label,.case-end>a,.case-end-bottom').forEach(el=>scene(el,
     {opacity:0,y:14},{delay:.2}));
    const grids=root.querySelectorAll('.case-poster-grid,.case-listing-grid,.case-aplus-stack,.case-product-grid,.collection-grid');
    grids.forEach(grid=>{
     // Animate connected A+ panels as one piece, preserving their seamless join.
     const pieces=[...grid.children].filter(el=>el.matches('.case-image-button,.case-aplus-connected,.collection-piece'));
     const positions=pieces.map(el=>({el,top:Math.round(el.getBoundingClientRect().top)}));
     const rows=new Map();
     positions.forEach(({el,top})=>{if(!rows.has(top))rows.set(top,[]);rows.get(top).push(el)});
     rows.forEach(row=>row.forEach((el,index)=>{
      scene(el,{opacity:0,y:mobile?18:28},
       {trigger:row[0],delay:.2+index*.2});
     }));
    });
   },root);
   ScrollTrigger.refresh();
  }
  function schedule(){if(!frame&&!disposed)frame=requestAnimationFrame(build)}
  function refresh(){if(disposed)return;clearTimeout(refreshFrame);refreshFrame=setTimeout(()=>{refreshFrame=0;if(!disposed)ScrollTrigger.refresh()},100)}
  function focus(event){
   for(let el=event.target;el&&el!==root;el=el.parentElement){
    const tween=animations.get(el);
    if(tween){tween.scrollTrigger?.kill();tween.progress(1);entered.add(el)}
   }
  }
  const editorObserver=new MutationObserver(schedule);
  if(root.parentElement)editorObserver.observe(root.parentElement,{attributes:true,attributeFilter:['class']});
  // Native preview and sort dialogs temporarily show all artwork underneath.
  const dialogObserver=new MutationObserver(schedule);
  dialogObserver.observe(root,{subtree:true,attributes:true,attributeFilter:['open']});
  let mobileMode=window.innerWidth<=760;
  function resize(){const next=window.innerWidth<=760;if(next!==mobileMode){mobileMode=next;schedule()}}
  window.addEventListener('resize',resize,{passive:true});
  root.addEventListener('load',refresh,true);
  root.addEventListener('focusin',focus);
  reduced.addEventListener('change',schedule);
  build();
  document.fonts?.ready.then(()=>{if(!disposed)refresh()});
  return()=>{disposed=true;cancelAnimationFrame(frame);clearTimeout(refreshFrame);editorObserver.disconnect();dialogObserver.disconnect();context?.revert();window.removeEventListener('resize',resize);root.removeEventListener('load',refresh,true);root.removeEventListener('focusin',focus);reduced.removeEventListener('change',schedule)};
 },[rootRef,contentKey,editing]);
}
