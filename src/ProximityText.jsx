import React from 'react';
import {CopyText} from './CopyEditor';
import FoldText from './FoldText';

const excludedTags=new Set(['button','label','svg','script','style','textarea','input','select','option','img','video']);
const excludedClasses=/\b(spotlight-card|project-card|project-tags|bio-tools|career-role|studio-header|monogram|intro-stars|intro-signature|career-node|portrait-star|live-dot|gallery-card|media-editor|project-dialog|skill-card|filter-chip|skip)\b/;
function transformText(child,inHeading=false,animateAllowed=true,inHero=false,cinematic=false){
 if(typeof child==='number')child=String(child);
 if(typeof child==='string')return /[\p{L}\p{N}]/u.test(child)?<CopyText text={child}>{inHeading&&animateAllowed&&!cinematic?text=><FoldText text={text} trigger={inHero?'mount':'scroll'} foldStyle="paper" splitBy="char" foldAngle={82} duration={.7} stagger={.035} creaseShading={.2} perspective={900} hoverRefold={false}/>:undefined}</CopyText>:child;
 if(!React.isValidElement(child))return child;
 if(['svg','script','style','textarea','input','select','option'].includes(child.type))return child;
 if(!child.props.children)return child;
 const allowed=animateAllowed&&!excludedTags.has(child.type)&&!excludedClasses.test(child.props.className||'')&&(typeof child.type==='string'||child.type===React.Fragment);
 const isLargeHeading=inHeading||child.type==='h1'||child.type==='h2';
 return React.cloneElement(child,{},React.Children.map(child.props.children,c=>transformText(c,isLargeHeading,allowed,inHero||child.props.id==='home',cinematic)));
}
export function ProximityText({children,cinematic=false}){return <>{React.Children.map(children,c=>transformText(c,false,true,false,cinematic))}</>}
