# Variant decision — 2026-07 Archon redesign

**Date:** 2026-07-09
**Winner:** `variant/ledger` — "The Ledger" (editorial-serif written-assessment direction)
**Integrated into:** `main` (replace-merge of the winner's tree, then two grafts)

---

## The call

Ali chose the Ledger as the base direction and asked for two grafts from the
losing branches. His words, verbatim:

> "the ledger is my favorite, with the large archon header from the instrument
> being grafted along with the column side by side presentation of previous
> work from the artifact"

That decision is now encoded in the codebase (see grafts below) and in
`DESIGN.md` / `PRODUCT.md`. This record exists so the rationale is never lost
again.

---

## Judge scores

Three judges scored each variant (Ledger `L`, Instrument `I`, Artifact `A`).
Full write-ups: `judge-buyer.md`, `judge-craftsman.md`, `judge-closer.md`.

| Judge          | Ledger | Instrument | Artifact |
| -------------- | :----: | :--------: | :------: |
| Buyer          |   42   |     37     |    45    |
| Craftsman      |   44   |     43     |    38    |
| Closer         |   38   |     39     |    44    |
| **Aggregate**  | **124**|  **119**   | **127**  |

- **Aggregate ranking:** Artifact 127 · Ledger 124 · Instrument 119.
- The **Craftsman ranked Ledger 1st** — the editorial-serif typesetting and the
  single theme-flip set-piece read as the highest-craft, most screenshot-worthy
  direction, which is the studio's bar (a technical founder would screenshot it).
- Artifact led the aggregate on buyer/closer scannability (side-by-side case
  columns, outcome-first headlines); Instrument's distinctive asset was its
  viewport-wide ARCHON wordmark landscape.

Ali overrode the raw aggregate in favor of the craft leader, then reclaimed the
two strengths that made Artifact and Instrument score well — as grafts onto the
Ledger, rather than as whole directions.

---

## Grafts applied

Both grafts were re-skinned entirely to the Ledger's tokens. The one-accent
invariant (Ledger maroon / oxblood `#5f1a1a` only) is preserved: neither graft
imports its origin branch's accent.

1. **ARCHON wordmark landscape** — from `variant/instrument`
   (`feat: graft ARCHON wordmark landscape from variant/instrument`).
   Instrument's viewport-wide wordmark, re-cut from its condensed grotesque +
   amber reveal-sweep into a **broadsheet masthead**: Newsreader serif caps,
   full measure via SVG `textLength`, ink on paper. **No amber** — the sweep
   animation was dropped so the theme-flip stays the only motion set-piece.
   Placed as a colophon at the **close** section (after the CTA), preserving the
   hero's hook-headline primacy ("Your assessment has already begun.").

2. **Side-by-side case columns** — from `variant/artifact`
   (`feat: graft side-by-side case columns from variant/artifact`).
   Artifact's two-column, outcome-first case presentation, rebuilt on the
   Ledger's **"Entry No. 001 · Legal" ledger-entry numbering** and outcome
   chips. **No ultramarine** — cards use maroon (`--accent-display`) and the
   generic tokens so the dark-chapter paper→ink flip crossfades them. Degrades
   to a single stacked column at 390px.

---

## Disposition

- `main` = integrated Ledger + both grafts. `npm run lint` and `npm run build`
  green; verified at 1440×900 and 390×844 (no horizontal scroll; columns stack;
  wordmark scales full-width).
- All `variant/*` branches preserved; worktrees removed.
- Invariants re-checked: CTA "Book 20 minutes" in nav+hero+close; nav 3 links +
  CTA; no `#000`/`#fff`; one accent family (maroon); ≤1 motion set-piece (the
  flip); reduced-motion = complete static page; all claims from the facts sheet.
