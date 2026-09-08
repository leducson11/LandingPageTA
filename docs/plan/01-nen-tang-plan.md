# Coding Plan — Nhóm 1: Nền tảng dùng chung

> Nguồn yêu cầu: `requirements/14-xac-thuc-phan-quyen-module.docx` (Module 14) +
> `requirements/17-chinh-sach-he-thong-module.docx` (Module 17), tham chiếu Module 2.2 (field
> form Lead) và `DESIGN.md`. Bối cảnh lỗi hiện trạng: `BACAO_KIEM_THU.md`.
> Trạng thái: **chưa code** — tài liệu này là bản thiết kế thực thi.

---

## 1. Mục tiêu Nhóm 1

Thay toàn bộ phần "thử nghiệm" bằng nền tảng thật để 4 nhóm sau đứng lên:

| # | Hạng mục | Từ requirement |
|---|----------|----------------|
| A | Xác thực thật (Supabase Auth) + 3 vai trò + guard FE & BE + session timeout | 14.1, 14.2 |
| B | Quản lý tài khoản (tạo/sửa/khoá/gán vai trò), ràng buộc ≥1 Super Admin | 14.2 |
| C | Component `<LeadForm>` dùng chung: validate client+server, 4 trạng thái, ghi DB thật, chống double-submit, timeout | 17.4, 2.2 |
| D | Chính sách bảo vệ dữ liệu cá nhân + ghi vết version đồng ý | 17.1 |
| E | Trang lỗi 404/500 tuỳ biến + fallback tĩnh + error logging | 17.2 |
| F | Meta SEO (title/description/OG/favicon) + sitemap.xml/robots.txt + không hard-code | 17.3 |
| G | Lớp design token theo `DESIGN.md` (Montserrat, 2 màu) + schema DB + RLS | ràng buộc phi CN |

**Ngoài phạm vi Nhóm 1** (ghi rõ để không lạm scope): dựng lại layout Hero/CTA (Nhóm 2), CMS
sửa nội dung (Nhóm 4), Google Sheets sync (Nhóm 4), refactor admin sang route lồng nhau thật
(Nhóm 4), brute-force rate-limit tuỳ biến (chờ khách xác nhận — tạm dùng giới hạn mặc định của
Supabase Auth).

---

## 2. Kiến trúc

### 2.1 Tầng dữ liệu (Supabase Postgres)

> Chạy migration qua Supabase SQL Editor hoặc `supabase db push`. **Supabase MCP trong phiên này
> chưa được uỷ quyền** → người thực thi tự apply. Dự án hiện trỏ tới `hrbibbadjrimkyhbvyov`
> (`.env`).

**Enum**
- `public.app_role` = `('super_admin','marketing','cskh')`
- `public.lead_status` = `('new','contacting','closed','unreachable')`
- `public.lead_source` = `('landing_hero','cta_after_hero','cta_after_steps','cta_after_instructor','manual_hotline')`

**Bảng**

| Bảng | Cột chính | Ghi chú |
|------|-----------|---------|
| `profiles` | `id uuid PK → auth.users`, `email`, `full_name`, `role app_role`, `is_active bool default true`, `created_by uuid`, `created_at`, `updated_at` | 1–1 với `auth.users`; tạo tự động bằng trigger `on_auth_user_created` |
| `leads` | `id uuid PK default gen_random_uuid()`, `full_name text not null`, `phone text not null`, `phone_normalized text not null`, `email text`, `course_interest text`, `current_level text`, `learning_need text`, `source lead_source not null`, `status lead_status not null default 'new'`, `consent bool not null`, `consent_version text not null`, `consent_at timestamptz not null`, `assigned_to uuid → profiles`, `created_at`, `updated_at` | `phone_normalized` phục vụ chống trùng; `CHECK (consent = true)` |
| `policy_documents` | `id uuid PK`, `slug text`, `version text`, `title text`, `body_md text`, `is_current bool`, `published_at timestamptz` | Nhóm 1 seed 1 bản ghi `slug='data-privacy'`; Nhóm 4 (CMS) cấp UI sửa |
| `audit_log` | `id`, `actor_id uuid`, `action text`, `entity text`, `entity_id text`, `diff jsonb`, `created_at` | Dùng chung cho 14.2 (đổi tài khoản) và về sau Module 16 |
| `error_log` | `id`, `level text`, `message text`, `context jsonb`, `url text`, `user_agent text`, `created_at` | Nhận báo lỗi từ client/Edge cho case 500 |

