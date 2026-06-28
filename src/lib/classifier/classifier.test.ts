import { describe, expect, test } from "vitest";
import { classifyScreenshot } from "@/lib/classifier/classifier";

describe("classifyScreenshot", () => {
  test("returns receipt classification with matched, negative, confidence, and reason", () => {
    const result = classifyScreenshot({
      text: "Invoice 3487\nSubtotal Rp 417,250\nTax Rp 45,898\nPaid with card ending 1842",
      fileName: "receipt-archive-payment.png",
    });

    expect(result.category).toBe("receipt");
    expect(result.confidence).toBeGreaterThanOrEqual(82);
    expect(result.matchedSignals).toContain("receipt: invoice or receipt wording");
    expect(result.negativeSignals).toContain("code/error: no stack trace or error tokens");
    expect(result.reason).toContain("receipt");
  });

  test("detects code and error screenshots without recommending fixes", () => {
    const result = classifyScreenshot({
      text: "TypeError: Cannot read properties of undefined\nat renderArchivePanel\nsrc/components/app-shell.tsx:42",
      fileName: "bug-console-trace.png",
    });

    expect(result.category).toBe("code/error");
    expect(result.matchedSignals).toEqual(
      expect.arrayContaining([
        "code/error: error token",
        "code/error: stack trace or source path",
      ]),
    );
    expect(result.reason).not.toMatch(/should fix|must fix|recommend/i);
  });

  test("falls back to uncategorized when signals are weak", () => {
    const result = classifyScreenshot({
      text: "blue chair window sunday 17",
      fileName: "loose-memory.png",
    });

    expect(result.category).toBe("uncategorized");
    expect(result.confidence).toBeLessThanOrEqual(45);
    expect(result.reason).toContain("not enough category evidence");
  });
});
