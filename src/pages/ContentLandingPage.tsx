import { useState } from "react";
import { ExternalLink, FileEdit, Files, Eye, Pencil, Plus, Radio } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LANDING_SECTIONS } from "@/data/mockAdmin";
import type { StatMini } from "@/types/admin";

const STATS: StatMini[] = [
  { id: "sections", title: "Tổng số Section", value: String(LANDING_SECTIONS.length), description: "Trên trang landing chính", icon: Files },
  { id: "published", title: "Đã xuất bản", value: String(LANDING_SECTIONS.filter((s) => s.status === "published").length), description: "Đang hiển thị công khai", icon: Radio },
  { id: "draft", title: "Bản nháp", value: String(LANDING_SECTIONS.filter((s) => s.status === "draft").length), description: "Chưa xuất bản", icon: FileEdit },
];

export function ContentLandingPage() {
  const [sections] = useState(LANDING_SECTIONS);

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-6">
      <PageHeader
        title="Quản lý Content Landing"
        subtitle="Chỉnh sửa nội dung, thứ tự và trạng thái các section trên trang landing page."
        actions={
          <>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-3.5 w-3.5" />
              Xem trang live
            </Button>
            <Button size="sm">
              <Plus className="h-3.5 w-3.5" />
              Thêm Section
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {STATS.map((stat) => (
          <KpiCard
            key={stat.id}
            kpi={{
              id: stat.id,
              title: stat.title,
              value: stat.value,
              description: stat.description,
              icon: stat.icon,
              tone: "default",
            }}
          />
        ))}
      </div>

      <Card>
        <div className="flex flex-col gap-1 border-b border-[var(--color-border)] p-5">
          <h3 className="text-[15px] font-semibold text-[var(--color-text)]">Danh sách Section</h3>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Kéo thả để sắp xếp lại thứ tự hiển thị trên landing page (demo tĩnh).
          </p>
        </div>
        <ul className="divide-y divide-[var(--color-border)]">
          {sections.map((section, index) => (
            <li key={section.id} className="flex flex-wrap items-center gap-4 px-5 py-4 hover:bg-gray-50">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-[12px] font-semibold text-[var(--color-text-secondary)]">
                {index + 1}
              </span>
              <div className="min-w-[180px] flex-1">
                <p className="text-[13px] font-semibold text-[var(--color-text)]">{section.name}</p>
                <p className="text-[12px] text-[var(--color-text-secondary)]">{section.type}</p>
              </div>
              <Badge tone={section.status === "published" ? "success" : "warning"}>
                {section.status === "published" ? "Đã xuất bản" : "Bản nháp"}
              </Badge>
              <div className="text-[12px] text-[var(--color-text-secondary)]">
                Cập nhật {section.updatedAt} · {section.updatedBy}
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <button
                  aria-label={`Xem ${section.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-control)] text-[var(--color-text-secondary)] hover:bg-gray-100"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  aria-label={`Sửa ${section.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-control)] text-[var(--color-text-secondary)] hover:bg-gray-100"
                >
                  <Pencil className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