**Hàm & trigger**
- `public.current_app_role() returns app_role` — `SECURITY DEFINER`, đọc `role` của `auth.uid()` từ `profiles` (dùng trong mọi RLS policy admin).
- `public.handle_new_user()` — trigger `AFTER INSERT ON auth.users` → tạo `profiles` (role mặc định lấy từ `raw_user_meta_data.role`, fallback `cskh`).
- `public.guard_last_super_admin()` — trigger `BEFORE UPDATE/DELETE ON profiles`: chặn nếu thao tác làm số Super Admin `is_active` về 0.
- `public.normalize_phone(text) returns text` — bỏ khoảng trắng/`-`/`()`, đổi `+84`→`0`.
- `public.set_updated_at()` — trigger cập nhật `updated_at`.
- `leads` `BEFORE INSERT`: set `phone_normalized = normalize_phone(phone)`, validate `phone_normalized ~ '^0(3|5|7|8|9)[0-9]{8}$'`, `email` (nếu có) đúng định dạng, độ dài `full_name ≤ 120`, `learning_need ≤ 2000` — **server-side validation** (chống bypass).

**RLS** (bật cho tất cả bảng)

| Bảng | anon | authenticated |
|------|------|---------------|
| `leads` | `INSERT` cho phép qua Edge Function (service role) — **không** cấp policy insert trực tiếp cho anon; **không** SELECT | `SELECT`/`UPDATE` chỉ khi `current_app_role() IN ('cskh','super_admin')` (marketing **không** thấy lead) |
| `profiles` | không | `SELECT` bản thân; `SELECT`/`INSERT`/`UPDATE` mọi bản ghi khi `current_app_role() = 'super_admin'` |
| `policy_documents` | `SELECT` khi `is_current` | `ALL` khi role `super_admin`/`marketing` |
| `audit_log` | không | `SELECT` khi `super_admin`; INSERT chỉ qua hàm |
| `error_log` | `INSERT` qua Edge Function `log-error` | `SELECT` khi `super_admin` |

### 2.2 Edge Functions (Deno, `supabase/functions/`)

| Function | Vào | Ra | Vai trò |
|----------|-----|----|---------|
| `submit-lead` | `{ full_name, phone, email?, course_interest?, current_level?, learning_need?, source, consent }` | `{ ok:true, id, resubmitted:bool }` \| `{ ok:false, errors:{field:msg} }` | Public. Validate lại **cùng bộ quy tắc** (`_shared/rules.ts`), normalize phone, chống trùng theo `phone_normalized`: **đã chốt (2026-09-08, xem Nhóm 4 §7.3) — Lead mới thắng** — nếu đã tồn tại, **ghi đè** field bằng dữ liệu mới, tăng `registration_count`, `updated_at=now()`, **giữ nguyên `id`/`created_at`** gốc, ghi `lead_events(type='resubmit')`, trả `{ ok:true, id, resubmitted:true }` (không tạo bản ghi mới). Gắn `consent_version` = version `policy_documents` hiện hành + `consent_at = now()`, insert/update bằng `service_role`. `registration_count` là cột thêm ở Nhóm 4 (`0005_lead_ops.sql`) — Nhóm 1 chỉ cần cột `id`/`created_at` ổn định để hành vi này áp dụng được sau. |
| `log-error` | `{ message, context?, url?, level? }` | `{ ok:true }` | Public, chặn payload > 8KB, ghi `error_log`. |
| `admin-users` | `{ action:'create'\|'update'\|'deactivate', ... }` | `{ ok, user? }` | Xác minh JWT caller + `current_app_role()='super_admin'`; dùng `supabase.auth.admin` (service role) để tạo user / đổi `role` / set `is_active`; ghi `audit_log`. Chặn hạ cấp/khoá Super Admin cuối cùng (double-check với trigger DB). |

