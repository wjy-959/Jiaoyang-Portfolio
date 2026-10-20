import {useLayoutEffect,useRef} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import './scroll-entrance.css';
import {softReveal} from './softReveal';

gsap.registerPlugin(ScrollTrigger);
export default function useScrollEntrance(contentKey){
 const enteredRef=useRef(new WeakSet());
 useLayoutEffect(()=>{
  const root=document.querySelector('.post-hero');
  if(!root)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const entered=enteredRef.current,tracked=new Set(),animations=new Map();
  let context,frame=0,disposed=false;
  function scene(el,from,{trigger=el,delay=0,duration=1.65,start='top 88%',ease='expo.out',to={}}={}){
   tracked.add(el);el.dataset.motionScene='';
   if(entered.has(el))return;
   const [startState,endState]=softReveal(from,{x:0,y:0,scale:1,scaleX:1,scaleY:1,rotation:0,rotationX:0,...to});
   const tween=gsap.fromTo(el,startState,{...endState,duration,delay,ease,
    onStart:()=>entered.add(el),onComplete:()=>{el.dataset.motionProgress='1';gsap.set(el,{clearProps:'transform,clipPath,maskImage,webkitMaskImage,--soft-reveal,opacity,willChange'})},
    scrollTrigger:{trigger,start,once:true,invalidateOnRefresh:true}});
   animations.set(el,tween);
  }
  function build(){
   frame=0;if(disposed)return;
   context?.revert();tracked.forEach(el=>{delete el.dataset.motionScene;delete el.dataset.motionProgress});tracked.clear();animations.clear();
   if(reduced.matches||document.querySelector('.copy-editing')){ScrollTrigger.refresh();return}
   const mobile=window.innerWidth<=760;
   context=gsap.context(()=>{
    // One large typographic gesture per module, before the supporting content.
    root.querySelectorAll('h2,.career-heading h3').forEach(el=>scene(el,
     {y:mobile?65:110,x:mobile?-15:-45,scaleY:.58,scaleX:1.09,rotation:mobile?1:2.5,clipPath:'inset(0% 0% 100% 0%)',transformOrigin:'0% 100%'},
     {duration:1.9,start:'top 91%'}));
    root.querySelectorAll('.section-top,.bio-overline,.contact-kicker,.work-count,.discipline-strip').forEach(el=>scene(el,
     {x:-28,clipPath:'inset(0% 100% 0% 0%)'},{duration:1.35}));
    root.querySelectorAll('.bio-photo').forEach(el=>scene(el,
     {y:70,scale:.86,clipPath:'inset(0% 0% 100% 0%)'},{trigger:el.parentElement,delay:.35,duration:2,ease:'expo.inOut'}));
    root.querySelectorAll('.bio-summary,.bio-facts,.bio-numbers,.bio-toolkit').forEach((el,index)=>scene(el,
     {y:45,clipPath:'inset(0% 0% 100% 0%)'},{delay:.45+index*.13,duration:1.4}));
    root.querySelectorAll('.filter-row,.expertise-heading>p').forEach(el=>scene(el,
     {y:35,clipPath:'inset(0% 100% 0% 0%)'},{delay:.3,duration:1.4}));
    root.querySelectorAll('.career-detail').forEach((el,index)=>scene(el,
     {y:mobile?55:90,clipPath:'inset(0% 0% 100% 0%)'},
     {trigger:mobile?el.parentElement:el.closest('.career-track'),delay:.3+index%3*.18}));
    // Group actual grid rows so a card never waits for an offscreen sibling.
    const cards=[...root.querySelectorAll('.project-card')];
    const rows=new Map();
    cards.forEach(el=>{const key=Math.round(el.offsetTop);if(!rows.has(key))rows.set(key,[]);rows.get(key).push(el)});
    rows.forEach(row=>row.forEach((el,index)=>{
     scene(el,{y:mobile?70:130,scale:.9,rotation:mobile?0:1.5,clipPath:'inset(0% 0% 100% 0%)'},
      {trigger:row[0],delay:.3+index*.16,duration:1.85});
     const image=el.querySelector('.project-image');
     if(image)scene(image,{clipPath:'inset(0% 100% 0% 0%)'},{trigger:row[0],delay:.48+index*.16,duration:1.8,ease:'expo.inOut'});
    }));
    const skillRows=new Map();
    root.querySelectorAll('.skill-card').forEach(el=>{const top=Math.round(el.offsetTop);if(!skillRows.has(top))skillRows.set(top,[]);skillRows.get(top).push(el)});
    skillRows.forEach(row=>row.forEach((el,index)=>scene(el,
     {y:mobile?70:135,scaleY:.84,rotationX:mobile?0:12,transformPerspective:1200,transformOrigin:'50% 100%',clipPath:'inset(0% 0% 100% 0%)'},
     {trigger:row[0],delay:.35+index*.2,duration:1.9})));
    root.querySelectorAll('.contact-action,.process,.work-end').forEach(el=>scene(el,
     {x:-45,clipPath:'inset(0% 100% 0% 0%)'},{delay:.35,duration:1.65}));
    root.querySelectorAll('.contact-details>div').forEach((el,index)=>scene(el,
     {y:55,clipPath:'inset(0% 100% 0% 0%)'},{delay:.3+index*.16}));
    // Small transform-only parallax on desktop; no scroll hijacking or pinning.
    if(!mobile)root.querySelectorAll('.project-image img').forEach(image=>{
     gsap.fromTo(image,{yPercent:-3,scale:1.09},{yPercent:3,scale:1.09,ease:'none',scrollTrigger:{trigger:image.closest('.project-card'),start:'top bottom',end:'bottom top',scrub:1.2}});
    });
   },root);
   ScrollTrigger.refresh();
  }
  function schedule(){if(!frame&&!disposed)frame=requestAnimationFrame(build)}
  const editorObserver=new MutationObserver(schedule);
  const editorRoot=root.closest('main')?.parentElement;
  if(editorRoot)editorObserver.observe(editorRoot,{attributes:true,attributeFilter:['class']});
  function focus(event){
   // Keyboard access should finish every enclosing mask immediately.
   for(let el=event.target;el&&el!==root;el=el.parentElement){
    const tween=animations.get(el);if(tween){tween.scrollTrigger?.kill();tween.progress(1);entered.add(el)}
   }
  }
  root.addEventListener('focusin',focus);
  reduced.addEventListener('change',schedule);
  let mobileMode=window.innerWidth<=760;
  function resize(){const next=window.innerWidth<=760;if(next!==mobileMode){mobileMode=next;schedule()}}
  window.addEventListener('resize',resize,{passive:true});
  build();
  document.fonts?.ready.then(()=>{if(!disposed)ScrollTrigger.refresh()});
  return()=>{disposed=true;cancelAnimationFrame(frame);editorObserver.disconnect();context?.revert();tracked.forEach(el=>{delete el.dataset.motionScene;delete el.dataset.motionProgress});root.removeEventListener('focusin',focus);reduced.removeEventListener('change',schedule);window.removeEventListener('resize',resize)};
 },[contentKey]);
}
