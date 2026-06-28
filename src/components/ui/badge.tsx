import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-full border border-[var(--border)] bg-[var(--chip)] px-3 text-xs font-semibold text-[var(--muted)]",
        className,
      )}
      {...props}
    />
  );
}