`supabase/functions/_shared/rules.ts` — **nguồn chân lý** cho regex/độ dài, được **client import trực tiếp** (`src/shared/forms/rules.ts` re-export cùng nội dung — giữ 1 bản, symlink logic bằng cách để file gốc ở `src/shared/forms/rules.ts` và Edge Function import qua đường dẫn tương đối `../../src/shared/forms/rules.ts` khi bundle, hoặc copy có test so khớp). Quy tắc:
- `phone`: sau normalize khớp `^0(3|5|7|8|9)[0-9]{8}$`
- `email`: **đã chốt (2026-09-08)** — chỉ cần định dạng hợp lệ kiểu RFC 5322 rút gọn
  (`^[^\s@]+@[^\s@]+\.[^\s@]+$`), **không** bắt buộc đuôi `@gmail.com` (tránh chặn email doanh
  nghiệp của khách hàng)
- `full_name`: bắt buộc, 2–120 ký tự
- `consent`: bắt buộc `true`
- `learning_need`: ≤ 2000

### 2.3 Tầng client (React)

```
src/shared/
├── lib/
│   ├── supabase.ts          # client Supabase DUY NHẤT (chuyển từ @user/lib/supabase)
│   ├── database.types.ts    # type sinh từ `supabase gen types`
│   └── permissions.ts       # ROLE_HOME, ROLE_LABEL, canAccessSection()
├── contexts/
│   └── AuthContext.tsx      # VIẾT LẠI: Supabase Auth
├── hooks/
│   ├── useIdleTimeout.ts    # tự signOut sau 30' không thao tác + cảnh báo trước 2'
│   └── usePolicyDocument.ts # fetch policy_documents hiện hành (+ fallback bundle)
├── components/
│   ├── ProtectedRoute.tsx   # VIẾT LẠI: requireAuth + allowedRoles
│   ├── ErrorBoundary.tsx    # class component, post lên log-error
│   ├── Seo.tsx              # đặt title/meta/OG (react-helmet-async)
│   └── PolicyModal.tsx      # modal Chính sách (đóng Esc, focus-trap, lock scroll)
├── forms/
│   ├── rules.ts             # regex + hằng số (nguồn chân lý, xem 2.2)
│   ├── validators.ts        # required/vnPhone/email/maxLen → FieldError|null
│   ├── useFormState.ts      # status idle|loading|success|error, values, errors, submit() có timeout 15s
│   └── fields/              # <TextField> <SelectField> <TextAreaField> <ConsentCheckbox> theo DESIGN.md
└── LeadForm/
    ├── LeadForm.tsx         # form Lead dùng chung — props: source, onSuccess, variant
    └── LeadFormSuccess.tsx  # trạng thái "Thank You" inline
```

**AuthContext (mới)** — state: `session`, `user`, `profile {role,is_active,full_name}`, `status: 'loading'|'authed'|'anon'`. API: `signIn(email,password)`, `signOut()`. Dùng `supabase.auth.onAuthStateChange`, `autoRefreshToken`. Sai đăng nhập → ném lỗi generic (không phân biệt email tồn tại). `profile.is_active === false` → `signOut()` ngay + thông báo.

**ProtectedRoute (mới)** — `<ProtectedRoute allowedRoles={['super_admin','cskh']}>`:
- `status==='loading'` → spinner
- `status==='anon'` → `<Navigate to="/login" state={{from}} />`
- `profile` không thuộc `allowedRoles` hoặc `!is_active` → render `<ForbiddenView />` (403, nút về trang phù hợp vai trò)

