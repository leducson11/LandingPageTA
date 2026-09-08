# Coding Plan — Nhóm 2: Khung Landing + Điều hướng + Chuyển đổi + Liên hệ

> Nguồn yêu cầu: `requirements/01-header-navigation-module.docx`, `02-hero-section-module.docx`,
> `03-trust-bar-module.docx`, `12-cta-band-form-module.docx`, `13-ban-do-footer-module.docx`.
> Phụ thuộc: **Nhóm 1** phải xong (component `<LeadForm>`, `AuthContext`, token `DESIGN.md`,
> Edge Function `submit-lead`, trang `/chinh-sach-bao-mat`). Bối cảnh lỗi: `BACAO_KIEM_THU.md`
> mục 1.A, 1.B.1–1.B.2, 2.3, 3.
> Trạng thái: **chưa code**.

---

## 1. Mục tiêu Nhóm 2

Dựng bộ khung trang + "hợp đồng" id section + đường chuyển đổi chính, sửa dứt điểm lớp lỗi
điều hướng/anchor trong `BACAO_KIEM_THU.md`.

| # | Hạng mục | Từ requirement |
|---|----------|----------------|
| A | **Hợp đồng section-id** dùng chung (1 nguồn) cho: component section, menu Header, scroll-spy, smooth-scroll | 1.2 |
| B | Header sticky + logo + menu anchor cuộn mượt có offset + trạng thái active tự cập nhật + hamburger mobile | 1.1, 1.2 |
| C | Lớp **nội dung động** (`site_content`) — phía đọc của CMS (Module 16); section không hard-code, tự ẩn/fallback khi trống | 2.1, 3.1, 13.x |
| D | Hero: thông điệp above-the-fold từ CMS + form Lead đầy đủ field qua `<LeadForm>` + Thank-you + consent | 2.1, 2.2 |
| E | Trust Bar: 4 số liệu từ CMS, có chú thích nguồn, định dạng nghìn, count-up tôn trọng reduced-motion | 3.1 |
| F | CTA/Form lặp lại 3 vị trí, tái dùng `<LeadForm>` (không bản rút gọn), đổ về cùng nguồn Lead, chống trùng | 12.1 |
| G | Footer: liên hệ đa kênh (ẩn kênh thiếu) + link Chính sách + link chương trình đúng section | 13.2, 13.3 |
| H | Bản đồ Google Maps nhúng + fallback text khi chặn/lỗi | 13.1 |
| I | Dọn artifact mockup: "9:41"/Signal/Battery ở TopBar, header indigo trùng trong Hero mobile, form chết ở `Stats.tsx`, hover gradient tím ở FloatingCTA | BACAO 1.A.1, 1.B.1–2, 3.2 |

**Ngoài phạm vi Nhóm 2:** các section nội dung 4–11 (Nhóm 3), UI CMS sửa nội dung (Nhóm 4),
đồng bộ Google Sheets (Nhóm 4). Section "Công nghệ ứng dụng" trong menu SRS → xem §7 điểm 1.

---

## 2. Kiến trúc

### 2.1 Schema DB — lớp nội dung động

`supabase/migrations/0002_site_content.sql`

| Bảng | Cột | Ghi chú |
|------|-----|---------|
| `public.site_content` | `block text PRIMARY KEY`, `data jsonb NOT NULL`, `is_published bool NOT NULL DEFAULT true`, `updated_at timestamptz`, `updated_by uuid → profiles` | 1 hàng / khối nội dung landing. Trigger `set_updated_at` (đã có ở Nhóm 1). |

**RLS**
- anon: `SELECT` khi `is_published`
- authenticated: `ALL` khi `current_app_role() IN ('super_admin','marketing')` *(UI sửa ở Nhóm 4; Nhóm 2 chỉ seed)*

