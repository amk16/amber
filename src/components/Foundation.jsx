const SPECS = [
  ['Data', 'Yours, in your own deployment.'],
  ['Ownership', 'You own your system.'],
  ['Billing', 'Fixed price. No hourly meter.'],
]

export default function Foundation() {
  return (
    <section id="foundation" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1200px]">
        <p className="kicker" data-reveal>
          <b>B/02</b>&ensp;—&ensp;Foundation
        </p>

        <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-5">
            <h2
              className="f-display text-[clamp(2.5rem,5.4vw,4.6rem)]"
              data-reveal
            >
              Led and designed by <em>engineers</em>.
            </h2>
            <p className="body-copy mt-8 text-[16.5px]" data-reveal>
              Archon Systems is engineering work: system architecture,
              honest value trade-offs, and user-centric design. The
              background behind it spans production ML pipelines and agentic
              scaling. The rest is set out below.
            </p>
          </div>

          <dl
            className="m-0 self-end md:col-span-6 md:col-start-7"
            data-reveal-stagger
          >
            {SPECS.map(([k, v]) => (
              <div key={k} className="spec-row spec-row--lg" data-reveal-child>
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
