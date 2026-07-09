const ENTRIES = [
  {
    no: 'No. 001',
    field: 'Legal',
    client: 'A law firm handling hospital matters.',
    lines: [
      [
        'Before',
        'Afternoons went to assembling reply drafts from precedent files.',
      ],
      ['Built', 'A system that drafts from the case record.'],
      [
        'Now',
        'Associates shape drafts instead of assembling them. The file trail stays clean.',
      ],
    ],
    chips: ['Drafts from the case record', 'Clean file trail', 'Shape, not assemble'],
  },
  {
    no: 'No. 002',
    field: 'Agency',
    client: 'The CEO of a marketing agency.',
    lines: [
      [
        'Before',
        'Clients ask about AI developments. Staying ahead of them was a job in itself.',
      ],
      [
        'Built',
        'A weekly pipeline that reads the landscape and writes a private, decision-ready brief.',
      ],
      ['Now', 'The brief arrives weekly. No research staff.'],
    ],
    chips: ['Weekly cadence', 'Decision-ready', 'No research staff'],
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
            The <em>record</em> to date.
          </h2>
          <p
            className="body-copy self-end text-[16.5px] md:col-span-4 md:col-start-9"
            data-reveal
          >
            Two engagements. Anonymized. Facts only.
          </p>
        </div>

        <div className="mt-16 md:mt-24">
          {ENTRIES.map((e) => (
            <article key={e.no} className="entry" data-reveal>
              <header>
                <p className="f-mono m-0 text-[13px] uppercase tracking-[0.14em] text-[var(--accent-display)]">
                  Entry {e.no}
                  <span className="text-[var(--text-dim)]">
                    {'  ·  '}
                    {e.field}
                  </span>
                </p>
                <p className="f-serif m-0 mt-4 text-[clamp(1.5rem,2.4vw,1.9rem)] leading-[1.2] text-[var(--text)]">
                  {e.client}
                </p>
              </header>

              <div>
                <div className="flex flex-col gap-5">
                  {e.lines.map(([label, text]) => (
                    <div key={label} className="entry-line">
                      <span className="kicker">{label}</span>
                      <p className="m-0 max-w-[52ch] text-[16.5px] leading-[1.55] text-[var(--text)]">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-2.5 md:pl-[96px]">
                  {e.chips.map((c) => (
                    <span key={c} className="chip">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
          <div className="rule" />
        </div>
      </div>
    </section>
  )
}
