''use client';

import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import { useLang } from '@/lib/useLang';
import '@/app/styles/about-new.css';

export default function AboutPage() {
  const { lang } = useLang();

  return (
    <>
      <Navbar />
      <main className="about-page-new">
        <section className="about-header">
          <div className="container">
            <h1 className="page-title">
              {lang === 'vi' && 'VỀ CHÚNG TÔI'}
              {lang === 'en' && 'ABOUT US'}
              {lang === 'zh' && '关于我们'}
            </h1>
          </div>
        </section>
      </main>
      <Contact />
    </>
  );
}