'use client';

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

        <section className="about-section">
          <div className="container">
            <h2 className="section-title">
              {lang === 'vi' && 'Vietnam Yihuixuan Co., Ltd. – Cùng Suzhou Borna Tiên Phong Trở Thành Đối Tác Chiến Lược Về Giải Pháp Tự Động Hóa Laser'}
              {lang === 'en' && 'Vietnam Yihuixuan Co., Ltd. – Strategic Partner with Suzhou Borna for Laser Automation Solutions'}
              {lang === 'zh' && '越南艺辉轩有限公司 – 与苏州博尔纳携手成为激光自动化解决方案战略合作伙伴'}
            </h2>
            <div className="content-block">
              <p>
                {lang === 'vi' && 'Chào mừng Quý đối tác và Khách hàng đến với Vietnam Yihuixuan Co., Ltd. – dấu ấn tự hào và là bước chuyển mình mang tính chiến lược của tập đoàn mẹ Suzhou Borna Intelligent Equipment Co., Ltd. tại thị trường Đông Nam Á.'}
                {lang === 'en' && 'Welcome partners and customers to Vietnam Yihuixuan Co., Ltd. – a proud milestone and strategic expansion of Suzhou Borna Intelligent Equipment Co., Ltd. in the Southeast Asian market.'}
                {lang === 'zh' && '欢迎合作伙伴和客户来到越南艺辉轩有限公司 – 苏州博尔纳智能装备有限公司在东南亚市场的骄傲里程碑和战略扩张。'}
              </p>
              <p>
                {lang === 'vi' && 'Được kế thừa nền tảng công nghệ ưu việt và bề dày kinh nghiệm từ công ty mẹ tại Trung Quốc, chúng tôi tự hào là đơn vị cung cấp các thiết bị, giải pháp tự động hóa gia công công nghiệp laser hàng đầu. Với khát vọng tối ưu hóa dây chuyền sản xuất và nâng tầm chất lượng cho các doanh nghiệp, chúng tôi cam kết mang đến những công nghệ tiên tiến nhất, đáp ứng những tiêu chuẩn khắt khe nhất của thị trường toàn cầu.'}
                {lang === 'en' && 'Inheriting superior technology and extensive experience from our parent company in China, we are proud to be a leading provider of industrial laser automation equipment and solutions. With the aspiration to optimize production lines and elevate quality for businesses, we are committed to bringing the most advanced technologies that meet the strictest standards of the global market.'}
                {lang === 'zh' && '继承中国母公司的优越技术基础和丰富经验，我们自豪地成为工业激光自动化设备和解决方案的领先供应商。我们致力于优化生产线并提升企业质量，承诺带来最先进的技术，满足全球市场最严格的标准。'}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Contact />
    </>
  );
}
