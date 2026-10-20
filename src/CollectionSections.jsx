import {canEdit} from './editor-mode';
import React,{useEffect,useState} from 'react';
import {ProximityText} from './ProximityText';
import './collection-sections.css';
import CollectionOrderEditor from './CollectionOrderEditor';

export default function CollectionSections({groups,renderImage,onOrderChange,getSource,sortRequest}){
 const [sorting,setSorting]=useState(false);
 useEffect(()=>{if(canEdit&&sortRequest)setSorting(true)},[sortRequest]);
 return <div className="collection-editorial">{canEdit&&<div className="collection-order-toolbar wrap"><span>多选图片，可一起移到最前、最后或指定位置</span><button disabled={!groups.length} onClick={()=>setSorting(true)}>调整图片顺序 ↔</button></div>}{canEdit&&sorting&&groups.length>0&&<CollectionOrderEditor groups={groups} onOrderChange={onOrderChange} onClose={()=>setSorting(false)} getSource={getSource}/>}{groups.map((group,groupIndex)=>{
  return <section key={group.id} id={'case-'+group.id} className={'collection-section collection-'+group.id+'-section wrap'} data-case-section>
   <ProximityText cinematic><div className="collection-heading"><div><span className="section-label">{String(groupIndex+1).padStart(2,'0')} / {group.en}</span><h2>{group.title}</h2></div><div className="collection-heading-aside"><span>{group.label}</span><small>{String(group.images.length).padStart(2,'0')} WORKS</small><i aria-hidden="true">✳</i></div></div></ProximityText>
   <div className={'collection-grid collection-'+group.id+(group.id==='square'&&group.images.length>=5?' has-feature':'')}>{group.images.map((image,index)=>{
    let layout='';
    if(group.id==='landscape')layout='collection-half';
    if(group.id==='square'&&group.images.length>=5&&index===0)layout='collection-square-feature';
    return <div className={'collection-piece '+layout} key={image.key}>{renderImage(image)}<div className="collection-piece-note"><span>{String(index+1).padStart(2,'0')}</span><span>{group.id==='landscape'?'WIDE / VISUAL STORY':group.id==='square'?'PRODUCT / VISUAL STUDY':'VERTICAL / SELECTED WORK'}</span></div></div>;
   })}</div>
  </section>;
 })}</div>;
}
