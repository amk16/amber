import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SITE } from '../config'

export default function Hero() {
  const root = useRef(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('[data-hero-kicker]', { y: 20, opacity: 0, duration: 0.7 })
        .fromTo(
          '[data-hero-line] .split-word > span',
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, stagger: 0.08, ease: 'expo.out' },
          '-=0.3'
        )
        .from('[data-hero-sub]', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('[data-hero-cta]', { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.5')
        .from('[data-hero-fact]', { y: 24, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.6')

      // schematic flow paths
      const paths = gsap.utils.toArray('[data-flow-path]')
      paths.forEach((p, i) => {
        const len = p.getTotalLength()
        p.style.strokeDasharray = len
        p.style.strokeDashoffset = len
        gsap.to(p, {
          strokeDashoffset: 0,
          duration: 1.6,
          delay: 0.4 + i * 0.12,
          ease: 'power2.inOut',
        })
      })

      gsap.from('[data-node]', {
        scale: 0,
        opacity: 0,
        transformOrigin: 'center',
        duration: 0.6,
        stagger: 0.05,
        delay: 0.8,
        ease: 'back.out(2)',
      })

      gsap.utils.toArray('[data-pulse]').forEach((el, i) => {
        gsap.fromTo(
          el,
          { motionPath: { path: `#flow-${(i % 4) + 1}`, start: 0, end: 0 } },
          {
            motionPath: { path: `#flow-${(i % 4) + 1}`, start: 0, end: 1 },
            duration: 3.2 + i * 0.3,
            repeat: -1,
            ease: 'none',
            delay: 1.2 + i * 0.4,
          }
        )
      })

      gsap.to('[data-grid-bg]', {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      className="relative min-h-[100svh] pt-32 pb-24 px-6 md:px-10 overflow-hidden"
    >
      <div data-grid-bg className="absolute inset-0 opacity-[0.35] dot-grid pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto grid grid-cols-12 gap-6 pt-12">
        {/* LEFT: copy */}
        <div className="col-span-12 lg:col-span-7">
          <div data-hero-kicker className="mb-8">
            <span className="chip">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: 'var(--accent)' }}
              />
              Taking new clients · July 2026
            </span>
          </div>

          <h1 className="f-display" style={{ fontSize: 'clamp(40px, 5.6vw, 80px)' }}>
            <div data-hero-line className="block">
              <span className="split-word"><span>AI&nbsp;</span></span>
              <span className="split-word"><span>systems&nbsp;</span></span>
              <span className="split-word"><span>that&nbsp;</span></span>
              <span className="split-word"><span>do&nbsp;</span></span>
            </div>
            <div data-hero-line className="block">
              <span className="split-word"><span>the&nbsp;</span></span>
              <span className="split-word"><span>work&nbsp;</span></span>
              <span className="split-word"><span>your&nbsp;</span></span>
              <span className="split-word"><span>team&nbsp;</span></span>
            </div>
            <div data-hero-line className="block">
              <span className="split-word">
                <span style={{ color: 'var(--accent)' }}>retypes.</span>
              </span>
            </div>
          </h1>

          <p
            data-hero-sub
            className="mt-8 max-w-[540px] text-[17px] leading-[1.55]"
            style={{ color: 'var(--text-dim)' }}
          >
            Intake, drafting, and reporting handled inside the tools your firm
            already uses. Fixed price. Live in weeks.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href={SITE.calendar} data-hero-cta className="btn-primary">
              Book 20 minutes
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 5 H9 M5.5 1.5 L9 5 L5.5 8.5" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </a>
            <a href="#work" data-hero-cta className="btn-ghost">
              See the work
            </a>
          </div>

          {/* Engagement terms */}
          <div
            className="mt-16 grid grid-cols-3 gap-0 border rounded-lg overflow-hidden"
            style={{ borderColor: 'var(--border)' }}
          >
            {[
              { v: '48h', k: 'written assessment after the first call' },
              { v: 'Fixed', k: 'price agreed before work starts' },
              { v: '2–4 wks', k: 'from kickoff to live' },
            ].map((s, i) => (
              <div
                key={s.k}
                data-hero-fact
                className="px-5 py-6"
                style={{
                  borderRight: i < 2 ? '1px solid var(--border)' : 'none',
                  background: 'color-mix(in oklab, var(--surface) 60%, transparent)',
                }}
              >
                <div
                  className="f-display text-[26px] md:text-[34px]"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {s.v}
                </div>
                <div
                  className="mt-2 text-[12.5px] leading-snug"
                  style={{ color: 'var(--text-dim)' }}
                >
                  {s.k}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: workflow schematic */}
        <div className="col-span-12 lg:col-span-5 relative min-h-[520px]">
          <div
            className="absolute inset-0 rounded-xl overflow-hidden"
            style={{
              border: '1px solid var(--border)',
              background:
                'linear-gradient(180deg, color-mix(in oklab, var(--surface) 60%, transparent), color-mix(in oklab, var(--surface-2) 40%, transparent))',
            }}
          >
            <div className="absolute inset-0 schematic-grid opacity-40" />

            <svg
              viewBox="0 0 400 520"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <g fontFamily="JetBrains Mono, monospace" fontSize="9" fill="var(--text-dim)">
                <text x="24" y="72">WHAT ARRIVES</text>
                <text x="316" y="72">WHAT LEAVES</text>
                <text x="24" y="496">email · forms · records · documents</text>
                <text x="262" y="496">drafted · filed · reported</text>
              </g>

              <line x1="88" y1="60" x2="88" y2="500" stroke="var(--rule)" strokeDasharray="2 4" />
              <line x1="312" y1="60" x2="312" y2="500" stroke="var(--rule)" strokeDasharray="2 4" />

              {[120, 200, 280, 360].map((y, i) => (
                <g key={`s-${i}`} data-node>
                  <rect
                    x="32" y={y - 14} width="56" height="28" rx="4"
                    fill="var(--surface-2)" stroke="var(--border-strong)"
                  />
                  <circle cx="60" cy={y} r="3" fill="var(--text-dim)" />
                </g>
              ))}

              {[160, 240, 320].map((y, i) => (
                <g key={`d-${i}`} data-node>
                  <rect
                    x="312" y={y - 16} width="64" height="32" rx="4"
                    fill="color-mix(in oklab, var(--accent) 14%, var(--surface-2))"
                    stroke="var(--accent)"
                  />
                  <circle cx="344" cy={y} r="3" fill="var(--accent)" />
                </g>
              ))}

              <g data-node>
                <rect
                  x="140" y="200" width="120" height="80" rx="6"
                  fill="var(--surface)" stroke="var(--border-strong)"
                />
                <text
                  x="200" y="236" textAnchor="middle"
                  fontFamily="Geist, sans-serif" fontSize="13" fill="var(--text)" fontWeight="600"
                >
                  the system
                </text>
                <text
                  x="200" y="252" textAnchor="middle"
                  fontFamily="JetBrains Mono, monospace" fontSize="8" fill="var(--text-dim)"
                >
                  reads · drafts · files
                </text>
                {[0, 1, 2].map((i) => (
                  <circle key={i} cx={172 + i * 14} cy="266" r="1.5" fill="var(--accent)" />
                ))}
              </g>

              <g fill="none" stroke="var(--text-dim)" strokeWidth="1.1" opacity="0.55">
                <path id="flow-1" data-flow-path d="M88 120 C 118 120, 130 220, 140 230" />
                <path id="flow-2" data-flow-path d="M88 200 C 122 200, 130 230, 140 240" />
                <path id="flow-3" data-flow-path d="M88 280 C 122 280, 130 250, 140 250" />
                <path id="flow-4" data-flow-path d="M88 360 C 122 360, 130 260, 140 260" />
              </g>
              <g fill="none" stroke="var(--accent)" strokeWidth="1.2">
                <path data-flow-path d="M260 230 C 285 230, 292 160, 312 160" />
                <path data-flow-path d="M260 240 C 285 240, 292 240, 312 240" />
                <path data-flow-path d="M260 260 C 285 260, 292 320, 312 320" />
              </g>

              {[0, 1, 2, 3].map((i) => (
                <circle key={i} data-pulse r="2.5" fill="var(--accent)" />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
