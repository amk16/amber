# Variant review — 2026-07 redesign (variant-forge T3)

Spec: ~/Desktop/docs/superpowers/specs/2026-07-09-archon-redesign-design.md
Variants: ledger (5101/4501) · instrument (5102/4502) · artifact (5103/4503)
Contents: screenshots per variant, three judge verdicts, decision record.
Dead variant: branch variant/paper.

## Serving the variants

Each variant lives in its own git worktree and is built + served independently on a
dedicated port. Preview servers (production builds via `vite preview`) are kept running
for judges and the human pick:

| Variant    | Direction                              | Worktree                                    | Preview port |
|------------|-----------------------------------------|----------------------------------------------|:------------:|
| ledger     | Editorial-serif assessment              | `~/Desktop/solutions-variants/ledger`         | 4501         |
| instrument | Off-black precision                     | `~/Desktop/solutions-variants/instrument`     | 4502         |
| artifact   | Product-reveal                          | `~/Desktop/solutions-variants/artifact`       | 4503         |

To (re)build and serve a variant:

```bash
cd ~/Desktop/solutions-variants/<variant> && npm run build
npx vite preview --port <port>   # 4501 / 4502 / 4503 per table above
```

Open `http://localhost:4501/`, `http://localhost:4502/`, `http://localhost:4503/` to view
ledger, instrument, and artifact respectively.

## Screenshot index

All shots live in `shots/`, captured at 1440×900 (desktop, JPEG q65) and 390×844 (mobile,
JPEG q65). Desktop shots are hero / proof / close (top of page, mid-scroll, bottom of page).

| File                         | Variant    | Viewport   | Section                                                        |
|-------------------------------|------------|------------|-----------------------------------------------------------------|
| `ledger-desktop-1.jpg`        | ledger     | 1440×900   | Hero                                                             |
| `ledger-desktop-2.jpg`        | ledger     | 1440×900   | Proof (mid-scroll)                                               |
| `ledger-desktop-3.jpg`        | ledger     | 1440×900   | Close (page bottom)                                              |
| `ledger-mobile-1.jpg`         | ledger     | 390×844    | Hero                                                             |
| `instrument-desktop-1.jpg`    | instrument | 1440×900   | Hero                                                             |
| `instrument-desktop-2.jpg`    | instrument | 1440×900   | Proof (mid-scroll — this chapter inverts to a light background) |
| `instrument-desktop-3.jpg`    | instrument | 1440×900   | Close (page bottom)                                              |
| `instrument-mobile-1.jpg`     | instrument | 390×844    | Hero                                                             |
| `artifact-desktop-1.jpg`      | artifact   | 1440×900   | Hero                                                             |
| `artifact-desktop-2.jpg`      | artifact   | 1440×900   | Proof — benefit stack captured mid-pin (pinned/scroll-driven section, shot taken at the midpoint of its pin-spacer) |
| `artifact-desktop-3.jpg`      | artifact   | 1440×900   | Close (page bottom)                                              |
| `artifact-mobile-1.jpg`       | artifact   | 390×844    | Hero                                                             |
