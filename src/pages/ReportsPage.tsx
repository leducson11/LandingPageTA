import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Download, FileSpreadsheet, TrendingUp, Wallet } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { REVENUE_TREND, STAFF_PERFORMANCE } from "@/data/mockAdmin";

function RevenueTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; dataKey: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 shadow-lg">
      <p className="mb-1 text-[11px] font-medium text-[var(--color-text-secondary)]">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-[12px] font-semibold text-[var(--color-text)]">
          {entry.dataKey === "revenue" ? "Doanh thu" : "Mục tiêu"}: {entry.value} triệu
        </p>
      ))}
    </div>
  );
}

function conversionTone(rate: number) {
  if (rate >= 35) return "text-emerald-600";
  if (rate >= 25) return "text-amber-600";
  return "text-red-500";
}

export function ReportsPage() {
  const latest = REVENUE_TREND[REVENUE_TREND.length - 1];
  const previous = REVENUE_TREND[REVENUE_TREND.length - 2];
  const growth = (((latest.revenue - previous.revenue) / previous.revenue) * 100).toFixed(1);
  const totalRevenue = REVENUE_TREND.reduce((sum, p) => sum + p.revenue, 0);
  const avgTarget = Math.round(REVENUE_TREND.reduce((sum, p) => sum + p.target, 0) / REVENUE_TREND.length);

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-6">
      <PageHeader
        title="Báo cáo & Thống kê"
        subtitle="Tổng hợp doanh thu, hiệu suất đội ngũ CSKH và tiến độ so với mục tiêu."
        actions={
          <>
            <Button variant="outline" size="sm">
              <FileSpreadsheet className="h-3.5 w-3.5" />
              Xuất Excel
            </Button>
            <Button size="sm">
              <Download className="h-3.5 w-3.5" />
              Xuất báo cáo PDF
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <KpiCard
          kpi={{
            id: "revenue",
            title: "Doanh thu 7 tháng",
            value: `${totalRevenue.toLocaleString("vi-VN")} triệu`,
            trend: `${Number(growth) >= 0 ? "+" : ""}${growth}%`,
            trendDirection: Number(growth) >= 0 ? "up" : "down",
            description: "So với tháng trước",
            icon: Wallet,
            tone: "default",
          }}
        />
        <KpiCard
          kpi={{
            id: "target",
            title: "Mục tiêu trung bình",
            value: `${avgTarget} triệu / tháng`,
            description: "Kế hoạch doanh thu đề ra",
            icon: TrendingUp,
            tone: "default",
          }}
        />
        <KpiCard
          kpi={{
            id: "conversion",
            title: "Tỷ lệ chốt trung bình CSKH",
            value: `${(
              STAFF_PERFORMANCE.reduce((sum, s) => sum + s.conversionRate, 0) / STAFF_PERFORMANCE.length
            ).toFixed(1)}%`,
            description: "Trung bình 3 nhân viên CSKH",
            icon: TrendingUp,
            tone: "default",
          }}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Doanh Thu Theo Tháng</CardTitle>
          <CardDescription>So sánh doanh thu thực tế với mục tiêu đề ra (đơn vị: triệu đồng)</CardDescription>
        </CardHeader>
        <CardContent className="h-[340px] pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={REVENUE_TREND} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--color-border)" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
              <Tooltip content={<RevenueTooltip />} cursor={{ fill: "var(--color-primary-light)" }} />
              <Bar dataKey="revenue" fill="var(--color-primary)" radius={[6, 6, 0, 0]} maxBarSize={40} animationDuration={500} />
              <Line
                type="monotone"
                dataKey="target"
                stroke="var(--color-warning)"
                strokeWidth={2}
                strokeDasharray="5 4"
                dot={{ r: 3 }}
                animationDuration={500}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hiệu Suất Đội Ngũ CSKH</CardTitle>
          <CardDescription>Số lead xử lý và tỷ lệ chốt của từng nhân viên</CardDescription>
        </CardHeader>
        <div className="overflow-x-auto p-5 pt-4">
          <table className="w-full min-w-[520px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-[11px] uppercase tracking-wide text-[var(--color-text-secondary)]">
                <th scope="col" className="pb-2 font-semibold">Nhân viên</th>
                <th scope="col" className="pb-2 pl-4 font-semibold">Lead đã xử lý</th>
                <th scope="col" className="pb-2 pl-4 font-semibold">Đã chốt</th>
                <th scope="col" className="pb-2 pl-4 font-semibold">Tỷ lệ chốt</th>
                <th scope="col" className="pb-2 pl-4 font-semibold">Xếp hạng</th>
              </tr>
            </thead>
            <tbody>
              {[...STAFF_PERFORMANCE]
                .sort((a, b) => b.conversionRate - a.conversionRate)
                .map((staff, index) => (
                  <tr key={staff.id} className="border-b border-[var(--color-border)] text-[13px] last:border-0 hover:bg-gray-50">
                    <td className="py-3 font-medium text-[var(--color-text)]">{staff.name}</td>
                    <td className="py-3 pl-4 text-[var(--color-text)]">{staff.leadsHandled}</td>
                    <td className="py-3 pl-4 text-[var(--color-text)]">{staff.closed}</td>
                    <td className={`py-3 pl-4 font-semibold ${conversionTone(staff.conversionRate)}`}>
                      {staff.conversionRate.toFixed(1)}%
                    </td>
                    <td className="py-3 pl-4">
                      <Badge tone={index === 0 ? "success" : "neutral"}>
                        {index === 0 ? "Top 1" : `Hạng ${index + 1}`}
                      </Badge>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
