# Project Context

## Product Summary

Screenshot Archaeologist is a local-first browser app for screenshot memory triage. Users often save screenshots because they are afraid to forget something, but those images become a pile that is hard to search or use. This app turns screenshots into receipts: OCR text, category, confidence, evidence, key excerpts, and actions.

## Target User

The primary user is a person with many unsorted screenshots from work, learning, receipts, conversations, code errors, and reference articles. They want a private way to understand what is in the pile without uploading files or paying for OCR.

## MVP Workflow

1. User opens the app and sees synthetic demo records.
2. User imports screenshots through drag-and-drop or file selection.
3. The OCR adapter produces local OCR text. MVP development starts with `MockOCRAdapter`.
4. The classifier assigns a category and evidence.
5. Important text is extracted.
6. A screenshot receipt is shown.
7. User searches, filters, copies notes, exports Markdown, or resets local data.

## Categories

- `career/portfolio`
- `learning`
- `receipt`
- `code/error`
- `conversation`
- `article/reference`
- `uncategorized`

## Architecture

The app uses Next.js App Router with TypeScript. Domain logic lives in framework-independent modules under `src/lib`. UI components consume already-derived data and do not duplicate classification logic.

OCR is adapter-based:

- `MockOCRAdapter` provides deterministic development and test behavior.
- `TesseractOCRAdapter` may be added after the core UI, classifier, demo mode, storage, export, and tests are stable.

Persistence uses IndexedDB through a small archive adapter. No screenshot file or OCR text is uploaded to any server.

## Data Flow

```text
Local screenshot selection
  -> OCR adapter result
  -> deterministic classifier
  -> important text extraction
  -> screenshot receipt
  -> IndexedDB archive record
  -> searchable/filterable UI and Markdown export
```

## Demo Data

Demo records are synthetic and must not include real private screenshots or copyrighted UI screenshots. Demo previews may use generated local visual placeholders, plain text summaries, or neutral abstract thumbnails.

## Privacy Limitations

Local processing reduces data exposure, but OCR and classification can be wrong. The UI must say this plainly and encourage users to review the receipt before using or exporting it.

## Definition of Done

The MVP is complete when users can inspect demo records, import local files through the mock OCR flow, search and filter records, review receipts with classification evidence, export Markdown, persist and reset the local archive, and pass lint, typecheck, tests, build, and Playwright checks.
