// Feather the moving edge while retaining the existing choreography and timing.
export function softReveal(from,to){
 const {clipPath:initialClip,...start}=from;
 const {clipPath:finalClip,...end}=to;
 if(!initialClip)return [start,end];
 const horizontal=initialClip.includes('0% 100% 0% 0%')||initialClip.includes('0% 50% 0% 50%');
 const centered=initialClip.includes('48%')||initialClip.includes('0% 50% 0% 50%');
 const mask=centered?`linear-gradient(${horizontal?'90deg':'180deg'},transparent,#000 14%,#000 86%,transparent)`:`linear-gradient(${horizontal?'90deg':'180deg'},#000 calc(var(--soft-reveal) - 22%),transparent var(--soft-reveal))`;
 const sizing=centered?{maskSize:horizontal?'var(--soft-reveal) 100%':'100% var(--soft-reveal)',maskPosition:'center',maskRepeat:'no-repeat'}:{};
 return [
  {...start,...sizing,opacity:0,'--soft-reveal':'0%',maskImage:mask,webkitMaskImage:mask},
  {...end,opacity:1,'--soft-reveal':centered?'144%':'122%',clearProps:[end.clearProps?.replace(/clipPath,?/g,''),'maskImage','webkitMaskImage','maskSize','maskPosition','maskRepeat','--soft-reveal','opacity'].filter(Boolean).join(',')}
 ];
}
