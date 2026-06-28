import { cn } from "@/lib/utils";

export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-[var(--track)]", className)} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
      <div className="h-full rounded-full bg-[var(--accent)] transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]" style={{ transform: `scaleX(${Math.max(0, Math.min(100, value)) / 100})`, transformOrigin: "left" }} />
    </div>
  );
}
