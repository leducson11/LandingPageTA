import { useState } from "react";
import { Eye, ExternalLink, Files, FileEdit, Lock, Pencil, Plus, Radio, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { FormField, TextField, TextAreaField } from "@/components/shared/FormField";
import { useAuth } from "@/lib/use-auth";
import { canEdit } from "@/data/mockAuth";
import { INITIAL_LANDING_BLOCKS, type LandingBlock } from "@/data/mockContent";

export function ContentLandingPage() {
  const { profile } = useAuth();
  const isEditor = profile ? canEdit("content", profile.role) : false;

  const [blocks, setBlocks] = useState<LandingBlock[]>(INITIAL_LANDING_BLOCKS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<LandingBlock | null>(null);

  const editingBlock = blocks.find((b) => b.id === editingId) ?? null;

  function openEditor(block: LandingBlock) {
    setEditingId(block.id);
    setDraft(structuredClone(block));
  }

  function closeEditor() {
    setEditingId(null);
    setDraft(null);
  }

  function saveDraft() {
    if (!draft) return;
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === draft.id
          ? { ...draft, updatedAt: "Vừa xong", updatedBy: profile?.full_name ?? b.updatedBy }
          : b,
      ),
    );
    closeEditor();
  }

  function togglePublish(id: string) {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: b.status === "published" ? "draft" : "published" } : b)),
    );
  }

  const publishedCount = blocks.filter((b) => b.status === "published").length;
  const draftCount = blocks.length - publishedCount;

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-6">
      <PageHeader
        title="Quản lý Content Landing"
        subtitle="Tùy biến văn bản, hình ảnh của từng khối trên landing page — không cần can thiệp mã nguồn."
        actions={
          <Button variant="outline" size="sm">
            <ExternalLink className="h-3.5 w-3.5" />
            Xem trang live
          </Button>
        }
      />

      {!isEditor && (
        <div className="flex items-center gap-2.5 rounded-[var(--radius-card)] border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] text-amber-700">
          <Lock className="h-4 w-4 shrink-0" />
          Tài khoản của bạn chỉ có quyền xem nội dung. Chỉ Super Admin và Marketing mới chỉnh sửa được landing page.
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <KpiCard kpi={{ id: "sections", title: "Tổng số khối nội dung", value: String(blocks.length), description: "Trên trang landing chính", icon: Files, tone: "default" }} />
        <KpiCard kpi={{ id: "published", title: "Đã xuất bản", value: String(publishedCount), description: "Đang hiển thị công khai", icon: Radio, tone: "default" }} />
        <KpiCard kpi={{ id: "draft", title: "Bản nháp", value: String(draftCount), description: "Chưa xuất bản", icon: FileEdit, tone: "default" }} />
      </div>

      <Card>
        <div className="flex flex-col gap-1 border-b border-[var(--color-border)] p-5">
          <h3 className="text-[15px] font-semibold text-[var(--color-text)]">Danh sách khối nội dung</h3>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Theo đúng cấu trúc landing page: Hero, Trust Bar, Pain Points, Lộ trình khóa học, Đội ngũ giáo viên, Testimonials, FAQ, Cam kết đầu ra, Social links, Hotline/Email.
          </p>
        </div>
        <ul className="divide-y divide-[var(--color-border)]">
          {blocks.map((block, index) => (
            <li key={block.id} className="flex flex-wrap items-center gap-4 px-5 py-4 hover:bg-gray-50">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-[12px] font-semibold text-[var(--color-text-secondary)]">
                {index + 1}
              </span>
              <div className="min-w-[200px] flex-1">
                <p className="text-[13px] font-semibold text-[var(--color-text)]">{block.name}</p>
                <p className="text-[12px] text-[var(--color-text-secondary)]">{block.description}</p>
              </div>
              <button
                onClick={() => isEditor && togglePublish(block.id)}
                disabled={!isEditor}
                title={isEditor ? "Bấm để đổi trạng thái" : undefined}
                className="disabled:cursor-default"
              >
                <Badge tone={block.status === "published" ? "success" : "warning"}>
                  {block.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                </Badge>
              </button>
              <div className="text-[12px] text-[var(--color-text-secondary)]">
                Cập nhật {block.updatedAt} · {block.updatedBy}
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <button
                  aria-label={`Xem ${block.name}`}
                  onClick={() => openEditor(block)}
                  className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-control)] text-[var(--color-text-secondary)] hover:bg-gray-100"
                >
                  <Eye className="h-4 w-4" />
                </button>
                {isEditor && (
                  <button
                    aria-label={`Sửa ${block.name}`}
                    onClick={() => openEditor(block)}
                    className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-control)] text-[var(--color-primary)] hover:bg-[var(--color-primary-light)]"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <Dialog
        open={!!editingBlock && !!draft}
        onClose={closeEditor}
        title={editingBlock ? `${isEditor ? "Chỉnh sửa" : "Xem"}: ${editingBlock.name}` : ""}
        description={editingBlock?.description}
        widthClassName="max-w-2xl"
        footer={
          isEditor ? (
            <>
              <Button variant="outline" size="sm" onClick={closeEditor}>Hủy</Button>
              <Button size="sm" onClick={saveDraft}>Lưu thay đổi</Button>
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={closeEditor}>Đóng</Button>
          )
        }
      >
        {draft && draft.kind === "form" && (
          <div className="flex flex-col gap-3.5">
            {draft.fields.map((field) => (
              <FormField key={field.key} label={field.label}>
                {field.type === "textarea" ? (
                  <TextAreaField
                    disabled={!isEditor}
                    value={draft.values[field.key] ?? ""}
                    onChange={(e) =>
                      setDraft((prev) =>
                        prev && prev.kind === "form"
                          ? { ...prev, values: { ...prev.values, [field.key]: e.target.value } }
                          : prev,
                      )
                    }
                  />
                ) : (
                  <TextField
                    disabled={!isEditor}
                    value={draft.values[field.key] ?? ""}
                    onChange={(e) =>
                      setDraft((prev) =>
                        prev && prev.kind === "form"
                          ? { ...prev, values: { ...prev.values, [field.key]: e.target.value } }
                          : prev,
                      )
                    }
                  />
                )}
              </FormField>
            ))}
          </div>
        )}

        {draft && draft.kind === "list" && (
          <div className="flex flex-col gap-4">
            {draft.items.map((item, itemIndex) => (
              <div key={itemIndex} className="rounded-[var(--radius-control)] border border-[var(--color-border)] p-3.5">
                <div className="mb-2.5 flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
                    {draft.itemLabel} #{itemIndex + 1}
                  </p>
                  {isEditor && (
                    <button
                      aria-label="Xóa mục"
                      onClick={() =>
                        setDraft((prev) =>
                          prev && prev.kind === "list"
                            ? { ...prev, items: prev.items.filter((_, i) => i !== itemIndex) }
                            : prev,
                        )
                      }
                      className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-control)] text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  {draft.fields.map((field) => (
                    <FormField key={field.key} label={field.label}>
                      {field.type === "textarea" ? (
                        <TextAreaField
                          disabled={!isEditor}
                          value={item[field.key] ?? ""}
                          onChange={(e) =>
                            setDraft((prev) => {
                              if (!prev || prev.kind !== "list") return prev;
                              const items = [...prev.items];
                              items[itemIndex] = { ...items[itemIndex], [field.key]: e.target.value };
                              return { ...prev, items };
                            })
                          }
                        />
                      ) : (
                        <TextField
                          disabled={!isEditor}
                          value={item[field.key] ?? ""}
                          onChange={(e) =>
                            setDraft((prev) => {
                              if (!prev || prev.kind !== "list") return prev;
                              const items = [...prev.items];
                              items[itemIndex] = { ...items[itemIndex], [field.key]: e.target.value };
                              return { ...prev, items };
                            })
                          }
                        />
                      )}
                    </FormField>
                  ))}
                </div>
              </div>
            ))}

            {isEditor && (
              <Button
                variant="outline"
                size="sm"
                className="w-fit"
                onClick={() =>
                  setDraft((prev) => {
                    if (!prev || prev.kind !== "list") return prev;
                    const blank = Object.fromEntries(prev.fields.map((f) => [f.key, ""]));
                    return { ...prev, items: [...prev.items, blank] };
                  })
                }
              >
                <Plus className="h-3.5 w-3.5" />
                Thêm {draft.itemLabel}
              </Button>
            )}
          </div>
        )}
      </Dialog>
    </div>
  );
}
