# Coding Plan — Nhóm 3B: Section nội dung Landing (phần có tương tác)

> Nguồn yêu cầu: `requirements/08-doi-ngu-giao-vien-module.docx`, `09-testimonials-module.docx`,
> `10-cam-ket-dau-ra-module.docx`, `11-faq-module.docx`.
> Phụ thuộc: **Nhóm 1** (`<LeadForm>`, `PolicyModal`, token `DESIGN.md`), **Nhóm 2**
> (`site_content` + `useSiteContent` + hợp đồng `config/sections.ts` + `useScrollSpy`/nav +
> `<CtaBand>`), **Nhóm 3A** (khuôn `SectionShell` + `CtaLink` + `useSectionContent` + `iconMap`).
> Bối cảnh lỗi: `BACAO_KIEM_THU.md` mục 1.B.7–1.B.11, 2.5, 2.6.
> Trạng thái: **chưa code**.

---

## 1. Mục tiêu Nhóm 3B

4 section cùng khuôn Nhóm 3A **cộng phần tương tác + accessibility** — đây là nơi dựng bộ
primitive a11y dùng chung (`<Modal>`, `<Accordion>`, `<ProfileCarousel>`, `<RemoteImage>`).

| Module | Section | Tương tác |
|--------|---------|-----------|
| 8 | `Instructors` (`id=giang-vien`, thay `Instructor.tsx`) | Carousel Trước/Sau + dots + keyboard + swipe; hồ sơ GV thật; ảnh lazy + skeleton |
| 9 | `Testimonials` (`id=hoc-vien`, viết lại) | Lưới đánh giá thật; **ẩn section + ẩn mục menu** khi chưa có data |
| 10 | `CommitmentSection` (`id=cam-ket`, tách khỏi `SocialProof.tsx`) **+** `SocialProofStats` (`id=ket-qua-thuc-te`, giữ lại — xem §7.5) | Nút "Xem điều kiện áp dụng" → modal có focus-trap / Esc / X / click-outside / scroll-lock; khối 95%/+1.5/10.000+ tiếp tục là section riêng, CMS-driven |
| 11 | `FAQ` (`id=faq`, viết lại) | Accordion đúng ARIA, keyboard, mở nhiều mục; có câu trả lời thật |

**Ngoài phạm vi 3B:**
- UI upload ảnh / sửa nội dung (Module 16) → Nhóm 4. 3B chỉ **seed** block + tiêu thụ `photo_url`.
- Quy trình xin phép dùng tên/ảnh học viên (Module 9 phi CN) → vận hành + Nhóm 4; 3B chỉ render
  data đã publish + gắn link Chính sách (Nhóm 1).
- Cam kết SLA nội bộ / hoàn phí (vận hành pháp lý) → ngoài code.

---

## 2. Kiến trúc

### 2.1 Schema DB

`supabase/migrations/0004_landing_content_3b.sql`
- **Không bảng mới** — `INSERT ... ON CONFLICT` 4 block vào `public.site_content` (Nhóm 2).
- **Storage bucket** `landing-media` (public read; write chỉ `super_admin`/`marketing` — chuẩn bị
  cho upload ở Nhóm 4). 3B chỉ tham chiếu URL. *(Có thể dời việc tạo bucket sang Nhóm 4 — xem §7.7.)*

Hình dạng `data` (thêm vào `contentDefaults.ts`):
```
instructors {
  heading, subheading,
  founder: {                         // null → ẩn showcase nhà sáng lập
    name, portrait_url, role, quote, credentials: [string]
  } | null,
  members: [ {
    name, photo_url, score, skills, certs: [string], experience, bio
  } ]                                // 0 phần tử → ẩn carousel; 1 phần tử → ẩn nút/dots
}
testimonials {
  heading, subheading,
  items: [ { name, photo_url, quote, result, duration } ]   // [] → section + nav item ẩn
}
commitment {
  heading, summary, cta_label,
  conditions: {                      // 4 nhóm BẮT BUỘC (AC 10.1) — nội dung = văn bản pháp lý
    duration,      // thời hạn áp dụng                     mẫu tiếng Việt (Lorem-ipsum dạng
    attendance,    // yêu cầu chuyên cần                    pháp lý) tới khi có bản chính thức
    exam,          // điều kiện thi                         từ hợp đồng (chốt 2026-09-08, §7.4)
    scope,         // phạm vi áp dụng
    extra: [string]
  }
}
social_proof_stats {                 // GIỮ RIÊNG, không gộp Trust Bar (chốt 2026-09-08, §7.5)
  heading,                           // vd "Kết quả thực tế"
  items: [ { value, label } ]        // vd 95% / +1.5 Điểm / 10.000+ — số liệu minh hoạ, chưa kiểm chứng (như Trust Bar, không gate ẩn/hiện)
}
faq {
  heading,
  items: [ { question, answer } ],   // answer: markdown/plain; [] → section ẩn
  allow_multiple: bool               // default true — đã chốt 2026-09-08 (§7.1)
}
```