**Điều hướng admin theo vai trò** — `NAV_ITEMS` (trong `mockDashboard.ts`, sẽ tách thành `src/features/admin/config/nav.ts`) thêm `roles: AppRole[]`:
| Mục | roles |
|-----|-------|
| Tổng quan | super_admin *(báo cáo cho Marketing/CSKH tính sau)* |
| Quản lý Content Landing | super_admin, marketing |
| Quản lý Leads / Danh sách khách hàng | super_admin, cskh |
| Quản lý tài khoản | super_admin |
| (còn lại) | super_admin |

`Sidebar` lọc theo `profile.role`; admin `App.tsx` chọn `activeId` mặc định = section đầu tiên vai trò được phép; chọn mục ngoài quyền → `<ForbiddenView />`.
*(Deep-link tới từng section = route thật: hoãn sang Nhóm 4. Nhóm 1 chỉ bảo vệ `/admin`.)*

**`<LeadForm>`** — luôn đủ field (không có bản rút gọn), gọi `submit-lead`. Trạng thái qua `useFormState`:
- `idle` → form
- `loading` → nút disable + spinner, khoá double-submit
- `success` → `<LeadFormSuccess>` (đã nhận thông tin)
- `error` → banner lỗi chung + giữ nguyên dữ liệu đã nhập + nút "Thử lại"; timeout 15s không treo
- Checkbox consent: **không** tick sẵn; văn bản đúng nguyên văn Module 2.2 + link mở `<PolicyModal>`; chưa tick mà gửi → chặn + lỗi inline.
- `inputmode="tel"` cho SĐT; hiển thị `+84`, chuẩn hoá trước validate.

### 2.4 SEO / trang lỗi / hạ tầng

- `Seo.tsx` dùng `react-helmet-async` (thêm dependency — xem §6). Mỗi route public khai báo `<Seo title description ogImage />`. Giá trị mặc định trong `src/shared/config/seo.ts`; **để ngỏ cho CMS ghi đè ở Nhóm 4** (đọc từ `policy_documents`/bảng settings tương lai) → không hard-code trong JSX.
- `index.html`: đổi Google Fonts `Inter` → `Montserrat:wght@400;600`; sửa `<title>` thật; thêm `<meta name="description">`, `og:title/description/url/type`, `og:image` = `/og-default.png`; xoá URL `bolt.new`.
- `public/`: `robots.txt`, `sitemap.xml` (liệt kê `/`, `/chinh-sach-bao-mat` — sinh động hoá hoãn lại), `og-default.png` (asset tạm theo brand), `404.html` + `500.html` tĩnh không phụ thuộc JS (fallback vòng lặp lỗi), `.htaccess` mẫu (SPA rewrite + `ErrorDocument` + ép HTTPS/HSTS cho Apache/XAMPP hiện tại).
- `ErrorBoundary` bọc toàn app trong `App.tsx`; render `<ErrorPage code={500}/>` + `POST log-error`.
- HTTPS toàn site: cấu hình host (mẫu `.htaccess`), ghi vào checklist deploy — không giải quyết được trong code SPA.

---

## 3. Trình tự triển khai (theo dependency)

> Mỗi bước nên là 1 commit/PR con. Bước 1–2 (BE) mở khoá 3, 5, 6, 7. Bước 4 (token) độc lập, làm
> sớm để primitive UI dựng đúng ngay.

