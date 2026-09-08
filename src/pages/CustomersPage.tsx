import { useMemo, useState } from "react";
import { Download, Plus, UserCheck, UserPlus, Users2, UserX } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SearchInput } from "@/components/shared/SearchInput";
import { FilterSelect } from "@/components/shared/FilterSelect";
import { Pagination } from "@/components/shared/Pagination";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePagination } from "@/lib/use-pagination";
import { CUSTOMERS } from "@/data/mockAdmin";
import type { Customer, CustomerStatus } from "@/types/admin";

const STATUS_META: Record<CustomerStatus, { label: string; tone: "primary" | "warning" | "success" | "danger" }> = {
  new: { label: "Mới", tone: "primary" },
  "in-progress": { label: "Đang tư vấn", tone: "warning" },
  won: { label: "Đã chốt", tone: "success" },
  lost: { label: "Bỏ cuộc", tone: "danger" },
};

const STATUS_OPTIONS: { value: CustomerStatus | "all"; label: string }[] = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "new", label: "Mới" },
  { value: "in-progress", label: "Đang tư vấn" },
  { value: "won", label: "Đã chốt" },
  { value: "lost", label: "Bỏ cuộc" },
];

export function CustomersPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CUSTOMERS.filter((c: Customer) => {
      const matchesQuery =
        !q || c.name.toLowerCase().includes(q) || c.phone.includes(q) || c.email.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || c.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  const { page, totalPages, pageItems, goTo } = usePagination(filtered, 8);

  const total = CUSTOMERS.length;
  const inProgress = CUSTOMERS.filter((c) => c.status === "in-progress").length;
  const newThisWeek = CUSTOMERS.filter((c) => c.status === "new").length;

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-6">
      <PageHeader
        title="Danh sách khách hàng"
        subtitle="Theo dõi toàn bộ khách hàng tiềm năng và tiến trình chăm sóc CSKH."
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="h-3.5 w-3.5" />
              Xuất Excel
            </Button>
            <Button size="sm">
              <Plus className="h-3.5 w-3.5" />
              Thêm khách hàng
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard kpi={{ id: "total", title: "Tổng khách hàng", value: String(total), description: "Toàn bộ hệ thống", icon: Users2, tone: "default" }} />
        <KpiCard kpi={{ id: "new", title: "Mới chưa liên hệ", value: String(newThisWeek), description: "Cần CSKH tiếp cận", icon: UserPlus, tone: "default" }} />
        <KpiCard kpi={{ id: "in-progress", title: "Đang chăm sóc", value: String(inProgress), description: "Đang trong phễu tư vấn", icon: UserCheck, tone: "default" }} />
        <KpiCard kpi={{ id: "lost", title: "Đã bỏ cuộc", value: String(CUSTOMERS.filter((c) => c.status === "lost").length), description: "Không phản hồi / từ chối", icon: UserX, tone: "danger" }} />
      </div>

      <Card className="flex flex-col">
        <div className="flex flex-col gap-3 border-b border-[var(--color-border)] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-[15px] font-semibold text-[var(--color-text)]">Toàn bộ khách hàng</h3>
            <p className="text-xs text-[var(--color-text-secondary)]">{filtered.length} khách hàng phù hợp bộ lọc</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <SearchInput
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                goTo(1);
              }}
              placeholder="Tìm tên, SĐT, email..."
              className="w-56"
              aria-label="Tìm khách hàng"
            />
            <FilterSelect
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as CustomerStatus | "all");
                goTo(1);
              }}
              aria-label="Lọc theo trạng thái"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </FilterSelect>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[840px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-[11px] uppercase tracking-wide text-[var(--color-text-secondary)]">
                <th scope="col" className="px-5 py-3 font-semibold">Khách hàng</th>
                <th scope="col" className="px-3 py-3 font-semibold">Khóa học quan tâm</th>
                <th scope="col" className="px-3 py-3 font-semibold">Nguồn</th>
                <th scope="col" className="px-3 py-3 font-semibold">CSKH phụ trách</th>
                <th scope="col" className="px-3 py-3 font-semibold">Trạng thái</th>
                <th scope="col" className="px-3 py-3 font-semibold">Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((customer) => {
                const meta = STATUS_META[customer.status];
                return (
                  <tr key={customer.id} className="border-b border-[var(--color-border)] text-[13px] last:border-0 hover:bg-gray-50">
                    <td className="px-5 py-3">
                      <p className="font-medium text-[var(--color-text)]">{customer.name}</p>
                      <p className="text-[12px] text-[var(--color-text-secondary)]">{customer.phone} · {customer.email}</p>
                    </td>
                    <td className="px-3 py-3 text-[var(--color-text)]">{customer.courseInterest}</td>
                    <td className="px-3 py-3 text-[var(--color-text-secondary)]">{customer.source}</td>
                    <td className="px-3 py-3 text-[var(--color-text)]">{customer.assignee}</td>
                    <td className="px-3 py-3">
                      <Badge tone={meta.tone}>{meta.label}</Badge>
                    </td>
                    <td className="px-3 py-3 text-[var(--color-text-secondary)]">{customer.createdAt}</td>
                  </tr>
                );
              })}
              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-[13px] text-[var(--color-text-secondary)]">
                    Không tìm thấy khách hàng phù hợp.
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
