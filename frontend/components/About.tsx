'use client';

import { useLang } from '@/lib/useLang';

const T = {
  vi: {
    eyebrow: 'Về chúng tôi',
    h1a: 'Đối tác ', h1em: 'tin cậy', h1b: 'trong công nghiệp laser',
    company: 'Yihuixuan (Nghệ Huy Hiên)',
    mid: ' là đại diện chính thức của ',
    partner: 'Suzhou Borna Laser Technology',
    tail: ' tại Việt Nam, thành lập năm 2022 tại Bắc Ninh.',
    desc: 'Chúng tôi chuyên cung cấp thiết bị laser công nghiệp chính xác cao, giải pháp tự động hóa và dịch vụ kỹ thuật toàn diện cho các nhà máy hiện đại.',
    s1: 'Dự án hoàn thành', s2: 'Khách hài lòng', s3: 'Hỗ trợ kỹ thuật',
    cta: 'Liên hệ ngay →',
    qTitle: 'Chất lượng đảm bảo',
    qDesc: 'Sản phẩm chính hãng từ Suzhou Borna',
  },
  zh: {
    eyebrow: '关于我们',
    h1a: '值得', h1em: '信赖', h1b: '的激光工业伙伴',
    company: '艺慧轩',
    mid: ' 是 ',
    partner: '苏州博纳激光科技',
    tail: ' 在越南的官方代表，2022年成立于北宁。',
    desc: '我们专业提供高精度工业激光设备、自动化解决方案及全面技术服务，服务于现代化工厂。',
    s1: '完成项目', s2: '客户满意', s3: '技术支持',
    cta: '立即联系 →',
    qTitle: '质量保证',
    qDesc: '苏州博纳正品产品',
  },
  en: {
    eyebrow: 'About Us',
    h1a: 'Your ', h1em: 'trusted', h1b: 'partner in the laser industry',
    company: 'Yihuixuan',
    mid: ' is the official representative of ',
    partner: 'Suzhou Borna Laser Technology',
    tail: ' in Vietnam, established in 2022 in Bac Ninh.',
    desc: 'We specialize in high-precision industrial laser equipment, automation solutions and comprehensive technical services for modern factories.',
    s1: 'Projects Completed', s2: 'Satisfied Clients', s3: 'Technical Support',
    cta: 'Contact Us →',
    qTitle: 'Quality Assured',
    qDesc: 'Genuine products from Suzhou Borna',
  },
} as const;

export default function About() {
  const { lang } = useLang();
  const t = T[(lang as 'vi' | 'zh' | 'en')] ?? T.vi;

  return (
    <section id="about" className="relative min-h-screen py-20 overflow-hidden">
      <div className="grid-bg"></div>
      <div className="orb orb2"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-sm font-semibold text-[#4a90e2] tracking-wider uppercase mb-4 anim">
              {t.eyebrow}
            </div>
            <h2 className="text-5xl font-extrabold mb-6 anim">
              {t.h1a}<em className="not-italic text-[#4a90e2]">{t.h1em}</em>
              <br />
              {t.h1b}
            </h2>
            <p className="text-lg text-[rgba(255,255,255,0.6)] mb-6 leading-relaxed anim">
              <strong className="text-white">{t.company}</strong>
              {t.mid}
              <strong className="text-white">{t.partner}</strong>
              {t.tail}
            </p>
            <p className="text-lg text-[rgba(255,255,255,0.6)] mb-8 leading-relaxed anim">
              {t.desc}
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center anim">
                <div className="text-4xl font-extrabold text-[#4a90e2] mb-2">500+</div>
                <div className="text-sm text-[rgba(255,255,255,0.6)]">{t.s1}</div>
              </div>
              <div className="text-center anim">
                <div className="text-4xl font-extrabold text-[#4a90e2] mb-2">98%</div>
                <div className="text-sm text-[rgba(255,255,255,0.6)]">{t.s2}</div>
              </div>
              <div className="text-center anim">
                <div className="text-4xl font-extrabold text-[#4a90e2] mb-2">24/7</div>
                <div className="text-sm text-[rgba(255,255,255,0.6)]">{t.s3}</div>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-block bg-[#1b5fd4] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1348b0] hover:-translate-y-1 transition-all shadow-lg shadow-[rgba(27,95,212,0.3)] anim"
            >
              {t.cta}
            </a>
          </div>

          <div className="relative anim">
            <div className="aspect-square bg-gradient-to-br from-[rgba(27,95,212,0.2)] to-[rgba(74,144,226,0.1)] rounded-3xl border border-[rgba(255,255,255,0.1)] flex items-center justify-center">
              <div className="text-center p-8">
                <svg className="w-32 h-32 mx-auto mb-6 text-[#4a90e2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h3 className="text-2xl font-bold mb-2">{t.qTitle}</h3>
                <p className="text-[rgba(255,255,255,0.6)]">{t.qDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
