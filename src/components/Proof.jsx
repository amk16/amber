/* Case-study wording is fact-only (see PRODUCT.md → Brand & tone → honesty rule).
   Presentation grafted from variant/artifact: side-by-side columns, outcome-first
   headlines. Re-skinned to Ledger tokens (maroon only, no ultramarine) and keeping
   the ledger-entry numbering identity. Cards use the generic tokens so the dark
   chapter's paper→ink flip crossfades them; they stack to one column at 390px. */

const ENTRIES = [
  {
    no: 'No. 001',
    field: 'Legal',
    client: 'A specialist law firm.',
    outcome: 'Lawyers review the draft — they don’t build it.',
    body:
      'It drafts contracts to a recognized professional standard, then self-edits: a deterministic linter catches bright-line errors on every pass, and a judgment checklist handles what rules can’t. Each edit cites its source, and a lawyer owns the sign-off.',
    chips: ['Drafts to standard', 'Self-editing linter', 'Every edit cited'],
  },
  {
    no: 'No. 002',
    field: 'Agency',
    client: 'The CEO of a marketing agency.',
    outcome: 'A decision-ready brief every week — with no research staff.',
    body:
      'A pipeline sweeps a tiered network of industry sources, drops anything seen before, and deep-reads what’s left into a private brief — every item sourced, plain-language, with a one-line “why it matters.” It can run and publish itself, unattended.',
    chips: ['Deduped against history', 'Every item sourced', 'Runs unattended'],
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
            Engagements from the studio, side by side. Anonymized. Facts only.
          </p>
        </div>

        {/* side-by-side ledger entries — one column at 390px */}
        <div
          className="mt-16 grid grid-cols-1 gap-5 md:mt-24 md:grid-cols-2 md:gap-6"
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
