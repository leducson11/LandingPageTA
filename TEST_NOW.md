# 🧪 TEST NOW - Server đang chạy!

## ✅ Server Status
```
✅ Running at: http://localhost:5173
✅ Network: http://192.168.0.109:5173
✅ LoginPage đã được tạo với form login hoàn chỉnh!
```

---

## 🧪 TEST CASES

### 1️⃣ **Test User Landing Page** (2 phút)
```
URL: http://localhost:5173/
```

**Expected:**
- ✅ Landing page hiển thị
- ✅ Header với navigation
- ✅ Hero section với CTA button
- ✅ Stats section
- ✅ Course carousel
- ✅ Pain points section
- ✅ Steps section
- ✅ Testimonials
- ✅ FAQ
- ✅ Footer với social icons
- ✅ Smooth scroll animations
- ✅ Montserrat font

---

### 2️⃣ **Test Login Page UI** (1 phút)
```
URL: http://localhost:5173/login
```

**Expected:**
- ✅ Login form hiển thị
- ✅ Email input field
- ✅ Password input field
- ✅ "Đăng nhập" button
- ✅ Demo credentials info box (xanh dương)
- ✅ "Về trang chủ" link
- ✅ Gradient background (brand colors)
- ✅ Responsive design

---

### 3️⃣ **Test Admin Login Flow** (2 phút)

**Step 1: Vào login page**
```
URL: http://localhost:5173/login
```

**Step 2: Nhập credentials**
```
Email: admin@huyway.com
Password: 123456 (hoặc bất kỳ)
```

**Step 3: Click "Đăng nhập"**

**Expected:**
- ✅ Redirect tự động đến `/admin`
- ✅ Admin dashboard hiển thị
- ✅ Sidebar bên trái với navigation
- ✅ Header với user info
- ✅ KPI cards (4 cards với số liệu)
- ✅ Charts (Lead Distribution, Leads Over Time)
- ✅ "Đồng bộ Google Sheets" badge
- ✅ Logout button (icon) ở header

---

### 4️⃣ **Test Admin Dashboard Features** (2 phút)

**Khi đã vào `/admin`:**

**Test Navigation:**
- ✅ Click "Tổng quan" → Active state
- ✅ Click "Khách hàng" → "Module này đang được xây dựng"
- ✅ Click "Học viên" → "Module này đang được xây dựng"
- ✅ Sidebar responsive (mobile: hamburger menu)

**Test User Info:**
- ✅ Avatar hiển thị "AD" hoặc initials
- ✅ Name hiển thị: "Admin User"
- ✅ Email hiển thị: "admin@huyway.com"

**Test Dashboard Data:**
- ✅ KPI cards show numbers
- ✅ Charts render properly
- ✅ "Super Admin" badge visible
- ✅ Inter font (khác với landing page)

---

### 5️⃣ **Test Logout Flow** (1 phút)

**Trong admin dashboard:**

**Step 1: Click logout button**
```
Location: Header, bên phải user info, icon LogOut
```

**Expected:**
- ✅ Redirect về trang chủ `/`
- ✅ User logged out

**Step 2: Thử vào lại `/admin`**
```
URL: http://localhost:5173/admin
```

**Expected:**
- ✅ Auto redirect to `/login`
- ✅ Cannot access admin without login

---

### 6️⃣ **Test Access Control - Regular User** (2 phút)

**Step 1: Logout nếu đang login**

**Step 2: Vào login page**
```
URL: http://localhost:5173/login
```

**Step 3: Login as regular user**
```
Email: user@example.com
Password: anything
```

**Step 4: Thử vào admin**
```
URL: http://localhost:5173/admin
```

**Expected:**
- ✅ "Truy cập bị từ chối" page
- ✅ Warning icon (red)
- ✅ Message: "Bạn không có quyền truy cập..."
- ✅ "Về trang chủ" button
- ✅ User CANNOT access admin dashboard

