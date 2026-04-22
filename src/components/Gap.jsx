import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const ROWS = [
  {
    before: 'Dashboards that describe the past',
    after: 'Agents that act on the present',
  },
  {
    before: 'Analysts stitching CSVs by hand',
    after: 'Pipelines that answer in plain English',
  },
  {
    before: 'Models trapped in notebooks',
    after: 'Models deployed into daily work',
  },
  {
    before: 'Reports nobody opens on Monday',
    after: 'Insights delivered to the right role',
  },
  {
    before: 'Silos your tools politely ignore',
    after: 'A single stack of living context',
  },
]

export default function Gap() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // each row animates independently on scroll
      gsap.utils.toArray('[data-row]').forEach((row) => {
        const before = row.querySelector('[data-before]')
        const after = row.querySelector('[data-after]')
        const strike = row.querySelector('[data-strike]')
        const arrow = row.querySelector('[data-arrow-line]')
        const num = row.querySelector('[data-num]')
        const rule = row.querySelector('[data-rule]')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })

        tl.from(rule, { scaleX: 0, transformOrigin: 'left center', duration: 0.9, ease: 'power3.out' })
          .from(num, { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.7')
          .from(before, { y: 40, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.6')
          .from(arrow, { scaleX: 0, transformOrigin: 'left center', duration: 0.6, ease: 'power3.out' }, '-=0.3')
          .from(after, { y: 40, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
          .to(before, { opacity: 0.28, duration: 0.4, ease: 'power1.out' }, '+=0.1')
          .from(strike, { scaleX: 0, transformOrigin: 'left center', duration: 0.5, ease: 'power2.inOut' }, '<')
      })

      // intro
      gsap.from('[data-intro]', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      })

      // header markers
      gsap.from('[data-col-label]', {
        y: 16,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-col-labels]', start: 'top 80%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="gap" ref={root} className="relative py-32 md:py-40 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        {/* intro */}
        <div
          data-intro
          className="flex flex-wrap items-end justify-between gap-6 mb-20 md:mb-28"
        >
          <div>
            <div className="section-index mb-6">
              <span className="led" />
              <span>02 / The Gap</span>
            </div>
            <h2
              className="f-display"
              style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', maxWidth: 920 }}
            >
              Most companies aren’t
              <span className="f-serif" style={{ color: 'var(--accent)' }}> behind on AI</span>.
              They’re stuck on the last mile of integration.
            </h2>
          </div>
          <p
            className="max-w-[360px] text-[15px]"
            style={{ color: 'var(--text-dim)' }}
          >
            The models are free. The demos are dazzling. The hard part is landing
            them inside the shape of your business — the SSO boundaries, the
            schemas, the approvals, the people.
          </p>
        </div>

        {/* column labels */}
        <div
          data-col-labels
          className="grid grid-cols-12 gap-6 md:gap-10 mb-8 md:mb-12"
        >
          <div className="hidden md:block col-span-1" />
          <div className="col-span-12 md:col-span-5" data-col-label>
            <div className="flex items-center gap-3">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: 'var(--text-dim)' }}
              />
              <span className="kicker">A · where you are</span>
            </div>
          </div>
          <div className="hidden md:block col-span-1" data-col-label>
            <span className="kicker" style={{ color: 'var(--muted)' }}>bridge</span>
          </div>
          <div className="col-span-12 md:col-span-5" data-col-label>
            <div className="flex items-center gap-3">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{
                  background: 'var(--accent)',
                  boxShadow: '0 0 10px var(--accent)',
                }}
              />
              <span className="kicker" style={{ color: 'var(--accent)' }}>
                B · where you could be
              </span>
            </div>
          </div>
        </div>

        {/* rows */}
        <div className="flex flex-col">
          {ROWS.map((r, i) => (
            <div
              key={r.before}
              data-row
              className="relative grid grid-cols-12 gap-6 md:gap-10 py-10 md:py-14 items-center group"
            >
              {/* top rule */}
              <span
                data-rule
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'var(--rule)' }}
              />
              {/* last row bottom rule */}
              {i === ROWS.length - 1 && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ background: 'var(--rule)' }}
                />
              )}

              {/* index number */}
              <div className="col-span-2 md:col-span-1">
                <div
                  data-num
                  className="f-mono text-[12px] md:text-[13px]"
                  style={{ color: 'var(--muted)' }}
                >
                  ({String(i + 1).padStart(2, '0')})
                </div>
              </div>

              {/* BEFORE — large, dim, gets struck through */}
              <div className="col-span-10 md:col-span-5 relative">
                <h3
                  data-before
                  className="f-display relative inline-block"
                  style={{
                    fontSize: 'clamp(22px, 2.6vw, 36px)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    color: 'var(--text-dim)',
                    fontWeight: 400,
                  }}
                >
                  {r.before}
                  <span
                    data-strike
                    className="absolute left-0 right-0 pointer-events-none"
                    style={{
                      top: '52%',
                      height: 2,
                      background: 'var(--muted)',
                      opacity: 0.6,
                    }}
                  />
                </h3>
              </div>

              {/* arrow / connector */}
              <div className="hidden md:flex col-span-1 items-center">
                <div className="relative w-full h-[2px]">
                  <span
                    data-arrow-line
                    className="absolute inset-0 block"
                    style={{ background: 'var(--accent)' }}
                  />
                  <svg
                    className="absolute right-[-4px] top-1/2 -translate-y-1/2"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M1 6 H10 M7 3 L10 6 L7 9"
                      stroke="var(--accent)"
                      strokeWidth="1.6"
                    />
                  </svg>
                </div>
              </div>

              {/* mobile arrow */}
              <div
                className="md:hidden col-span-12 f-mono text-[11px] flex items-center gap-2 -my-4"
                style={{ color: 'var(--accent)' }}
              >
                <span
                  className="inline-block h-px flex-1"
                  style={{ background: 'var(--accent)' }}
                />
                becomes
                <span
                  className="inline-block h-px flex-1"
                  style={{ background: 'var(--accent)' }}
                />
              </div>

              {/* AFTER — large, bright, with optional accent word */}
              <div className="col-span-12 md:col-span-5">
                <h3
                  data-after
                  className="f-display"
                  style={{
                    fontSize: 'clamp(26px, 3.2vw, 44px)',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.05,
                    color: 'var(--text)',
                    fontWeight: 500,
                  }}
                >
                  {r.after}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* footer strip */}
        <div
          className="mt-16 flex flex-wrap items-center justify-between gap-4 pt-6 border-t"
          style={{ borderColor: 'var(--rule)' }}
        >
          <span
            className="f-mono text-[11px] uppercase tracking-[0.16em]"
            style={{ color: 'var(--text-dim)' }}
          >
            {ROWS.length} shifts · same team · same stack
          </span>
          <a href="#capabilities" className="link-under f-mono text-[12px] uppercase tracking-[0.16em]">
            See how we do it →
          </a>
        </div>
      </div>
    </section>
  )
}
