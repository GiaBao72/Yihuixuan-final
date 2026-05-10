import type { Metadata, Viewport } from 'next';
import './styles/index.css';
import LangProvider from '@/components/LangProvider';
import ContactButtons from '@/components/ContactButtons';

export const metadata: Metadata = {
  title: 'Borna Laser | Thiết Bị Laser Công Nghiệp',
  description: 'Borna Laser (Nghệ Huy Hiên) — thiết bị laser công nghiệp chính xác: Marking, Skinning, Welding, Cutting & tự động hóa phi tiêu chuẩn. Thành lập 2022 tại Bắc Ninh, Việt Nam.',
  keywords: ['laser', 'thiết bị laser', 'laser công nghiệp', 'marking', 'welding', 'cutting', 'Borna', 'Yihuixuan'],
  authors: [{ name: 'Borna Laser' }],
  openGraph: {
    title: 'Borna Laser | Thiết Bị Laser Công Nghiệp',
    description: 'Thiết bị laser công nghiệp chính xác: Marking, Skinning, Welding, Cutting & tự động hóa phi tiêu chuẩn',
    type: 'website',
    locale: 'vi_VN',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        <LangProvider>
          {children}
          <ContactButtons />
        </LangProvider>
      </body>
    </html>
  );
}
// force rebuild