---

### 7️⃣ **Test Direct Admin Access (Not Logged In)** (1 phút)

**Step 1: Logout hoặc mở incognito window**

**Step 2: Direct access**
```
URL: http://localhost:5173/admin
```

**Expected:**
- ✅ Auto redirect to `/login`
- ✅ After login, redirect back to `/admin`

---

### 8️⃣ **Test Responsive Design** (3 phút)

**Desktop (>1024px):**
- ✅ Landing page full layout
- ✅ Admin sidebar visible
- ✅ All features accessible

**Tablet (768px - 1024px):**
- ✅ Landing page adapts
- ✅ Admin sidebar collapsible
- ✅ Touch-friendly

**Mobile (<768px):**
- ✅ Landing page mobile layout
- ✅ Admin hamburger menu
- ✅ Forms full width
- ✅ Buttons large enough

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module '@shared/contexts/AuthContext'"
**Solution:** TypeScript may need restart
```bash
# Restart VS Code or
npm run typecheck
```

### Issue: Login không hoạt động
**Check:**
1. Console errors (F12)
2. Network tab for errors
3. AuthContext imported đúng

### Issue: Styles không đúng
**Check:**
1. `user.css` loaded trong UserApp
2. `admin-layout` class có trong AdminApp
3. Clear browser cache (Ctrl+Shift+R)

### Issue: Admin redirect loop
**Check:**
1. localStorage có user data
2. Clear localStorage: `localStorage.clear()`
3. Try login again

---

## 📊 Expected Results Summary

| Test | URL | Expected Result |
|------|-----|----------------|
| Landing | `/` | ✅ Full page with animations |
| Login UI | `/login` | ✅ Form with demo info |
| Admin Login | Login + `/admin` | ✅ Dashboard accessible |
| Admin Features | `/admin` | ✅ Sidebar, charts, KPI cards |
| Logout | Click logout | ✅ Redirect to `/` |
| User Access | User login + `/admin` | ✅ "Access Denied" |
| No Auth | Direct `/admin` | ✅ Redirect to `/login` |
| Responsive | Resize browser | ✅ Adapts to screen size |

---

## 🎯 Success Criteria

**ALL OF THESE SHOULD WORK:**

- [ ] Landing page loads without errors
- [ ] Login page shows form
- [ ] Admin can login with admin@huyway.com
- [ ] Admin can access /admin dashboard
- [ ] Dashboard shows all components (sidebar, charts, etc.)
- [ ] User info displays correctly
- [ ] Logout works and clears session
- [ ] Regular user CANNOT access /admin
- [ ] "Access Denied" page shows for non-admin
- [ ] Redirect to /login works when not authenticated
- [ ] Styles correct (Montserrat for user, Inter for admin)
- [ ] No console errors (check F12)
- [ ] Responsive on mobile

---

## 🚀 Quick Test Commands

```bash
# Check console for errors
Open browser → F12 → Console tab

# Check network
Open browser → F12 → Network tab

# Test localStorage
Console: localStorage.getItem('user')

# Clear session
Console: localStorage.clear()
```

---

## 📱 Test URLs Quick Copy

```
Landing:  http://localhost:5173/
Login:    http://localhost:5173/login
Admin:    http://localhost:5173/admin
```

**Admin Credentials:**
```
Email: admin@huyway.com
Password: anything
```

**User Credentials:**
```
Email: user@example.com
Password: anything
```

---

## ✅ After Testing

Nếu tất cả tests passed:
1. ✅ Commit code
2. ✅ Update production environment variables
3. ✅ Replace mock auth với Supabase
4. ✅ Add more admin pages
5. ✅ Deploy!

Nếu có issues:
1. Check console errors (F12)
2. Check `TEST_NOW.md` troubleshooting section
3. Check documentation files
4. Report issues

---

**BẮT ĐẦU TEST NGAY! Server đang chạy ở http://localhost:5173** 🚀
