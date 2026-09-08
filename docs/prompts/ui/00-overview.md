# 00 — Prompt: Bố cục tổng Landing Page (chạy 1 lần để dựng khung)

> Nguồn: `requirements/00-tong-quan.docx`. Mục đích: để Stitch dựng **khung bố cục
> tổng thể + thứ tự section** một lần, làm nền ghép các màn hình chi tiết sau. Không
> kỳ vọng bản này có đủ state/nội dung chi tiết — đó là việc của prompt từng module.

---

**[Dán khối HỆ THỐNG THIẾT KẾ từ `00-base.md` vào đây]**

---

## Prompt

Thiết kế **một trang landing page dài, cuộn dọc, 1 cột** cho trung tâm luyện thi IELTS
"Huyway English". Giao diện tiếng Việt. Mục tiêu trang: chuyển khách truy cập lạ thành
lead tư vấn — mọi section đều đẩy người xem tới một hành động: "Kiểm tra trình độ miễn phí".

### Khung cố định
- **TopBar** tiện ích trên cùng: mobile cao 44px, desktop cao 56px nền cam `#F68C1F`,
  chứa hotline click-to-call + link nhỏ (Zalo/Facebook).
- **Header** trắng, sticky, cao 80px desktop, hairline đáy, có bóng nhẹ khi cuộn. Trái:
  logo text `HuyWay English`. Giữa: menu anchor (Lộ trình học, Đội ngũ giáo viên, Cảm nhận
  học viên, Về chúng tôi). Phải: hotline + nút phụ indigo "Đăng ký tư vấn".
- **FloatingCTA**: nút tròn nổi góc dưới phải (pill, nền cam) cuộn về form đăng ký; kèm
  nút "về đầu trang".
- **Footer** nền indigo đậm `#2C3481` / gần đen.

### Thứ tự section (giữ đúng thứ tự này)
1. **Hero** — nền wash slate `#F1F5F9`. Trái: H1 "Chưa biết nên bắt đầu IELTS từ đâu?" +
   sub-headline + 3 gạch đầu dòng lợi ích. Phải: card form nổi (bo 20px, bóng float) —
   form "Kiểm tra trình độ miễn phí".
2. **Trust Bar** — dải nền slate, 4 số liệu (học viên đã học / tỉ lệ hài lòng / band giáo
   viên / năm kinh nghiệm), mỗi số có caption nguồn nhỏ.
3. **Carousel thẻ trung tâm / công nghệ ứng dụng** — strip card cuộn ngang.
4. **Pain Points** — 3–6 card "vấn đề người học IELTS thường gặp".
5. **Quy trình 3 bước** — 3 bước đánh số: Điền thông tin → Test + tư vấn → Nhận lộ trình
   trong 24h. Kèm 1 dải CTA sau section.
6. **Lộ trình khóa học** — 3 card nhóm khóa theo band: Nền tảng (3.0–5.0), Trung cấp
   (5.0–6.5), Nâng cao (7.0–7.5). Mỗi card có CTA về form.
7. **Đội ngũ giáo viên** — carousel hồ sơ giáo viên (ảnh thật, chứng chỉ, kinh nghiệm),
   nút Trước/Sau + dots. Kèm 1 dải CTA sau section.
8. **Cam kết đầu ra** — khối cam kết + nút "Xem điều kiện áp dụng" mở modal.
9. **Social proof** — logo/uy tín + mở modal điều kiện cam kết.
10. **Testimonials** — câu chuyện học viên (ẩn cả section nếu chưa có dữ liệu thật).
11. **FAQ** — accordion.
12. **Bản đồ + Footer** — Google Maps nhúng, thông tin liên hệ, link Chính sách bảo vệ
    dữ liệu cá nhân.

### Yêu cầu bố cục
- Track nội dung giữa max-width 1200px, gutter 80px desktop; nhịp dọc ~64px giữa section.
- Xen kẽ nền trắng / slate để tách band mà không thêm màu.
- Cam chỉ xuất hiện ở đúng 1 nút hành động mỗi màn hình cuộn (Hero form, các dải CTA lặp lại).
- Mọi section có thể ẩn độc lập khi CMS xoá hết nội dung (Module 5, 9, 11) — không để lại
  khoảng trắng vỡ layout.
- Bản mobile: mọi section xếp chồng 1 cột, card thành strip cuộn ngang hoặc stack; menu
  header thu thành hamburger.

### Nội dung
Dùng copy tiếng Việt gợi ý ở trên. Số liệu, tên giáo viên, testimonial để dạng placeholder
rõ ràng ("10,000+ học viên — số liệu đang chờ xác nhận"), KHÔNG bịa proof.
