# 11 — Prompt: FAQ (Accordion)

> Nguồn: `requirements/11-faq-module.docx`. Ghép với `00-base.md` trước khi generate.

---

**[Dán khối HỆ THỐNG THIẾT KẾ từ `00-base.md` vào đây]**

---

## 1. Mục tiêu màn hình
Trả lời nhanh thắc mắc thường gặp mà không phải đọc khối văn bản dài. Accordion accessible.
Không có hành động chính (có thể 1 link text "Vẫn còn câu hỏi? Liên hệ hotline").

## 2. Layout & breakpoint
- Section nền trắng, padding dọc 64px, track hẹp hơn (~800px) căn giữa cho dễ đọc.
- Headline section + đoạn dẫn.
- **Danh sách accordion** xếp dọc, mỗi item cách nhau bằng hairline hoặc gap nhỏ.
- Mobile: giống desktop, full-width, tap target ≥44px.

## 3. Danh sách thành phần
1. **Eyebrow chip:** "Câu hỏi thường gặp".
2. **Headline:** "Những điều bạn có thể đang thắc mắc".
3. **Mỗi item accordion:**
   - Hàng header = `<button>` full-width: câu hỏi (Title 600, trái) + icon chevron/plus
     (phải) xoay/đổi khi mở.
   - Panel trả lời (Body `#717174`) — ẩn mặc định, mở rộng khi bấm.
4. (Tuỳ chọn) dòng cuối: "Vẫn còn câu hỏi? Gọi 0963 073 488" (link tel).

## 4. Trạng thái
- **Mặc định:** mọi item **đóng**.
- **Mở:** bấm/chạm header → mở panel; bấm lại → thu gọn. `aria-expanded` cập nhật; panel
  liên kết header qua `aria-controls` / `id`.
- **Nhiều item cùng mở:** mặc định **cho phép** (đề xuất trong SRS) — cần chốt với khách
  có giới hạn 1 item/lần không.
- **Danh sách FAQ rỗng (CMS xoá hết):** section **tự ẩn** hoặc fallback — không để khoảng trắng.
- **Bàn phím:** Tab tới header, Enter/Space mở/đóng.
- Nội dung câu hỏi/trả lời quản lý qua CMS (Module 16).

## 5. Tham chiếu DESIGN.md (token cụ thể)
- Item: nền `#FFFFFF`, phân tách bằng hairline `#E2E8F0` 1px (hairline-first, không bóng).
  Hoặc card bo 12px viền hairline nếu muốn tách rõ.
- Câu hỏi: Title 600 `#000000`. Trả lời: Body `#717174` 16px/1.5.
- Icon chevron: `#2C3481` hoặc `#8A8A8D`; xoay 180° khi mở, transition ~200ms.
- Focus-visible: outline 2px `#2563EB` offset 2px trên header button.
- `prefers-reduced-motion`: bỏ animation mở/đóng, chỉ toggle hiển thị.

## 6. Nội dung mẫu (tiếng Việt — gợi ý, Marketing chỉnh qua CMS)
- Eyebrow: `Câu hỏi thường gặp`
- Headline: `Những điều bạn có thể đang thắc mắc`
- `Tôi mất gốc thì bắt đầu như thế nào?` — `Bạn làm bài kiểm tra trình độ miễn phí, chuyên viên sẽ xếp bạn vào lộ trình Nền tảng và tư vấn kế hoạch học phù hợp.`
- `Học online hay offline?` — `Huyway có lớp online linh hoạt; lịch và hình thức cụ thể sẽ được tư vấn theo nhu cầu của bạn.`
- `Cam kết đầu ra hoạt động ra sao?` — `Nếu không đạt band mục tiêu đã thỏa thuận và bạn đáp ứng điều kiện chuyên cần, Huyway hoàn học phí hoặc cho học lại miễn phí. Xem mục "Cam kết đầu ra".`
- `Chi phí khóa học là bao nhiêu?` — `Học phí tùy lộ trình và band mục tiêu; chuyên viên sẽ báo giá chi tiết khi tư vấn.`
- `Bao lâu tôi nhận được lộ trình?` — `Trong vòng 24 giờ sau khi hoàn thành bài kiểm tra và trao đổi với chuyên viên.`
