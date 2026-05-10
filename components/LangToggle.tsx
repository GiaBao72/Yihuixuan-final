'use client';

import { useEffect, useState } from 'react';
import { getLang, setLang, type Lang } from '@/lib/translations';

export default function LangToggle() {
  const [lang, setLangState] = useState<Lang>('vi');

  useEffect(() => {
    setLangState(getLang());
  }, []);

  const toggle = () => {
    const newLang: Lang = lang === 'vi' ? 'zh' : 'vi';
    setLang(newLang);
  };

  return (
    <button
      onClick={toggle}
      className="lang-toggle"
      title="切换语言 / Đổi ngôn ngữ"
    >
      {lang === 'zh' ? '🇻🇳 Tiếng Việt' : '🇨🇳 中文'}
    </button>
  );
}
