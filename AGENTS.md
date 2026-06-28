# Project Governance

## Owner

This project is owned by **Rico Majesty Daniel Mitra** ([@RicoMitra](https://github.com/RicoMitra)).

## Purpose

Screenshot Archaeologist is a browser-first, local-first web app that helps people turn messy screenshot piles into a searchable, understandable, and actionable visual archive.

The product is not a cloud gallery, surveillance tool, paid OCR wrapper, or AI agent that sends private images to external services. Its role is memory triage: extract local text, classify screenshots with transparent rules, and produce a clear screenshot receipt.

## Core Capabilities

- Accept local screenshot imports through drag-and-drop or file selection.
- Run OCR through an adapter interface, beginning with deterministic `MockOCRAdapter`.
- Classify screenshots into career/portfolio, learning, receipt, code/error, conversation, article/reference, or uncategorized.
- Return category, confidence, matched signals, negative signals, and a human-readable reason for every classification.
- Show a screenshot receipt with key text, classification evidence, confidence, privacy limitations, and suggested actions.
- Provide demo mode with synthetic records so the app is useful before uploads.
- Export the visible receipt as Markdown.
- Store archive records locally in IndexedDB with schema versioning.
- Provide a clear reset action for local archive data.

## Explicit Non-Goals

- No paid APIs or paid services.
- No external OCR or classification APIs.
- No login or authentication.
- No cloud database or sync.
- No server-side screenshot upload or storage.
- No real private screenshots or copyrighted UI screenshots as fixtures.
- No claims that OCR or classification is perfect.

## Required Stack

- Next.js with TypeScript
- Tailwind CSS
- Local shadcn/ui-style primitives
- Tesseract.js only after the mock-driven MVP is stable
- IndexedDB for browser-local persistence
- Vitest and Testing Library for unit/component tests
- Playwright for browser verification
- Vercel or Cloudflare Pages free deployment only

## Privacy Rules

Screenshot files, OCR text, classifications, notes, and archive state must stay on the user's browser/device. Do not send screenshots or OCR text to a server, analytics service, database, or third party.

User-facing copy must clearly state: OCR and classification are local and private by design, but they are not guaranteed to be accurate.

## Design Direction

Use the Dark Archive design direction: charcoal and ink backgrounds, paper-white content surfaces, restrained amber scan/confidence highlights, readable spacing, rounded cards, subtle archive texture, and premium utility. Avoid cream, cyberpunk, neon, purple-blue gradients, and generic dashboard styling.

## Decision-Making Policy

Agents may independently make reversible, low-risk decisions that follow this document and established local patterns.

Ask the owner before changing:

- Privacy model, storage model, or data retention behavior
- Any paid service, external API, auth provider, or cloud persistence
- OCR adapter strategy beyond the approved mock-first then Tesseract path
- Classification categories, confidence semantics, or receipt meaning
- Deployment target or cost assumptions
- Primary interaction model or Dark Archive visual direction

When requirements are incomplete, use this order:

1. Protect user privacy and local-first behavior.
2. Avoid paid services and external data transfer.
3. Preserve deterministic, testable classifier behavior.
4. Follow the owner's explicit request.
5. Choose the smallest reversible implementation.

## Quality Guardrails

- Domain logic must be deterministic and tested.
- UI must expose classification evidence, not only labels.
- Demo data must be synthetic and clearly non-private.
- Empty, loading, error, OCR-failed, and success states must exist.
- Before completion, run lint, typecheck, tests, build, and Playwright browser checks.
