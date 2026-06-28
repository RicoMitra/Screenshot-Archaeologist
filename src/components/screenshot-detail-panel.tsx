import { ScreenshotReceipt } from "@/components/screenshot-receipt";
import type { ScreenshotRecord } from "@/lib/types";

export function ScreenshotDetailPanel({ record }: { record: ScreenshotRecord | null }) {
  if (!record) {
    return (
      <aside className="rounded-[24px] border border-dashed border-[var(--border)] bg-[var(--panel)] p-6">
        <h2 className="text-lg font-semibold tracking-tight text-[var(--fg)]">Select a receipt</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Choose a screenshot record to inspect OCR text, category evidence, confidence, and export actions.</p>
      </aside>
    );
  }

  return <ScreenshotReceipt record={record} />;
}
