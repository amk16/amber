# DESIGN.md — Archon Systems

**Direction: The Ledger** (chosen 2026-07-09; see `review/variants-2026-07/decision.md`).
The site is the deliverable itself — a beautifully typeset written assessment.
"Your assessment has already begun." Editorial-serif quiet luxury: warm greige
paper, near-black ink, one archival accent, hairline ledger rules, mono file
indices. Nothing decorative that a real typeset assessment wouldn't have.

## Color — committed tokens

All colors are CSS vars in `src/index.css`. Warm greige/ink family throughout;
**no pure `#000`/`#fff`**. One accent family only: **oxblood / maroon**.

Paper chapter (default):

- `--bg #ecebe6` · `--surface #f2f1ec` — warm greige ground, never white
- `--text #1b1917` · `--text-dim #5d574d` — warm near-black ink
- `--accent #5f1a1a` (oxblood) · `--accent-ink #f1efe9` — archival ruling ink; carries CTAs and the italic accent word
- `--accent-display #5f1a1a` — the display-heading accent word (lifts to `#b5786d` inside the dark chapter so it reads on ink)
- `--rule #cdc9bf` · `--rule-strong #a9a396` — hairline ledger dividers

Dark proof chapter (the flip) — same warm family, inverted:

- `--flip-bg #1a1815` · `--flip-surface #211e1a` · `--flip-text #eae7e0` · `--flip-dim #a49d8f` · `--flip-rule #383429`

Accent covers ≤15% of surface. The dark chapter re-points the generic tokens
(`--bg`, `--text`, `--rule`, …) via `.chapter-dark`, so components reference the
generic tokens and the flip animates them.

## Typography

- Display: **Newsreader** (serif, opsz auto), weight ~410, tracking `-0.021em`, **line-height 0.95** (below 1.0) — monument-scale headlines (`.f-display`)
- Accent italic: **Newsreader italic**, one word per heading max, tinted `--accent-display` (`.f-display em`, `.f-serif`)
- Body: **Geist**, 16.5px, line-height 1.6, ≤62ch (`.body-copy`)
- Labels / file indices: **JetBrains Mono**, 10–11px, uppercase, tracked `0.16–0.18em` (`.kicker`, `.f-mono`, `.nav-link`) — the ledger voice: `A/01 — ASSESSMENT`, `Entry No. 001 · Legal`
- Masthead wordmark (close colophon): Newsreader caps, full measure via SVG `textLength` (`.wordmark-text`)

Paid upgrade named but not shipped: **PP Editorial New** (see `VARIANT.md`).

## Section structure

Single scroll, four-beat arc — hook → shift → proof → ask:

`Hero` (hook) → `Method` (how it works) → **dark chapter** { `Proof` (ledger case entries) · `Foundation` (spec list) } → `Close` (the one ask + ARCHON colophon).

## The flip — the single set-piece

One theme flip: as the proof chapter enters, the ground crossfades from paper to
dark ink (GSAP ScrollTrigger scrub on `--ch-*`), and back as it leaves. The nav
ink swaps to match (an instant attribute toggle, not motion — runs regardless of
reduced-motion). The chapter is **statically dark in CSS**, so with no JS or
reduced-motion the page is complete and still reads as a dark chapter.

## Motion rules

- GSAP + ScrollTrigger. Reveals: rise ≤24px, `autoAlpha`, `power2.out`, `once`. Above-fold gets a small typeset cascade.
- The flip is the only set-piece. No bounce/elastic; no layout-property animation.
- All reveals + the flip tween live inside `matchMedia('(prefers-reduced-motion: no-preference)')` — under **reduced motion nothing runs and the page is a complete static document** (dark chapter still dark, all content visible).

## The two grafts (2026-07)

Both re-skinned fully to Ledger tokens — no foreign accent imported.

1. **ARCHON wordmark landscape** (from `variant/instrument`): viewport-wide
   wordmark re-cut as a Newsreader broadsheet masthead, ink on paper, at the
   close as a colophon. The origin's amber reveal-sweep was dropped to keep the
   flip as the only set-piece.
2. **Side-by-side case columns** (from `variant/artifact`): two-column,
   outcome-first case cards on the Ledger's "Entry No. 001" numbering + outcome
   chips; maroon only; stacks to one column at 390px.
