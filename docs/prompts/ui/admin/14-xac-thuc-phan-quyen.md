# 14 — Prompt: Xác thực & Phân quyền (Admin)

> Nguồn: `requirements/14-xac-thuc-phan-quyen-module.docx`. Ghép với `00-base.md` trước khi generate.
> Đây là cụm **nhiều màn hình** — generate lần lượt: (A) Đăng nhập, (B) Quản lý tài khoản,
> (C) Shell admin (sidebar + header) dùng chung.

---

**[Dán khối HỆ THỐNG THIẾT KẾ từ `00-base.md` vào đây]**

---

## Bối cảnh chung
Khu vực quản trị nội bộ ("Mini Admin"), giao diện tiếng Việt, mật độ cao hơn landing.
3 vai trò: **Super Admin**, **Marketing**, **CSKH**. Admin kế thừa indigo `#2C3481`,
Montserrat, grammar card hairline; control tương tác hiện dùng `#2563EB` (admin blue).
Nền app `#F5F7FA`, card padding 20px, bo 12px.

---

## MÀN HÌNH A — Đăng nhập CMS (14.1)

### 1. Mục tiêu
Nhân sự nội bộ đăng nhập bằng tài khoản riêng để vào đúng chức năng được phân quyền.
Hành động chính: nút "Đăng nhập".

### 2. Layout & breakpoint
- Trang độc lập, không sidebar. Nền: wash indigo nhạt → trắng (`#F1F2FC` → `#FFFFFF`)
  hoặc `#F5F7FA` phẳng. Căn giữa dọc + ngang.
- **Card đăng nhập:** `max-width` ~420px, nền trắng, bo 16px, viền hairline 1px, bóng
  float nhẹ, padding 32px.
- Mobile: card full-width `px-4`, vẫn căn giữa.

### 3. Thành phần
1. Logo lockup `HuyWay English` (chữ "English" cam) căn giữa + dòng "Đăng nhập vào hệ thống quản trị".
2. **Banner lỗi** (ẩn mặc định) — trên form: nền đỏ nhạt `#FEF2F2`, viền `#FECACA`, chữ
   `#B91C1C`, bo 8px.
3. **Field Email/Tài khoản** — label "Email", input cao 48px bo 12px viền hairline, icon
   mail dẫn đầu, placeholder `ten@huyway.com`.
4. **Field Mật khẩu** — label "Mật khẩu", input `type=password` + nút hiện/ẩn (icon eye),
   placeholder `••••••••`.
5. (Tuỳ chọn) checkbox "Ghi nhớ đăng nhập" + link "Quên mật khẩu?".
6. **Nút "Đăng nhập"** — full-width, cao 48px. Trên admin có thể dùng nút phụ indigo
   `#2C3481` (không cam — admin không dùng màu hành động cam của landing). Bo 8px.
7. Link "← Về trang chủ".
8. **KHÔNG hiển thị demo credentials** ở bản chính thức (bản hiện tại đang lộ — bỏ đi).

### 4. Trạng thái (đủ 4)
- **idle:** như trên, banner lỗi ẩn.
- **Lỗi validate:** email trống/sai định dạng, mật khẩu trống → helper đỏ dưới field, chặn submit.
- **loading:** nút → "Đang đăng nhập..." + spinner, disable; field khoá.
- **error — sai tài khoản/mật khẩu:** banner "Email hoặc mật khẩu không đúng." — **không
  tiết lộ** tài khoản có tồn tại hay không.
- **error — bị khoá tạm (rate-limit):** banner "Bạn đã nhập sai nhiều lần. Vui lòng thử
  lại sau [X] phút." *(đề xuất chống brute-force — cần khách xác nhận).*
- **success:** chuyển vào dashboard theo vai trò.
- **Chưa đăng nhập mà truy cập route admin:** redirect về màn hình này, không lộ dữ liệu.
- **Phiên hết hạn giữa lúc thao tác:** modal cảnh báo "Phiên đăng nhập đã hết hạn, vui
  lòng đăng nhập lại" (giữ tạm dữ liệu đang nhập nếu khả thi) trước khi đẩy về login.

### 5. Tham chiếu DESIGN.md
- Card `#FFFFFF`, bo 16px, viền `#E2E8F0`, bóng `0 12px 24px -8px rgba(15,23,42,.08)`, padding 32px.
- Input cao 48px, bo 12px, viền `#E2E8F0`, focus outline 2px `#2563EB` offset 2px, placeholder `#8A8A8D`.
- Nút: nền `#2C3481`, chữ trắng 600, bo 8px; hover `#242A6B`; disabled `opacity .7`.
- Banner lỗi: nền `#FEF2F2`, viền `#FECACA`, chữ `#B91C1C`.
- Heading `#000000` Montserrat 600; body `#717174`.

### 6. Nội dung mẫu (tiếng Việt)
- `Đăng nhập vào hệ thống quản trị`
- Label: `Email` · `Mật khẩu` — placeholder `ten@huyway.com` · `••••••••`
- Nút: `Đăng nhập` — loading `Đang đăng nhập...`
- Lỗi: `Email hoặc mật khẩu không đúng.`
- `Quên mật khẩu?` · `← Về trang chủ`

---

## MÀN HÌNH B — Quản lý tài khoản & phân quyền (14.2, chỉ Super Admin)

### 1. Mục tiêu
Super Admin tạo/sửa/khoá tài khoản và gán vai trò. Marketing & CSKH **không truy cập
được** màn hình này.

### 2. Layout
- Trong shell admin (sidebar + header). Vùng nội dung: tiêu đề trang + nút "Thêm tài khoản"
  (nút phụ indigo, góc phải).
