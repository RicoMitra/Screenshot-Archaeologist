"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function ArchiveSearch({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="relative block">
      <span className="mb-2 block text-xs font-semibold text-[var(--muted)]">Search archive</span>
      <Search className="pointer-events-none absolute bottom-3.5 left-3 size-4 text-[var(--muted)]" aria-hidden="true" />
      <Input className="pl-10" value={value} onChange={(event) => onChange(event.target.value)} placeholder="invoice, TypeError, portfolio note" />
    </label>
  );
}
