'use client';

import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import { useLang } from '@/lib/useLang';
import '@/app/styles/about-new.css';

// About page content data - 3 languages
const aboutContent = {
  vi: {
    pageTitle: 'VỀ CHÚNG TÔI',
    intro: {
      title: 'Vietnam Yihuixuan Co., Ltd. – Cùng Suzhou Borna Tiên Phong Trở Thành Đối Tác Chiến Lược Về Giải Pháp Tự Động Hóa Laser',
      p1: 'Chào mừng Quý đối tác và Khách hàng đến với Vietnam Yihuixuan Co., Ltd. – dấu ấn tự hào và là bước chuyển mình mang tính chiến lược của tập đoàn mẹ Suzhou Borna Intelligent Equipment Co., Ltd. tại thị trường Đông Nam Á.',
      p2: 'Được kế thừa nền tảng công nghệ ưu việt và bề dày kinh nghiệm từ công ty mẹ tại Trung Quốc, chúng tôi tự hào là đơn vị cung cấp các thiết bị, giải pháp tự động hóa gia công công nghiệp laser hàng đầu. Với khát vọng tối ưu hóa dây chuyền sản xuất và nâng tầm chất lượng cho các doanh nghiệp, chúng tôi cam kết mang đến những công nghệ tiên tiến nhất, đáp ứng những tiêu chuẩn khắt khe nhất của thị trường toàn cầu.',
    },
    journey: {
      title: 'Hành Trình Phát Triển & Mở Rộng Dấu Ấn Tại Việt Nam',
      p1: 'Suzhou Borna Intelligent Equipment Co., Ltd. (苏州博尔纳智能装备有限公司) đã khẳng định vững chắc vị thế của mình tại Trung Quốc và trên trường quốc tế với tư cách là một chuyên gia trong lĩnh vực thiết bị tự động hóa và gia công bằng công nghệ laser.',
      p2: 'Nhận thấy tiềm năng phát triển mạnh mẽ và nhu cầu nâng cấp công nghệ sản xuất ngày càng cao tại Việt Nam, vào năm 2022, chúng tôi đã chính thức thành lập chi nhánh Vietnam Yihuixuan Co., Ltd. (越南艺辉轩责任有限公司).',
      p3: 'Trụ sở chi nhánh được đặt chiến lược tại Khu công nghiệp Hợp Lĩnh, Tỉnh Bắc Ninh – một trong những trung tâm công nghiệp công nghệ cao và năng động bậc nhất miền Bắc Việt Nam. Việc thiết lập cơ sở vật chất tại đây (thuê xưởng nhà máy giấy Anh Phú) cho phép chúng tôi trực tiếp tiếp cận, hỗ trợ kỹ thuật nhanh chóng và cung cấp các dịch vụ bảo hành, tư vấn tận nơi cho khách hàng tại thị trường Việt Nam cũng như các nước lân cận.',
    },
    industries: {
      title: 'Lĩnh Vực Hoạt Động & Ứng Dụng Đa Ngành',
      p1: 'Borna và Yihuixuan tập trung nghiên cứu, chế tạo và cung cấp hệ thống thiết bị tự động hóa gia công laser mang tính linh hoạt và độ chính xác cao. Sản phẩm của chúng tôi là "chìa khóa" giúp giải quyết bài toán năng suất cho đa dạng các ngành công nghiệp mũi nhọn.',
      p2: 'Chúng tôi hiện đang phục vụ và cung cấp giải pháp cho các lĩnh vực trọng điểm bao gồm:',
      items: [
        { title: 'Công nghệ & Điện tử', desc: 'Đồ điện tử tiêu dùng (3C), điện tử ô tô, linh kiện điện tử, và dây cáp điện.' },
        { title: 'Y tế & Sức khỏe', desc: 'Thiết bị y tế, dụng cụ làm đẹp, và máy móc, bao bì ngành dược phẩm.' },
        { title: 'Đời sống & Tiêu dùng', desc: 'Các sản phẩm hóa mỹ phẩm hàng ngày, đồ dùng an toàn cho mẹ & bé, thiết bị gia dụng.' },
        { title: 'Công nghiệp Kỹ thuật & Xây dựng', desc: 'Vật liệu xây dựng, ngũ kim và gia công cơ khí chính xác.' },
      ],
    },
    vision: {
      title: 'Tầm Nhìn & Sứ Mệnh',
      visionLabel: 'Tầm nhìn:',
      visionText: 'Trở thành doanh nghiệp dẫn đầu trong khu vực Châu Á về cung cấp thiết bị tự động hóa gia công laser. Vietnam Yihuixuan định hướng trở thành đối tác công nghệ số 1 mà mọi nhà máy, xí nghiệp tại Việt Nam nghĩ tới khi có nhu cầu hiện đại hóa và tự động hóa dây chuyền sản xuất.',
      missionLabel: 'Sứ mệnh:',
      missions: [
        { title: 'Với khách hàng:', desc: 'Mang đến các giải pháp công nghệ laser đột phá, tối ưu chi phí vận hành, nâng cao hiệu suất và chất lượng đầu ra cho từng sản phẩm.' },
        { title: 'Với thị trường:', desc: 'Thúc đẩy sự phát triển của nền công nghiệp sản xuất phụ trợ và chế tạo vươn tới các chuẩn mực quốc tế thông qua tự động hóa.' },
        { title: 'Với sự phát triển bền vững:', desc: 'Cung cấp những thiết bị tiết kiệm năng lượng, thân thiện với môi trường, hướng tới kỷ nguyên công nghiệp xanh.' },
      ],
    },
    why: {
      title: 'Vì Sao Nên Chọn Chúng Tôi?',
      items: [
        { icon: '🎯', title: 'Công nghệ cốt lõi từ chuyên gia', desc: 'Kế thừa 100% tinh hoa công nghệ, kỹ thuật và quy trình quản lý chất lượng từ Suzhou Borna (Trung Quốc).' },
        { icon: '⚡', title: 'Hỗ trợ nội địa hóa nhanh chóng', desc: 'Sự hiện diện của chi nhánh tại Bắc Ninh giúp chúng tôi phá bỏ rào cản về khoảng cách và ngôn ngữ, đảm bảo dịch vụ hậu mãi, bảo trì, và chuyển giao công nghệ diễn ra xuyên suốt, kịp thời.' },
        { icon: '🔧', title: 'Giải pháp may đo linh hoạt', desc: 'Không chỉ bán thiết bị, chúng tôi tư vấn và thiết kế hệ thống tự động hóa dựa trên nhu cầu, đặc thù và ngân sách thực tế của từng nhà máy.' },
      ],
    },
    contact: {
      title: 'Thông Tin Liên Hệ',
      intro: 'Chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng Quý doanh nghiệp trên con đường tự động hóa sản xuất. Hãy liên hệ với chúng tôi qua thông tin dưới đây:',
      vn: {
        header: '🇻🇳 TRỤ SỞ TẠI VIỆT NAM (Chi nhánh trực tiếp)',
        company: 'Vietnam Yihuixuan Co., Ltd. (越南艺辉轩责任有限公司)',
        address: 'Cụm công nghiệp Hợp Lĩnh, Phường Hợp Lĩnh, Thành phố Bắc Ninh, Tỉnh Bắc Ninh (Xưởng thuê: Nhà máy giấy Anh Phú).',
        email: 'nghehuyhienvn@gmail.com',
      },
      cn: {
        header: '🇨🇳 CÔNG TY MẸ TẠI TRUNG QUỐC',
        company: 'Suzhou Borna Intelligent Equipment Co., Ltd. (苏州博尔纳智能装备有限公司)',
        address: 'Số 1861 Đường Zhenzhen Xin Đông, Thị trấn Zhangpu, Thành phố Côn Sơn, Tỉnh Giang Tô, Trung Quốc.',
        email: 'boernazn@163.com',
      },
    },
    tagline: 'Vietnam Yihuixuan – Kiến tạo giá trị từ công nghệ, Dẫn dắt tương lai bằng tự động hóa!',
  },
  en: {
    pageTitle: 'ABOUT US',
    intro: {
      title: 'Vietnam Yihuixuan Co., Ltd. – Strategic Partner with Suzhou Borna for Laser Automation Solutions',
      p1: 'Welcome partners and customers to Vietnam Yihuixuan Co., Ltd. – a proud milestone and strategic expansion of Suzhou Borna Intelligent Equipment Co., Ltd. in the Southeast Asian market.',
      p2: 'Inheriting superior technology and extensive experience from our parent company in China, we are proud to be a leading provider of industrial laser automation equipment and solutions. With the aspiration to optimize production lines and elevate quality for businesses, we are committed to bringing the most advanced technologies that meet the strictest standards of the global market.',
    },
    journey: {
      title: 'Development Journey & Expansion in Vietnam',
      p1: 'Suzhou Borna Intelligent Equipment Co., Ltd. has firmly established its position in China and internationally as an expert in automation equipment and laser processing technology.',
      p2: 'Recognizing the strong development potential and increasing demand for production technology upgrades in Vietnam, in 2022, we officially established Vietnam Yihuixuan Co., Ltd.',
      p3: 'The branch headquarters is strategically located in Hop Linh Industrial Zone, Bac Ninh Province – one of the most dynamic high-tech industrial centers in Northern Vietnam. Establishing facilities here (renting Anh Phu paper mill workshop) allows us to directly access, provide rapid technical support, and offer on-site warranty and consulting services to customers in Vietnam and neighboring countries.',
    },
    industries: {
      title: 'Industries & Multi-Sector Applications',
      p1: 'Borna and Yihuixuan focus on researching, manufacturing, and providing flexible and high-precision laser automation equipment systems. Our products are the "key" to solving productivity challenges for diverse cutting-edge industries.',
      p2: 'We currently serve and provide solutions for key sectors including:',
      items: [
        { title: 'Technology & Electronics', desc: 'Consumer electronics (3C), automotive electronics, electronic components, and electrical cables.' },
        { title: 'Medical & Healthcare', desc: 'Medical devices, beauty equipment, and pharmaceutical machinery and packaging.' },
        { title: 'Lifestyle & Consumer Goods', desc: 'Daily cosmetic products, mother & baby safety products, household appliances.' },
        { title: 'Engineering & Construction Industry', desc: 'Building materials, hardware, and precision mechanical processing.' },
      ],
    },
    vision: {
      title: 'Vision & Mission',
      visionLabel: 'Vision:',
      visionText: 'To become the leading enterprise in Asia for providing laser automation equipment. Vietnam Yihuixuan aims to be the #1 technology partner that every factory and enterprise in Vietnam thinks of when they need to modernize and automate their production lines.',
      missionLabel: 'Mission:',
      missions: [
        { title: 'For customers:', desc: 'Deliver breakthrough laser technology solutions, optimize operating costs, improve efficiency and output quality for each product.' },
        { title: 'For the market:', desc: 'Promote the development of supporting industries and manufacturing to reach international standards through automation.' },
        { title: 'For sustainable development:', desc: 'Provide energy-efficient, environmentally friendly equipment, moving towards the era of green industry.' },
      ],
    },
    why: {
      title: 'Why Choose Us?',
      items: [
        { icon: '🎯', title: 'Core technology from experts', desc: 'Inherit 100% of the technological essence, techniques, and quality management processes from Suzhou Borna (China).' },
        { icon: '⚡', title: 'Rapid localization support', desc: 'The presence of our branch in Bac Ninh helps us break down distance and language barriers, ensuring continuous and timely after-sales service, maintenance, and technology transfer.' },
        { icon: '🔧', title: 'Flexible customized solutions', desc: 'Not just selling equipment, we consult and design automation systems based on the actual needs, characteristics, and budget of each factory.' },
      ],
    },
    contact: {
      title: 'Contact Information',
      intro: 'We are always ready to listen and accompany your business on the path to production automation. Please contact us through the information below:',
      vn: {
        header: '🇻🇳 VIETNAM HEADQUARTERS (Direct Branch)',
        company: 'Vietnam Yihuixuan Co., Ltd.',
        address: 'Hop Linh Industrial Cluster, Hop Linh Ward, Bac Ninh City, Bac Ninh Province (Rented workshop: Anh Phu Paper Mill).',
        email: 'nghehuyhienvn@gmail.com',
      },
      cn: {
        header: '🇨🇳 PARENT COMPANY IN CHINA',
        company: 'Suzhou Borna Intelligent Equipment Co., Ltd.',
        address: 'No. 1861 Zhenzhen Xin Dong Road, Zhangpu Town, Kunshan City, Jiangsu Province, China.',
        email: 'boernazn@163.com',
      },
    },
    tagline: 'Vietnam Yihuixuan – Creating value through technology, Leading the future with automation!',
  },
  zh: {
    pageTitle: '关于我们',
    intro: {
      title: '越南艺辉轩有限公司 – 与苏州博尔纳携手成为激光自动化解决方案战略合作伙伴',
      p1: '欢迎合作伙伴和客户来到越南艺辉轩有限公司 – 苏州博尔纳智能装备有限公司在东南亚市场的骄傲里程碑和战略扩张。',
      p2: '继承中国母公司的优越技术基础和丰富经验，我们自豪地成为工业激光自动化设备和解决方案的领先供应商。我们致力于优化生产线并提升企业质量，承诺带来最先进的技术，满足全球市场最严格的标准。',
    },
    journey: {
      title: '发展历程与越南扩张',
      p1: '苏州博尔纳智能装备有限公司已在中国和国际上牢固确立了其作为自动化设备和激光加工技术专家的地位。',
      p2: '认识到越南强劲的发展潜力和日益增长的生产技术升级需求，2022年我们正式成立了越南艺辉轩责任有限公司。',
      p3: '分公司总部战略性地位于北宁省合灵工业区 – 越南北部最具活力的高科技工业中心之一。在这里建立设施（租用英富纸厂车间）使我们能够直接接触客户，提供快速技术支持，并为越南及周边国家的客户提供现场保修和咨询服务。',
    },
    industries: {
      title: '业务领域与多行业应用',
      p1: '博尔纳和艺辉轩专注于研究、制造和提供灵活且高精度的激光自动化设备系统。我们的产品是解决各种尖端行业生产力挑战的"钥匙"。',
      p2: '我们目前为以下重点领域提供服务和解决方案：',
      items: [
        { title: '科技与电子', desc: '消费电子产品（3C）、汽车电子、电子元件和电缆。' },
        { title: '医疗与健康', desc: '医疗设备、美容仪器以及制药机械和包装。' },
        { title: '生活与消费品', desc: '日用化妆品、母婴安全用品、家用电器。' },
        { title: '工程与建筑行业', desc: '建筑材料、五金和精密机械加工。' },
      ],
    },
    vision: {
      title: '愿景与使命',
      visionLabel: '愿景：',
      visionText: '成为亚洲领先的激光自动化设备供应商。越南艺辉轩致力于成为越南每家工厂和企业在需要现代化和自动化生产线时首先想到的第一技术合作伙伴。',
      missionLabel: '使命：',
      missions: [
        { title: '对客户：', desc: '提供突破性的激光技术解决方案，优化运营成本，提高每个产品的效率和输出质量。' },
        { title: '对市场：', desc: '通过自动化推动配套产业和制造业的发展，达到国际标准。' },
        { title: '对可持续发展：', desc: '提供节能、环保的设备，迈向绿色工业时代。' },
      ],
    },
    why: {
      title: '为什么选择我们？',
      items: [
        { icon: '🎯', title: '来自专家的核心技术', desc: '继承苏州博尔纳（中国）100%的技术精华、技术和质量管理流程。' },
        { icon: '⚡', title: '快速本地化支持', desc: '我们在北宁的分公司帮助我们打破距离和语言障碍，确保持续及时的售后服务、维护和技术转让。' },
        { icon: '🔧', title: '灵活的定制解决方案', desc: '不仅销售设备，我们还根据每家工厂的实际需求、特点和预算咨询和设计自动化系统。' },
      ],
    },
    contact: {
      title: '联系信息',
      intro: '我们随时准备倾听并陪伴您的企业走上生产自动化之路。请通过以下信息与我们联系：',
      vn: {
        header: '🇻🇳 越南总部（直属分公司）',
        company: '越南艺辉轩责任有限公司',
        address: '北宁省北宁市合灵坊合灵工业区（租用车间：英富纸厂）。',
        email: 'nghehuyhienvn@gmail.com',
      },
      cn: {
        header: '🇨🇳 中国母公司',
        company: '苏州博尔纳智能装备有限公司',
        address: '中国江苏省昆山市张浦镇振新东路1861号。',
        email: 'boernazn@163.com',
      },
    },
    tagline: '越南艺辉轩 – 用技术创造价值，用自动化引领未来！',
  },
};

