/* Case-study wording is fact-only (see PRODUCT.md → Brand & tone → honesty rule).
   Presentation grafted from variant/artifact: side-by-side columns, outcome-first
   headlines. Re-skinned to Ledger tokens (maroon only, no ultramarine) and keeping
   the ledger-entry numbering identity. Cards use the generic tokens so the dark
   chapter's paper→ink flip crossfades them; they stack to one column at 390px. */

/* Truth amendment 2026-07-20: the legal-drafting entry removed — that engagement
   is still in discovery, and this ledger records only shipped systems (honesty
   rule, PRODUCT.md). It returns as its own entry (No. 004) the day it ships. */
const ENTRIES = [
  {
    no: 'No. 001',
    field: 'Agency',
    client: 'The CEO of a marketing agency.',
    outcome: 'A decision-ready brief every week — with no research staff.',
    body:
      'A whole landscape of sources, read and distilled into a single private brief — the signal, without the search. It keeps itself current, and arrives without anyone lifting a finger.',
    chips: ['Signal, not noise', 'Self-updating', 'Runs unattended'],
  },
  {
    no: 'No. 002',
    field: 'Method',
    client: 'Internal — the studio’s method engine, public on GitHub.',
    outcome: 'A craft’s judgment, written down — extracted from the work itself.',
    body:
      'Show it the best work in a field and it studies what the winners actually do — sweeping examples, finding the patterns that repeat, and keeping only what survives repeated evidence. What comes back is a short rulebook you can trust, ranked by confidence, sharper after every sweep.',
    chips: ['Evidence-ranked', 'Any field', 'Sharpens with use'],
  },
  {
    no: 'No. 003',
    field: 'Process',
    client: 'Internal — a family’s filing, run end-to-end.',
    outcome: 'A paperwork-heavy process that always knows its next step.',
    body:
      'A multi-person filing, held as one living system — every form, document, fee, and deadline tracked to done. It knows what’s complete, what’s parked and why, and exactly what each person owes next. People answer questions; the system carries the process.',
    chips: ['Nothing dropped', 'Knows what’s next', 'Multi-person'],
  },
]

export default function Proof() {
  return (
    <section id="proof" className="px-6 pt-28 md:px-10 md:pt-40">
      <div className="mx-auto max-w-[1200px]">
        <p className="kicker" data-reveal>
          <b>B/01</b>&ensp;—&ensp;Proof
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-6">
          <h2
            className="f-display text-[clamp(2.5rem,5.4vw,4.6rem)] md:col-span-7"
            data-reveal
          >
            Intelligent Systems in <em>Practice</em>.
          </h2>
          <p
            className="body-copy self-end text-[16.5px] md:col-span-4 md:col-start-9"
            data-reveal
          >
            From the studio&rsquo;s ledger. Anonymized. Facts only.
          </p>
        </div>

        {/* side-by-side ledger entries — one column at 390px */}
        <div
          className="mt-16 grid grid-cols-1 gap-5 md:mt-24 md:grid-cols-2 md:gap-6"
          data-reveal-stagger
        >
          {/* The ground rules sit in the open cell beside Entry No. 003 —
              moved up from Foundation (2026-07-21) so the terms read right
              next to the work they govern. */}
          {ENTRIES.map((e) => (
            <article
              key={e.no}
              data-reveal-child
              className="flex flex-col p-7 md:p-9"
              style={{
                border: '1px solid var(--rule)',
                background: 'color-mix(in oklab, var(--text) 4%, transparent)',
              }}
            >
              <p className="f-mono m-0 text-[12px] uppercase tracking-[0.14em] text-[var(--accent-display)]">
                Entry {e.no}
                <span className="text-[var(--text-dim)]">
                  {'  ·  '}
                  {e.field}
                </span>
              </p>

              {/* outcome-first headline */}
              <h3 className="f-display m-0 mt-5 text-[clamp(1.4rem,2.2vw,1.85rem)] leading-[1.15] text-[var(--text)]">
                {e.outcome}
              </h3>

              <p className="mt-5 text-[15.5px] leading-[1.6] text-[var(--text-dim)]">
                {e.body}
              </p>

              <div
                className="mt-7 flex flex-wrap gap-2.5 pt-6"
                style={{ borderTop: '1px solid var(--rule)' }}
              >
                {e.chips.map((c) => (
                  <span key={c} className="chip">
                    {c}
                  </span>
                ))}
              </div>
            </article>
          ))}

          <dl className="m-0 self-end p-2 md:p-4" data-reveal-child>
            {[
              ['Data', 'Yours, in your own deployment.'],
              ['Ownership', 'You own your system.'],
              ['Billing', 'Fixed price. No hourly meter.'],
            ].map(([k, v]) => (
              <div key={k} className="spec-row spec-row--lg">
                <dt className="kicker">{k}</dt>
                <dd className="f-serif m-0 text-[clamp(1.35rem,2.4vw,1.9rem)] leading-[1.3] text-[var(--text)]">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
