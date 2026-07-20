import { SITE } from '../config'
import { useIntake } from '../intake/IntakeContext'

const STEPS = [
  [
    'We look',
    'We map how your work actually flows — and find where intelligent systems can help.',
  ],
  [
    'We prioritize',
    'Which workflows are worth automating first, and which to leave alone.',
  ],
  [
    'A clear deliverable',
    'Within 48 hours, a phase-by-phase plan to supercharge your systems.',
  ],
]

export default function Close() {
  const { open } = useIntake()
  return (
    <section id="close" className="px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto max-w-[1200px]">
        <p className="kicker" data-reveal>
          <b>C/01</b>&ensp;—&ensp;The first meeting
        </p>

        {/* The header arrives covered by the slip; the wipe uncovers it.
            No data-reveal here: the cover-slip choreography owns this block. */}
        <div className="relative mt-10 overflow-hidden" data-cover-wrap>
          <h2
            className="f-display max-w-[16ch] text-[clamp(3rem,8vw,7.25rem)]"
            data-cover-under
          >
            A single meeting to evaluate your <em>needs</em>.
          </h2>
          <div className="cover-slip" data-cover-slip aria-hidden="true">
            <span className="f-display text-[clamp(2.4rem,6.2vw,5.6rem)]">
              Where Do We <em>Begin</em>?
            </span>
          </div>
        </div>

        <div
          className="mt-14 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-12 md:gap-6"
          data-reveal
        >
          <ol className="m-0 list-none p-0 md:col-span-7" data-reveal-stagger>
            {STEPS.map(([lead, body], i) => (
              <li key={lead} className="ledger-row" data-reveal-child>
                <span className="f-mono text-[13px] tracking-[0.08em] text-[var(--accent-display)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="m-0 max-w-[52ch] text-[17px] leading-[1.55]">
                  <span className="f-serif text-[21px] text-[var(--text)]">
                    {lead}.
                  </span>{' '}
                  <span className="text-[var(--text-dim)]">{body}</span>
                </p>
              </li>
            ))}
          </ol>

          <div className="flex flex-col items-start gap-6 self-end md:col-span-4 md:col-start-9 md:items-end">
            <button type="button" onClick={open} className="btn-primary">
              Book a meeting <span className="arr" aria-hidden="true">→</span>
            </button>
            {SITE.email && (
              <a href={`mailto:${SITE.email}`} className="link-quiet">
                or write: {SITE.email}
              </a>
            )}
          </div>
        </div>

        {/* The billboard — grafted from variant/instrument, re-set in the
            Ledger's voice: the nameplate at full measure, ink on paper,
            masthead serif. No sweep; the flip stays the only set-piece. */}
        <div className="mt-28 md:mt-40" data-reveal>
          <div className="flex items-baseline justify-between gap-6 pb-3">
            <span className="kicker">Archon Systems</span>
            <span className="kicker hidden sm:inline">
              AI systems for businesses
            </span>
          </div>
          <div className="rule" />
          <div className="mt-6 md:mt-9" aria-hidden="true">
            <svg
              viewBox="0 0 1200 148"
              className="block h-auto w-full"
              preserveAspectRatio="xMidYMax meet"
            >
              <text
                x="600"
                y="143"
                textAnchor="middle"
                textLength="1192"
                lengthAdjust="spacingAndGlyphs"
                className="wordmark-text"
              >
                ARCHON
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
