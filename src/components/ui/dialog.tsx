import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  widthClassName?: string;
}

export function Dialog({ open, onClose, title, description, children, footer, widthClassName = "max-w-lg" }: DialogProps) {
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button aria-label="Đóng" onClick={onClose} className="absolute inset-0 bg-gray-900/50" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className={cn(
          "relative z-10 flex max-h-[85vh] w-full flex-col rounded-[var(--radius-card)] bg-white shadow-2xl",
          widthClassName,
        )}
      >
        <div className="flex items-start justify-between gap-3 border-b border-[var(--color-border)] p-5">
          <div>
            <h3 id="dialog-title" className="text-[15px] font-semibold text-[var(--color-text)]">
              {title}
            </h3>
            {description && <p className="mt-0.5 text-[12px] text-[var(--color-text-secondary)]">{description}</p>}
          </div>
          <button
            aria-label="Đóng"
            onClick={onClose}
            className="shrink-0 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="overflow-y-auto p-5">{children}</div>
        {footer && <div className="flex flex-wrap justify-end gap-2 border-t border-[var(--color-border)] p-4">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