**Seed các block (Nhóm 2 quản)** — hình dạng `data`:
```
hero        { headline, subheadline, proof_line, benefits: [string] }
trust_bar   { items: [{ value, label, note, verified: bool }] }
            // verified: CỜ NỘI BỘ CHO ADMIN (2026-09-08) — KHÔNG ảnh hưởng hiển thị.
            // Landing luôn hiện value nếu có (không hiện "Đang cập nhật"); verified=false
            // chỉ đánh dấu cho Marketing biết số này cần xác minh khi vào CMS sửa (Nhóm 4).
footer      { description, programs: [{label, sectionId}],
              contact: { hotline, zalo, facebook, tiktok, email, address },  // field rỗng → ẩn
              copyright_name }
map         { embed_url, address, maps_link }               // seed placeholder: xem §7.2
seo         { title, description, og_image }                       // <Seo> route "/"
```
> Các block Hero/TrustBar/Footer/Map/SEO là **tập con** danh sách block Module 16 sẽ quản
> (Hero, Trust Bar, Pain Points, Lộ trình, GV, Testimonials, FAQ, Cam kết, Social links,
> Hotline/Email). Nhóm 3 seed thêm block của mình theo **cùng convention**.

Không có Edge Function / endpoint mới. Đọc qua PostgREST: `supabase.from('site_content').select()`.
Ghi Lead: tái dùng Edge Function `submit-lead` (Nhóm 1).

### 2.2 Hợp đồng section-id (nền của toàn bộ điều hướng)

`src/features/user/config/sections.ts` — **nguồn chân lý duy nhất**:
```ts
export const SECTIONS = [
  { id: 'top',           nav: null },
  { id: 've-huyway',     nav: 'Về chúng tôi' },
  { id: 'cong-nghe',     nav: 'Công nghệ ứng dụng', enabledFrom: 'group3' }, // xem §7.1
  { id: 'lo-trinh-hoc',  nav: 'Lộ trình học' },        // = section Courses (Module 7)
  { id: 'giang-vien',    nav: 'Đội ngũ giáo viên' },
  { id: 'hoc-vien',      nav: 'Cảm nhận học viên', hideWhenEmpty: true }, // Testimonials
  { id: 'dang-ky',       nav: null },                  // neo tới form Hero
] as const;
export type SectionId = typeof SECTIONS[number]['id'];
```
- Mọi component section lấy `id` từ đây (không tự đặt chuỗi).
- Menu Header `map()` từ `SECTIONS.filter(s => s.nav && !hiddenNow(s))`.
- `useScrollSpy` quan sát đúng danh sách id này.
- Quy tắc: id là slug ASCII cố định; đổi 1 lần trong file này, cả trang theo. **Xoá sạch**
  chuỗi rời rạc `#l-tr-n-hoc`, `#i-ng-gi-o-vi-n`, `#c-m-nh-n-hoc-vi-n`, `#v-ch-ng-t-i` (BACAO 2.3).

### 2.3 Component & hook

```
src/features/user/
├── config/
│   ├── sections.ts             # hợp đồng id + nhãn menu
│   └── contentDefaults.ts      # fallback tĩnh cho từng block site_content
├── hooks/
│   ├── useSiteContent.ts       # fetch site_content 1 lần, cache, trả accessor typed + fallback
│   ├── useScrollSpy.ts         # IntersectionObserver → id đang hiển thị
│   └── useSmoothScroll.ts      # SỬA: tôn trọng prefers-reduced-motion, offset theo header thật
├── components/
│   ├── TopBar.tsx              # VIẾT LẠI: bỏ "9:41"/Signal/Battery; nền indigo (DESIGN.md, contrast)
│   ├── Header.tsx              # VIẾT LẠI: nav từ contract + scroll-spy + hamburger + DESIGN.md
│   ├── Footer.tsx              # VIẾT LẠI: liên hệ từ CMS, ẩn kênh thiếu, link đúng section
│   ├── MapEmbed.tsx            # MỚI: iframe lazy + fallback text
│   ├── CtaBand.tsx             # MỚI: dải CTA bọc <LeadForm> (Module 12)
│   ├── FloatingCTA.tsx         # SỬA: bỏ hover gradient tím; back-to-top theo DESIGN.md
│   └── SectionAnchor.tsx       # MỚI (nhỏ): <section id> + scroll-margin-top chuẩn
└── sections/
    ├── Hero.tsx                # VIẾT LẠI: layout DESIGN.md + <LeadForm source="landing_hero">
    └── TrustBar.tsx            # MỚI (thay Stats.tsx): chỉ Trust Bar
```

**`useSiteContent()`** — 1 request `select('block,data,is_published')`; cache module-level +
context. Trả `content(block)` merge sâu với `contentDefaults[block]` → section luôn có dữ liệu để
render; nếu block `is_published=false` hoặc field rỗng → dùng default hoặc ẩn (Module 3 edge,
Module 16 edge). Trạng thái loading: skeleton nhẹ (không để `opacity:0` kẹt như BACAO 1.A.4).

