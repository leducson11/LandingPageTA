# 17 — Prompt: Chính sách & Logic hệ thống (Cross-cutting)

> Nguồn: `requirements/17-chinh-sach-he-thong-module.docx`. Ghép với `00-base.md` trước khi generate.
> Cụm màn hình/thành phần: (A) Modal/trang Chính sách bảo vệ dữ liệu cá nhân, (B) Trang lỗi
> 404, (C) Trang lỗi 500, (D) Chuẩn form dùng chung (idle/loading/success/error).
> *(Đặt trong `admin/` chỉ để gom theo file requirement; thực tế A–C thuộc landing.)*

---

**[Dán khối HỆ THỐNG THIẾT KẾ từ `00-base.md` vào đây]**

---

## MÀN HÌNH A — Chính sách bảo vệ dữ liệu cá nhân (17.1)

### 1. Mục tiêu
Khách đọc được chính sách trước khi đồng ý cung cấp thông tin. Mở từ **checkbox consent
form Lead (Module 2.2)** và **footer (Module 13.3)**.

### 2. Layout
- **Ưu tiên: trang riêng** `/chinh-sach-bao-ve-du-lieu-ca-nhan` (dễ SEO, dễ share) —
  header + footer landing, nội dung trong track hẹp ~760px, typography đọc tốt: H1 + mục
  lục neo + các mục `<h2>` đánh số theo Điều 8 hợp đồng.
- **Kèm biến thể modal** (khi mở từ checkbox): hộp trắng bo 20px, `max-height ~85vh` cuộn
  nội bộ, tiêu đề + nút X; link "Mở trang đầy đủ".
- Mobile: 1 cột, mục lục có thể thu gọn.

### 3. Thành phần
- H1 "Chính sách bảo vệ dữ liệu cá nhân".
- Dòng "Cập nhật lần cuối: [dd/mm/yyyy]" + (đề xuất) "Phiên bản: [x]".
- Mục lục neo tới các phần: mục đích thu thập, loại dữ liệu, cơ sở pháp lý, thời gian lưu,
  bên thứ ba (Google Sheets), quyền của chủ thể dữ liệu, liên hệ.
- Nội dung đầy đủ **theo Điều 8** hợp đồng/phụ lục (placeholder tới khi khách cấp bản chính thức).

### 4. Trạng thái
- Modal: focus-trap, đóng bằng X / click ngoài / Esc, trả focus về checkbox; không khoá
  scroll nền vĩnh viễn.
- Nội dung dài: cuộn nội bộ (modal) / cuộn trang (trang riêng).
- **Chính sách cập nhật sau khi khách đã đồng ý bản cũ:** (đề xuất compliance) ghi nhận
  version khách đã đồng ý — hiển thị lịch sử version ở cuối trang.

### 5. Tham chiếu DESIGN.md
- Trang: nền `#FFFFFF`, track ~760px, Body `#717174` 16px/1.6, `<h2>` Title/Headline 600 `#000000`.
- Modal: nền `#FFFFFF` bo 20px viền `#E2E8F0`, bóng float, overlay `rgba(15,23,42,.4)`.
- Link trong văn bản: `#2C3481`, gạch chân khi hover.
- Mục lục: chip/list indigo wash cho mục đang xem.

---

## MÀN HÌNH B — Trang lỗi 404 (17.2)

### Layout & thành phần
- Full-page căn giữa, header + footer landing (rút gọn được).
- Minh hoạ nhẹ theo tinh thần "Open Door" (ô cửa/sách mảnh, tông indigo) — không loè loẹt.
- Mã "404" lớn (Display, `#2C3481` hoặc `#E1E4F5`), tiêu đề "Không tìm thấy trang",
  mô tả "Trang bạn tìm không tồn tại hoặc đã được chuyển đi."
- **Nút "Về trang chủ"** (nút cam — đây là hành động chính duy nhất của trang này) + link
  phụ "Xem lộ trình khóa học".
- Ô tìm kiếm (tuỳ chọn).

### Trạng thái
- Tĩnh. Truy cập URL không tồn tại → tự render trang này (không phải lỗi mặc định server/browser).

---

## MÀN HÌNH C — Trang lỗi 500 (17.2)

