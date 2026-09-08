import type { ReactNode } from "react";

export function FormField({
  label,
  htmlFor,
  children,
  required,
}: {
  label: string;
  htmlFor?: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-1.5 text-[12px] font-medium text-[var(--color-text)]">
      <span>
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      {children}
    </label>
  );
}

const fieldClassName =
  "w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-white px-3 py-2 text-[13px] outline-none focus:border-[var(--color-primary)]";

export function TextField(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={fieldClassName + " h-9 " + (props.className ?? "")} />;
}

export function TextAreaField(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={fieldClassName + " min-h-[76px] resize-y " + (props.className ?? "")} />;
}

export function SelectField(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={fieldClassName + " h-9 " + (props.className ?? "")} />;
}
