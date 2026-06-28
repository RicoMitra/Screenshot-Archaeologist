"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Archive, Database, Files, RotateCcw, ShieldCheck } from "lucide-react";
import { ArchiveSearch } from "@/components/archive-search";
import { CategoryFilter } from "@/components/category-filter";
import { DemoModeBanner } from "@/components/demo-mode-banner";
import { Dropzone } from "@/components/dropzone";
import { EmptyState } from "@/components/empty-state";
import { PrivacyNote } from "@/components/privacy-note";
import { ProcessingQueue, type QueueItem } from "@/components/processing-queue";
import { ScreenshotDetailPanel } from "@/components/screenshot-detail-panel";
import { ScreenshotGrid } from "@/components/screenshot-grid";
import { Button } from "@/components/ui/button";
import { DEMO_RECORDS, createSyntheticThumbnail } from "@/data/demo-records";
import { classifyScreenshot } from "@/lib/classifier/classifier";
import { MockOCRAdapter } from "@/lib/ocr/mock-adapter";
import { ArchiveStore } from "@/lib/storage/archive-store";
import { extractImportantText } from "@/lib/text/important-text";
import type { ScreenshotCategory, ScreenshotRecord } from "@/lib/types";

const adapter = new MockOCRAdapter();

export function AppShell() {
  const storeRef = useRef<ArchiveStore | null>(null);
  const [records, setRecords] = useState<ScreenshotRecord[]>(DEMO_RECORDS);
  const [selectedId, setSelectedId] = useState<string | null>(DEMO_RECORDS[0]?.id ?? null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ScreenshotCategory | "all">("all");
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [status, setStatus] = useState("Synthetic demo records loaded. Local archive is ready.");

  useEffect(() => {
    const store = new ArchiveStore();
    storeRef.current = store;
    let cancelled = false;

    store.list().then((saved) => {
      if (cancelled || saved.length === 0) return;
      setRecords(saved);
      setSelectedId(saved[0]?.id ?? null);
      setStatus(`${saved.length} local archive record${saved.length === 1 ? "" : "s"} restored from this browser.`);
    }).catch(() => {
      setStatus("Local archive could not be opened. Demo records remain available.");
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const counts = useMemo(() => {
    const next: Record<string, number> = { all: records.length };
    for (const record of records) next[record.classification.category] = (next[record.classification.category] ?? 0) + 1;
    return next;
  }, [records]);

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();
    return records.filter((record) => {
      const matchesCategory = category === "all" || record.classification.category === category;
      const haystack = [
        record.title,
        record.fileName,
        record.ocr.text,
        record.classification.category,
        record.classification.reason,
      ].join("\n").toLowerCase();
      return matchesCategory && (!query || haystack.includes(query));
    });
  }, [category, records, search]);

  const selectedRecord = useMemo(
    () => filteredRecords.find((record) => record.id === selectedId) ?? filteredRecords[0] ?? null,
    [filteredRecords, selectedId],
  );

  const loadDemo = async () => {
    setRecords(DEMO_RECORDS);
    setSelectedId(DEMO_RECORDS[0]?.id ?? null);
    setStatus("Synthetic demo records loaded. No private screenshot data was used.");
    await storeRef.current?.clear();
  };

  const resetArchive = async () => {
    await storeRef.current?.clear();
    setRecords([]);
    setSelectedId(null);
    setStatus("Local archive cleared from this browser.");
  };

  const handleFiles = async (files: File[]) => {
    if (files.length === 0) {
      setStatus("No image files were selected.");
      return;
    }

    for (const file of files) {
      const id = `upload-${Date.now()}-${Math.random().toString(16).slice(2)}`;
      setQueue((current) => [...current, { id, fileName: file.name, progress: 18, status: "processing" }]);

      try {
        const ocr = await adapter.recognize(file);
        setQueue((current) => current.map((item) => item.id === id ? { ...item, progress: 68 } : item));
        const classification = classifyScreenshot({ text: ocr.text, fileName: file.name });
        const record: ScreenshotRecord = {
          id,
          title: titleFromFileName(file.name),
          fileName: file.name,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          source: "upload",
          status: "ready",
          thumbnail: createSyntheticThumbnail(titleFromFileName(file.name), "slate"),
          ocr,
          classification,
          importantText: extractImportantText(ocr.text, 4),
          suggestedActions: ["Copy as note", "Export Markdown", "Review before relying on it"],
          userFlags: [],
        };
        await storeRef.current?.save(record);
        setRecords((current) => [record, ...current.filter((item) => item.id !== record.id)]);
        setSelectedId(record.id);
        setQueue((current) => current.map((item) => item.id === id ? { ...item, progress: 100, status: "ready" } : item));
        setStatus(`${file.name} processed locally with MockOCRAdapter.`);
      } catch {
        setQueue((current) => current.map((item) => item.id === id ? { ...item, progress: 100, status: "ocr-failed" } : item));
        setStatus(`${file.name} could not be processed. Try another image.`);
      } finally {
        window.setTimeout(() => {
          setQueue((current) => current.filter((item) => item.id !== id));
        }, 1100);
      }
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[var(--bg)] text-[var(--fg)]">
      <div className="archive-texture fixed inset-0 pointer-events-none" aria-hidden="true" />
      <div className="relative grid min-h-[100dvh] lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-[var(--border)] bg-[oklch(0.13_0.012_255_/_0.92)] px-5 py-5 backdrop-blur lg:border-b-0 lg:border-r lg:px-6 lg:py-7">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-[18px] border border-[var(--accent-soft)] bg-[oklch(0.72_0.13_76_/_0.12)] text-[var(--accent)]">
              <Archive className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-base font-semibold tracking-tight">Screenshot Archaeologist</p>
              <p className="text-xs text-[var(--muted)]">Local memory triage</p>
            </div>
          </div>

          <nav className="mt-8 space-y-2" aria-label="Workspace sections">
            <a className="flex min-h-11 items-center gap-3 rounded-[14px] bg-[var(--panel)] px-3 text-sm font-semibold text-[var(--fg)]" href="#archive">
              <Files className="size-4 text-[var(--accent)]" aria-hidden="true" />
              Archive
            </a>
            <a className="flex min-h-11 items-center gap-3 rounded-[14px] px-3 text-sm text-[var(--muted)] hover:bg-[var(--panel)] hover:text-[var(--fg)]" href="#privacy">
              <ShieldCheck className="size-4" aria-hidden="true" />
              Privacy
            </a>
          </nav>

          <div className="mt-8 rounded-[22px] border border-[var(--border)] bg-[var(--panel)] p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Database className="size-4 text-[var(--accent)]" aria-hidden="true" />
              Browser storage
            </div>
            <p className="mt-2 text-xs leading-5 text-[var(--muted)]">IndexedDB stores OCR text, categories, confidence, and receipt state on this device only.</p>
          </div>
        </aside>

        <main className="px-4 py-5 md:px-7 lg:px-8 lg:py-7">
          <header className="grid gap-5 xl:grid-cols-[1fr_auto] xl:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Browser-first archive</p>
              <h1 className="mt-3 max-w-[12ch] text-5xl font-semibold leading-[0.96] tracking-tighter text-[var(--fg)] md:text-7xl">Make screenshots answer back.</h1>
              <p className="mt-4 max-w-[62ch] text-base leading-7 text-[var(--muted)]">
                Triage messy screenshots into searchable receipts with local OCR text, deterministic categories, confidence evidence, and Markdown actions.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button type="button" variant="secondary" onClick={loadDemo}>Load demo records</Button>
              <Button type="button" variant="danger" onClick={resetArchive}>
                <RotateCcw className="size-4" aria-hidden="true" />
                Reset archive
              </Button>
            </div>
          </header>

          <div className="mt-6" role="status" aria-live="polite">
            <p className="rounded-full border border-[var(--border)] bg-[var(--panel)] px-4 py-2 text-xs text-[var(--muted)]">{status}</p>
          </div>

          <div className="mt-6 grid gap-5 2xl:grid-cols-[minmax(0,1fr)_440px]">
            <section id="archive" className="space-y-5">
              <DemoModeBanner onLoadDemo={loadDemo} />
              <Dropzone onFiles={(files) => void handleFiles(files)} />
              <ProcessingQueue items={queue} />

              <div className="grid gap-4 rounded-[28px] border border-[var(--border)] bg-[oklch(0.16_0.012_255_/_0.72)] p-4 md:p-5">
                <ArchiveSearch value={search} onChange={setSearch} />
                <CategoryFilter value={category} counts={counts} onChange={setCategory} />
              </div>

              {filteredRecords.length > 0 ? (
                <ScreenshotGrid records={filteredRecords} selectedId={selectedRecord?.id ?? null} onSelect={setSelectedId} />
              ) : (
                <EmptyState onLoadDemo={loadDemo} />
              )}
            </section>

            <aside className="space-y-5 2xl:sticky 2xl:top-7 2xl:self-start">
              <ScreenshotDetailPanel record={selectedRecord} />
              <div id="privacy">
                <PrivacyNote />
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

function titleFromFileName(fileName: string) {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
