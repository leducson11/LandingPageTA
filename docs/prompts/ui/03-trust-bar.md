# 03 — Prompt: Thanh số liệu tin cậy (Trust Bar)

> Nguồn: `requirements/03-trust-bar-module.docx`. Ghép với `00-base.md` trước khi generate.

---

**[Dán khối HỆ THỐNG THIẾT KẾ từ `00-base.md` vào đây]**

---

## 1. Mục tiêu màn hình
Social proof nhanh ngay đầu trang bằng 4 số liệu định lượng, tăng tin cậy trước khi khách
đọc sâu. Không có hành động (không nút). Nằm ngay dưới Hero.

## 2. Layout & breakpoint
- Dải ngang full-bleed nền **slate `#F1F5F9`** (tách band không thêm màu), padding dọc
  ~32–40px, nội dung trong track 1200px.
- **Desktop:** 4 cột chia đều 1 hàng, phân cách bằng hairline dọc mảnh hoặc chỉ khoảng cách.
- **Mobile:** lưới 2×2 (hoặc strip cuộn ngang). Số lớn không vỡ layout.

## 3. Danh sách thành phần
4 ô số liệu, mỗi ô = [số lớn] + [nhãn] + [caption nguồn nhỏ]:
1. **Số học viên đã học** — vd "10,000+" · nhãn "Học viên đã học".
2. **Tỷ lệ hài lòng** — vd "95%" · nhãn "Học viên hài lòng".
3. **Band điểm giáo viên** — vd "8.0+" · nhãn "IELTS trung bình giảng viên".
4. **Số năm kinh nghiệm** — vd "10 năm" · nhãn "Kinh nghiệm đào tạo".
- Số lớn: Montserrat 600, ~`clamp(1.5rem,3vw,2rem)`, màu indigo `#2C3481` hoặc `#000000`.
- Nhãn: Body `#717174`.
- **Caption nguồn** (Label, Ink Muted `#8A8A8D`, ~12px): vd "Khảo sát nội bộ, T6/2026" —
  bắt buộc có để không bị xem là tuyên bố marketing thiếu kiểm chứng.
- Số định dạng có dấu phân cách hàng nghìn ("10,000").

## 4. Trạng thái
- **Mặc định:** 4 số hiển thị. Nếu bật hiệu ứng count-up: chỉ chạy khi cuộn tới, và
  **tôn trọng `prefers-reduced-motion`** (hiện số tĩnh ngay).
- **Chưa có số liệu thật tại launch:** KHÔNG hiển thị số giả định. Dùng placeholder rõ
  ("Đang cập nhật") hoặc ẩn ô đó tới khi có dữ liệu xác thực. Số liệu lấy từ CMS (Module 16),
  không hard-code.
- **Số rất lớn:** không tràn ô trên mobile (giảm cỡ chữ / xuống dòng nhãn).

## 5. Tham chiếu DESIGN.md (token cụ thể)
- Nền dải `#F1F5F9`.
- Số: `#2C3481` (hoặc `#000000`), Montserrat 600.
- Nhãn `#717174` 16px; caption `#8A8A8D` 12px.
- Divider dọc (nếu có): hairline `#E2E8F0` 1px.
- Không card, không bóng — đây là dải phẳng.

## 6. Nội dung mẫu (tiếng Việt — tất cả là placeholder chờ xác nhận)
- `10,000+` — `Học viên đã học` — `Số liệu đang chờ xác nhận`
- `95%` — `Học viên hài lòng` — `Khảo sát nội bộ, đang chờ xác nhận`
- `8.0+` — `IELTS trung bình giảng viên` — `Đang chờ xác nhận`
- `10 năm` — `Kinh nghiệm đào tạo` — `Đang chờ xác nhận`
