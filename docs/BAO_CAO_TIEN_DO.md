# Báo cáo tiến độ — HUYWAY English Platform

> Cập nhật: 2026-09-09 · Nhánh: `main` (chưa commit các thay đổi trong đợt này)
> Người thực hiện: Sơn Lê

---

## 1. Tóm tắt nhanh

Dự án gồm 2 phần: **Landing page công khai** (`/`) và **Admin Dashboard nội bộ** (`/admin`).

- **Landing page**: giao diện đã dựng lại **khớp 100%** với bản thiết kế cuối (`docs/design export/`), nhưng **chưa nối logic thật** — form đăng ký chưa gửi dữ liệu đi đâu, nội dung vẫn là văn bản/ảnh mẫu từ bản thiết kế.
- **Xác thực & phân quyền (Auth)**: code xong đầy đủ (3 vai trò, session timeout, quản lý tài khoản), nhưng **chưa chạy được** vì migration/Edge Function chưa được áp dụng lên Supabase thật.
- **Admin Dashboard**: chỉ phần Đăng nhập + Quản lý tài khoản dùng dữ liệu thật; **7/8 trang còn lại vẫn là dữ liệu giả (mock)**, chưa nối Supabase.
- **Chưa có gì được deploy hoặc lên production.** Toàn bộ đang chạy local, chưa commit lên git.

**Kết luận ngắn gọn: sản phẩm CHƯA sẵn sàng go-live.** Ước tính còn 1 khối việc lớn (nối logic + nội dung thật + hoàn thiện admin + apply hạ tầng) trước khi có thể public.

---

## 2. Đã hoàn thành

### 2.1 Xác thực & phân quyền (Auth) — code xong, chờ apply hạ tầng
- Supabase Auth thật thay cho mock localStorage: 3 vai trò `super_admin / marketing / cskh`.
- `AuthContext` mới: đăng nhập/đăng xuất thật, lỗi generic khi sai mật khẩu, tự đăng xuất nếu tài khoản bị khoá.
- `useIdleTimeout`: tự đăng xuất sau 30 phút không thao tác, cảnh báo trước 2 phút.
- `ProtectedRoute` theo vai trò + trang 403 (`ForbiddenView`).
- Trang **Quản lý tài khoản** (`AccountsPage`) — tạo/sửa vai trò/khoá tài khoản qua Edge Function `admin-users`, có chặn "khoá Super Admin cuối cùng".
- File: `src/shared/contexts/AuthContext.tsx`, `src/shared/components/ProtectedRoute.tsx`, `src/pages/AccountsPage.tsx`, `src/services/accounts.ts`.

### 2.2 Hạ tầng dữ liệu Supabase — **đã viết, CHƯA áp dụng lên project thật**
| File | Nội dung |
|---|---|
| `supabase/migrations/0001_auth_foundation.sql` | enum vai trò, bảng `profiles`, `audit_log`, RLS |
| `supabase/migrations/0001b_leads_policy.sql` | bảng `leads`, `policy_documents` (+ seed chính sách tạm), RLS |
| `supabase/migrations/0002_site_content.sql` | bảng `site_content` cho nội dung động (CMS sau này), RLS |
| `supabase/functions/admin-users` | tạo/sửa/khoá tài khoản (chỉ super_admin) |
| `supabase/functions/submit-lead` | nhận đăng ký từ landing, chống trùng số điện thoại ("Lead mới thắng"), gắn version chính sách đã đồng ý |

**Vì sao chưa chạy được:** Supabase MCP chưa được cấp quyền trong các phiên làm việc trước → không thể tự `supabase db push` / deploy Edge Function. Hướng dẫn áp dụng đầy đủ ở `supabase/README.md`.

### 2.3 Giao diện Landing Page — khớp 100% thiết kế, UI thuần (chưa có logic)
Toàn bộ 13 khối nội dung dựng lại 1:1 theo `docs/design export/code.html` (+ `DESIGN.md` "The Open Door"): Header, Hero, Trust Bar, Về chúng tôi, Pain Points, Quy trình 3 bước, Lộ trình khoá học, Đội ngũ giáo viên, Cảm nhận học viên, Cam kết đầu ra (+ modal), FAQ, Bản đồ & liên hệ, Footer, nút nổi.

