import type { ScreenshotCategory } from "@/lib/types";

export type CategorySignals = {
  category: Exclude<ScreenshotCategory, "uncategorized">;
  positive: Array<{ label: string; pattern: RegExp; weight: number }>;
  negative: Array<{ label: string; pattern: RegExp }>;
};

export const CATEGORY_SIGNALS: CategorySignals[] = [
  {
    category: "career/portfolio",
    positive: [
      { label: "career/portfolio: resume, role, or hiring wording", pattern: /\b(resume|portfolio|recruiter|interview|job|hiring|role|candidate)\b/i, weight: 30 },
      { label: "career/portfolio: project or case study wording", pattern: /\b(case study|project|github|linkedin|proposal)\b/i, weight: 22 },
    ],
    negative: [
      { label: "receipt: currency total suggests a purchase record", pattern: /\b(total|subtotal|paid|invoice)\b/i },
    ],
  },
  {
    category: "learning",
    positive: [
      { label: "learning: course or lesson wording", pattern: /\b(course|lesson|module|tutorial|assignment|lecture|quiz)\b/i, weight: 32 },
      { label: "learning: notes or study wording", pattern: /\b(notes|study|chapter|practice|concept)\b/i, weight: 18 },
    ],
    negative: [
      { label: "conversation: direct message wording", pattern: /\b(sent|reply|typing|message)\b/i },
    ],
  },
  {
    category: "receipt",
    positive: [
      { label: "receipt: invoice or receipt wording", pattern: /\b(receipt|invoice|order|paid|payment|subtotal|tax|total)\b/i, weight: 34 },
      { label: "receipt: currency amount", pattern: /\b(Rp|IDR|\$|USD|EUR)\s?\d|(?:total|subtotal)\s*[:\-]?\s*\d/i, weight: 28 },
      { label: "receipt: card or transaction wording", pattern: /\b(card ending|transaction|merchant|qty|quantity)\b/i, weight: 18 },
    ],
    negative: [
      { label: "code/error: no stack trace or error tokens", pattern: /\b(TypeError|ReferenceError|Exception|at\s+\w+|\.tsx?:\d+)\b/i },
    ],
  },
  {
    category: "code/error",
    positive: [
      { label: "code/error: error token", pattern: /\b(TypeError|ReferenceError|SyntaxError|Exception|failed|fatal|warning)\b/i, weight: 34 },
      { label: "code/error: stack trace or source path", pattern: /\bat\s+\w+|\bsrc\/[\w./-]+|\.[jt]sx?:\d+/i, weight: 30 },
      { label: "code/error: command or console wording", pattern: /\b(pnpm|npm|console|terminal|build|lint|stack trace)\b/i, weight: 16 },
    ],
    negative: [
      { label: "receipt: payment wording points away from code", pattern: /\b(receipt|invoice|paid|subtotal)\b/i },
    ],
  },
  {
    category: "conversation",
    positive: [
      { label: "conversation: message or chat wording", pattern: /\b(message|reply|sent|typing|thread|dm|chat)\b/i, weight: 28 },
      { label: "conversation: speaker-like short lines", pattern: /\b(Mira|Theo|Aitana|Noor|you):/i, weight: 20 },
    ],
    negative: [
      { label: "article/reference: title and paragraph structure", pattern: /\b(article|published|reference|abstract)\b/i },
    ],
  },
  {
    category: "article/reference",
    positive: [
      { label: "article/reference: article or reference wording", pattern: /\b(article|reference|published|abstract|journal|source|citation)\b/i, weight: 30 },
      { label: "article/reference: reading or save-for-later wording", pattern: /\b(read later|bookmark|summary|author|research)\b/i, weight: 22 },
    ],
    negative: [
      { label: "receipt: payment terms point away from article", pattern: /\b(invoice|subtotal|tax|card ending)\b/i },
    ],
  },
];
