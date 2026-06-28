import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[24px] border border-[var(--border)] bg-[var(--panel)] shadow-[0_24px_70px_-36px_oklch(0.08_0.02_255_/_0.9)]",
        className,
      )}
      {...props}
    />
  );
}
