'use client';

import { useLang } from '@/lib/useLang';
import '@/app/styles/hero.css';

interface HeroProps {
  scrollToSection: (index: number) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  const { lang, t } = useLang();
  
  return (
    <section className="fp-slide" id="s0" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          transform: 'translate(-50%, -50%)',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src="/hero-laser.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for text readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(2,11,26,0.75) 0%, rgba(3,20,48,0.85) 50%, rgba(5,34,90,0.9) 100%)',
        zIndex: 1,
      }} />

      {/* Content */}
      <div className="slide-inner" style={{ 
        position: 'relative', 
        zIndex: 2, 
        textAlign: 'center', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
      }}>
        {/* Company name - large */}
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 64px)',
          fontWeight: 900,
          lineHeight: 1.1,
          color: '#fff',
          textShadow: '0 4px 20px rgba(0,0,0,0.5)',
          marginBottom: '8px',
          letterSpacing: '-0.02em',
        }}>
          {t.hero_company_name}
        </h1>

        {/* Company name Chinese - medium */}
        <p style={{
          fontSize: 'clamp(18px, 2.5vw, 32px)',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.9)',
          textShadow: '0 2px 12px rgba(0,0,0,0.4)',
          marginBottom: '16px',
          letterSpacing: '0.05em',
        }}>
          {t.hero_company_name_zh}
        </p>

        {/* Tagline */}
        <p style={{
          fontSize: 'clamp(16px, 2vw, 24px)',
          fontWeight: 500,
          color: '#4a90e2',
          textShadow: '0 2px 8px rgba(0,0,0,0.6)',
          marginBottom: '12px',
          letterSpacing: '0.02em',
        }}>
          {t.hero_tagline}
        </p>

        {/* Slogan */}
        <p style={{
          fontSize: 'clamp(14px, 1.8vw, 20px)',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.95)',
          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          letterSpacing: '0.1em',
        }}>
          {t.hero_slogan}
        </p>
      </div>
    </section>
  );
}
