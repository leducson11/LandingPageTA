# 01 — Prompt: Điều hướng & Header

> Nguồn: `requirements/01-header-navigation-module.docx`. Ghép với `00-base.md` trước khi generate.

---

**[Dán khối HỆ THỐNG THIẾT KẾ từ `00-base.md` vào đây]**

---

## 1. Mục tiêu màn hình
Thanh chrome trên cùng của landing page: điều hướng nhất quán, luôn hiển thị khi cuộn,
giúp khách biết mình đang ở section nào. Hành động chính: nút phụ "Đăng ký tư vấn" (indigo)
và hotline click-to-call. KHÔNG đặt nút cam ở header (nút cam để dành cho form Hero).

## 2. Layout & breakpoint
- **TopBar** (phía trên Header): mobile cao 44px, desktop cao 56px nền cam `#F68C1F`
  chữ trắng. Trái: hotline "0963 073 488" (placeholder — chờ xác nhận) có icon phone,
  click-to-call. Phải: link nhỏ Zalo / Facebook.
- **Header**: `position: fixed`, ngay dưới TopBar (`top: 44px` mobile / `56px` desktop),
  `z-index` trên nội dung. Nền trắng, cao **80px** desktop / ~56px mobile, hairline đáy 1px
  `#E2E8F0`. Khi `scrollY > 20` thêm bóng nhẹ `0 2px 8px rgba(0,0,0,.05)`.
- **Desktop** (`≥768px`): 1 hàng — [logo] · [nav giữa] · [hotline + nút "Đăng ký tư vấn"].
  Track căn theo gutter 80px.
- **Mobile** (`<768px`): [logo] · [hamburger]. Bấm hamburger mở panel disclosure trắng
  trượt xuống, hairline trên, `max-height: 80vh` cuộn nội bộ, chứa các mục nav dạng list
  + 1 nút phụ full-width ở cuối.
- `scroll-padding-top: 4.5rem` (mobile) / `5.5rem` (desktop) để anchor không bị che.

## 3. Danh sách thành phần
1. **Logo** (trái): text lockup `HuyWay` (indigo `#2C3481`) + `English` (cam `#F68C1F`),
   Montserrat 600, ~20px, kèm ô icon bo `rounded-xl` nền indigo. Bấm → cuộn mượt về đầu trang.
2. **Menu anchor** (5 mục theo SRS): "Về chúng tôi", "Công nghệ ứng dụng", "Lộ trình học",
   "Đội ngũ giáo viên", "Cảm nhận học viên". Montserrat 600 ~16px. Mục active/đầu tiên màu
   indigo `#2C3481`; còn lại Ink Body `#717174`.
   - Mục **"Cảm nhận học viên" ẩn** cho tới khi Testimonials (Module 9) có dữ liệu thật —
     không để anchor chết.
3. **Hotline** (phải, desktop): icon phone indigo + số điện thoại in đậm, `tel:` link.
4. **Nút "Đăng ký tư vấn"**: nút phụ — nền indigo `#2C3481` đặc, chữ trắng, bo 8px,
   padding `10px 20px`. Cuộn tới form đăng ký.
5. **Hamburger** (mobile): icon 3 gạch + chữ "Tư vấn"; `aria-label` đầy đủ.
6. **Panel mobile**: list mục nav (mỗi mục `px-4 py-3`, bo 8px, hover nền indigo wash) +
   nút phụ full-width "Đăng ký tư vấn" ở cuối.

## 4. Trạng thái
- **Mặc định (top of page):** header trắng phẳng, không bóng, hairline đáy.
- **Scrolled (>20px):** thêm bóng nhẹ; nội dung không nhảy layout.
- **Active section:** mục nav tương ứng section đang trong viewport chuyển sang indigo +
  `aria-current="page"`. Xác định bằng IntersectionObserver (không dùng scroll-event nặng).
- **Menu mobile mở / đóng:** panel trượt; body không khoá scroll vĩnh viễn khi đóng.
- **Section Testimonials ẩn:** mục "Cảm nhận học viên" biến mất đồng bộ (không để lại
  khoảng trống trong hàng nav).
- **Không hỗ trợ smooth-scroll (Safari cũ):** fallback cuộn tức thời, không lỗi JS.
- **Điều hướng bàn phím:** Tab tới từng mục, Enter cuộn + focus đúng section.

## 5. Tham chiếu DESIGN.md (token cụ thể)
- Nền header `#FFFFFF`; hairline đáy `#E2E8F0` 1px; bóng scrolled `0 2px 8px rgba(0,0,0,.05)`.
- Nav link Montserrat 600 16px; active `#2C3481`, inactive `#717174`.
- Nút phụ: nền `#2C3481`, chữ `#FFFFFF`, bo 8px, không glow.
- TopBar nền `#F68C1F`, chữ `#FFFFFF`.
- Focus-visible: outline 2px `#2563EB` offset 2px.
- Chuyển động header ~300ms ease; tôn trọng `prefers-reduced-motion`.

## 6. Nội dung mẫu (tiếng Việt — dùng nguyên văn)
- Menu: `Về chúng tôi` · `Công nghệ ứng dụng` · `Lộ trình học` · `Đội ngũ giáo viên` · `Cảm nhận học viên`
- Nút: `Đăng ký tư vấn`
- Hotline: `0963 073 488` *(placeholder — chờ khách xác nhận số thật)*
- Hamburger label: `Mở menu điều hướng`