| B | Việc | Phụ thuộc | Đầu ra kiểm chứng |
|---|------|-----------|-------------------|
| 1 | `supabase/migrations/0001_foundation.sql`: enum, 5 bảng, hàm, trigger, RLS, seed `policy_documents`. Apply. `supabase gen types` → `database.types.ts`. Tạo thủ công 3 user test (mỗi role) qua Auth dashboard. | — | Query bằng anon key: không SELECT được `leads`. Trigger tạo `profiles` khi thêm user. |
| 2 | Edge Functions `submit-lead`, `log-error`, `admin-users` + `_shared/rules.ts`. Set secrets (`SERVICE_ROLE_KEY`). Deploy. | 1 | `curl` `submit-lead` với SĐT sai → `{ok:false}`; hợp lệ → có bản ghi `leads`. |
| 3 | `src/shared/lib/supabase.ts` (di chuyển + cập nhật import cũ ở `Hero.tsx`), `permissions.ts`, `database.types.ts`. Viết lại `AuthContext.tsx` + `useIdleTimeout.ts`. | 1 | Đăng nhập bằng user thật ở console; sai mật khẩu ném lỗi generic. |
| 4 | Lớp token `DESIGN.md`: `tailwind.config.js` (Montserrat, bỏ azure/teal/amber-brand, giữ status), `index.html` font, `src/index.css` base layer (heading Montserrat 600 `#000`, `:focus-visible` 2px indigo, bỏ shadow tím), admin `--color-primary` → `#2C3481`. Gỡ xung đột `!important` font ở `index.css:55`. | — | `npm run build` xanh; trang chạy, không lỗi console; đối chiếu `detect.mjs`. |
| 5 | `src/shared/forms/*` + `fields/*` + `<LeadForm>` + `<LeadFormSuccess>`. | 2, 4 | Unit test validators + `useFormState` timeout. |
| 6 | Viết lại `ProtectedRoute.tsx`; `App.tsx` bọc `ErrorBoundary` + route `allowedRoles`; `LoginPage.tsx` (signIn thật, lỗi generic, bỏ hộp demo creds, redirect theo vai trò, đã đăng nhập mở `/login` → đẩy về home vai trò); `Sidebar`/admin `App.tsx` lọc nav theo role + `<ForbiddenView>`; `admin/components/layout/Header.tsx` badge role thật + bỏ chip "Đã đồng bộ Google Sheets" giả (hoãn sang Nhóm 4) . | 3 | E2E 3 vai trò (xem §5). |
| 7 | `admin/pages/AccountsPage.tsx` (list + tạo + đổi role + toggle active) gọi `admin-users`; thêm mục nav "Quản lý tài khoản" (super_admin). | 6 | Tạo user mới đăng nhập được; không khoá được Super Admin cuối. |
| 8 | `usePolicyDocument.ts`, `PolicyModal.tsx`, `PrivacyPolicyPage.tsx` + route `/chinh-sach-bao-mat`; nối link từ `<ConsentCheckbox>` và (tạm) Footer. | 4, 5 | Mở modal từ form; `consent_version` lưu đúng trong `leads`. |
| 9 | `NotFoundPage.tsx`, `ErrorPage.tsx`, catch-all route trong `UserApp.tsx`; `public/404.html`, `public/500.html`, `public/.htaccess`. | 4 | `/duong-dan-sai` → 404 tuỳ biến; ném lỗi giả trong 1 component → `ErrorBoundary` bắt. |
| 10 | `react-helmet-async` + `<HelmetProvider>` ở `main.tsx`; `Seo.tsx`, `src/shared/config/seo.ts`; gắn `<Seo>` vào `LandingPage`, `LoginPage`, `PrivacyPolicyPage`, `NotFoundPage`. Dọn `index.html`. `public/robots.txt`, `sitemap.xml`, `og-default.png`. | 4 | View-source / Playwright: có `<title>`, `og:*`, `description` đúng theo route. |
| 11 | Thay logic form hỏng trong `src/features/user/sections/Hero.tsx` bằng `<LeadForm source="landing_hero">` (drop-in, **không** đổi layout — layout để Nhóm 2). Xoá `alert()`, xoá nhánh "luôn báo thành công". | 5, 8 | Submit trên trang thật → bản ghi `leads` có `source='landing_hero'`. |
| 12 | Dọn: xoá `src-admin-temp/`, `src-admin-temp/src/`; xoá tàn dư mock-auth; xoá hộp "Demo Credentials"; cập nhật `MIGRATION_GUIDE.md`/`SETUP_STATUS.md` phần auth. | 6 | `npm run build` + `npm run typecheck` xanh; `git grep -i "mock"` sạch phần auth. |

