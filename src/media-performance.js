export function criticalImages(route,media,previews,hero,projects){
 const project=projects.find(item=>item.detailPath===route);
 if(project)return [previews['project-'+project.id]||media['project-'+project.id]||project.thumbnail];
 if(route!=='/')return [];
 return [...new Set([
  previews.background||media.background||hero.poster,
  ...hero.slides.map((slide,index)=>previews['slide-'+index]||media['slide-'+index]||previews['project-'+slide.project]||media['project-'+slide.project]||slide.image)
 ])];
}

// Only use a generated preview when it belongs to this exact browser upload.
export async function previewForUpload(record,preview,fingerprint){
 if(!preview||!fingerprint||!globalThis.crypto?.subtle)return null;
 try{
  const digest=await crypto.subtle.digest('SHA-256',await record.file.arrayBuffer());
  const hash=Array.from(new Uint8Array(digest),value=>value.toString(16).padStart(2,'0')).join('');
  return hash===fingerprint?preview:null;
 }catch{return null}
}
