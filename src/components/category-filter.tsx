"use client";

import type { ScreenshotCategory } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories: Array<ScreenshotCategory | "all"> = [
  "all",
  "career/portfolio",
  "learning",
  "receipt",
  "code/error",
  "conversation",
  "article/reference",
  "uncategorized",
];

export function CategoryFilter({
  value,
  counts,
  onChange,
}: {
  value: ScreenshotCategory | "all";
  counts: Record<string, number>;
  onChange: (value: ScreenshotCategory | "all") => void;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold text-[var(--muted)]">Category</p>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            type="button"
            size="sm"
            aria-label={category === "all" ? "Filter all categories" : `Filter ${category}`}
            variant={value === category ? "primary" : "secondary"}
            className={cn("justify-between", category !== "all" && "font-mono")}
            onClick={() => onChange(category)}
          >
            <span>{category}</span>
            <span className="rounded-full bg-[oklch(0.1_0.01_255_/_0.12)] px-1.5 text-[10px]">{counts[category] ?? 0}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
