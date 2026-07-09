# Judge — craftsman

Lens: design director scoring against the design-vault principles (typography / layout / color / story-flow) and the 12 invariants. Drove all three live at 1440×900 and 390×844, verified computed styles, reduced-motion handling, and reveal states via script (re-verifying `location.href` on every read to survive the shared-page race with the other two judges).

## Scores (1–10 per criterion, per variant)
| Criterion | ledger | instrument | artifact |
|---|---|---|---|
| Typographic craft | 9 | 8 | 7 |
| Principle compliance | 10 | 9 | 8 |
| Motion restraint / quality | 8 | 8 | 7 |
| Cohesion of visual system | 9 | 9 | 8 |
| Screenshot-worthiness (technical founder) | 8 | 9 | 8 |
| **Total** | **44** | **43** | **38** |

## Disqualifying defects (invariant violations, if any — cite the invariant)
None disqualifying. All three pass every invariant. Verified per variant:
- **#4 (no pure #000/#fff):** grounds are warmed — ledger `rgb(236,235,230)` on ink `rgb(27,25,23)`; instrument `rgb(10,10,8)` on `rgb(232,232,227)`; artifact `rgb(233,231,225)` on `rgb(32,31,27)`. ✓ all.
- **#5 (one accent):** ledger maroon, instrument amber, artifact blue — one family each. ✓
- **#2 (CTA nav+hero+close, nav ≤4 links+CTA):** all three = wordmark + 3 links + "Book 20 minutes", CTA repeated in nav/hero/close. ✓ (Note, not a violation: the CTA resolves to a `mailto:` not a live calendar link — identical across all three, so it's the shared booking-mechanism placeholder, scored neutrally.)
- **#6 (mono informational):** JetBrains / Fragment / IBM Plex Mono used only for section marks, HUD %, spec labels. ✓
- **#9 (body ≥15px):** ledger 17px, instrument 16px, artifact 15.5–17px. ✓ Soft note: artifact has a 13px caption ("Both cases anonymized") — a caption, not body copy, so not a #9 breach, but it's the one sub-floor line in the set.
- **#8 (reduced-motion = complete static page):** ledger and instrument are genuinely static — `0` reveal-gated elements at load, only a global `transition/animation-duration:0.001ms` rule. **Artifact is the weakest here but still compliant:** 7 elements ship at `opacity:0 + translateY(26px)` and reveal on scroll; its reduced-motion rule only zeroes durations (does not force `opacity:1`/`transform:none`), so content is reachable and motion-free but relies on the scroll observer firing rather than being static-by-default. Reachable → not a DQ, but the least bulletproof reduced-motion story of the three.
- **#10 (no h-scroll @390):** verified no horizontal scroll on ledger; confirmed on instrument/artifact via mobile render. ✓
- **#11 (visible focus):** focus/`:focus-visible` rules present. ✓
- **#12 (OFL/free fonts):** ledger Newsreader + Geist + JetBrains Mono; instrument Archivo + Fragment Mono; artifact Instrument Sans + IBM Plex Mono — all free/OFL. ✓
- **#1 (facts only)** and **#3 (four-beat arc):** all three carry a clean hook→shift→proof→ask with anonymized, factual claims. ✓

## Verdict (ranked, 3 sentences max each)
1. **ledger.** The strongest *craftsman* object: Newsreader display serif at 148px, line-height 0.95, −3.1px tracking with a single italic maroon accent word ("*already*") is a genuine editorial-serif statement, and the 148:11 scale contrast (~13.5:1) sits dead-center of the vault's 10–15:1 target. It is the most rigorous on the invariants — truly static under reduced-motion (zero reveal-gating), one accent, document-grade mono section marks — and typography.md ranks its indie-register serif a tier above the Google pairings the others use. It reads a touch "law-firm editorial" rather than "systems," which is its only real risk.
2. **instrument.** A hair behind and the most on-trend against the 2026-07 sweep: off-black `rgb(10,10,8)` ground, amber accent, Fragment Mono HUD with a live scroll-% counter, a full-bleed ARCHON wordmark, and a dark→light→dark ground flip that stages the proof section. It is the most screenshot-worthy to a technical founder and equally cohesive; the only quibble is the double flip (layout principle 7 prefers one), which reads more as book-ending than indecision. Grotesque Archivo is superbly set but a marginally more common register than ledger's serif.
3. **artifact.** The most literal realization of the brief — an engineering-blueprint system with FIG. numbers, a mono workflow schematic, and numbered proofs — and genuinely delightful to an engineer, but it scores lowest on pure craft. Its Instrument Sans + IBM Plex Mono is the exact pairing typography.md flags as "one tier down," the gray-on-greige numbered list drops contrast, and it carries the set's only sub-floor caption and its least bulletproof reduced-motion implementation. Cohesive and clever, just less resolved at the type and color layer than the other two.

## Graftable strengths (named element + which variant, one line each)
- **Italic accent-word in the serif hero** (ledger) — one word ("*already*") set in maroon italic inside a near-black serif headline; the whole page's accent, spent once.
- **"Typeset like the deliverable" section marks** (ledger) — `A/01 — ASSESSMENT` mono foot-labels that make the page read as the written artifact it's selling.
- **Scroll-% HUD counter in the nav** (instrument) — mono `000% → 100%` progress readout; informational motion that never becomes decoration.
- **Dark→light ground flip for the proof section** (instrument) — the felt "the argument starts here" shift, executed as a ground inversion exactly per layout principle 7.
- **Engagement-terms spec table** (instrument) — mono `CALL / ASSESSMENT / BUILD / PRICE / RUN` right-aligned ledger that answers price/scope without a pricing grid.
- **The workflow-unit schematic (FIG. 01)** (artifact) — an IBM Plex Mono blueprint diagram of intake→drafting→filing→reporting; catnip to a technical founder and the clearest "here is the thing you're buying."
- **Single-row black highlight in the numbered "what it does" list** (artifact) — one item darkened among mid-gray siblings to pace the proof one line at a time.