**Không có Edge Function / API endpoint mới.** Đọc qua `useSiteContent` (Nhóm 2). CTA dùng
`<CtaBand>` (Nhóm 2) / `<CtaLink>` (Nhóm 3A). Modal Chính sách dùng lại từ Nhóm 1.

### 2.2 Primitive a11y dùng chung (đóng góp chính của 3B)

```
src/shared/components/
├── Modal.tsx          # MỚI — generalize PolicyModal (Nhóm 1) thành <Modal> chung:
│                      #   focus-trap, trả focus về trigger khi đóng, Esc, click overlay, nút X,
│                      #   scroll-lock qua <body> có cleanup ĐẢM BẢO (finally / useEffect return),
│                      #   scroll nội bộ (max-h), an toàn mobile (dvh), aria-modal + aria-labelledby.
│                      #   PolicyModal + CommitmentModal đều dùng lại <Modal>.
├── Accordion.tsx      # MỚI — pattern ARIA: <h3><button aria-expanded aria-controls></h3>
│                      #   + <div role="region" aria-labelledby>; keyboard Tab/Enter/Space;
│                      #   prop allowMultiple; đóng mặc định; tôn trọng prefers-reduced-motion.
src/features/user/components/
├── ProfileCarousel.tsx # MỚI — bọc Swiper (đã có dep): modules Navigation+Pagination+Keyboard+A11y;
│                      #   slidesPerView responsive; nút Trước/Sau có aria-label VI đầy đủ
│                      #   ("Xem giáo viên trước" / "...tiếp theo"); dots chỉ vị trí; ẩn control khi ≤1 slide;
│                      #   debounce swipe (không nhảy nhiều slide); loop tắt khi ít slide.
└── RemoteImage.tsx    # MỚI — <img> lazy (loading="lazy" + decoding="async"), khung skeleton giữ
                       #   tỉ lệ (không layout shift), onError → fallback (avatar chữ cái / ảnh mặc định).
```

### 2.3 Chi tiết từng section

**Module 8 — `Instructors` (thay `Instructor.tsx`, `id=giang-vien`)**
- Showcase nhà sáng lập (nếu `founder` != null): ảnh (`RemoteImage` hoặc asset bundled
  `ThayHuy1-removebg.png`) + name + role + quote + `credentials[]`. Hiển thị nhất quán từ `md`
  (hiện chỉ hiện `xl` → khoảng trống ở tablet, BACAO TC-R03).
- Carousel hồ sơ GV: `<ProfileCarousel>` bọc các card `{photo_url, name, score, skills, certs[], experience, bio}`.
  - Ảnh **thật** qua `RemoteImage` (skeleton khi tải chậm — 8.1 edge); **bỏ** ô xám rỗng desktop +
    `placehold.co` mobile (BACAO 1.B.7). Ở 3B: seed `members`/`founder` bằng **ảnh + thông tin
    mẫu (placeholder)** rõ ràng (chốt 2026-09-08, §7.2) — Admin bổ sung hồ sơ GV thật qua CMS
    (Nhóm 4) sau; điểm số founder (IELTS 8.5/R&L 9.0/TOEIC 990) giữ nguyên làm text tĩnh, không
    cần xác minh ở giai đoạn này (§7.3).
  - Nút Trước/Sau + dots + keyboard + swipe (8.2). `members.length <= 1` → ẩn nút/dots (8.2 edge).
