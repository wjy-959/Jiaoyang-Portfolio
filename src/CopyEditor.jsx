import {readSetting} from './published-state';
import ReleasePackageButton from './ReleasePackageButton';
import {canEdit} from './editor-mode';
import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import './CopyEditor.css';

const STORAGE_KEY='jiaoyang-portfolio-copy';
const CopyContext=createContext({values:{},editing:false});
function readCopy(){try{const value=readSetting(STORAGE_KEY,{});return value&&typeof value==='object'&&!Array.isArray(value)?value:{}}catch{return {}}}
export function useCopyValue(text){const {values}=useContext(CopyContext);return values[text.trim()]??text.trim()}

export function CopyText({text,children}){
 const {values,editing}=useContext(CopyContext);
 const key=text.trim();
 const value=values[key]??key;
 const before=text.match(/^\s*/)[0],after=text.match(/\s*$/)[0];
 if(editing)return <span className="editable-copy" data-copy-key={key} title="点击修改文字">{before}{value}{after}</span>;
 return children?children(before+value+after):<>{before}{value}{after}</>;
}

export function CopyProvider({children}){
 const [values,setValues]=useState(readCopy),[editing,setEditing]=useState(false),[active,setActive]=useState(null),[draft,setDraft]=useState(''),[status,setStatus]=useState('');
 const dialog=useRef(null);
 useEffect(()=>{if(!canEdit)return;try{localStorage.setItem(STORAGE_KEY,JSON.stringify(values));setStatus('')}catch{setStatus('保存失败，请导出文案备份。')}},[values]);
 useEffect(()=>{if(active!==null)dialog.current?.showModal()},[active]);
 function choose(event){
  if(!editing)return;
  const target=event.target.closest('[data-copy-key]');
  if(!target)return;
  event.preventDefault();event.stopPropagation();
  const key=target.dataset.copyKey;setDraft(values[key]??key);setActive(key);
 }
 function close(){dialog.current?.close();setActive(null)}
 function save(){setValues(previous=>({...previous,[active]:draft}));close()}
 function exportCopy(){const url=URL.createObjectURL(new Blob([JSON.stringify(values,null,2)],{type:'application/json'}));const link=document.createElement('a');link.href=url;link.download='作品集文案.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
 return <CopyContext.Provider value={{values,editing}}><div onClickCapture={choose} className={editing?'copy-editing':undefined}>{children}</div>
  {canEdit&&<div className="copy-toolbar" aria-label="网站文案编辑"><button onClick={()=>window.dispatchEvent(new Event('portfolio:open-media'))}>▧ 替换图片</button><ReleasePackageButton/><button onClick={()=>setEditing(value=>!value)} aria-pressed={editing}>{editing?'✓ 完成编辑':'✎ 编辑文案'}</button>{editing&&<><span>点击任意文字修改 · 自动保存到当前浏览器</span><button onClick={exportCopy}>导出文案</button></>}{status&&<span role="status">{status}</span>}</div>}
  {canEdit&&active!==null&&<dialog className="copy-dialog" ref={dialog} onCancel={()=>setActive(null)} onClose={()=>setActive(null)} aria-labelledby="copy-dialog-title"><h2 id="copy-dialog-title">修改文字</h2><p>保存后立即显示，刷新页面仍然保留。</p><label htmlFor="copy-draft">文字内容</label><textarea id="copy-draft" value={draft} onChange={event=>setDraft(event.target.value)} autoFocus/><div className="copy-dialog-actions"><button onClick={close}>取消</button><button onClick={()=>setDraft(active)}>恢复原文</button><button className="copy-save" onClick={save}>保存修改</button></div></dialog>}
 </CopyContext.Provider>;
}