**`useScrollSpy(ids)`** — IntersectionObserver (`rootMargin` bù chiều cao TopBar+Header,
`threshold` ~0.3), trả `activeId`; Header dùng để tô đậm mục nav (indigo `#2C3481`).

**`useSmoothScroll` (sửa)** — giữ delegated click; thêm: nếu `matchMedia('(prefers-reduced-motion: reduce)')`
→ `scrollIntoView`/jump tức thời thay vì animate 900ms; offset lấy `TopBar+Header` thật (hiện chỉ
lấy `header`). Target không tồn tại → cảnh báo `console.warn` ở dev (không im lặng như hiện tại).

**`<LeadForm>` (từ Nhóm 1) — điểm dùng ở Nhóm 2:**
| Vị trí | `source` | variant |
|--------|----------|---------|
| Hero (card bên phải desktop / dưới tiêu đề mobile) | `landing_hero` | `card` |
| CtaBand sau Hero/CenterCard | `cta_after_hero` | `inline` |
| CtaBand sau Steps (Module 6 — Nhóm 3 chèn, Nhóm 2 tạo component + chỗ neo) | `cta_after_steps` | `inline` |
| CtaBand sau Instructor (Module 8) | `cta_after_instructor` | `inline` |
- Đủ field như Module 2.2 ở **mọi** vị trí (không rút gọn, không thiếu consent).
- Chống trùng SĐT/email: xử lý server-side trong `submit-lead` (Nhóm 1) — Nhóm 2 chỉ truyền `source`.
- Trên mobile, nơi không đủ chỗ nhúng form → `CtaBand` render nút "Kiểm tra trình độ miễn phí"
  cuộn tới `#dang-ky` (form Hero).

### 2.4 SEO / responsive

- `<Seo>` (Nhóm 1) trên `LandingPage` đọc block `seo` của `site_content` (fallback `seoDefaults`).
- Trust Bar: desktop ≤4 cột → mobile 2×2 (grid), số lớn `Intl.NumberFormat('vi-VN')`.
- Header/Hero: gộp về **một** cây markup responsive nếu khả thi; nơi buộc tách desktop/mobile thì
  cùng lấy chung `SECTIONS` + `useSiteContent` (không lệch nội dung như BACAO TC-R01).

---

## 3. Trình tự triển khai (theo dependency)

