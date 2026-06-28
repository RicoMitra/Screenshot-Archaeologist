import { CATEGORY_SIGNALS } from "@/lib/classifier/signals";
import type { ClassificationResult, ScreenshotCategory } from "@/lib/types";

type ClassifyInput = {
  text: string;
  fileName?: string;
};

export function classifyScreenshot(input: ClassifyInput): ClassificationResult {
  const corpus = `${input.fileName ?? ""}\n${input.text}`.trim();
  const scored = CATEGORY_SIGNALS.map((group) => {
    const matchedSignals = group.positive
      .filter((signal) => signal.pattern.test(corpus))
      .map((signal) => signal.label);
    const positiveScore = group.positive
      .filter((signal) => signal.pattern.test(corpus))
      .reduce((sum, signal) => sum + signal.weight, 0);
    const negativeSignals = group.negative
      .filter((signal) => !signal.pattern.test(corpus))
      .map((signal) => signal.label);
    const penalty = group.negative.filter((signal) => signal.pattern.test(corpus)).length * 12;

    return {
      category: group.category,
      confidence: Math.max(0, Math.min(96, 28 + positiveScore - penalty)),
      matchedSignals,
      negativeSignals,
    };
  }).sort((a, b) => b.confidence - a.confidence);

  const best = scored[0];
  if (!best || best.matchedSignals.length === 0 || best.confidence < 50) {
    return {
      category: "uncategorized",
      confidence: 38,
      matchedSignals: [],
      negativeSignals: ["all categories: not enough category evidence"],
      reason: "Classified as uncategorized because there was not enough category evidence to choose a specific screenshot type.",
    };
  }

  const category = best.category as ScreenshotCategory;
  return {
    category,
    confidence: best.confidence,
    matchedSignals: best.matchedSignals,
    negativeSignals: best.negativeSignals,
    reason: `Classified as ${category} because ${humanizeSignals(best.matchedSignals)}.`,
  };
}

function humanizeSignals(signals: string[]) {
  return signals
    .map((signal) => signal.replace(/^[^:]+:\s*/, ""))
    .join(" and ");
}