### Layout & thành phần
- Giống 404 về bố cục. Mã "500", tiêu đề "Đã có lỗi xảy ra", mô tả "Hệ thống đang gặp sự
  cố tạm thời. Vui lòng thử lại sau ít phút."
- Nút "Tải lại trang" (cam) + "Về trang chủ" (phụ indigo).
- **Fallback tĩnh tối giản:** phải có bản 500 **không phụ thuộc backend/JS** (chỉ HTML+CSS
  inline) phòng lỗi 500 xảy ra ngay tại trang lỗi (vòng lặp lỗi).

### Trạng thái
- Tĩnh. Ghi log lỗi phía server (không hiển thị chi tiết kỹ thuật cho khách).

---

## THÀNH PHẦN D — Chuẩn form & trạng thái dùng chung (17.4)

Áp cho **mọi form**: Hero (2.2), CTA lặp lại (12), Nhập tay admin (15.2).

### 4 trạng thái UI bắt buộc
| Trạng thái | Biểu hiện |
|---|---|
| **idle** | Field trống/mặc định, nút bật, không thông báo. |
| **loading** | Nút → nhãn "Đang gửi..." + spinner, `disabled`; field khoá nhẹ; chống double-submit. |
| **success** | Thay form bằng khối xác nhận (icon check tròn indigo + tiêu đề + mô tả + nút phụ). |
| **error** | Banner lỗi chung phía trên nút + nút "Thử lại"; giữ nguyên dữ liệu đã nhập; có timeout, không kẹt loading. |

### Quy tắc validate (client + server cùng bộ luật)
- **Bắt buộc:** Họ tên, SĐT, Email, checkbox consent.
- **Email:** định dạng hợp lệ (chờ khách chốt có ép `@gmail.com` không).
- **SĐT VN:** 10 số, đầu `03/05/07/08/09`; chuẩn hoá khoảng trắng / dấu `-` trước khi validate.
- **Lỗi hiển thị inline per-field:** viền field → `#EF4444`, helper text đỏ 12–14px bên
  dưới (KHÔNG dùng `alert()`).
- Consent **không tick sẵn**; lưu timestamp đồng ý cùng bản ghi.

### Tham chiếu DESIGN.md
- Input cao 48px bo 12px viền `#E2E8F0`; focus outline 2px `#2563EB` offset 2px; placeholder `#8A8A8D`.
- Lỗi: viền `#EF4444`, helper `#EF4444`.
- Nút submit landing: cam `#F68C1F` + glow; nút submit admin: indigo `#2C3481`.
- Success icon tile: nền `#F1F2FC`, check `#2C3481`, bo `rounded-2xl`/pill.
- Banner error: nền `#FEF2F2`, viền `#FECACA`, chữ `#B91C1C`, bo 8px.

### Ràng buộc (ghi để nhớ)
- HTTPS toàn site; tuân thủ quy định bảo vệ dữ liệu cá nhân VN.
- Có `sitemap.xml`, `robots.txt`.
- Meta SEO (17.3): mọi trang chính có `<title>`, `meta description`, `favicon`, Open Graph
  (`og:title/description/image`); có **default OG image** phòng khi chưa cấu hình; cấu hình
  SEO không sửa code cứng.
- Mọi form nối DB thật — không còn mock/`console.log` ở bản phát hành.

## Nội dung mẫu (tiếng Việt)
- `Chính sách bảo vệ dữ liệu cá nhân` — `Cập nhật lần cuối: __/__/____`
- 404: `Không tìm thấy trang` — `Trang bạn tìm không tồn tại hoặc đã được chuyển đi.` — nút `Về trang chủ`
- 500: `Đã có lỗi xảy ra` — `Hệ thống đang gặp sự cố tạm thời. Vui lòng thử lại sau ít phút.` — nút `Tải lại trang`
- Form success: `Đã nhận thông tin của bạn!` — `CSKH sẽ liên hệ trong vòng 24h để tư vấn lộ trình.`
- Form error: `Gửi không thành công, vui lòng thử lại.`
- Lỗi field: `Email không hợp lệ` · `Số điện thoại không hợp lệ` · `Vui lòng đồng ý với chính sách để tiếp tục`
