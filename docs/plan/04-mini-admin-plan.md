# Coding Plan — Nhóm 4: Mini Admin (Quản lý Lead + CMS nội dung)

> Nguồn yêu cầu: `requirements/15-quan-ly-lead-module.docx`, `16-cau-hinh-noi-dung-cms-module.docx`.
> Phụ thuộc: **Nhóm 1** (`leads` schema + RLS + `current_app_role()` + `audit_log` + Edge Function
> `submit-lead` + `admin-users` + form kit `src/shared/forms/` + `<Modal>` + `AuthContext` +
> lọc nav admin theo vai trò + `ForbiddenView`), **Nhóm 2** (`site_content` + RLS write =
> super_admin/marketing + `useSiteContent` + `contentDefaults`), **Nhóm 3A/3B** (shape từng block
> + cơ chế auto-hide section khi rỗng + bucket `landing-media`).
> Bối cảnh: `BACAO_KIEM_THU.md` mục 1.D (admin hiện toàn mock).
> Trạng thái: **chưa code**.

---

## 1. Mục tiêu Nhóm 4

Thay phần admin mock bằng 2 màn vận hành thật, sau RBAC:

| Module | Vai trò | Màn |
|--------|---------|-----|
| 15 | CSKH + Super Admin | Danh sách Lead (lọc ngày/trạng thái) · cập nhật trạng thái tư vấn · nhập tay Lead Hotline · đồng bộ Google Sheets |
| 16 | Marketing + Super Admin | Sửa văn bản/hình ảnh mọi block Landing, phản ánh không cần deploy, validate, audit log |

**Ngoài phạm vi Nhóm 4:** Dashboard "Tổng quan" + "Báo cáo & Thống kê" (không có requirement
01–17 — để đợt sau, giữ mock); các mục nav `budget`/`staff`/`courses` (giữ `ComingSoon`); quản lý
tài khoản 14.2 (đã ở Nhóm 1).

---

## 2. Kiến trúc

### 2.1 Schema DB

**`supabase/migrations/0005_lead_ops.sql`** (mở rộng `leads` — bảng gốc ở Nhóm 1)

| Bảng | Cột | Ghi chú |
|------|-----|---------|
| `leads` (thêm cột nếu Nhóm 1 chưa có) | `assigned_to uuid → profiles`, `note text`, `last_contacted_at timestamptz`, `updated_by uuid`, `registration_count int NOT NULL DEFAULT 1`, `is_archived bool NOT NULL DEFAULT false`, `archived_at timestamptz` | **Không có cột xoá cứng / không cấp quyền DELETE** — chỉ lưu trữ mềm (chốt 2026-09-08, §7.7) |
| `lead_events` | `id`, `lead_id → leads`, `type text` (`status_change`\|`note`\|`assign`\|`merge`\|`resubmit`\|`archive`\|`sync`), `from_value`, `to_value`, `actor_id uuid`, `note`, `created_at` | Timeline cho ô chi tiết Lead + truy vết 15.1 |
| `lead_sync_queue` | `lead_id → leads PK`, `status text` (`pending`\|`synced`\|`error`), `attempts int default 0`, `last_error text`, `sheet_row int`, `synced_at`, `updated_at` | 15.3 + edge (retry/bù); §2.2 giai đoạn này **mock**, không gọi Sheets thật |

**Hàm / RPC** (`SECURITY DEFINER`, tự kiểm `current_app_role()`):
- `find_lead_duplicates(p_phone text, p_email text) returns setof leads` — theo `phone_normalized` / `email` (15.2 edge).
- `create_manual_lead(payload jsonb) returns jsonb` — validate (cùng `rules.ts` Nhóm 1), `source='manual_hotline'`.
  **Quy tắc trùng — "Lead mới thắng" (chốt 2026-09-08, §7.3):** nếu trùng `phone_normalized`, **không**
  tạo bản ghi mới — **ghi đè** field bằng dữ liệu mới (trừ `id`/`created_at`/`registration_count`),
  `registration_count += 1`, `updated_at = now()`, ghi `lead_events(type='resubmit', from_value=<bản
  cũ>, to_value=<bản mới>)`; trả `{ lead, was_duplicate: true }` (không hỏi UI, không chặn tạo).
  Không trùng → tạo mới bình thường, trả `{ lead, was_duplicate: false }`.
- `assign_lead(p_lead uuid, p_assignee uuid) returns leads` — `cskh`/`super_admin`; set `assigned_to`;
  ghi `lead_events(type='assign')` (gán tay qua dropdown — 15 §7.2).
