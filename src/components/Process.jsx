import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STEPS = [
  {
    code: '01',
    title: 'Discovery',
    sub: 'Week 0–2',
    body:
      'We map every system, owner, and bottleneck. You leave with a redacted diagram of where AI actually earns its keep.',
    deliverables: ['System audit', 'Integration map', 'Prioritised playbook'],
  },
  {
    code: '02',
    title: 'Architecture',
    sub: 'Week 2–4',
    body:
      'We pick the smallest set of primitives that survives your next three quarters, and design the guardrails before the glue.',
    deliverables: ['Reference architecture', 'Eval scaffold', 'SLOs & budgets'],
  },
  {
    code: '03',
    title: 'Integration',
    sub: 'Week 4–10',
    body:
      'We land the first workload in production — wired into auth, billing, and existing dashboards. No parallel universe.',
    deliverables: ['Shipped workload', 'Monitoring', 'Team handoff docs'],
  },
  {
    code: '04',
    title: 'Evolution',
    sub: 'Ongoing',
    body:
      'Retainer partnership: we extend, harden, and swap models as the landscape moves. Your stack compounds.',
    deliverables: ['Quarterly roadmap', 'Model refresh cycle', 'On-call bench'],
  },
]

export default function Process() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // draw vertical line on scroll
      const line = root.current.querySelector('[data-timeline]')
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top center',
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top 60%',
              end: 'bottom 70%',
              scrub: 0.4,
            },
          }
        )
      }

      // reveal each step
      gsap.utils.toArray('[data-step]').forEach((step) => {
        gsap.from(step, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
          },
        })
      })

      // marker pops
      gsap.utils.toArray('[data-marker]').forEach((m) => {
        gsap.from(m, {
          scale: 0,
          duration: 0.5,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: m,
            start: 'top 75%',
          },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="process"
      ref={root}
      className="relative py-32 px-6 md:px-10"
      style={{ borderTop: '1px solid var(--rule)' }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div
          data-reveal
          className="flex flex-wrap items-end justify-between gap-6 mb-20"
        >
          <div>
            <div className="section-index mb-6">
              <span className="led" />
              <span>04 / Process</span>
            </div>
            <h2
              className="f-display"
              style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', maxWidth: 860 }}
            >
              How the
              <span className="f-serif" style={{ color: 'var(--accent)' }}> bridge </span>
              gets built.
            </h2>
          </div>
          <p
            className="max-w-[360px] text-[15px]"
            style={{ color: 'var(--text-dim)' }}
          >
            A predictable, auditable path from the first diagram to the first
            production workload — typically ten weeks from handshake to live.
          </p>
        </div>

        <div className="relative pl-8 md:pl-24">
          {/* spine */}
          <div
            className="absolute left-2 md:left-10 top-0 bottom-0 w-px"
            style={{ background: 'var(--border)' }}
          />
          <div
            data-timeline
            className="absolute left-2 md:left-10 top-0 bottom-0 w-px"
            style={{ background: 'var(--accent)', transform: 'scaleY(0)' }}
          />

          <div className="flex flex-col gap-16">
            {STEPS.map((s, i) => (
              <div
                key={s.code}
                data-step
                className="relative grid grid-cols-12 gap-6 items-start"
              >
                {/* marker */}
                <div
                  data-marker
                  className="absolute -left-[30px] md:-left-[70px] top-1 flex items-center justify-center"
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 999,
                    background: 'var(--bg)',
                    border: '1px solid var(--accent)',
                    boxShadow:
                      '0 0 0 6px color-mix(in oklab, var(--bg) 80%, transparent)',
                  }}
                >
                  <span
                    className="f-mono text-[12px]"
                    style={{ color: 'var(--accent)' }}
                  >
                    {s.code}
                  </span>
                </div>

                <div className="col-span-12 md:col-span-4">
                  <div className="kicker mb-3">{s.sub}</div>
                  <h3
                    className="f-display"
                    style={{ fontSize: 'clamp(28px, 3.4vw, 44px)' }}
                  >
                    {s.title}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <p
                    className="text-[15px] leading-[1.65]"
                    style={{ color: 'var(--text-dim)' }}
                  >
                    {s.body}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-3">
                  <div className="kicker mb-3">Deliverables</div>
                  <ul className="flex flex-col gap-2">
                    {s.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-center gap-2 text-[13px]"
                        style={{ color: 'var(--text)' }}
                      >
                        <span
                          className="inline-block"
                          style={{
                            width: 6,
                            height: 6,
                            background: 'var(--accent)',
                            transform: 'rotate(45deg)',
                          }}
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
