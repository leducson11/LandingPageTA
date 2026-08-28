# Migration Guide: Dual Feature Architecture (User + Admin)

## Tổng quan

Dự án đã được cấu trúc lại thành kiến trúc multi-feature với 2 features chính:
- **User Feature**: Giao diện landing page cho người dùng thông thường
- **Admin Feature**: Dashboard quản trị với authentication và authorization

## Cấu trúc thư mục

```
src/
├── App.tsx                    # Root router
├── main.tsx                   # Entry point
├── index.css                  # Global styles
├── features/
│   ├── user/                  # User feature
│   │   ├── UserApp.tsx       # User router
│   │   ├── user.css          # User-specific styles
│   │   ├── components/       # User components
│   │   ├── pages/            # User pages
│   │   ├── sections/         # Landing page sections
│   │   ├── hooks/            # User hooks
│   │   └── lib/              # User utilities
│   │
│   └── admin/                 # Admin feature
│       ├── AdminApp.tsx      # Admin router
│       ├── App.tsx           # Admin dashboard  
│       ├── index.css         # Admin-specific styles
│       ├── components/       # Admin components
│       ├── pages/            # Admin pages
│       ├── data/             # Mock data
│       ├── types/            # TypeScript types
│       └── lib/              # Admin utilities
│
└── shared/                    # Shared across features
    ├── components/
    │   └── ProtectedRoute.tsx # Route protection
    └── contexts/
        └── AuthContext.tsx    # Authentication system
```

## Routing Architecture

### Root Router (`src/App.tsx`)
```typescript
<AuthProvider>
  <BrowserRouter>
    <Routes>
      {/* User routes - public */}
      <Route path="/*" element={<UserApp />} />
      
      {/* Admin routes - protected, requires admin role */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute requireAdmin>
            <AdminApp />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
</AuthProvider>
```

### Các URL routes:

#### User (Public)
- `/` - Landing page
- `/login` - Login page

#### Admin (Protected)
- `/admin` - Admin dashboard (requires admin role)
- Các route con của admin sẽ được thêm trong `AdminApp.tsx`

## Authentication & Authorization

### Auth Context (`src/shared/contexts/AuthContext.tsx`)

Provides:
- `user`: Current user object với role (admin | user | null)
- `isAuthenticated`: Boolean check if user is logged in
- `isAdmin`: Boolean check if user has admin role
- `login(email, password)`: Login function
- `logout()`: Logout function
- `setUser(user)`: Update user state

### Mock Authentication

Hiện tại sử dụng mock authentication:
- Email `admin@huyway.com` với bất kỳ password nào → role: `admin`
- Email khác → role: `user`

### Protected Route Component

```typescript
<ProtectedRoute requireAdmin>
  {children}
</ProtectedRoute>
```

Behaviors:
1. **Loading**: Hiển thị loading spinner
2. **Not authenticated**: Redirect đến `/login`
3. **Authenticated but not admin** (khi `requireAdmin={true}`): Hiển thị "Access Denied" page
4. **Authorized**: Render children

## Path Aliases & TypeScript Config

### Vite Config (`vite.config.ts`)
```typescript
resolve: {
  alias: {
    '@': './src',
    '@admin': './src/features/admin',
    '@user': './src/features/user',
    '@shared': './src/shared',
  },
}
```

### TypeScript Config (`tsconfig.app.json`)
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["src/*"],
      "@admin/*": ["src/features/admin/*"],
      "@user/*": ["src/features/user/*"],
      "@shared/*": ["src/shared/*"]
    }
  }
}
```

### Import Examples

```typescript
// User feature imports
import Header from '@user/components/Header';
import { useScrollAnimation } from '@user/hooks/useScrollAnimation';

// Admin feature imports
import { Dashboard } from '@admin/pages/Dashboard';
import { DashboardLayout } from '@admin/components/layout/DashboardLayout';

