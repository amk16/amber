const LINES = [
  {
    n: '01',
    lead: 'The call.',
    body: 'Twenty minutes, on your calendar.',
    meta: '20 min',
  },
  {
    n: '02',
    lead: 'The assessment.',
    body: 'Written, delivered within 48 hours. Yours to keep either way.',
    meta: '48 hrs',
  },
  {
    n: '03',
    lead: 'The build.',
    body: 'One workflow, end to end: intake, drafting, reporting, or operations intelligence, inside the tools you already use.',
    meta: '2–4 wks',
  },
  {
    n: '04',
    lead: 'The price.',
    body: 'Fixed, agreed before work starts. If it takes longer, that’s our problem.',
    meta: 'Fixed',
  },
  {
    n: '05',
    lead: 'The watch.',
    body: 'Hosted, watched, sharpened. First month included.',
    meta: 'Mo. 1 incl.',
  },
]

export default function Method() {
  return (
    <section id="method" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1200px]">
        <p className="kicker" data-reveal>
          <b>A/02</b>&ensp;—&ensp;Method
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-6">
          <h2
            className="f-display text-[clamp(2.5rem,5.4vw,4.6rem)] md:col-span-7"
            data-reveal
          >
            The engagement,
            <br />
            in <em>five</em> lines.
          </h2>
          <p
            className="body-copy self-end text-[16.5px] md:col-span-4 md:col-start-9"
            data-reveal
          >
            The sequence below is the entire arrangement. It starts with a
            call and ends with a running system.
          </p>
        </div>

        <div className="mt-16 md:mt-24" data-reveal-stagger>
          {LINES.map((l) => (
            <div key={l.n} className="ledger-row" data-reveal-child>
              <span className="f-mono text-[13px] tracking-[0.08em] text-[var(--accent-display)]">
                {l.n}
              </span>
              <p className="m-0 max-w-[58ch] text-[17px] leading-[1.55]">
                <span className="f-serif text-[21px] text-[var(--text)]">
                  {l.lead}
                </span>{' '}
                <span className="text-[var(--text-dim)]">{l.body}</span>
              </p>
              <span className="row-meta kicker whitespace-nowrap">{l.meta}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
