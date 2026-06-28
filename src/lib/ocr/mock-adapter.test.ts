import { describe, expect, test } from "vitest";
import { MockOCRAdapter } from "@/lib/ocr/mock-adapter";

describe("MockOCRAdapter", () => {
  test("returns deterministic OCR text from a file name hint", async () => {
    const adapter = new MockOCRAdapter();
    const file = new File(["synthetic"], "threadwell-receipt.png", { type: "image/png" });

    const result = await adapter.recognize(file);

    expect(result.text).toContain("Threadwell Tools");
    expect(result.confidence).toBe(92);
    expect(result.language).toBe("eng");
    expect(result.durationMs).toBeGreaterThan(0);
  });
});
