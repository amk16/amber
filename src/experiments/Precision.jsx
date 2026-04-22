import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------
 *  PRECISION
 *  Engineering-credible dark product UI. Built to convert technical
 *  buyers evaluating an AI integration partner.
 *
 *  Typography: Inter Tight (display+body) + JetBrains Mono (metadata)
 *  Palette: charcoal + electric cyan, high-contrast, tight grid.
 * ----------------------------------------------------------------- */

const FONT_LINK =
  'https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=JetBrains+Mono:wght@300;400;500;600&display=swap'

function useFonts() {
  useEffect(() => {
    if (document.getElementById('prec-fonts')) return
    const link = document.createElement('link')
    link.id = 'prec-fonts'
    link.rel = 'stylesheet'
    link.href = FONT_LINK
    document.head.appendChild(link)
  }, [])
}

/* ──────────────────────────────────────────────────────────
 * Hero schematic — a tight integration diagram
 * ────────────────────────────────────────────────────────── */
function HeroDiagram() {
  return (
    <svg viewBox="0 0 520 380" className="prec-herodiag" aria-hidden>
      <defs>
        <linearGradient id="prec-edge" x1="0" x2="1">
          <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.1" />
          <stop offset="55%" stopColor="#7dd3fc" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* frame */}
      <rect x="0.5" y="0.5" width="519" height="379" fill="none" stroke="rgba(255,255,255,0.05)" />
      <rect x="8" y="8" width="504" height="364" fill="none" stroke="rgba(255,255,255,0.03)" strokeDasharray="2 5" />

      {/* column headers */}
      <g fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#5d6470" letterSpacing="2">
        <text x="80" y="28">SOURCES</text>
        <text x="240" y="28" textAnchor="middle">BRIDGE</text>
        <text x="440" y="28">SURFACES</text>
      </g>

      {/* source nodes */}
      {[
        { y: 64, label: 'postgres', tag: 'pg-15' },
        { y: 112, label: 'snowflake', tag: 'sf-dw' },
        { y: 160, label: 'salesforce', tag: 'sfdc' },
        { y: 208, label: 'segment', tag: 'seg' },
        { y: 256, label: 'notion', tag: 'ntn' },
        { y: 304, label: 'zendesk', tag: 'zd' },
      ].map((s) => (
        <g key={s.label} data-prec-node>
          <rect x="24" y={s.y - 13} width="112" height="26" rx="3" fill="#141720" stroke="rgba(255,255,255,0.1)" />
          <circle cx="36" cy={s.y} r="2.5" fill="#7dd3fc" />
          <text x="48" y={s.y + 4} fontFamily="Inter Tight, sans-serif" fontSize="11" fill="#e8eaed">{s.label}</text>
          <text x="128" y={s.y + 4} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#5d6470">{s.tag}</text>
        </g>
      ))}

      {/* bridge core */}
      <g>
        <rect x="190" y="86" width="140" height="208" rx="6" fill="#0e141d" stroke="#7dd3fc" strokeOpacity="0.6" />
        <rect x="190" y="86" width="140" height="30" fill="#7dd3fc" fillOpacity="0.08" stroke="#7dd3fc" strokeOpacity="0.35" />
        <text x="260" y="105" textAnchor="middle" fontFamily="Inter Tight, sans-serif" fontSize="13" fontWeight="600" fill="#7dd3fc">bridge · v2.18.3</text>

        {['ingest', 'retrieve', 'infer', 'guardrail', 'emit', 'log'].map((s, i) => (
          <g key={s} data-prec-stage>
            <rect x="204" y={126 + i * 26} width="112" height="20" rx="2" fill="#141a25" stroke="rgba(125,211,252,0.16)" />
            <text x="214" y={140 + i * 26} fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#c2cbd7">{s}</text>
            <circle cx="306" cy={136 + i * 26} r="2" fill={i < 4 ? '#4ade80' : 'rgba(125,211,252,0.45)'} />
          </g>
        ))}
      </g>

      {/* surface nodes */}
      {[
        { y: 64, label: 'agents', tag: 'ops' },
        { y: 112, label: 'dashboards', tag: 'bi' },
        { y: 160, label: 'actions', tag: 'rpa' },
        { y: 208, label: 'evals', tag: 'qa' },
        { y: 256, label: 'alerts', tag: 'on-call' },
        { y: 304, label: 'audit', tag: 'gov' },
      ].map((s) => (
        <g key={s.label} data-prec-node>
          <rect x="384" y={s.y - 13} width="112" height="26" rx="3" fill="#141720" stroke="rgba(125,211,252,0.28)" />
          <circle cx="396" cy={s.y} r="2.5" fill="#7dd3fc" />
          <text x="408" y={s.y + 4} fontFamily="Inter Tight, sans-serif" fontSize="11" fill="#e8eaed">{s.label}</text>
          <text x="488" y={s.y + 4} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#5d6470">{s.tag}</text>
        </g>
      ))}

      {/* connecting edges */}
      <g fill="none" stroke="url(#prec-edge)" strokeWidth="1.2">
        {[64, 112, 160, 208, 256, 304].map((y, i) => (
          <path key={`l-${i}`} d={`M136,${y} C160,${y} 180,190 190,190`} data-prec-flow />
        ))}
        {[64, 112, 160, 208, 256, 304].map((y, i) => (
          <path key={`r-${i}`} d={`M330,190 C350,190 360,${y} 384,${y}`} data-prec-flow />
        ))}
      </g>

      {/* pulses */}
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={`p-${i}`}
          r="2"
          fill="#7dd3fc"
          data-prec-pulse
          style={{ filter: 'drop-shadow(0 0 4px #7dd3fc)' }}
        />
      ))}

      {/* footer line */}
      <g>
        <line x1="24" y1="344" x2="496" y2="344" stroke="rgba(255,255,255,0.08)" />
        <text x="24" y="362" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#5d6470">
          p95 142ms · hit 74.2% · uptime 98.94%
        </text>
        <text x="496" y="362" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#4ade80">
          ● all systems nominal
        </text>
      </g>
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────
 * Sparkline for matrix
 * ────────────────────────────────────────────────────────── */
