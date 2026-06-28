import { beforeEach, describe, expect, test } from "vitest";
import { ArchiveStore } from "@/lib/storage/archive-store";
import type { ScreenshotRecord } from "@/lib/types";

const record: ScreenshotRecord = {
  id: "local-1",
  title: "Syntax trace from Beacon Logs",
  fileName: "beacon-error.png",
  createdAt: "2026-06-28T09:00:00.000Z",
  updatedAt: "2026-06-28T09:00:00.000Z",
  source: "upload",
  status: "ready",
  thumbnail: "data:image/svg+xml;utf8,<svg />",
  ocr: {
    text: "TypeError at line 42",
    confidence: 89,
    language: "eng",
    durationMs: 80,
  },
  classification: {
    category: "code/error",
    confidence: 91,
    matchedSignals: ["code/error: error token"],
    negativeSignals: [],
    reason: "Classified as code/error because an error token was found.",
  },
  importantText: ["TypeError at line 42"],
  suggestedActions: ["Copy as note"],
  userFlags: ["reviewed"],
};

describe("ArchiveStore", () => {
  beforeEach(() => {
    indexedDB.deleteDatabase("screenshot-archaeologist-test");
  });

  test("saves, lists, and clears local archive records", async () => {
    const store = new ArchiveStore("screenshot-archaeologist-test");

    await store.save(record);
    expect(await store.list()).toEqual([record]);

    await store.clear();
    expect(await store.list()).toEqual([]);
  });
});
