# 08 — Prompt: Đội ngũ giáo viên (Carousel)

> Nguồn: `requirements/08-doi-ngu-giao-vien-module.docx`. Ghép với `00-base.md` trước khi generate.

---

**[Dán khối HỆ THỐNG THIẾT KẾ từ `00-base.md` vào đây]**

---

## 1. Mục tiêu màn hình
Xây niềm tin về chất lượng giảng dạy bằng hồ sơ giáo viên thật, dạng carousel dễ khám phá.
Section `id` khớp mục nav "Đội ngũ giáo viên". Sau section có **1 dải CTA lặp lại** (Module 12).

## 2. Layout & breakpoint
- Section nền trắng, padding dọc 64px, track 1200px.
- Headline section + đoạn dẫn.
- **Carousel:**
  - Desktop: 3 card giáo viên/khung nhìn, nút Trước/Sau ở 2 bên (hoặc trên phải), dots dưới.
  - Mobile: 1–1.2 card/khung nhìn, vuốt (swipe), dots dưới.
- Ngay dưới: **dải CTA band** (Module 12) — nền indigo, nút cam.

## 3. Danh sách thành phần
1. **Eyebrow chip:** "Đội ngũ giảng viên".
2. **Headline:** "Học cùng giảng viên 8.0+ IELTS".
3. **Mỗi card giáo viên:**
   - Ảnh chân dung **thật** (không ảnh stock) — bo 16px trên, ratio ~3:4; có skeleton/
     placeholder khi tải, không gây layout shift; `lazy-load`, đúng kích thước hiển thị.
   - Tên giáo viên (Title).
   - Hàng chip chứng chỉ: "IELTS 8.0", "TESOL", ... (chip indigo wash).
   - Số năm kinh nghiệm (Label).
   - Mô tả ngắn (Body, 2–3 dòng, line-clamp).
4. **Nút Trước / Sau:** icon chevron trong nút tròn/pill, viền hairline; `aria-label` đầy
   đủ ("Xem giáo viên trước", "Xem giáo viên tiếp theo") — không chỉ icon không tên.
5. **Dots:** chấm định vị, chấm active màu indigo đặc, còn lại indigo mờ.

## 4. Trạng thái
- **Mặc định:** carousel với ≥2 giáo viên.
- **Chỉ có 1 giáo viên trong dữ liệu:** tự **ẩn nút Trước/Sau và dots**.
- **Ảnh tải chậm:** skeleton xám nhạt bo góc, không nhảy layout.
- **Vuốt nhanh liên tiếp trên mobile:** không nhảy nhiều slide cùng lúc (debounce).
- Điều hướng bằng phím mũi tên khi carousel đang focus.
- Nội dung quản lý qua CMS (Module 16).
- **Không có dữ liệu giáo viên:** section fallback/ẩn (không vùng trắng).

## 5. Tham chiếu DESIGN.md (token cụ thể)
- Card: nền `#FFFFFF`, bo 20px, viền `#E2E8F0` 1px, không bóng (hover lift `translateY(-4px)`
  + bóng float nhẹ).
- Chip chứng chỉ: nền `#F1F2FC`, chữ `#2C3481`, pill, Label 600.
- Nút điều hướng: nền trắng, viền `#E2E8F0` 1px, icon `#2C3481`, bo pill; focus outline 2px `#2563EB`.
- Dots: active `#2C3481`, inactive `#737CBF`/`#E1E4F5`.
- Heading `#000000` 600; body `#717174`; caption `#8A8A8D`.
- Chuyển slide ~250ms ease; tôn trọng `prefers-reduced-motion` (tắt auto-scroll nếu có).

## 6. Nội dung mẫu (tiếng Việt — TẤT CẢ tên/chứng chỉ là placeholder chưa xác minh)
- Eyebrow: `Đội ngũ giảng viên`
- Headline: `Học cùng giảng viên 8.0+ IELTS`
- Card mẫu (đánh dấu rõ là placeholder): `Giảng viên A` — chip `IELTS 8.0` `TESOL` —
  `8 năm kinh nghiệm` — `Hồ sơ giảng viên đang chờ trung tâm cung cấp thông tin và ảnh thật.`
- Lặp lại 3–5 card placeholder tương tự.
- Ảnh: dùng ô xám "Ảnh giảng viên (chờ cập nhật)" — KHÔNG ghép ảnh stock.
