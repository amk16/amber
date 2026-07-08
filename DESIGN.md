# DESIGN.md — Archon Systems

## Theme

Light, warm paper default. Scene: a managing partner opens the link on a laptop in daytime office light, deciding whether a stranger deserves 20 minutes — calm cream, not carbon black. The palette system supports alternates (obsidian, cobalt, terminal) via `data-palette`; **paper is the shipping default**. The in-nav palette switcher is a design-review tool: remove or hide before production deploy.

## Color — committed strategy

Tokens in `src/index.css`, all via CSS vars:

- Paper: `--bg #eee8da`, `--surface #f3eedf`, `--text #161512`, `--text-dim #4a463d`, accent `--accent #c2410c` (rust)
- Rust carries CTAs, diagram highlights, and the italic accent word. Roughly 10–15% of surface: committed but not drenched.
- Never raw #000/#fff; all neutrals are warm-tinted.

## Typography

- Display: **Syne** (500), tight tracking, line-height 0.92 (`.f-display`)
- Accent italic: **Fraunces** opsz 144 italic (`.f-serif`) — one word per heading, max
- Body: **Geist**, 16–17px, max 65ch
- Annotations/labels: **JetBrains Mono** 10–12px uppercase tracked (`.kicker`, `.f-mono`) — the "technical document" voice: file indices, section numbers, spec lines

## Components & texture

- Grain overlay (SVG turbulence, opacity ~0.08 on paper)
- Dot grid + schematic grid backgrounds, hairline `--rule` dividers
- `.btn-primary` (accent pill, mono uppercase), `.btn-ghost`, `.chip`, `.section-index`, `.card` (border + radial hover tint), `.link-under`
- Workflow schematic: SVG nodes + animated stroke-dash flow paths + traveling pulses — the one piece of spectacle; keep it honest (labels describe the actual offer, no fake telemetry)

## Motion

- GSAP + ScrollTrigger. Reveals: y 32–40px, opacity, power3.out, once
- Hero: split-word rise (expo.out), staggered
- No bounce/elastic; no layout-property animation; `prefers-reduced-motion` kills all
