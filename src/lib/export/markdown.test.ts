import { describe, expect, test } from "vitest";
import { createReceiptMarkdown } from "@/lib/export/markdown";
import type { ScreenshotRecord } from "@/lib/types";

describe("createReceiptMarkdown", () => {
  test("exports the visible receipt state without hidden data", () => {
    const record: ScreenshotRecord = {
      id: "demo-1",
      title: "Invoice from Northstar Compute",
      fileName: "northstar-invoice.png",
      createdAt: "2026-06-28T10:20:00.000Z",
      updatedAt: "2026-06-28T10:21:00.000Z",
      source: "demo",
      status: "ready",
      thumbnail: "data:image/svg+xml;utf8,<svg />",
      ocr: {
        text: "Invoice 3487\nSubtotal Rp 417,250",
        confidence: 91,
        language: "eng",
        durationMs: 118,
      },
      classification: {
        category: "receipt",
        confidence: 88,
        matchedSignals: ["receipt: invoice or receipt wording"],
        negativeSignals: ["code/error: no stack trace or error tokens"],
        reason: "Classified as receipt because invoice wording and currency were found.",
      },
      importantText: ["Invoice 3487", "Subtotal Rp 417,250"],
      suggestedActions: ["Copy as note", "Export Markdown"],
      userFlags: [],
    };

    const markdown = createReceiptMarkdown(record);

    expect(markdown).toContain("# Screenshot receipt: Invoice from Northstar Compute");
    expect(markdown).toContain("**Category:** receipt");
    expect(markdown).toContain("- receipt: invoice or receipt wording");
    expect(markdown).toContain("Local OCR and classification can be wrong");
    expect(markdown).not.toContain("data:image");
  });
});
