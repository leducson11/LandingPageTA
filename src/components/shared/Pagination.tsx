import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, totalItems, pageSize, onPageChange }: PaginationProps) {
  if (totalItems === 0) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-[var(--color-border)] px-5 py-3 sm:flex-row">
      <p className="text-[12px] text-[var(--color-text-secondary)]">
        Hiển thị <span className="font-medium text-[var(--color-text)]">{start}–{end}</span> trên{" "}
        <span className="font-medium text-[var(--color-text)]">{totalItems}</span> kết quả
      </p>
      <div className="flex items-center gap-1">
        <button
          aria-label="Trang trước"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => onPageChange(n)}
            aria-current={n === page ? "page" : undefined}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-[var(--radius-control)] text-[12px] font-medium",
              n === page
                ? "bg-[var(--color-primary)] text-white"
                : "text-[var(--color-text-secondary)] hover:bg-gray-100",
            )}
          >
            {n}
          </button>
        ))}
        <button
          aria-label="Trang sau"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
