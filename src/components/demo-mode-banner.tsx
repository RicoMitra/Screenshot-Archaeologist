import { ArchiveRestore, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DemoModeBanner({ onLoadDemo }: { onLoadDemo: () => void }) {
  return (
    <section className="rounded-[28px] border border-[var(--border)] bg-[linear-gradient(135deg,oklch(0.22_0.018_255),oklch(0.17_0.012_255))] p-5 shadow-[0_28px_80px_-42px_oklch(0.04_0.02_255_/_0.9)] md:p-6">
      <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            <Sparkles className="size-4" aria-hidden="true" />
            Synthetic demo mode
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--fg)]">Inspect a useful archive before uploading anything.</h2>
          <p className="mt-2 max-w-[62ch] text-sm leading-6 text-[var(--muted)]">
            Demo records are synthetic. They show receipts, code traces, portfolio notes, and reference material without using private or copyrighted screenshots.
          </p>
        </div>
        <Button type="button" onClick={onLoadDemo}>
          <ArchiveRestore className="size-4" aria-hidden="true" />
          Load demo records
        </Button>
      </div>
    </section>
  );
}