| B | Việc | Phụ thuộc | Đầu ra kiểm chứng |
|---|------|-----------|-------------------|
| 1 | `0002_site_content.sql` + seed 5 block + RLS. Apply. `supabase gen types` cập nhật `database.types.ts`. | Nhóm 1 B1 | `GET site_content` bằng anon → 5 block; sửa bằng anon → chặn. |
| 2 | `config/sections.ts`, `config/contentDefaults.ts`, `hooks/useSiteContent.ts`. | 1 | Unit test accessor + fallback. |
| 3 | `hooks/useScrollSpy.ts`; sửa `hooks/useSmoothScroll.ts` (reduced-motion, offset kép, warn). `components/SectionAnchor.tsx`. | 2 | Bấm link contract cuộn đúng; reduced-motion → không animate. |
| 4 | Refactor **mọi** section hiện có để lấy `id` từ `SECTIONS` (đổi `ve-huyway`, `cac-khoa-hoc`→`lo-trinh-hoc`, `gap-gop-giang-vien`→`giang-vien`, `hoc-vien`, thêm `dang-ky`). Xoá id/anchor rời rạc. | 3 | `grep` không còn `#l-tr-n-hoc` v.v. |
| 5 | `TopBar.tsx` viết lại (bỏ artifact "9:41"/Signal/Battery; nền indigo; hotline từ CMS). | 2 | Mobile không còn thanh giả đồng hồ. |
| 6 | `Header.tsx` viết lại: nav từ contract + `useScrollSpy` active + hamburger + logo→top + nút "Đăng ký tư vấn"→`#dang-ky`; bỏ `mobileExpanded` chết. | 3, 5 | Mọi mục menu cuộn đúng; active đổi theo cuộn. |
| 7 | `Hero.tsx` viết lại: layout DESIGN.md (1 cây responsive), tiêu đề/phụ đề/benefits từ `useSiteContent('hero')`, nhúng `<LeadForm source="landing_hero">` trong wrapper `id="dang-ky"`; **xoá** thanh header indigo trùng ở nhánh mobile. | 2, Nhóm 1 (`<LeadForm>`) | Mobile chỉ 1 Header; submit tạo lead `source='landing_hero'`. |
| 8 | `TrustBar.tsx` (thay `Stats.tsx`): 4 số liệu từ `useSiteContent('trust_bar')` + chú thích nguồn + `Intl.NumberFormat` + count-up honor reduced-motion. Luôn hiển thị mọi item có `value` (`verified` chỉ là cờ nội bộ, **không** ẩn/đổi UI — xem §7.4). Cập nhật `LandingPage.tsx` import. **Xoá form chết** trong `Stats.tsx`. | 2 | Không còn form mobile "chết"; số có dấu phân cách. |
| 9 | `CtaBand.tsx` + chèn 3 vị trí trong `LandingPage.tsx` (sau CenterCard, sau Steps, sau Instructor) với `source` tương ứng. | 7 | 3 form/nút CTA submit ra 3 `source` khác nhau. |
| 10 | `Footer.tsx` viết lại: `useSiteContent('footer')`, ẩn kênh rỗng, link chương trình → `sectionId`, link "Chính sách bảo vệ dữ liệu cá nhân" → `/chinh-sach-bao-mat`, năm copyright động. | 2, 4, Nhóm 1 (route policy) | Không link chết; thiếu Tiktok → ẩn icon. |
| 11 | `MapEmbed.tsx` trong Footer: iframe lazy (`loading="lazy"`) từ `map.embed_url`; `onError`/timeout → fallback địa chỉ text + link "Xem trên Google Maps". | 2 | Chặn iframe (offline) → hiện fallback, không khung trắng. |
| 12 | `FloatingCTA.tsx`: bỏ `onMouseEnter/Leave` set `style.background` gradient tím; nút tròn back-to-top theo DESIGN.md; ẩn khi `scrollY<=400`. | — | Không còn màu tím; keyboard focus rõ. |
| 13 | `<Seo>` cho `/` đọc block `seo`. Dọn: gỡ `MentorTeam` chết khỏi import nếu còn (thuộc Nhóm 3B nhưng an toàn để gỡ import), cập nhật `BACAO`-liên quan. | 2, Nhóm 1 (`<Seo>`) | View-source `/` có title/description/og từ CMS. |
| 14 | QA pass: Playwright (skill) toàn bộ §5.4 + `detect.mjs` đối chiếu `DESIGN.md`. | tất cả | Không P0/P1 điều hướng còn lại. |

---

## 4. File sẽ tạo / sửa

### Tạo mới
```
supabase/migrations/0002_site_content.sql
src/features/user/config/sections.ts
src/features/user/config/contentDefaults.ts
src/features/user/hooks/useSiteContent.ts
src/features/user/hooks/useScrollSpy.ts
src/features/user/components/SectionAnchor.tsx
src/features/user/components/MapEmbed.tsx
src/features/user/components/CtaBand.tsx
src/features/user/sections/TrustBar.tsx
tests/unit/useSiteContent.test.ts
tests/unit/sections-contract.test.ts
tests/e2e/nav.spec.ts
tests/e2e/lead-capture.spec.ts
tests/e2e/footer-map.spec.ts
```

### Sửa
```
src/features/user/hooks/useSmoothScroll.ts       # reduced-motion, offset TopBar+Header, warn khi thiếu target
src/features/user/hooks/useScrollAnimation.ts    # bỏ rủi ro kẹt opacity:0 (fallback hiện nội dung nếu Observer không chạy)
src/features/user/components/TopBar.tsx           # viết lại
src/features/user/components/Header.tsx           # viết lại
src/features/user/components/Footer.tsx           # viết lại
src/features/user/components/FloatingCTA.tsx      # bỏ hover gradient tím
src/features/user/sections/Hero.tsx               # viết lại + <LeadForm> + bỏ header mobile trùng
src/features/user/pages/LandingPage.tsx           # TrustBar thay Stats, chèn 3 CtaBand, <Seo>
src/features/user/sections/CenterCardCarousel.tsx # id từ contract (ve-huyway)
src/features/user/sections/Courses.tsx            # id 'lo-trinh-hoc'
src/features/user/sections/Instructor.tsx         # id 'giang-vien'
src/features/user/sections/Testimonials.tsx       # id 'hoc-vien' + tín hiệu "empty" cho nav
src/shared/config/seo.ts                          # + seoDefaults cho '/'
database.types.ts                                 # regen sau 0002
```