- `DESIGN.md` gốc được thay bằng bản thiết kế chính thức; `tailwind.config.js` nạp đúng theme của bản thiết kế.
- Build/lint/kiểm tra thiết kế (`impeccable detect`) đều sạch; đã soi cả bản desktop và mobile.
- **Toàn bộ nội dung (ảnh giáo viên, số liệu, testimonial, địa chỉ) là dữ liệu/ảnh mẫu lấy nguyên từ file thiết kế** — chưa phải thông tin thật của HUYWAY.
- **Form đăng ký ở Hero chưa gửi dữ liệu đi đâu cả** — chỉ đổi giao diện sang "Cảm ơn" khi bấm nút, không lưu vào Supabase.

### 2.4 Lớp dùng chung (xây xong, sẵn sàng để nối vào landing)
- `<LeadForm>` đầy đủ field, validate client + có sẵn hàm gọi `submit-lead` (`src/shared/LeadForm/`).
- `<Seo>` (dùng tính năng gốc của React 19, không cần thêm thư viện) để mỗi trang có tiêu đề/mô tả riêng.
- `<PolicyModal>` + trang Chính sách bảo mật (`/chinh-sach-bao-mat`) — **nội dung đang là bản nháp**, có ghi rõ "NỘI DUNG TẠM — CHƯA PHẢI BẢN CHÍNH THỨC".
- Bộ hook `useSiteContent` để sau này đọc nội dung landing từ CMS thay vì hard-code — đã có nhưng **chưa được landing mới sử dụng**.

### 2.5 Admin Dashboard — phần lớn vẫn là dữ liệu giả
| Trang | Trạng thái |
|---|---|
| Đăng nhập | ✅ Thật (Supabase Auth) |
| Quản lý tài khoản | ✅ Thật |
| Tổng quan (Dashboard), Quản lý Content, Danh sách khách hàng, Ngân sách & Quyền, Nhân viên, Khoá học, Leads, Báo cáo | ❌ Toàn bộ dùng dữ liệu mẫu cứng trong `src/data/mock*.ts`, chưa đọc/ghi Supabase |

---

## 3. Việc còn thiếu để go-live

### 3.1 Bắt buộc phải xong trước khi public (blocking)

1. **Áp dụng hạ tầng Supabase** — chạy 3 file migration + deploy 2 Edge Function lên project thật, set secret `service_role`, tạo 3 tài khoản test theo hướng dẫn `supabase/README.md`. *(Việc của người có quyền truy cập Supabase — Claude không tự làm được.)*
2. **Nối logic form đăng ký ở Landing** — thay phần UI tĩnh hiện tại bằng `<LeadForm>`/`submit-lead` thật, để lead thật sự được lưu vào database và đội CSKH thấy được trên admin.
3. **Thay nội dung mẫu bằng nội dung thật**: ảnh & hồ sơ giáo viên thật, số liệu đã kiểm chứng (hiện ghi "10,000+ học viên", "95%"... là số minh hoạ), testimonial có thật + đã xin phép, địa chỉ/bản đồ/hotline chính xác, văn bản 4 điều kiện cam kết đầu ra lấy từ hợp đồng thật (hiện là văn bản mẫu).
4. **Chính sách bảo vệ dữ liệu cá nhân** — thay bản nháp bằng văn bản chính thức đã được duyệt (pháp lý).
5. **Nối Supabase thật cho Admin Dashboard** — ít nhất phải xong **Quản lý Leads** (để CSKH xử lý lead thật) trước khi mở landing cho công chúng, vì nếu không có nơi tiếp nhận thì lead thu về sẽ "biến mất". Các trang còn lại (Content, Khách hàng, Ngân sách, Nhân viên, Khoá học, Báo cáo) có thể làm sau nhưng không được để mock trộn lẫn dữ liệu thật.
6. **Hạ tầng triển khai**: chọn hosting, gắn domain thật, bật HTTPS, cấu hình biến môi trường production (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) — hiện chỉ chạy local qua XAMPP.
7. **SEO/asset tối thiểu**: tạo `robots.txt`, `sitemap.xml`, ảnh `og-default.png` thật (đường dẫn đã khai báo trong code nhưng file chưa tồn tại).
8. **Commit & review code** — toàn bộ thay đổi từ đầu tới giờ **chưa hề được commit**, đang nằm ở working tree local.