- **Bỏ** hàm `scroll()` thao tác `document.getElementById('instructor-scroll')` (id chỉ có ở mobile — desktop trỏ null).
- **Bỏ** `<div>` giả nút "Kiểm tra trình độ miễn phí" trong banner cuối → để `<CtaBand cta_after_instructor>` (Nhóm 2) đảm nhận.
- 1 cây markup responsive.

**Module 9 — `Testimonials` (viết lại, `id=hoc-vien`)**
- `items` từ CMS: `{name, photo_url, quote, result, duration}`. Ảnh qua `RemoteImage` (fallback chữ cái).
- `items.length === 0` → `return null`. Đồng bộ: mục menu "Cảm nhận học viên" ẩn theo (cơ chế
  `hideWhenEmpty` của Nhóm 2 — 3B nối tín hiệu "empty" của block `testimonials` vào đó). (9.1, 9.1 edge)
- Link Chính sách dữ liệu cá nhân (Nhóm 1) trong ghi chú "đã xin phép sử dụng" cuối section (phi CN).
- **Bỏ** dữ liệu testimonial cứng + ảnh Pexels hiện tại (BACAO 1.B.9 / PRODUCT.md chưa kiểm chứng).

**Module 10 — `CommitmentSection` (tách khỏi `SocialProof.tsx`, `id=cam-ket`) + `SocialProofStats` (giữ lại, `id=ket-qua-thuc-te`)**
- `CommitmentSection`: thẻ "Cam kết đầu ra bằng văn bản" + `summary` + nút `cta_label` ("Xem điều
  kiện áp dụng").
- Bấm nút → `<Modal>`:
  - Nội dung **bắt buộc** đủ 4 nhóm: `duration`, `attendance`, `exam`, `scope` (+ `extra[]`), seed
    bằng **văn bản pháp lý tiếng Việt mẫu** (chốt 2026-09-08, §7.4) tới khi có bản chính thức từ
    hợp đồng. Không cho phép nút mở modal rỗng (10.1: "không được để nút tồn tại mà không dẫn tới
    nội dung").
  - Đóng: nút X + click overlay + Esc; focus-trap; trả focus về nút mở; scroll nền khoá khi mở,
    **luôn** nhả khi đóng kể cả lỗi JS (10.1 edge, phi CN — vá BACAO TC-M05/06/07).
  - Nội dung dài → scroll nội bộ; mobile → `max-h` theo `dvh`, nút đóng đủ lớn cho ngón tay.
- **`SocialProof.tsx` KHÔNG bị retire** (đảo quyết định ban đầu — chốt 2026-09-08, §7.5): đổi tên
  thành `SocialProofStats.tsx`, **giữ làm section riêng, độc lập** với Trust Bar (Module 3) để giữ
  hiệu ứng thuyết phục thị giác — **không gộp, không xoá**. Chuyển từ dữ liệu cứng sang CMS-driven
  (`useSectionContent('social_proof_stats')`), theo đúng khuôn `SectionShell` như 3A/3B; số liệu
  minh hoạ hiển thị bình thường (không gate ẩn/hiện, cùng nguyên tắc với Trust Bar §Nhóm 2 §7.4).
  Chỉ phần **modal cam kết** được tách ra khỏi file này để thành `CommitmentSection`. Gỡ luôn
  `.scroll-hidden` cuối cùng còn sót lại ở đây (BACAO 1.A.4).

**Module 11 — `FAQ` (viết lại, `id=faq`)**
- `<Accordion>` từ `faq.items` (`{question, answer}`) — **bổ sung trường `answer`** còn thiếu (BACAO 1.B.10).
- Mặc định đóng; bấm/Enter/Space mở-đóng; ARIA `button`+`aria-expanded`+`aria-controls`+`region`.
- `allow_multiple` (default true, §7.1).
- `items.length === 0` → `return null` (11.1 edge).
- **Bỏ** dấu "+" tự vẽ bằng `<div>` lồng nhau → icon `lucide` (ChevronDown xoay).
- **Bỏ** dải CTA `<div>` giả "Bắt đầu" ở mobile → `<CtaLink>` (Nhóm 3A) hoặc `<CtaBand>`.

### 2.4 Ghép vào trang + dọn dẹp

- `LandingPage.tsx` thứ tự: `... Roadmap` → `TechShowcase` (`id=cong-nghe`, xem dưới) →
  `Instructors` → (`CtaBand cta_after_instructor`) → `CommitmentSection` → `SocialProofStats` →
  `Testimonials` → `FAQ` → `Footer`.
- **Xoá file chết**: `src/features/user/sections/MentorTeam.tsx` (BACAO 1.B.11, không import ở đâu).
  `SocialProof.tsx` **không xoá** — đổi tên `SocialProofStats.tsx` (xem §2.3 Module 10).
- **`CenterCardCarousel` → `TechShowcase.tsx`** (chốt 2026-09-08, tiếp nối Nhóm 3A §7.1 + Nhóm 2
  §7.1): viết lại thành section "Công nghệ ứng dụng", đổi `id="ve-huyway"` → `id="cong-nghe"`,
  dùng `<ProfileCarousel>` + `<RemoteImage>` + fallback ảnh (BACAO TC-C05), nội dung/ảnh vẫn có
  thể là placeholder (đồng bộ nguyên tắc §7.2).
- **Giải phóng `ve-huyway`**: vì carousel dời sang `cong-nghe`, `ValuesSection` (Module 4, dựng ở
  Nhóm 3A với id tạm `gia-tri-khac-biet`, `nav:null`) **đổi lại** `id → 've-huyway'`,
  `nav → 'Về chúng tôi'` — khớp đúng ngữ nghĩa (Module 4 = "vì sao chọn Huyway") và lấp đúng chỗ
  trống trong 5 mục menu SRS Module 1. Đây là việc **sửa** `src/features/user/sections/ValuesSection.tsx`
  (đổi hằng số id) + `config/sections.ts`, không phải viết lại.
- `config/sections.ts` sau 3B: `top` → `ve-huyway`(=ValuesSection) → `cong-nghe`(=TechShowcase,
  **mở khoá** nav, hết ẩn như Nhóm 2 §7.1) → `lo-trinh-hoc` → `giang-vien` → `hoc-vien`
  (`hideWhenEmpty`) → `dang-ky`; cộng các anchor không-nav: `cam-ket`, `ket-qua-thuc-te`, `faq`.

---

## 3. Trình tự triển khai (theo dependency)

| B | Việc | Phụ thuộc | Đầu ra kiểm chứng |
|---|------|-----------|-------------------|
| 1 | `0004_landing_content_3b.sql`: seed 4 block + bucket `landing-media`. Apply. `contentDefaults.ts` + 4 shape. `supabase gen types`. | Nhóm 2 B1 | `GET site_content` anon → 4 block mới. |
| 2 | `src/features/user/components/RemoteImage.tsx`. | — | Ảnh URL hỏng → hiện fallback, không layout shift. |
| 3 | `src/shared/components/Modal.tsx` (generalize); refactor `PolicyModal.tsx` (Nhóm 1) dùng lại `<Modal>`. | Nhóm 1 (`PolicyModal`) | Esc/overlay/X đóng; focus-trap; scroll-lock nhả sau khi đóng. |
| 4 | `src/shared/components/Accordion.tsx`. | — | Keyboard Tab/Enter/Space; `aria-expanded` đổi đúng. |
| 5 | `src/features/user/components/ProfileCarousel.tsx` (bọc Swiper + modules Keyboard/A11y). | 2 | Mũi tên bàn phím đổi slide khi focus; aria-label VI; ≤1 slide ẩn control. |
| 6 | `Instructors.tsx` (Module 8), thay `Instructor.tsx` trong `LandingPage.tsx`; xoá `Instructor.tsx`. | 2, 5 | Ảnh thật + skeleton; carousel Trước/Sau + dots hoạt động cả desktop. |
| 7 | Viết lại `Testimonials.tsx` (Module 9). Nối tín hiệu "empty" của block vào `config/sections.ts`/nav. | 2 | Seed `items:[]` → section ẩn + menu "Cảm nhận học viên" ẩn. |
| 8 | `CommitmentSection.tsx` (Module 10) + `CommitmentModal` (dùng `<Modal>`). Tách phần modal ra khỏi `SocialProof.tsx`; đổi tên file còn lại → `SocialProofStats.tsx`, chuyển sang CMS-driven (`social_proof_stats`). Cập nhật `LandingPage.tsx`. | 3 | Modal đủ 4 nhóm điều kiện; Esc/scroll-lock đạt; `SocialProofStats` vẫn hiển thị độc lập, không gộp Trust Bar. |
| 9 | Viết lại `FAQ.tsx` (Module 11) dùng `<Accordion>`; bỏ icon `<div>` giả + CTA `<div>` giả; `allow_multiple:true`. | 4 | Mở/đóng mục; mở **nhiều** mục cùng lúc; screen reader đọc đúng. |
| 10 | Xoá `MentorTeam.tsx`; dọn import `LandingPage.tsx`; `useScrollAnimation.ts` bỏ nốt `.scroll-hidden` rủi ro. | 6–9 | `grep scroll-hidden` → rỗng; build xanh. |
| 11 | `CenterCardCarousel.tsx` → viết lại thành `TechShowcase.tsx` (`id=cong-nghe`) dùng `<ProfileCarousel>`+`<RemoteImage>`. Đổi `ValuesSection.tsx` (Nhóm 3A) `id: gia-tri-khac-biet → ve-huyway`, `nav: null → 'Về chúng tôi'`. Cập nhật `config/sections.ts` + `LandingPage.tsx` (mở khoá nav "Công nghệ ứng dụng"). | 5 | Menu đủ 5 mục hoạt động: Về chúng tôi → `ve-huyway`(ValuesSection); Công nghệ ứng dụng → `cong-nghe`(TechShowcase). |
| 12 | QA a11y: Playwright §5.3 + `detect.mjs` + kiểm keyboard/focus-trap/ARIA. | 2–11 | Không P0/P1 a11y còn lại. |

---

## 4. File sẽ tạo / sửa

### Tạo mới
```
supabase/migrations/0004_landing_content_3b.sql
src/shared/components/Modal.tsx
src/shared/components/Accordion.tsx
src/features/user/components/ProfileCarousel.tsx
src/features/user/components/RemoteImage.tsx
src/features/user/sections/Instructors.tsx
src/features/user/sections/CommitmentSection.tsx
src/features/user/sections/TechShowcase.tsx
tests/unit/accordion.test.tsx
tests/unit/modal.test.tsx
tests/unit/content-3b-shape.test.ts
tests/e2e/sections-3b-a11y.spec.ts
```

### Sửa
```
src/features/user/config/contentDefaults.ts   # + shape instructors/testimonials/commitment/faq/social_proof_stats
src/features/user/config/sections.ts          # + 'cam-ket', 'ket-qua-thuc-te'; 've-huyway'→ValuesSection; 'cong-nghe' mở khoá nav
src/shared/components/PolicyModal.tsx          # refactor dùng <Modal>
src/features/user/sections/Testimonials.tsx    # viết lại: CMS-driven, RemoteImage, ẩn khi rỗng
src/features/user/sections/FAQ.tsx             # viết lại: <Accordion>, answer thật, bỏ <div> giả, allow_multiple:true
src/features/user/sections/SocialProof.tsx     # đổi tên SocialProofStats.tsx; chỉ giữ phần thống kê, CMS-driven; modal cam kết tách sang CommitmentSection
src/features/user/sections/ValuesSection.tsx   # (Nhóm 3A) đổi id 'gia-tri-khac-biet'→'ve-huyway', nav null→'Về chúng tôi'
src/features/user/pages/LandingPage.tsx        # Instructors/CommitmentSection/SocialProofStats/TechShowcase thay Instructor/SocialProof/CenterCardCarousel; thứ tự; bỏ import chết
src/features/user/hooks/useScrollAnimation.ts  # bỏ nốt phụ thuộc .scroll-hidden (nếu Nhóm 2 chưa dọn hết)
database.types.ts                             # regen sau 0004
```

### Xoá
```
src/features/user/sections/Instructor.tsx      # thay bằng Instructors.tsx
src/features/user/sections/CenterCardCarousel.tsx  # nội dung chuyển sang TechShowcase.tsx (đổi tên file)
src/features/user/sections/MentorTeam.tsx       # dead code (BACAO 1.B.11)
```

---

## 5. Test plan

### 5.1 Unit (Vitest + @testing-library/react)
| File | Ca kiểm |
|------|---------|
| `modal.test.tsx` | mở → focus vào modal; Tab quẩn trong modal (focus-trap); Esc đóng; đóng → focus về trigger; unmount khi đang mở → `body` hết `overflow:hidden` |
| `accordion.test.tsx` | mặc định đóng; Enter/Space toggle; `aria-expanded` + `aria-controls` khớp; `allowMultiple=false` → mở mục 2 đóng mục 1; `allowMultiple=true` → cả hai mở |
| `content-3b-shape.test.ts` | `commitment.conditions` có đủ 4 khoá `duration/attendance/exam/scope`; `faq.items[].answer` không rỗng; `testimonials.items` rỗng → cờ `isEmpty` |

### 5.2 SQL / RLS / Storage
- anon `SELECT site_content` 4 block mới → OK; anon `UPDATE` → chặn.
- anon đọc file trong bucket `landing-media` → OK; anon `upload` → chặn; `marketing` upload → OK.

### 5.3 E2E (Playwright — skill `browser-automation` / `playwright-skill`)
| Mã | Kịch bản | Kỳ vọng | AC |
|----|----------|---------|-----|
| I-01 | Xem section Đội ngũ GV | Mỗi hồ sơ có ảnh thật + tên + chứng chỉ + số năm KN + mô tả | 8.1 |
| I-02 | Ảnh GV tải chậm (throttle) | Skeleton giữ chỗ, không layout shift | 8.1 edge |
| I-03 | Bấm nút "Xem giáo viên tiếp theo" / dots | Đổi slide đúng; dots phản ánh vị trí | 8.2 |
| I-04 | Focus carousel, nhấn `→` / `←` | Đổi slide | 8.2 |
| I-05 | Vuốt trên mobile (emulate) | Đổi slide; vuốt nhanh không nhảy nhiều slide | 8.2 edge |
| I-06 | Nút Trước/Sau bằng screen reader | Đọc "Xem giáo viên trước/tiếp theo" (không phải icon vô danh) | 8.2 |
| I-07 | Seed `members` chỉ 1 GV | Ẩn nút Trước/Sau + dots | 8.2 edge |
| I-08 | Showcase nhà sáng lập ở ~1100px (tablet) | Hiển thị (không bị ẩn như hiện tại) | BACAO TC-R03 |
| I-09 | Kiểm DOM | Không còn `placehold.co`, không ô ảnh xám rỗng, không `id="instructor-scroll"` mồ côi | BACAO 1.B.7 |
| TS-01 | Có ≥1 testimonial trong CMS | Section hiện; mỗi item có tên/ảnh + nội dung + kết quả | 9.1 |
| TS-02 | Seed `testimonials.items:[]` | Section **không** render **và** mục menu "Cảm nhận học viên" biến mất | 9.1 / 9.1 edge |
| TS-03 | Xoá 1 testimonial khỏi CMS (giả lập) | Item biến mất khỏi trang sau reload, không lỗi | 9.1 edge |
| CM-01 | Bấm "Xem điều kiện áp dụng" | Modal mở tại chỗ, không rời trang | 10.1 |
| CM-02 | Nội dung modal | Đủ 4 nhóm: thời hạn, chuyên cần, điều kiện thi, phạm vi áp dụng | 10.1 |
| CM-03 | Đóng bằng X / click ngoài / Esc | Đều đóng | 10.1 |
| CM-04 | Focus khi mở/đóng | Mở: focus vào modal + trap; Đóng: focus về nút mở | 10.1 phi CN |
| CM-05 | Nội dung dài | Scroll nội bộ modal, không tràn màn hình | 10.1 edge |
| CM-06 | Mobile | Modal vừa viewport, nút đóng dễ chạm | 10.1 edge |
| CM-07 | Đóng modal rồi kiểm `body` | `overflow` trở lại bình thường (scroll nền không bị khoá) | 10.1 edge |
| FQ-01 | Mỗi câu hỏi | Đóng mặc định; bấm mở câu trả lời; bấm lại thu gọn | 11.1 |
| FQ-02 | Keyboard: Tab tới câu hỏi, Enter/Space | Mở/đóng; `aria-expanded` đổi | 11.1 |
| FQ-03 | Mở 2 câu hỏi (allow_multiple=true) | Cả hai cùng mở | 11.1 phi CN |
| FQ-04 | Seed `faq.items:[]` | Section tự ẩn, không vùng trắng | 11.1 edge |
| FQ-05 | Kiểm DOM | Nút là `<button>` thật, không `<div>`; có `answer`; không dải CTA `<div>` giả | BACAO 1.B.10 |
| A-01 | `prefers-reduced-motion` | Accordion/carousel không animation gây khó chịu; vẫn dùng được | chung |
| TC-01 | Menu "Công nghệ ứng dụng" | Mục nav **hiện** (hết ẩn) và cuộn đúng tới `TechShowcase` (`cong-nghe`) | Nhóm 2 §7.1, chốt 2026-09-08 |
| TC-02 | Menu "Về chúng tôi" | Cuộn tới `ValuesSection` (`ve-huyway`, Sứ mệnh/Tầm nhìn/giá trị) — **không còn** trỏ tới carousel | 1.2 hợp đồng |
| SP-01 | Xem "Kết quả thực tế" (SocialProofStats) | Section riêng hiển thị 95%/+1.5/10.000+, tách biệt Trust Bar | 10 (chốt 2026-09-08, §7.5) |

### 5.4 Build / tĩnh
- `npm run typecheck` + `build` + `lint` xanh.
- `detect.mjs` (impeccable) trên các section: không P0/P1; kiểm "2 màu" + "Wayfinder".
- `git grep -nE "placehold\.co|scroll-hidden|instructor-scroll|MentorTeam"` → rỗng. *(`SocialProof`
  cố ý còn lại dưới tên `SocialProofStats.tsx` — không phải dead code.)*
- axe / Lighthouse a11y trên `/` ≥ 95 (carousel + modal + accordion là điểm dễ rớt).

---

## 6. Dependency mới
Không có bắt buộc. Dùng lại `swiper` (đã có) cho `<ProfileCarousel>`; `lucide-react`;
`@testing-library/react` (đã thêm ở Nhóm 1 cho test). Cân nhắc `focus-trap` nhỏ — **không cần**,
tự implement trap trong `<Modal>` (~30 dòng).

---

## 7. Quyết định đã chốt với khách (2026-09-08)
1. **FAQ mở nhiều mục hay 1 mục**: chốt **mở nhiều mục đồng thời** (`allow_multiple: true`) — đúng
   đề xuất ban đầu, giúp người dùng dễ so sánh thông tin.
2. **Hồ sơ giáo viên thật**: dùng **ảnh + thông tin mẫu (placeholder)** để dựng UI trước; Admin bổ
   sung hồ sơ thật (ảnh/bằng cấp/kinh nghiệm) qua CMS (Nhóm 4) sau.
3. **Điểm số nhà sáng lập** (IELTS 8.5 / R&L 9.0 / TOEIC 990): **giữ nguyên** làm text tĩnh trên
   UI, chưa cần xác minh ở giai đoạn này.
4. **Nội dung 4 nhóm điều kiện cam kết**: seed bằng **văn bản pháp lý tiếng Việt mẫu** (dạng
   Lorem-ipsum pháp lý) để dựng khung giao diện; thay bằng bản chính thức qua CMS khi có.
5. **Khối "Con số khẳng định chất lượng"** (95% / +1.5 / 10.000+): **giữ riêng** thành section
   độc lập `SocialProofStats` (`id=ket-qua-thuc-te`) để tăng hiệu ứng thuyết phục thị giác —
   **không gộp** vào Trust Bar, **không bỏ**. Chỉ phần modal cam kết được tách sang
   `CommitmentSection`.
6. **`CenterCardCarousel`**: xác nhận **rebuild thành "Công nghệ ứng dụng"** (`id=cong-nghe`) tại
   3B, dùng `<ProfileCarousel>`/`<RemoteImage>`; giữ cấu trúc khung + dữ liệu mẫu tới lúc này
   (không đổi ở 3A) để không gãy layout, đúng như đã chốt ở Nhóm 3A §7.1.
7. **Bucket `landing-media`**: giữ đề xuất mặc định — tạo ở 3B, policy ghi (write) mở rộng ở
   Nhóm 4 (không có phản đối từ khách).
8. **Ảnh học viên trong Testimonials**: vẫn cần đồng ý bằng văn bản trước khi đăng (Module 9 phi
   CN) — đây là việc vận hành/pháp lý, chưa có câu trả lời, không chặn code (dùng avatar chữ cái
   khi chưa có ảnh/giấy phép).
