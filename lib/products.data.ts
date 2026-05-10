export interface Product {
  id: string;
  num: string;
  tag: string;
  name: string;
  description: string;
  specs: string[];
  image: string;
  ctaText: string;
  ctaLink: string;
}

export const products: Product[] = [
  {
    id: 'marking',
    num: '01',
    tag: 'Marking',
    name: 'Máy Đánh Dấu Laser',
    description: 'Khắc logo, mã QR, serial trên kim loại, nhựa, gốm sứ — fiber, UV, CO2, MOPA. Độ phân giải cao, tốc độ nhanh.',
    specs: ['Fiber', 'UV', 'CO2', 'MOPA'],
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=900&q=80&fit=crop',
    ctaText: 'Xem chi tiết →',
    ctaLink: '/products/marking'
  },
  {
    id: 'skinning',
    num: '02',
    tag: 'Skinning',
    name: 'Máy Tuốt Vỏ Laser',
    description: 'Tuốt vỏ dây HDMI, Type-C, USB, dây đồng trục, cáp y tế & ô tô — không hại lõi dẫn, độ chính xác cao.',
    specs: ['YAG', 'CO2', 'UV tốc độ cao', 'Tuốt vòng / sơn'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80&fit=crop',
    ctaText: 'Xem chi tiết →',
    ctaLink: '/products/skinning'
  },
  {
    id: 'welding',
    num: '03',
    tag: 'Welding',
    name: 'Máy Hàn Laser',
    description: 'Hàn sợi quang, hàn thiếc đầu bi/dây, hàn xung QCW — pin EV, bảng CCS, đầu nối điện thoại, linh kiện chính xác.',
    specs: ['Fiber', 'Hàn thiếc bi/dây', 'QCW', 'Không biến dạng nhiệt'],
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=900&q=80&fit=crop',
    ctaText: 'Xem chi tiết →',
    ctaLink: '/products/welding'
  },
  {
    id: 'cutting',
    num: '04',
    tag: 'Cutting',
    name: 'Máy Cắt Laser',
    description: 'Cắt chính xác kim loại, thủy tinh, nhựa kỹ thuật — nền đá granite siêu ổn định cho linh kiện điện tử & pin EV.',
    specs: ['Kim loại', 'Thủy tinh', 'Nhựa kỹ thuật', 'Nền granite'],
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&q=80&fit=crop',
    ctaText: 'Xem chi tiết →',
    ctaLink: '/products/cutting'
  },
  {
    id: 'automation',
    num: '05',
    tag: 'Automation',
    name: 'Tự Động Hóa Phi Tiêu Chuẩn',
    description: 'Dây chuyền xử lý lõi dây, hàn kết hợp & linh kiện thay thế: thấu kính quang học, galvanometer chính hãng Borna.',
    specs: ['Thiết kế theo yêu cầu', 'Linh kiện quang học', 'Galvanometer'],
    image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=900&q=80&fit=crop',
    ctaText: 'Tư vấn giải pháp →',
    ctaLink: '/contact'
  }
];
