import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-[16px] border border-[var(--border)] bg-[var(--field)] px-3 py-3 font-mono text-xs leading-6 text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--muted)] focus-visible:border-[var(--accent-soft)] focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
        className,
      )}
      {...props}
    />
  );
}
