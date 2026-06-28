# Screenshot Archaeologist

A browser-first, local-first screenshot memory triage app. It turns messy screenshot piles into searchable records with OCR text, deterministic classification, confidence evidence, key excerpts, and Markdown-ready screenshot receipts.

## Features

- Synthetic demo archive for public previews
- Local import flow with a deterministic `MockOCRAdapter`
- Rule-based classification into career/portfolio, learning, receipt, code/error, conversation, article/reference, or uncategorized
- Classifier output includes confidence, matched signals, negative signals, and a human-readable reason
- Important text extraction
- Copy/export as Markdown
- IndexedDB local persistence and reset
- Dark Archive interface designed for private memory triage

## Privacy

The MVP does not use paid APIs, external OCR APIs, classification APIs, login, cloud databases, or server-side screenshot storage. Screenshot records and OCR text stay in the current browser/device.

Local processing improves privacy, but OCR and classification are not guaranteed to be perfect. Review receipts before relying on copied or exported notes.

## Run Locally

Prerequisites: Node.js 22.13 or newer and pnpm 11.5.3.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality Checks

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

## Implementation Notes

The OCR layer is adapter-based. The current stable MVP uses `MockOCRAdapter` for deterministic development and tests. `TesseractOCRAdapter` should be added only after the core UI, classifier, demo mode, storage, export, and tests are stable.
