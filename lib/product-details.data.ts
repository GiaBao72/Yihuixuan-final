export interface ProductDetailData {
  id: string;
  num: string;
  label: string;
  title: string;
  titleEm: string;
  description: string;
  features: string[];
  applications: string[];
  mediaType: 'video' | 'image';
  mediaUrl: string;
  mediaAlt?: string;
  ctaText: string;
  ctaLink: string;
  reverse?: boolean;
}

export const productDetails: ProductDetailData[] = [
  {
    id: 'sp1',
    num: '01',
    label: 'Marking Series',
    title: 'Máy Đánh Dấu',
    titleEm: 'Laser',
    description: 'Khắc mã vạch, QR code, UDI, số serial, ngày sản xuất lên nhựa, kim loại, thủy tinh, bao bì — đạt tiêu chuẩn truy xuất nguồn gốc cho điện tử, y tế, dược phẩm.',
    features: [
      'Laser UV 355nm — khắc lạnh, không biến màu nhựa',
      'Laser CO2 — bao bì, thủy tinh, gỗ, vải',
      'Laser Fiber (sợi quang) — kim loại, linh kiện điện tử',
      'Tích hợp inline vào dây chuyền sản xuất'
    ],
    applications: ['Điện tử 3C', 'Y tế & UDI', 'Dược phẩm', 'Ô tô', 'Thực phẩm'],
    mediaType: 'video',
    mediaUrl: 'https://www.youtube.com/embed/__KAQzgCbyU?rel=0&modestbranding=1',
    ctaText: 'Xem chi tiết sản phẩm →',
    ctaLink: '/products/marking',
    reverse: false
  },
  {
    id: 'sp2',
    num: '02',
    label: 'Skinning Series',
    title: 'Máy Tuốt Vỏ',
    titleEm: 'Laser',
    description: 'Tuốt vỏ dây HDMI, Type-C, USB, dây đồng trục, cáp y tế & ô tô — không hại lõi dẫn, độ chính xác cao, tốc độ nhanh.',
    features: [
      'Laser YAG — tuốt vỏ dây đồng trục, cáp đồng',
      'Laser CO2 — tuốt vỏ nhựa PVC, Teflon',
      'Laser UV tốc độ cao — dây mỏng, cáp y tế',
      'Tuốt vòng hoặc tuốt sơn theo yêu cầu'
    ],
    applications: ['Cáp HDMI', 'Type-C & USB', 'Cáp y tế', 'Cáp ô tô', 'Dây đồng trục'],
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&fit=crop',
    mediaAlt: 'Máy tuốt vỏ dây laser',
    ctaText: 'Xem chi tiết sản phẩm →',
    ctaLink: '/products/skinning',
    reverse: true
  },
  {
    id: 'sp3',
    num: '03',
    label: 'Welding Series',
    title: 'Máy Hàn',
    titleEm: 'Laser',
    description: 'Hàn sợi quang, hàn thiếc đầu bi/dây, hàn xung QCW — pin EV, bảng CCS, đầu nối điện thoại, linh kiện chính xác.',
    features: [
      'Hàn sợi quang — độ chính xác sub-micron',
      'Hàn thiếc bi/dây — không flux, không oxy hóa',
      'Hàn xung QCW — kim loại dày, không biến dạng nhiệt',
      'Tích hợp vision system kiểm tra chất lượng'
    ],
    applications: ['Pin EV', 'Bảng CCS', 'Điện thoại', 'Linh kiện điện tử', 'Y tế'],
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80&fit=crop',
    mediaAlt: 'Máy hàn laser',
    ctaText: 'Xem chi tiết sản phẩm →',
    ctaLink: '/products/welding',
    reverse: false
  },
  {
    id: 'sp4',
    num: '04',
    label: 'Cutting Series',
    title: 'Máy Cắt',
    titleEm: 'Laser',
    description: 'Cắt chính xác kim loại, thủy tinh, nhựa kỹ thuật — nền đá granite siêu ổn định cho linh kiện điện tử & pin EV.',
    features: [
      'Cắt kim loại mỏng — thép, nhôm, đồng',
      'Cắt thủy tinh — màn hình, cảm biến',
      'Cắt nhựa kỹ thuật — PI, PET, PC',
      'Nền granite — độ ổn định cao, không rung'
    ],
    applications: ['Pin EV', 'Màn hình', 'Linh kiện điện tử', 'Cảm biến', 'FPC'],
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80&fit=crop',
    mediaAlt: 'Máy cắt laser',
    ctaText: 'Xem chi tiết sản phẩm →',
    ctaLink: '/products/cutting',
    reverse: true
  },
  {
    id: 'sp5',
    num: '05',
    label: 'Automation',
    title: 'Tự Động Hóa',
    titleEm: 'Phi Tiêu Chuẩn',
    description: 'Dây chuyền xử lý lõi dây, hàn kết hợp & linh kiện thay thế: thấu kính quang học, galvanometer chính hãng Borna.',
    features: [
      'Thiết kế dây chuyền theo yêu cầu khách hàng',
      'Tích hợp nhiều công đoạn: cắt, tuốt, hàn, kiểm tra',
      'Linh kiện quang học chính hãng Borna',
      'Galvanometer tốc độ cao, độ chính xác cao'
    ],
    applications: ['Dây chuyền tùy chỉnh', 'Linh kiện quang học', 'Galvanometer', 'Hệ thống tích hợp'],
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=800&q=80&fit=crop',
    mediaAlt: 'Tự động hóa phi tiêu chuẩn',
    ctaText: 'Tư vấn giải pháp →',
    ctaLink: '/contact',
    reverse: false
  }
];
