# 13 — Prompt: Bản đồ & Footer

> Nguồn: `requirements/13-ban-do-footer-module.docx`. Ghép với `00-base.md` trước khi generate.

---

**[Dán khối HỆ THỐNG THIẾT KẾ từ `00-base.md` vào đây]**

---

## 1. Mục tiêu màn hình
Cuối trang: thông tin liên hệ + định vị trung tâm + lối vào Chính sách bảo vệ dữ liệu cá
nhân. Gồm khối bản đồ + footer. Không có form. Chrome — xuất hiện ở mọi trang.

## 2. Layout & breakpoint
- **Khối bản đồ:** full-bleed hoặc trong track 1200px; iframe Google Maps cao ~320–400px,
  bo 16px (nếu trong track). Có thể đặt cạnh block "Thông tin liên hệ" (desktop 2 cột) hoặc
  chồng lên (mobile).
- **Footer:** nền indigo đậm `#2C3481` (hoặc gần đen), chữ trắng / trắng mờ. Padding dọc
  ~48px, track 1200px.
  - Desktop: 3–4 cột — [logo + slogan + social] · [Liên hệ] · [Lộ trình/Khóa học] · [Pháp lý].
  - Mobile: xếp dọc, các nhóm accordion hoặc list.
- **Thanh cuối (bottom bar):** copyright + link Chính sách.

## 3. Danh sách thành phần
1. **Bản đồ Google Maps** nhúng đúng địa chỉ trung tâm, có marker; cho zoom/pan; mobile
   bấm mở app Google Maps.
2. **Cột thương hiệu:** text lockup `HuyWay English` (chữ "English" cam) trên nền tối →
   dùng biến thể logo trắng; slogan "Học để dùng. Học để đi xa."; hàng icon social
   (Facebook, YouTube, Instagram, TikTok, Zalo) — mỗi icon có `aria-label`.
3. **Cột Liên hệ:**
   - Hotline: `0963 073 488` — click-to-call (`tel:`) trên mobile.
   - Zalo: link.
   - Email: `contact@huywayenglish.edu.vn` — `mailto:` *(placeholder — chờ xác nhận)*.
   - Địa chỉ: `Số 9 LK11 Tổng Cục V, Yên Xá, Thanh Liệt, Thanh Trì, Hà Nội` *(placeholder)*.
   - **Text thật, không dùng ảnh** cho các thông tin liên hệ (giữ SEO/copy).
4. **Cột điều hướng:** link anchor tới các section chính.
5. **Cột Pháp lý:** link "Chính sách bảo vệ dữ liệu cá nhân" → mở modal/trang (Module 17.1).
   Hiển thị ở footer tại **mọi vị trí trang**.
6. **Bottom bar:** "© 2026 Huyway English. Bảo lưu mọi quyền." + link Chính sách.

## 4. Trạng thái
- **Google Maps chặn tải (lỗi API key / quota):** fallback = khối text địa chỉ + nút
  "Xem trên Google Maps" (link ngoài) — KHÔNG để iframe trắng.
- **Thiếu một kênh social (vd chưa có TikTok):** **ẩn icon kênh đó**, không hiển thị link
  trống/lỗi.
- **Mọi link mở đúng đích, không link chết (404).**
- Footer responsive mọi kích thước.

## 5. Tham chiếu DESIGN.md (token cụ thể)
- Nền footer `#2C3481` (khối màu, không bóng); chữ trắng, phụ trắng ~70–85%.
- Icon social: viền/nền trắng mờ, bo pill; hover sáng lên; `aria-label` đầy đủ.
- Link: Label/Body trắng; hover gạch chân hoặc sáng.
- Bản đồ (trong track): bo 16px, viền `#E2E8F0` 1px.
- Logo: dùng biến thể **100% trắng** trên nền indigo.
- Focus-visible outline 2px trắng (trên nền tối) offset 2px.

## 6. Nội dung mẫu (tiếng Việt — thông tin liên hệ là placeholder chờ xác nhận)
- Slogan: `Học để dùng. Học để đi xa.`
- Hotline: `0963 073 488` *(placeholder)*
- Email: `contact@huywayenglish.edu.vn` *(placeholder)*
- Địa chỉ: `Số 9 LK11 Tổng Cục V, Yên Xá, Thanh Liệt, Thanh Trì, Hà Nội` *(placeholder)*
- Social: `@huywayenglish` (Facebook / YouTube / Instagram) *(placeholder)*
- Pháp lý: `Chính sách bảo vệ dữ liệu cá nhân`
- Bottom: `© 2026 Huyway English. Bảo lưu mọi quyền.`
