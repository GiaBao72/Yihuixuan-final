# HƯỚNG DẪN DEPLOY LÊN VPS

## Bước 1: Push code lên GitHub

```bash
# Từ máy local
cd /home/tmc/projects/Yihuixuan
git push origin main
```

## Bước 2: SSH vào VPS

```bash
ssh ubuntu@e1.chiasegpu.vn -p 17433
# Password: QToHfBx9wyjk
```

## Bước 3: Pull code mới

```bash
cd /home/ubuntu/yihuixuan

# Backup nếu cần
cp -r . ../yihuixuan-backup-$(date +%Y%m%d)

# Pull code mới
git pull origin main
```

## Bước 4: Install dependencies

```bash
npm install
```

## Bước 5: Build Next.js

```bash
npm run build
```

## Bước 6: Restart PM2

```bash
# Stop process cũ
pm2 stop yihuixuan

# Start lại
pm2 start npm --name "yihuixuan" -- start

# Hoặc restart
pm2 restart yihuixuan

# Save config
pm2 save
```

## Bước 7: Check logs

```bash
pm2 logs yihuixuan --lines 50
```

## Bước 8: Test website

Mở browser: http://e1.chiasegpu.vn:56329

---

## Troubleshooting

### Lỗi "Port 80 already in use"

```bash
# Tìm process đang dùng port 80
sudo lsof -i :80

# Kill process
sudo kill -9 <PID>

# Restart PM2
pm2 restart yihuixuan
```

### Lỗi "Module not found"

```bash
# Xóa node_modules và reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
pm2 restart yihuixuan
```

### Lỗi "Permission denied"

```bash
# Chạy với sudo (nếu bind port 80)
pm2 delete yihuixuan
sudo pm2 start npm --name "yihuixuan" -- start
sudo pm2 save
```

### Website không load CSS/JS

```bash
# Check build output
ls -la .next/

# Rebuild
rm -rf .next
npm run build
pm2 restart yihuixuan
```

---

## Setup Strapi (nếu chưa có)

Xem file `STRAPI_SETUP.md` để:
1. Tạo Content Type "Product"
2. Cấu hình Permissions
3. Thêm sản phẩm mẫu

---

## Monitoring

```bash
# Check PM2 status
pm2 list

# Check logs real-time
pm2 logs yihuixuan

# Check memory/CPU
pm2 monit

# Restart if needed
pm2 restart yihuixuan
```

---

## Auto-restart on reboot

```bash
# Setup PM2 startup
pm2 startup
# Copy và chạy lệnh được suggest

# Save current processes
pm2 save
```

---

## Update sau này

```bash
# SSH vào VPS
ssh ubuntu@e1.chiasegpu.vn -p 17433

# Pull code mới
cd /home/ubuntu/yihuixuan
git pull origin main

# Install + Build + Restart
npm install
npm run build
pm2 restart yihuixuan

# Check
pm2 logs yihuixuan --lines 20
```
