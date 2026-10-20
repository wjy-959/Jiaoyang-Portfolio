import {assetUrl} from './published-state';
import {ProximityText} from './ProximityText';
import React from 'react';
import TiltedCard from './TiltedCard';

import './about.css';
import {useMedia} from './MediaProvider';

const career = [
  {date:'2024.08 — 2026.10',company:'深圳安培时代数字能源科技有限公司',role:'视觉设计师',focus:'新能源产品 / Amazon / 独立站',tasks:['负责 Amazon 与独立站主视觉 KV、Listing 及季度新品视觉，完成节日促销页面与 Banner。','配合运营迭代 Listing，把控团队线上品牌视觉，推动统一的视觉方案落地。']},
  {date:'2023.07 — 2024.08',company:'深圳市菲德越科技有限公司',role:'电商设计师',focus:'京东视觉 / 跨平台电商设计',tasks:['负责京东主图、车图、详情页与海报，协助 Amazon、独立站及社媒物料制作。','完成 Amazon 店铺装修与 Listing 视觉方案，通过竞品分析优化产品套图与品牌形象。']},
  {date:'2022.03 — 2023.04',company:'深圳索爱数码科技有限公司',role:'电商美工',focus:'3C 数码 / 三维产品表现',tasks:['负责各电商平台的产品主图、详情页、店铺活动页面及广告海报。','使用 C4D、Octane 与 Photoshop 制作产品图，配合运营完成日常和活动视觉物料。']},
];

export default function About(){
 const {media,previewMedia}=useMedia();
 return <ProximityText cinematic><section id="about" className="bio-section section">
  <div className="wrap">
   <div className="bio-layout reveal">
    <div className="bio-photo"><TiltedCard spotlight imageLoading="lazy" imageSrc={previewMedia.portrait||media.portrait||assetUrl('/images/portrait.png')} altText="吴娇阳个人照片" containerWidth="100%" containerHeight="100%" imageWidth="100%" imageHeight="100%" rotateAmplitude={8} scaleOnHover={1.035} radius={20} smoothness={0.55} glare={0.25} shadow={0.4} showTooltip={false} displayOverlayContent={false} flipOnClick={false} gyroscope={false} intro={false} style={{position:'absolute',inset:0}}/></div>
    <div className="bio-content">
     <div className="bio-overline"><span className="section-label">01 / ABOUT ME</span><span><i className="live-dot"/> SHENZHEN, CN</span></div>
     <h2 className="chapter-heading"><span className="chapter-title">个人经历</span><span className="chapter-slogan">Hi, I’m <span>Jiaoyang.</span></span></h2>
     <p className="bio-summary">我是吴娇阳，一名视觉设计师。近 3 年专注 <em>3C 数码与新能源储能</em>，将三维表现、品牌视觉与 AI 创作融入设计，让产品价值拥有清晰而有辨识度的表达。</p>
     <dl className="bio-facts">
      <div><dt>专业身份 <span>ROLE</span></dt><dd>视觉设计师 / AI 设计师 / 品牌设计师</dd></div>
      <div><dt>服务方向 <span>FOCUS</span></dt><dd>产品视觉 / 3D 渲染 / 品牌电商</dd></div>
      <div className="bio-zcool"><dt>站酷 <span>ZCOOL</span></dt><dd><a href="https://www.zcool.com.cn/u/ZODAwMzE5ODQ=" target="_blank" rel="noopener noreferrer" className="bio-zcool-link"><span>我的站酷主页</span><span className="bio-zcool-url">https://www.zcool.com.cn/u/ZODAwMzE5ODQ=</span><span aria-hidden="true">↗</span></a></dd></div>
     </dl>
     <div className="bio-numbers"><div><strong>6<span>年</span></strong><p>设计工作经验</p></div><div><strong>3<span>年</span></strong><p>垂直领域深耕</p></div><div><strong>3<span>类平台</span></strong><p>Amazon / 独立站 / 京东</p></div></div>
     <div className="bio-toolkit"><div className="bio-toolkit-label"><span>MY CREATIVE TOOLKIT</span><a href="/resume.pdf" target="_blank" rel="noreferrer">查看完整简历 ↗</a></div><div className="bio-tools">{['Cinema 4D','Octane','Photoshop','KeyShot','Midjourney','Stable Diffusion','Figma'].map(tool=><span key={tool}>{tool}</span>)}</div></div>
    </div>
   </div>
   <div className="career-section reveal"><div className="career-heading"><span className="section-label">CAREER PATH</span><h3>工作经历</h3></div><div className="career-track">{career.map(job=><article className="career-stop" key={job.company}><span className="career-node" aria-hidden="true">✦</span><div className="career-detail"><time>{job.date}</time><h4>{job.company}</h4><span className="career-role">{job.role}</span><p className="career-focus">{job.focus}</p><ul>{job.tasks.map(task=><li key={task}>{task}</li>)}</ul></div></article>)}</div></div>
  </div>
 </section></ProximityText>
}
