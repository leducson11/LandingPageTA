# 10 — Prompt: Cam kết đầu ra (Section + Modal điều kiện)

> Nguồn: `requirements/10-cam-ket-dau-ra-module.docx`. Ghép với `00-base.md` trước khi generate.

---

**[Dán khối HỆ THỐNG THIẾT KẾ từ `00-base.md` vào đây]**

---

## 1. Mục tiêu màn hình
Tăng tin cậy bằng cam kết đầu ra rõ ràng + minh bạch điều kiện áp dụng (tránh hiểu lầm /
rủi ro pháp lý). Gồm 1 khối section + 1 **modal** "Điều kiện áp dụng". Hành động chính:
nút "Xem điều kiện áp dụng" (nút phụ/outline, KHÔNG cam nếu section này chung viewport với
dải CTA cam).

## 2. Layout & breakpoint
- **Section** nền indigo `#2C3481` full-bleed (khối màu tạo chiều sâu, không bóng) hoặc
  nền trắng với panel bo 20px — chọn nền indigo để nhấn. Padding dọc 64px, track 1200px.
  - Desktop: 2 cột — trái nội dung cam kết, phải minh hoạ/huy hiệu; hoặc 1 cột căn giữa.
  - Mobile: 1 cột.
- **Modal:** overlay tối mờ; hộp trắng bo 20px, `max-width` ~560px, căn giữa;
  `max-height: ~85vh` **cuộn nội bộ**; mobile chiếm ~92vw, nút đóng dễ chạm.

## 3. Danh sách thành phần
**Section:**
1. Eyebrow chip: "Cam kết đầu ra".
2. Headline: "Không đạt mục tiêu — hoàn học phí hoặc học lại miễn phí".
3. Đoạn mô tả ngắn cam kết (Body, chữ trắng nếu nền indigo).
4. 2–3 điểm nhấn dạng list có icon check.
5. **Nút "Xem điều kiện áp dụng"** — nút outline chữ trắng viền trắng mờ (trên nền indigo)
   / nút phụ indigo (trên nền trắng). Bắt buộc mở modal — KHÔNG được tồn tại mà không dẫn
   tới nội dung nào.

**Modal "Điều kiện áp dụng":**
6. Tiêu đề modal (Title) + nút X góc trên phải.
7. Nội dung **bắt buộc gồm 4 nhóm** (mỗi nhóm tiêu đề nhỏ + mô tả):
   - **Thời hạn áp dụng** (vd: đăng ký trong khung thời gian quy định).
   - **Yêu cầu chuyên cần** (vd: tỉ lệ tham gia buổi học, hoàn thành bài tập).
   - **Điều kiện thi** (vd: tham gia đủ bài kiểm tra giữa/cuối kỳ, thi trong thời hạn).
   - **Phạm vi áp dụng** (khóa nào, band nào, hình thức hoàn/học lại).
8. Ghi chú: "Điều kiện chi tiết theo hợp đồng đào tạo ký kết giữa học viên và Huyway."
9. Nút đóng dưới cùng (tuỳ chọn).

## 4. Trạng thái
- **Section mặc định:** hiển thị đầy đủ; nút luôn có nội dung để mở.
- **Modal đóng:** không render / `hidden`.
- **Modal mở:** focus-trap; đóng bằng **nút X**, **click ra ngoài overlay**, **phím Esc**;
  trả focus về nút "Xem điều kiện áp dụng" khi đóng.
- **Nội dung điều kiện dài:** modal cuộn nội bộ, không tràn màn hình.
- **Đóng bất thường (mất mạng / lỗi JS):** KHÔNG được khoá scroll trang nền vĩnh viễn —
  luôn khôi phục `overflow` của body.
- Nội dung 4 nhóm điều kiện hiện là **minh hoạ, chưa phải chính sách công bố** (xem
  `PRODUCT.md`) — đánh dấu rõ, chờ khách xác nhận.

## 5. Tham chiếu DESIGN.md (token cụ thể)
- Nền section indigo `#2C3481`, chữ trắng; list icon check trắng.
- Nút outline trên nền tối: nền trong suốt, viền trắng mờ, chữ trắng; hover viền đặc.
- Modal: nền `#FFFFFF`, bo 20px, viền `#E2E8F0` 1px, bóng float `0 12px 24px -8px rgba(15,23,42,.08)`.
  Overlay `rgba(15,23,42,.4)`.
- Tiêu đề nhóm điều kiện: Title 600 `#000000`; mô tả Body `#717174`.
- Focus-visible outline 2px `#2563EB` offset 2px.

## 6. Nội dung mẫu (tiếng Việt — điều kiện là minh hoạ, chờ xác nhận)
- Eyebrow: `Cam kết đầu ra`
- Headline: `Không đạt mục tiêu — hoàn học phí hoặc học lại miễn phí`
- Nút: `Xem điều kiện áp dụng`
- Modal tiêu đề: `Điều kiện áp dụng cam kết đầu ra`
- `Thời hạn áp dụng` — `Áp dụng cho học viên đăng ký và nhập học trong thời gian quy định của chương trình.`
- `Yêu cầu chuyên cần` — `Tham gia tối thiểu [X]% số buổi học và hoàn thành đầy đủ bài tập được giao.`
- `Điều kiện thi` — `Tham gia đủ các bài kiểm tra giữa kỳ và cuối kỳ; dự thi trong thời hạn cam kết.`
- `Phạm vi áp dụng` — `Áp dụng theo từng khóa/band mục tiêu đã thỏa thuận; hình thức xử lý (hoàn phí hoặc học lại) theo hợp đồng đào tạo.`
- Ghi chú: `Nội dung điều kiện đang chờ trung tâm xác nhận theo Điều 8 hợp đồng.`
