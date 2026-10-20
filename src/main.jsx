import {assetUrl,loadPublishedState,currentRoute,routeUrl} from './published-state';
import {ProximityText} from './ProximityText';
import React, {lazy, Suspense, useState, useEffect, useRef} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';
import Hero from './Hero';
import About from './About';
import SkillSculpture from './SkillSculpture';
import ContactQrCard from './ContactQrCard';
import {portfolioProjects} from './project-summaries';
import {skills} from './skill-catalog';
const ProjectDetail=lazy(()=>import('./ProjectDetail'));
import SpotlightCard from './SpotlightCard';
import {CopyProvider,CopyText,useCopyValue} from './CopyEditor';
import useScrollEntrance from './useScrollEntrance';
import './readability.css';
import {MediaProvider,useMedia} from './MediaProvider';

const projects = [
  ...portfolioProjects.map(project=>({id:project.id,displayIndex:project.displayIndex,title:project.title,en:project.kind==='collection'?'COMMERCIAL VISUAL / SELECTED WORK':project.id==='01'?'LITIME / AMAZON LISTING':'AMAZON / PRODUCT VISUAL',category:project.category,tags:project.kind==='collection'?['工作节选','商业视觉','产品表现']:['Amazon Listing','A+视觉','产品表现'],image:project.thumbnail,detailPath:project.detailPath})),
  {id:'02',displayIndex:'06',title:'听见纯粹的力量',en:'THE SOUND OF SILENCE',category:'产品视觉',tags:['3C数码','产品表现','视觉叙事'],image:'/images/audio.svg',description:'以耳机为载体的产品视觉概念，利用材质、光线与留白，传达安静而有力量的科技质感。',scope:'产品表现 / 材质探索 / 视觉排版'},
  {id:'03',displayIndex:'07',title:'想象之外，自有世界',en:'OTHERWORLD EXPLORATION',category:'AI探索',tags:['AIGC方向','超现实','创意探索'],image:'/images/ai.svg',description:'以超现实景观为主题的视觉方向示意，作为后续 Midjourney、Stable Diffusion 实际作品的展示位置。',scope:'创意方向 / 氛围探索 / 视觉实验'},
  {id:'04',displayIndex:'08',title:'让品牌，自然生长',en:'UNFOLD — BRAND STUDY',category:'品牌设计',tags:['品牌概念','视觉系统','图形语言'],image:'/images/brand.svg',description:'虚构品牌 ünfold 的视觉概念封面，以几何图形与自然色彩建立统一的品牌语言，作为品牌项目的版式示意。',scope:'品牌概念 / 图形系统 / 视觉应用'},
];
const workProjects=portfolioProjects.map(meta=>projects.find(project=>project.id===meta.id));
const Arrow=({diagonal=true,...props})=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}>{diagonal?<path d="M5 19 19 5M5 5h14v14"/>:<path d="M4 12h16m-6-6 6 6-6 6"/>}</svg>;
function PortfolioHome({navigate}){
 const {media,previewMedia}=useMedia();
 const openProject=project=>{if(project.detailPath)navigate(project.detailPath);else setSelected(project)};
 const email=useCopyValue('1124772943@qq.com');
 const wechat=useCopyValue('wu1124772943');
 const [wechatCopied,setWechatCopied]=useState('');
 const [filter,setFilter]=useState('全部作品');
 const visibleProjects=workProjects.filter(project=>filter==='全部作品'||project.category===filter);
 useScrollEntrance(filter); const [selected,setSelected]=useState(null); const [copied,setCopied]=useState(false); const dialog=useRef(); const lastFocus=useRef();

 useEffect(()=>{if(selected){lastFocus.current=document.activeElement;dialog.current.showModal();document.body.style.overflow='hidden'}else{document.body.style.overflow='';lastFocus.current?.focus()}return()=>{document.body.style.overflow=''}},[selected]);
 async function copyEmail(){try{await navigator.clipboard.writeText(email);setCopied(true);setTimeout(()=>setCopied(false),2500)}catch{window.location.href='mailto:'+email}}
 async function copyWechat(){try{await navigator.clipboard.writeText(wechat);setWechatCopied('success')}catch{setWechatCopied('error')}setTimeout(()=>setWechatCopied(''),2500)}
 return <ProximityText cinematic>
 <a className="skip" href="#about">跳转到正文</a>
 <main>
 <Hero projects={projects} onSelect={openProject}/>
 <div className="post-hero"><div className="post-hero-content">
 <div className="discipline-strip"><span>VISUAL STORYTELLING</span><i>✳</i><span>3D EXPLORATION</span><i>✳</i><span>AI-DRIVEN CREATIVITY</span><i>✳</i><span>BRAND EXPERIENCE</span><i>✳</i></div>
 <About/>
 <section id="work" className="work section"><div className="wrap"><div className="section-top reveal"><span className="section-label">02 / SELECTED WORK</span><span className="section-aside">把每一个想法，认真落地。</span></div><div className="work-heading reveal"><h2 className="chapter-heading"><span className="chapter-title">精选作品</span><span className="chapter-slogan">以视觉，<span className="muted">回应想象。</span></span></h2><span className="work-count">SELECTED DIRECTIONS <sup>({String(workProjects.length).padStart(2,'0')})</sup></span></div><div className="filter-row"><div className="filters" role="group" aria-label="作品分类">{['全部作品','Listing设计','工作图节选'].map(f=><SpotlightCard as="button" key={f} className={'filter-chip '+(filter===f?'active':'')} aria-pressed={filter===f} onClick={()=>setFilter(f)}>{f}{f==='全部作品'&&<sup>{String(workProjects.length).padStart(2,'0')}</sup>}</SpotlightCard>)}</div><span className="demo-note">07 套实际项目</span></div><div className={'projects '+(filter==='全部作品'?'projects-seven':'projects-filtered')}>{visibleProjects.map(p=><SpotlightCard as="button" className="project-card" key={p.id} onClick={()=>openProject(p)} aria-label={`查看${p.title}${p.detailPath?'作品详情':'概念详情'}`}><div className={'project-image '+(p.detailPath?'real-project':'')}><span className="project-image-hover"><img src={previewMedia['project-'+p.id]||media['project-'+p.id]||assetUrl(p.image)} decoding="async" alt={p.title+(p.detailPath?'，项目封面':'，概念示意封面')} loading="lazy"/></span><span className="project-index">{p.displayIndex||p.id} / {p.category==='工作图节选'?'SELECTED VISUALS':p.detailPath?'AMAZON LISTING':'CONCEPT STUDY'}</span></div><div className="project-info"><div><span className="project-en">{p.en}</span><h3>{p.title}</h3></div><div className="project-tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div></div></SpotlightCard>)}</div><div className="work-end"><span>好的设计，是细节的总和。</span><span>MORE STORIES TO COME ↗</span></div></div></section>
 <section id="expertise" className="expertise section wrap"><div className="section-top reveal"><span className="section-label">03 / WHAT I BRING</span><span className="section-aside">不止于好看，更关乎价值。</span></div><div className="expertise-heading reveal"><h2 className="chapter-heading"><span className="chapter-title">个人优势</span><span className="chapter-slogan">创意有想法，<span className="muted">落地有方法。</span></span></h2><p>用多元的创作方式，解决具体的设计问题。<br/>在审美、技术与商业之间，找到恰好的平衡。</p></div><div className="skill-grid skill-grid-five">{skills.map(s=><SpotlightCard as="article" className="skill-card reveal" key={s.mediaKey}><div className="skill-top"><span>{s.n}</span><Arrow/></div><div className={'skill-art '+(media[s.mediaKey]?'has-custom-image':s.icon)}>{media[s.mediaKey]?<img src={media[s.mediaKey]} alt={s.name} loading="lazy"/>:<SkillSculpture type={s.icon}/>}</div><span className="skill-en">{s.en}</span><h3>{s.name}</h3><p>{s.text}</p><div className="skill-tools">{s.tools}</div></SpotlightCard>)}</div><div className="process reveal"><span>MY APPROACH</span><p>理解需求 <i>↗</i> 探索方向 <i>↗</i> 打磨细节 <i>↗</i> 推动落地</p></div></section>
 <section id="contact" className="contact"><div className="contact-glow"/><div className="wrap contact-inner"><div className="section-top"><span className="section-label">04 / LET’S CONNECT</span><span className="contact-availability"><span className="live-dot"/> 期待下一次有趣的合作</span></div><div className="contact-main"><div className="contact-lead"><span className="contact-kicker">GREAT THINGS START WITH A CONVERSATION.</span><h2>下一个精彩，<br/>从<span>一次对话</span>开始。</h2><div className="contact-action"><a href={'mailto:'+email}>LET’S TALK <Arrow/></a><p>有新的项目，或只是想聊聊设计？<br/>欢迎联系我，让想法发生。</p></div></div><ContactQrCard/><div className="contact-details"><div><span>EMAIL</span><button onClick={copyEmail}><CopyText text="1124772943@qq.com"/> <span className="copy-hint" aria-live="polite">{copied?'已复制 ✓':'复制 ↗'}</span></button></div><div><span>Wechat</span><button onClick={copyWechat}><CopyText text="wu1124772943"/> <span className="copy-hint" aria-live="polite">{wechatCopied==='success'?'已复制 ✓':wechatCopied==='error'?'请手动复制':'复制 ↗'}</span></button></div><div><span>LOCATION</span><p>中国 · 深圳 <small>SHENZHEN, CN</small></p></div></div></div><footer><a href="#home" className="monogram">w<span>j</span>y.</a><span>© {new Date().getFullYear()} 吴娇阳 · 用设计，创造更多可能。</span><a href="#home">回到顶部 ↑</a></footer></div></section>
 </div></div>
 </main>
 {selected&&<dialog ref={dialog} className="project-dialog" onCancel={()=>setSelected(null)} onClick={e=>{if(e.target===dialog.current)setSelected(null)}} onClose={()=>setSelected(null)}><div className="dialog-body"><button className="close-dialog" onClick={()=>{dialog.current.close();setSelected(null)}} aria-label="关闭项目详情">✕</button><img src={selected.previewImage||media['project-'+selected.id]||assetUrl(selected.image)} alt={selected.title+'概念封面'}/><div className="dialog-copy"><span className="section-label">{selected.en} / {selected.id}</span><h2>{selected.title}</h2><p>{selected.description}</p><p className="dialog-scope">{selected.scope}</p><div className="dialog-notice">展示说明：此图为网站基础版本的概念示意，并非已完成的真实客户项目。实际作品、项目背景与成果将在后续补充。</div></div></div></dialog>}
 </ProximityText>
}
function Site(){
 const [path,setPath]=useState(currentRoute);
 const homeScroll=useRef(0);
 function navigate(url){
  if(currentRoute()===url.split('#')[0]&&url.startsWith('/projects/'))return;
  if(currentRoute()==='/')homeScroll.current=window.scrollY;
  window.history.pushState({},'',routeUrl(url));setPath(currentRoute());
  requestAnimationFrame(()=>requestAnimationFrame(()=>{const id=window.location.hash.slice(1);if(id)document.getElementById(id)?.scrollIntoView({behavior:'instant',block:'start'});else window.scrollTo({top:0,behavior:'instant'})}));
 }
 useEffect(()=>{const pop=()=>{setPath(currentRoute());requestAnimationFrame(()=>requestAnimationFrame(()=>{if(currentRoute()==='/'){const id=window.location.hash.slice(1);if(id)document.getElementById(id)?.scrollIntoView({behavior:'instant',block:'start'});else window.scrollTo({top:homeScroll.current,behavior:'instant'})}else window.scrollTo({top:0,behavior:'instant'})}))};window.addEventListener('popstate',pop);return()=>window.removeEventListener('popstate',pop)},[]);
 const detailProject=portfolioProjects.find(project=>project.detailPath===path);
 return detailProject?<Suspense fallback={<div className="route-loading" role="status"><span>✳</span> 正在准备作品…</div>}><ProjectDetail key={detailProject.slug} project={detailProject} navigate={navigate}/></Suspense>:<PortfolioHome navigate={navigate}/>;
}
loadPublishedState().then(()=>createRoot(document.getElementById('root')).render(<MediaProvider><CopyProvider><Site/></CopyProvider></MediaProvider>)).catch(error=>{document.getElementById('root').textContent=error.message});