### Xoá / thay thế
```
src/features/user/sections/Stats.tsx    # thay bằng TrustBar.tsx (form mobile chết bị loại bỏ)
```

---

## 5. Test plan

### 5.1 Unit (Vitest)
| File | Ca kiểm |
|------|---------|
| `sections-contract.test.ts` | mọi `SectionId` là unique; mọi `nav` label khớp SRS Module 1; `hideWhenEmpty` chỉ ở `hoc-vien` |
| `useSiteContent.test.ts` | block thiếu field → merge `contentDefaults`; `is_published=false` → coi như trống; `trust_bar.items` giữ **nguyên** cả item `verified:false` (không lọc); số `12000` → `"12.000"` (vi-VN) |

### 5.2 SQL / RLS
- anon `SELECT site_content` → 5 block; anon `UPDATE` → chặn.
- role `marketing` `UPDATE site_content` → OK; role `cskh` → chặn.

### 5.3 E2E (Playwright — skill `browser-automation` / `playwright-skill`)
| Mã | Kịch bản | Kỳ vọng | AC |
|----|----------|---------|----|
| N-01 | Bấm lần lượt từng mục menu desktop | Cuộn tới đúng section, không bị Header che (offset đúng) | 1.2 |
| N-02 | Cuộn tay toàn trang | Mục nav active đổi theo section đang xem (scroll-spy) | 1.2 |
| N-03 | Menu khi Testimonials chưa có data | Mục "Cảm nhận học viên" **không** hiện trong menu | 1.2 edge |
| N-04 | Bấm logo | Cuộn mượt về `#top` | 1.1 |
| N-05 | Nút "Đăng ký tư vấn" (header) | Cuộn tới form Hero (`#dang-ky`) | 1.2 |
| N-06 | Mobile: mở hamburger, bấm 1 mục | Menu đóng + cuộn đúng section | 1.1 edge |
| N-07 | `prefers-reduced-motion` bật | Không animate 900ms, nhảy tức thời; count-up tắt | 1.x / 3.4 |
| N-08 | Header khi cuộn > 20px | Có shadow phân tách | 1.1 |
| N-09 | Mobile đầu trang | Chỉ **1** thanh Header (không còn "9:41", không còn header indigo Hero trùng) | BACAO R02 |
| H-01 | Hero: bỏ trống field bắt buộc → gửi | Chặn + lỗi inline từng field | 2.2 |
| H-02 | Hero: SĐT `abc` / email `x@y` | Lỗi định dạng | 2.2 |
| H-03 | Hero: chưa tick consent → gửi | Chặn + yêu cầu đồng ý; link Chính sách mở được | 2.2 / 17.1 |
| H-04 | Hero: dữ liệu hợp lệ → gửi | Loading → Thank-you; bản ghi `leads` `source='landing_hero'` | 2.2 |
| H-05 | Hero: double-click gửi | 1 bản ghi | 2.2 edge |
| H-06 | Headline CMS dài bất thường | Không vỡ layout (wrap/clamp); mobile không bị ảnh che | 2.1 edge |
| C-01 | Submit ở CtaBand "sau Quy trình 3 bước" | Lead `source='cta_after_steps'` | 12.1 |
| C-02 | Submit ở CtaBand "sau Đội ngũ GV" | Lead `source='cta_after_instructor'` | 12.1 |
| C-03 | Đã submit ở Hero rồi submit lại CtaBand cùng SĐT | Không tạo bản ghi rác (dedupe server) | 12.1 edge |
| C-04 | CtaBand trên mobile | Nút cuộn tới `#dang-ky`, không phải form thiếu field | 12.1 |
| T-01 | Trust Bar 4 số liệu | Đủ 4 nhóm + mỗi số có chú thích nguồn/thời điểm | 3.1 |
| T-02 | Item `verified:false` trong CMS | **Vẫn hiển thị** số bình thường trên UI (verified chỉ là cờ nội bộ Admin, không ẩn/không hiện "Đang cập nhật") | 3.1 edge — chốt 2026-09-08 |
| T-03 | Số `10000+` | Hiển thị `10.000+`, không vỡ layout mobile (2×2) | 3.1 edge |
| F-01 | Footer: bấm 3 link "Lộ Trình ..." | Cuộn tới section `lo-trinh-hoc` (không còn `#l-tr-n-hoc`) | 13.2 |
| F-02 | Footer: thiếu Tiktok trong CMS | Ẩn icon Tiktok, không link trống | 13.2 edge |
| F-03 | Footer: link "Chính sách bảo vệ dữ liệu cá nhân" | Mở `/chinh-sach-bao-mat` (Nhóm 1) | 13.3 |
| F-04 | Footer: hotline/email trên mobile | `tel:` / `mailto:` mở đúng app | 13.2 |
| M-01 | Bản đồ tải bình thường | iframe hiện marker đúng địa chỉ | 13.1 |
| M-02 | Chặn iframe (offline / CSP) | Fallback: địa chỉ text + link "Xem trên Google Maps" | 13.1 edge |
| S-01 | View-source `/` | `<title>`, `meta description`, `og:image` từ block `seo` | 17.3 |

