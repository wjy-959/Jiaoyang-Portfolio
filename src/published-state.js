import {canEdit} from './editor-mode';

export const siteBase=import.meta.env.BASE_URL;
export const assetUrl=value=>typeof value==='string'&&value.startsWith('/images/')?siteBase+value.slice(1):value;
export function mapPublicAssets(value){
 if(Array.isArray(value))return value.map(mapPublicAssets);
 if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([key,item])=>[key,mapPublicAssets(item)]));
 return assetUrl(value);
}
export const publishedState={media:{},previews:{},fingerprints:{},uploaded:[],hidden:{},storage:{}};
export async function loadPublishedState(){
 const response=await fetch(siteBase+'published/site.json',{cache:'no-cache'});
 if(!response.ok)throw new Error('发布素材配置未能加载，请刷新重试。');
 Object.assign(publishedState,mapPublicAssets(await response.json()));
}
export function readSetting(key,fallback){
 if(canEdit){try{const value=localStorage.getItem(key);if(value!==null)return JSON.parse(value)}catch{}}
 return publishedState.storage[key]??fallback;
}
export function currentRoute(){
 const path=window.location.pathname;
 const relative=path.startsWith(siteBase)?'/'+path.slice(siteBase.length):path;
 return relative.replace(/\/$/,'')||'/';
}
export const routeUrl=value=>siteBase+value.replace(/^\//,'');