- **Bảng tài khoản** trong card bo 12px viền hairline: cột Họ tên · Email · Vai trò (chip) ·
  Trạng thái (Đang hoạt động / Đã khoá) · Đăng nhập gần nhất · Thao tác (Sửa / Khoá).
- **Modal/panel Thêm–Sửa tài khoản:** Họ tên, Email, Vai trò (select: Super Admin /
  Marketing / CSKH), Trạng thái (toggle Hoạt động/Khoá), (khi tạo) mật khẩu tạm.
- Mobile: bảng → danh sách card.

### 3. Thành phần & quy tắc phân quyền (hiển thị trong UI)
- Chip vai trò: Super Admin (indigo đặc) · Marketing (indigo wash) · CSKH (indigo wash).
- Ghi chú quyền mỗi vai trò: Marketing → chỉ CMS nội dung (Module 16); CSKH → chỉ Lead
  (Module 15); Super Admin → toàn quyền + quản lý tài khoản.
- Nút **"Khoá"** (deactivate) thay vì xoá vĩnh viễn — giữ lịch sử thao tác.

### 4. Trạng thái
- **Bảng rỗng:** empty state "Chưa có tài khoản nào" + nút "Thêm tài khoản".
- **Lưu tài khoản:** loading nút → success toast "Đã lưu tài khoản" / error toast.
- **Chặn khoá Super Admin cuối cùng:** nếu chỉ còn 1 Super Admin active → nút Khoá bị
  disable + tooltip "Hệ thống phải luôn có ít nhất 1 Super Admin hoạt động."
- **Đổi vai trò tài khoản đang đăng nhập:** thông báo "Quyền mới có hiệu lực ở lần đăng
  nhập tiếp theo."
- **Marketing/CSKH mở URL màn hình này:** trang 403 "Bạn không có quyền truy cập" + nút về dashboard.

### 5. Tham chiếu DESIGN.md
- Card/bảng: nền `#FFFFFF`, bo 12px, viền `#E2E8F0`, card rest shadow admin.
- Header bảng: Label 600 UPPERCASE tracking nhẹ, `#8A8A8D`.
- Row hover: nền `#F5F7FA`.
- Chip vai trò: pill; Super Admin nền `#2C3481` chữ trắng, còn lại nền `#F1F2FC` chữ `#2C3481`.
- Chip trạng thái: Hoạt động = xanh lá status `#16A34A` nền nhạt; Đã khoá = `#8A8A8D` nền xám.
- Nút thêm/lưu: nền `#2C3481`, chữ trắng, bo 8px.
- Focus outline 2px `#2563EB`.

### 6. Nội dung mẫu (tiếng Việt)
- Tiêu đề: `Quản lý tài khoản`
- Nút: `Thêm tài khoản`
- Cột: `Họ tên` · `Email` · `Vai trò` · `Trạng thái` · `Đăng nhập gần nhất` · `Thao tác`
- Vai trò: `Super Admin` · `Marketing` · `CSKH`
- Trạng thái: `Đang hoạt động` · `Đã khoá`
- Ràng buộc: `Hệ thống phải luôn có ít nhất 1 Super Admin hoạt động.`

---

## MÀN HÌNH C — Shell admin dùng chung (sidebar + header)

### Layout
- **Sidebar trái** 240px (thu còn 76px icon-rail; off-canvas + scrim dưới `lg`), nền trắng,
  hairline phải 1px. Trên: ô logo "H" nền indigo + "HUYWAY ENGLISH" + "Hệ thống quản trị nội bộ".
  Giữa: nhóm "MENU QUẢN TRỊ" + list nav. Dưới: chỉ báo trạng thái đồng bộ + nút "Thu gọn".
- **Nav item:** icon lucide + nhãn, cao ~36px, bo 8px (`--radius-control`); active = nền
  indigo wash `#F1F2FC` + chữ/icon indigo + `aria-current="page"`; badge số (vd Lead mới)
  pill đỏ bên phải.
- **Menu theo vai trò** (ẩn mục không có quyền — không chỉ ẩn nút):
  - Super Admin: Tổng quan · Quản lý Leads · Quản lý Content Landing · Quản lý tài khoản ·
    Báo cáo & Thống kê · (Danh sách khách hàng, Ngân sách & Quyền, Nhân viên, Khóa học — theo lộ trình).
  - Marketing: Tổng quan · Quản lý Content Landing · Báo cáo.
  - CSKH: Tổng quan · Quản lý Leads.
- **Header admin** (trên vùng nội dung): tiêu đề trang / breadcrumb bên trái; bên phải
  chuông thông báo + avatar user (menu: Hồ sơ, Đăng xuất).
- Vùng nội dung: nền `#F5F7FA`, tối đa 1600px, padding 20–24px.

### Trạng thái
- Sidebar collapsed / expanded; mobile open/close với scrim.
- **Đăng xuất chủ động** từ menu avatar → về màn hình đăng nhập.
- **Session timeout** → cảnh báo rồi đẩy về login.

### Tham chiếu DESIGN.md
- Sidebar nền `#FFFFFF`, hairline `#E2E8F0`; item active nền `#F1F2FC` chữ `#2C3481`.
- Ô logo: nền `#2C3481`, chữ trắng 600, bo 8px.
- Badge: pill đỏ `#EF4444` chữ trắng 10px.
- Nội dung nền `#F5F7FA`; card `#FFFFFF` bo 12px viền hairline.
- Focus outline 2px `#2563EB` offset 2px.

### Ràng buộc (không phải UI, ghi để nhớ)
- Mật khẩu lưu dạng hash. Phân quyền kiểm tra cả frontend (ẩn UI) lẫn backend (chặn API).
