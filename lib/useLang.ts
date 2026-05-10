'use client';

import { useEffect, useState } from 'react';
import { getLang, translations, type Lang } from '@/lib/translations';

export function useLang() {
  // Initialize with current lang from localStorage (SSR-safe)
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      return getLang();
    }
    return 'vi';
  });

  useEffect(() => {
    // Sync with localStorage in case it changed
    setLang(getLang());

    // Listen for storage changes (when user changes language)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'borna_lang' && e.newValue) {
        setLang(e.newValue as Lang);
      }
    };

    // Listen for custom event (for same-tab changes)
    const handleLangChange = () => {
      setLang(getLang());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('langchange', handleLangChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('langchange', handleLangChange);
    };
  }, []);

  const t = translations[lang];

  return { lang, t };
}