export default function AboutPage() {
  const { lang } = useLang();
  const content = aboutContent[lang] || aboutContent.vi;

  return (
    <>
      <Navbar />
      <main className="about-page-new">
        <section className="about-header">
          <div className="container">
            <h1 className="page-title">{content.pageTitle}</h1>
          </div>
        </section>

        <section className="about-section">
          <div className="container">
            <h2 className="section-title">{content.intro.title}</h2>
            <div className="content-block">
              <p>{content.intro.p1}</p>
              <p>{content.intro.p2}</p>
            </div>
          </div>
        </section>

        <section className="about-section bg-light">
          <div className="container">
            <h2 className="section-title">{content.journey.title}</h2>
            <div className="content-block">
              <p>{content.journey.p1}</p>
              <p>{content.journey.p2}</p>
              <p>{content.journey.p3}</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="container">
            <h2 className="section-title">{content.industries.title}</h2>
            <div className="content-block">
              <p>{content.industries.p1}</p>
              <p className="section-subtitle">{content.industries.p2}</p>
            </div>
            <div className="industry-grid">
              {content.industries.items.map((item, idx) => (
                <div key={idx} className="industry-card">
                  <h3 className="industry-card-title">{item.title}</h3>
                  <p className="industry-card-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section bg-light">
          <div className="container">
            <h2 className="section-title">{content.vision.title}</h2>
            <div className="two-column">
              <div className="column">
                <h3 className="column-title">{content.vision.visionLabel}</h3>
                <p>{content.vision.visionText}</p>
              </div>
              <div className="column">
                <h3 className="column-title">{content.vision.missionLabel}</h3>
                <div className="mission-list">
                  {content.vision.missions.map((mission, idx) => (
                    <div key={idx} className="mission-item">
                      <h4 className="mission-item-title">{mission.title}</h4>
                      <p className="mission-item-desc">{mission.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="container">
            <h2 className="section-title">{content.why.title}</h2>
            <div className="reason-grid">
              {content.why.items.map((item, idx) => (
                <div key={idx} className="reason-card">
                  <div className="reason-icon">{item.icon}</div>
                  <h3 className="reason-title">{item.title}</h3>
                  <p className="reason-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section bg-light">
          <div className="container">
            <h2 className="section-title">{content.contact.title}</h2>
            <div className="content-block">
              <p>{content.contact.intro}</p>
            </div>
            <div className="contact-info-grid">
              <div className="contact-card">
                <h3 className="contact-card-header">{content.contact.vn.header}</h3>
                <p className="contact-card-company">{content.contact.vn.company}</p>
                <p className="contact-card-address">{content.contact.vn.address}</p>
                <p className="contact-card-email">{content.contact.vn.email}</p>
              </div>
              <div className="contact-card">
                <h3 className="contact-card-header">{content.contact.cn.header}</h3>
                <p className="contact-card-company">{content.contact.cn.company}</p>
                <p className="contact-card-address">{content.contact.cn.address}</p>
                <p className="contact-card-email">{content.contact.cn.email}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-tagline">
          <div className="container">
            <p className="tagline-text">{content.tagline}</p>
          </div>
        </section>

      </main>
      <Contact />
    </>
  );
}
