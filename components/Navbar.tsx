'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getLang, setLang, translations, type Lang } from '@/lib/translations';
import { useTheme } from '@/components/ThemeProvider';
import '@/app/styles/navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLangState] = useState<Lang>('vi');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    setLangState(getLang());
    const handleLangChange = () => setLangState(getLang());
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

          {/* Theme Toggle */}
          <button
            className="theme-toggle"
            onClick={toggle}
            title={theme === 'light' ? 'Chuyển Dark Mode' : 'Chuyển Light Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              /* Moon icon */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            ) : (
              /* Sun icon */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            )}
          </button>

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

        {/* Mobile Theme Toggle */}
        <button
          className="mob-theme-toggle"
          onClick={() => { toggle(); setIsMenuOpen(false); }}
        >
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
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
          background: var(--color-surface, #fff);
          border: 1px solid var(--color-border, #E2E8F0);
          border-radius: 8px;
          padding: 8px;
          min-width: 160px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          z-index: 1000;
        }

        .lang-option {
          display: block;
          width: 100%;
          padding: 10px 16px;
          background: transparent;
          border: none;
          color: var(--color-fg, #020617);
          text-align: left;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s;
          font-size: 14px;
        }

        .lang-option:hover {
          background: var(--color-muted, #E8ECF1);
        }

        .lang-option.active {
          background: rgba(3,105,161,0.10);
          color: var(--color-accent, #0369A1);
        }

        .mob-lang-selector {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 16px;
          border-top: 1px solid var(--color-border, #E2E8F0);
          margin-top: 16px;
        }

        .mob-lang-option {
          padding: 12px 16px;
          background: var(--color-bg-alt, #F1F5F9);
          border: 1px solid var(--color-border, #E2E8F0);
          border-radius: 8px;
          color: var(--color-fg, #020617);
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
        }

        .mob-lang-option:hover {
          background: var(--color-muted, #E8ECF1);
        }

        .mob-lang-option.active {
          background: rgba(3,105,161,0.10);
          border-color: var(--color-accent, #0369A1);
          color: var(--color-accent, #0369A1);
        }

        .mob-theme-toggle {
          margin: 8px 16px 16px;
          padding: 12px 16px;
          background: var(--color-bg-alt, #F1F5F9);
          border: 1px solid var(--color-border, #E2E8F0);
          border-radius: 8px;
          color: var(--color-fg, #020617);
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          text-align: left;
          transition: all 0.2s;
          width: calc(100% - 32px);
        }

        .mob-theme-toggle:hover {
          background: var(--color-muted, #E8ECF1);
        }
      `}</style>
    </>
  );
}
