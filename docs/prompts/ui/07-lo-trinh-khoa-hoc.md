# 07 — Prompt: Lộ trình khóa học

> Nguồn: `requirements/07-lo-trinh-khoa-hoc-module.docx`. Ghép với `00-base.md` trước khi generate.

---

**[Dán khối HỆ THỐNG THIẾT KẾ từ `00-base.md` vào đây]**

---

## 1. Mục tiêu màn hình
Giúp khách tự định vị trình độ và chọn nhóm khóa theo band mục tiêu. 3 card nhóm khóa.
Section `id` khớp mục nav "Lộ trình học". Mỗi card có CTA về form.

## 2. Layout & breakpoint
- Section nền trắng, padding dọc 64px, track 1200px, gutter 80px.
- Headline section + đoạn dẫn + (tuỳ chọn) 1 câu điều hướng tới "Kiểm tra trình độ miễn phí"
  cho người chưa chắc trình độ.
- **3 card** chia đều 1 hàng (desktop) / xếp dọc (mobile), gap 24px, **equal-height**.
- Có thể làm card giữa (Trung cấp) là biến thể nổi bật: vẫn trắng nhưng viền 2px `#2C3481`
  + chip "Phổ biến nhất" (nền indigo đặc, chữ trắng).

## 3. Danh sách thành phần
1. **Eyebrow chip:** "Lộ trình theo trình độ".
2. **Headline:** "Chọn lộ trình phù hợp với band điểm của bạn".
3. **Câu điều hướng:** "Chưa chắc trình độ hiện tại? → Kiểm tra trình độ miễn phí" (link
   text indigo tới form, Module 2.2).
4. **Card Nền tảng:** band mục tiêu **3.0–5.0**; tên "Khóa Nền tảng (Foundation)"; mô tả
   ngắn ("Xây gốc ngữ pháp – từ vựng – phát âm, làm quen 4 kỹ năng."); danh sách 2–3 gạch
   đầu dòng; CTA "Nhận tư vấn khóa này".
5. **Card Trung cấp:** band **5.0–6.5**; "Khóa Trung cấp (Intermediate)"; mô tả ("Luyện
   chiến lược 4 kỹ năng, tăng band ổn định."); CTA. *(biến thể nổi bật)*
6. **Card Nâng cao:** band **7.0–7.5**; "Khóa Nâng cao (Advanced)"; mô tả ("Tối ưu Writing
   & Speaking, xử lý câu hỏi khó, target 7.0+."); CTA.
- Mỗi card tối thiểu: tên khóa · band mục tiêu · mô tả ngắn · CTA về form tư vấn.
- Nội dung quản lý qua CMS (Module 16).

## 4. Trạng thái
- **Mặc định:** 3 card.
- **Khách không chắc trình độ:** luôn có lối rõ ràng tới Form "Kiểm tra trình độ miễn phí".
- CTA trong card: nút phụ indigo hoặc nút outline (KHÔNG dùng nút cam — cam để dành cho
  1 hành động chính của viewport; nếu section này không có dải CTA cam thì 1 trong 3 CTA
  card có thể là cam, còn lại là indigo/outline). Mặc định generate: 3 CTA card đều là
  **nút phụ indigo**, tránh 2 nút cam cùng viewport.
- Band điểm hiển thị đồng nhất với Module 3 và tài liệu marketing.

## 5. Tham chiếu DESIGN.md (token cụ thể)
- Card: nền `#FFFFFF`, bo 20px, viền `#E2E8F0` 1px; biến thể nổi bật viền 2px `#2C3481`.
- Chip band: nền `#F1F2FC`, chữ `#2C3481`, pill. Chip "Phổ biến nhất": nền `#2C3481` đặc,
  chữ trắng.
- CTA card: nút phụ nền `#2C3481`, chữ trắng, bo 8px.
- Heading `#000000` 600; body `#717174`.

## 6. Nội dung mẫu (tiếng Việt)
- Eyebrow: `Lộ trình theo trình độ`
- Headline: `Chọn lộ trình phù hợp với band điểm của bạn`
- Điều hướng: `Chưa chắc trình độ hiện tại? Kiểm tra trình độ miễn phí`
- `Khóa Nền tảng (Foundation)` — band `3.0 – 5.0` — `Xây gốc ngữ pháp – từ vựng – phát âm, làm quen 4 kỹ năng.`
- `Khóa Trung cấp (Intermediate)` — band `5.0 – 6.5` — `Luyện chiến lược 4 kỹ năng, tăng band ổn định.` — chip `Phổ biến nhất`
- `Khóa Nâng cao (Advanced)` — band `7.0 – 7.5` — `Tối ưu Writing & Speaking, xử lý câu hỏi khó, target 7.0+.`
- CTA card: `Nhận tư vấn khóa này`
