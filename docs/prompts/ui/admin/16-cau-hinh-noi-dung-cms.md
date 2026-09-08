# 16 — Prompt: Cấu hình nội dung Landing Page (CMS)

> Nguồn: `requirements/16-cau-hinh-noi-dung-cms-module.docx`. Ghép với `00-base.md` + shell admin (Module 14C).
> Cụm **nhiều màn hình**: (A) Danh sách block nội dung, (B) Trình sửa 1 block, (C) Quản lý
> ảnh/upload, (D) Lịch sử chỉnh sửa.

---

**[Dán khối HỆ THỐNG THIẾT KẾ từ `00-base.md` vào đây]**

---

## Bối cảnh
Người dùng: **Marketing** (và Super Admin). CSKH **không có quyền**. Mục tiêu: Marketing
tự sửa văn bản/hình ảnh các section Landing Page theo chiến dịch, không cần lập trình
viên, không deploy lại code. Nội dung lưu DB, có audit log.

Các block sửa được (theo SRS Phụ lục II mục 2.1): **Hero, Trust Bar, Pain Points, Lộ trình
khóa học, Đội ngũ giáo viên, Testimonials, FAQ, Cam kết đầu ra, Social links, Hotline/Email.**

---

## MÀN HÌNH A — Danh sách block nội dung

### Layout
- Trong shell admin. Tiêu đề "Quản lý Content Landing" + (tuỳ chọn) nút "Xem trang thật" (mở landing tab mới).
- **Lưới card block**, mỗi card = 1 section landing:
  - Tên block (Title) + icon.
  - Tóm tắt trạng thái: "Đã cấu hình" / "Đang dùng nội dung mặc định" / "Đang ẩn".
  - Ngày sửa gần nhất + người sửa.
  - Nút "Chỉnh sửa".
- Mobile: 1 cột.

### Trạng thái
- Block bị Marketing xoá hết nội dung → nhãn "Section sẽ tự ẩn trên landing" (cảnh báo nhẹ,
  liên kết Module 5/9/11) — không phải lỗi.

---

## MÀN HÌNH B — Trình sửa 1 block (16.1, màn chính)

### 1. Mục tiêu
Sửa text + ảnh của 1 block, xem trước, lưu → phản ánh lên landing không cần deploy.

### 2. Layout & breakpoint
- **2 cột (desktop):**
  - Trái ~45%: form các field của block (tiêu đề section, mô tả, danh sách item...).
  - Phải ~55%: **preview** render gần giống section thật (theo DESIGN.md), cập nhật khi gõ.
- Mobile: form trên, preview dưới (hoặc tab "Sửa" / "Xem trước").
- Thanh hành động dính đáy: "Huỷ" · "Lưu bản nháp" (tuỳ chọn) · "Lưu & xuất bản".

### 3. Thành phần theo loại block
- **Hero:** headline, sub-headline, dòng social proof, danh sách 3 lợi ích (thêm/xoá/sắp xếp).
- **Trust Bar:** 4 cặp {số liệu, nhãn, caption nguồn} — mỗi ô bật/tắt hiển thị.
- **Pain Points / FAQ / Testimonials:** list item lặp — mỗi item {tiêu đề/câu hỏi, mô tả/
  trả lời (+ ảnh với testimonial)}, kéo-thả sắp thứ tự, nút thêm/xoá. Gợi ý giới hạn item.
- **Lộ trình khóa học:** 3 nhóm {tên khóa, band, mô tả, bullets, nhãn CTA}.
- **Đội ngũ giáo viên:** list hồ sơ {ảnh, tên, chứng chỉ (chip), năm KN, mô tả}.
- **Cam kết đầu ra:** headline, mô tả, 4 nhóm điều kiện modal.
- **Social links / Hotline-Email:** {kênh, URL/giá trị, bật-tắt}.
- Mỗi field text có đếm ký tự; field bắt buộc (vd tiêu đề section) đánh dấu `*`.

### 4. Trạng thái (đủ 4)
- **idle:** form + preview.
- **Lỗi validate:** field bắt buộc trống (vd tiêu đề section) → helper đỏ, chặn lưu.
- **loading (đang lưu):** nút "Đang lưu..." disable.
- **success:** toast "Đã xuất bản. Thay đổi đã hiển thị trên Landing Page." + cập nhật
  "sửa gần nhất".
- **error:** toast "Lưu không thành công, thử lại" — giữ nội dung đang nhập.
- **Upload ảnh sai kích thước/định dạng:** cảnh báo + tự resize/nén nếu được — không để
  ảnh vỡ layout / nặng trang.
- **Xung đột chỉnh sửa (2 Marketing cùng sửa 1 block):** tối thiểu "người lưu sau ghi đè";
  nếu được: cảnh báo "Nội dung vừa được [tên] cập nhật lúc [hh:mm]. Tải lại trước khi lưu?".
- **Xoá hết nội dung 1 section (vô tình):** trước khi lưu hiện xác nhận "Section này sẽ tự
  ẩn trên Landing Page. Tiếp tục?".

### 5. Tham chiếu DESIGN.md
- Card/panel `#FFFFFF` bo 12px viền `#E2E8F0`, padding 20px, nền vùng `#F5F7FA`.
- Input/textarea cao 48px+ bo 12px viền hairline; focus outline 2px `#2563EB`; lỗi viền `#EF4444`.
- Vùng preview: render đúng token landing (Montserrat, indigo `#2C3481`, cam `#F68C1F` chỉ
  1 nút/viewport, card bo 16–20px hairline).
- Nút chính: nền `#2C3481` chữ trắng bo 8px. Nút phụ: outline indigo.
- Kéo-thả item: handle icon `#8A8A8D`, row nền `#F5F7FA` khi kéo.
- Upload: vùng dropzone bo 12px viền dashed `#E2E8F0`, icon upload `#8A8A8D`.

---

## MÀN HÌNH C — Quản lý ảnh
- Lưới thumbnail ảnh đã upload; mỗi ảnh: tên, kích thước, nơi đang dùng. Nút xoá (chặn xoá
  ảnh đang được block dùng, hoặc cảnh báo).
- Dropzone kéo-thả; hiển thị tiến trình upload; báo lỗi định dạng/kích thước.

## MÀN HÌNH D — Lịch sử chỉnh sửa (audit log)
- Bảng: Thời gian · Người sửa · Block · Tóm tắt thay đổi. Tối thiểu ghi ai sửa / khi nào.
- Lọc theo block, theo người, theo khoảng ngày.

## Ràng buộc (ghi để nhớ, không phải UI)
- Chỉ Marketing + Super Admin sửa CMS; CSKH ẩn hoàn toàn menu này (Module 14.2).
- Nội dung lưu DB; thay đổi phản ánh lên landing không cần deploy.

## Nội dung mẫu (tiếng Việt)
- Tiêu đề: `Quản lý Content Landing`
- Trạng thái block: `Đã cấu hình` · `Đang dùng nội dung mặc định` · `Đang ẩn`
- Nút: `Chỉnh sửa` · `Lưu & xuất bản` · `Lưu bản nháp` · `Huỷ`
- Success: `Đã xuất bản. Thay đổi đã hiển thị trên Landing Page.`
- Cảnh báo ẩn section: `Section này sẽ tự ẩn trên Landing Page. Tiếp tục?`
- Xung đột: `Nội dung vừa được {tên} cập nhật lúc {hh:mm}. Tải lại trước khi lưu?`
