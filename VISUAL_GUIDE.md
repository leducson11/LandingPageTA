# 👁️ Visual Guide - What You Should See

## 🏠 Landing Page (/)

```
┌─────────────────────────────────────────────┐
│  TopBar: "Hotline: 0963 073 488"           │
├─────────────────────────────────────────────┤
│  Header: HuyWay English + Navigation        │
├─────────────────────────────────────────────┤
│                                             │
│  🎯 HERO SECTION                            │
│  Large heading + CTA button                │
│  Gradient background                        │
│                                             │
├─────────────────────────────────────────────┤
│  📊 STATS (4 columns)                       │
│  [10K+ học viên] [95% đạt mục tiêu] etc.   │
├─────────────────────────────────────────────┤
│  🎓 COURSES CAROUSEL                        │
│  Foundation | Intermediate | Advanced       │
├─────────────────────────────────────────────┤
│  ❗ PAIN POINTS                             │
│  Common problems students face              │
├─────────────────────────────────────────────┤
│  📝 STEPS                                   │
│  1 → 2 → 3 → 4 learning process            │
├─────────────────────────────────────────────┤
│  💬 TESTIMONIALS                            │
│  Student reviews with stars                │
├─────────────────────────────────────────────┤
│  ❓ FAQ                                     │
│  Accordion with questions                   │
├─────────────────────────────────────────────┤
│  👨‍🏫 INSTRUCTOR                             │
│  Teacher profile                            │
├─────────────────────────────────────────────┤
│  FOOTER: Links + Social Icons               │
│  Facebook | Youtube | Instagram             │
└─────────────────────────────────────────────┘
```

**Colors:**
- Primary: #2C3481 (violet/purple)
- Accent: #F68C1F (orange)
- Font: Montserrat

---

## 🔐 Login Page (/login)

```
┌─────────────────────────────────────────────┐
│                                             │
│        Gradient Background                  │
│    (brand-50 to white)                      │
│                                             │
│    ┌───────────────────────────────┐       │
│    │   🏢 HuyWay English           │       │
│    │   Đăng nhập vào hệ thống      │       │
│    │                               │       │
│    │   📧 Email                    │       │
│    │   [input field]               │       │
│    │                               │       │
│    │   🔒 Mật khẩu                 │       │
│    │   [input field]               │       │
│    │                               │       │
│    │   [Đăng nhập Button]          │       │
│    │   (Violet with shadow)        │       │
│    │                               │       │
│    │   🔑 Demo Credentials:        │       │
│    │   (Blue info box)             │       │
│    │   Admin: admin@huyway.com     │       │
│    │   User: user@example.com      │       │
│    │                               │       │
│    │   ← Về trang chủ              │       │
│    └───────────────────────────────┘       │
│                                             │
│   Phiên bản demo với mock auth             │
└─────────────────────────────────────────────┘
```

