export function landscapePriority(image){
 const ratio=image.width/image.height;
 return ratio>=1.45&&ratio<2.05?0:ratio>=2.05&&ratio<=2.7?1:ratio<=2.7?2:3;
}
export function buildCollectionGroups(images,{order=[],energy=false}={}){
 const definitions=[['landscape','宽图海报','PANORAMAS & CAMPAIGNS','让视野，延伸。'],['square','方图视觉','PRODUCTS IN FOCUS','让产品，成为主角。'],['portrait','竖版作品','A DIFFERENT PERSPECTIVE','换个角度，看见更多。']];
 return definitions.map(([id,label,en,title])=>({id,label,en,title,images:images.filter(image=>{const ratio=image.width/image.height;return id==='landscape'?ratio>1.15:id==='square'?ratio>=.87&&ratio<=1.15:ratio<.87}).sort((a,b)=>{
 const ai=order.indexOf(a.key),bi=order.indexOf(b.key);
 if(ai>=0||bi>=0)return (ai<0?Infinity:ai)-(bi<0?Infinity:bi);
 if(energy&&id==='landscape'){
  const rank=image=>{const n=Number(image.label.match(/\d+/)?.[0]);return n>=37&&n<=45?0:n>=19&&n<=30?1:n===18?2:n>=8&&n<=12?4:n>=2&&n<=6?5:3};
  const priority=rank(a)-rank(b);if(priority)return priority;
 }
 return (id==='landscape'?landscapePriority(a)-landscapePriority(b):0)||Math.round(b.width/b.height*10)-Math.round(a.width/a.height*10);
 })})).filter(group=>group.images.length);
}

export function swipeDirection(dx,dy,elapsed,width){
 const distance=Math.abs(dx);
 if(distance<24||distance<Math.abs(dy)*1.25)return 0;
 const threshold=Math.max(46,Math.min(110,width*.1));
 return distance>=threshold||distance/Math.max(elapsed,1)>.45?(dx<0?1:-1):0;
}

export function moveImageKeys(keys,selected,target,after=false){
 const moving=keys.filter(key=>selected.includes(key)),remaining=keys.filter(key=>!selected.includes(key));
 if(!moving.length)return keys;
 if(target==='start')return [...moving,...remaining];
 if(target==='end')return [...remaining,...moving];
 const index=remaining.indexOf(target);if(index<0)return keys;
 return [...remaining.slice(0,index+(after?1:0)),...moving,...remaining.slice(index+(after?1:0))];
}