function MicroSpark({ values, color = '#7dd3fc' }) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const step = 80 / (values.length - 1)
  const d = values
    .map((v, i) => {
      const x = i * step
      const y = 24 - ((v - min) / range) * 20 - 2
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
  return (
    <svg viewBox="0 0 80 24" width="80" height="24">
      <path d={d} fill="none" stroke={color} strokeWidth="1.2" />
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────
 * Logo strip (text-only marks — credible, not fake)
 * ────────────────────────────────────────────────────────── */
function LogoStrip() {
  const LOGOS = [
    { n: 'northbound', w: 'italic', s: 700 },
    { n: 'FORTH', w: 'normal', s: 800, ls: '0.14em' },
    { n: 'lumen/ai', w: 'normal', s: 500 },
    { n: 'ledgerline', w: 300, s: 300 },
    { n: 'QUADRANT', w: 'normal', s: 700, ls: '0.2em' },
    { n: 'sierra labs', w: 500, s: 500 },
  ]
  return (
    <div className="prec-logos">
      {LOGOS.map((l) => (
        <span
          key={l.n}
          style={{
            fontStyle: l.w === 'italic' ? 'italic' : 'normal',
            fontWeight: typeof l.w === 'number' ? l.w : 400,
            letterSpacing: l.ls || '-0.01em',
          }}
        >
          {l.n}
        </span>
      ))}
    </div>
  )
}

/* ──────────────────────────────────────────────────────────
 * MAIN
 * ────────────────────────────────────────────────────────── */
export default function Precision() {
  useFonts()
  const root = useRef(null)
  const [sent, setSent] = useState(false)
  const [activeRow, setActiveRow] = useState(0)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* hero reveals */
      gsap.from('[data-prec-h-kicker]', { y: 12, opacity: 0, duration: 0.6, ease: 'power3.out' })
      gsap.from('[data-prec-h-line]', { y: 22, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'expo.out', delay: 0.1 })
      gsap.from('[data-prec-h-lede]', { y: 12, opacity: 0, duration: 0.6, delay: 0.5, ease: 'power3.out' })
      gsap.from('[data-prec-h-cta]', { y: 10, opacity: 0, duration: 0.5, delay: 0.7, stagger: 0.08, ease: 'power3.out' })
      gsap.from('[data-prec-h-diag]', { opacity: 0, duration: 1.2, delay: 0.2, ease: 'power2.out' })

      /* flow line draw */
      gsap.utils.toArray('[data-prec-flow]').forEach((p) => {
        const len = p.getTotalLength()
        p.style.strokeDasharray = `${len * 0.22} ${len * 0.78}`
        gsap.to(p, { strokeDashoffset: -len, duration: 4.2, repeat: -1, ease: 'none' })
      })
      /* data pulses */
      gsap.utils.toArray('[data-prec-pulse]').forEach((el, i) => {
        const path =
          i < 2
            ? `M136,${64 + i * 96} C160,${64 + i * 96} 180,190 190,190`
            : `M330,190 C350,190 360,${64 + (i - 2) * 96} 384,${64 + (i - 2) * 96}`
        gsap.to(el, {
          motionPath: { path, start: 0, end: 1, autoRotate: false },
          duration: 3.4 + i * 0.3,
          repeat: -1,
          ease: 'none',
          delay: i * 0.5,
        })
      })

      gsap.utils.toArray('[data-prec-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 26,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  /* ── Feature matrix data ─────────────────────────────── */
  const MATRIX_ROWS = [
    {
      k: 'time-to-production',
      us: '62 days (median)',
      usDetail: 'first workload in prod, auth-wired',
      them: '7–18 months',
      themDetail: 'pilot → rewrite → never ships',
      spark: [38, 40, 42, 48, 58, 54, 62, 60, 66, 62],
    },
    {
      k: 'p95 latency · /infer',
      us: '142 ms',
      usDetail: 'measured from firm edge',
      them: '600–1200 ms',
      themDetail: 'unoptimised, no caching',
      spark: [180, 170, 155, 150, 148, 140, 144, 138, 142, 142],
    },
    {
      k: 'cache hit · prompts',
      us: '74.2%',
      usDetail: '92k tokens saved / hour',
      them: '0–20%',
      themDetail: 'no semantic cache layer',
      spark: [62, 65, 69, 71, 68, 72, 73, 74, 74, 74],
    },
    {
      k: 'eval coverage',
      us: '100% workloads',
      usDetail: 'weekly regression runs',
      them: 'ad-hoc / zero',
      themDetail: 'drift detected post-incident',
      spark: [92, 94, 96, 97, 98, 99, 100, 100, 100, 100],
    },
    {
      k: 'model rotation',
      us: '2 /yr, no rewrite',
      usDetail: 'interface stable, stage swap',
      them: 'full rewrite',
      themDetail: 'coupled to weights',
      spark: [12, 14, 16, 18, 20, 20, 22, 22, 22, 22],
    },
    {
      k: 'fleet uptime',
      us: '98.94%',
      usDetail: '30d rolling, 14 tenants',
      them: '90–96%',
      themDetail: 'single-tenant, best-case',
      spark: [97.2, 97.8, 98.1, 98.4, 98.6, 98.7, 98.9, 98.92, 98.94, 98.94],
    },
    {
      k: 'security posture',
      us: 'SOC 2 · NDA-first',
      usDetail: 'redaction stage, audit API',
      them: 'post-hoc',
      themDetail: 'added after procurement flags',
      spark: [80, 85, 88, 90, 92, 94, 96, 98, 100, 100],
    },
  ]

  return (
    <div ref={root} className="prec-root">
      <style>{PREC_CSS}</style>

      {/* ───────── STICKY NAV ───────── */}
      <nav className="prec-nav">
        <div className="prec-nav-inner">
          <a href="#" className="prec-nav-brand">
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden>
              <rect x="0.5" y="0.5" width="27" height="27" rx="4" stroke="currentColor" strokeOpacity="0.5" />
              <path d="M7 14 L13 14 L13 8 L21 8" stroke="currentColor" strokeWidth="1.3" fill="none" />
              <path d="M7 20 L15 20 L15 14 L21 14 L21 20" stroke="#7dd3fc" strokeWidth="1.3" fill="none" />
              <circle cx="21" cy="14" r="1.6" fill="#7dd3fc" />
            </svg>
            <span className="prec-nav-brand-t">solutions</span>
            <span className="prec-nav-brand-sub">/ precision</span>
          </a>
          <div className="prec-nav-links">
            <a href="#bridge">The bridge</a>
            <a href="#matrix">Compare</a>
            <a href="#process">Process</a>
            <a href="#rollout">Rollout</a>
          </div>
          <div className="prec-nav-right">
            <a href="#" className="prec-nav-return">return to main</a>
            <a href="#audit" className="prec-btn prec-btn--primary prec-nav-cta">
              Book 30-min audit
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                <path d="M2 5.5 H9 M6 2.5 L9 5.5 L6 8.5" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* ───────── HERO ───────── */}
      <section className="prec-hero">
        <div className="prec-hero-grid">
          <div className="prec-hero-copy">
            <div className="prec-kicker" data-prec-h-kicker>
              <span className="prec-kicker-dot" />
              <span>Q2 2026 · engagements open</span>
              <span className="prec-kicker-sep">·</span>
              <span>SOC 2 · NDA-first</span>
            </div>

            <h1 className="prec-h1">
              <span data-prec-h-line>Ship AI into the stack</span>
              <span data-prec-h-line>you already run —</span>
              <span data-prec-h-line className="prec-h1-accent">in 62 days.</span>
            </h1>

            <p className="prec-lede" data-prec-h-lede>
              Solutions is a small engineering firm that threads LLMs into
              production software — your auth, your schema, your dashboards.
              No rewrite. No parallel system. Measured in p95, not hype.
            </p>

            <div className="prec-hero-cta">
              <a href="#audit" data-prec-h-cta className="prec-btn prec-btn--primary prec-btn--lg">
                Book 30-min audit
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M2 6 H10 M7 3 L10 6 L7 9" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </a>
              <a href="#matrix" data-prec-h-cta className="prec-btn prec-btn--ghost prec-btn--lg">
                See the benchmarks
              </a>
              <span className="prec-hero-meta" data-prec-h-cta>
                1 business-day reply · no decks
              </span>
            </div>
          </div>

          <div className="prec-hero-visual" data-prec-h-diag>
            <div className="prec-hero-visual-frame">
              <div className="prec-hero-visual-bar">
                <span>● signal / bridge.v2</span>
                <span>live · 14 tenants</span>
              </div>
              <HeroDiagram />
            </div>
          </div>
        </div>

        {/* proof strip */}
        <div className="prec-proof">
          <div className="prec-proof-stats">
            {[
              { v: '142', s: '+', l: 'integrations shipped' },
              { v: '4.2', s: 'mo', l: 'median payback' },
              { v: '98.94', s: '%', l: 'fleet uptime' },
              { v: '1.2M', s: '', l: 'requests / 24h' },
            ].map((p) => (
              <div key={p.l} className="prec-proof-stat">
                <div className="prec-proof-v">
                  {p.v}<span>{p.s}</span>
                </div>
                <div className="prec-proof-l">{p.l}</div>
              </div>
            ))}
          </div>
          <LogoStrip />
        </div>
      </section>

      {/* ───────── BRIDGE EXPLAINER ───────── */}
      <section id="bridge" className="prec-sec" data-prec-reveal>
        <header className="prec-sec-head">
          <span className="prec-eyebrow">01 / the bridge</span>
          <h2 className="prec-h2">
            A narrow layer between your sources and<br />
            the surfaces your team already uses.
          </h2>
          <p className="prec-sec-lede">
            We do not replace your stack. We build the smallest intermediary
            that ingests from your systems of record, retrieves what's
            relevant, runs inference, applies guardrails, and emits into
            tools your people already have open.
          </p>
        </header>

        <div className="prec-bridge-grid">
          {[
            { n: '01', t: 'Ingest', body: 'Auth-scoped connectors for Postgres, Snowflake, Salesforce, Segment, Notion — whatever you run.', tech: 'dbt · Airbyte · Segment' },
            { n: '02', t: 'Retrieve', body: 'Per-workload corpora through an explicit allow-list. Re-embedded on schema changes, not on deploy.', tech: 'pgvector · Pinecone' },
            { n: '03', t: 'Infer', body: 'Model-agnostic. Claude, GPT, local — swapped behind a stable interface so rotation is a config change.', tech: 'Claude · GPT · Llama' },
            { n: '04', t: 'Guardrail', body: 'Redaction, policy filters, confidence handoff to humans. A first-class stage, not a decoration.', tech: 'policy.yaml · audit API' },
            { n: '05', t: 'Emit', body: 'Writes back into the dashboards, tickets, and tools already in use. No second UI to maintain.', tech: 'Looker · Zendesk · Slack' },
            { n: '06', t: 'Log', body: 'Every decision, redaction, and model call is emitted to your observability stack and audit surface.', tech: 'OTel · Datadog · S3' },
          ].map((b) => (
            <article key={b.n} className="prec-bridge-cell">
              <header>
                <span className="prec-bridge-n">{b.n}</span>
                <span className="prec-bridge-tech">{b.tech}</span>
              </header>
              <h3>{b.t}</h3>
              <p>{b.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ───────── FEATURE MATRIX (conversion anchor) ───────── */}
      <section id="matrix" className="prec-sec prec-sec--matrix" data-prec-reveal>
        <header className="prec-sec-head">
          <span className="prec-eyebrow">02 / measured, not claimed</span>
          <h2 className="prec-h2">
            Solutions bridge vs. the typical in-house attempt.
          </h2>
          <p className="prec-sec-lede">
            Seven metrics we track across the fleet. Numbers are medians
            over 14 production tenants, 30-day rolling window. Hover a row
            for the current-week trend.
          </p>
        </header>

        <div className="prec-matrix">
          <div className="prec-matrix-head">
            <div className="prec-matrix-h prec-matrix-h--k">metric</div>
            <div className="prec-matrix-h prec-matrix-h--us">
              <span className="prec-matrix-dot" />
              solutions · bridge
            </div>
            <div className="prec-matrix-h prec-matrix-h--them">
              typical in-house
            </div>
            <div className="prec-matrix-h prec-matrix-h--t">30d trend</div>
          </div>

          {MATRIX_ROWS.map((r, i) => (
            <div
              key={r.k}
              className={`prec-matrix-row ${activeRow === i ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveRow(i)}
              onFocus={() => setActiveRow(i)}
              tabIndex={0}
            >
              <div className="prec-matrix-k">{r.k}</div>
              <div className="prec-matrix-us">
                <strong>{r.us}</strong>
                <span>{r.usDetail}</span>
              </div>
              <div className="prec-matrix-them">
                <strong>{r.them}</strong>
                <span>{r.themDetail}</span>
              </div>
              <div className="prec-matrix-trend">
                <MicroSpark values={r.spark} />
              </div>
            </div>
          ))}

          <footer className="prec-matrix-foot">
            <span>n = 14 tenants · 2021–2026 · redacted dataset available under NDA</span>
            <a href="#audit" className="prec-link-arrow">See your own numbers →</a>
          </footer>
        </div>
      </section>

      {/* ───────── MID-PAGE CTA ───────── */}
      <section className="prec-mid-cta" data-prec-reveal>
        <div className="prec-mid-cta-inner">
          <div>
            <span className="prec-eyebrow prec-eyebrow--accent">before you keep reading</span>
            <h3>Thirty minutes, no deck, your stack on the table.</h3>
            <p>
              We walk through your integration surface, the three bridges
              worth building first, and a fixed-scope plan. You leave with
              notes. If it's not a fit, we say so.
            </p>
          </div>
          <a href="#audit" className="prec-btn prec-btn--primary prec-btn--lg">
            Book 30-min audit
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2 6 H10 M7 3 L10 6 L7 9" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </a>
        </div>
      </section>

      {/* ───────── PROCESS ───────── */}
      <section id="process" className="prec-sec" data-prec-reveal>
        <header className="prec-sec-head">
          <span className="prec-eyebrow">03 / process</span>
          <h2 className="prec-h2">Ten weeks from handshake to live.</h2>
          <p className="prec-sec-lede">
            The engagement is organised as four fittings. Each terminates in
            a signed artifact you retain. Guarantees are fixed-scope; you
            pay for the artifact, not the hours.
          </p>
        </header>

        <ol className="prec-proc">
          {[
            { n: 'T0', t: 'Discovery', wk: 'wk 0–2', out: 'integration map + prioritised 3-bridge shortlist', body: 'We audit every system, owner, and bottleneck in your AI surface area. You retain a redacted diagram.' },
            { n: 'T1', t: 'Architecture', wk: 'wk 2–4', out: 'reference arch + eval scaffold + SLOs', body: 'Smallest primitives that survive three quarters. Guardrails, redaction, and evals drafted before any glue.' },
            { n: 'T2', t: 'Integration', wk: 'wk 4–10', out: 'shipped workload + monitoring + handoff docs', body: 'First workload in prod — wired to auth, billing, and dashboards already in use. No parallel system.' },
            { n: 'T3', t: 'Evolution', wk: 'retainer', out: 'quarterly roadmap + model-refresh cycle + on-call', body: 'Models refreshed on rotation. Drift tracked by eval gate. On-call bench for the first year.' },
          ].map((s, i) => (
            <li key={s.n} className="prec-proc-step">
              <div className="prec-proc-rail">
                <span className="prec-proc-n">{s.n}</span>
                <span className="prec-proc-dot" />
                {i < 3 && <span className="prec-proc-line" />}
              </div>
              <div className="prec-proc-body">
                <div className="prec-proc-head">
                  <h3>{s.t}</h3>
                  <span className="prec-proc-wk">{s.wk}</span>
                </div>
                <p>{s.body}</p>
                <div className="prec-proc-out">
                  <span className="prec-proc-out-label">you retain</span>
                  <span className="prec-proc-out-v">{s.out}</span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ───────── ROLLOUT / OBJECTION HANDLER ───────── */}
      <section id="rollout" className="prec-sec prec-sec--tight" data-prec-reveal>
        <header className="prec-sec-head">
          <span className="prec-eyebrow">04 / rollout without regret</span>
          <h2 className="prec-h2">
            Deployed behind feature flags. Rolled back in one command.
          </h2>
          <p className="prec-sec-lede">
            The three reasons AI integrations break production — and the
            guardrails we ship on day one to prevent each.
          </p>
        </header>

        <div className="prec-obj">
          {[
            {
              t: 'Blast radius',
              k: 'shadow mode → 5% → 100%',
              body: 'Every new workload runs in shadow mode for a week, then behind a per-tenant flag at 5%, scaling only after the eval gate passes. Rollback is a flag flip.',
              badge: 'feature-flag · OTel trace · tenant-scoped',
            },
            {
              t: 'Silent drift',
              k: 'eval regression gate',
              body: 'A weekly eval run gates every model rotation. When accuracy drops below the committed threshold, the rotation is auto-reverted and an incident is opened.',
              badge: 'weekly eval · auto-revert · SEV gate',
            },
            {
              t: 'Data leakage',
              k: 'redaction as a stage',
              body: 'PII and commercial-secret redaction is a first-class stage, not a post-hoc filter. Policy lives in a per-tenant yaml you own; false-positive rate is shipped as a metric.',
              badge: 'NER redaction · per-tenant policy · FP metric',
            },
          ].map((o) => (
            <article key={o.t} className="prec-obj-card">
              <span className="prec-obj-k">{o.k}</span>
              <h4>{o.t}</h4>
              <p>{o.body}</p>
              <div className="prec-obj-badge">{o.badge}</div>
            </article>
          ))}
        </div>
      </section>

      {/* ───────── CTA / AUDIT ───────── */}
      <section id="audit" className="prec-cta" data-prec-reveal>
        <div className="prec-cta-inner">
          <div className="prec-cta-copy">
            <span className="prec-eyebrow prec-eyebrow--accent">engage</span>
            <h2 className="prec-h2 prec-h2--tight">
              Thirty minutes. Your stack on the table.<br />
              <span className="prec-h2-accent">A fixed-scope plan, or a clean no.</span>
            </h2>
            <ul className="prec-cta-list">
              <li><span>✓</span> 1 business-day reply · calendar link returned</li>
              <li><span>✓</span> NDA-first discovery · no decks sent ahead</li>
              <li><span>✓</span> SOC 2 engagement posture · audit surface on day one</li>
              <li><span>✓</span> 10-week fixed-scope guarantee</li>
            </ul>
          </div>

          <form
            className="prec-cta-form"
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
          >
            <label className="prec-f-row">
              <span>work email</span>
              <input type="email" required placeholder="you@company.com" />
            </label>
            <label className="prec-f-row">
              <span>company</span>
              <input type="text" placeholder="firm · domain · stage" />
            </label>
            <label className="prec-f-row">
              <span>surface</span>
              <select defaultValue="">
                <option value="" disabled>pick the closest workload</option>
                <option>workflow automation (tickets, ops)</option>
                <option>dashboard intelligence (bi, narratives)</option>
                <option>data pipeline AI (dbt, airflow)</option>
                <option>custom model integration (rag, sft)</option>
                <option>not sure yet — we'll scope together</option>
              </select>
            </label>
            <button type="submit" className="prec-btn prec-btn--primary prec-btn--lg prec-cta-submit">
              {sent ? '✓ received · reply within 1 business day' : 'Book 30-min audit'}
              {!sent && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M2 6 H10 M7 3 L10 6 L7 9" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              )}
            </button>
            <p className="prec-cta-foot">
              SOC 2 · NDA-first · 10-week guarantee · no retainer required
            </p>
          </form>
        </div>
      </section>

      {/* ───────── FOOTER ───────── */}
      <footer className="prec-foot">
        <div className="prec-foot-brand">
          <span className="prec-foot-mark">◉ SOLUTIONS · PRECISION</span>
          <span className="prec-foot-year">© 2026 · built in transit</span>
        </div>
        <div className="prec-foot-nav">
          <a href="#">main edition</a>
          <a href="#bridge">bridge</a>
          <a href="#matrix">benchmarks</a>
          <a href="#audit">book audit</a>
        </div>
        <div className="prec-foot-meta">
          42°21′N · 71°03′W · p95 142ms
        </div>
      </footer>
    </div>
  )
}

/* ================================================================= */
const PREC_CSS = `
.prec-root {
  --bg-0: #07090c;
  --bg-1: #0b0d12;
  --bg-2: #10131a;
  --bg-3: #151924;
  --bg-4: #1b2030;
  --text: #e8eaed;
  --text-dim: #9ba3af;
  --text-mute: #5d6470;
  --border: rgba(255,255,255,0.06);
  --border-strong: rgba(255,255,255,0.1);
  --accent: #7dd3fc;
  --accent-deep: #38bdf8;
  --accent-ink: #041720;
  --ok: #4ade80;
  --warn: #fbbf24;

  min-height: 100vh;
  background:
    radial-gradient(ellipse at 0% 0%, rgba(125,211,252,0.06), transparent 55%),
    radial-gradient(ellipse at 100% 0%, rgba(56,189,248,0.04), transparent 50%),
    var(--bg-0);
  color: var(--text);
  font-family: 'Inter Tight', system-ui, sans-serif;
  font-size: 15px;
  line-height: 1.55;
  letter-spacing: -0.005em;
  position: relative;
  overflow-x: hidden;
  font-feature-settings: 'cv11', 'ss01';
}
.prec-root::before {
  content: '';
  position: fixed; inset: 0;
  pointer-events: none; z-index: 0;
  background-image:
    radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0);
  background-size: 28px 28px;
  opacity: 0.8;
}
.prec-root a { color: inherit; text-decoration: none; }

/* ───────── NAV ───────── */
.prec-nav {
  position: sticky; top: 0; z-index: 60;
  background: color-mix(in oklab, var(--bg-0) 78%, transparent);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
}
.prec-nav-inner {
  max-width: 1400px; margin: 0 auto;
  display: grid; grid-template-columns: auto 1fr auto;
  align-items: center; gap: 28px;
  padding: 12px 24px;
}
.prec-nav-brand {
  display: inline-flex; align-items: center; gap: 10px; color: var(--text);
}
.prec-nav-brand-t {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 600; letter-spacing: -0.02em; font-size: 14px;
}
.prec-nav-brand-sub {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px; color: var(--text-mute); letter-spacing: 0.06em;
}
.prec-nav-links {
  display: flex; gap: 24px; justify-self: center;
  font-family: 'Inter Tight', sans-serif;
  font-size: 13px; color: var(--text-dim);
}
.prec-nav-links a { transition: color 180ms; }
.prec-nav-links a:hover { color: var(--text); }
.prec-nav-right {
  display: flex; align-items: center; gap: 14px;
}
.prec-nav-return {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px; color: var(--text-mute); letter-spacing: 0.1em;
  text-transform: uppercase;
}
.prec-nav-return:hover { color: var(--accent); }

/* ───────── BUTTONS ───────── */
.prec-btn {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 9px 16px; border-radius: 6px;
  font-family: 'Inter Tight', sans-serif;
  font-size: 13px; font-weight: 500;
  letter-spacing: -0.005em;
  transition: background 180ms, border-color 180ms, transform 180ms, color 180ms;
  border: 1px solid transparent;
  cursor: pointer;
}
.prec-btn--lg { padding: 13px 22px; font-size: 14px; gap: 12px; border-radius: 8px; }
.prec-btn--primary {
  background: var(--accent);
  color: var(--accent-ink);
  border-color: var(--accent);
  font-weight: 600;
}
.prec-btn--primary:hover {
  background: var(--accent-deep);
  border-color: var(--accent-deep);
}
.prec-btn--ghost {
  color: var(--text);
  border-color: var(--border-strong);
}
.prec-btn--ghost:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* ───────── HERO ───────── */
.prec-hero {
  position: relative; z-index: 1;
  max-width: 1400px; margin: 0 auto;
  padding: 72px 24px 40px;
}
.prec-hero-grid {
  display: grid; grid-template-columns: 1fr 1.05fr; gap: 56px;
  align-items: center;
}

.prec-kicker {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; color: var(--text-dim);
  letter-spacing: 0.08em;
  padding: 6px 12px; border-radius: 999px;
  border: 1px solid var(--border-strong);
  background: color-mix(in oklab, var(--bg-2) 80%, transparent);
}
.prec-kicker-dot {
  display: inline-block; width: 7px; height: 7px; border-radius: 999px;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
  animation: precBlink 1.6s ease-in-out infinite;
}
@keyframes precBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}
.prec-kicker-sep { color: var(--text-mute); }

.prec-h1 {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 500;
  font-size: clamp(40px, 6vw, 80px);
  line-height: 0.98;
  letter-spacing: -0.035em;
  margin: 22px 0 20px;
  color: var(--text);
}
.prec-h1 > span { display: block; }
.prec-h1-accent {
  background: linear-gradient(90deg, var(--accent), #bae6fd);
  -webkit-background-clip: text; background-clip: text;
  color: transparent;
  font-style: italic;
  font-weight: 400;
}
.prec-lede {
  font-size: 17px; line-height: 1.58;
  color: var(--text-dim);
  max-width: 520px;
}

.prec-hero-cta {
  display: flex; flex-wrap: wrap; align-items: center; gap: 12px;
  margin-top: 26px;
}
.prec-hero-meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; color: var(--text-mute);
  letter-spacing: 0.08em;
  margin-left: 4px;
}

.prec-hero-visual {
  position: relative;
}
.prec-hero-visual-frame {
  border: 1px solid var(--border-strong);
  border-radius: 10px;
  background: linear-gradient(180deg, var(--bg-1), var(--bg-0));
  overflow: hidden;
  box-shadow:
    0 40px 80px -40px rgba(0,0,0,0.6),
    inset 0 1px 0 rgba(255,255,255,0.03);
}
.prec-hero-visual-bar {
  display: flex; justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid var(--border);
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px; color: var(--text-mute);
  letter-spacing: 0.08em;
}
.prec-hero-visual-bar span:first-child { color: var(--accent); }
.prec-herodiag { width: 100%; height: auto; display: block; }

/* ───────── PROOF STRIP ───────── */
.prec-proof {
  margin-top: 64px;
  padding: 28px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  display: flex; flex-direction: column; gap: 20px;
}
.prec-proof-stats {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 0;
}
.prec-proof-stat {
  padding: 0 22px; border-right: 1px solid var(--border);
}
.prec-proof-stat:last-child { border-right: none; }
.prec-proof-v {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 300; font-size: 40px;
  letter-spacing: -0.04em;
  color: var(--text); line-height: 1;
}
.prec-proof-v span {
  font-size: 16px; color: var(--accent); margin-left: 2px; letter-spacing: 0;
}
.prec-proof-l {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px; color: var(--text-mute);
  letter-spacing: 0.14em; text-transform: uppercase;
  margin-top: 8px;
}
.prec-logos {
  display: flex; flex-wrap: wrap; align-items: center;
  gap: 44px; padding: 8px 22px;
  font-family: 'Inter Tight', sans-serif;
  font-size: 18px; color: var(--text-mute);
  opacity: 0.86;
}
.prec-logos span { white-space: nowrap; }

/* ───────── SECTIONS ───────── */
.prec-sec {
  position: relative; z-index: 1;
  max-width: 1400px; margin: 0 auto;
  padding: 80px 24px 40px;
}
.prec-sec--tight { padding-top: 40px; }
.prec-sec-head { margin-bottom: 40px; max-width: 820px; }
.prec-eyebrow {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--text-mute);
  padding: 4px 10px;
  border: 1px solid var(--border-strong);
  border-radius: 999px;
  margin-bottom: 18px;
}
.prec-eyebrow--accent {
  color: var(--accent); border-color: var(--accent);
}
.prec-h2 {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 500;
  font-size: clamp(28px, 3.6vw, 48px);
  line-height: 1.04;
  letter-spacing: -0.03em;
  margin: 0 0 14px;
  color: var(--text);
}
.prec-h2--tight { margin-bottom: 8px; }
.prec-h2-accent {
  background: linear-gradient(90deg, var(--accent), #bae6fd);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  font-style: italic;
  font-weight: 400;
}
.prec-sec-lede {
  font-size: 16px; line-height: 1.58;
  color: var(--text-dim); max-width: 620px;
}

/* ───────── BRIDGE GRID ───────── */
.prec-bridge-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(16,19,26,0.7), rgba(7,9,12,0.7));
}
.prec-bridge-cell {
  padding: 26px 24px;
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  display: flex; flex-direction: column; gap: 10px;
  min-height: 180px;
  transition: background 220ms;
}
.prec-bridge-cell:nth-child(3n) { border-right: none; }
.prec-bridge-cell:nth-last-child(-n+3) { border-bottom: none; }
.prec-bridge-cell:hover { background: color-mix(in oklab, var(--accent) 4%, transparent); }
.prec-bridge-cell header { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
.prec-bridge-n {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; color: var(--accent); letter-spacing: 0.16em;
}
.prec-bridge-tech {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; color: var(--text-mute); letter-spacing: 0.06em;
}
.prec-bridge-cell h3 {
  font-family: 'Inter Tight', sans-serif; font-weight: 600;
  font-size: 20px; letter-spacing: -0.02em; margin: 4px 0 2px;
  color: var(--text);
}
.prec-bridge-cell p {
  font-size: 14.5px; line-height: 1.55; color: var(--text-dim);
  margin: 0;
}

/* ───────── FEATURE MATRIX ───────── */
.prec-sec--matrix {
  background:
    radial-gradient(ellipse at 0% 50%, rgba(125,211,252,0.05), transparent 55%);
}
.prec-matrix {
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(16,19,26,0.8), rgba(7,9,12,0.7));
}
.prec-matrix-head,
.prec-matrix-row {
  display: grid;
  grid-template-columns: 1.1fr 1.3fr 1.3fr 0.7fr;
  gap: 0;
}
.prec-matrix-head {
  border-bottom: 1px solid var(--border);
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; letter-spacing: 0.14em;
  text-transform: uppercase; color: var(--text-mute);
}
.prec-matrix-h {
  padding: 14px 20px;
  border-right: 1px solid var(--border);
  display: flex; align-items: center; gap: 8px;
}
.prec-matrix-h:last-child { border-right: none; }
.prec-matrix-h--us { color: var(--accent); }
.prec-matrix-dot {
  display: inline-block; width: 7px; height: 7px;
  border-radius: 999px; background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
}
.prec-matrix-row {
  border-bottom: 1px solid var(--border);
  transition: background 180ms;
  cursor: default;
}
.prec-matrix-row:last-child { border-bottom: none; }
.prec-matrix-row:hover,
.prec-matrix-row.is-active {
  background: color-mix(in oklab, var(--accent) 4%, transparent);
}
.prec-matrix-row > div {
  padding: 18px 20px;
  border-right: 1px solid var(--border);
  display: flex; flex-direction: column; gap: 4px;
  justify-content: center;
}
.prec-matrix-row > div:last-child { border-right: none; }
.prec-matrix-k {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px; color: var(--text); letter-spacing: 0.02em;
}
.prec-matrix-us strong, .prec-matrix-them strong {
  font-family: 'Inter Tight', sans-serif;
  font-size: 16px; font-weight: 600; letter-spacing: -0.015em;
  color: var(--text);
}
.prec-matrix-us strong { color: var(--accent); }
.prec-matrix-us span, .prec-matrix-them span {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; color: var(--text-mute);
  letter-spacing: 0.02em;
}
.prec-matrix-trend { align-items: flex-end; justify-content: center; }

.prec-matrix-foot {
  display: flex; justify-content: space-between; align-items: center;
  padding: 14px 20px;
  border-top: 1px solid var(--border);
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; color: var(--text-mute);
  letter-spacing: 0.04em;
}
.prec-link-arrow {
  color: var(--accent); font-family: 'Inter Tight', sans-serif;
  font-size: 13px; font-weight: 500; letter-spacing: -0.005em;
  transition: gap 180ms, color 180ms;
}
.prec-link-arrow:hover { color: var(--accent-deep); }

/* ───────── MID-PAGE CTA ───────── */
.prec-mid-cta {
  max-width: 1400px; margin: 40px auto 0;
  padding: 0 24px;
  position: relative; z-index: 1;
}
.prec-mid-cta-inner {
  display: grid; grid-template-columns: 1fr auto; gap: 32px;
  align-items: center;
  padding: 32px 36px;
  border: 1px solid var(--accent);
  border-radius: 12px;
  background:
    radial-gradient(ellipse at 100% 50%, rgba(125,211,252,0.1), transparent 55%),
    linear-gradient(180deg, rgba(16,19,26,0.9), rgba(7,9,12,0.9));
}
.prec-mid-cta h3 {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 500; font-size: clamp(22px, 2.4vw, 32px);
  letter-spacing: -0.025em;
  margin: 6px 0 8px; color: var(--text);
}
.prec-mid-cta p {
  font-size: 14.5px; color: var(--text-dim); margin: 0; max-width: 560px;
  line-height: 1.55;
}

/* ───────── PROCESS ───────── */
.prec-proc {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column;
}
.prec-proc-step {
  display: grid; grid-template-columns: 90px 1fr; gap: 24px;
  padding: 28px 0;
  border-top: 1px solid var(--border);
  position: relative;
}
.prec-proc-step:last-child { border-bottom: 1px solid var(--border); }
.prec-proc-rail {
  display: flex; flex-direction: column; align-items: center;
  position: relative; padding-top: 4px;
}
.prec-proc-n {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px; color: var(--accent);
  letter-spacing: 0.14em;
  padding: 4px 8px; border: 1px solid var(--accent);
  border-radius: 4px; background: rgba(125,211,252,0.06);
}
.prec-proc-dot {
  width: 9px; height: 9px; border-radius: 999px;
  background: var(--accent);
  box-shadow: 0 0 0 4px rgba(125,211,252,0.15);
  margin-top: 14px;
}
.prec-proc-line {
  flex: 1; width: 1px; margin-top: 8px;
  background: linear-gradient(180deg, var(--accent), transparent);
  opacity: 0.4;
}
.prec-proc-body { padding-top: 4px; }
.prec-proc-head {
  display: flex; align-items: baseline; gap: 16px;
  margin-bottom: 10px;
}
.prec-proc-head h3 {
  font-family: 'Inter Tight', sans-serif; font-weight: 600;
  font-size: 24px; letter-spacing: -0.025em; margin: 0; color: var(--text);
}
.prec-proc-wk {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--text-mute);
}
.prec-proc-body p {
  font-size: 15px; line-height: 1.6; color: var(--text-dim);
  margin: 0 0 12px; max-width: 720px;
}
.prec-proc-out {
  display: inline-flex; gap: 10px; align-items: baseline;
  padding: 8px 14px; border-left: 2px solid var(--accent);
  background: rgba(125,211,252,0.04);
  font-size: 13px; color: var(--text);
}
.prec-proc-out-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--text-mute);
}

/* ───────── OBJECTION HANDLER ───────── */
.prec-obj {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
}
.prec-obj-card {
  padding: 26px 24px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: linear-gradient(180deg, rgba(16,19,26,0.6), rgba(7,9,12,0.7));
  display: flex; flex-direction: column; gap: 10px;
  transition: border-color 220ms, transform 280ms;
}
.prec-obj-card:hover { border-color: var(--accent); transform: translateY(-2px); }
.prec-obj-k {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; color: var(--accent);
  letter-spacing: 0.08em;
}
.prec-obj-card h4 {
  font-family: 'Inter Tight', sans-serif; font-weight: 600;
  font-size: 22px; letter-spacing: -0.025em;
  margin: 4px 0 2px; color: var(--text);
}
.prec-obj-card p {
  font-size: 14.5px; line-height: 1.58; color: var(--text-dim);
  margin: 0; flex: 1;
}
.prec-obj-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px; color: var(--text-mute);
  letter-spacing: 0.06em;
  padding-top: 12px; border-top: 1px dashed var(--border-strong);
  margin-top: 6px;
}

/* ───────── CTA / AUDIT ───────── */
.prec-cta {
  max-width: 1400px; margin: 40px auto 0;
  padding: 80px 24px;
  position: relative; z-index: 1;
}
.prec-cta-inner {
  display: grid; grid-template-columns: 1fr 1fr; gap: 56px;
  align-items: start;
  padding: 48px;
  border: 1px solid var(--border-strong);
  border-radius: 16px;
  background:
    radial-gradient(ellipse at 100% 0%, rgba(125,211,252,0.1), transparent 55%),
    linear-gradient(180deg, rgba(16,19,26,0.95), rgba(7,9,12,0.95));
}
.prec-cta-copy { max-width: 520px; }
.prec-cta-list {
  list-style: none; padding: 0; margin: 22px 0 0;
  display: flex; flex-direction: column; gap: 10px;
}
.prec-cta-list li {
  display: grid; grid-template-columns: 18px 1fr; gap: 10px;
  font-size: 14.5px; color: var(--text);
}
.prec-cta-list li span { color: var(--accent); font-weight: 600; }

.prec-cta-form {
  display: flex; flex-direction: column; gap: 16px;
  padding: 28px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: rgba(7,9,12,0.6);
}
.prec-f-row { display: flex; flex-direction: column; gap: 6px; }
.prec-f-row > span {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--text-mute);
}
.prec-f-row input, .prec-f-row select {
  background: transparent;
  border: 1px solid var(--border-strong);
  border-radius: 6px;
  padding: 11px 14px;
  color: var(--text);
  font-family: 'Inter Tight', sans-serif;
  font-size: 14px;
  outline: none;
  transition: border-color 180ms;
}
.prec-f-row input::placeholder, .prec-f-row select { color: var(--text-mute); }
.prec-f-row select option { background: var(--bg-1); color: var(--text); }
.prec-f-row input:focus, .prec-f-row select:focus { border-color: var(--accent); }
.prec-cta-submit { margin-top: 6px; width: 100%; justify-content: center; }
.prec-cta-foot {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px; color: var(--text-mute);
  letter-spacing: 0.12em; text-transform: uppercase;
  text-align: center; margin: 0;
}

/* ───────── FOOTER ───────── */
.prec-foot {
  position: relative; z-index: 1;
  max-width: 1400px; margin: 0 auto;
  padding: 28px 24px 40px;
  display: flex; justify-content: space-between; flex-wrap: wrap; gap: 18px;
  border-top: 1px solid var(--border);
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; color: var(--text-mute);
  letter-spacing: 0.1em; text-transform: uppercase;
}
.prec-foot-brand { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; }
.prec-foot-mark { color: var(--accent); }
.prec-foot-nav { display: flex; gap: 18px; }
.prec-foot-nav a:hover { color: var(--accent); }

/* ───────── RESPONSIVE ───────── */
@media (max-width: 1100px) {
  .prec-hero-grid { grid-template-columns: 1fr; }
  .prec-bridge-grid { grid-template-columns: repeat(2, 1fr); }
  .prec-bridge-cell:nth-child(3n) { border-right: 1px solid var(--border); }
  .prec-bridge-cell:nth-child(2n) { border-right: none; }
  .prec-bridge-cell:nth-last-child(-n+3) { border-bottom: 1px solid var(--border); }
  .prec-bridge-cell:nth-last-child(-n+2) { border-bottom: none; }
  .prec-matrix-head, .prec-matrix-row { grid-template-columns: 1fr 1fr; }
  .prec-matrix-h--t, .prec-matrix-trend { display: none; }
  .prec-matrix-h--us { grid-column: 1; }
  .prec-matrix-h--them { grid-column: 2; }
  .prec-matrix-k { grid-column: 1 / -1; background: color-mix(in oklab, var(--accent) 5%, transparent); }
  .prec-cta-inner { grid-template-columns: 1fr; }
  .prec-obj { grid-template-columns: 1fr; }
  .prec-mid-cta-inner { grid-template-columns: 1fr; }
}
@media (max-width: 720px) {
  .prec-nav-links { display: none; }
  .prec-nav-inner { grid-template-columns: 1fr auto; }
  .prec-proof-stats { grid-template-columns: repeat(2, 1fr); }
  .prec-proof-stat { padding: 16px 14px; border-bottom: 1px solid var(--border); }
  .prec-bridge-grid { grid-template-columns: 1fr; }
  .prec-bridge-cell { border-right: none !important; border-bottom: 1px solid var(--border) !important; }
  .prec-bridge-cell:last-child { border-bottom: none !important; }
  .prec-proc-step { grid-template-columns: 56px 1fr; }
  .prec-cta-inner { padding: 28px; }
}

@media (prefers-reduced-motion: reduce) {
  .prec-kicker-dot { animation: none !important; }
}
`
