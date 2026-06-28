"use client";

import { FileText } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { ScreenshotRecord } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ScreenshotGrid({
  records,
  selectedId,
  onSelect,
}: {
  records: ScreenshotRecord[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {records.map((record) => (
        <button
          key={record.id}
          type="button"
          className={cn(
            "group min-h-[260px] rounded-[24px] border border-[var(--border)] bg-[var(--panel)] p-3 text-left transition-[border-color,transform,background-color] duration-200 ease-[cubic-bezier(.2,.8,.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
            selectedId === record.id && "border-[var(--accent)] bg-[var(--panel-strong)]",
          )}
          onClick={() => onSelect(record.id)}
        >
          <Image src={record.thumbnail} alt="" width={640} height={420} unoptimized className="h-36 w-full rounded-[18px] object-cover" />
          <div className="mt-3 flex items-center justify-between gap-2">
            <Badge className="font-mono">{record.classification.category}</Badge>
            <span className="font-mono text-xs text-[var(--accent)]">{record.classification.confidence}%</span>
          </div>
          <h3 className="mt-3 line-clamp-2 text-base font-semibold tracking-tight text-[var(--fg)]">{record.title}</h3>
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-[var(--muted)]">{record.classification.reason}</p>
          <div className="mt-3 flex items-center gap-2 text-xs text-[var(--muted)]">
            <FileText className="size-3.5" aria-hidden="true" />
            <span className="truncate">{record.fileName}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