### 3.2 Nên làm sớm, không bắt buộc phải xong trước ngày go-live đầu tiên

- Viết test (unit cho validate/form, E2E cho luồng đăng ký lead) — chưa có test nào, `vitest`/`@testing-library` chưa cài dù đã được duyệt trong kế hoạch.
- Thêm menu di động (hamburger) cho Header — bản thiết kế gốc không có, nên trên điện thoại nhỏ (dưới ~1280px) người dùng **không thấy menu điều hướng** (chỉ còn nút "Đăng ký tư vấn" và hotline).
- Tối ưu dung lượng bundle JS (hiện ~1.2MB, vượt cảnh báo mặc định của Vite) — chưa ảnh hưởng chức năng nhưng ảnh hưởng tốc độ tải trên mạng yếu.
- Đồng bộ Google Sheets cho marketing (nằm ngoài phạm vi các đợt vừa làm).
- Rà soát bảo mật: test RLS thực tế trên project Supabase thật (đã viết policy nhưng chưa chạy thử với dữ liệu/role thật), kiểm tra giới hạn brute-force đăng nhập (đang dùng mặc định của Supabase Auth, chưa tuỳ biến).
- Audit khả năng tiếp cận (accessibility) và Lighthouse cho landing mới.
- Dọn các file tài liệu cũ ở gốc dự án (`CHEAT_SHEET.md`, `SETUP_STATUS.md`, `TEST_NOW.md`, `SUCCESS_SUMMARY.md`, `VISUAL_GUIDE.md`, `README_INTEGRATION.md`, `MIGRATION_GUIDE.md`) — các file này mô tả trạng thái đã cũ (giai đoạn admin mock trước Auth thật), dễ gây hiểu nhầm nếu không cập nhật hoặc gỡ bỏ.

---

## 4. Rủi ro cần lưu ý

- **Nếu mở landing cho công chúng trước khi nối logic + có nơi nhận lead thật → mất toàn bộ lead thu được** trong giai đoạn đó (form hiện chỉ hiện "Cảm ơn" trên UI, không lưu gì).
- **Nội dung hiện tại có thể bị hiểu là quảng cáo sai sự thật** nếu public nguyên trạng (số liệu minh hoạ, giáo viên/ảnh mẫu, testimonial chưa xin phép) — cần thay bằng thông tin thật hoặc gắn nhãn rõ ràng trước khi launch.
- **Chưa test RLS trên dữ liệu thật** — rủi ro về việc phân quyền (vd. marketing thấy được lead, hoặc ngược lại) chỉ được xác minh qua đọc code, chưa chạy thử case thật.
- Toàn bộ Auth + Landing + hạ tầng DB **đang nằm ngoài git** (chưa commit) — nếu máy gặp sự cố sẽ mất toàn bộ tiến độ.

---

## 5. Đề xuất thứ tự làm tiếp theo

1. Commit toàn bộ code hiện tại lên nhánh riêng, review.
2. Cấp quyền Supabase MCP (hoặc tự áp dụng migration/Edge Function theo `supabase/README.md`) → có backend thật để test.
3. Nối `<LeadForm>` thật vào Hero + các vị trí CTA khác trên landing.
4. Nối Supabase thật cho trang **Quản lý Leads** trên admin (ưu tiên cao nhất trong các trang admin còn mock).
5. Thay nội dung/ảnh/số liệu/chính sách mẫu bằng thông tin thật do khách cung cấp.
6. Chọn hosting + domain, cấu hình deploy, bật HTTPS.
7. Dọn dẹp tài liệu cũ, viết test tối thiểu cho luồng đăng ký lead, rồi mới go-live.

---

*Tài liệu liên quan: `docs/DECISIONS.md` (quyết định nghiệp vụ), `docs/process/*.md` (nhật ký từng đợt code), `supabase/README.md` (hướng dẫn áp dụng hạ tầng).*
