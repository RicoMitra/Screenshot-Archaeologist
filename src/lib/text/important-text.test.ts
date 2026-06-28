import { describe, expect, test } from "vitest";
import { extractImportantText } from "@/lib/text/important-text";

describe("extractImportantText", () => {
  test("keeps dense lines, money lines, dates, and errors before filler", () => {
    const lines = extractImportantText(
      [
        "ok",
        "Invoice 3487 paid on 14 May 2026",
        "Subtotal Rp 417,250",
        "TypeError: Cannot read properties of undefined",
        "thanks",
        "Schedule portfolio review by Friday",
      ].join("\n"),
      4,
    );

    expect(lines).toEqual([
      "Invoice 3487 paid on 14 May 2026",
      "TypeError: Cannot read properties of undefined",
      "Schedule portfolio review by Friday",
      "Subtotal Rp 417,250",
    ]);
  });
});
