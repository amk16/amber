import { SITE } from '../config'

const STEPS = [
  {
    n: '01',
    name: 'Assessment',
    time: '20-min call → 48 hours',
    body: 'A short call about how your work actually flows. Within 48 hours you get a written assessment: what we’d fix, options sized to your firm, honest prices. Yours to keep either way.',
  },
  {
    n: '02',
    name: 'Build',
    time: '2–4 weeks',
    body: 'One workflow, end-to-end. Fixed price agreed before we start. If it takes longer than planned, that’s our problem, not yours.',
  },
  {
    n: '03',
    name: 'Care',
    time: 'ongoing · first month included',
    body: 'We host it, watch it, and sharpen it as your team’s real usage teaches us what matters.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="relative px-6 md:px-10 py-28">
      <div className="max-w-[1400px] mx-auto">
        <div data-reveal className="flex items-center justify-between mb-16 flex-wrap gap-4">
          <span className="section-index">
            <span className="led" />
            §1 · How it works
          </span>
          <span className="kicker">three steps · no retainers required to start</span>
        </div>

        <div data-reveal-stagger className="grid grid-cols-1 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              data-reveal-child
              className="relative px-0 md:px-10 py-10 md:py-4 first:pl-0 last:pr-0"
              style={{
                borderLeft: i > 0 ? '1px solid var(--rule)' : 'none',
              }}
            >
              <div className="flex items-baseline justify-between mb-6">
                <span
                  className="f-display text-[64px] leading-none"
                  style={{ color: 'color-mix(in oklab, var(--text) 18%, transparent)' }}
                >
                  {s.n}
                </span>
                <span className="kicker">{s.time}</span>
              </div>
              <h3 className="f-display text-[28px] mb-4">
                {s.name}
                {i === 0 && <span className="f-serif" style={{ color: 'var(--accent)' }}>.</span>}
              </h3>
              <p className="text-[15.5px] leading-[1.6] max-w-[40ch]" style={{ color: 'var(--text-dim)' }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <div data-reveal className="mt-16 pt-8 flex items-center justify-between flex-wrap gap-4" style={{ borderTop: '1px solid var(--rule)' }}>
          <p className="text-[15px]" style={{ color: 'var(--text-dim)' }}>
            The first step costs 20 minutes and nothing else.
          </p>
          <a href={SITE.calendar} className="btn-ghost">
            Book the call
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 5 H9 M5.5 1.5 L9 5 L5.5 8.5" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
