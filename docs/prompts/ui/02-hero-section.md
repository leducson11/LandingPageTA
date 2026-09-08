# 02 — Prompt: Hero Section

> Nguồn: `requirements/02-hero-section-module.docx`. Ghép với `00-base.md` trước khi generate.

---

**[Dán khối HỆ THỐNG THIẾT KẾ từ `00-base.md` vào đây]**

---

## 1. Mục tiêu màn hình
Above-the-fold: truyền tải ngay pain point + định vị, và thu Lead qua form "Kiểm tra
trình độ miễn phí" tại vị trí giá trị nhất trang. Hành động chính duy nhất: **nút cam
submit form** (đây là nút cam của viewport này — Quy tắc Wayfinder).

## 2. Layout & breakpoint
- **Section** `id="dang-ky"`, nền wash slate `#F1F5F9`, padding trên đủ để không bị
  header/topbar che (`pt-24` mobile / `pt-32` desktop), padding dọc 64px.
- **Desktop** (`≥768px`): 2 cột trong track 1200px, gutter 80px, gap ~48px.
  - Trái (~55%): H1 + sub-headline + dòng social proof + 3 gạch đầu dòng lợi ích.
  - Phải (~45%): **card form nổi** — bo 20px, nền trắng, viền hairline 1px, bóng float
    `0 12px 24px -8px rgba(15,23,42,.08)`, padding 32px.
- **Mobile** (`<768px`): 1 cột — H1 → sub-headline → card form (full-width, bo 20px) →
  3 lợi ích xếp dọc. Headline không bị ảnh nền che, không bị cắt.
- Nội dung do Marketing nhập dài bất thường: `word-wrap` / `line-clamp`, không vỡ layout.

## 3. Danh sách thành phần
**Cột nội dung (trái):**
1. **H1 (Display):** "Chưa biết nên bắt đầu IELTS từ đâu?" — Montserrat 600, màu `#000000`,
   `clamp(1.875rem,4vw,2.25rem)`, `-0.01em`.
2. **Sub-headline (Body):** "Kiểm tra trình độ và nhận tư vấn lộ trình phù hợp với bạn."
3. **Dòng social proof (Label 600, indigo):** "Hơn 10,000+ học viên đã đạt mục tiêu IELTS"
   *(số liệu placeholder — chờ xác nhận)*.
4. **3 chip lợi ích:** mỗi cái = ô icon bo `rounded-2xl` nền indigo wash + check icon
   indigo + text: "Giảng viên 8.0+ IELTS" · "Lộ trình cá nhân hóa" · "Học online linh hoạt".

**Card form (phải):**
5. **Tiêu đề form (Title):** "Nhận lộ trình IELTS miễn phí" + phụ đề "Chỉ trong 60 giây".
6. **Các field** (đủ theo SRS, cao 48px, bo 12px, viền hairline, icon lucide dẫn đầu):
   - Họ và tên *(bắt buộc)* — icon user.
   - Số điện thoại *(bắt buộc)* — icon phone, prepend `+84` in đậm, `inputmode="tel"`.
   - Email *(bắt buộc)* — icon mail.
   - Khóa học quan tâm — select (Nền tảng / Trung cấp / Nâng cao).
   - Trình độ hiện tại — select (Chưa biết / Mất gốc / 4.0–5.0 / 5.0–6.0 / 6.0+).
   - Nhu cầu học tập — select hoặc textarea ngắn (Thi IELTS / Giao tiếp / Du học / Công việc).
7. **Checkbox consent** — KHÔNG tick sẵn khi tải trang. Nhãn đúng nguyên văn:
   > "Tôi đồng ý để Huyway thu thập và xử lý thông tin tôi cung cấp nhằm mục đích liên hệ,
   > tư vấn khóa học và hỗ trợ đăng ký học theo Chính sách bảo vệ dữ liệu cá nhân."
   Chữ "Chính sách bảo vệ dữ liệu cá nhân" là link mở modal (Module 17.1).