- `update_lead_status(p_lead uuid, p_status lead_status, p_note text) returns leads` — chỉ `cskh`/`super_admin`; ghi `lead_events`; set `last_contacted_at` nếu chuyển sang trạng thái liên hệ.
- `merge_leads(p_a uuid, p_b uuid) returns leads` — hợp nhất tay 2 bản ghi CSKH tự phát hiện trùng
  (dedupe tự động ở trên không bắt được, vd cách nhau lâu ngày/khác kênh): áp **cùng quy tắc "mới
  thắng"** theo `updated_at` gần nhất giữa 2 bản, chuyển `lead_events` của bản thua về bản thắng,
  set `is_archived=true` cho bản thua (không xoá); ghi `audit_log` + `lead_events(type='merge')`.
- `archive_lead(p_lead uuid) returns leads` / `unarchive_lead(p_lead uuid) returns leads` —
  `cskh`/`super_admin`; set `is_archived`/`archived_at`; ghi `lead_events(type='archive')`. **Đây
  là cách "xoá" duy nhất** — không có RPC/API nào xoá cứng (17.1, chốt §7.7).
- Trigger `AFTER INSERT ON leads` → `INSERT lead_sync_queue(lead_id,'pending')`.

**`supabase/migrations/0006_cms.sql`**

| Bảng | Cột | Ghi chú |
|------|-----|---------|
| `site_content` (thêm cột) | `version int NOT NULL DEFAULT 1` | optimistic concurrency (16 edge) |
| `site_content_revisions` | `id`, `block text`, `data jsonb`, `version int`, `edited_by uuid`, `edited_at`, `note` | lịch sử chỉnh sửa (16 phi CN) + rollback |

**Hàm / RPC:**
- `save_site_content(p_block text, p_data jsonb, p_base_version int) returns jsonb` — chỉ
  `marketing`/`super_admin`; nếu `p_base_version <> site_content.version` → raise `409` (`{conflict:true, current}`);
  validate field bắt buộc theo `p_block` (tiêu đề section…); `UPDATE ... version = version+1`;
  trigger `AFTER UPDATE` → `INSERT site_content_revisions`.
- `rollback_site_content(p_block text, p_revision_id uuid)` — super_admin.

**RLS / Storage**
- `leads`: (Nhóm 1) anon: không; `marketing`: **không** SELECT/UPDATE; `cskh`/`super_admin`: SELECT
  + UPDATE hẹp (chỉ qua RPC `update_lead_status`/`assign_lead`/`merge_leads`/`archive_lead`/
  `unarchive_lead`); **không vai trò nào** có quyền `DELETE` (chốt §7.7 — chỉ xoá mềm).
  `lead_events`,`lead_sync_queue`: SELECT `cskh`/`super_admin`; ghi qua hàm.
- `site_content`: (Nhóm 2) anon SELECT khi `is_published`; write `marketing`/`super_admin` **qua RPC** `save_site_content`. `site_content_revisions`: SELECT `marketing`/`super_admin`.
- Storage `landing-media`: public read; `INSERT/UPDATE` `marketing`/`super_admin` (qua Edge Function `upload-media`).

### 2.2 Edge Functions (`supabase/functions/`)

| Function | Trigger | Vai trò |
|----------|---------|---------|
| `submit-lead` (SỬA — Nhóm 1) | public | Sau khi insert/resubmit: dựa vào trigger đã enqueue; gọi bất đồng bộ `process-sheet-sync` (best-effort). Lỗi Sheets **không** ảnh hưởng response (15.3, 15 phi CN — DB là source of truth). |
| `process-sheet-sync` | `pg_cron` mỗi 1 phút + gọi tay | Drain `lead_sync_queue where status in ('pending','error') and attempts < 6`; gọi `_shared/sheets.ts` (xem dưới) để đẩy; cập nhật `status`/`attempts`/`last_error`/`sheet_row`; backoff theo `attempts`; lỗi → `error_log` (Nhóm 1). |
| `upload-media` | authenticated (`marketing`/`super_admin`) | Nhận file; validate mime (`jpeg/png/webp`) + size (≤5MB); resize theo `usage` (vd hero ≤1600px, avatar ≤400px) + nén sang webp (`imagescript` Deno); lưu `landing-media`; trả `{ url, width, height }`. Sai định dạng/kích thước → 422 cảnh báo (16 edge). |

