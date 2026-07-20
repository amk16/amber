import { useIntake } from '../intake/IntakeContext'

const META = [
  ['Price', 'Published — fixed per checkpoint'],
  ['Build', 'In checkpoints. First one live in ~2 weeks'],
  ['Assessment', 'Written. Yours to keep either way'],
]

export default function Hero() {
  const { open } = useIntake()
  return (
    <section id="top" className="px-6 pt-36 md:px-10 md:pt-44">
      <div className="mx-auto max-w-[1200px]">
        <p className="kicker" data-reveal>
          <b>A/01</b>&ensp;—&ensp;Assessment&ensp;·&ensp;Archon Systems
        </p>

        <h1
          className="f-display mt-10 text-[clamp(3.4rem,10.5vw,9.25rem)]"
          data-reveal
        >
          Powerful, reliable,
          <br />
          <em>intelligent</em> systems.
        </h1>

        <div
          className="mt-14 flex flex-col gap-10 md:mt-20 md:flex-row md:items-end md:justify-between"
          data-reveal
        >
          <p className="body-copy text-[17px] md:max-w-[52ch]">
            Research that runs itself weekly. Filings that never lose their
            place. First drafts that arrive without being asked. Archon
            Systems builds <strong>AI workflows</strong> that take these off
            your team&rsquo;s desk entirely — running end-to-end in the tools
            your firm already uses, while your people do the work that
            actually needs them.
          </p>

          <div className="flex shrink-0 flex-wrap items-center gap-x-8 gap-y-6">
            <button type="button" onClick={open} className="btn-primary">
              Book a meeting <span className="arr" aria-hidden="true">→</span>
            </button>
            <a href="#method" className="link-quiet whitespace-nowrap">
              Read the method
            </a>
          </div>
        </div>

        <div className="mt-16 md:mt-24" data-reveal>
          <div className="rule" />
          <dl className="grid grid-cols-1 gap-x-12 gap-y-9 py-9 sm:grid-cols-3 md:py-11">
            {META.map(([k, v]) => (
              <div
                key={k}
                className="flex flex-col gap-2.5 sm:border-l sm:border-[var(--rule)] sm:pl-10 sm:first:border-l-0 sm:first:pl-0"
              >
                <dt className="kicker">{k}</dt>
                <dd className="f-serif m-0 text-[clamp(1.15rem,1.7vw,1.35rem)] leading-[1.3] text-[var(--text)]">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
          <div className="rule" />
        </div>
      </div>
    </section>
  )
}