### 5.4 Build / tĩnh
- `npm run typecheck` + `build` + `lint` xanh.
- `detect.mjs` (impeccable): TopBar/Header/Hero/TrustBar/Footer/FloatingCTA không P0/P1 mới;
  kiểm "Quy tắc 2 màu" + "Wayfinder" (chỉ 1 nút cam / viewport) + contrast TopBar (nền indigo).
- `git grep -nE "#l-tr-n-hoc|#i-ng-gi-o-vi-n|#c-m-nh-n-hoc-vi-n|#v-ch-ng-t-i|9:41"` → rỗng.

---

## 6. Dependency mới
Không có. Dùng lại: `@supabase/supabase-js`, `lucide-react`, `swiper` (đã có), `react-helmet-async`
(thêm ở Nhóm 1). Count-up: tự viết bằng `requestAnimationFrame` (không thêm lib).

---

## 7. Quyết định đã chốt với khách (2026-09-08)
1. **Mục menu "Công nghệ ứng dụng"**: đưa `cong-nghe` vào `SECTIONS` với `nav` **ẩn** khỏi
   Header/Footer cho tới khi Nhóm 3 dựng xong section tương ứng (giống cơ chế Testimonials) —
   đúng đề xuất ban đầu. *(Nhóm 3A/3B sẽ chốt section này = `CenterCardCarousel` viết lại, xem
   `plan/03a-section-tinh-plan.md` §7.1 và `plan/03b-section-tuong-tac.md` §7.6.)*
2. **Google Maps**: dùng **iframe nhúng không cần API key** (`https://www.google.com/maps?q=...&output=embed`)
   để tiết kiệm chi phí. Địa chỉ trung tâm: **placeholder "Hà Nội, Việt Nam"** cho tới khi khách
   cấp địa chỉ thật → seed `map.address = "Hà Nội, Việt Nam"`, `map.embed_url` trỏ tới embed của
   địa chỉ này.
3. **Thông tin liên hệ thật**: **giữ nguyên** giá trị placeholder hiện có trong `PRODUCT.md`
   (hotline `0963 073 488`, email `contact@huywayenglish.edu.vn`, địa chỉ, social `@huywayenglish`)
   để seed `site_content.footer` — không cần xác minh ở bước này, khách cập nhật sau qua CMS.
4. **Số liệu Trust Bar chưa kiểm chứng**: seed `verified:false` (cờ nội bộ, xem §2.1) nhưng
   **hiển thị số đẹp bình thường trên UI** — **không** hiện chữ "Đang cập nhật" (ảnh hưởng thẩm mỹ
   trang Landing). `verified` chỉ phục vụ Admin/CMS biết số nào cần xác minh khi có số liệu thật.
5. **Vị trí "sau Hero" của CtaBand**: chốt đặt **sau `CenterCardCarousel`** — đã áp dụng ở bước 9
   của §3 (không đổi).
6. **Gộp markup desktop/mobile**: giữ nguyên như đã lập kế hoạch — Nhóm 2 gộp Hero + Header +
   TrustBar + Footer; section 4–11 do Nhóm 3 xử lý.
