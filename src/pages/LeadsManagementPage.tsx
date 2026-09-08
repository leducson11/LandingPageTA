import { useMemo, useState } from "react";
import { AlertTriangle, Plus, Target, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SearchInput } from "@/components/shared/SearchInput";
import { Pagination } from "@/components/shared/Pagination";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePagination } from "@/lib/use-pagination";
import { LEAD_ROWS } from "@/data/mockAdmin";
import type { LeadStatus } from "@/types/admin";

const STATUS_META: Record<LeadStatus, { label: string; tone: "primary" | "warning" | "success" | "danger" }> = {
  new: { label: "Mới", tone: "primary" },
  "in-progress": { label: "Đang tư vấn", tone: "warning" },
  deposited: { label: "Đã cọc", tone: "success" },
  dropped: { label: "Bỏ cuộc", tone: "danger" },
};

const TABS: { key: LeadStatus | "all"; label: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "new", label: "Mới" },
  { key: "in-progress", label: "Đang tư vấn" },
  { key: "deposited", label: "Đã cọc" },
  { key: "dropped", label: "Bỏ cuộc" },
];

export function LeadsManagementPage() {
  const [tab, setTab] = useState<LeadStatus | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return LEAD_ROWS.filter((lead) => {
      const matchesTab = tab === "all" || lead.status === tab;
      const matchesQuery = !q || lead.name.toLowerCase().includes(q) || lead.phone.includes(q);
      return matchesTab && matchesQuery;
    });
  }, [tab, query]);

  const { page, totalPages, pageItems, goTo } = usePagination(filtered, 8);

  const overdue = LEAD_ROWS.filter((l) => l.status === "new" || l.status === "in-progress").length;
  const deposited = LEAD_ROWS.filter((l) => l.status === "deposited").length;
  const conversionRate = ((deposited / LEAD_ROWS.length) * 100).toFixed(1);

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-6">
      <PageHeader
        title="Quản lý Leads"
        subtitle="Danh sách toàn bộ lead từ các kênh Marketing và tiến trình xử lý CSKH."
        actions={
          <Button size="sm">
            <Plus className="h-3.5 w-3.5" />
            Thêm lead thủ công
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <KpiCard kpi={{ id: "total", title: "Tổng số Leads", value: String(LEAD_ROWS.length), description: "Trong 30 ngày gần nhất", icon: Target, tone: "default" }} />
        <KpiCard kpi={{ id: "pending", title: "Đang chờ xử lý", value: String(overdue), description: "Mới + Đang tư vấn", icon: AlertTriangle, tone: "danger" }} />
        <KpiCard kpi={{ id: "rate", title: "Tỷ lệ chốt", value: `${conversionRate}%`, description: "Lead đã đặt cọc", icon: TrendingUp, tone: "default" }} />
      </div>

      <Card>
        <div className="flex flex-col gap-4 border-b border-[var(--color-border)] p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-1 rounded-[var(--radius-control)] bg-gray-100 p-1">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => {
                    setTab(t.key);
                    goTo(1);
                  }}
                  className={cn(
                    "rounded-[6px] px-3 py-1.5 text-[12px] font-medium transition-colors",
                    tab === t.key ? "bg-white text-[var(--color-primary)] shadow-sm" : "text-[var(--color-text-secondary)]",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <SearchInput
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                goTo(1);
              }}
              placeholder="Tìm tên, SĐT..."
              className="w-52"
              aria-label="Tìm lead"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-[11px] uppercase tracking-wide text-[var(--color-text-secondary)]">
                <th scope="col" className="px-5 py-3 font-semibold">Lead</th>
                <th scope="col" className="px-3 py-3 font-semibold">Khóa học quan tâm</th>
                <th scope="col" className="px-3 py-3 font-semibold">Nguồn</th>
                <th scope="col" className="px-3 py-3 font-semibold">CSKH</th>
                <th scope="col" className="px-3 py-3 font-semibold">Liên hệ gần nhất</th>
                <th scope="col" className="px-3 py-3 font-semibold">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((lead) => {
                const meta = STATUS_META[lead.status];
                return (
                  <tr key={lead.id} className="border-b border-[var(--color-border)] text-[13px] last:border-0 hover:bg-gray-50">
                    <td className="px-5 py-3">
                      <p className="font-medium text-[var(--color-text)]">{lead.name}</p>
                      <p className="text-[12px] text-[var(--color-text-secondary)]">{lead.phone}</p>
                    </td>
                    <td className="px-3 py-3 text-[var(--color-text)]">{lead.courseInterest}</td>
                    <td className="px-3 py-3 text-[var(--color-text-secondary)]">{lead.source}</td>
                    <td className="px-3 py-3 text-[var(--color-text)]">{lead.assignee}</td>
                    <td className="px-3 py-3 text-[var(--color-text-secondary)]">{lead.lastContact}</td>
                    <td className="px-3 py-3">
                      <Badge tone={meta.tone}>{meta.label}</Badge>
                    </td>
                  </tr>
                );
              })}
              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-[13px] text-[var(--color-text-secondary)]">
                    Không có lead nào phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination page={page} totalPages={totalPages} totalItems={filtered.length} pageSize={8} onPageChange={goTo} />
      </Card>
    </div>
  );
}
