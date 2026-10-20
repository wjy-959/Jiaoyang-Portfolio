import React,{useId} from 'react';
import './skill-sculpture.css';

export default function SkillSculpture({type}){
 const id=useId().replace(/:/g,'');
 const metal=`url(#${id}-metal)`,green=`url(#${id}-green)`,glass=`url(#${id}-glass)`;
 const sphere=(x,y,r,accent=false)=><g><circle cx={x+3} cy={y+5} r={r} fill="#020405"/><circle cx={x} cy={y} r={r} fill={accent?green:metal} stroke="#ffffff36"/></g>;
 return <svg className="skill-sculpture" viewBox="0 0 220 150" aria-hidden="true">
  <defs>
   <radialGradient id={`${id}-metal`} cx="28%" cy="20%" r="85%"><stop stopColor="#f4f6f1"/><stop offset=".22" stopColor="#aab4b0"/><stop offset=".58" stopColor="#3c4848"/><stop offset="1" stopColor="#0d1417"/></radialGradient>
   <linearGradient id={`${id}-green`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ecffb4"/><stop offset=".4" stopColor="#c6fa45"/><stop offset="1" stopColor="#405c14"/></linearGradient>
   <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#dce4e2" stopOpacity=".8"/><stop offset=".48" stopColor="#465859" stopOpacity=".6"/><stop offset="1" stopColor="#142021"/></linearGradient>
  </defs>
  <ellipse cx="111" cy="132" rx="64" ry="9" fill="#000" opacity=".35"/>
  {type==='project'?<g transform="translate(22 12) rotate(-12 85 60)">{[0,1,2].map(i=><g key={i} transform={`translate(${i*49} ${i*24})`}><rect x="4" y="7" width="48" height="37" rx="9" fill="#172324"/><rect width="48" height="37" rx="9" fill={i===2?green:glass} stroke="#e5f2ec66"/><path d={i===2?'M14 19l7 7 13-15':'M13 14h22m-22 9h14'} fill="none" stroke={i===2?'#283c10':'#e5f1e8'} strokeWidth="2"/></g>)}</g>:null}
  {type==='orb'?<g>{sphere(110,73,49)}<ellipse cx="110" cy="73" rx="49" ry="15" fill="none" stroke="#dfffaa" strokeWidth="2" transform="rotate(-28 110 73)"/><ellipse cx="110" cy="73" rx="22" ry="49" fill="none" stroke="#f1fff099" transform="rotate(-28 110 73)"/>{sphere(161,51,7,true)}</g>:null}
  {type==='spark'?<g transform="translate(110 75) rotate(-13)"><path d="M-10-54H10L15-17 46-43 59-27 25-4 62 5 58 25 19 13 28 52 8 57 0 20-21 52-38 41-14 10-54 14-57-7-19-10-42-39-26-52-7-20Z" transform="translate(5 8)" fill="#273615"/><path d="M-10-54H10L15-17 46-43 59-27 25-4 62 5 58 25 19 13 28 52 8 57 0 20-21 52-38 41-14 10-54 14-57-7-19-10-42-39-26-52-7-20Z" fill={green} stroke="#f3ffd0aa"/></g>:null}
  {type==='grid'?<g transform="translate(110 69)"><path d="m0-52 52 28v57L0 62-52 33v-57Z" fill="#1d2b2d"/><path d="m0-52 52 28L0 5-52-24Z" fill={metal} stroke="#e5eeeb88"/><path d="M-52-24 0 5v57l-52-29Z" fill={glass} stroke="#c9d6d344"/><path d="M0 5 52-24v57L0 62Z" fill={green} stroke="#c9eb8e88"/><path d="m-26-38 52 29m-52 0 52-29M-26-9v57M26-9v57" fill="none" stroke="#f4ffe94d"/></g>:null}
  {type==='collaboration'?<g><path d="M110 33 59 105h102ZM110 33v44m-51 28 51-28 51 28" fill="none" stroke="#90a68c" strokeWidth="6"/>{sphere(110,34,19)}{sphere(59,105,20)}{sphere(161,105,20)}{sphere(110,77,25,true)}</g>:null}
 </svg>;
}
