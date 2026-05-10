'use client';

import { useState } from 'react';
import { useLang } from '@/lib/useLang';
import '@/app/styles/contact-buttons.css';

export default function ContactButtons() {
  const { lang, t } = useLang();
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className={`contact-buttons ${isExpanded ? 'expanded' : ''}`}>
      {/* Contact buttons list - hiển thị phía trên */}
      <div className="cb-list">
        {/* WeChat */}
        <a 
          href="weixin://dl/chat?wechatid=bornalaser" 
          className="cb-item wechat"
          title={t.contact_btn_wechat}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-5.523 3.024-7.387 1.088-.707 2.336-1.091 3.627-1.091.38 0 .748.044 1.116.098C16.336 4.005 12.824 2.188 8.691 2.188zm-2.488 5.93a1.14 1.14 0 110-2.28 1.14 1.14 0 010 2.28zm5.946 0a1.14 1.14 0 110-2.28 1.14 1.14 0 010 2.28zM23.999 13.616c0-3.21-3.26-5.82-7.272-5.82-4.012 0-7.272 2.61-7.272 5.82s3.26 5.82 7.272 5.82c.748 0 1.463-.098 2.15-.27a.864.864 0 01.717.098l1.489.87a.326.326 0 00.167.054.295.295 0 00.29-.295c0-.072-.03-.143-.048-.213l-.307-1.16a.59.59 0 01.213-.665c1.505-1.096 2.601-2.77 2.601-4.639zm-10.603-1.14a.87.87 0 110-1.74.87.87 0 010 1.74zm4.012 0a.87.87 0 110-1.74.87.87 0 010 1.74z"/>
          </svg>
          <span className="cb-label">{t.contact_btn_wechat}</span>
        </a>
        
        {/* WhatsApp */}
        <a 
          href="https://wa.me/84901234567" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="cb-item whatsapp"
          title={t.contact_btn_whatsapp}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <span className="cb-label">{t.contact_btn_whatsapp}</span>
        </a>
        
        {/* Zalo */}
        <a 
          href="https://zalo.me/0901234567" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="cb-item zalo"
          title={t.contact_btn_zalo}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
          </svg>
          <span className="cb-label">{t.contact_btn_zalo}</span>
        </a>
        
        {/* Phone */}
        <a 
          href="tel:+84123456789" 
          className="cb-item phone"
          title={t.contact_btn_phone}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span className="cb-label">{t.contact_btn_phone}</span>
        </a>
        
        {/* Email */}
        <a 
          href="mailto:nghehuyhienvn@gmail.com" 
          className="cb-item email"
          title={t.contact_btn_email}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <span className="cb-label">{t.contact_btn_email}</span>
        </a>
      </div>
      
      {/* Main toggle button - ở dưới cùng */}
      <button 
        className="cb-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label="Toggle contact buttons"
      >
        {isExpanded ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>
    </div>
  );
}
