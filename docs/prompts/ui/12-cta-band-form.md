# 12 — Prompt: CTA Band & Form lặp lại (component dùng chung)

> Nguồn: `requirements/12-cta-band-form-module.docx`. Ghép với `00-base.md` trước khi generate.
> Liên quan chặt: `02-hero-section.md` (form gốc dùng chung).

---

**[Dán khối HỆ THỐNG THIẾT KẾ từ `00-base.md` vào đây]**

---

## 1. Mục tiêu màn hình
Lặp lại điểm đăng ký tại các mốc tâm lý quan trọng để khách không phải cuộn ngược lên
Hero. Xuất hiện **tối thiểu 3 vị trí**: sau Hero, sau Quy trình 3 bước, sau Đội ngũ giáo
viên. Là **một component dùng lại**, không copy-paste logic riêng từng chỗ.

## 2. Layout & breakpoint
Có 2 biến thể, cùng dùng chung form:
- **Biến thể A — Dải CTA gọn (band):** dải full-bleed nền indigo `#2C3481`, chữ trắng.
  Desktop: [tiêu đề + phụ đề bên trái] · [nút cam bên phải]. Mobile: xếp dọc, nút full-width.
  Bấm nút → cuộn tới form Hero **hoặc** mở form inline/modal.
- **Biến thể B — Dải CTA có form nhúng:** dải nền indigo hoặc panel bo 20px nền trắng,
  chứa **form rút gọn nhưng ĐỦ field bắt buộc + consent** (không có phiên bản thiếu field).
  Desktop: [nội dung thuyết phục trái] · [card form phải]. Mobile: xếp dọc.
- Padding dọc ~48–64px, track 1200px.

## 3. Danh sách thành phần
1. **Tiêu đề dải** (Title/Headline, chữ trắng): vd "Sẵn sàng nhận lộ trình của bạn?"
2. **Phụ đề ngắn** (Body, trắng mờ): "Miễn phí • 60 giây • CSKH phản hồi trong 24h".
3. **Nút cam hành động:** "Kiểm tra trình độ miễn phí" — nền `#F68C1F`, chữ trắng 600,
   bo 8–12px, orange glow. **Đúng 1 nút cam / viewport.**
4. **(Biến thể B) Card form** — dùng **đúng** field/validate/state của Module 2.2:
   Họ tên*, SĐT*, Email*, Khóa học quan tâm, Trình độ hiện tại, Nhu cầu học tập, checkbox
   consent (không tick sẵn, đúng nguyên văn), nút submit cam.

## 4. Trạng thái
- **Nút-only (biến thể A):** idle → hover (`#D86F0C`) → focus outline. Bấm cuộn/mở form.
- **Form nhúng (biến thể B):** đủ 4 trạng thái **giống hệt Module 2.2**:
  - idle · lỗi validate inline per-field · loading (nút "Đang gửi...", disable, chống
    double-submit) · success (Thank You state) · error (banner "Gửi không thành công,
    thử lại", giữ dữ liệu, có timeout).
- **Chống trùng:** khách đã submit ở Hero rồi submit tiếp ở CTA band → hệ thống phát hiện
  trùng SĐT/Email, không tạo nhiều bản ghi rác (thông báo "Bạn đã đăng ký trước đó, CSKH
  sẽ liên hệ sớm.").
- Dữ liệu từ **mọi điểm CTA** đổ về cùng một nguồn Lead (Module 15).

## 5. Tham chiếu DESIGN.md (token cụ thể)
- Dải: nền `#2C3481` full-bleed (khối màu, không bóng), chữ `#FFFFFF`, phụ đề trắng ~85%.
- Nút cam: `#F68C1F` → hover `#D86F0C`, glow `0 8px 16px rgba(246,140,31,.25)`, bo 8–12px.
- Card form (biến thể B): nền `#FFFFFF`, bo 20px, viền `#E2E8F0` 1px, bóng float; input
  cao 48px bo 12px; lỗi viền `#EF4444` + helper đỏ.
- Focus-visible outline 2px `#2563EB` offset 2px.

## 6. Nội dung mẫu (tiếng Việt — dùng nguyên văn)
- Tiêu đề: `Sẵn sàng nhận lộ trình của bạn?`
- Phụ đề: `Miễn phí • 60 giây • CSKH phản hồi trong 24h`
- Nút: `Kiểm tra trình độ miễn phí`
- Consent (biến thể B): *(đúng nguyên văn như Module 2.2)*
- Thông báo trùng: `Bạn đã đăng ký trước đó. CSKH sẽ liên hệ với bạn sớm nhất.`

## 7. Ghi chú cho người generate
Generate **1 lần** component này (cả 2 biến thể), rồi đặt lại tại 3 vị trí. Không thiết
kế 3 form khác nhau. Khi form Module 2.2 đổi field → component này đổi theo.
