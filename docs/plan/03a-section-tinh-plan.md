# Coding Plan — Nhóm 3A: Section nội dung Landing (phần tĩnh)

> Nguồn yêu cầu: `requirements/04-gia-tri-khac-biet-module.docx`, `05-pain-points-module.docx`,
> `06-quy-trinh-3-buoc-module.docx`, `07-lo-trinh-khoa-hoc-module.docx`.
> Phụ thuộc: **Nhóm 1** (`<LeadForm>`, token `DESIGN.md`, `<Seo>`) + **Nhóm 2**
> (`site_content` + `useSiteContent` + `contentDefaults` + hợp đồng `config/sections.ts` +
> `<CtaBand>` + `SectionAnchor`). Bối cảnh lỗi: `BACAO_KIEM_THU.md` mục 1.B.4–1.B.6.
> Trạng thái: **chưa code**.

---

## 1. Mục tiêu Nhóm 3A

4 module có **cùng một khuôn**: render 1 khối nội dung từ `site_content`, 1 cây markup responsive,
tuân `DESIGN.md`, tự ẩn/fallback khi CMS trống. 3A **thiết lập khuôn dựng section** để 3B tái dùng.

| Module | Section | Nội dung |
|--------|---------|----------|
| 4 | `ValuesSection` (`id=gia-tri-khac-biet` — xem §7.1) | Sứ mệnh + Tầm nhìn + đúng 3 card giá trị cốt lõi (equal-height) |
| 5 | `PainPoints` (không id / `id=pain-points`) | Danh sách 3–6 pain point (title + mô tả), có thể sắp xếp qua CMS, tự ẩn khi rỗng |
| 6 | `ProcessSteps` (thay `Steps.tsx`) | Đúng 3 bước có số/icon; bước 1 nối form Lead; bước 3 = SLA 24h |
| 7 | `Roadmap` (`id=lo-trinh-hoc`, thay nội dung `Courses.tsx`) | 3 nhóm band Foundation/Intermediate/Advanced, mỗi nhóm có CTA về form |

**Ngoài phạm vi 3A:**
- Đồng bộ Google Sheets + chuyển CSKH (Module 6 AC) → **backend/vận hành, Nhóm 4 + SLA nội bộ**.
  3A chỉ làm phần hiển thị + nối bước 1 tới `<LeadForm>`/`#dang-ky`.
- UI sửa nội dung các block (Module 16) → Nhóm 4. 3A chỉ **seed** block theo đúng convention Nhóm 2.
- Carousel `CenterCardCarousel` (tương tác, ảnh ngoài) → **giữ nguyên, không sửa** trong 3A (đã
  chốt 2026-09-08, xem §7.1); rebuild thành section "Công nghệ ứng dụng" ở **Nhóm 3B**.
- Section 8–11 → Nhóm 3B.

---

## 2. Kiến trúc

### 2.1 Schema DB — chỉ thêm hàng `site_content`

`supabase/migrations/0003_landing_content_3a.sql` — **không bảng mới**, chỉ `INSERT ... ON CONFLICT`
4 block vào `public.site_content` (bảng + RLS đã có ở Nhóm 2).

Hình dạng `data` (bổ sung vào `contentDefaults.ts`):
```
values {
  mission: { title, body } | null,
  vision:  { title, body } | null,
  core_values: [ { icon, title, description } ]        // đúng 3; <3 → ẩn phần thiếu
}
pain_points {
  heading,
  items: [ { title, description } ],                   // 3–6, đúng thứ tự mảng
  lead_in: { text, cta_label }                         // dải "→ Hãy để chuyên gia..."
}
process_steps {
  heading, subheading,
  steps: [ { icon, title, description } ],             // đúng 3
  sla_note,                                            // "Nhận đánh giá & lộ trình trong 24 giờ" — REAL-TIME, không phải giờ hành chính (chốt 2026-09-08, §7.3)
  testimonial_snippet: { result, note } | null,        // "5.5 → 7.5 IELTS sau 3 tháng" — GIỮ LẠI dạng text tĩnh (chốt 2026-09-08, §7.5)
  cta_label
}
courses {
  heading,
  groups: [ { key, name, band_target, description, popular: bool, cta_label } ],  // 3
  footnote: { text, cta_label }                        // "Chưa biết trình độ? ..."
}
```
> **Dải band điểm chính thức (chốt 2026-09-08, §7.2):** Foundation **3.5–4.5** / Intermediate
> **5.0–6.0** / Advanced **6.5–7.5+** (theo `PRODUCT.md`, khớp code hiện tại) — dùng thống nhất ở
> `courses.groups[].band_target`, Trust Bar, Footer.
- `icon`: lưu **chuỗi khoá** (CMS không ship React) → map sang lucide qua `iconMap.ts`.
- Field/khối `null` hoặc mảng rỗng → section (hoặc phần trong section) tự ẩn (Module 4.1 edge,
  5.1 edge). `is_published=false` toàn block → section trả `null`.

