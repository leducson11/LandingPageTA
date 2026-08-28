# 🚀 Quick Reference Cheat Sheet

## ⚡ Start Development

```bash
cd /Users/hnatn/Documents/GitHub/LandingPageTA
npm run dev
```

**URLs:**
- User: `http://localhost:5173`
- Login: `http://localhost:5173/login`
- Admin: `http://localhost:5173/admin`

## 🔑 Login Credentials

**Admin:**
```
Email: admin@huyway.com
Password: anything
→ Can access /admin ✅
```

**User:**
```
Email: any.other@email.com
Password: anything
→ Cannot access /admin ❌
```

## 📂 Import Patterns

```typescript
// Admin imports
import { Dashboard } from '@admin/pages/Dashboard';
import { DashboardLayout } from '@admin/components/layout/DashboardLayout';
import { cn } from '@admin/lib/utils';

// User imports
import Header from '@user/components/Header';
import LandingPage from '@user/pages/LandingPage';
import { useSmoothScroll } from '@user/hooks/useSmoothScroll';

// Shared imports
import { useAuth } from '@shared/contexts/AuthContext';
import { ProtectedRoute } from '@shared/components/ProtectedRoute';
```

## 🛠️ Common Commands

```bash
npm run dev        # Development server
npm run build      # Production build
npm run preview    # Preview production
npm run typecheck  # TypeScript check
npm run lint       # Lint code
```

## 📁 Directory Structure

```
src/
├── features/
│   ├── user/      # Landing page
│   └── admin/     # Dashboard
└── shared/        # Auth & common
```

## 🎨 Add New Pages

**User page:**
```typescript
// 1. Create: src/features/user/pages/NewPage.tsx
// 2. Add route in: src/features/user/UserApp.tsx
<Route path="/new" element={<NewPage />} />
```

**Admin page:**
```typescript
// 1. Create: src/features/admin/pages/NewPage.tsx
// 2. Add route in: src/features/admin/AdminApp.tsx
<Route path="/new" element={<NewPage />} />
// Auto-protected by ProtectedRoute wrapper
```

## 🔐 Use Auth in Components

```typescript
import { useAuth } from '@shared/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  
  if (!isAuthenticated) return <Login />;
  if (!isAdmin) return <AccessDenied />;
  
  return <div>Welcome {user.name}!</div>;
}
```

## 🎯 Test Checklist

- [ ] `npm run dev` - Server starts
- [ ] `/` - Landing page loads
- [ ] `/login` - Login form shows
- [ ] Login as admin - Success
- [ ] `/admin` - Dashboard shows
- [ ] Logout - Redirects to home
- [ ] Login as user - Success
- [ ] `/admin` - Access denied shows

## 📚 Documentation Files

- `QUICK_START.md` - Quick start guide
- `SUCCESS_SUMMARY.md` - Complete status
- `MIGRATION_GUIDE.md` - Full documentation
- `SETUP_STATUS.md` - Checklist
- `CHEAT_SHEET.md` - This file

## ⚠️ Troubleshooting

**TypeScript errors?**
```bash
npm run typecheck
# Restart VS Code
```

**Module not found?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port 5173 busy?**
```bash
lsof -ti:5173 | xargs kill -9
npm run dev
```

## ✅ Status

- [x] Dependencies installed
- [x] TypeScript passing
- [x] Build successful
- [x] Ready to run!

---

**Quick Tip:** Start with `npm run dev` and test the login flow!
