# 00 — HỆ THỐNG THIẾT KẾ DÙNG CHUNG (dán lên đầu MỌI prompt)

> Nguồn: `DESIGN.md` — Design System "HUYWAY English". Trích gọn để nhúng vào prompt UI-gen.
> Khi generate bất kỳ màn hình nào, dán nguyên khối dưới đây trước phần mô tả module.

---

## HỆ THỐNG THIẾT KẾ — HUYWAY ENGLISH

**Tinh thần:** "The Open Door" — học thuật, kỷ luật ở phần cấu trúc; ấm áp, mời gọi ở
phần hành động. Tối giản, hiện đại, trẻ trung. Khoảng trắng gánh cả trang. Không có gì
loè loẹt, không lấp lánh. Chuyển động nhẹ, đi một chiều (vươn lên rồi dừng, không nảy,
không xoay).

### Màu — chỉ 2 màu thương hiệu + thang ink/paper
- **Scholar's Indigo `#2C3481`** — màu lõi thương hiệu: tiêu đề, nav, nút phụ (nền đặc),
  chip icon, dải CTA full-bleed, footer. Hover/pressed: `#242A6B`. Các bước sáng hơn:
  `#4E579F`, `#737CBF` (chỉ cho gradient/icon phụ, KHÔNG cho chữ nhỏ trên nền trắng).
- **Wayfinder Orange `#F68C1F`** — MÀU HÀNH ĐỘNG. Chỉ dùng cho **1 nút chính duy nhất
  trong mỗi viewport**. Hover: `#D86F0C`. Có "orange glow" `0 8px 16px rgba(246,140,31,.25)`
  dưới nút cam — là bóng màu duy nhất được phép.
- **Ink `#000000`** — mọi heading (weight 600, letter-spacing `-0.01em`).
- **Ink Body `#717174`** — body text trên nền trắng. **Ink Muted `#8A8A8D`** — caption,
  helper, placeholder, timestamp.
- **Surface `#FFFFFF`** — nền mặc định. **Surface Slate `#F1F5F9`** — nền section thay
  thế duy nhất (trust bar, wash trên cùng của hero).
- **Indigo Wash `#F1F2FC` / Tint `#E1E4F5`** — nền sau chip indigo, callout info, ô icon.
- **Orange Wash `#FFF4E8`** — nền tint sau phần tử cam, dùng cực hạn chế.
- **Hairline `#E2E8F0`** — mọi viền card, divider, viền input (1px).
- **Trạng thái** (success/warning/error) — chỉ dùng như tiện ích trạng thái, KHÔNG phải
  màu thương hiệu: lỗi `#EF4444`.
- **Admin Control Blue `#2563EB`** — chỉ trong admin, cho focus ring / control tương tác;
  KHÔNG phải màu thương hiệu, tân trang dần về Indigo.

**Quy tắc Wayfinder:** nếu có 2 thứ màu cam trong 1 màn hình → 1 trong 2 sai. Cam đánh
dấu đúng 1 hành động quan trọng nhất, gần như không gì khác.
**Quy tắc 2 màu:** xanh lá, tím, teal, xanh lệch tông = không thuộc hệ thống.

### Chữ — 1 font, 2 weight
- **Montserrat** (fallback `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`).
- Chỉ **400 (Regular)** và **600 (SemiBold)**. Không có font thứ hai, không dùng weight > 600
  (không load, base layer ép về 600). Muốn nhấn mạnh hơn → dùng màu hoặc kích thước.
- **Display** (600, ~30–36px `clamp(1.875rem,4vw,2.25rem)`, line-height 1.1, `-0.01em`) —
  1 cái/trang, là H1 hero.
- **Headline** (600, ~20–30px `clamp(1.25rem,3vw,1.875rem)`, `-0.01em`) — tiêu đề section.
- **Title** (600, 20px) — tiêu đề card, tiêu đề form, chữ trong dải CTA.
- **Body** (400, 16px, line-height 1.5, màu `#717174`) — đoạn văn, list, label form.
- **Label** (600, 12–14px) — chip, badge, nav link, helper, header bảng. Landing: sentence
  case. Admin KPI title: UPPERCASE, tracking dương nhẹ.

### Bố cục
- **Landing:** 1 cột cuộn dọc. Desktop: track giữa **max-width 1200px**, gutter trái/phải
  **80px** (`px-20`), padding dọc section **64px** (`py-16`), thu về 16–24px trên mobile.
  Card/stat: hàng flex chia đều trên desktop, xếp chồng (hoặc strip cuộn ngang) trên mobile.
- **Chrome cố định xếp từ trên:** TopBar tiện ích (44px mobile / 56px desktop, nền cam trên
  desktop) → Header trắng sticky (80px desktop). `scroll-padding-top` 4.5–5.5rem để anchor
  không bị header che.
- **Breakpoint:** một break cứng tại `md` (768px). Nhiều section có 2 cây markup riêng
  (desktop / mobile) — coi là cùng thiết kế ở 2 size.
