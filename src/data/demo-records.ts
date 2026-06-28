import { classifyScreenshot } from "@/lib/classifier/classifier";
import { extractImportantText } from "@/lib/text/important-text";
import type { OCRResult, ScreenshotRecord } from "@/lib/types";

type DemoSeed = {
  id: string;
  title: string;
  fileName: string;
  text: string;
  confidence: number;
  tone: "amber" | "slate" | "emerald" | "rose";
};

const seeds: DemoSeed[] = [
  {
    id: "demo-threadwell-receipt",
    title: "Threadwell tools invoice",
    fileName: "threadwell-tools-invoice.png",
    confidence: 92,
    tone: "amber",
    text: "Threadwell Tools\nInvoice 3487\nSubtotal Rp 417,250\nTax Rp 45,898\nPaid with card ending 1842",
  },
  {
    id: "demo-beacon-error",
    title: "Beacon Logs render trace",
    fileName: "beacon-render-error.png",
    confidence: 89,
    tone: "rose",
    text: "TypeError: Cannot read properties of undefined\nat renderArchivePanel\nsrc/components/app-shell.tsx:42\npnpm build failed after 47 files",
  },
  {
    id: "demo-mira-career",
    title: "Mira portfolio review note",
    fileName: "mira-portfolio-review.png",
    confidence: 86,
    tone: "emerald",
    text: "Mira Okonkwo: portfolio review\nCase study needs metrics by Friday\nAdd GitHub link and recruiter summary",
  },
  {
    id: "demo-local-first-article",
    title: "Local-first reference article",
    fileName: "local-first-reference.png",
    confidence: 84,
    tone: "slate",
    text: "Reference article\nPublished 18 May 2026\nSummary: local-first tools keep private data on-device\nAuthor: Lin Park-Aboagye",
  },
];

export const DEMO_RECORDS: ScreenshotRecord[] = seeds.map((seed, index) => {
  const ocr: OCRResult = {
    text: seed.text,
    confidence: seed.confidence,
    language: "eng",
    durationMs: 90 + index * 17,
  };
  const classification = classifyScreenshot({ text: seed.text, fileName: seed.fileName });

  return {
    id: seed.id,
    title: seed.title,
    fileName: seed.fileName,
    createdAt: new Date(Date.UTC(2026, 5, 28, 8, 15 + index * 7)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 5, 28, 8, 25 + index * 7)).toISOString(),
    source: "demo",
    status: "ready",
    thumbnail: createSyntheticThumbnail(seed.title, seed.tone),
    ocr,
    classification,
    importantText: extractImportantText(seed.text, 4),
    suggestedActions: ["Copy as note", "Export Markdown", "Review before relying on it"],
    userFlags: ["synthetic"],
  };
});

export function createSyntheticThumbnail(title: string, tone: DemoSeed["tone"] = "slate") {
  const color = {
    amber: "#c9902f",
    slate: "#6f7f96",
    emerald: "#4e9a72",
    rose: "#b86461",
  }[tone];
  const safeTitle = title.replace(/[<>&"]/g, "");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="420" viewBox="0 0 640 420"><rect width="640" height="420" rx="30" fill="#171b22"/><rect x="34" y="34" width="572" height="352" rx="22" fill="#f2efe7"/><rect x="72" y="78" width="180" height="12" rx="6" fill="${color}"/><rect x="72" y="122" width="424" height="10" rx="5" fill="#30343b" opacity=".72"/><rect x="72" y="154" width="366" height="10" rx="5" fill="#30343b" opacity=".38"/><rect x="72" y="186" width="458" height="10" rx="5" fill="#30343b" opacity=".22"/><rect x="72" y="252" width="248" height="46" rx="12" fill="${color}" opacity=".18"/><text x="92" y="281" font-family="Arial" font-size="17" fill="#20242b">${safeTitle}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
