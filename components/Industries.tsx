'use client';

import { useLang } from '@/lib/useLang';
import '@/app/styles/industries.css';

export default function Industries() {
  const { lang, t } = useLang();
  
  const industries = [
    { nameKey: 'industries_automotive', icon: 'car' },
    { nameKey: 'industries_electronics', icon: 'chip' },
    { nameKey: 'industries_medical', icon: 'heart' },
    { nameKey: 'industries_packaging', icon: 'cable' },
    { nameKey: 'industries_metal', icon: 'medicine' },
    { nameKey: 'industries_jewelry', icon: 'home' }
  ];

  const whyChooseUs = [
    {
      num: '01',
      titleKey: 'why_01_title',
      descKey: 'why_01_desc'
    },
    {
      num: '02',
      titleKey: 'why_02_title',
      descKey: 'why_02_desc'
    },
    {
      num: '03',
      titleKey: 'why_03_title',
      descKey: 'why_03_desc'
    },
    {
      num: '04',
      titleKey: 'why_04_title',
      descKey: 'why_04_desc'
    }
  ];
  
  return (
    <section className="fp-slide" id="s8">
      <div className="grid-bg"></div>
      <div className="orb orb1"></div>
      
      <div className="slide-inner">
        <div className="s8-grid">
          
          {/* Left: Industries */}
          <div className="industries-col">
            <div className="sec-label anim">{t.industries_label}</div>
            <h2 className="sec-title anim">
              {t.industries_title}<br/><em>{t.industries_title_em}</em>
            </h2>
            
            <div className="ind-grid anim">
              {industries.map((industry, index) => (
                <div key={index} className="ind-item">
                  <div className="ind-icon-wrap">
                    <IndustryIcon type={industry.icon} />
                  </div>
                  <h4>{(t as any)[industry.nameKey]}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Why Choose Us */}
          <div className="why-col">
            <div className="sec-label anim">{t.why_choose_label}</div>
            <h2 className="sec-title anim">
              {t.why_choose_title}<em>{t.why_choose_title_em}</em>
            </h2>
            
            <div className="why-grid">
              {whyChooseUs.map((item, index) => (
                <WhyCard 
                  key={index} 
                  num={item.num}
                  title={(t as any)[item.titleKey]}
                  desc={(t as any)[item.descKey]}
                />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

function WhyCard({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="why-card anim">
      <div className="why-num">{num}</div>
      <div className="why-content">
        <h4 className="why-title">{title}</h4>
        <p className="why-desc">{desc}</p>
      </div>
    </div>
  );
}

function IndustryIcon({ type }: { type: string }) {
  if (type === 'chip') return <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>;
  if (type === 'cable') return <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>;
  if (type === 'heart') return <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>;
  if (type === 'car') return <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2-2h7M13 16l2-2h3l2 2m-7-10h4l2 4"/></svg>;
  if (type === 'medicine') return <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>;
  return <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>;
}
