import { useMemo, useState } from "react";
import { GraduationCap, Plus, TrendingUp, Users2 } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SearchInput } from "@/components/shared/SearchInput";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ADMIN_COURSES } from "@/data/mockAdmin";

function formatVnd(amount: number) {
  return amount.toLocaleString("vi-VN") + "đ";
}

export function CoursesPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ADMIN_COURSES.filter((c) => !q || c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));
  }, [query]);

  const totalStudents = ADMIN_COURSES.reduce((sum, c) => sum + c.students, 0);
  const revenue = ADMIN_COURSES.reduce((sum, c) => sum + c.students * c.price, 0);
  const openCourses = ADMIN_COURSES.filter((c) => c.status === "open").length;

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-6">
      <PageHeader
        title="Quản lý khóa học"
        subtitle="Theo dõi số lượng học viên, học phí và tình trạng tuyển sinh từng khóa học."
        actions={
          <Button size="sm">
            <Plus className="h-3.5 w-3.5" />
            Thêm khóa học
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard kpi={{ id: "total", title: "Tổng khóa học", value: String(ADMIN_COURSES.length), description: "Trong hệ thống", icon: GraduationCap, tone: "default" }} />
        <KpiCard kpi={{ id: "open", title: "Đang mở tuyển sinh", value: String(openCourses), description: "Có thể đăng ký ngay", icon: GraduationCap, tone: "default" }} />
        <KpiCard kpi={{ id: "students", title: "Tổng học viên", value: totalStudents.toLocaleString("vi-VN"), description: "Đang theo học", icon: Users2, tone: "default" }} />
        <KpiCard kpi={{ id: "revenue", title: "Doanh thu ước tính", value: (revenue / 1_000_000).toFixed(0) + " triệu", description: "Từ học phí hiện tại", icon: TrendingUp, tone: "default" }} />
      </div>

      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[15px] font-semibold text-[var(--color-text)]">Danh sách khóa học</h3>
        <SearchInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm khóa học..."
          className="w-56"
          aria-label="Tìm khóa học"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((course) => {
          const fillRate = Math.round((course.students / course.capacity) * 100);
          return (
            <Card key={course.id} className="flex flex-col gap-4 p-5 transition-shadow hover:shadow-[var(--shadow-card-hover)]">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-primary)]">{course.category}</p>
                  <h4 className="mt-1 text-[15px] font-semibold leading-snug text-[var(--color-text)]">{course.name}</h4>
                </div>
                <Badge tone={course.status === "open" ? "success" : "neutral"}>
                  {course.status === "open" ? "Đang mở" : "Tạm đóng"}
                </Badge>
              </div>

              <p className="text-[18px] font-bold text-[var(--color-text)]">{formatVnd(course.price)}</p>

              <div>
                <div className="mb-1.5 flex items-center justify-between text-[12px]">
                  <span className="text-[var(--color-text-secondary)]">
                    {course.students}/{course.capacity} học viên
                  </span>
                  <span className="font-semibold text-[var(--color-text)]">{fillRate}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-500"
                    style={{ width: `${Math.min(fillRate, 100)}%` }}
                  />
                </div>
              </div>

              <div className="mt-auto flex gap-2 pt-1">
                <Button variant="outline" size="sm" className="flex-1">
                  Chi tiết
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  Chỉnh sửa
                </Button>
              </div>
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-full py-10 text-center text-[13px] text-[var(--color-text-secondary)]">
            Không tìm thấy khóa học phù hợp.
          </p>
        )}
      </div>
    </div>
  );
}
