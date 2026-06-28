import type { OCRAdapter, OCRResult } from "@/lib/types";

const MOCK_TEXT_BY_HINT: Array<{ pattern: RegExp; text: string; confidence: number }> = [
  {
    pattern: /receipt|invoice|threadwell/i,
    confidence: 92,
    text: "Threadwell Tools\nInvoice 3487\nSubtotal Rp 417,250\nTax Rp 45,898\nPaid with card ending 1842",
  },
  {
    pattern: /error|trace|bug|beacon/i,
    confidence: 89,
    text: "TypeError: Cannot read properties of undefined\nat renderArchivePanel\nsrc/components/app-shell.tsx:42",
  },
  {
    pattern: /course|lesson|study/i,
    confidence: 87,
    text: "Module 4 notes\nScreenshot triage workflow\nPractice: summarize the source before exporting",
  },
];

export class MockOCRAdapter implements OCRAdapter {
  async recognize(file: File): Promise<OCRResult> {
    const started = performance.now();
    const match = MOCK_TEXT_BY_HINT.find((candidate) => candidate.pattern.test(file.name));

    return {
      text: match?.text ?? "Loose screenshot note\nNo strong category evidence\nReview manually before export",
      confidence: match?.confidence ?? 74,
      language: "eng",
      durationMs: Math.max(1, Math.round(performance.now() - started) + 24),
    };
  }
}
