import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "min-h-11 w-full rounded-[14px] border border-[var(--border)] bg-[var(--field)] px-3 text-sm text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--muted)] focus-visible:border-[var(--accent-soft)] focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
        className,
      )}
      {...props}
    />
  );
}
