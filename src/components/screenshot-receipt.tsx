"use client";

import { CheckCircle2, Copy, Download, ScanText, XCircle } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createReceiptMarkdown } from "@/lib/export/markdown";
import type { ScreenshotRecord } from "@/lib/types";

export function ScreenshotReceipt({ record }: { record: ScreenshotRecord }) {
  const [message, setMessage] = useState<string | null>(null);
  const markdown = createReceiptMarkdown(record);

  const copyMarkdown = async () => {
    await navigator.clipboard.writeText(markdown);
    setMessage("Receipt note copied.");
  };

  const exportMarkdown = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${record.fileName.replace(/\.[^.]+$/, "")}-receipt.md`;
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage("Markdown export prepared.");
  };

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            <ScanText className="size-4" aria-hidden="true" />
            Screenshot receipt
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--fg)]">{record.title}</h2>
        </div>
        <Badge className="font-mono">{record.classification.confidence}%</Badge>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <ReceiptField label="Type" value={record.classification.category} />
        <ReceiptField label="OCR confidence" value={`${record.ocr.confidence}%`} />
        <ReceiptField label="Source" value={record.source === "demo" ? "synthetic demo" : "local upload"} />
        <ReceiptField label="Status" value={record.status} />
      </div>

      <section className="mt-5">
        <h3 className="text-sm font-semibold text-[var(--fg)]">Reason</h3>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{record.classification.reason}</p>
      </section>

      <SignalList title="Matched signals" items={record.classification.matchedSignals} icon="match" />
      <SignalList title="Negative signals" items={record.classification.negativeSignals} icon="negative" />

      <section className="mt-5">
        <h3 className="text-sm font-semibold text-[var(--fg)]">Important text</h3>
        <ul className="mt-2 space-y-2">
          {record.importantText.map((line) => (
            <li key={line} className="rounded-[14px] bg-[var(--field)] px-3 py-2 font-mono text-xs leading-5 text-[var(--fg)]">{line}</li>
          ))}
        </ul>
      </section>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button type="button" onClick={copyMarkdown}>
          <Copy className="size-4" aria-hidden="true" />
          Copy as note
        </Button>
        <Button type="button" variant="secondary" onClick={exportMarkdown}>
          <Download className="size-4" aria-hidden="true" />
          Export Markdown
        </Button>
      </div>
      {message && <p role="status" className="mt-3 text-xs font-semibold text-[var(--accent)]">{message}</p>}
      <p className="mt-5 text-xs leading-5 text-[var(--muted)]">
        Local OCR and classification can be wrong. Use this receipt as a review aid, not as a perfect transcript.
      </p>
    </Card>
  );
}

function ReceiptField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[16px] border border-[var(--border)] bg-[var(--field)] p-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{label}</p>
      <p className="mt-1 font-mono text-sm text-[var(--fg)]">{value}</p>
    </div>
  );
}

function SignalList({ title, items, icon }: { title: string; items: string[]; icon: "match" | "negative" }) {
  return (
    <section className="mt-5">
      <h3 className="text-sm font-semibold text-[var(--fg)]">{title}</h3>
      <ul className="mt-2 space-y-2">
        {(items.length > 0 ? items : ["None recorded"]).map((item) => (
          <li key={item} className="flex gap-2 text-xs leading-5 text-[var(--muted)]">
            {icon === "match" ? <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-[var(--success)]" aria-hidden="true" /> : <XCircle className="mt-0.5 size-3.5 shrink-0 text-[var(--danger)]" aria-hidden="true" />}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