**Không có Edge Function / API endpoint mới.** Đọc: `useSiteContent()` (Nhóm 2). CTA: `<LeadForm>`
(Nhóm 1) hoặc cuộn tới `#dang-ky` (Nhóm 2).

### 2.2 Khuôn dựng section dùng chung (đóng góp chính của 3A)

```
src/features/user/
├── lib/
│   └── iconMap.ts             # MỚI: { 'target': Target, 'clock': Clock, ... } — khoá CMS → lucide
├── components/
│   ├── SectionShell.tsx       # MỚI: <SectionAnchor> + heading + eyebrow + spacing DESIGN.md;
│   │                          #      render null nếu `hidden` (auto-hide khi content rỗng)
│   ├── CtaLink.tsx            # MỚI: link/nút inline "Kiểm tra trình độ miễn phí" → #dang-ky
│   │                          #      (khác <CtaBand> của Nhóm 2 — cái này nhẹ, trong thân section)
│   └── EqualHeightCards.tsx   # MỚI: grid `auto-rows-fr` + `h-full` để card đồng chiều cao
├── hooks/
│   └── useSectionContent.ts   # MỚI (mỏng): bọc useSiteContent → { data, isEmpty } cho 1 block
└── sections/
    ├── ValuesSection.tsx      # MỚI (Module 4)  — id 've-huyway'
    ├── PainPoints.tsx         # VIẾT LẠI (Module 5)
    ├── ProcessSteps.tsx       # MỚI, thay Steps.tsx (Module 6)
    └── Courses.tsx            # VIẾT LẠI nội dung (Module 7) — id 'lo-trinh-hoc'
```

**Quy ước khuôn** (mọi section 3A + 3B tuân theo):
1. Lấy dữ liệu: `const { data, isEmpty } = useSectionContent('<block>')`.
2. `if (isEmpty) return null;` — section biến mất hoàn toàn, không để vùng trắng.
3. Bọc bằng `<SectionShell id eyebrow heading>` — id lấy từ `config/sections.ts`, **không** hard-code chuỗi.
4. Text/số/icon từ `data` (+ `contentDefaults` merge sâu). Không mảng/chuỗi cứng trong JSX.
5. 1 cây markup responsive (Tailwind breakpoint), **không** tách 2 cây desktop/mobile như code cũ.
6. Token `DESIGN.md`: Montserrat 400/600, chỉ indigo `#2C3481` + cam `#F68C1F`, hairline card, bo 16–20px.
7. CTA trong section: `<CtaLink>` (không dùng `<div>` giả nút như `Steps.tsx`/`Courses.tsx` hiện tại — BACAO 1.B.5, 1.B.6).
8. "Wayfinder Rule": tối đa **1** phần tử cam / viewport.

### 2.3 Chi tiết từng section

**Module 4 — `ValuesSection` (`id=gia-tri-khac-biet` — MỚI, không trùng `ve-huyway`, xem §7.1)**
- 2 khối Sứ mệnh / Tầm nhìn: render cạnh nhau (desktop) / xếp dọc (mobile); khối `null` → ẩn khối đó, khối còn lại chiếm full width (4.1 edge).
- 3 card giá trị cốt lõi: `<EqualHeightCards>` — icon tile indigo + tiêu đề + mô tả; chiều cao đồng đều dù 1 card dài hơn (4.2 edge).
- Nội dung (Sứ mệnh/Tầm nhìn/3 giá trị) seed **nguyên văn placeholder trong `PRODUCT.md`** — Nhóm 4
  (Admin CMS) đổ nội dung thật qua Database sau (chốt 2026-09-08, §7.4).
