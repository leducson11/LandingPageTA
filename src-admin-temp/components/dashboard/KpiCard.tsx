import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { DashboardKPI } from "@/types/dashboard";

export function KpiCard({ kpi }: { kpi: DashboardKPI }) {
  const Icon = kpi.icon;
  const isDanger = kpi.tone === "danger";

  return (
    <Card
      className={cn(
        "flex flex-col gap-3 p-5 transition-shadow hover:shadow-[var(--shadow-card-hover)]",
        isDanger && "border-red-200 bg-red-50/40 ring-1 ring-red-100 border-l-4 border-l-red-500",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p
          className={cn(
            "text-[11px] font-semibold tracking-wide text-[var(--color-text-secondary)]",
            isDanger && "text-red-600",
          )}
        >
          {kpi.title.toUpperCase()}
        </p>
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
            isDanger
              ? "bg-red-100 text-red-600"
              : "bg-[var(--color-primary-light)] text-[var(--color-primary)]",
          )}
        >
          <Icon className="h-[18px] w-[18px]" />
        </div>
      </div>

      <div className="flex items-end justify-between gap-2">
        <p
          className={cn(
            "text-[28px] font-extrabold leading-none tracking-tight text-[var(--color-text)]",
            isDanger && "text-red-600",
          )}
        >
          {kpi.value}
        </p>
        {kpi.trend && (
          <span
            className={cn(
              "flex items-center gap-0.5 text-[12px] font-semibold",
              kpi.trendDirection === "down" ? "text-red-500" : "text-emerald-600",
            )}
          >
            {kpi.trendDirection === "down" ? (
              <ArrowDownRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowUpRight className="h-3.5 w-3.5" />
            )}
            {kpi.trend}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <p className={cn("text-[12px] text-[var(--color-text-secondary)]", isDanger && "text-red-500/80")}>
          {kpi.description}
        </p>
        {kpi.badge && (
          <Badge tone="danger" className="w-fit">
            {kpi.badge}
          </Badge>
        )}
      </div>
    </Card>
  );
}
