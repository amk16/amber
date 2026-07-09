# VARIANT — D1 "The Ledger"

The site as the deliverable itself: a beautifully typeset written assessment.
Your assessment has already begun. Editorial-serif quiet luxury; the page is
structured as a filed document (A/01 Assessment, A/02 Method, B/01 Proof,
B/02 Foundation, C/01 The Ask) with hairline ledger rules, mono file indices,
and a mid-page theme flip into a dark proof chapter.

## Accent

Oxblood, `#5f1a1a` family (single accent family). Chosen over deep green:
ledger ruling ink and law-book leather, the right register for legal /
professional-services buyers. Lifted to `#b5786d` inside the dark chapter so
small accents keep ≥4.5:1 contrast. Accent carries: CTAs, ledger line numbers,
file-index prefixes, one italic display word per heading. Well under 15% of
surface.

## Palette

- Paper: bg `#ecebe6` (warm greige), text `#1b1917`, dim `#5d574d`, rule `#cdc9bf`
- Dark chapter (same warm family inverted): bg `#1a1815`, text `#eae7e0`,
  dim `#a49d8f`, rule `#383429`
- No `#000` / `#fff` anywhere in tokens or components.

## Fonts (shipped — all free, Google Fonts, OFL)

- **Newsreader** (variable, opsz 6–72, true italics) — display serif at
  monument scale, line-height 0.95; italic cut for the single accent word
  per heading and the wordmark.
- **Geist** (OFL) — body, 16.5px, ≤62ch.
- **JetBrains Mono** (OFL) — file indices, kickers, ledger annotations,
  buttons, chips.

**Paid upgrade:** replace Newsreader with **PP Editorial New** (Pangram
Pangram) for the display voice. Same slots, license required — do not ship
without purchasing.

## Set-piece (the one motion moment)

The theme flip. The proof chapter (`.chapter-dark`, wrapping B/01 Proof and
B/02 Foundation) is **statically dark in CSS**; with motion allowed, GSAP
scrubs the chapter's CSS custom properties (`--ch-bg/--ch-text/--ch-dim/
--ch-rule`) so the ground crossfades paper→ink as the chapter enters the
viewport and ink→paper as it leaves. One flip total (one dark chapter).
Everything else: quiet one-time reveals, y ≤ 24px, power2.out, plus a small
first-fold cascade. `prefers-reduced-motion`: no tweens are created; the page
is complete and statically flipped. Nav ink swap over the dark chapter is an
instant attribute toggle (runs regardless of motion preference).

## Checklist confirmation

1. All claims from facts sheet — yes; copy audited line-by-line against the
   facts sheet (offer, services, two anonymized cases, foundation, brand/CTA).
2. CTA in nav + hero + close; nav has 3 links + CTA — yes.
3. Four-beat arc legible — hook (A/01–A/02) → shift (the flip) → proof
   (B/01–B/02) → one ask (C/01).
4. No `#000`/`#fff` — grep clean in src/ and index.html.
5. One accent family — oxblood only (light + lifted dark variant).
6. Mono labels informational — file indices, row numbers, durations,
   entry labels, spec keys.
7. ≤1 motion set-piece — the flip; all other motion is subtle reveals.
8. Reduced motion = complete static page — chapter dark by default in CSS;
   GSAP tweens only created inside `(prefers-reduced-motion: no-preference)`.
9. Body ≥15px ≤70ch — 16.5px, 62ch max.
10. No horizontal scroll at 390px — verified in browser.
11. Visible keyboard focus — 2px oxblood `:focus-visible` outline (flips to
    cream inside dark chapter).
12. Free fonts only shipped — Newsreader, Geist, JetBrains Mono via Google
    Fonts; PP Editorial New named above as unshipped paid upgrade.