---

## 4. File sẽ tạo / sửa

### Tạo mới
```
supabase/config.toml
supabase/migrations/0001_foundation.sql
supabase/functions/_shared/rules.ts            (hoặc symlink logic tới src/shared/forms/rules.ts)
supabase/functions/submit-lead/index.ts
supabase/functions/log-error/index.ts
supabase/functions/admin-users/index.ts
src/shared/lib/supabase.ts
src/shared/lib/database.types.ts
src/shared/lib/permissions.ts
src/shared/config/seo.ts
src/shared/hooks/useIdleTimeout.ts
src/shared/hooks/usePolicyDocument.ts
src/shared/components/ErrorBoundary.tsx
src/shared/components/ForbiddenView.tsx
src/shared/components/Seo.tsx
src/shared/components/PolicyModal.tsx
src/shared/forms/rules.ts
src/shared/forms/validators.ts
src/shared/forms/useFormState.ts
src/shared/forms/fields/TextField.tsx
src/shared/forms/fields/SelectField.tsx
src/shared/forms/fields/TextAreaField.tsx
src/shared/forms/fields/ConsentCheckbox.tsx
src/shared/LeadForm/LeadForm.tsx
src/shared/LeadForm/LeadFormSuccess.tsx
src/features/user/pages/PrivacyPolicyPage.tsx
src/features/user/pages/NotFoundPage.tsx
src/features/user/pages/ErrorPage.tsx
src/features/admin/config/nav.ts
src/features/admin/pages/AccountsPage.tsx
src/features/admin/services/accounts.ts
public/robots.txt
public/sitemap.xml
public/og-default.png
public/404.html
public/500.html
public/.htaccess
tests/unit/validators.test.ts
tests/unit/useFormState.test.ts
tests/unit/permissions.test.ts
tests/e2e/*.spec.ts            (Playwright)
```

### Sửa
```
.env / .env.example        # tách .env.example (không secret); xác nhận project ref đúng
package.json               # + react-helmet-async, react-markdown (+ remark-gfm), + devDeps test
index.html                 # font Montserrat, meta/OG thật, bỏ bolt.new
src/main.tsx               # bọc <HelmetProvider>
src/App.tsx                # <ErrorBoundary>, ProtectedRoute allowedRoles, route mới
src/index.css              # base layer DESIGN.md, gỡ !important font, --color-primary
tailwind.config.js         # palette 2 màu + Montserrat
src/shared/contexts/AuthContext.tsx      # viết lại hoàn toàn
src/shared/components/ProtectedRoute.tsx # viết lại
src/features/user/UserApp.tsx            # route /chinh-sach-bao-mat + catch-all 404
src/features/user/pages/LoginPage.tsx    # signIn thật, lỗi generic, bỏ demo box, redirect theo role
src/features/user/lib/supabase.ts        # re-export từ @shared/lib/supabase (hoặc xoá + sửa import)
src/features/user/sections/Hero.tsx      # dùng <LeadForm> (chỉ logic, giữ layout)
src/features/user/components/Footer.tsx  # link Chính sách trỏ /chinh-sach-bao-mat (tạm)
src/features/admin/AdminApp.tsx          # ProtectedRoute allowedRoles ở tầng App.tsx
src/features/admin/App.tsx               # activeId mặc định theo role, gate section, <ForbiddenView>
src/features/admin/components/layout/Sidebar.tsx  # lọc NAV theo profile.role
src/features/admin/components/layout/Header.tsx   # badge role thật, bỏ chip sync giả
src/features/admin/data/mockDashboard.ts # tách NAV_ITEMS ra config/nav.ts + field roles
MIGRATION_GUIDE.md / SETUP_STATUS.md     # cập nhật mục Authentication
```