// Shared imports
import { useAuth } from '@shared/contexts/AuthContext';
import { ProtectedRoute } from '@shared/components/ProtectedRoute';
```

## Styling Architecture

### Global Styles (`src/index.css`)
- Imports Inter (admin) + Montserrat (user) fonts
- CSS variables cho admin theme
- Animation keyframes
- Utility classes
- Admin-specific styles khi có class `.admin-layout`

### User Styles (`src/features/user/user.css`)
- Brand colors (#2C3481)
- Custom button styles (.btn-g3, .btn-outline-violet)
- User-specific utilities

### Admin Styles (sử dụng qua `index.css`)
- Admin CSS được import qua global styles
- AdminApp wrapper có class `admin-layout` để scope styles
- Font: Inter
- Primary color: #2563eb (blue)

## Setup & Installation

### Nếu gặp lỗi TypeScript về missing modules:

```bash
# Remove existing node_modules and lock file
rm -rf node_modules package-lock.json

# Clean npm cache
npm cache clean --force

# Reinstall dependencies
npm install
```

### Required dependencies (đã có trong package.json):
- `clsx` - Conditional className utility
- `tailwind-merge` - Merge Tailwind classes
- `recharts` - Charts library
- `lucide-react` - Icon library
- `react-router-dom` - Routing
- `class-variance-authority` - CVA for component variants

## Build & Run

```bash
# Development
npm run dev

# Type check
npm run typecheck

# Build
npm run build

# Preview production build
npm run preview
```

## Adding New Features

### To add a new user page:
1. Create page in `src/features/user/pages/`
2. Add route in `src/features/user/UserApp.tsx`
3. Use `@user/` imports

### To add a new admin page:
1. Create page in `src/features/admin/pages/`
2. Add route in `src/features/admin/AdminApp.tsx`
3. Use `@admin/` imports
4. Page sẽ tự động được protect bởi `ProtectedRoute`

### To add shared components:
1. Create in `src/shared/components/`
2. Use `@shared/` imports từ cả user và admin features

## Security Notes

### Current Implementation:
- Mock authentication (cần thay bằng Supabase Auth)
- localStorage để persist user session
- Client-side route protection

### TODO for Production:
1. Implement Supabase Authentication
2. Add JWT token validation
3. Add API route protection
4. Add role-based permissions
5. Add session timeout
6. Add CSRF protection
7. Secure sensitive routes

## Testing Login Flow

1. Vào `/login`
2. Nhập email `admin@huyway.com` + bất kỳ password
3. Sau khi login, truy cập `/admin` để vào dashboard
4. Thử logout từ header admin
5. Thử truy cập `/admin` khi chưa login → redirect to `/login`
6. Login với email khác (không phải admin@huyway.com) → truy cập `/admin` sẽ hiển thị "Access Denied"

## Common Issues

### Issue: TypeScript không nhận diện path aliases
**Solution**: 
```bash
npm run typecheck
# Nếu vẫn lỗi, restart VS Code / IDE
```

### Issue: Styles không load đúng
**Solution**: 
- Check xem AdminApp có class `admin-layout` chưa
- Verify CSS imports trong UserApp.tsx và index.css

### Issue: Navigation không hoạt động
**Solution**:
- Verify BrowserRouter wrap toàn bộ routes
- Check các nested Routes có `/*` wildcard chưa

## Migration Checklist

- [x] Copy admin source từ `/Users/hnatn/Documents/huyway-admin`
- [x] Cấu trúc lại thành features architecture
- [x] Update tất cả imports từ `@/` → `@admin/` và `@user/`
- [x] Setup routing với ProtectedRoute
- [x] Setup authentication context
- [x] Integrate logout button với auth context
- [x] Configure Vite & TypeScript paths
- [x] Merge CSS styles
- [x] Test user routes
- [ ] Test admin routes
- [ ] Fix TypeScript errors (nếu còn)
- [ ] Run build test
- [ ] Deploy và test production

## Next Steps

1. **Fix dependencies**: Clean install node_modules
2. **Test the application**: Run `npm run dev` and test both user và admin flows
3. **Implement Supabase Auth**: Replace mock auth với real authentication
4. **Add more admin pages**: Expand admin dashboard functionality
5. **Add API integration**: Connect với backend APIs
6. **Setup CI/CD**: Automate deployment
