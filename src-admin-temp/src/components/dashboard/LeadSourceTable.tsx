import { useMemo, useState } from "react";
import { ArrowUpDown, Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { SyncStatus, TrafficSource } from "@/types/dashboard";

const SYNC_LABEL: Record<SyncStatus, { label: string; tone: "success" | "warning" | "danger" | "primary" }> = {
  auto: { label: "Auto Synced", tone: "success" },
  pending: { label: "Pending", tone: "warning" },
  error: { label: "Error", tone: "danger" },
  full: { label: "Full Synced", tone: "primary" },
};

function conversionTone(rate: number) {
  if (rate >= 40) return "text-emerald-600";
  if (rate >= 25) return "text-amber-600";
  return "text-red-500";
}

type SortKey = "channel" | "registrations" | "conversionRate";

export function LeadSourceTable({ sources }: { sources: TrafficSource[] }) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("registrations");
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = q ? sources.filter((s) => s.channel.toLowerCase().includes(q)) : sources;
    const sorted = [...rows].sort((a, b) => {
      const dir = sortAsc ? 1 : -1;
      if (sortKey === "channel") return a.channel.localeCompare(b.channel) * dir;
      return (a[sortKey] - b[sortKey]) * dir;
    });
    return sorted;
  }, [sources, query, sortKey, sortAsc]);

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortAsc((prev) => !prev);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle>Nguồn Lead Hiệu Quả (Tracking)</CardTitle>
          <CardDescription>Số lượng đăng ký phân bổ theo kênh Marketing</CardDescription>
        </div>
        <div className="relative shrink-0">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kênh..."
            aria-label="Tìm kênh traffic"
            className="h-8 w-32 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-white pl-8 pr-2 text-[12px] outline-none focus:border-[var(--color-primary)] sm:w-40"
          />
        </div>
      </CardHeader>

      <div className="overflow-x-auto p-5 pt-4">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[var(--color-border)] text-[11px] uppercase tracking-wide text-[var(--color-text-secondary)]">
              <th scope="col" className="pb-2 font-semibold">
                <SortButton label="Kênh Traffic" active={sortKey === "channel"} asc={sortAsc} onClick={() => toggleSort("channel")} />
              </th>
              <th scope="col" className="pb-2 pl-4 font-semibold">
                <SortButton label="Lượt ĐK" active={sortKey === "registrations"} asc={sortAsc} onClick={() => toggleSort("registrations")} />
              </th>
              <th scope="col" className="pb-2 pl-4 font-semibold">
                <SortButton label="Tỷ Lệ Chốt" active={sortKey === "conversionRate"} asc={sortAsc} onClick={() => toggleSort("conversionRate")} />
              </th>
              <th scope="col" className="pb-2 pl-4 font-semibold">Trạng thái Google Sheet</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((source) => {
              const sync = SYNC_LABEL[source.syncStatus];
              return (
                <tr
                  key={source.id}
                  className="border-b border-[var(--color-border)] text-[13px] last:border-0 hover:bg-gray-50"
                >
                  <td className="py-3 font-medium text-[var(--color-text)]">{source.channel}</td>
                  <td className="py-3 pl-4 text-[var(--color-text)]">{source.registrations}</td>
                  <td className={cn("py-3 pl-4 font-semibold", conversionTone(source.conversionRate))}>
                    {source.conversionRate.toFixed(1)}%
                  </td>
                  <td className="py-3 pl-4">
                    <Badge tone={sync.tone}>{sync.label}</Badge>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-[13px] text-[var(--color-text-secondary)]">
                  Không tìm thấy kênh phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function SortButton({
  label,
  active,
  asc,
  onClick,
}: {
  label: string;
  active: boolean;
  asc: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1 transition-colors hover:text-[var(--color-text)]",
        active && "text-[var(--color-primary)]",
      )}
    >
      {label}
      <ArrowUpDown className={cn("h-3 w-3", active && (asc ? "rotate-180" : ""))} />
    </button>
  );
}
