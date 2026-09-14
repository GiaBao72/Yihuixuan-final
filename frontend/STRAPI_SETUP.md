# HƯỚNG DẪN SETUP STRAPI CHO YIHUIXUAN

## 1. Tạo Content Type "Product" trong Strapi

Truy cập Strapi Admin: http://e1.chiasegpu.vn:57416/admin
Login: admin@yihuixuan.com / Yihuixuan@Admin2025!

### Bước 1: Tạo Collection Type
1. Vào **Content-Type Builder**
2. Click **Create new collection type**
3. Display name: `Product`
4. Click **Continue**

### Bước 2: Thêm các fields

#### Text Fields:
- **name** (Text, Short text, Required)
- **slug** (UID, Attached to: name, Required)
- **category** (Text, Short text, Required)
- **description** (Text, Long text, Required)

#### JSON Field:
- **features** (JSON)
  - Example: `["Độ chính xác cao", "Tốc độ nhanh", "Bền bỉ"]`

#### Media Field:
- **image** (Media, Single media, Required)

#### Number Field:
- **price** (Number, Decimal)

### Bước 3: Save và Publish

Click **Save** → Strapi sẽ restart server

---

## 2. Cấu hình Permissions

1. Vào **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. Tìm **Product**, check:
   - ✅ `find`
   - ✅ `findOne`
3. Click **Save**

---

## 3. Thêm sản phẩm mẫu

Vào **Content Manager** → **Product** → **Create new entry**

### Sản phẩm 1: Laser Marking
```
name: Laser Marking
slug: laser-marking
category: Khắc laser
description: Khắc laser chính xác cao cho kim loại, nhựa, gỗ và nhiều vật liệu khác. Công nghệ tiên tiến từ Suzhou Borna.
features: ["Độ chính xác cao", "Tốc độ nhanh", "Bền bỉ", "Tiết kiệm năng lượng"]
price: 150000000
image: (upload ảnh)
```

### Sản phẩm 2: Laser Skinning
```
name: Laser Skinning
slug: laser-skinning
category: Bóc vỏ cáp
description: Bóc vỏ cáp tự động với độ chính xác tuyệt đối, không làm hỏng lõi. Giải pháp tối ưu cho sản xuất cáp điện.
features: ["Tự động hóa", "An toàn", "Hiệu quả cao", "Không làm hỏng lõi"]
price: 180000000
image: (upload ảnh)
```

### Sản phẩm 3: Laser Welding
```
name: Laser Welding
slug: laser-welding
category: Hàn laser
description: Hàn laser công nghiệp cho kim loại, pin lithium và linh kiện điện tử. Chất lượng hàn vượt trội.
features: ["Chất lượng cao", "Không biến dạng", "Tiết kiệm năng lượng", "Độ bền cao"]
price: 200000000
image: (upload ảnh)
```

### Sản phẩm 4: Laser Cutting
```
name: Laser Cutting
slug: laser-cutting
category: Cắt laser
description: Cắt laser chính xác cho kim loại tấm, ống và các hình dạng phức tạp. Tốc độ cắt nhanh, độ chính xác cao.
features: ["Cắt nhanh", "Độ chính xác cao", "Đa dạng vật liệu", "Tiết kiệm chi phí"]
price: 250000000
image: (upload ảnh)
```

**Lưu ý:** Sau khi tạo mỗi sản phẩm, nhớ click **Publish**

---

## 4. Test API

```bash
# Test từ VPS
curl http://localhost:3001/api/products?populate=*

# Test từ bên ngoài
curl http://e1.chiasegpu.vn:57416/api/products?populate=*
```

Response mẫu:
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "Laser Marking",
        "slug": "laser-marking",
        "category": "Khắc laser",
        "description": "...",
        "features": ["Độ chính xác cao", "Tốc độ nhanh"],
        "price": 150000000,
        "image": {
          "data": {
            "attributes": {
              "url": "/uploads/..."
            }
          }
        }
      }
    }
  ]
}
```

---

## 5. Cập nhật Next.js config

File: `/home/ubuntu/yihuixuan/.env.local`

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:3001
STRAPI_API_TOKEN=your-api-token-here
```

---

## 6. Deploy lên VPS

```bash
# SSH vào VPS
ssh ubuntu@e1.chiasegpu.vn -p 17433

# Vào thư mục project
cd /home/ubuntu/yihuixuan

# Pull code mới
git pull origin main

# Install dependencies
npm install

# Build
npm run build

# Restart PM2
pm2 restart yihuixuan
pm2 save

# Check logs
pm2 logs yihuixuan --lines 50
```

---

## 7. Kiểm tra

- Next.js: http://e1.chiasegpu.vn:56329
- Strapi Admin: http://e1.chiasegpu.vn:57416/admin
- Strapi API: http://e1.chiasegpu.vn:57416/api/products?populate=*

---

## Troubleshooting

### Lỗi CORS
Nếu Next.js không fetch được từ Strapi, thêm vào `strapi/config/middlewares.js`:

```js
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'http:', 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'http:', 'https:'],
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:3000', 'http://e1.chiasegpu.vn:56329'],
    },
  },
  // ... rest
];
```

### Lỗi 404 Not Found
- Kiểm tra Permissions (Settings → Roles → Public → Product)
- Kiểm tra sản phẩm đã Publish chưa

### Lỗi connection refused
- Kiểm tra Strapi đang chạy: `pm2 list`
- Restart: `pm2 restart yihuixuan-strapi`
