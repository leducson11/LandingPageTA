# 15 — Prompt: Quản lý Lead / Đăng ký tư vấn (Admin)

> Nguồn: `requirements/15-quan-ly-lead-module.docx`. Ghép với `00-base.md` + shell admin (Module 14C).
> Cụm **nhiều màn hình**: (A) Danh sách Lead, (B) Chi tiết / cập nhật trạng thái Lead,
> (C) Nhập liệu thủ công (Hotline), (D) Trạng thái đồng bộ Google Sheets.

---

**[Dán khối HỆ THỐNG THIẾT KẾ từ `00-base.md` vào đây]**

---

## Bối cảnh
Người dùng: **CSKH** (và Super Admin). Trong shell admin. Mục tiêu: xử lý toàn bộ Lead
(form online + Hotline) đúng thứ tự, không bỏ sót. DB nội bộ là source of truth; Google
Sheets chỉ là bản sao đồng bộ.

---

## MÀN HÌNH A — Danh sách đăng ký (15.1)

### 1. Mục tiêu
CSKH lọc/xem Lead theo ngày & trạng thái tư vấn để ưu tiên xử lý. Hành động chính: mở
Lead để xử lý; nút "Nhập Lead thủ công".

### 2. Layout & breakpoint
- Header trang: tiêu đề "Quản lý Leads" + nút phụ indigo "Nhập Lead thủ công" (phải).
- **Hàng bộ lọc** trong card: khoảng ngày (date range), trạng thái tư vấn (select/segmented:
  Tất cả / Mới / Đang tư vấn / Đã chốt / Không liên hệ được), nguồn (Tất cả / Form Hero /
  CTA band / Nhập tay - Hotline), ô tìm theo tên/SĐT. Nút "Xoá lọc".
- (Tuỳ chọn) hàng KPI nhỏ: Tổng Lead · Mới hôm nay · Chưa xử lý > 2h (đỏ).
- **Bảng Lead** trong card bo 12px viền hairline:
  cột **Họ tên · SĐT · Email · Khóa quan tâm · Trình độ · Nguồn · Thời gian gửi · Trạng
  thái (chip) · Thao tác**. Row bấm mở chi tiết. Phân trang dưới.
- Mobile: bảng → list card (tên + SĐT + chip trạng thái + thời gian; tap mở chi tiết).

### 3. Thành phần
- Chip trạng thái: Mới (indigo đặc) · Đang tư vấn (indigo wash) · Đã chốt (xanh lá status) ·
  Không liên hệ được (xám).
- Lead **quá 2h chưa xử lý**: cờ "Cần xử lý gấp" (chấm/nhãn đỏ) trên row.
- Nguồn: nhãn nhỏ phân biệt "Form Hero" / "CTA band" / "Nhập tay - Hotline".
- Thao tác nhanh trên row: đổi trạng thái (dropdown), gọi (`tel:`).

### 4. Trạng thái
- **idle:** bảng có dữ liệu + phân trang.
- **loading:** skeleton rows.
- **Danh sách rỗng theo bộ lọc:** empty state rõ ràng — icon + "Không có Lead nào khớp bộ
  lọc" + nút "Xoá lọc". KHÔNG màn trắng / lỗi.
- **Chưa có Lead nào (hệ thống mới):** empty state "Chưa có Lead nào" + nút "Nhập Lead thủ công".
- **error tải danh sách:** banner "Không tải được danh sách Lead" + nút "Thử lại".
- **Cập nhật trạng thái:** optimistic + toast "Đã cập nhật trạng thái" / rollback + error toast.

---

## MÀN HÌNH B — Chi tiết Lead & cập nhật trạng thái

### Layout
- Panel trượt phải (drawer) hoặc trang riêng. Header: tên Lead + chip trạng thái + nút X.
- Khối thông tin: tất cả field Lead (chỉ đọc) + nguồn + thời gian gửi + timestamp đồng ý
  consent + trạng thái đồng bộ Sheets.
- Khối xử lý: **select trạng thái tư vấn** + ô ghi chú CSKH (textarea) + nút "Lưu".
- Lịch sử: timeline thay đổi trạng thái (ai / khi nào).

### Trạng thái
- Lưu: loading nút → success toast / error (giữ ghi chú đã nhập).
- Consent: hiển thị "Đã đồng ý chính sách lúc [dd/mm/yyyy hh:mm]" (phục vụ tuân thủ).

