import { useMemo, useRef, useState } from "react";
import { Calendar, Sparkles } from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { LeadsChart } from "@/components/dashboard/LeadsChart";
import { LeadDistributionChart } from "@/components/dashboard/LeadDistributionChart";
import { CourseInterest } from "@/components/dashboard/CourseInterest";
import { LeadSourceTable } from "@/components/dashboard/LeadSourceTable";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getDashboardData } from "@/data/mockDashboard";
import type { DateRangeKey } from "@/types/dashboard";

const DATE_FILTERS: { key: DateRangeKey; label: string }[] = [
  { key: "today", label: "Hôm nay" },
  { key: "7d", label: "7 ngày" },
  { key: "30d", label: "30 ngày" },
  { key: "custom", label: "Tùy chỉnh" },
];

function KpiSkeleton() {
  return (
    <Card className="flex h-[148px] animate-pulse flex-col gap-3 p-5">
      <div className="h-3 w-24 rounded bg-gray-100" />
      <div className="h-7 w-16 rounded bg-gray-100" />
      <div className="h-3 w-32 rounded bg-gray-100" />
    </Card>
  );
}

function ChartSkeleton({ className }: { className?: string }) {
  return <Card className={cn("h-[320px] animate-pulse", className)} />;
}

export function Dashboard() {
  const [range, setRange] = useState<DateRangeKey>("7d");
  const [chartRange, setChartRange] = useState<Exclude<DateRangeKey, "today" | "custom">>("7d");
  const [isLoading, setIsLoading] = useState(false);
  const loadingTimeout = useRef<number | undefined>(undefined);

  function handleRangeChange(next: DateRangeKey) {
    setRange(next);
    setIsLoading(true);
    window.clearTimeout(loadingTimeout.current);
    loadingTimeout.current = window.setTimeout(() => setIsLoading(false), 420);
  }

  const dataset = useMemo(() => getDashboardData(range), [range]);
  const chartDataset = useMemo(
    () => (range === "today" ? dataset : getDashboardData(chartRange)),
    [range, chartRange, dataset],
  );

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-6">
      {/* Role info banner */}
      <div className="flex items-start gap-2.5 rounded-[var(--radius-card)] border border-[var(--color-primary)]/15 bg-[var(--color-primary-light)] px-4 py-3">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
        <p className="text-[13px] leading-relaxed text-[var(--color-primary-dark)]">
          <span className="font-semibold">Giao diện Dashboard Super Admin:</span> Hiển thị đầy
          đủ số liệu Marketing, Tư vấn CSKH và đồng bộ landing page.
        </p>
      </div>

      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-[20px] font-bold text-[var(--color-text)] sm:text-[22px]">
            Dashboard Thống Kê
          </h2>
          <p className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
            Theo dõi hiệu quả Marketing, Tư vấn CSKH và đồng bộ dữ liệu.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-1.5 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-white p-1">
          <Calendar className="ml-1.5 h-3.5 w-3.5 text-gray-400" />
          {DATE_FILTERS.map((filter) => (
            <button
              key={filter.key}
              onClick={() => handleRangeChange(filter.key)}
              className={cn(
                "rounded-[6px] px-2.5 py-1.5 text-[12px] font-medium transition-colors",
                range === filter.key
                  ? "bg-[var(--color-primary)] text-white shadow-sm"
                  : "text-[var(--color-text-secondary)] hover:bg-gray-100",
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <KpiSkeleton key={i} />)
          : dataset.kpis.map((kpi) => <KpiCard key={kpi.id} kpi={kpi} />)}
      </div>

      {/* Charts row: 2/3 + 1/3 */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2">
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <LeadsChart data={chartDataset.leadsByDay} range={chartRange} onRangeChange={setChartRange} />
          )}
        </div>
        <div>{isLoading ? <ChartSkeleton /> : <LeadDistributionChart data={dataset.leadStatus} />}</div>
      </div>

      {/* Bottom row: 1/2 + 1/2 */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {isLoading ? (
          <>
            <ChartSkeleton className="h-[420px]" />
            <ChartSkeleton className="h-[420px]" />
          </>
        ) : (
          <>
            <CourseInterest courses={dataset.courses} />
            <LeadSourceTable sources={dataset.trafficSources} />
          </>
        )}
      </div>
    </div>
  );
}
