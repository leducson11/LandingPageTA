# 06 — Prompt: Quy trình 3 bước

> Nguồn: `requirements/06-quy-trinh-3-buoc-module.docx`. Ghép với `00-base.md` trước khi generate.

---

**[Dán khối HỆ THỐNG THIẾT KẾ từ `00-base.md` vào đây]**

---

## 1. Mục tiêu màn hình
Cho khách thấy điều gì xảy ra sau khi để lại thông tin → giảm e ngại điền form. 3 bước
đánh số. Sau section có **1 dải CTA lặp lại** (Module 12) — nút cam của viewport này nằm
ở dải CTA đó.

## 2. Layout & breakpoint
- Section nền slate `#F1F5F9` hoặc trắng, padding dọc 64px, track 1200px.
- Headline section + đoạn dẫn.
- **3 bước:** desktop hàng ngang 3 cột nối bằng đường/mũi tên mảnh giữa các bước; mobile
  xếp dọc, đường nối dọc bên trái. Gap 24px.
- Ngay dưới: **dải CTA band** full-bleed (xem Module 12) — nền indigo `#2C3481`, chữ trắng,
  nút cam "Kiểm tra trình độ miễn phí".

## 3. Danh sách thành phần
1. **Eyebrow chip:** "Quy trình đơn giản".
2. **Headline:** "3 bước để có lộ trình IELTS của riêng bạn".
3. **Bước 1 — Điền thông tin:** badge số "1" (vòng tròn indigo, chữ trắng) hoặc ô icon;
   tiêu đề "Điền thông tin"; mô tả "Để lại họ tên, SĐT và mục tiêu — chỉ 60 giây."
   → liên kết logic với Form Lead (Module 2.2 / 12.1).
4. **Bước 2 — Test + tư vấn:** "Làm bài kiểm tra trình độ ngắn và trao đổi 1-1 với chuyên
   viên tư vấn."
5. **Bước 3 — Nhận lộ trình trong 24h:** "Nhận lộ trình học cá nhân hóa theo band mục tiêu
   trong vòng 24 giờ." — ghi rõ đây là **cam kết phản hồi 24h** (SLA nội bộ cho CSKH), không
   chỉ là chữ trang trí.
6. **Dải CTA band** dưới cùng: tiêu đề ngắn "Sẵn sàng bắt đầu?" + nút cam.

## 4. Trạng thái
- Tĩnh (không form trong section này — form nằm ở dải CTA, dùng chung state Module 2.2/12).
- Bước có icon/số rõ ràng, đúng thứ tự 1→2→3.
- Ghi chú (không phải UI state): mốc "24h" — cần chốt với khách tính theo giờ làm việc hay
  giờ thực; lead ngoài giờ hành chính/cuối tuần xử lý ra sao. Đồng bộ Google Sheets lỗi
  không được chặn CSKH nhận lead trong hệ thống chính.

## 5. Tham chiếu DESIGN.md (token cụ thể)
- Badge số: vòng tròn/pill nền `#2C3481`, chữ trắng 600.
- Card bước (nếu dùng card): nền `#FFFFFF`, bo 16–20px, viền `#E2E8F0`, không bóng.
- Đường nối: hairline `#E2E8F0` hoặc indigo mờ 1px.
- Dải CTA: nền `#2C3481` full-bleed, chữ trắng; nút cam `#F68C1F` + glow (1 nút duy nhất).
- Heading `#000000` 600; body `#717174`.

## 6. Nội dung mẫu (tiếng Việt)
- Eyebrow: `Quy trình đơn giản`
- Headline: `3 bước để có lộ trình IELTS của riêng bạn`
- `1. Điền thông tin` — `Để lại họ tên, SĐT và mục tiêu — chỉ 60 giây.`
- `2. Test + tư vấn` — `Làm bài kiểm tra trình độ ngắn và trao đổi 1-1 với chuyên viên tư vấn.`
- `3. Nhận lộ trình trong 24h` — `Nhận lộ trình học cá nhân hóa theo band mục tiêu trong vòng 24 giờ.`
- Dải CTA: `Sẵn sàng bắt đầu?` — nút `Kiểm tra trình độ miễn phí`
