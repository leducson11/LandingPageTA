# 05 — Prompt: Nhận diện vấn đề (Pain Points)

> Nguồn: `requirements/05-pain-points-module.docx`. Ghép với `00-base.md` trước khi generate.

---

**[Dán khối HỆ THỐNG THIẾT KẾ từ `00-base.md` vào đây]**

---

## 1. Mục tiêu màn hình
Giúp khách tự nhận ra vấn đề của mình khi học IELTS → dẫn tới giải pháp Huyway. Danh sách
pain points dạng card. Không nút bắt buộc (có thể 1 link text tới form ở cuối).

## 2. Layout & breakpoint
- Section nền trắng (hoặc slate xen kẽ với section trên/dưới), padding dọc 64px, track 1200px.
- Headline section + đoạn dẫn ngắn.
- **Lưới card:** desktop 3 cột (hoặc 2×3), mobile 1 cột / strip cuộn ngang. Gap 24px.
  Số item gợi ý **3–6** để không phá layout.
- Card equal-height.

## 3. Danh sách thành phần
1. **Eyebrow chip:** vd "Bạn có đang gặp phải?"
2. **Headline section:** vd "Những rào cản thường gặp khi học IELTS".
3. **Mỗi card pain point:**
   - Ô icon bo `rounded-2xl` nền indigo wash `#F1F2FC`, icon lucide indigo (vd alert,
     help-circle, clock, trending-down).
   - Tiêu đề ngắn (Title).
   - Mô tả (Body).
4. (Tuỳ chọn) dòng chuyển tiếp cuối section: "Huyway giúp bạn gỡ từng rào cản này →" +
   link text indigo tới form.

## 4. Trạng thái
- **Mặc định:** 3–6 card.
- **Danh sách rỗng (Marketing xoá hết qua CMS):** section **tự ẩn hoàn toàn** hoặc hiển
  thị fallback — KHÔNG để lại vùng trắng.
- Marketing thêm/sửa/xoá/sắp thứ tự item qua CMS (Module 16).

## 5. Tham chiếu DESIGN.md (token cụ thể)
- Card: nền `#FFFFFF`, bo 16px, viền `#E2E8F0` 1px, không bóng, padding 24px, equal-height.
- Ô icon: nền `#F1F2FC`, icon `#2C3481`, bo `rounded-2xl`.
- Chip: nền `#F1F2FC`, chữ `#2C3481`, pill.
- Heading `#000000` 600; body `#717174`.
- Không dùng màu cảnh báo (đỏ/cam) cho pain point — giữ tông indigo/ink; cam để dành cho CTA.

## 6. Nội dung mẫu (tiếng Việt — gợi ý, Marketing chỉnh qua CMS)
- Eyebrow: `Bạn có đang gặp phải?`
- Headline: `Những rào cản thường gặp khi học IELTS`
- `Không biết bắt đầu từ đâu` — `Quá nhiều tài liệu, không rõ nên học gì trước, học bao lâu.`
- `Học mãi không lên band` — `Luyện đề nhiều nhưng điểm chững lại, không biết sai ở đâu.`
- `Mất gốc ngữ pháp – từ vựng` — `Nền tảng yếu khiến việc luyện 4 kỹ năng đều chậm.`
- `Không có người kèm sát` — `Tự học thiếu phản hồi, dễ nản và bỏ giữa chừng.`