### Xoá
```
src-admin-temp/            (toàn bộ)
src-admin-temp/src/        (toàn bộ)
```

---

## 5. Test plan

### 5.1 Unit (Vitest — thêm devDep)
| File | Ca kiểm |
|------|---------|
| `validators.test.ts` | SĐT `0912345678` hợp lệ; `0212345678`/`12345`/`"098 765 4321"` (chuẩn hoá rồi pass); email sai; `full_name` rỗng/>120; consent=false |
| `useFormState.test.ts` | double-submit chỉ chạy 1 lần; submit treo >15s → `error`, không kẹt `loading`; reset về `idle` |
| `permissions.test.ts` | `ROLE_HOME` đúng; `canAccessSection('marketing','leads')===false`, `('cskh','content')===false`, `('super_admin', *)===true` |

### 5.2 RLS / SQL (chạy trong SQL Editor với `set role`)
- anon: `select * from leads` → 0 rows / lỗi; `insert into leads` trực tiếp → bị chặn (chỉ Edge Function service role vào được).
- authenticated role `marketing`: `select from leads` → chặn.
- authenticated role `cskh`: `select`/`update status` → OK; `select from profiles` (người khác) → chặn.
- `update profiles set is_active=false` với Super Admin cuối cùng → trigger raise exception.
- Đổi `role` user đang đăng nhập → phiên hiện tại giữ quyền cũ tới lần refresh token/đăng nhập kế tiếp (ghi nhận là hành vi chấp nhận — khớp AC 14.2 edge).

### 5.3 Edge Function (curl / Deno test)
- `submit-lead`: thiếu `full_name` → `{ok:false, errors.full_name}`; SĐT `abcxyz` → `errors.phone`; `consent:false` → `errors.consent`; hợp lệ → `{ok:true}` + xuất hiện trong `leads` với `consent_version`, `consent_at`, `source`.
- Trùng `phone_normalized` trong 14 ngày → không tạo bản ghi thứ 2.
- `admin-users` gọi bằng JWT role `cskh` → 403; bằng `super_admin` → tạo được user.
- `log-error` payload > 8KB → bị cắt/từ chối, không đổ vỡ.

### 5.4 E2E (Playwright — skill `browser-automation` / `playwright-skill`)
| Mã | Kịch bản | Kỳ vọng | AC |
|----|----------|---------|----|
| E-01 | Đăng nhập `super_admin` đúng mật khẩu | Vào `/admin`, thấy đủ menu | 14.1 |
| E-02 | Đăng nhập `marketing` | Vào `/admin`, chỉ thấy "Content Landing" (+ mục super_admin bị ẩn); mở section Leads → 403 | 14.2 |
| E-03 | Đăng nhập `cskh` | Chỉ thấy "Quản lý Leads"; mở "Quản lý tài khoản" → 403 | 14.2 |
| E-04 | Sai mật khẩu | Thông báo generic "Email hoặc mật khẩu không đúng", không lộ email tồn tại | 14.1 |
| E-05 | Chưa đăng nhập mở `/admin` | Redirect `/login`, sau đăng nhập quay lại đúng trang | 14.1 edge |
| E-06 | Tài khoản bị `is_active=false` đang mở phiên | Bị đăng xuất + thông báo | 14.2 |
| E-07 | Idle 30 phút (giả lập timer) | Cảnh báo trước 2', hết giờ → về `/login` | 14.1 |
| E-08 | `<LeadForm>` bỏ trống bắt buộc | Chặn gửi, lỗi inline từng field | 17.4 / 2.2 |
| E-09 | SĐT `abc`, email `x@y` | Lỗi định dạng khi blur/submit | 2.2 |
| E-10 | Không tick consent | Chặn gửi + yêu cầu đồng ý | 2.2 |
| E-11 | Dữ liệu hợp lệ → gửi | Nút loading, sau đó Thank-you; bản ghi `leads` thật (source đúng) | 17.4 / 2.2 |
| E-12 | Double-click nút gửi | Chỉ 1 bản ghi | 2.2 edge |
| E-13 | Ngắt mạng khi submit (route abort) | Trạng thái `error` + thử lại, không treo loading, giữ dữ liệu | 17.4 edge |
| E-14 | Mở link Chính sách từ consent + từ Footer | `<PolicyModal>` / trang mở, đóng bằng Esc, khoá scroll nền | 17.1 |
| E-15 | Truy cập `/duong-dan-khong-ton-tai` | Trang 404 tuỳ biến + nút về trang chủ | 17.2 |
| E-16 | Ném lỗi runtime (build dev có nút test) | `ErrorBoundary` hiện trang 500 tuỳ biến, có bản ghi `error_log` | 17.2 |
| E-17 | Kiểm meta mỗi route | `<title>`, `meta description`, `og:image` đúng theo route; `robots.txt` & `sitemap.xml` truy cập được | 17.3 |
| E-18 | Đối chiếu `DESIGN.md` các bề mặt Nhóm 1 (login, LeadForm, 404, modal) | Montserrat, đúng 2 màu, focus ring 2px indigo, không shadow tím | ràng buộc |

