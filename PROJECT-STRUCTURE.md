# Yihuixuan Project Structure

**Cập nhật:** 2025-05-08  
**Version:** 2.0 (CSS Modular + Strapi CMS)

---

## 📁 Cấu trúc thư mục

```
yihuixuan/ (597MB)
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (metadata, fonts, CSS import)
│   ├── page.tsx                # Homepage (Server - fetch Strapi)
│   ├── HomeClient.tsx          # Homepage UI (Client)
│   ├── about/page.tsx          # About page
│   ├── products/
│   │   ├── page.tsx            # Products listing
│   │   └── [id]/page.tsx       # Product detail (dynamic)
│   └── styles/                 # CSS Modular (11 files)
│       ├── index.css           # Main entry
│       ├── base.css            # Reset, variables
│       ├── navbar.css          # Navigation
│       ├── hero.css            # Hero section
│       ├── product-detail.css  # Products (UI/UX Pro Max)
│       ├── industries.css      # Industries grid
│       ├── testimonials.css    # Testimonials
│       ├── contact.css         # Contact + footer
│       ├── utilities.css       # Scroll, Zalo, dots
│       ├── mobile.css          # Mobile (@media ≤768px)
│       └── desktop.css         # Desktop (@media ≥1024px)
│
├── components/                 # React Components (15)
│   ├── Navbar.tsx              # Nav + mobile menu + lang
│   ├── Hero.tsx                # Video background
│   ├── ProductDetail.tsx       # Product section (homepage)
│   ├── ProductDetailPage.tsx   # Product detail page
│   ├── ProductPageClient.tsx   # Products listing client
│   ├── ProductsSplitScreen.tsx # Split-screen showcase
│   ├── Industries.tsx          # Industries + Why Choose Us
│   ├── Testimonials.tsx        # Testimonials carousel
│   ├── Contact.tsx             # Form + footer
│   ├── ProgressDots.tsx        # Scroll progress
│   ├── ContactButtons.tsx      # Zalo/WhatsApp/WeChat
│   ├── ScrollToTop.tsx         # Scroll button
│   ├── LangProvider.tsx        # Language context
│   ├── LangToggle.tsx          # Language switcher
│   ├── About.tsx               # About component
│   └── Products.tsx            # Products component
│
├── lib/                        # Utilities
│   ├── strapi-api.ts           # Strapi helpers
│   ├── useLang.ts              # Language hook (vi/zh)
│   ├── translations.ts         # i18n translations
│   ├── products.data.ts        # Products fallback data
│   └── product-details.data.ts # Product details fallback
│
├── public/
│   └── hero-laser.mp4          # Hero video (1.9MB)
│
└── Config Files
    ├── .env.local              # STRAPI_URL
    ├── next.config.ts          # Next.js config
    ├── package.json            # Dependencies
    ├── tsconfig.json           # TypeScript config
    └── tailwind.config.ts      # Tailwind config
```

---

## 🎯 Homepage Flow

```
app/page.tsx (Server)
  ↓ Fetch Strapi (products order >= 100)
app/HomeClient.tsx (Client)
  ├─> Navbar
  ├─> Hero
  ├─> ProductDetail × 5 (Marking, Skinning, Welding, Cutting, Automation)
  ├─> Industries
  ├─> Testimonials
  └─> Contact
```

---

## 🎨 CSS Architecture

### Entry Point
`app/layout.tsx` → `import './styles/index.css'`

### index.css imports
```css
@import './base.css';
@import './navbar.css';
@import './hero.css';
@import './product-detail.css';
@import './industries.css';
@import './testimonials.css';
@import './contact.css';
@import './utilities.css';
@import './mobile.css';
@import './desktop.css';
```

### Mobile-First
- Base styles: Desktop
- Mobile: `@media (max-width: 768px)`
- Mobile-only elements: display none default, visible ≤1024px

### UI/UX Pro Max (product-detail.css)
- Gradient background (135deg)
- Glassmorphism (backdrop-blur 20px)
- Gradient text (.pd-num)
- Enhanced animations (cubic-bezier)
- Hover effects (translateY, glow)

---

## 🌐 Strapi Integration

### Endpoints
- Products: `/api/products?locale=${locale}&populate=*`
- Homepage: `/api/products?locale=${locale}&filters[order][$gte]=100&sort=order:asc&populate=*`

### Environment
```bash
STRAPI_INTERNAL_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_URL=http://e1.chiasegpu.vn:57416
```

### Schema
```typescript
interface Product {
  id: number;
  order: number;        // Homepage: order >= 100
  titleEm: string;      // Emphasized title
  applications: string; // Comma-separated
  mediaType: 'image' | 'video';
  videoUrl?: string;
  ctaText: string;
  mainImage: StrapiImage;
  gallery: StrapiImage[];
}
```

---

## 🚀 Deployment

### Build & Restart
```bash
ssh -p 17433 ubuntu@e1.chiasegpu.vn
cd ~/yihuixuan
npm run build
pm2 restart yihuixuan
```

### PM2 Status
```bash
pm2 status
pm2 logs yihuixuan --lines 20
```

### URLs
- Frontend: http://e1.chiasegpu.vn:56329
- Strapi Admin: http://e1.chiasegpu.vn:57416/admin

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "next": "15.5.15",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19"
  }
}
```

---

## 🔧 Common Tasks

### 1. Thay đổi nội dung sản phẩm
→ Strapi Admin: http://e1.chiasegpu.vn:57416/admin  
→ Content Manager → Products → Edit

### 2. Thay đổi CSS
→ Edit `app/styles/*.css`  
→ Build & restart

### 3. Thay đổi component
→ Edit `components/*.tsx`  
→ Build & restart

### 4. Thêm ngôn ngữ mới
→ Edit `lib/translations.ts`  
→ Update `lib/useLang.ts`

---

## ✅ Status

- ✅ CSS Modular (11 files)
- ✅ Strapi CMS integration
- ✅ i18n (vi/zh)
- ✅ Responsive (mobile/desktop)
- ✅ UI/UX Pro Max enhancements
- ✅ PM2 running (restart count: 2825)
- ✅ Build size: 125KB First Load JS

---

## 📝 Notes

- Old template files (css/, js/, img/, includes/, svg/) đã xóa
- Backup files (.backup, .bak) đã xóa
- Demo HTML files (index.html, product.html) đã xóa
- CSS hash: 5d47d88c4743c52b.css (22KB)
- Video background: hero-laser.mp4 (1.9MB)

---

**Người tạo:** Hermes Agent  
**Ngày tạo:** 2025-05-06  
**Cập nhật:** 2025-05-08
