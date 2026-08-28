# ⚡ Quick Start Guide

## 1️⃣ Install (1 phút)

```bash
cd /Users/hnatn/Documents/GitHub/LandingPageTA

# Clean install
rm -rf node_modules package-lock.json .npm-cache
npm cache clean --force
npm install
```

## 2️⃣ Run (10 giây)

```bash
npm run dev
```

Server sẽ chạy tại: **http://localhost:5173**

## 3️⃣ Test (2 phút)

### Test 1: User Page ✅
```
URL: http://localhost:5173
Expected: Landing page hiển thị
```

### Test 2: Login Page ✅
```
URL: http://localhost:5173/login
Expected: Form login hiển thị
```

### Test 3: Admin Login ✅
```
1. Vào: http://localhost:5173/login
2. Email: admin@huyway.com
3. Password: anything
4. Click Login
```

### Test 4: Admin Dashboard ✅
```
URL: http://localhost:5173/admin
Expected: Dashboard với sidebar, charts, KPI cards
```

### Test 5: Logout ✅
```
1. Trong /admin, click nút Logout (icon) ở header
2. Expected: Redirect về trang chủ
```

### Test 6: Access Control ✅
```
1. Login với email khác (không phải admin@huyway.com)
2. Thử vào: http://localhost:5173/admin
3. Expected: "Truy cập bị từ chối" page
```

## 📊 Architecture

```
/                  → User Landing Page (Public)
/login             → Login Page (Public)
/admin             → Admin Dashboard (Protected - Admin Only)
```

## 🔐 Login Credentials

### Admin:
```
Email: admin@huyway.com
Password: anything
Role: admin ✅ Vào được /admin
```

### User:
```
Email: any other email
Password: anything
Role: user ❌ KHÔNG vào được /admin
```

## 📂 Project Structure

```
src/
├── App.tsx                  # Root router
├── features/
│   ├── user/               # User feature (public)
│   │   ├── UserApp.tsx     # User routes
│   │   ├── pages/          # Landing, Login
│   │   └── components/     # User components
│   │
│   └── admin/              # Admin feature (protected)
│       ├── AdminApp.tsx    # Admin routes
│       ├── pages/          # Dashboard
│       └── components/     # Admin components
│
└── shared/                 # Shared
    ├── contexts/
    │   └── AuthContext.tsx # Authentication
    └── components/
        └── ProtectedRoute.tsx # Route protection
```

## 🛠️ Commands

```bash
npm run dev         # Start dev server
npm run build       # Build production
npm run typecheck   # Check TypeScript
npm run lint        # Lint code
```

## ❗ If Issues

### TypeScript errors?
```bash
npm run typecheck
# Then restart VS Code
```

### Dependencies missing?
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port already in use?
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
npm run dev
```

## 📚 More Info

- **Complete Guide:** `MIGRATION_GUIDE.md`
- **Status & Checklist:** `SETUP_STATUS.md`
- **Integration Summary:** `README_INTEGRATION.md`

## ✅ Done!

Bây giờ bạn có:
- ✅ User landing page
- ✅ Admin dashboard
- ✅ Authentication & authorization
- ✅ Protected routes
- ✅ Role-based access control

**Enjoy! 🎉**