### 5.5 Build / tĩnh
- `npm run typecheck` + `npm run build` + `npm run lint` xanh.
- `node .impeccable/.../detect.mjs` (impeccable) không phát sinh P0/P1 mới trên các bề mặt Nhóm 1.

---

## 6. Dependency mới — ✅ đã duyệt (2026-09-08)
Cài **bản stable mới nhất tại thời điểm cài đặt** (không pin version cũ):

| Package | Vì sao |
|---------|--------|
| `react-helmet-async` | Quản lý `<title>`/meta/OG theo route trong SPA, không hard-code (17.3) |
| `react-markdown` + `remark-gfm` | Render nội dung Chính sách (`body_md`) do team/CMS soạn (17.1) |
| `vitest` + `@testing-library/react` (dev) | Unit test §5.1 |
| `@playwright/test` (dev) | E2E §5.4 (nếu chưa có trong skill) |

---

## 7. Quyết định đã chốt với khách (2026-09-08)
1. **Dependency**: duyệt cài cả 4 package ở §6, bản stable mới nhất.
2. **Email**: chỉ cần định dạng hợp lệ (RFC 5322 rút gọn), **không** ép `@gmail.com`.
3. **Brute-force**: dùng **giới hạn mặc định của Supabase Auth** giai đoạn này; **không** viết khoá
   tạm thời tuỳ biến (tiết kiệm thời gian triển khai).
4. **Chính sách bảo vệ dữ liệu cá nhân (17.1)**: seed `policy_documents` bằng **văn bản mẫu tiếng
   Việt dạng chính sách bảo mật chuẩn** (đánh dấu rõ trong nội dung/README là "NỘI DUNG TẠM —
   CHƯA PHẢI BẢN CHÍNH THỨC"). Khách cập nhật bản chữ chính thức sau, **qua CMS** — bổ sung ở
   Nhóm 4: `ContentPage` cần thêm 1 tab "Chính sách" ghi vào `policy_documents` (tạo version mới,
   giữ lịch sử) thay vì chỉ qua `site_content`. *(Việc nhỏ bổ sung cho `plan/04-mini-admin-plan.md`.)*
5. **Nội dung checkbox consent**: giữ nguyên văn Module 2.2, không đổi.
6. **Session timeout**: chốt **30 phút idle** tự động đăng xuất.
7. **Host production + HTTPS**: chưa chọn — giữ nguyên phạm vi Nhóm 1 chỉ để **mẫu** `.htaccess`
   (ép HTTPS/ErrorDocument); cấu hình host thật do khách tự xử lý khi chọn nhà cung cấp.
