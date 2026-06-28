import { ShieldCheck } from "lucide-react";

export function PrivacyNote() {
  return (
    <aside className="rounded-[22px] border border-[var(--border)] bg-[var(--panel)] p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-[var(--fg)]">
        <ShieldCheck className="size-4 text-[var(--accent)]" aria-hidden="true" />
        Local by design, imperfect by nature
      </div>
      <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
        OCR and classification run locally in this browser for the MVP. They can miss text, misread screenshots, or choose the wrong category, so review every receipt before copying or exporting it.
      </p>
    </aside>
  );
}