- **Không** đụng tới `CenterCardCarousel.tsx` — section này là **thêm mới**, đặt cạnh carousel
  trên trang, **không thay thế** nó ở 3A (xem §7.1).

**Module 5 — `PainPoints`**
- List/card 3–6 item, mỗi item `{title, description}` (hiện code chỉ có title — thêm description).
- Thứ tự = thứ tự mảng `items` (Marketing sắp xếp qua CMS ở Nhóm 4).
- Dải dẫn dắt "→ Hãy để chuyên gia xây dựng lộ trình cho bạn" = `<CtaLink>` thật → `#dang-ky`.
- `items` rỗng → `return null` (5.1 edge). Cảnh báo dev nếu `items.length > 6`.
- **Xoá** state chết `openIndex` / `toggle` (BACAO 1.B.4).
- Nội dung pain points seed **nguyên văn placeholder `PRODUCT.md`** (chốt 2026-09-08, §7.4).

**Module 6 — `ProcessSteps` (thay `Steps.tsx`)**
- Đúng 3 bước, mỗi bước có số thứ tự + icon; connector giữa các bước theo `DESIGN.md`.
- Có heading section (desktop hiện **thiếu** heading — BACAO 1.B.5); heading/subheading nhất quán desktop+mobile.
- Bước 1 "Điền thông tin": `<CtaLink>` → `#dang-ky` (nối logic với Module 2.2/12.1).
- Bước 3: hiển thị `sla_note` — tính theo **giờ thực tế (real-time)**, không phải giờ hành chính
  (chốt 2026-09-08, §7.3); văn bản seed: *"Nhận đánh giá & lộ trình trong 24 giờ"*.
- **Xoá** `<div>` giả nút "Kiểm tra trình độ miễn phí" (BACAO 1.B.5) → thay `<CtaLink>` hoặc để `<CtaBand cta_after_steps>` (Nhóm 2) đảm nhận.
- **Giữ lại** thẻ testimonial "5.5 → 7.5 IELTS sau 3 tháng" ở dạng **text tĩnh mẫu** (chốt
  2026-09-08, §7.5 — đảo lại đề xuất gỡ ban đầu); đưa vào `process_steps` như 1 field tĩnh
  (`testimonial_snippet: { result, note }`), không CMS-hoá ở 3A.
- Phần "đồng bộ Google Sheets + chuyển CSKH" của AC 6 = **Nhóm 4** (không thuộc 3A).

**Module 7 — `Roadmap` (`Courses.tsx` viết lại nội dung, `id=lo-trinh-hoc`)**
- 3 nhóm band: name + `band_target` + mô tả ngắn + `<CtaLink>` "tư vấn/kiểm tra" mỗi nhóm.
- Nhóm `popular:true` → badge "Phổ biến nhất" + viền indigo 2px (giữ, chuẩn hoá theo `DESIGN.md`).
- `<EqualHeightCards>` cho 3 card.
- `footnote` "Chưa biết trình độ?..." = `<CtaLink>` thật (hiện chỉ là text — BACAO 1.B.6).
- **Band điểm đã chốt (2026-09-08, §7.2)**: Foundation 3.5–4.5 / Intermediate 5.0–6.0 / Advanced
  6.5–7.5+ — nhất quán với Module 3 (Trust Bar) + Footer + tài liệu marketing (AC 7 ràng buộc).
  Nguồn số = `courses.groups[].band_target` trong CMS.
- Đổi `id="cac-khoa-hoc"` → `lo-trinh-hoc` (hợp đồng Nhóm 2).

### 2.4 Ghép vào trang + điều hướng

- `LandingPage.tsx`: thứ tự render — `Hero` → `TrustBar` → `CenterCardCarousel` (giữ nguyên,
  `id=ve-huyway`, không sửa) → `ValuesSection` (`id=gia-tri-khac-biet`) → (`CtaBand cta_after_hero`)
  → `PainPoints` → `ProcessSteps` → (`CtaBand cta_after_steps`) → `Roadmap` → `Instructor`(3B) → … .
  Import `ProcessSteps` thay `Steps`.
