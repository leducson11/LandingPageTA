import { Search } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function SearchInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
      <input
        className={cn(
          "h-9 w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-white pl-8 pr-3 text-[13px] outline-none placeholder:text-gray-400 focus:border-[var(--color-primary)]",
          className,
        )}
        {...props}
      />
    </div>
  );
}
