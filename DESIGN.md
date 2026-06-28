# Design System

## Direction

Screenshot Archaeologist uses **Dark Archive**: a premium, readable local-first workspace for sorting digital memory. The interface should feel like a private evidence desk, not a cyberpunk terminal.

## Palette

- Base: ink charcoal `oklch(0.145 0.01 255)`
- Raised base: archival slate `oklch(0.19 0.012 255)`
- Paper surface: soft paper `oklch(0.96 0.006 82)`
- Paper muted: vellum `oklch(0.88 0.01 82)`
- Text on dark: bone `oklch(0.94 0.006 82)`
- Muted text on dark: zinc-blue gray `oklch(0.72 0.018 255)`
- Accent: restrained amber `oklch(0.72 0.13 76)`
- Success: archival emerald `oklch(0.64 0.12 152)`
- Warning: amber `oklch(0.72 0.13 76)`
- Error: muted rose `oklch(0.62 0.14 22)`

No pure black, pure white, neon green, purple-blue gradients, or cream-dominant palette.

## Typography

- Font: Geist for display and body.
- Mono: Geist Mono for confidence, IDs, and OCR snippets.
- Headings use tight tracking and restrained scale.
- Body copy is left-aligned and capped at comfortable reading widths.

## Layout

- Desktop: left sidebar for mode/filter context, main archive workspace, right receipt panel.
- Mobile: single-column flow with filters above records and receipt below the selected record.
- Avoid generic three-card feature rows.
- Use cards only for functional groupings: selected record, receipt, upload state, and archive entries.
- Keep spacing generous enough for scanning but dense enough to feel like a tool.

## Interaction

- Buttons are specific: `Load demo records`, `Copy note`, `Export Markdown`, `Reset archive`.
- Focus rings use amber, visible on dark and paper surfaces.
- Processing states use measured progress bars and text, not generic spinners.
- Empty and error states should explain what to do next.

## Content Rules

- No filler words such as "elevate", "unleash", "seamless", or "next-gen".
- Demo records use specific synthetic names and messy details.
- Privacy copy must say local processing is private but imperfect.
- No emojis.