**Google Sheets — MOCK giai đoạn này (chốt 2026-09-08, §7.1):** **chưa** kết nối GCP/Service
Account thật. `supabase/functions/_shared/sheets.ts` định nghĩa **interface** `SheetsClient`
(`pushLead(lead): Promise<{ sheetRow: number }>`) + **`MockSheetsClient`** (giả lập: log ra
console/`error_log` mức `info`, trả `sheetRow` tăng dần, không gọi mạng, có thể mô phỏng lỗi ngẫu
nhiên để test cơ chế retry). `process-sheet-sync` phụ thuộc interface này — khi khách cấp
`GOOGLE_SA_KEY`/`LEADS_SHEET_ID` thật, chỉ cần thêm `GoogleSheetsClient` và đổi 1 dòng khởi tạo,
**không sửa** phần queue/retry/RLS. Secrets `GOOGLE_SA_KEY`/`LEADS_SHEET_ID` **để trống/không cấu
hình** ở giai đoạn này.

**API endpoint** (ngoài Edge Function, qua PostgREST/RPC của Supabase):
- `GET /rest/v1/leads?select=...&created_at=gte.X&status=eq.Y&is_archived=eq.false&order=created_at.desc&limit&offset` (RLS lọc theo vai trò)
- `POST /rest/v1/rpc/create_manual_lead | update_lead_status | assign_lead | merge_leads | archive_lead | unarchive_lead | find_lead_duplicates`
- `GET /rest/v1/profiles?role=eq.cskh&is_active=eq.true` (danh sách CSKH cho dropdown gán — §2.4)
- `GET /rest/v1/site_content` (đã dùng ở landing) · `POST /rest/v1/rpc/save_site_content | rollback_site_content`
- `GET /rest/v1/site_content_revisions?block=eq.X&order=edited_at.desc`
- `POST /rest/v1/rpc/publish_policy_version` (bổ sung — xem §2.5)

### 2.3 Nguồn chân lý schema nội dung (mắt xích read ↔ write)

`src/shared/content/schema.ts` — **1 nơi mô tả mọi block**: field, kiểu (`text`\|`textarea`\|
`markdown`\|`image`\|`bool`\|`list`\|`object`), `required`, `label`, giới hạn (min/max item…).
- **Landing (Nhóm 2/3)**: refactor `contentDefaults.ts` để **suy ra** default + type từ file này.
- **CMS (Nhóm 4)**: `blockSchemas.ts` đọc file này để **render form động** + validate.
→ Thêm field mới cho 1 block = sửa 1 chỗ, cả 2 phía theo.

### 2.4 Frontend admin

```
src/features/admin/
├── config/nav.ts                    # (Nhóm 1) wire: content→ContentPage, leads→LeadsPage
├── components/data/
│   ├── DataTable.tsx                # MỚI — cột config, sort, phân trang server, empty state, loading (mở rộng pattern LeadSourceTable)
│   ├── FilterBar.tsx                # MỚI — date-range + select trạng thái + nút reset
│   └── Pagination.tsx               # MỚI
├── hooks/
│   ├── useServerTable.ts            # MỚI — state filter/sort/page → query PostgREST
│   └── useAsyncData.ts              # MỚI — fetch + loading/error (thay cho react-query nhẹ)
├── cms/
│   ├── blockSchemas.ts              # đọc src/shared/content/schema.ts
│   ├── BlockEditor.tsx              # dispatch theo schema
│   ├── fields/{TextFieldEditor,MarkdownEditor,ImageFieldEditor,IconPickerField,BoolFieldEditor,ListEditor,ObjectEditor}.tsx
│   ├── PolicyTab.tsx                # MỚI — sửa policy_documents qua publish_policy_version (§2.5)
│   └── useBlockContent.ts           # load block+version, save (409 handling), revisions
├── leads/
│   ├── LeadDetailDrawer.tsx         # fields + status dropdown + AssigneeSelect + note + timeline lead_events + sync badge + tel: + nút Lưu trữ
│   ├── ManualLeadModal.tsx          # form nhập tay (dùng src/shared/forms/ field kit — cùng field Module 2.2)
│   ├── AssigneeSelect.tsx           # MỚI — dropdown gán CSKH (assign_lead), đơn giản hoá logic (§7.2)
│   └── DuplicateNotice.tsx          # thông báo (không chặn) khi create_manual_lead trả was_duplicate:true — "Lead mới thắng" (§7.3)
├── services/
│   ├── leads.ts                     # list/get/updateStatus/assign/createManual/merge/archive/resync
│   ├── content.ts                   # getBlock/saveBlock/listRevisions/rollback/uploadMedia/publishPolicy
│   └── sync.ts                      # trạng thái sync tổng hợp (cho sidebar health) — dùng MockSheetsClient
└── pages/
    ├── LeadsPage.tsx                # MỚI (nav 'leads' — GỘP 'customers' vào đây, xem §7.6)
    └── ContentPage.tsx             # MỚI (nav 'content', gồm tab block CMS + tab Chính sách)
```

