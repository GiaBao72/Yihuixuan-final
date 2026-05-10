'use client';

import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import { useLang } from '@/lib/useLang';
import '@/app/styles/about-v2.css';

export default function AboutPage() {
  const { lang } = useLang();
  const t = (vi: string, zh: string, en: string) => lang === 'vi' ? vi : lang === 'en' ? en : zh;

  return (
    <>
      <Navbar />
      <main className="about-page">
        <section className="about-hero">
          <div className="container">
            <h1>{t('Về Chúng Tôi', '关于我们', 'About Us')}</h1>
            <p className="subtitle">
              {t('Tập trung vào tùy chỉnh laser, tận tâm phục vụ khách hàng', '专注激光定制，用心服务客户', 'Focus on laser customization')}
            </p>
          </div>
        </section>

        <section className="about-content">
          <div className="container">
            <div className="about-grid">
              
              <div className="about-card">
                <div className="icon">🏢</div>
                <h3>{t('Giới Thiệu Công Ty', '公司简介', 'Company Introduction')}</h3>
                <p>{t('Borna chuyên về thiết bị tự động hóa gia công công nghiệp laser. Chi nhánh Việt Nam thành lập 2022 tại Bắc Ninh, trực tiếp phục vụ thị trường Việt Nam và khu vực.', '博尔纳专业工业激光加工自动化设备。2022年在越南北宁成立分公司，直接服务越南及周边市场。', 'Borna specializes in industrial laser automation equipment. Vietnam branch established 2022 in Bac Ninh.')}</p>
                <div className="company-info">
                  <div className="info-block">
                    <strong>🇻🇳 {t('Việt Nam', '越南', 'Vietnam')}</strong>
                    <p>Vietnam Yihuixuan Co., Ltd.</p>
                    <p>{t('Bắc Ninh, KCN Hợp Lĩnh', '北宁省合灵工业区', 'Bac Ninh, Hop Linh Industrial Zone')}</p>
                    <p>nghehuyhienvn@gmail.com</p>
                  </div>
                  <div className="info-block">
                    <strong>🇨🇳 {t('Trung Quốc', '中国', 'China')}</strong>
                    <p>Suzhou Borna Intelligent Equipment Co., Ltd.</p>
                    <p>{t('Giang Tô, Côn Sơn, Trấn Trương Phố', '江苏昆山张浦镇', 'Jiangsu, Kunshan, Zhangpu')}</p>
                    <p>boernazn@163.com</p>
                  </div>
                </div>
                <div className="stats-grid">
                  <div className="stat-item"><div className="stat-number">2022</div><div className="stat-label">{t('Thành lập VN', '越南成立', 'VN Founded')}</div></div>
                  <div className="stat-item"><div className="stat-number">500+</div><div className="stat-label">{t('Khách hàng', '客户', 'Customers')}</div></div>
                  <div className="stat-item"><div className="stat-number">5</div><div className="stat-label">{t('Dòng SP', '产品线', 'Lines')}</div></div>
                </div>
              </div>

              <div className="about-card">
                <div className="icon">🎯</div>
                <h3>{t('Sứ Mệnh', '使命', 'Mission')}</h3>
                <p>{t('Giải quyết độ chính xác và hiệu quả trong gia công. Mang đến giải pháp laser tùy chỉnh.', '解决加工精度和效率问题，提供定制激光方案。', 'Solve precision and efficiency in manufacturing.')}</p>
              </div>

              <div className="about-card">
                <div className="icon">👁️</div>
                <h3>{t('Tầm Nhìn', '愿景', 'Vision')}</h3>
                <p>{t('Trở thành đối tác tin cậy hàng đầu công nghệ laser tại VN và ĐNA.', '成为越南和东南亚激光技术领先合作伙伴。', 'Leading laser tech partner in Vietnam and SEA.')}</p>
              </div>

              <div className="about-card">
                <div className="icon">⚙️</div>
                <h3>{t('Dòng Sản Phẩm', '产品线', 'Products')}</h3>
                <ul>
                  <li><strong>Marking:</strong> {t('Đánh dấu laser', '激光打标', 'Laser marking')}</li>
                  <li><strong>Skinning:</strong> {t('Tuốt vỏ dây', '激光剥线', 'Wire stripping')}</li>
                  <li><strong>Welding:</strong> {t('Hàn laser', '激光焊接', 'Laser welding')}</li>
                  <li><strong>Cutting:</strong> {t('Cắt laser', '激光切割', 'Laser cutting')}</li>
                  <li><strong>Custom:</strong> {t('Tự động hóa', '自动化', 'Automation')}</li>
                </ul>
              </div>

              <div className="about-card">
                <div className="icon">🏭</div>
                <h3>{t('Ngành Hàng', '服务行业', 'Industries')}</h3>
                <ul>
                  <li>{t('Điện tử 3C', '3C电子', '3C Electronics')}</li>
                  <li>{t('Dây cáp', '线缆', 'Cables')}</li>
                  <li>{t('Y tế', '医疗', 'Medical')}</li>
                  <li>{t('Dược phẩm', '制药', 'Pharma')}</li>
                  <li>{t('Ô tô', '汽车', 'Auto')}</li>
                  <li>{t('Xây dựng', '建材', 'Construction')}</li>
                </ul>
              </div>

              <div className="about-card">
                <div className="icon">💎</div>
                <h3>{t('Giá Trị', '核心价值', 'Values')}</h3>
                <ul>
                  <li><strong>{t('Chất lượng', '质量', 'Quality')}:</strong> {t('Sản phẩm cao cấp', '高品质', 'Premium')}</li>
                  <li><strong>{t('Đổi mới', '创新', 'Innovation')}:</strong> {t('Công nghệ tiên tiến', '先进技术', 'Advanced')}</li>
                  <li><strong>{t('Tận tâm', '专注', 'Dedication')}:</strong> {t('Hỗ trợ 24/7', '24/7支持', '24/7 support')}</li>
                  <li><strong>{t('Uy tín', '信誉', 'Trust')}:</strong> {t('Niềm tin lâu dài', '长期信任', 'Long-term')}</li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        <section className="about-cta">
          <div className="container">
            <h2>{t('Sẵn sàng hợp tác?', '准备合作？', 'Ready to Partner?')}</h2>
            <p>{t('Liên hệ ngay để được tư vấn giải pháp laser phù hợp', '立即联系获取激光方案咨询', 'Contact us for laser solution consultation')}</p>
            <a href="/#contact" className="cta-button">
              <span>{t('Liên hệ ngay →', '立即联系 →', 'Contact Now →')}</span>
            </a>
          </div>
        </section>
      </main>
      <Contact />
    </>
  );
}