- **Admin:** sidebar trái cố định 240px (thu còn 76px; off-canvas dưới `lg`) + vùng nội
  dung tối đa **1600px**, nền app `#F5F7FA`. Lưới cảm giác 12 cột qua Tailwind grid. Padding
  trong card admin: **20px**.
- **Nhịp spacing:** bội số của 4; 8 / 12 / 16 / 24 làm phần lớn việc; 24px là gap mặc định
  giữa các card anh em.

### Bo góc (radii tăng theo kích thước vật thể)
- **8px** — nút, control nhỏ.
- **12px** — input, card admin, tile nhỏ.
- **16px** — card nội dung tiêu chuẩn.
- **20px** — card feature, card lộ trình, card form hero, panel CTA.
- **Pill `9999px`** — chip, badge, vòng icon, nút tròn nổi.
- Viền luôn **1px** màu hairline `#E2E8F0`. Không có góc vuông 90° trong nội dung.
- Icon nằm trong tile bo tròn (`rounded-2xl`/`rounded-3xl`) nền indigo `#2C3481` hoặc indigo wash.

### Độ nổi / bóng
Gần như phẳng. Phân tách bằng **hairline 1px trước tiên**; chỉ thêm bóng khi vật thể thật
sự nổi trên trang.
- **Card nghỉ:** `0 1px 3px rgba(17,24,39,.03), 0 1px 2px rgba(17,24,39,.04)` (card admin;
  card landing đa số KHÔNG bóng, chỉ hairline).
- **Card nổi (form hero):** `0 12px 24px -8px rgba(15,23,42,.08)`.
- **Card hover:** landing lift `translateY(-4px)` + bóng float mạnh hơn nhẹ.
- **Nút cam glow:** `0 8px 16px rgba(246,140,31,.25)` — bóng màu duy nhất.
- KHÔNG bóng tím (`rgba(109,41,218,…)` trong CSS cũ là lỗi), không bóng cứng, không bóng đậm.

### Component
- **Nút chính (hành động):** nền cam đặc `#F68C1F`, chữ trắng weight 600, padding ~`14px 24px`,
  bo 8px, có orange glow. Đúng 1 cái/viewport. Nhãn là cụm động từ ("Kiểm tra trình độ miễn phí").
- **Nút phụ (thương hiệu):** nền indigo đặc `#2C3481`, chữ trắng, padding ~`10px 20px`, không glow.
- **Nút outline/ghost:** nền trắng, chữ indigo, viền indigo 1–2px mờ; hover viền đậm lên.
- **Focus-visible:** outline 2px indigo (admin `#2563EB`), offset 2px.
- **Disabled:** `opacity .7`, `cursor: not-allowed`.
- **Chip/Pill:** nền indigo wash `#F1F2FC`, chữ indigo `#2C3481` weight 600, bo pill; hoặc
  nền trắng viền 1px mờ cho eyebrow section.
- **Card:** góc 16–20px, nền trắng; biến thể nổi bật vẫn trắng nhưng thêm viền 2px `#2C3481`.
  Hairline 1px. Padding 20–32px (thường 24px). Card cùng hàng equal-height.
- **Input:** nền trắng, viền hairline 1px, bo 12px, cao cố định **48px**, padding `0 14px`,
  icon lucide dẫn đầu màu Ink Muted. Field SĐT prepend `+84` in đậm. Placeholder Ink Muted.
  Focus: outline 2px indigo offset 2px. **Lỗi: viền → `#EF4444`, helper text đỏ bên dưới**
  (inline, KHÔNG dùng `alert()`).
- **Nav landing:** header trắng cố định, cao 80px desktop, hairline đáy 1px, thêm bóng nhẹ
  sau khi cuộn 20px. Link Montserrat 600 ~16px; link active/đầu tiên màu indigo, còn lại
  Ink Body. Mobile: menu disclosure (hamburger).

### Logo
Lockup cố định: ký hiệu sách/cửa phía trên wordmark "HUYWAY ENGLISH" ("HUY" indigo, "WAY"
cam; "ENGLISH" giãn chữ, indigo, bên dưới). KHÔNG vẽ lại, KHÔNG đổi tỉ lệ, KHÔNG đổi màu
ngoài các colourway đã định (full màu trên nền sáng; 100% trắng trên nền tối). Tôn trọng
clear-space. Build hiện tại tạm render text lockup `HuyWay` + `English` (chữ thứ hai màu cam).

### Chuyển động
Nhẹ, một chiều: phần tử vươn lên rồi lắng, transition ~200–250ms ease. Tôn trọng
`prefers-reduced-motion` (tắt count-up, parallax, auto-scroll). Không bounce, không spin.

### Accessibility (nhu cầu thực tế của tệp khách)
Typography tiếng Việt đọc tốt, dấu đúng. Tap target thoải mái, đọc tốt trên Android phổ
thông. Form dùng một tay được trên mobile. Nav dùng bàn phím được, item active có `aria-current`.
Modal có focus-trap, đóng bằng Esc, trả focus về nút mở.
