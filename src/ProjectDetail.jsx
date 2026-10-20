import {readSetting,routeUrl} from './published-state';
import {canEdit} from './editor-mode';
import React,{useEffect,useMemo,useRef,useState} from 'react';
import {ProximityText} from './ProximityText';
import {useMedia} from './MediaProvider';
import {listingProjects} from './project-catalog';
import './project-detail.css';
import CollectionSections from './CollectionSections';
import ProjectImageViewer from './ProjectImageViewer';
import {buildCollectionGroups} from './gallery-layout';
import useCaseMotion from './useCaseMotion';
import SpotlightCard from './SpotlightCard';

const allChapters=[['overview','项目概览'],['poster','项目海报'],['listing','Listing 主图'],['aplus','A+ 视觉'],['product','产品白底图']];

export default function ProjectDetail({navigate,project:summary}){
 const project=listingProjects.find(item=>item.id===summary.id);
 const isCollection=project.kind==='collection';
 const {media,previewMedia,uploaded,uploadProjectImages,hidden,setImageHidden,upload,busy,notice,remove}=useMedia();
 const extra=uploaded.filter(image=>image.projectSlug===project.slug).map(image=>({...image,src:media[image.key]}));
 const listing=useMemo(()=>[...project.listing,...extra.filter(image=>image.type==='listing')],[project,uploaded,media]);
 const aplus=[...project.aplus,...extra.filter(image=>image.type==='aplus')],products=[...project.products,...extra.filter(image=>image.type==='products')],posters=[...(project.posters||[]),...extra.filter(image=>image.type==='posters')];
 const [uploadType,setUploadType]=useState('listing'),[sortRequest,setSortRequest]=useState(0);
 const allImages=[...listing,...aplus,...products,...posters];
 const thumbnailKey='project-'+project.id;
 const editableImages=[{key:thumbnailKey,src:project.thumbnail,label:'项目缩略图（首页作品卡片）'},...allImages];
 const visibleListing=listing.filter(image=>!hidden[image.key]),visibleAplus=aplus.filter(image=>!hidden[image.key]),visibleProducts=products.filter(image=>!hidden[image.key]);
 const visiblePosters=posters.filter(image=>!hidden[image.key]);
 const orderStorageKey='jiaoyang-collection-order-'+project.slug;
 const [customOrder,setCustomOrder]=useState(()=>{try{const value=readSetting(orderStorageKey,[]);return Array.isArray(value)?value.filter(key=>typeof key==='string'):[]}catch{return []}});
 function saveOrder(keys){if(!canEdit)return;setCustomOrder(keys);try{if(keys.length)localStorage.setItem(orderStorageKey,JSON.stringify(keys));else localStorage.removeItem(orderStorageKey)}catch{}}
 const collectionGroups=useMemo(()=>isCollection?buildCollectionGroups(listing.filter(image=>!hidden[image.key]),{order:customOrder,energy:project.slug==='energy-selection'}):[],[isCollection,listing,hidden,customOrder]);
 const featuredImage=!isCollection&&visibleListing.length>=5?(visibleListing.find(image=>image.key===project.featuredImageKey)||visibleListing[0]):null;
 const arrangedListing=isCollection?collectionGroups.flatMap(group=>group.images):featuredImage?[featuredImage,...visibleListing.filter(image=>image!==featuredImage)]:visibleListing;
 const images=[...visiblePosters,...arrangedListing,...visibleAplus,...visibleProducts];
 const chapters=(isCollection?[['overview','项目概览'],...collectionGroups.map(group=>[group.id,group.label])]:allChapters.filter(([id])=>id==='overview'||(id==='listing'?visibleListing.length:id==='aplus'?visibleAplus.length:id==='product'?visibleProducts.length:visiblePosters.length)>0)).map(([id,label],index)=>[id,label,String(index).padStart(2,'0')]);
 const chapterNumber=id=>chapters.find(chapter=>chapter[0]===id)?.[2]||'00';
 const connected=project.mergeFirstTwo?aplus.slice(0,2).filter(image=>!hidden[image.key]):[];
 const [active,setActive]=useState('overview'),[view,setView]=useState(null),[editing,setEditing]=useState(false);
 const editor=useRef(),progress=useRef();
 const caseRoot=useRef();
 useCaseMotion(caseRoot,images.map(image=>image.key).join('|'),editing);
 const source=image=>media[image.key]||image.src;
 useEffect(()=>{
  const title=document.title;document.title=project.displayName+(isCollection?'':' Listing')+' · 吴娇阳作品集';
  
  let frame=0;const scroll=()=>{if(frame)return;frame=requestAnimationFrame(()=>{frame=0;const current=[...document.querySelectorAll('[data-case-section]')].filter(el=>el.getBoundingClientRect().top<=220).at(-1);if(current)setActive(current.id.replace('case-',''));const total=document.documentElement.scrollHeight-window.innerHeight;if(progress.current)progress.current.style.transform=`scaleX(${total>0?Math.min(1,window.scrollY/total):0})`})};
  const open=()=>{if(canEdit)setEditing(true)};window.addEventListener('portfolio:open-media',open);window.addEventListener('scroll',scroll,{passive:true});scroll();
  return()=>{document.title=title;cancelAnimationFrame(frame);window.removeEventListener('scroll',scroll);window.removeEventListener('portfolio:open-media',open)};
 },[]);
 useEffect(()=>{if(editing)editor.current?.showModal()},[editing]);
 function jump(id){setActive(id);document.getElementById('case-'+id)?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'})}
 function imageCard(image,priority=false,featured=false,joined=false){const Card=joined?'button':SpotlightCard;return <Card {...(!joined?{as:'button',allowLarge:true,spotlightColor:'#ffffff'}:{})} className={'case-image-button '+(featured?'case-image-featured ':'')+(image.type==='aplus'&&image.height/image.width>.65&&!project.mergeFirstTwo?'case-image-tall':'')+(isCollection&&image.width/image.height>2.5?' case-image-wide':'')} key={image.key} onClick={()=>setView(images.indexOf(image))} aria-label={'放大查看'+image.label}><img src={previewMedia[image.key]||media[image.key]||image.preview||image.src} alt={project.displayName+' — '+image.label} loading={priority?'eager':'lazy'} decoding="async" draggable="false" width={image.width} height={image.height}/><span className="case-image-zoom" aria-hidden="true">↗</span></Card>}
 return <div ref={caseRoot} className="case-page">
  <header className="case-header wrap"><a className="studio-identity" href={routeUrl('/#home')} onClick={e=>{e.preventDefault();navigate('/#home')}}><span className="studio-mark">W<span>↗</span></span><span className="studio-name">WU JIAOYANG<small>VISUAL DESIGNER</small></span></a><span className="case-header-label">SELECTED WORK / {project.displayIndex}</span><div className="case-header-actions">{canEdit&&<button type="button" className="case-manage-images" onClick={()=>setEditing(true)}>＋ 上传 / 管理图片</button>}<a className="case-back" href={routeUrl('/#work')} onClick={e=>{e.preventDefault();navigate('/#work')}}>↖ 返回作品集</a></div><div className="case-reading-progress" ref={progress}/></header>
  <main>
   <section className="case-overview wrap" id="case-overview" data-case-section>
    <ProximityText cinematic><div className="case-eyebrow"><span className="live-dot"/> {isCollection?'COMMERCIAL VISUAL / SELECTED WORK':'AMAZON COMMERCE / PRODUCT VISUAL'}</div><div className="case-title-row"><h1><span>{project.accent}</span>{project.name&&<> {project.name}</>}<span className="case-title-sub">{isCollection?'商业视觉节选':'Listing 视觉设计'}<span className="case-title-star" aria-hidden="true">✳</span></span></h1></div><div className="case-meta"><div><small>PROJECT / 项目</small><p>{project.id==='01'?'LiTime · 24V 充电器':project.displayName}</p></div><div><small>PLATFORM / 平台</small><p>{project.platform}</p></div><div><small>DELIVERABLES / 设计内容</small><p>{isCollection?'产品视觉 / 电商设计 / 场景表现':(products.length?'Listing 主图 / A+ 页面 / 白底图':'Listing 主图 / A+ 页面')+(posters.length?' / 海报':'')}</p></div></div></ProximityText>
   </section>
   <div className="case-chapter-bar"><nav className="wrap" aria-label="项目章节">{chapters.map(([id,label,n])=><button key={id} onClick={()=>jump(id)} className={active===id?'active':''} aria-current={active===id?'location':undefined}><small>{n}</small>{isCollection&&id==='listing'?'作品图集':label}</button>)}<span>SCROLL TO EXPLORE <i>↓</i></span></nav></div>
   {visiblePosters.length>0&&<section className="case-section case-posters wrap" id="case-poster" data-case-section><ProximityText cinematic><div className="case-section-heading"><span className="section-label">{chapterNumber('poster')} / POSTER DESIGN</span><p><small>{String(visiblePosters.length).padStart(2,'0')} POSTERS / 16:9</small></p></div></ProximityText><div className="case-poster-grid">{visiblePosters.map(image=>imageCard(image))}</div></section>}
   {isCollection&&<CollectionSections groups={collectionGroups} sortRequest={sortRequest} getSource={image=>previewMedia[image.key]||media[image.key]||image.preview||image.src} onOrderChange={saveOrder} renderImage={image=>imageCard(image)}/>}
   {!isCollection&&visibleListing.length>0&&<section className="case-section wrap" id="case-listing" data-case-section><ProximityText cinematic><div className="case-section-heading"><div><span className="section-label">{chapterNumber('listing')} / LISTING GALLERY</span></div><p><small>{String(visibleListing.length).padStart(2,'0')} IMAGES / {project.listingRatio}</small></p></div></ProximityText><div className={'case-listing-grid '+(featuredImage?'case-listing-featured':'')}>{arrangedListing.map(image=>imageCard(image,false,image===featuredImage))}</div></section>}
   {visibleAplus.length>0&&<section className="case-aplus-section" id="case-aplus" data-case-section><div className="wrap"><ProximityText cinematic><div className="case-section-heading"><div><span className="section-label">{chapterNumber('aplus')} / A+ CONTENT</span></div><p><small>{String(visibleAplus.length).padStart(2,'0')} IMAGES / WIDE FORMAT</small></p></div></ProximityText><div className="case-aplus-stack">{connected.length>0&&<SpotlightCard allowLarge spotlightColor="#ffffff" className={'case-aplus-connected '+(connected.length===1?'single-panel':'')} aria-label="A+ 前两张连续画面">{<div className="case-connected-artwork">{connected.map(image=>imageCard(image,false,false,true))}</div>}</SpotlightCard>}{aplus.slice(project.mergeFirstTwo?2:0).filter(image=>!hidden[image.key]).map(image=>imageCard(image))}</div></div></section>}
   {visibleProducts.length>0&&<section className="case-section wrap" id="case-product" data-case-section><ProximityText cinematic><div className="case-section-heading"><div><span className="section-label">{chapterNumber('product')} / PRODUCT DETAILS</span></div><p><small>{String(visibleProducts.length).padStart(2,'0')} IMAGES / 1:1</small></p></div></ProximityText><div className={'case-product-grid case-product-count-'+visibleProducts.length}>{visibleProducts.map(image=>imageCard(image))}</div></section>}
   <section className="case-end wrap"><ProximityText cinematic><span className="section-label">THANK YOU FOR WATCHING</span><h2>好的视觉，<span>让产品被看见。</span></h2></ProximityText><a href={routeUrl('/#work')} onClick={e=>{e.preventDefault();navigate('/#work')}}>返回精选作品 <span>↗</span></a><div className="case-end-bottom"><span>WU JIAOYANG / VISUAL · AI · BRAND</span><button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>回到顶部 ↑</button></div></section>
  </main>
  {view!==null&&images[view]&&<ProjectImageViewer images={images} index={view} onIndexChange={setView} onClose={()=>setView(null)} getSource={source} getPreview={image=>previewMedia[image.key]||media[image.key]||image.preview||image.src} title={project.displayName}/>}
  {canEdit&&editing&&<dialog className="case-media-editor" ref={editor} aria-labelledby="case-editor-title" onCancel={()=>setEditing(false)} onClose={()=>setEditing(false)}><div className="case-editor-top"><div><span className="section-label">PROJECT IMAGES</span><h2 id="case-editor-title">项目图片管理</h2></div><button onClick={()=>setEditing(false)} aria-label="关闭项目图片设置">✕</button></div><p>可独立替换项目缩略图；删除的作品图片不再展示，可随时恢复。图片与删除设置保存在当前浏览器。</p><div className="case-batch-upload">{isCollection&&<button className="case-sort-launch" onClick={()=>{setEditing(false);setSortRequest(value=>value+1)}}>多选 / 批量排序 ↔</button>}{!isCollection&&<label>上传到<select value={uploadType} onChange={event=>setUploadType(event.target.value)} aria-label="新增图片板块"><option value="listing">Listing 主图</option><option value="aplus">A+ 视觉</option><option value="products">产品白底图</option><option value="posters">项目海报</option></select></label>}<label className="case-upload-button">{busy?'正在上传…':'＋ 批量上传图片'}<input type="file" multiple accept="image/jpeg,image/png,image/webp,image/avif,image/gif" aria-label="批量上传项目图片" disabled={busy} onChange={event=>{uploadProjectImages(project.slug,isCollection?'listing':uploadType,event.target.files);event.target.value=''}}/></label><span>可一次选择多张，按文件名自然排序；节选项目自动归入宽图、方图或竖图。</span>{notice&&<span className="case-upload-notice" role="status">{notice}</span>}</div><div className="case-edit-grid">{editableImages.map(image=><div key={image.key} className={hidden[image.key]?'case-image-deleted':undefined}><label><img src={previewMedia[image.key]||media[image.key]||image.preview||image.src} alt={image.label} loading="lazy"/><span>{image.label}<i>替换 ↗</i></span><input type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" aria-label={'替换'+image.label} disabled={busy} onChange={e=>{upload(image.key,e.target.files[0]);e.target.value=''}}/></label><div className="case-image-actions">{media[image.key]&&!image.projectSlug&&<button disabled={busy} onClick={()=>remove(image.key)}>恢复原图</button>}{image.key!==thumbnailKey&&<button disabled={busy} className={hidden[image.key]?'restore-image':'delete-image'} aria-label={(hidden[image.key]?'恢复展示':'删除')+image.label} onClick={()=>setImageHidden(image.key,!hidden[image.key])}>{hidden[image.key]?'恢复展示 ↶':'删除图片 ×'}</button>}</div>{hidden[image.key]&&<span className="case-deleted-label">已删除 · 不在作品页展示</span>}</div>)}</div><p role="status">{notice||(isCollection?'上传后点击完成，再用「调整图片顺序」批量移动图片。':'先选择上传板块，再批量添加图片；点击缩略图可替换已有图片。')}</p><button className="case-editor-done" onClick={()=>setEditing(false)}>完成，查看效果 ↗</button></dialog>}
 </div>;
}
