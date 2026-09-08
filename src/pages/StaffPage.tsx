import { useMemo, useState } from "react";
import { Plus, UserCog, Users2 } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SearchInput } from "@/components/shared/SearchInput";
import { FilterSelect } from "@/components/shared/FilterSelect";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { STAFF_MEMBERS } from "@/data/mockAdmin";

const DEPARTMENTS = ["Tất cả phòng ban", ...Array.from(new Set(STAFF_MEMBERS.map((s) => s.department)))];

function initials(name: string) {
  const parts = name.trim().split(" ");
  return (parts[0]?.[0] ?? "").concat(parts[parts.length - 1]?.[0] ?? "").toUpperCase();
}

export function StaffPage() {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("Tất cả phòng ban");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return STAFF_MEMBERS.filter((s) => {
      const matchesQuery = !q || s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
      const matchesDept = department === "Tất cả phòng ban" || s.department === department;
      return matchesQuery && matchesDept;
    });
  }, [query, department]);

  const activeCount = STAFF_MEMBERS.filter((s) => s.status === "active").length;

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-6">
      <PageHeader
        title="Quản lý nhân viên"
        subtitle="Danh sách nhân sự, vai trò và phòng ban trong hệ thống HuyWay English."
        actions={
          <Button size="sm">
            <Plus className="h-3.5 w-3.5" />
            Thêm nhân viên
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard kpi={{ id: "total", title: "Tổng nhân viên", value: String(STAFF_MEMBERS.length), description: "Toàn bộ hệ thống", icon: Users2, tone: "default" }} />
        <KpiCard kpi={{ id: "active", title: "Đang hoạt động", value: String(activeCount), description: "Đang làm việc", icon: UserCog, tone: "default" }} />
        <KpiCard kpi={{ id: "cskh", title: "Nhân viên CSKH", value: String(STAFF_MEMBERS.filter((s) => s.role === "CSKH").length), description: "Chăm sóc khách hàng", icon: Users2, tone: "default" }} />
        <KpiCard kpi={{ id: "teachers", title: "Giáo viên", value: String(STAFF_MEMBERS.filter((s) => s.department === "Đào tạo").length), description: "Phụ trách giảng dạy", icon: Users2, tone: "default" }} />
      </div>

      <Card>
        <div className="flex flex-col gap-3 border-b border-[var(--color-border)] p-5 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-[15px] font-semibold text-[var(--color-text)]">Danh sách nhân viên</h3>
          <div className="flex flex-wrap gap-2">
            <SearchInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm tên, email..."
              className="w-52"
              aria-label="Tìm nhân viên"
            />
            <FilterSelect value={department} onChange={(e) => setDepartment(e.target.value)} aria-label="Lọc theo phòng ban">
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </FilterSelect>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-[11px] uppercase tracking-wide text-[var(--color-text-secondary)]">
                <th scope="col" className="px-5 py-3 font-semibold">Nhân viên</th>
                <th scope="col" className="px-3 py-3 font-semibold">Vai trò</th>
                <th scope="col" className="px-3 py-3 font-semibold">Phòng ban</th>
                <th scope="col" className="px-3 py-3 font-semibold">Ngày vào làm</th>
                <th scope="col" className="px-3 py-3 font-semibold">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((staff) => (
                <tr key={staff.id} className="border-b border-[var(--color-border)] text-[13px] last:border-0 hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-light)] text-[11px] font-semibold text-[var(--color-primary-dark)]">
                        {initials(staff.name)}
                      </div>
                      <div>
                        <p className="font-medium text-[var(--color-text)]">{staff.name}</p>
                        <p className="text-[12px] text-[var(--color-text-secondary)]">{staff.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-[var(--color-text)]">{staff.role}</td>
                  <td className="px-3 py-3 text-[var(--color-text-secondary)]">{staff.department}</td>
                  <td className="px-3 py-3 text-[var(--color-text-secondary)]">{staff.joinedAt}</td>
                  <td className="px-3 py-3">
                    <Badge tone={staff.status === "active" ? "success" : "neutral"}>
                      {staff.status === "active" ? "Đang làm việc" : "Đã nghỉ"}
                    </Badge>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-[13px] text-[var(--color-text-secondary)]">
                    Không tìm thấy nhân viên phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
