import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LeadsByDayPoint } from "@/types/dashboard";

type ChartRange = "7d" | "30d";

interface LeadsChartProps {
  data: LeadsByDayPoint[];
  range: ChartRange;
  onRangeChange: (range: ChartRange) => void;
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 shadow-lg">
      <p className="text-[11px] font-medium text-[var(--color-text-secondary)]">{label}</p>
      <p className="text-sm font-bold text-[var(--color-text)]">{payload[0].value} leads</p>
    </div>
  );
}

export function LeadsChart({ data, range, onRangeChange }: LeadsChartProps) {
  const subtitle = range === "30d" ? "Thống kê 30 ngày gần nhất" : "Thống kê 7 ngày gần nhất";

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle>Số Lượng Leads Theo Thời Gian</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </div>
        <div className="flex shrink-0 rounded-[var(--radius-control)] bg-gray-100 p-1">
          {(["7d", "30d"] as const).map((key) => (
            <button
              key={key}
              onClick={() => onRangeChange(key)}
              className={cn(
                "rounded-[6px] px-3 py-1 text-[12px] font-medium transition-colors",
                range === key
                  ? "bg-white text-[var(--color-primary)] shadow-sm"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]",
              )}
            >
              {key === "7d" ? "7 ngày" : "30 ngày"}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="h-[320px] pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--color-border)" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--color-primary-light)" }} />
            <Bar
              dataKey="leads"
              fill="var(--color-primary)"
              radius={[6, 6, 0, 0]}
              maxBarSize={44}
              animationDuration={500}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
