import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('[data-hero-kicker]', { y: 20, opacity: 0, duration: 0.7 })
        .from(
          '[data-hero-line] > span',
          {
            yPercent: 110,
            duration: 1.1,
            stagger: 0.08,
            ease: 'expo.out',
          },
          '-=0.3'
        )
        .from(
          '[data-hero-sub]',
          { y: 20, opacity: 0, duration: 0.8 },
          '-=0.6'
        )
        .from(
          '[data-hero-cta]',
          { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 },
          '-=0.5'
        )
        .from(
          '[data-hero-stat]',
          { y: 24, opacity: 0, duration: 0.7, stagger: 0.1 },
          '-=0.6'
        )

      // counter tween
      document.querySelectorAll('[data-count-to]').forEach((el) => {
        const end = parseFloat(el.dataset.countTo)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: end,
          duration: 1.8,
          delay: 1.0,
          ease: 'power2.out',
          onUpdate: () => {
            const fixed = end % 1 === 0 ? 0 : 1
            el.textContent = obj.v.toFixed(fixed)
          },
        })
      })

      // SVG schematic — animated flow paths
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

      // floating nodes
      gsap.from('[data-node]', {
        scale: 0,
        opacity: 0,
        transformOrigin: 'center',
        duration: 0.6,
        stagger: 0.05,
        delay: 0.8,
        ease: 'back.out(2)',
      })

      // data pulses traveling
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

      // grid parallax
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
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      className="relative min-h-[100svh] pt-32 pb-24 px-6 md:px-10 overflow-hidden"
    >
      {/* background layers */}
      <div
        data-grid-bg
        className="absolute inset-0 opacity-[0.35] dot-grid pointer-events-none"
      />
      <div
        className="absolute inset-x-0 top-0 h-[60vh] pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 60% at 70% 0%, color-mix(in oklab, var(--accent) 14%, transparent), transparent 70%)',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto grid grid-cols-12 gap-6 pt-12">
        {/* LEFT: copy */}
        <div className="col-span-12 lg:col-span-7">
          <div data-hero-kicker className="flex items-center gap-3 mb-8">
            <span className="chip">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{
                  background: 'var(--accent)',
                  boxShadow: '0 0 8px var(--accent)',
                }}
              />
              Available — Q2 / 2026 cohort
            </span>
            <span className="kicker hidden sm:inline">FILE · 001 / Introduction</span>
          </div>

          <h1
            className="f-display"
            style={{ fontSize: 'clamp(44px, 7.5vw, 108px)' }}
          >
            <div data-hero-line className="block">
              <span className="split-word"><span>We&nbsp;</span></span>
              <span className="split-word"><span>engineer&nbsp;</span></span>
              <span className="split-word"><span>the&nbsp;</span></span>
            </div>
            <div data-hero-line className="block">
              <span className="split-word"><span className="f-serif" style={{ color: 'var(--accent)' }}>bridge&nbsp;</span></span>
              <span className="split-word"><span>between&nbsp;</span></span>
            </div>
            <div data-hero-line className="block">
              <span className="split-word"><span>your&nbsp;</span></span>
              <span className="split-word"><span>stack&nbsp;</span></span>
              <span className="split-word"><span>&&nbsp;</span></span>
              <span className="split-word"><span>what’s&nbsp;</span></span>
              <span className="split-word"><span>next.</span></span>
            </div>
          </h1>

          <p
            data-hero-sub
            className="mt-8 max-w-[560px] text-[17px] leading-[1.55]"
            style={{ color: 'var(--text-dim)' }}
          >
            Solutions is an integration studio for companies that can’t afford to rewrite.
            We thread AI into the workflows, dashboards, and pipelines you already depend on —
            so the value shows up where your team already works.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#contact" data-hero-cta className="btn-primary">
              Schedule a 30-min audit
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 5 H9 M5.5 1.5 L9 5 L5.5 8.5" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </a>
            <a href="#capabilities" data-hero-cta className="btn-ghost">
              See the work
            </a>
          </div>

          {/* Stats strip */}
          <div
            className="mt-16 grid grid-cols-3 gap-0 border rounded-lg overflow-hidden"
            style={{ borderColor: 'var(--border)' }}
          >
            {[
              { k: 'integrations shipped', v: 142, suffix: '+' },
              { k: 'median payback', v: 4.2, suffix: ' mo' },
              { k: 'pipelines migrated', v: 38, suffix: '' },
            ].map((s, i) => (
              <div
                key={s.k}
                data-hero-stat
                className="px-5 py-6"
                style={{
                  borderRight:
                    i < 2 ? '1px solid var(--border)' : 'none',
                  background:
                    'color-mix(in oklab, var(--surface) 60%, transparent)',
                }}
              >
                <div className="f-display text-[36px] md:text-[44px]" style={{ letterSpacing: '-0.03em' }}>
                  <span data-count-to={s.v}>0</span>
                  <span style={{ color: 'var(--accent)' }}>{s.suffix}</span>
                </div>
                <div className="kicker mt-1">{s.k}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: schematic visualization */}
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

            {/* header bar */}
            <div
              className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}
                />
                <span className="kicker">signal / data-flow.v2</span>
              </div>
              <span className="kicker">live</span>
            </div>

            {/* SVG schematic */}
            <svg
              viewBox="0 0 400 520"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid slice"
              style={{ paddingTop: 40 }}
            >
              {/* labels */}
              <g fontFamily="JetBrains Mono, monospace" fontSize="9" fill="var(--text-dim)">
                <text x="24" y="72">SRC / LEGACY</text>
                <text x="292" y="72">DEST / INTELLIGENT</text>
                <text x="24" y="496">postgres · snowflake · sheets</text>
                <text x="244" y="496">agents · dashboards · actions</text>
              </g>

              {/* column dividers */}
              <line x1="88" y1="60" x2="88" y2="500" stroke="var(--rule)" strokeDasharray="2 4" />
              <line x1="312" y1="60" x2="312" y2="500" stroke="var(--rule)" strokeDasharray="2 4" />

              {/* source nodes */}
              {[120, 200, 280, 360].map((y, i) => (
                <g key={`s-${i}`} data-node>
                  <rect
                    x="32"
                    y={y - 14}
                    width="56"
                    height="28"
                    rx="4"
                    fill="var(--surface-2)"
                    stroke="var(--border-strong)"
                  />
                  <circle cx="60" cy={y} r="3" fill="var(--text-dim)" />
                </g>
              ))}

              {/* dest nodes */}
              {[160, 240, 320].map((y, i) => (
                <g key={`d-${i}`} data-node>
                  <rect
                    x="312"
                    y={y - 16}
                    width="64"
                    height="32"
                    rx="4"
                    fill="color-mix(in oklab, var(--accent) 14%, var(--surface-2))"
                    stroke="var(--accent)"
                  />
                  <circle cx="344" cy={y} r="3" fill="var(--accent)" />
                </g>
              ))}

              {/* middle — bridge module */}
              <g data-node>
                <rect
                  x="150"
                  y="200"
                  width="100"
                  height="80"
                  rx="6"
                  fill="var(--surface)"
                  stroke="var(--border-strong)"
                />
                <text
                  x="200"
                  y="236"
                  textAnchor="middle"
                  fontFamily="Syne, serif"
                  fontSize="14"
                  fill="var(--text)"
                  fontWeight="600"
                >
                  bridge
                </text>
                <text
                  x="200"
                  y="252"
                  textAnchor="middle"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="8"
                  fill="var(--text-dim)"
                >
                  v2.infer
                </text>
                {/* inner dots */}
                {[0, 1, 2].map((i) => (
                  <circle
                    key={i}
                    cx={172 + i * 14}
                    cy="266"
                    r="1.5"
                    fill="var(--accent)"
                  />
                ))}
              </g>

              {/* flow paths: from source → bridge → dest */}
              <g
                fill="none"
                stroke="var(--text-dim)"
                strokeWidth="1.1"
                opacity="0.55"
              >
                <path
                  id="flow-1"
                  data-flow-path
                  d="M88 120 C 120 120, 140 220, 150 230"
                />
                <path
                  id="flow-2"
                  data-flow-path
                  d="M88 200 C 130 200, 140 230, 150 240"
                />
                <path
                  id="flow-3"
                  data-flow-path
                  d="M88 280 C 130 280, 140 250, 150 250"
                />
                <path
                  id="flow-4"
                  data-flow-path
                  d="M88 360 C 130 360, 140 260, 150 260"
                />
              </g>
              <g fill="none" stroke="var(--accent)" strokeWidth="1.2">
                <path data-flow-path d="M250 230 C 280 230, 290 160, 312 160" />
                <path data-flow-path d="M250 240 C 280 240, 290 240, 312 240" />
                <path data-flow-path d="M250 260 C 280 260, 290 320, 312 320" />
              </g>

              {/* pulses */}
              {[0, 1, 2, 3].map((i) => (
                <circle
                  key={i}
                  data-pulse
                  r="2.5"
                  fill="var(--accent)"
                  style={{
                    filter: 'drop-shadow(0 0 4px var(--accent))',
                  }}
                />
              ))}
            </svg>

            {/* footer strip */}
            <div
              className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-2 border-t f-mono text-[10px]"
              style={{ borderColor: 'var(--border)', color: 'var(--text-dim)' }}
            >
              <span>throughput · 1.24k ops/s</span>
              <span>latency · 38ms p95</span>
              <span className="scroll-hint" style={{ color: 'var(--accent)' }}>
                ▼ scroll
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* marquee of tech ticker */}
      <div
        className="relative mt-24 overflow-hidden border-y"
        style={{ borderColor: 'var(--rule)' }}
      >
        <div
          className="flex whitespace-nowrap marquee-track py-4 f-mono text-[12px]"
          style={{ color: 'var(--text-dim)' }}
        >
          {Array.from({ length: 2 }).flatMap((_, k) =>
            [
              'Snowflake', 'dbt', 'Airflow', 'BigQuery', 'Postgres', 'Redshift',
              'Databricks', 'Kafka', 'Segment', 'Looker', 'Tableau', 'Salesforce',
              'Hubspot', 'Notion', 'Zapier', 'n8n', 'LangChain', 'OpenAI', 'Anthropic',
              'Pinecone', 'Vercel',
            ].map((t, i) => (
              <span key={`${k}-${i}`} className="flex items-center gap-8 mr-8">
                <span>{t}</span>
                <span style={{ color: 'var(--border-strong)' }}>◆</span>
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
