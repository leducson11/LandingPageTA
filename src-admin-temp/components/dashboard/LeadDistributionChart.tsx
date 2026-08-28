import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { LeadStatusSlice } from "@/types/dashboard";

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { name: string; value: number; payload: LeadStatusSlice }[];
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 shadow-lg">
      <p className="text-[11px] font-medium text-[var(--color-text-secondary)]">{item.name}</p>
      <p className="text-sm font-bold text-[var(--color-text)]">{item.value}%</p>
    </div>
  );
}

export function LeadDistributionChart({ data }: { data: LeadStatusSlice[] }) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Phân Bổ Trạng Thái Lead</CardTitle>
        <CardDescription>Tỷ lệ xử lý CSKH</CardDescription>
      </CardHeader>
      <CardContent className="flex h-[320px] flex-col items-center justify-center gap-4 pt-4">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              innerRadius={58}
              outerRadius={86}
              paddingAngle={2}
              animationDuration={500}
            >
              {data.map((slice) => (
                <Cell key={slice.id} fill={slice.color} stroke="white" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <ul className="grid w-full grid-cols-2 gap-x-3 gap-y-2 px-2">
          {data.map((slice) => (
            <li key={slice.id} className="flex items-center gap-1.5 text-[12px] text-[var(--color-text)]">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: slice.color }}
              />
              <span className="truncate text-[var(--color-text-secondary)]">{slice.label}</span>
              <span className="ml-auto font-semibold">{slice.value}%</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
