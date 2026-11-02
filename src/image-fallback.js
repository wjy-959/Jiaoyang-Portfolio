import fallbacks from './avif-fallbacks.json';
import {assetUrl} from './published-state';

// Capture image errors before component handlers: only the final failure reaches
// the viewer's error message. No timers, storage changes or repeated retry loop.
export function installImageFallbacks(){
 const routes=new Map(Object.entries(fallbacks).map(([src,fallback])=>[
  new URL(assetUrl(src),window.location.href).href,
  new URL(assetUrl(fallback),window.location.href).href
 ]));
 const attempted=new WeakMap();
 const handler=event=>{
  const img=event.target;
  if(!(img instanceof HTMLImageElement))return;
  const source=img.currentSrc||img.src;
  const fallback=routes.get(source);
  if(!fallback||attempted.get(img)===source)return;
  attempted.set(img,source);
  event.stopImmediatePropagation();
  img.removeAttribute('srcset');
  img.src=fallback;
 };
 document.addEventListener('error',handler,true);
 return ()=>document.removeEventListener('error',handler,true);
}
