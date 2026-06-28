import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export type QueueItem = {
  id: string;
  fileName: string;
  progress: number;
  status: "queued" | "processing" | "ready" | "ocr-failed";
};

export function ProcessingQueue({ items }: { items: QueueItem[] }) {
  if (items.length === 0) return null;

  return (
    <Card className="p-4" aria-live="polite" aria-busy={items.some((item) => item.status === "processing")}>
      <div className="flex items-center gap-2 text-sm font-semibold text-[var(--fg)]">
        <Loader2 className="size-4 animate-spin text-[var(--accent)] motion-reduce:animate-none" aria-hidden="true" />
        Processing queue
      </div>
      <div className="mt-3 space-y-3">
        {items.map((item) => (
          <div key={item.id}>
            <div className="mb-1 flex items-center justify-between gap-3 text-xs">
              <span className="truncate text-[var(--muted)]">{item.fileName}</span>
              <span className="font-mono text-[var(--fg)]">{item.progress}%</span>
            </div>
            <Progress value={item.progress} />
          </div>
        ))}
      </div>
    </Card>
  );
}