8. **Nút submit (cam, hành động):** "Kiểm tra trình độ miễn phí" — nền `#F68C1F`, chữ
   trắng 600, bo 12px, orange glow, full-width, cao 48px.
9. **Dòng trấn an nhỏ (Ink Muted):** "🔒 100% miễn phí • Bảo mật thông tin".

## 4. Trạng thái (form — đủ 4 theo Module 17.4)
- **idle:** như mô tả trên; checkbox chưa tick; nút cam bật.
- **Lỗi validate inline (per-field):**
  - Field bắt buộc bỏ trống + submit → chặn submit, viền field → `#EF4444`, helper đỏ
    dưới field.
  - Email sai định dạng (khi blur/submit) → "Email không hợp lệ".
  - SĐT không đúng định dạng VN (10 số, đầu 03/05/07/08/09; chuẩn hoá khoảng trắng / gạch
    ngang trước khi validate) → "Số điện thoại không hợp lệ".
  - Chưa tick consent + submit → chặn, hiển thị "Vui lòng đồng ý với chính sách để tiếp tục".
- **loading:** nút chuyển "Đang gửi thông tin..." + spinner, `disabled` (chống double-submit —
  double click chỉ tạo 1 bản ghi). Các field khoá nhẹ.
- **success:** thay card form bằng **Thank You state** — icon check tròn indigo, tiêu đề
  "Đã nhận thông tin của bạn!", mô tả "CSKH sẽ liên hệ trong vòng 24h để tư vấn lộ trình.",
  nút phụ "Về trang chủ". (Có thể là trang riêng /thank-you.)
- **error (mạng/server/timeout):** banner lỗi chung phía trên nút — "Gửi không thành công,
  vui lòng thử lại." — nút "Thử lại"; **không mất dữ liệu đã nhập**; không kẹt loading vô hạn.

## 5. Tham chiếu DESIGN.md (token cụ thể)
- Nền section `#F1F5F9`; card form nền `#FFFFFF`, bo 20px, viền `#E2E8F0` 1px,
  bóng `0 12px 24px -8px rgba(15,23,42,.08)`, padding 32px.
- Input: cao 48px, bo 12px, viền `#E2E8F0`, placeholder `#8A8A8D`, focus outline 2px `#2563EB`.
- Nút cam: `#F68C1F` → hover `#D86F0C`, glow `0 8px 16px rgba(246,140,31,.25)`, bo 12px.
- H1: `#000000`, Montserrat 600, `-0.01em`. Body: `#717174` 16px/1.5.
- Chip lợi ích: ô icon nền `#F1F2FC`, icon `#2C3481`.
- Lỗi: viền `#EF4444`, helper text `#EF4444` 12–14px.

## 6. Nội dung mẫu (tiếng Việt — dùng nguyên văn)
- H1: `Chưa biết nên bắt đầu IELTS từ đâu?`
- Sub: `Kiểm tra trình độ và nhận tư vấn lộ trình phù hợp với bạn.`
- Social proof: `Hơn 10,000+ học viên đã đạt mục tiêu IELTS` *(placeholder)*
- Lợi ích: `Giảng viên 8.0+ IELTS` · `Lộ trình cá nhân hóa` · `Học online linh hoạt`
- Tiêu đề form: `Nhận lộ trình IELTS miễn phí` — phụ đề `Chỉ trong 60 giây`
- Placeholder field: `Họ và tên của bạn` · `Số điện thoại` · `Email của bạn`
- Nút: `Kiểm tra trình độ miễn phí`
- Trấn an: `🔒 100% miễn phí • Bảo mật thông tin`

## 7. Ghi chú cho người generate
- Form Hero là **component form dùng chung** — Module 12 (CTA lặp lại) và Module 15.2
  (nhập tay admin) tái sử dụng đúng field/validate/state này. Thiết kế form như một khối
  độc lập có thể nhúng lại.
- Cần làm rõ với khách: "xác minh gmail" trong SRS = bắt buộc `@gmail.com` hay chỉ định
  dạng email hợp lệ. Mặc định generate: chấp nhận email hợp lệ nói chung.
