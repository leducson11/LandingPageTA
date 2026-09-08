# 09 — Prompt: Testimonials

> Nguồn: `requirements/09-testimonials-module.docx`. Ghép với `00-base.md` trước khi generate.

---

**[Dán khối HỆ THỐNG THIẾT KẾ từ `00-base.md` vào đây]**

---

## 1. Mục tiêu màn hình
Xử lý do dự trước khi chuyển đổi bằng câu chuyện/đánh giá học viên thật. **Section chỉ
hiển thị khi có dữ liệu thực tế** — mặc định ẩn. Section `id` khớp mục nav "Cảm nhận học viên".

## 2. Layout & breakpoint
- Section nền slate `#F1F5F9` hoặc trắng, padding dọc 64px, track 1200px.
- Headline section + đoạn dẫn.
- **Lưới/carousel testimonial:** desktop 2–3 card/hàng hoặc carousel; mobile 1 card/khung
  + vuốt. Gap 24px.

## 3. Danh sách thành phần
1. **Eyebrow chip:** "Học viên nói gì".
2. **Headline:** "Câu chuyện của học viên Huyway".
3. **Mỗi card testimonial:**
   - Ảnh + tên học viên (avatar tròn/bo).
   - Nội dung đánh giá (Body, có thể line-clamp + "xem thêm").
   - Kết quả đạt được (nếu có): chip band điểm, vd "5.5 → 7.5" (chip indigo wash).
   - (Tuỳ chọn) icon quote mảnh màu indigo mờ.

## 4. Trạng thái
- **Không có dữ liệu thật (mặc định hiện tại):** **ẩn toàn bộ section**; đồng thời mục nav
  "Cảm nhận học viên" (Module 1.2) ẩn đồng bộ — không để anchor chết.
- **Có dữ liệu:** hiển thị lưới/carousel.
- **Học viên yêu cầu gỡ:** Marketing xoá được ngay qua CMS (Module 16) → card biến mất.
- Cần quy trình xin phép dùng tên/ảnh/kết quả trước khi đăng (liên kết Module 17.1).

## 5. Tham chiếu DESIGN.md (token cụ thể)
- Card: nền `#FFFFFF`, bo 16–20px, viền `#E2E8F0` 1px, không bóng.
- Avatar: bo pill/tròn, viền hairline.
- Chip kết quả: nền `#F1F2FC`, chữ `#2C3481`, pill.
- Heading `#000000` 600; body `#717174`; tên học viên Label 600 `#000000`.
- Carousel: nút điều hướng như Module 8; tôn trọng `prefers-reduced-motion`.

## 6. Nội dung mẫu (tiếng Việt)
- Eyebrow: `Học viên nói gì`
- Headline: `Câu chuyện của học viên Huyway`
- **Không tạo testimonial giả.** Nếu cần khối demo cho Stitch, ghi rõ trong card:
  `Nội dung cảm nhận học viên sẽ hiển thị tại đây sau khi trung tâm cung cấp dữ liệu thật
  và có sự đồng ý của học viên.`
- Trạng thái ưu tiên generate: **empty/hidden state** kèm ghi chú "Section ẩn cho tới khi
  có dữ liệu".
