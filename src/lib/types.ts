export type ScreenshotCategory =
  | "career/portfolio"
  | "learning"
  | "receipt"
  | "code/error"
  | "conversation"
  | "article/reference"
  | "uncategorized";

export type ScreenshotSource = "demo" | "upload";
export type ScreenshotStatus = "queued" | "processing" | "ready" | "ocr-failed";

export type OCRResult = {
  text: string;
  confidence: number;
  language: string;
  durationMs: number;
};

export type ClassificationResult = {
  category: ScreenshotCategory;
  confidence: number;
  matchedSignals: string[];
  negativeSignals: string[];
  reason: string;
};

export type ScreenshotRecord = {
  id: string;
  title: string;
  fileName: string;
  createdAt: string;
  updatedAt: string;
  source: ScreenshotSource;
  status: ScreenshotStatus;
  thumbnail: string;
  ocr: OCRResult;
  classification: ClassificationResult;
  importantText: string[];
  suggestedActions: string[];
  userFlags: string[];
};

export type OCRAdapter = {
  recognize(file: File): Promise<OCRResult>;
};
