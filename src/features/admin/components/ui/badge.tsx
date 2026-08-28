import type { HTMLAttributes } from "react";
import { cn } from "@admin/lib/utils";

type BadgeTone = "primary" | "success" | "warning" | "danger" | "neutral" | "violet";

const toneClasses: Record<BadgeTone, string> = {
  primary: "bg-[var(--color-primary-light)] text-[var(--color-primary-dark)]",
  success: "bg-[var(--color-success-light)] text-emerald-700",
  warning: "bg-[var(--color-warning-light)] text-amber-700",
  danger: "bg-[var(--color-danger-light)] text-red-700",
  neutral: "bg-gray-100 text-gray-600",
  violet: "bg-[var(--color-violet-light)] text-violet-700",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium leading-none whitespace-nowrap",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