**`LeadsPage`** (15.1, hợp nhất §7.6): **1 màn duy nhất** — `<FilterBar>` (khoảng ngày + trạng
thái + quick-chip **"Khách hàng"** lọc `status='closed'`, tương đương "Danh sách khách hàng" cũ +
chip "Đã lưu trữ" ẩn mặc định) → `<DataTable>` cột *họ tên, SĐT, email, khóa học, trình độ, nguồn,
thời gian gửi, trạng thái, số lần đăng ký (`registration_count`)* (đúng AC 15.1). Empty state rõ
ràng (15.1 edge). Nút "Nhập Lead Hotline" → `<ManualLeadModal>` (nhập trùng → `DuplicateNotice`,
không chặn, xem §7.3). Bấm 1 dòng → `<LeadDetailDrawer>` (đổi trạng thái → `update_lead_status`;
gán CSKH → `<AssigneeSelect>`/`assign_lead`; timeline; badge đồng bộ Sheets; nút "Lưu trữ" →
`archive_lead`, **không có** nút xoá vĩnh viễn).

**`ContentPage`** (16.1): cột trái = danh sách block (Hero, Trust Bar, Pain Points, Lộ trình,
Đội ngũ GV, Testimonials, FAQ, Cam kết, Social links, Hotline/Email) **+ tab "Chính sách"**
(`PolicyTab`, §2.5); cột phải = `<BlockEditor>`
render form từ `blockSchemas`. `<ListEditor>` thêm/xoá/**sắp xếp** item (Module 5/9/11). Ảnh qua
`<ImageFieldEditor>` → `upload-media`. "Lưu" → `save_site_content(block, data, baseVersion)`:
- thiếu field bắt buộc → chặn + lỗi inline (16 AC).
- 409 (người khác đã sửa) → banner "Nội dung đã được <ai> cập nhật lúc <giờ>, tải lại để xem" +
  nút *Tải lại* / *Ghi đè* (16 edge — người lưu sau ghi đè, có cảnh báo).
- list rỗng → cho lưu nhưng cảnh báo "Section này sẽ **ẩn** trên Landing" (khớp auto-hide Nhóm 3).
- Lưu = publish ngay; toggle `is_published` để bật/tắt section. "Xem trước" mở `/` tab mới.
- Panel "Lịch sử chỉnh sửa" (revisions) + nút khôi phục (super_admin).

**Cập nhật landing:** `useSiteContent` (Nhóm 2) fetch khi mount → thay đổi hiện ở lần tải trang kế
tiếp của khách ("không cần deploy" ✔). *(Tuỳ chọn: Supabase Realtime trên `site_content` để tab
landing đang mở tự cập nhật — §7.8.)*

**Sidebar health** (thay chip "Google Sheets API Active" giả — BACAO 1.D.2/1.D.3): đọc
`lead_sync_queue` (số `pending`/`error`) → hiển thị "Đồng bộ Sheets: OK / N chờ / N lỗi" (dữ liệu
từ `MockSheetsClient` giai đoạn này — xem §2.2) + nút "Đồng bộ ngay" gọi `process-sheet-sync`.

### 2.5 Bổ sung nhỏ: sửa Chính sách bảo vệ dữ liệu cá nhân qua CMS
Theo `plan/01-nen-tang-plan.md` §7.4: `policy_documents` (Nhóm 1, seed bằng văn bản mẫu) cần 1 màn
sửa. Tab "Chính sách" trong `ContentPage` dùng `<MarkdownEditor>` (không qua `blockSchemas` — đây
không phải `site_content`) gọi RPC `publish_policy_version(p_title text, p_body_md text) returns
policy_documents` (`marketing`/`super_admin`): tạo **version mới**, `is_current=true`, hàng cũ
`is_current=false` — giữ lịch sử, không sửa đè (khớp `consent_version` mỗi Lead đã ghi ở Nhóm 1).

---

## 3. Trình tự triển khai (theo dependency)

| B | Việc | Phụ thuộc | Đầu ra kiểm chứng |
|---|------|-----------|-------------------|
| 1 | `0005_lead_ops.sql` + `0006_cms.sql`: bảng, cột, RPC, trigger, RLS. Apply. `supabase gen types`. | Nhóm 1–3 migrations | RPC gọi bằng role sai → chặn; `save_site_content` sai version → 409. |
| 2 | `src/shared/content/schema.ts`; refactor `contentDefaults.ts` (Nhóm 2/3) suy ra từ nó. | Nhóm 2/3 | `npm run build` landing xanh; default không đổi. |
| 3 | Edge Function `upload-media` (validate + resize + webp). Deploy. | 1 | Upload PNG 8MB → 422; JPG hợp lệ → URL webp đã nén. |
| 4 | `supabase/functions/_shared/sheets.ts` (`SheetsClient` interface + `MockSheetsClient`); Edge Function `process-sheet-sync` + `pg_cron` job + sửa `submit-lead` (enqueue/best-effort). **Không** cấu hình secret Google thật ở bước này (chốt §7.1). | 1 | Lead mới → queue chuyển `synced` (giả lập) < 1 phút; buộc `MockSheetsClient` lỗi → queue `error`, retry tự động. |
| 5 | Admin primitives: `DataTable`, `FilterBar`, `Pagination`, `useServerTable`, `useAsyncData`. | 1 | Storybook/route dev: sort + phân trang + empty state chạy. |
| 6 | `services/leads.ts`; `LeadsPage` (gộp `customers`+`leads` 1 màn, filter chip "Khách hàng"/"Đã lưu trữ") + `LeadDetailDrawer` (+ `AssigneeSelect`) + `ManualLeadModal` + `DuplicateNotice`. Wire nav: 1 mục `leads`, gỡ mục `customers` khỏi `nav.ts`. | 5, Nhóm 1 (form kit, `<Modal>`) | CSKH lọc theo ngày/trạng thái/khách hàng; đổi trạng thái ghi `lead_events`; nhập tay trùng SĐT → tự ghi đè "mới thắng" + thông báo không chặn; gán CSKH qua dropdown. |
| 7 | `cms/blockSchemas.ts` + `BlockEditor` + field editors (gồm `IconPickerField`) + `ListEditor` + `ImageFieldEditor` + `useBlockContent`; `PolicyTab` + `publish_policy_version`; `services/content.ts`; `ContentPage`. Wire nav `content`. | 2, 3, 5 | Marketing sửa headline Hero → Lưu → mở `/` thấy đổi (không deploy); sửa Chính sách tạo version mới. |
| 8 | Sidebar health từ `lead_sync_queue`; bỏ chip "Google Sheets API Active" giả + nút "Đồng bộ thủ công" giả trong `Header.tsx` → nối `process-sheet-sync` (mock) thật. | 4 | Chip phản ánh số `pending/error` từ mock. |
| 9 | Backfill: enqueue toàn bộ `leads` hiện có vào `lead_sync_queue`; chạy `process-sheet-sync` 1 lần (mock). | 4 | Toàn bộ Lead cũ chuyển `synced` (mock). |
| 10 | Dọn mock: gỡ phần `mockDashboard.ts` liên quan Lead/nguồn; `LeadSourceTable`/Dashboard giữ nguyên (ngoài phạm vi) nhưng đánh dấu "số liệu demo". | 6–8 | `git grep mock` — chỉ còn Dashboard tổng quan + `MockSheetsClient` (cố ý). |
| 11 | QA: Playwright §5.3 + RLS/RPC test (dedupe "mới thắng", archive, assign). | tất cả | Không P0/P1. |

---

## 4. File sẽ tạo / sửa

### Tạo mới
```
supabase/migrations/0005_lead_ops.sql
supabase/migrations/0006_cms.sql
supabase/functions/upload-media/index.ts
supabase/functions/process-sheet-sync/index.ts
supabase/functions/_shared/sheets.ts            # SheetsClient interface + MockSheetsClient (mock giai đoạn này, xem §2.2)
src/shared/content/schema.ts
src/features/admin/components/data/DataTable.tsx
src/features/admin/components/data/FilterBar.tsx
src/features/admin/components/data/Pagination.tsx
src/features/admin/hooks/useServerTable.ts
src/features/admin/hooks/useAsyncData.ts
src/features/admin/services/leads.ts
src/features/admin/services/content.ts
src/features/admin/services/sync.ts
src/features/admin/leads/LeadDetailDrawer.tsx
src/features/admin/leads/ManualLeadModal.tsx
src/features/admin/leads/AssigneeSelect.tsx
src/features/admin/leads/DuplicateNotice.tsx
src/features/admin/cms/blockSchemas.ts
src/features/admin/cms/BlockEditor.tsx
src/features/admin/cms/PolicyTab.tsx
src/features/admin/cms/useBlockContent.ts
src/features/admin/cms/fields/TextFieldEditor.tsx
src/features/admin/cms/fields/MarkdownEditor.tsx
src/features/admin/cms/fields/ImageFieldEditor.tsx
src/features/admin/cms/fields/IconPickerField.tsx
src/features/admin/cms/fields/BoolFieldEditor.tsx
src/features/admin/cms/fields/ListEditor.tsx
src/features/admin/cms/fields/ObjectEditor.tsx
src/features/admin/pages/LeadsPage.tsx
src/features/admin/pages/ContentPage.tsx
tests/unit/content-schema.test.ts
tests/unit/save-site-content.test.ts     (RPC — pgTAP hoặc integration)
tests/unit/lead-dedup.test.ts
tests/e2e/admin-leads.spec.ts
tests/e2e/admin-cms.spec.ts
```

### Sửa
```
supabase/functions/submit-lead/index.ts          # enqueue + gọi process-sheet-sync best-effort; áp quy tắc "mới thắng" khi resubmit
src/features/user/config/contentDefaults.ts       # suy ra từ src/shared/content/schema.ts
src/features/admin/config/nav.ts                   # content→ContentPage, leads→LeadsPage; XOÁ mục 'customers' (gộp vào leads, §7.6)
src/features/admin/App.tsx                         # render LeadsPage / ContentPage theo activeId + role
src/features/admin/components/layout/Sidebar.tsx   # footer status = lead_sync_queue (mock)
src/features/admin/components/layout/Header.tsx    # "Đồng bộ thủ công" → process-sheet-sync (mock)
src/features/admin/data/mockDashboard.ts           # gỡ mock Lead/nguồn (giữ KPI Dashboard tổng quan — ngoài phạm vi)
database.types.ts                                  # regen sau 0005/0006
```

### Xoá
Không (Dashboard tổng quan giữ nguyên).

---

## 5. Test plan

### 5.1 Unit / RPC (Vitest + pgTAP hoặc integration test trên project test)
| File | Ca kiểm |
|------|---------|
| `content-schema.test.ts` | mọi block trong `schema.ts` có `title` bắt buộc; `contentDefaults` khớp shape schema; list có `min/max` hợp lệ |
| `save-site-content.test.ts` | `base_version` cũ → `{conflict:true}`; thiếu field required → lỗi validate; lưu OK → `version+1` + 1 hàng `site_content_revisions` |
| `lead-dedup.test.ts` | `find_lead_duplicates` khớp theo `phone_normalized` (bỏ khoảng trắng/`+84`); `create_manual_lead` trùng → **ghi đè** bản cũ (giữ `id`), `registration_count+1`, trả `was_duplicate:true`, **không** tạo hàng mới; không trùng → tạo mới `registration_count=1` |

### 5.2 RLS / RPC / Storage
- role `marketing`: `SELECT leads` → 0/deny; `save_site_content` → OK; `rpc/publish_policy_version` → OK.
- role `cskh`: `save_site_content` → deny; `update_lead_status`/`assign_lead`/`archive_lead` → OK; `SELECT leads` → OK (kể cả `is_archived=true` nếu chủ động lọc).
- anon: `rpc/update_lead_status` → deny; `SELECT site_content` → chỉ `is_published`; **không có** endpoint xoá `leads` nào khả dụng cho bất kỳ vai trò nào (không cấp policy `DELETE`).
- Storage `landing-media`: anon upload → deny; `marketing` qua `upload-media` → OK; anon đọc URL → OK.
- `merge_leads`: bản thua (`p_a`/`p_b` theo `updated_at` cũ hơn) nhận `is_archived=true`; `lead_events` chuyển sang bản thắng; không hàng nào bị xoá.
- `archive_lead`/`unarchive_lead`: đổi `is_archived` đúng chiều; `LeadsPage` mặc định lọc `is_archived=false`.

### 5.3 E2E (Playwright — skill `browser-automation`)
| Mã | Kịch bản | Kỳ vọng | AC |
|----|----------|---------|-----|
| L-01 | CSKH mở "Quản lý Leads" | Bảng đủ cột họ tên/SĐT/email/khóa học/trình độ/nguồn/thời gian/trạng thái/số lần đăng ký | 15.1 |
| L-02 | Lọc theo khoảng ngày + trạng thái "Đang tư vấn" | Bảng chỉ còn Lead khớp; phân trang đúng | 15.1 |
| L-02b | Bấm chip "Khách hàng" | Lọc `status='closed'` — thay cho màn "Danh sách khách hàng" riêng | 15.1 — chốt 2026-09-08 §7.6 |
| L-03 | Bộ lọc không ra kết quả | Empty state rõ ràng (không màn trắng/lỗi) | 15.1 edge |
| L-04 | Mở 1 Lead, đổi trạng thái "Mới"→"Đã chốt" + ghi chú | Lưu; timeline có event; `last_contacted_at` cập nhật | 15.1 |
| L-04b | Gán Lead cho 1 CSKH qua `<AssigneeSelect>` | `assigned_to` cập nhật; `lead_events(type='assign')` | 15 — chốt 2026-09-08 §7.2 (gán tay) |
| L-05 | "Nhập Lead Hotline": điền đủ field hợp lệ | Lead tạo, `source = 'manual_hotline'`, `registration_count=1`, phân biệt trong danh sách | 15.2 |
| L-06 | Nhập tay thiếu field / SĐT sai định dạng | Chặn + lỗi inline (validate cơ bản) | 15.2 |
| L-07 | Nhập tay SĐT/email đã tồn tại | **Tự động ghi đè** bản cũ (giữ `id`), `registration_count` tăng, `<DuplicateNotice>` hiện **không chặn** — **không** tạo bản trùng | 15.2 edge — chốt 2026-09-08 §7.3 ("Lead mới thắng") |
| L-08 | Sau khi tạo Lead (online hoặc tay) | `lead_sync_queue` chuyển `synced` **(mock, chưa nối Sheets thật)** < 1 phút | 15.3 — mock theo §7.1 |
| L-09 | Buộc `MockSheetsClient` trả lỗi | Lead vẫn lưu trong hệ thống; queue `error`; retry tự động; sidebar báo "N lỗi" | 15.3 edge / phi CN |
| L-10 | Marketing mở URL `/admin` → mục Leads | 403 / mục bị ẩn | 16 phi CN / 14.2 |
| L-11 | CSKH bấm "Lưu trữ" 1 Lead | Lead biến mất khỏi danh sách mặc định; hiện lại khi bật chip "Đã lưu trữ"; **không có** nút xoá vĩnh viễn ở đâu trong UI | 17.1 — chốt 2026-09-08 §7.7 (soft-delete) |
| C-01 | Marketing sửa headline Hero → Lưu → mở `/` | Landing hiển thị headline mới, **không** deploy | 16.1 |
| C-02 | Sửa Trust Bar: upload ảnh 10MB .bmp | Cảnh báo định dạng/kích thước, không lưu ảnh vỡ | 16.1 edge |
| C-03 | Upload ảnh JPG hợp lệ | Tự nén/resize (webp), preview đúng, landing dùng URL mới | 16.1 edge |
| C-04 | Bỏ trống tiêu đề section → Lưu | Chặn + lỗi "không được để trống" | 16.1 |
| C-05 | Xoá hết item Pain Points → Lưu | Cảnh báo "section sẽ ẩn"; landing tự ẩn section, không vùng trắng | 16.1 edge / M5,9,11 |
| C-06 | 2 tab Marketing sửa cùng block, tab A lưu trước, tab B lưu sau | Tab B nhận cảnh báo "đã có người sửa", chọn Tải lại / Ghi đè | 16.1 edge |
| C-07 | CSKH mở URL `/admin` → mục Content | 403 / mục bị ẩn | 16 phi CN |
| C-08 | Sau khi Marketing lưu | `site_content_revisions` có bản ghi ai/khi nào; panel lịch sử hiển thị | 16 phi CN |
| C-09 | Super Admin khôi phục revision cũ | Landing trở lại nội dung bản đó | 16 phi CN |

### 5.4 Build / tĩnh
- `npm run typecheck` + `build` + `lint` xanh.
- `detect.mjs` (impeccable, mode Operate) trên `LeadsPage`/`ContentPage`: đối chiếu `DESIGN.md`
  admin (chuyển dần `--color-primary` → `#2C3481`).
- `git grep -nE "Google Sheets API Active|getDashboardData\(.*lead|mockDashboard"` → chỉ còn Dashboard tổng quan.

---

## 6. Dependency mới (cần user duyệt)
| Package | Vì sao | Thay thế |
|---------|--------|----------|
| `imagescript` (Deno, Edge Function `upload-media`) | resize/nén ảnh server-side (16 edge) | nén phía client bằng `<canvas>` + server chỉ validate |
| *(tuỳ chọn)* `@tanstack/react-query` | cache/refetch bảng Lead + block CMS | `useAsyncData` tự viết (đã kế hoạch) |
| *(không thêm)* Sheets API | **Giai đoạn này dùng `MockSheetsClient` thuần TypeScript, không gọi API ngoài** (chốt 2026-09-08, §7.1); khi có Service Account thật mới thêm client gọi Sheets API qua JWT + `fetch` | — |

Icon: thống nhất **`lucide-react`** cho toàn bộ dự án (landing + admin), kể cả trường `icon` trong
CMS (`IconPickerField` chọn từ danh sách khoá có sẵn — **không** phải upload ảnh icon riêng);
xem `plan/03a-section-tinh-plan.md` §7.6.

Tái dùng: `src/shared/forms/` (Nhóm 1), `<Modal>` (Nhóm 3B), `DataTable` pattern từ
`LeadSourceTable`, `clsx`/`tailwind-merge`, `recharts` (không cần ở Nhóm 4).

---

## 7. Quyết định đã chốt với khách (2026-09-08)
1. **Google Sheets**: **giai đoạn này chưa kết nối** GCP Service Account/API thật. Viết sẵn
   `_shared/sheets.ts` với interface `SheetsClient` + `MockSheetsClient` để hoàn thiện luồng
   code/queue/retry trước (xem §2.2, §3 bước 4). Khi khách cấp Service Account (JSON key) +
   Sheet ID sau này, chỉ cần thêm `GoogleSheetsClient` implement cùng interface — không đổi kiến
   trúc. Chiều đồng bộ vẫn giữ **một chiều DB → Sheet** khi nối thật.
2. **Phân công Lead cho CSKH**: chốt **gán tay** qua dropdown (`<AssigneeSelect>` → RPC
   `assign_lead`) trong `LeadDetailDrawer` — đơn giản hoá logic, **không** làm auto round-robin.
3. **Quy tắc hợp nhất Lead trùng SĐT**: **"Lead mới thắng"** — ghi đè nội dung bằng dữ liệu mới,
   `registration_count += 1`, **giữ nguyên `id`** của bản gốc, `updated_at = now()`. Áp dụng tự
   động ở cả `submit-lead` (Nhóm 1, online) và `create_manual_lead` (nhập tay) — **không** hỏi
   người dùng, chỉ thông báo (`<DuplicateNotice>`, không chặn). `merge_leads` (CSKH chủ động hợp
   nhất 2 bản ghi riêng biệt mà dedupe tự động không bắt được) dùng cùng nguyên tắc theo
   `updated_at` gần nhất.
4. **CMS rich text**: chốt **Markdown + textarea** — gọn nhẹ, an toàn, tránh XSS so với WYSIWYG.
5. **Lưu CMS**: chốt **publish ngay khi nhấn Lưu** — không làm luồng Nháp → Duyệt.
6. **`customers` vs `leads`**: **gộp chung 1 màn** "Quản lý Lead" — "khách hàng" là Lead có
   `status='closed'`, lọc bằng chip trên `<FilterBar>` thay vì bảng/route riêng.
7. **Xoá Lead**: **không cho xoá vĩnh viễn** (tuân thủ Module 17.1 — bảo toàn lịch sử dữ liệu).
   Cơ chế **xoá mềm**: cột `is_archived`/`archived_at` + RPC `archive_lead`/`unarchive_lead`,
   **không có** policy `DELETE` nào trên `leads` ở bất kỳ vai trò nào.

### Còn mở (không chặn code Nhóm 4)
8. **Realtime cập nhật landing** khi CMS lưu (tab khách đang mở): chưa có yêu cầu — giữ đề xuất
   "không cần", lần tải kế tiếp là đủ theo AC 16.1.
9. **Mốc "24h"** (Module 6): đã chốt ở Nhóm 3A §7.3 = **giờ thực tế (real-time)** — không ảnh
   hưởng Nhóm 4 trừ khi sau này thêm cột "hạn xử lý" cho Lead (chưa có trong scope hiện tại).
