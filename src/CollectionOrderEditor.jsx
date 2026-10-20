import React,{useEffect,useRef,useState} from 'react';

import {moveImageKeys} from './gallery-layout';
export default function CollectionOrderEditor({groups,onOrderChange,onClose,getSource}){
 const dialog=useRef(),anchor=useRef(null),dragged=useRef([]),history=useRef([]);
 const [groupId,setGroupId]=useState(groups[0]?.id),[selected,setSelected]=useState([]),[target,setTarget]=useState(''),[position,setPosition]=useState(1),[canUndo,setCanUndo]=useState(false);
 const group=groups.find(item=>item.id===groupId)||groups[0],keys=group.images.map(image=>image.key),chosen=selected.filter(key=>keys.includes(key));
 const destination=keys.includes(target)&&!chosen.includes(target)?target:keys.find(key=>!chosen.includes(key))||'';
 useEffect(()=>{const focus=document.activeElement;dialog.current.showModal();return()=>focus?.focus()},[]);
 function apply(next){history.current.push(groups.flatMap(item=>item.images.map(image=>image.key)));setCanUndo(true);onOrderChange(groups.flatMap(item=>item.id===group.id?next:item.images.map(image=>image.key)))}
 function move(to,after=false,selection=chosen){apply(moveImageKeys(keys,selection,to,after))}
 function moveToPosition(){
  const moving=keys.filter(key=>chosen.includes(key)),remaining=keys.filter(key=>!chosen.includes(key));
  const index=Math.max(0,Math.min(remaining.length,Number(position)-1||0));
  apply([...remaining.slice(0,index),...moving,...remaining.slice(index)]);
 }
 function undo(){const previous=history.current.pop();if(previous)onOrderChange(previous);setCanUndo(history.current.length>0)}
 function select(index,event){
  const key=keys[index];
  if(event.shiftKey&&anchor.current!==null){const start=Math.min(anchor.current,index),end=Math.max(anchor.current,index);setSelected(previous=>[...new Set([...previous,...keys.slice(start,end+1)])])}
  else{setSelected(previous=>previous.includes(key)?previous.filter(item=>item!==key):[...previous,key]);anchor.current=index}
 }
 return <dialog className="collection-order-editor" ref={dialog} aria-label="批量调整图片顺序" onCancel={event=>{event.preventDefault();onClose()}}>
  <div className="order-editor-heading"><div><span className="section-label">ARRANGE YOUR WORK</span><h2>批量调整图片顺序</h2></div><button onClick={onClose} aria-label="关闭排序设置">✕</button></div>
  <p>勾选多张后一起移动；按住 Shift 可连选一段。也可以拖动已选图片到目标图片前。</p>
  <div className="order-editor-tabs">{groups.map(item=><button key={item.id} className={group.id===item.id?'active':''} onClick={()=>{setGroupId(item.id);setSelected([]);anchor.current=null}}>{item.label} · {item.images.length}</button>)}</div>
  <div className="order-batch-actions"><strong aria-live="polite">已选 {chosen.length} 张</strong><button onClick={()=>setSelected(keys)}>全选</button><button onClick={()=>setSelected([])}>清空选择</button><button disabled={!chosen.length} onClick={()=>move('start')}>移到最前</button><button disabled={!chosen.length} onClick={()=>move('end')}>移到最后</button><label>移到第<input type="number" min="1" max={Math.max(1,keys.length-chosen.length+1)} value={position} onChange={event=>setPosition(event.target.value)} aria-label="排序目标位置"/>位</label><button disabled={!chosen.length} onClick={moveToPosition}>移动到此位置</button><button disabled={!canUndo} onClick={undo}>撤销上次移动</button><label>目标图片<select aria-label="移动目标图片" value={destination} onChange={event=>setTarget(event.target.value)}><option value="" disabled>选择目标图片</option>{group.images.filter(image=>!chosen.includes(image.key)).map(image=><option key={image.key} value={image.key}>{keys.indexOf(image.key)+1}. {image.label}</option>)}</select></label><button disabled={!chosen.length||!destination} onClick={()=>move(destination)}>插到前面</button><button disabled={!chosen.length||!destination} onClick={()=>move(destination,true)}>插到后面</button></div>
  <div className="order-thumbnail-grid">{group.images.map((image,index)=><div className={'order-thumbnail '+(chosen.includes(image.key)?'is-selected':'')} key={image.key} draggable onDragStart={event=>{dragged.current=chosen.includes(image.key)?chosen:[image.key];setSelected(dragged.current);event.dataTransfer.effectAllowed='move';event.dataTransfer.setData('text/plain',image.key)}} onDragOver={event=>{if(dragged.current.length){event.preventDefault();event.dataTransfer.dropEffect='move'}}} onDragEnd={()=>{dragged.current=[]}} onDrop={event=>{event.preventDefault();if(dragged.current.length)move(image.key,false,dragged.current);dragged.current=[]}}><button role="checkbox" aria-checked={chosen.includes(image.key)} aria-label={'选择'+image.label} onClick={event=>select(index,event)}><img src={getSource(image)} alt={image.label} loading="lazy" draggable="false"/><span className="order-check">{chosen.includes(image.key)?'✓':'＋'}</span><span className="order-image-label">{String(index+1).padStart(2,'0')} · {image.label}</span></button></div>)}</div>
  <div className="order-editor-footer"><span>自动保存到当前浏览器 · 保持所选图片之间的顺序</span><button onClick={()=>{history.current.push(groups.flatMap(item=>item.images.map(image=>image.key)));setCanUndo(true);onOrderChange([]);setSelected([])}}>恢复默认顺序</button><button className="order-done" onClick={onClose}>完成排序 ✓</button></div>
 </dialog>;
}