---

## MÀN HÌNH C — Nhập liệu thủ công (15.2)

### 1. Mục tiêu
CSKH nhập tay Lead từ khách gọi Hotline. Không bỏ sót kênh ngoài form online.

### 2. Layout
- Modal hoặc trang: form có **tối thiểu cùng field với Form Lead online (Module 2.2)** —
  Họ tên*, SĐT*, Email, Khóa quan tâm, Trình độ, Nhu cầu học tập + ô ghi chú. Validate cơ bản.
- Nguồn tự gắn cố định: **"Nhập tay - Hotline"** (hiển thị badge, không sửa).

### 3. Trạng thái (đủ 4)
- idle · lỗi validate inline (SĐT VN, email nếu nhập) · loading (nút "Đang lưu...", disable) ·
  success (toast "Đã thêm Lead" + đóng modal, refresh danh sách) · error ("Lưu không
  thành công, thử lại", giữ dữ liệu).
- **Trùng SĐT/Email đã tồn tại:** cảnh báo "Đã có Lead với số điện thoại này" + nút "Xem
  bản ghi cũ" / "Vẫn tạo mới" — cho phép xem/hợp nhất thay vì tạo bản ghi trùng.

---

## MÀN HÌNH D — Trạng thái đồng bộ Google Sheets (15.3)

### Hiển thị
- Chỉ báo ở sidebar footer + 1 khu vực trong trang Lead: "Đồng bộ Google Sheets: Hoạt
  động — cập nhật lần cuối [hh:mm]".
- Trạng thái: **Hoạt động** (chấm xanh) · **Đang thử lại** (chấm vàng) · **Lỗi** (chấm đỏ
  + "Xem log" / nút "Đồng bộ lại"). Mỗi Lead mới đẩy sang Sheets gần như tức thời.
- **Lỗi đồng bộ KHÔNG làm mất Lead trong hệ thống chính**; có retry + log để Admin biết,
  đồng bộ bù sau.
- (Lưu ý: chỉ báo "Google Sheets API Active" trong build hiện tại là **mock** — cần nối thật.)

---

## Tham chiếu DESIGN.md (áp cho cả 4 màn)
- Nền vùng nội dung `#F5F7FA`; card `#FFFFFF` bo 12px viền `#E2E8F0`, card rest shadow admin,
  padding 20px.
- Header bảng: Label 600 UPPERCASE tracking nhẹ màu `#8A8A8D`; row hover nền `#F5F7FA`;
  divider hàng hairline `#E2E8F0`.
- Chip trạng thái (pill): Mới `#2C3481`/trắng · Đang tư vấn `#F1F2FC`/`#2C3481` · Đã chốt
  `#16A34A` nền nhạt · Không liên hệ được `#8A8A8D` nền xám. Cờ gấp: `#EF4444`.
- Nút chính admin: nền `#2C3481` chữ trắng bo 8px (KHÔNG cam).
- Input cao 48px bo 12px viền hairline; lỗi viền `#EF4444` + helper đỏ; focus outline 2px `#2563EB`.
- Drawer: nền `#FFFFFF`, bóng float, overlay `rgba(15,23,42,.4)`; đóng bằng X / click ngoài / Esc.
- Toast: bo 12px, viền hairline, icon trạng thái; tự ẩn ~4s.

## Nội dung mẫu (tiếng Việt)
- Tiêu đề: `Quản lý Leads` — nút `Nhập Lead thủ công`
- Lọc trạng thái: `Tất cả` · `Mới` · `Đang tư vấn` · `Đã chốt` · `Không liên hệ được`
- Cột: `Họ tên` · `SĐT` · `Email` · `Khóa quan tâm` · `Trình độ` · `Nguồn` · `Thời gian gửi` · `Trạng thái` · `Thao tác`
- Nguồn: `Form Hero` · `CTA band` · `Nhập tay - Hotline`
- Empty (lọc): `Không có Lead nào khớp bộ lọc` — nút `Xoá lọc`
- Trùng: `Đã có Lead với số điện thoại này.` — `Xem bản ghi cũ` / `Vẫn tạo mới`
- Đồng bộ: `Đồng bộ Google Sheets: Hoạt động — cập nhật lần cuối 14:32`
- Consent: `Đã đồng ý chính sách lúc 08/09/2026 09:15`
