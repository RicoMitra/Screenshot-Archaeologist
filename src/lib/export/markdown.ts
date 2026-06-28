import type { ScreenshotRecord } from "@/lib/types";

export function createReceiptMarkdown(record: ScreenshotRecord): string {
  return [
    `# Screenshot receipt: ${record.title}`,
    "",
    `**Category:** ${record.classification.category}`,
    `**Confidence:** ${record.classification.confidence}%`,
    `**Source:** ${record.source === "demo" ? "Synthetic demo record" : "Local upload"}`,
    `**File:** ${record.fileName}`,
    "",
    "## Reason",
    "",
    record.classification.reason,
    "",
    "## Important text",
    "",
    ...record.importantText.map((line) => `- ${line}`),
    "",
    "## Matched signals",
    "",
    ...record.classification.matchedSignals.map((signal) => `- ${signal}`),
    "",
    "## Negative signals",
    "",
    ...(record.classification.negativeSignals.length > 0
      ? record.classification.negativeSignals.map((signal) => `- ${signal}`)
      : ["- None recorded"]),
    "",
    "## Suggested actions",
    "",
    ...record.suggestedActions.map((action) => `- ${action}`),
    "",
    "> Privacy note: OCR and classification run locally in this browser. Local OCR and classification can be wrong, so review the receipt before relying on it.",
    "",
  ].join("\n");
}
