import { ArchiveX } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({ onLoadDemo }: { onLoadDemo: () => void }) {
  return (
    <div className="rounded-[26px] border border-dashed border-[var(--border)] bg-[var(--panel)] px-6 py-14 text-center">
      <ArchiveX className="mx-auto size-9 text-[var(--accent)]" aria-hidden="true" />
      <h2 className="mt-4 text-xl font-semibold tracking-tight text-[var(--fg)]">No matching screenshot receipts.</h2>
      <p className="mx-auto mt-2 max-w-[50ch] text-sm leading-6 text-[var(--muted)]">
        Import local screenshots or load the synthetic demo archive to inspect the triage workflow.
      </p>
      <Button type="button" className="mt-5" onClick={onLoadDemo}>Load demo records</Button>
    </div>
  );
}
