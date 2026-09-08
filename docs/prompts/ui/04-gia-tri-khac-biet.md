# 04 — Prompt: Giá trị khác biệt (Sứ mệnh – Tầm nhìn + 3 giá trị cốt lõi)

> Nguồn: `requirements/04-gia-tri-khac-biet-module.docx`. Ghép với `00-base.md` trước khi generate.

---

**[Dán khối HỆ THỐNG THIẾT KẾ từ `00-base.md` vào đây]**

---

## 1. Mục tiêu màn hình
Trả lời "vì sao chọn Huyway": khối Sứ mệnh – Tầm nhìn + 3 card giá trị cốt lõi. Section
`id` khớp mục nav "Về chúng tôi". Không có hành động bắt buộc (có thể có 1 link text tới form).

## 2. Layout & breakpoint
- Section nền trắng, padding dọc 64px, track 1200px, gutter 80px.
- **Khối Sứ mệnh – Tầm nhìn:** eyebrow chip + headline section, rồi 2 khối nội dung cạnh
  nhau (desktop 2 cột) / xếp dọc (mobile). Mỗi khối: tiêu đề nhỏ ("Sứ mệnh" / "Tầm nhìn")
  + đoạn mô tả.
- **3 card giá trị cốt lõi:** hàng 3 card chia đều (desktop) / xếp dọc (mobile),
  **equal-height** kể cả khi 1 card nội dung dài hơn. Gap 24px.

## 3. Danh sách thành phần
1. **Eyebrow (chip):** "Về Huyway English" — nền indigo wash, chữ indigo, pill.
2. **Headline section (Headline):** vd "Vì sao chọn Huyway".
3. **Card Sứ mệnh:** tiêu đề "Sứ mệnh" (Title) + đoạn mô tả (Body). Nội dung từ CMS.
4. **Card Tầm nhìn:** tương tự.
5. **3 card giá trị cốt lõi**, mỗi card:
   - Ô icon bo `rounded-2xl` nền indigo `#2C3481` (hoặc indigo wash), icon lucide trắng/indigo.
   - Tiêu đề card (Title).
   - Mô tả ngắn (Body).
   - Ví dụ 3 giá trị (gắn với positioning ở `PRODUCT.md`): "Cam kết đầu ra bằng văn bản" ·
     "Lộ trình cá nhân hóa theo band" · "Giảng viên 8.0+ IELTS".

## 4. Trạng thái
- **Mặc định:** 2 khối sứ mệnh/tầm nhìn + 3 card.
- **Một trong hai khối Sứ mệnh/Tầm nhìn chưa cấu hình nội dung:** KHÔNG hiển thị khối trống
  — fallback text hoặc ẩn khối đó (giữ khối còn lại).
- **1 card giá trị dài hơn:** các card giữ chiều cao đồng đều (equal-height), không lệch.
- Nội dung sửa được qua CMS (Module 16).

## 5. Tham chiếu DESIGN.md (token cụ thể)
- Card: nền `#FFFFFF`, bo 16–20px, viền `#E2E8F0` 1px, không bóng (hairline-first),
  padding 24px.
- Ô icon: nền `#2C3481` hoặc `#F1F2FC`, bo `rounded-2xl`.
- Chip eyebrow: nền `#F1F2FC`, chữ `#2C3481`, pill, Label 600.
- Heading `#000000` Montserrat 600 `-0.01em`; body `#717174`.
- Chỉ dùng token màu/spacing của hệ thống — KHÔNG màu ngoài palette.

## 6. Nội dung mẫu (tiếng Việt)
- Eyebrow: `Về Huyway English`
- Headline: `Vì sao chọn Huyway`
- `Sứ mệnh` — *(nội dung do Marketing nhập qua CMS — để placeholder "Đang cập nhật nội dung")*
- `Tầm nhìn` — *(tương tự)*
- Giá trị: `Cam kết đầu ra bằng văn bản` · `Lộ trình cá nhân hóa theo band điểm` · `Giảng viên 8.0+ IELTS`
