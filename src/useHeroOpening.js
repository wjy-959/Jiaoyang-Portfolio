import {useLayoutEffect} from 'react';
import {gsap} from 'gsap';
import {softReveal} from './softReveal';

// The background's outer shell moves; the user's image framing stays untouched.
export default function useHeroOpening(rootRef){
 useLayoutEffect(()=>{
  const root=rootRef.current;
  if(!root)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let context,observer;
  function finish(){context?.revert();root.dataset.opening='complete'}
  function play(){
   observer?.disconnect();
   if(reduced.matches||window.scrollY>root.offsetHeight*.5){finish();return}
   context=gsap.context(()=>{
    const q=gsap.utils.selector(root);
    root.dataset.opening='playing';
    const tl=gsap.timeline({defaults:{ease:'expo.inOut'},onComplete:()=>{root.dataset.opening='complete'}});
    const reveal=(target,from,to,at)=>tl.fromTo(target,...softReveal(from,to),at);
    reveal(q('.cinema-background'),{clipPath:'inset(48% 8% 48% 8%)',scale:1.12},{clipPath:'inset(0% 0% 0% 0%)',scale:1,duration:2.25,clearProps:'clipPath,transform'},0)
    reveal(q('.hero-frame'),{clipPath:'inset(0% 100% 0% 0%)'},{clipPath:'inset(0% 0% 0% 0%)',duration:1.8,clearProps:'clipPath'},.3)
    reveal(q('.intro-overline'),{clipPath:'inset(0% 100% 0% 0%)',x:30},{clipPath:'inset(0% 0% 0% 0%)',x:0,duration:1.15,clearProps:'clipPath,transform'},.55)
    reveal(q('.intro-title-mask'),{clipPath:'inset(0% -30% 100% -5%)'},{clipPath:'inset(-50% -30% -30% -5%)',duration:1.6,stagger:.22,clearProps:'clipPath'},.6)
    reveal(q('.intro-name,.intro-portfolio'),{yPercent:120,x:50,scaleY:.48,scaleX:1.13,rotation:5,transformOrigin:'0% 100%'},{yPercent:0,x:0,scaleY:1,scaleX:1,rotation:0,duration:1.9,stagger:.22,ease:'expo.out',clearProps:'transform'},.65)
    reveal(q('.intro-stars'),{rotation:-110,scale:.25},{rotation:0,scale:1,duration:2,clearProps:'transform'},1.15)
    reveal(q('.intro-description'),{y:35,clipPath:'inset(0% 0% 100% 0%)'},{y:0,clipPath:'inset(0% 0% 0% 0%)',duration:1.4,clearProps:'clipPath,transform'},1.25)
    reveal(q('.hero-gallery'),{y:100,clipPath:'inset(0% 50% 0% 50%)'},{y:0,clipPath:'inset(0% 0% 0% 0%)',duration:1.85,clearProps:'clipPath,transform'},1.3)
    reveal(q('.gallery-group:first-child .gallery-card'),{y:65,scale:.85},{y:0,scale:1,duration:1.5,stagger:.065,ease:'power4.out',clearProps:'transform'},1.65)
    reveal(q('.cinema-controls'),{y:25,clipPath:'inset(0% 100% 0% 0%)'},{y:0,clipPath:'inset(0% 0% 0% 0%)',duration:1.2,clearProps:'clipPath,transform'},2);
   },root);
  }
  // Wait until the existing asset loader has left, without a second loading screen.
  if(document.documentElement.classList.contains('is-site-loading')){
   context=gsap.context(()=>gsap.set(root.querySelectorAll('.cinema-background,.hero-frame,.intro-overline,.intro-title-mask,.intro-description,.hero-gallery,.cinema-controls'),{opacity:0}),root);
   observer=new MutationObserver(()=>{if(!document.documentElement.classList.contains('is-site-loading')){context?.revert();play()}});
   observer.observe(document.documentElement,{attributes:true,attributeFilter:['class']});
  }else play();
  function skip(){if(document.querySelector('.copy-editing')||root.contains(document.activeElement))finish()}
  const editorObserver=new MutationObserver(skip);
  const editorRoot=root.closest('.copy-editing')||root.closest('main')?.parentElement;
  if(editorRoot)editorObserver.observe(editorRoot,{attributes:true,attributeFilter:['class']});
  root.addEventListener('focusin',skip);
  reduced.addEventListener('change',finish);
  return()=>{observer?.disconnect();editorObserver.disconnect();context?.revert();root.removeEventListener('focusin',skip);reduced.removeEventListener('change',finish)};
 },[rootRef]);
}
