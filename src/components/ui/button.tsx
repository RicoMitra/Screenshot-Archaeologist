import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "default" | "sm" | "icon";
};

export function Button({ className, variant = "primary", size = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-[14px] px-4 text-sm font-semibold transition-[background-color,border-color,box-shadow,transform,opacity] duration-200 ease-[cubic-bezier(.2,.8,.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" && "bg-[var(--accent)] text-[var(--accent-ink)] shadow-[0_14px_32px_oklch(0.24_0.04_76_/_0.24)] hover:-translate-y-0.5 hover:bg-[var(--accent-strong)]",
        variant === "secondary" && "border border-[var(--border)] bg-[var(--panel)] text-[var(--fg)] hover:border-[var(--accent-soft)] hover:bg-[var(--panel-strong)]",
        variant === "ghost" && "text-[var(--muted)] hover:bg-[var(--panel)] hover:text-[var(--fg)]",
        variant === "danger" && "border border-[var(--danger-border)] bg-[var(--danger-bg)] text-[var(--danger)] hover:bg-[var(--danger-bg-strong)]",
        size === "sm" && "min-h-9 rounded-[12px] px-3 text-xs",
        size === "icon" && "size-11 px-0",
        className,
      )}
      {...props}
    />
  );
}