- Mỗi section tự `return null` khi rỗng → Header nav (Nhóm 2, `useScrollSpy` + `hideWhenEmpty`) tự
  bỏ mục tương ứng. `config/sections.ts`: thêm `gia-tri-khac-biet` với `nav: null` (không có mục
  menu riêng theo SRS Module 1 — chỉ là anchor nội bộ); xác nhận `ve-huyway` **vẫn** trỏ tới
  `CenterCardCarousel` cho tới khi Nhóm 3B đổi id nó thành `cong-nghe`; `lo-trinh-hoc` luôn hiện.
- `<Seo>` không đổi (route `/` không đổi).

---

## 3. Trình tự triển khai (theo dependency)

| B | Việc | Phụ thuộc | Đầu ra kiểm chứng |
|---|------|-----------|-------------------|
| 1 | `0003_landing_content_3a.sql`: seed 4 block `values`/`pain_points`/`process_steps`/`courses`. Apply. Bổ sung `contentDefaults.ts` 4 shape. `supabase gen types`. | Nhóm 2 B1 | `GET site_content` bằng anon → có 4 block mới. |
| 2 | `lib/iconMap.ts`; `hooks/useSectionContent.ts`; `components/SectionShell.tsx`, `CtaLink.tsx`, `EqualHeightCards.tsx`. | 1, Nhóm 2 (`useSiteContent`, `SectionAnchor`) | Unit test `useSectionContent` (empty/merge). |
| 3 | `ValuesSection.tsx` (Module 4) — id `gia-tri-khac-biet`, seed nội dung placeholder `PRODUCT.md`. | 2 | Ẩn khối vision khi seed `vision:null`; 3 card đồng chiều cao. |
| 4 | Viết lại `PainPoints.tsx` (Module 5) — bỏ dead toggle, list từ CMS, `<CtaLink>`. | 2 | Seed `items:[]` → section biến mất. |
| 5 | `ProcessSteps.tsx` (Module 6), thay `Steps.tsx` trong `LandingPage.tsx`; xoá `Steps.tsx`; giữ `testimonial_snippet` tĩnh. | 2 | Bấm CTA bước 1 → cuộn tới `#dang-ky`; có heading desktop; thẻ "5.5→7.5" vẫn hiện. |
| 6 | Viết lại nội dung `Courses.tsx` (Module 7) — id `lo-trinh-hoc`, band **3.5–4.5/5.0–6.0/6.5–7.5+** từ CMS, `<CtaLink>` mỗi nhóm + footnote. | 2 | Band hiển thị khớp giá trị seed; footnote là link thật. |
| 7 | Cập nhật `LandingPage.tsx` thứ tự + import (chèn `ValuesSection` cạnh `CenterCardCarousel` — **không đổi** `CenterCardCarousel`); kiểm `config/sections.ts` khớp id mới. | 3–6 | Menu Header cuộn đúng tới `ve-huyway` (carousel) / `lo-trinh-hoc`; `gia-tri-khac-biet` cuộn được dù không có mục menu. |
| 8 | QA: Playwright §5.3 + `detect.mjs`; kiểm tra nhất quán band điểm giữa `courses` và `trust_bar`/Footer. | 3–7 | Không P0/P1 mới; band nhất quán. |

---

## 4. File sẽ tạo / sửa

### Tạo mới
```
supabase/migrations/0003_landing_content_3a.sql
src/features/user/lib/iconMap.ts
src/features/user/hooks/useSectionContent.ts
src/features/user/components/SectionShell.tsx
src/features/user/components/CtaLink.tsx
src/features/user/components/EqualHeightCards.tsx
src/features/user/sections/ValuesSection.tsx
src/features/user/sections/ProcessSteps.tsx
tests/unit/useSectionContent.test.ts
tests/unit/content-3a-shape.test.ts
tests/e2e/sections-3a.spec.ts
```