**Colors:**
- Background: Gradient blue to white
- Button: #2C3481 (violet)
- Info box: Blue (#eff6ff)

---

## 🎛️ Admin Dashboard (/admin)

```
┌─────────────────────────────────────────────────────────┐
│ HEADER                                                  │
│ [☰] Tổng quan > Dashboard    [🔄 Đồng bộ] [👤AD] [🚪] │
└─────────────────────────────────────────────────────────┘
┌────────┬────────────────────────────────────────────────┐
│SIDEBAR │ MAIN CONTENT                                   │
│        │                                                │
│ 📊     │ 📈 KPI CARDS (4 cards in row)                 │
│ Tổng   │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │
│ quan   │ │ 234  │ │ 156  │ │ 89   │ │ 45   │          │
│ [📍]   │ │Khách │ │Học   │ │Leads │ │Chuyển│          │
│        │ │hàng  │ │viên  │ │mới   │ │đổi   │          │
│ 👥     │ └──────┘ └──────┘ └──────┘ └──────┘          │
│ Khách  │                                                │
│ hàng   │ 📊 LEAD DISTRIBUTION CHART                    │
│        │ ┌────────────────────────────────────┐        │
│ 🎓     │ │                                    │        │
│ Học    │ │      Pie Chart                     │        │
│ viên   │ │   (Recharts visualization)         │        │
│        │ │                                    │        │
│ 📝     │ └────────────────────────────────────┘        │
│ Leads  │                                                │
│        │ 📈 LEADS OVER TIME                            │
│ 📊     │ ┌────────────────────────────────────┐        │
│ Báo    │ │                                    │        │
│ cáo    │ │    Line Chart                      │        │
│        │ │   (Monthly data)                   │        │
│ ⚙️     │ │                                    │        │
│ Cài    │ └────────────────────────────────────┘        │
│ đặt    │                                                │
└────────┴────────────────────────────────────────────────┘
```

**Layout:**
- Sidebar: Fixed left, dark background
- Main: White/light gray
- Font: Inter (professional)
- Primary: #2563eb (blue)

**Header Elements:**
- Hamburger menu (mobile)
- Breadcrumb navigation
- "Super Admin" badge (violet)
- Sync status (green badge)
- User avatar (initials)
- Logout button

---

## 🚫 Access Denied Page

```
┌─────────────────────────────────────────────┐
│                                             │
│              ⚠️                             │
│        (Red warning icon)                   │
│                                             │
│      Truy cập bị từ chối                    │
│                                             │
│   Bạn không có quyền truy cập               │
│   vào trang quản trị. Vui lòng              │
│   liên hệ quản trị viên...                  │
│                                             │
│       [Về trang chủ]                        │
│                                             │
└─────────────────────────────────────────────┘
```

**When shown:**
- User logged in but role = "user"
- Tries to access `/admin`

---

## 📱 Mobile Views

### Landing Page Mobile
```
┌─────────────┐
│   Header    │
│  [☰ Menu]   │
├─────────────┤
│             │
│    Hero     │
│   (Stack)   │
│             │
├─────────────┤
│   Stats     │
│  (2x2 grid) │
├─────────────┤
│  Carousel   │
│  (Swiper)   │
├─────────────┤
│   Content   │
│  (Stacked)  │
├─────────────┤
│   Footer    │
│ (Simplified)│
└─────────────┘
```

### Admin Mobile
```
┌─────────────┐
│ [☰] Header  │
├─────────────┤
│             │
│  KPI Cards  │
│  (Stacked)  │
│             │
├─────────────┤
│             │
│   Charts    │
│  (Scroll)   │
│             │
└─────────────┘

Sidebar:
┌─────────────┐
│ 📊 Tổng quan│
│ 👥 Khách    │
│ 🎓 Học viên │
│ 📝 Leads    │
│ 📊 Báo cáo  │
│ ⚙️ Cài đặt  │
└─────────────┘
(Overlay menu)
```

---

## 🎨 Color Reference

### User Feature
```
Brand Primary:   #2C3481 (Violet)
Brand Secondary: #F68C1F (Orange)
Background:      #FFFFFF (White)
Text:            #000000 (Black)
Text Secondary:  #717174 (Gray)
```

### Admin Feature
```
Primary:         #2563eb (Blue)
Primary Light:   #eff6ff (Light Blue)
Success:         #10b981 (Green)
Warning:         #f59e0b (Amber)
Danger:          #ef4444 (Red)
Violet:          #8b5cf6 (Purple)
Background:      #f5f7fa (Light Gray)
Card:            #ffffff (White)
Border:          #e5e7eb (Gray)
Text:            #111827 (Dark Gray)
Text Secondary:  #6b7280 (Gray)
```

---

## ✅ Visual Checklist

**Landing Page:**
- [ ] TopBar visible with phone number
- [ ] Header sticky on scroll
- [ ] Hero section with gradient
- [ ] CTA buttons with shadow
- [ ] Stats cards (4 columns)
- [ ] Carousel with cards
- [ ] Smooth animations on scroll
- [ ] Footer with social icons
- [ ] Montserrat font

**Login Page:**
- [ ] Centered form
- [ ] Gradient background
- [ ] Email + password fields
- [ ] Login button with brand color
- [ ] Demo credentials info box (blue)
- [ ] Back to home link
- [ ] Responsive on mobile

**Admin Dashboard:**
- [ ] Sidebar on left (desktop)
- [ ] Header with user info
- [ ] 4 KPI cards in row
- [ ] Pie chart rendering
- [ ] Line chart rendering
- [ ] "Super Admin" badge
- [ ] Logout button visible
- [ ] Inter font
- [ ] Responsive (hamburger on mobile)

**Access Control:**
- [ ] Redirect to login when not authenticated
- [ ] Access denied page for non-admin
- [ ] Successful login redirects correctly
- [ ] Logout clears session

---

**Open http://localhost:5173 and compare with these guides!** 👀
