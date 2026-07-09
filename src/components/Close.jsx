import { SITE } from '../config'

export default function Close() {
  return (
    <section id="close" className="px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto max-w-[1200px]">
        <p className="kicker" data-reveal>
          <b>C/01</b>&ensp;—&ensp;The ask
        </p>

        <h2
          className="f-display mt-10 max-w-[14ch] text-[clamp(3rem,8vw,7.25rem)]"
          data-reveal
        >
          Twenty minutes. Then it’s in <em>writing</em>.
        </h2>

        <div
          className="mt-14 flex flex-col gap-10 md:mt-20 md:flex-row md:items-end md:justify-between"
          data-reveal
        >
          <p className="body-copy text-[17px] md:max-w-[46ch]">
            One call. A written assessment within 48 hours, yours to keep
            either way. The price is fixed before any build begins.
          </p>

          <div className="flex shrink-0 flex-col items-start gap-6 md:items-end">
            <a href={SITE.calendar} className="btn-primary">
              Book a meeting <span className="arr" aria-hidden="true">→</span>
            </a>
            <a href={`mailto:${SITE.email}`} className="link-quiet">
              or write: {SITE.email}
            </a>
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