### Sửa
```
src/features/user/config/contentDefaults.ts   # + 4 shape values/pain_points/process_steps/courses
src/features/user/config/sections.ts          # thêm 'gia-tri-khac-biet' (nav:null); xác nhận 've-huyway' vẫn = carousel, 'lo-trinh-hoc'
src/features/user/sections/PainPoints.tsx      # viết lại: CMS-driven, bỏ dead toggle
src/features/user/sections/Courses.tsx         # viết lại nội dung: CMS band (3.5-4.5/5.0-6.0/6.5-7.5+), CtaLink, id 'lo-trinh-hoc'
src/features/user/pages/LandingPage.tsx        # ProcessSteps thay Steps; chèn ValuesSection cạnh CenterCardCarousel; thứ tự
database.types.ts                             # regen sau 0003
```
> **`CenterCardCarousel.tsx` KHÔNG nằm trong phạm vi sửa của 3A** (chốt 2026-09-08, §7.1) — giữ
> nguyên id `ve-huyway` + dữ liệu mẫu hiện tại; việc đổi tên/rebuild thành `cong-nghe` chuyển hẳn
> sang `plan/03b-section-tuong-tac.md`.

### Xoá
```
src/features/user/sections/Steps.tsx           # thay bằng ProcessSteps.tsx
```

---

## 5. Test plan

### 5.1 Unit (Vitest)
| File | Ca kiểm |
|------|---------|
| `useSectionContent.test.ts` | block `is_published=false` → `isEmpty=true`; `items:[]` → `isEmpty=true`; merge default khi thiếu field; `icon` không map được → fallback icon mặc định |
| `content-3a-shape.test.ts` | `values.core_values.length <= 3`; `courses.groups.length === 3`; `process_steps.steps.length === 3`; mọi `icon` khoá có trong `iconMap` |

### 5.2 SQL / RLS
- anon `SELECT site_content where block in ('values','pain_points','process_steps','courses')` → 4 hàng.
- role `cskh` `UPDATE` các block này → chặn; `marketing` → OK (chuẩn bị cho Nhóm 4).

### 5.3 E2E (Playwright — skill `browser-automation`)
| Mã | Kịch bản | Kỳ vọng | AC |
|----|----------|---------|-----|
| V-01 | Xem section Giá trị khác biệt | Hiện rõ 2 khối Sứ mệnh + Tầm nhìn + đúng 3 card | 4.1, 4.2 |
| V-02 | Seed `vision:null` | Khối Tầm nhìn ẩn, không để ô trống; Sứ mệnh full width | 4.1 edge |
| V-03 | 1 card giá trị có mô tả dài gấp đôi | 3 card vẫn bằng chiều cao (equal-height) | 4.2 edge |
| V-04 | Đối chiếu `DESIGN.md` | Chỉ indigo + cam; card bo 16–20px, hairline; Montserrat | 4.2 ràng buộc |
| P-01 | Xem Pain Points | Mỗi item có tiêu đề + mô tả; đúng thứ tự seed | 5.1 |
| P-02 | Seed `items:[]` | Section **không** render, không vùng trắng | 5.1 edge |
| P-03 | Bấm dải "→ Hãy để chuyên gia..." | Cuộn tới form Hero `#dang-ky` | 5.1 |
| P-04 | Kiểm DOM | Không còn `onClick` toggle chết; thẻ không "giả accordion" | BACAO 1.B.4 |
| S-01 | Xem Quy trình 3 bước | Đúng 3 bước, có số + icon, đúng thứ tự; có heading cả desktop | 6.1–6.3 |
| S-02 | Bấm CTA bước 1 "Điền thông tin" | Cuộn tới `<LeadForm>` (`#dang-ky`) | 6.1 |
| S-03 | Bước 3 | Hiển thị `sla_note` "trong 24 giờ" (real-time, không phải giờ hành chính) | 6.3 — chốt 2026-09-08 |
| S-04 | Kiểm DOM | Không còn `<div>` giả nút; nút là `<a>`/`<button>` focus được bằng bàn phím | BACAO 1.B.5 / TC-R05 |
| S-05 | Thẻ testimonial "5.5 → 7.5 IELTS sau 3 tháng" | **Vẫn hiển thị** dạng text tĩnh trong `ProcessSteps` (không gỡ) | chốt 2026-09-08, §7.5 |
| R-01 | Xem Lộ trình khóa học | 3 nhóm **Foundation 3.5–4.5 / Intermediate 5.0–6.0 / Advanced 6.5–7.5+**, mỗi nhóm có mô tả + CTA | 7.1–7.3 |
| R-02 | Bấm CTA 1 nhóm + footnote | Cuộn tới form tư vấn (`#dang-ky`) | 7.1–7.3 / 7 edge |
| R-03 | So band điểm | `courses.groups[].band_target` khớp Trust Bar / Footer (cùng dải 3.5–4.5/5.0–6.0/6.5–7.5+) | 7 ràng buộc |
| R-04 | Nhóm `popular` | Badge "Phổ biến nhất" + viền indigo 2px, đúng `DESIGN.md` | 7 |
| G-01 | Menu Header sau khi có section mới | "Về chúng tôi" → `ve-huyway` (vẫn là `CenterCardCarousel`), "Lộ trình học" → `lo-trinh-hoc` cuộn đúng; `gia-tri-khac-biet` **không** có mục menu riêng nhưng cuộn được qua CTA nội bộ | Nhóm 2 hợp đồng |
| G-02 | `prefers-reduced-motion` | Không animation section thừa; equal-height vẫn đúng | 4.x / chung |

