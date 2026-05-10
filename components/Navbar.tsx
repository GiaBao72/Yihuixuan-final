'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getLang, setLang, translations, type Lang } from '@/lib/translations';
import '@/app/styles/navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLangState] = useState<Lang>('vi');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  useEffect(() => {
    setLangState(getLang());
    
    // Listen for language changes
    const handleLangChange = () => {
      setLangState(getLang());
    };
    
    window.addEventListener('langchange', handleLangChange);
    return () => window.removeEventListener('langchange', handleLangChange);
  }, []);

  const languages = [
    { code: 'vi' as Lang, flag: '🇻🇳', name: 'Tiếng Việt' },
    { code: 'zh' as Lang, flag: '🇨🇳', name: '中文' },
    { code: 'en' as Lang, flag: '🇬🇧', name: 'English' },
  ];

  const currentLang = languages.find(l => l.code === lang) || languages[0];

  const handleLangChange = (newLang: Lang) => {
    setLang(newLang);
    setIsLangDropdownOpen(false);
  };
  
  const t = translations[lang];

  return (
    <>
      <nav id="navbar" className={isMenuOpen ? 'menu-open' : ''}>
        <Link href="/" className="logo">
          BORNA<em>LASER</em>
        </Link>
        
        <div className="nav-links">
          <Link href="/">{t.nav_home}</Link>
          <Link href="/products">{t.nav_products}</Link>
          <Link href="/about">{t.nav_about}</Link>
          
          {/* Language Dropdown */}
          <div className="lang-dropdown-wrapper">
            <button 
              className="lang-toggle" 
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              title="Switch Language"
            >
              {currentLang.flag} {currentLang.name}
            </button>
            
            {isLangDropdownOpen && (
              <div className="lang-dropdown">
                {languages.map(l => (
                  <button
                    key={l.code}
                    className={`lang-option ${l.code === lang ? 'active' : ''}`}
                    onClick={() => handleLangChange(l.code)}
                  >
                    {l.flag} {l.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <Link href="/#contact" className="nav-cta">
            {t.nav_contact} →
          </Link>
        </div>

        <div 
          className="hamburger" 
          id="hamBtn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mob-menu ${isMenuOpen ? 'active' : ''}`} id="mobMenu">
        <div className="mob-close" onClick={() => setIsMenuOpen(false)}>✕</div>
        <Link href="/" onClick={() => setIsMenuOpen(false)} className="mob-nav-link">{t.nav_home}</Link>
        <Link href="/products" onClick={() => setIsMenuOpen(false)} className="mob-nav-link">{t.nav_products}</Link>
        <Link href="/about" onClick={() => setIsMenuOpen(false)} className="mob-nav-link">{t.nav_about}</Link>
        
        {/* Mobile Language Selector */}
        <div className="mob-lang-selector">
          {languages.map(l => (
            <button
              key={l.code}
              className={`mob-lang-option ${l.code === lang ? 'active' : ''}`}
              onClick={() => {
                handleLangChange(l.code);
                setIsMenuOpen(false);
              }}
            >
              {l.flag} {l.name}
            </button>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .lang-dropdown-wrapper {
          position: relative;
        }
        
        .lang-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 8px;
          background: rgba(10, 14, 39, 0.98);
          border: 1px solid rgba(74, 144, 226, 0.3);
          border-radius: 8px;
          padding: 8px;
          min-width: 160px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
          z-index: 1000;
        }
        
        .lang-option {
          display: block;
          width: 100%;
          padding: 10px 16px;
          background: transparent;
          border: none;
          color: #fff;
          text-align: left;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s;
          font-size: 14px;
        }
        
        .lang-option:hover {
          background: rgba(74, 144, 226, 0.15);
        }
        
        .lang-option.active {
          background: rgba(74, 144, 226, 0.25);
          color: #4a90e2;
        }
        
        .mob-lang-selector {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 16px;
          border-top: 1px solid rgba(74, 144, 226, 0.2);
          margin-top: 16px;
        }
        
        .mob-lang-option {
          padding: 12px 16px;
          background: rgba(10, 14, 39, 0.6);
          border: 1px solid rgba(74, 144, 226, 0.3);
          border-radius: 8px;
          color: #fff;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
        }
        
        .mob-lang-option:hover {
          background: rgba(74, 144, 226, 0.15);
        }
        
        .mob-lang-option.active {
          background: rgba(74, 144, 226, 0.25);
          border-color: #4a90e2;
          color: #4a90e2;
        }
      `}</style>
    </>
  );
}
