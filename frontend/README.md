# Yihuixuan - Thiết Bị Laser Công Nghiệp

Website thương mại điện tử cho Yihuixuan (Nghệ Huy Hiên) - đại diện chính thức của Suzhou Borna Laser Technology tại Việt Nam.

## 🎨 Design

- **Dark theme** với grid background + animated orbs
- **Responsive** mobile-first
- **Smooth scroll** navigation
- **GSAP animations** (optional)

## 🛠️ Tech Stack

- **Framework:** Next.js 15.5.15 (App Router)
- **Styling:** Tailwind CSS
- **CMS:** Strapi v4.x
- **Database:** PostgreSQL
- **Deployment:** PM2 + Nginx

## 📦 Installation

```bash
# Clone repo
git clone https://github.com/GiaBao72/Yihuixuan-final.git
cd Yihuixuan-final

# Install dependencies
npm install

# Run development server
npm run dev
```

## 🚀 Deployment (VPS)

```bash
# Build
npm run build

# Start production (port 80)
npm start

# Or with PM2
pm2 start npm --name "yihuixuan" -- start
pm2 save
```

## 📋 Strapi Setup

Xem chi tiết trong file `STRAPI_SETUP.md`

### Quick Start:
1. Tạo Content Type "Product" trong Strapi Admin
2. Cấu hình Permissions (Public role)
3. Thêm sản phẩm mẫu
4. Test API endpoint

## 🌐 VPS Info

- **VPS:** e1.chiasegpu.vn:17433
- **Next.js:** Port 80 (VM) → 56329 (Public)
- **Strapi:** Port 3001 (VM) → 57416 (Public)

## 📁 Project Structure

```
/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   ├── Navbar.tsx          # Navigation bar
│   ├── Hero.tsx            # Hero section
│   ├── Products.tsx        # Products grid (Strapi)
│   ├── About.tsx           # About section
│   ├── Industries.tsx      # Industries + Why choose us
│   └── Contact.tsx         # Contact form
├── public/                 # Static assets
└── STRAPI_SETUP.md        # Strapi configuration guide
```

## 🔗 Links

- **Website:** http://e1.chiasegpu.vn:56329
- **Strapi Admin:** http://e1.chiasegpu.vn:57416/admin
- **Strapi API:** http://e1.chiasegpu.vn:57416/api/products?populate=*

## 📝 TODO

- [ ] Setup Strapi Product content type
- [ ] Add product images
- [ ] Implement i18n (en/vi/zh)
- [ ] Add product detail pages
- [ ] Integrate contact form backend
- [ ] Add testimonials section
- [ ] SEO optimization

## 📄 License

Private - Yihuixuan Vietnam
