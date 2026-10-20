// One passive global listener per event, shared by every spotlight card.
const subscribers=new Set();
let detach,frame=0,pending={};
function broadcast(name,event){for(const subscriber of subscribers)subscriber[name]?.(event)}
function queued(name,event){
 pending[name]=event;
 if(frame)return;
 frame=requestAnimationFrame(()=>{frame=0;const events=pending;pending={};for(const [key,value] of Object.entries(events))broadcast(key,value)});
}
export function subscribeSpotlightEvents(handlers){
 subscribers.add(handlers);
 if(!detach){
  const events=[
   [window,'pointermove',event=>queued('onMove',event),{passive:true}],
   [window,'scroll',event=>queued('onScroll',event),{capture:true,passive:true}],
   [window,'resize',event=>queued('onResize',event),{passive:true}],
   [window,'pointerup',event=>broadcast('onUp',event),{passive:true}],
   [window,'pointercancel',event=>broadcast('onUp',event),{passive:true}],
   [document,'pointerout',event=>broadcast('onOut',event),{passive:true}]
  ];
  for(const [target,name,fn,options] of events)target.addEventListener(name,fn,options);
  detach=()=>{for(const [target,name,fn,options] of events)target.removeEventListener(name,fn,options)};
 }
 return()=>{
  subscribers.delete(handlers);
  if(!subscribers.size){detach?.();detach=null;cancelAnimationFrame(frame);frame=0;pending={}}
 };
}
