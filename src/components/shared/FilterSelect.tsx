import { ChevronDown } from "lucide-react";
import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function FilterSelect({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={cn(
          "h-9 appearance-none rounded-[var(--radius-control)] border border-[var(--color-border)] bg-white py-0 pl-3 pr-8 text-[13px] text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
    </div>
  );
}
