/* Case-study wording is fact-only (see PRODUCT.md → Brand & tone → honesty rule).
   Presentation grafted from variant/artifact: side-by-side columns, outcome-first
   headlines. Re-skinned to Ledger tokens (maroon only, no ultramarine) and keeping
   the ledger-entry numbering identity. Cards use the generic tokens so the dark
   chapter's paper→ink flip crossfades them; they stack to one column at 390px. */

/* Truth amendment 2026-07-20: the legal-drafting entry removed — that engagement
   is still in discovery, and this ledger records only shipped systems (honesty
   rule, PRODUCT.md). It returns as its own entry the day it ships. */
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

        {/* single ledger entry at reading width — grid returns to two columns
            when the next shipped system joins it */}
        <div
          className="mt-16 grid max-w-[720px] grid-cols-1 gap-5 md:mt-24 md:gap-6"
          data-reveal-stagger
        >
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
        </div>
      </div>
    </section>
  )
}
