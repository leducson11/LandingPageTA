# prompts/ui — Prompt gen UI theo từng module

Bộ prompt để dán vào Google Stitch (hoặc agent UI-gen khác) nhằm generate từng
màn hình / section của dự án Huyway English. Mỗi file khớp 1-1 với một file trong
`requirements/`.

## Cách dùng

1. Mở `00-base.md` — đây là **hệ thống thiết kế dùng chung** (trích từ `DESIGN.md`).
   Dán khối "HỆ THỐNG THIẾT KẾ" này lên đầu **mọi** prompt module trước khi generate.
2. (Tùy chọn, chạy 1 lần) Dùng `00-overview.md` để Stitch dựng khung bố cục tổng
   của landing page và thứ tự section.
3. Với mỗi module: mở file tương ứng (vd `02-hero-section.md`), ghép
   `[00-base] + [nội dung file module]`, dán vào Stitch, generate.
4. Tinh chỉnh prompt tại chỗ nếu output lệch, commit lại file — đây là nơi
   version-control prompt.

## Danh sách file

| File | Requirement nguồn | Loại |
|---|---|---|
| `00-base.md` | `DESIGN.md` | Hệ thống thiết kế dùng chung |
| `00-overview.md` | `requirements/00-tong-quan.docx` | Bố cục tổng landing |
| `01-header-navigation.md` | `requirements/01-header-navigation-module.docx` | Landing — chrome |
| `02-hero-section.md` | `requirements/02-hero-section-module.docx` | Landing — section |
| `03-trust-bar.md` | `requirements/03-trust-bar-module.docx` | Landing — section |
| `04-gia-tri-khac-biet.md` | `requirements/04-gia-tri-khac-biet-module.docx` | Landing — section |
| `05-pain-points.md` | `requirements/05-pain-points-module.docx` | Landing — section |
| `06-quy-trinh-3-buoc.md` | `requirements/06-quy-trinh-3-buoc-module.docx` | Landing — section |
| `07-lo-trinh-khoa-hoc.md` | `requirements/07-lo-trinh-khoa-hoc-module.docx` | Landing — section |
| `08-doi-ngu-giao-vien.md` | `requirements/08-doi-ngu-giao-vien-module.docx` | Landing — section |
| `09-testimonials.md` | `requirements/09-testimonials-module.docx` | Landing — section |
| `10-cam-ket-dau-ra.md` | `requirements/10-cam-ket-dau-ra-module.docx` | Landing — section + modal |
| `11-faq.md` | `requirements/11-faq-module.docx` | Landing — section |
| `12-cta-band-form.md` | `requirements/12-cta-band-form-module.docx` | Landing — component dùng lại |
| `13-ban-do-footer.md` | `requirements/13-ban-do-footer-module.docx` | Landing — chrome |
| `admin/14-xac-thuc-phan-quyen.md` | `requirements/14-xac-thuc-phan-quyen-module.docx` | Admin — nhiều màn hình |
| `admin/15-quan-ly-lead.md` | `requirements/15-quan-ly-lead-module.docx` | Admin — nhiều màn hình |
| `admin/16-cau-hinh-noi-dung-cms.md` | `requirements/16-cau-hinh-noi-dung-cms-module.docx` | Admin — nhiều màn hình |
| `admin/17-chinh-sach-he-thong.md` | `requirements/17-chinh-sach-he-thong-module.docx` | Landing — trang phụ + modal |

## Quy tắc chung khi generate

- **Ngôn ngữ giao diện: tiếng Việt** (có dấu đầy đủ). Mọi label/copy trong prompt là
  bản chính thức, không dịch lại.
- **Không bịa proof.** Số liệu, tên giáo viên, testimonial, chứng chỉ, thông tin liên
  hệ — dùng đúng chuỗi placeholder ghi trong prompt, đánh dấu là tạm. Không tự chế thêm.
  (Xem `PRODUCT.md` → "Evidence on Hand".)
- **Mỗi form** phải có đủ 4 trạng thái: idle / loading / error / success (Module 17.4).
- **Responsive:** break chính tại `md` = 768px; mô tả desktop và mobile như cùng một
  thiết kế ở hai kích thước.
