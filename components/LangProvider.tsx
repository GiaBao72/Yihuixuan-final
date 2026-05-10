'use client';

import { useEffect } from 'react';
import { getLang } from '@/lib/translations';

export default function LangProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lang = getLang();
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.lang = lang;
  }, []);

  return <>{children}</>;
}
