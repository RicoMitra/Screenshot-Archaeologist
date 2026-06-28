"use client";

import { UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Dropzone({ onFiles }: { onFiles: (files: File[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <section
      className={cn(
        "rounded-[28px] border border-dashed border-[var(--border)] bg-[var(--panel)] p-5 transition-colors md:p-6",
        isDragging && "border-[var(--accent)] bg-[var(--panel-strong)]",
      )}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragging(false);
        onFiles(Array.from(event.dataTransfer.files).filter((file) => file.type.startsWith("image/")));
      }}
    >
      <input
        ref={inputRef}
        className="sr-only"
        type="file"
        accept="image/*"
        multiple
        onChange={(event) => onFiles(Array.from(event.currentTarget.files ?? []))}
      />
      <div className="grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-center">
        <div className="grid size-12 place-items-center rounded-[18px] bg-[var(--chip)] text-[var(--accent)]">
          <UploadCloud className="size-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-[var(--fg)]">Import screenshots for local triage</h2>
          <p className="mt-1 max-w-[62ch] text-sm leading-6 text-[var(--muted)]">
            Drop PNG, JPG, or WebP files here. The current MVP uses deterministic mock OCR while the receipt workflow is stabilized.
          </p>
        </div>
        <Button type="button" variant="secondary" onClick={() => inputRef.current?.click()}>
          Choose files
        </Button>
      </div>
    </section>
  );
}
