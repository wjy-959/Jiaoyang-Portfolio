import React from 'react';
import SpotlightCard from './SpotlightCard';
import {useMedia} from './MediaProvider';
import './contact-qr.css';

export default function ContactQrCard(){
 const {media}=useMedia();
 const key='contact-wechat-qr';
 return <SpotlightCard className="contact-qr-card"><div className="contact-qr-label"><span>WECHAT / 微信</span><i>↗</i></div>
  <div className={'contact-qr-upload '+(media[key]?'has-qr':'')}>
   {media[key]?<img src={media[key]} alt="个人微信二维码" loading="lazy" decoding="async"/>:<div className="contact-qr-placeholder"><svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 25V9h16m30 0h16v16m0 30v16H55m-30 0H9V55"/><path d="M24 32c0-8 8-14 17-14s17 6 17 14-8 14-17 14l-9 6 1-8c-5-2-9-6-9-12Z"/><circle cx="35" cy="31" r="1"/><circle cx="47" cy="31" r="1"/></svg><span>微信联系</span></div>}
  </div><p>{media[key]?'扫一扫，聊聊下一个项目':'让下一次合作，从这里开始。'}</p>
 </SpotlightCard>;
}