### 5.4 Build / tĩnh
- `npm run typecheck` + `build` + `lint` xanh.
- `detect.mjs` (impeccable) trên 4 section: không P0/P1; kiểm "2 màu" + "Wayfinder" (1 cam/viewport) + equal-height.
- `git grep -nE "font-\['Inter'\]|openIndex|#cac-khoa-hoc"` trong `sections/` → rỗng (đã chuyển Montserrat + bỏ dead code + đổi id).

---

## 6. Dependency mới
Không có. Tái dùng `lucide-react`, `@supabase/supabase-js`, Tailwind. `<LeadForm>`/`<CtaBand>`
từ Nhóm 1–2.

---

## 7. Quyết định đã chốt với khách (2026-09-08)
1. **Số phận `CenterCardCarousel`**: **giữ nguyên, không sửa ở 3A** — vẫn `id="ve-huyway"`, vẫn
   dữ liệu mẫu hiện tại, để không làm gãy layout trang. `ValuesSection` (Module 4) dựng **section
   mới** `id=gia-tri-khac-biet` đặt cạnh nó (§2.4), **không** chiếm `ve-huyway`. Việc đổi
   `CenterCardCarousel` thành "Công nghệ ứng dụng" (`id=cong-nghe`) — rebuild ảnh thật/keyboard/
   fallback — dời hẳn sang **Nhóm 3B** (xem `plan/03b-section-tuong-tac.md` §7.6); khi đó
   `config/sections.ts` cập nhật lại và mục nav "Công nghệ ứng dụng" (Nhóm 2 §7.1) được mở khoá.
2. **Dải band điểm chính thức**: chốt theo `PRODUCT.md` — **Foundation 3.5–4.5 / Intermediate
   5.0–6.0 / Advanced 6.5–7.5+**. Áp dụng thống nhất ở `courses.groups[].band_target`, Trust Bar
   (Nhóm 2), Footer, tài liệu marketing. (Dải "3.0–5.0/5.0–6.5/7.0–7.5" trong văn bản SRS gốc
   **không** dùng.)
3. **Mốc "24h"**: tính theo **giờ thực tế (real-time)**, liên tục — không phải giờ hành chính.
4. **Nội dung chính thức**: Sứ mệnh, Tầm nhìn, 3 giá trị cốt lõi, danh sách pain points, mô tả 3
   nhóm khóa học — **giữ nguyên nội dung placeholder trong `PRODUCT.md`** để dựng UI trước; Nhóm 4
   (Admin CMS) đổ nội dung thật qua Database sau.
5. **Thẻ testimonial "5.5 → 7.5 IELTS sau 3 tháng"** trong `ProcessSteps` (thay `Steps.tsx`):
   **giữ lại** ở dạng text tĩnh mẫu trong 3A (không gỡ); CMS-hoá/thay bằng case thật để Nhóm 4
   quyết định sau.
6. **Icon cho card** (values/steps): thống nhất dùng **`lucide-react`** (khoá chuỗi qua `iconMap`)
   cho **toàn bộ dự án** — Marketing **không** upload ảnh icon riêng qua CMS. *(Hệ quả cho Nhóm 4:
   trường `icon` trong `blockSchemas` dùng kiểu chọn-từ-danh-sách (`icon-picker`), không phải
   kiểu `image`.)*
