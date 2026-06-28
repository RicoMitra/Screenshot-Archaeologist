# Decision Log

This file records approved decisions. Add new entries instead of silently changing historical rationale.

## D-001: Independent Subfolder App

- **Status:** Accepted
- **Decision:** Build Screenshot Archaeologist inside `screenshot-archaeologist/` as an independent app.
- **Rationale:** The existing portfolio dashboard must not be overwritten or redeployed accidentally.
- **Consequence:** Do not modify parent/root workspace files unless the owner explicitly approves it.

## D-002: Free-Only Local-First MVP

- **Status:** Accepted
- **Decision:** Use no paid APIs, paid services, login, cloud database, external OCR/classification API, or server-side screenshot storage.
- **Rationale:** The product promise is private, cheap to run, and deployable on free hosting.
- **Consequence:** Screenshots and OCR text remain in the browser/device.

## D-003: Adapter-Based OCR

- **Status:** Accepted
- **Decision:** Start with `MockOCRAdapter`; add `TesseractOCRAdapter` only after the stable mock-driven MVP.
- **Rationale:** Deterministic tests and UI work should not depend on slow OCR behavior.
- **Consequence:** OCR consumers depend on the adapter interface, not a concrete implementation.

## D-004: Deterministic Classifier

- **Status:** Accepted
- **Decision:** Classify screenshots with transparent rules returning category, confidence, matched signals, negative signals, and reason.
- **Rationale:** Deterministic classification is testable, explainable, and free.
- **Consequence:** Do not add LLM classification without a new owner-approved decision.

## D-005: Synthetic Demo Data

- **Status:** Accepted
- **Decision:** Demo mode uses synthetic screenshot records only.
- **Rationale:** The public app should look useful without exposing private or copyrighted screenshots.
- **Consequence:** Demo records must be clearly labeled as synthetic.

## D-006: Dark Archive Design

- **Status:** Accepted
- **Decision:** Use a premium readable Dark Archive visual direction, not cream, cyberpunk, or neon.
- **Rationale:** The product should feel like a calm memory triage workspace.
- **Consequence:** Use charcoal/ink, paper-white panels, restrained amber highlights, and high contrast.
