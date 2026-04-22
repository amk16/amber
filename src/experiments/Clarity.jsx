import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------
 *  CLARITY
 *  Bright enterprise explainer. Committing hard to flat line-art,
 *  no glass, no gradients. Anchored on pricing/engagement-model
 *  transparency: a fixed-scope 10-week pilot with an explicit number.
 *
 *  Typography: Inter Tight + IBM Plex Mono (Geist substitute).
 *  Palette: white + soft blue + warm ochre for CTA contrast.
 * ----------------------------------------------------------------- */

const FONT_LINK =
  'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@300;400;500&display=swap'

function useFonts() {
  useEffect(() => {
    if (document.getElementById('clar-fonts')) return
    const link = document.createElement('link')
    link.id = 'clar-fonts'
    link.rel = 'stylesheet'
    link.href = FONT_LINK
    document.head.appendChild(link)
  }, [])
}

/* ──────────────────────────────────────────────────────────
 * Flat blueprint diagram — the hero visual
 * ────────────────────────────────────────────────────────── */
function BlueprintDiagram() {
  return (
    <svg viewBox="0 0 720 380" className="clar-bp" aria-hidden>
      <rect x="0.5" y="0.5" width="719" height="379" fill="none" stroke="#e6e1d6" />
      <g opacity="0.4">
        {Array.from({ length: 19 }).map((_, i) => (
          <line
            key={`g-${i}`}
            x1={i * 40}
            y1="0"
            x2={i * 40}
            y2="380"
            stroke="#e6e1d6"
            strokeDasharray="1 5"
            strokeWidth="0.3"
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`h-${i}`}
            y1={i * 40}
            x1="0"
            y2={i * 40}
            x2="720"
            stroke="#e6e1d6"
            strokeDasharray="1 5"
            strokeWidth="0.3"
          />
        ))}
      </g>

      {/* column headers */}
      <g fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#6b7280" letterSpacing="2">
        <text x="90" y="36" textAnchor="middle">YOUR SYSTEMS</text>
        <text x="360" y="36" textAnchor="middle">THE BRIDGE</text>
        <text x="630" y="36" textAnchor="middle">YOUR TEAM</text>
      </g>

      {/* source systems — flat rects, no shadow */}
      {[
        { y: 80, n: 'Snowflake' },
        { y: 130, n: 'Salesforce' },
        { y: 180, n: 'Zendesk' },
        { y: 230, n: 'Postgres' },
        { y: 280, n: 'Looker' },
      ].map((s) => (
        <g key={s.n}>
          <rect x="24" y={s.y - 16} width="132" height="32" fill="#fff" stroke="#1a1c20" strokeWidth="1" />
          <text x="90" y={s.y + 5} textAnchor="middle" fontFamily="Inter Tight, sans-serif" fontSize="13" fill="#1a1c20">{s.n}</text>
        </g>
      ))}

      {/* bridge panel — flat, inked outline */}
      <g>
        <rect x="268" y="64" width="184" height="260" fill="#fff" stroke="#1a1c20" strokeWidth="1.6" />
        <rect x="268" y="64" width="184" height="36" fill="#f4f3ee" stroke="#1a1c20" strokeWidth="1.6" />
        <text x="360" y="87" textAnchor="middle" fontFamily="Inter Tight, sans-serif" fontSize="14" fontWeight="600" fill="#1a1c20">
          Bridge
        </text>

        {[
          { y: 122, t: 'Ingest', sub: 'read-only, auth-scoped' },
          { y: 162, t: 'Retrieve', sub: 'per-workload allow-list' },
          { y: 202, t: 'Infer', sub: 'model-agnostic' },
          { y: 242, t: 'Guardrail', sub: 'redact · policy · hand-off' },
          { y: 282, t: 'Emit', sub: 'writes into your tools' },
        ].map((st) => (
          <g key={st.t}>
            <rect x="280" y={st.y - 12} width="160" height="24" fill="#fff" stroke="#e6e1d6" strokeWidth="1" />
            <circle cx="290" cy={st.y} r="2" fill="#2d5cf6" />
            <text x="298" y={st.y - 2} fontFamily="Inter Tight, sans-serif" fontSize="12" fontWeight="500" fill="#1a1c20">{st.t}</text>
            <text x="298" y={st.y + 8} fontFamily="IBM Plex Mono, monospace" fontSize="8.5" fill="#6b7280" letterSpacing="0.4">{st.sub}</text>
          </g>
        ))}
      </g>

      {/* destination systems */}
      {[
        { y: 80, n: 'Agents', c: '#2d5cf6' },
        { y: 130, n: 'Dashboards', c: '#2d5cf6' },
        { y: 180, n: 'Actions', c: '#2d5cf6' },
        { y: 230, n: 'Evals', c: '#2d5cf6' },
        { y: 280, n: 'Alerts', c: '#2d5cf6' },
      ].map((s) => (
        <g key={s.n}>
          <rect x="564" y={s.y - 16} width="132" height="32" fill="#fff" stroke={s.c} strokeWidth="1.2" />
          <text x="630" y={s.y + 5} textAnchor="middle" fontFamily="Inter Tight, sans-serif" fontSize="13" fill="#1a1c20">{s.n}</text>
        </g>
      ))}

      {/* lines — flat, clear */}
      <g fill="none" stroke="#1a1c20" strokeWidth="0.7">
        {[80, 130, 180, 230, 280].map((y) => (
          <path key={`l-${y}`} d={`M156,${y} L210,${y} L210,194 L268,194`} />
        ))}
        {[80, 130, 180, 230, 280].map((y) => (
          <path key={`r-${y}`} d={`M452,194 L510,194 L510,${y} L564,${y}`} stroke="#2d5cf6" strokeWidth="1" />
        ))}
      </g>

      {/* arrowheads */}
      {[80, 130, 180, 230, 280].map((y) => (
        <path key={`a-${y}`} d={`M560,${y - 3} L564,${y} L560,${y + 3}`} fill="#2d5cf6" />
      ))}

      {/* legend bottom */}
      <g fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#6b7280" letterSpacing="1">
        <line x1="24" y1="344" x2="696" y2="344" stroke="#e6e1d6" strokeWidth="0.6" />
        <text x="24" y="362">Fig. 1 — You keep your stack. We build the narrow layer between.</text>
      </g>
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────
 * MAIN
 * ────────────────────────────────────────────────────────── */
export default function Clarity() {
  useFonts()
  const root = useRef(null)
  const [sent, setSent] = useState(false)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-clar-h-kick]', { y: 10, opacity: 0, duration: 0.6, ease: 'power3.out' })
      gsap.from('[data-clar-h-title]', { y: 20, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 })
      gsap.from('[data-clar-h-lede]', { y: 12, opacity: 0, duration: 0.7, delay: 0.4, ease: 'power3.out' })
      gsap.from('[data-clar-h-cta]', { y: 10, opacity: 0, duration: 0.6, delay: 0.6, stagger: 0.08, ease: 'power3.out' })
      gsap.from('[data-clar-h-pilot]', { y: 14, opacity: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' })

      gsap.utils.toArray('[data-clar-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 22, opacity: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="clar-root">
      <style>{CLAR_CSS}</style>

      {/* ───────── NAV ───────── */}
      <header className="clar-nav">
        <div className="clar-nav-inner">
          <a href="#" className="clar-nav-brand">
            <span className="clar-nav-logo" aria-hidden>
              <span />
              <span />
            </span>
            <span className="clar-nav-t">Solutions</span>
          </a>
          <nav className="clar-nav-links">
            <a href="#how">How it works</a>
            <a href="#pilot">The pilot</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="clar-nav-right">
            <a href="#" className="clar-nav-return">Back to main</a>
            <a href="#book" className="clar-btn clar-btn--primary">Book a discovery call</a>
          </div>
        </div>
      </header>

      {/* ───────── HERO ───────── */}
      <section className="clar-hero">
        <div className="clar-hero-copy">
          <div className="clar-kick" data-clar-h-kick>
            <span className="clar-kick-pill">Fixed-scope AI integration</span>
            <span>·</span>
            <span>10 weeks · flat price · 1-line invoice</span>
          </div>

          <h1 className="clar-h1" data-clar-h-title>
            AI that lands in production —<br />
            with a price you can read<br />
            <span className="clar-h1-accent">before you sign anything.</span>
          </h1>

          <p className="clar-lede" data-clar-h-lede>
            Solutions runs fixed-scope AI integrations for companies that
            have been burned by open-ended consulting. You get a ten-week
            pilot with a flat fee, a clear deliverable, and a written exit
            clause. If we&apos;re not a fit by week two, you pay nothing.
          </p>

          <div className="clar-hero-cta" data-clar-h-cta>
            <a href="#pilot" className="clar-btn clar-btn--primary clar-btn--lg">
              See the 10-week pilot
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M2 6 H10 M7 3 L10 6 L7 9" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </a>
            <a href="#book" className="clar-btn clar-btn--secondary clar-btn--lg">
              Book a discovery call
            </a>
          </div>

          <div className="clar-hero-trust" data-clar-h-cta>
            <div><strong>142</strong><span>integrations shipped</span></div>
            <span className="clar-trust-sep" />
            <div><strong>4.2 mo</strong><span>median payback</span></div>
            <span className="clar-trust-sep" />
            <div><strong>98.94%</strong><span>fleet uptime</span></div>
            <span className="clar-trust-sep" />
            <div><strong>1 in 6</strong><span>we decline · after discovery</span></div>
          </div>
        </div>

        <aside className="clar-hero-pilot" data-clar-h-pilot>
          <div className="clar-pilot-tag">
            <span className="clar-pilot-tag-dot" />
            Open · Q2 / Q3 2026 cohort
          </div>
          <div className="clar-pilot-title">The 10-week pilot</div>
          <div className="clar-pilot-price">
            <span className="clar-pilot-price-n">$84,000</span>
            <span className="clar-pilot-price-unit">flat · 1-line invoice · no retainer</span>
          </div>

          <ul className="clar-pilot-list">
            {[
              { k: 'Weeks 0–2', v: 'Discovery · integration map · shortlist of 3 bridges' },
              { k: 'Weeks 2–4', v: 'Architecture · eval scaffold · deploy-ready scaffold' },
              { k: 'Weeks 4–10', v: 'One shipped workload · monitoring · handoff docs' },
              { k: 'Exit', v: 'Written exit clause · free to leave by wk 2' },
            ].map((r) => (
              <li key={r.k}>
                <span className="clar-pilot-k">{r.k}</span>
                <span className="clar-pilot-v">{r.v}</span>
              </li>
            ))}
          </ul>

          <a href="#book" className="clar-btn clar-btn--primary clar-pilot-cta">
            Reserve a slot
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2 6 H10 M7 3 L10 6 L7 9" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </a>
          <p className="clar-pilot-foot">
            Mutual NDA · SOC 2 posture · cancel by week 2 at no charge
          </p>
        </aside>
      </section>

      {/* ───────── HOW IT WORKS ───────── */}
      <section id="how" className="clar-sec" data-clar-reveal>
        <header className="clar-sec-head">
          <span className="clar-eyebrow">How it works</span>
          <h2 className="clar-h2">
            Three weeks to a decision.<br />
            Ten weeks to production.
          </h2>
          <p className="clar-sec-lede">
            The engagement is structured so you know exactly what you own,
            what we own, and when you can walk away at no cost.
          </p>
        </header>

        <ol className="clar-steps">
          {[
            { n: '01', t: 'We read your stack — for free.', body: 'A 30-minute call followed by a redacted systems audit. You receive a one-page integration map and a shortlist of three bridges worth building first. No invoice until you sign the pilot SOW.' },
            { n: '02', t: 'We commit to one workload.', body: 'You choose one of the three. We price it flat at $84,000, scope it in writing, and set the success criteria together. If we disagree on scope, we don\'t start.' },
            { n: '03', t: 'We ship it in ten weeks.', body: 'One workload in production — wired to your auth, your billing, the dashboards already in use. Observability, alerting, eval scaffold, and handoff docs all included. You own the code and the scaffolding.' },
          ].map((s) => (
            <li key={s.n} className="clar-step">
              <div className="clar-step-n">{s.n}</div>
              <div className="clar-step-body">
                <h3>{s.t}</h3>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* the blueprint */}
        <div className="clar-bp-wrap">
          <BlueprintDiagram />
        </div>
      </section>

      {/* ───────── THE PILOT SCOPE ───────── */}
      <section id="pilot" className="clar-sec clar-sec--split" data-clar-reveal>
        <div className="clar-sec-head">
          <span className="clar-eyebrow">The pilot</span>
          <h2 className="clar-h2">
            Exactly what $84,000 buys.
          </h2>
          <p className="clar-sec-lede">
            We hide nothing. Here is the scope, the price, and the exit
            terms — the same document that lives at the top of your SOW.
          </p>
        </div>

        <div className="clar-scope">
          <div className="clar-scope-in">
            <h4 className="clar-scope-h">In scope</h4>
            <ul>
              {[
                'One shipped production workload (you choose from the shortlist)',
                'Integration map + redacted diagram of your AI surface area',
                'Reference architecture with guardrails and eval scaffold',
                'Monitoring, alerting, decision-record projection to your observability stack',
                'Per-tenant redaction policy and confidence-handoff logic',
                'Deploy-ready repo scaffold + 200+ page handoff documentation',
                'Four weekly syncs, a dedicated Slack channel, one principal engineer',
                'Mutual NDA, SOC 2 engagement posture, and a shared responsibility matrix',
              ].map((it) => (
                <li key={it}>
                  <span className="clar-tick">✓</span>
                  {it}
                </li>
              ))}
            </ul>
          </div>

          <div className="clar-scope-out">
            <h4 className="clar-scope-h clar-scope-h--out">Not in scope (and why)</h4>
            <ul>
              {[
                { v: 'Rebuilding your data warehouse', w: 'We work with what you have. If it\'s broken, we flag it and recommend a partner.' },
                { v: 'Fine-tuning a custom base model', w: 'Priced separately; most firms don\'t need it in the first pilot.' },
                { v: 'Running your change-management program', w: 'We support it. Someone on your team owns it.' },
                { v: '24/7 on-call during the pilot', w: 'Added in the retainer; not needed during a 10-week ship.' },
              ].map((it) => (
                <li key={it.v}>
                  <span className="clar-cross">—</span>
                  <div>
                    <strong>{it.v}</strong>
                    <span>{it.w}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────── PRICING ───────── */}
      <section id="pricing" className="clar-sec" data-clar-reveal>
        <header className="clar-sec-head">
          <span className="clar-eyebrow">Pricing</span>
          <h2 className="clar-h2">
            Two engagement shapes.<br />
            Both priced on the website.
          </h2>
          <p className="clar-sec-lede">
            One of these is almost certainly you. If neither fits, we
            often recommend a partner who is a better shape than we are.
          </p>
        </header>

        <div className="clar-pricing">
          <article className="clar-plan">
            <header>
              <span className="clar-plan-kicker">Most firms start here</span>
              <h3>Pilot</h3>
              <div className="clar-plan-price">
                <span className="clar-plan-price-n">$84,000</span>
                <span className="clar-plan-price-unit">flat · 10 weeks</span>
              </div>
            </header>
            <p className="clar-plan-desc">
              One shipped workload, end-to-end. The fastest way to know
              whether we are a fit — and the cheapest way to own the
              scaffold that a real engagement is built on.
            </p>
            <ul className="clar-plan-list">
              {[
                'One production workload, your choice',
                'Architecture, eval scaffold, redaction policy',
                'Monitoring, alerting, handoff docs',
                'One principal engineer · four weekly syncs',
                'Exit clause: free to cancel by end of week 2',
              ].map((it) => (
                <li key={it}><span>✓</span>{it}</li>
              ))}
            </ul>
            <a href="#book" className="clar-btn clar-btn--primary clar-btn--lg clar-plan-cta">
              Reserve a pilot slot
            </a>
          </article>

          <article className="clar-plan clar-plan--secondary">
            <header>
              <span className="clar-plan-kicker">After a successful pilot</span>
              <h3>Retainer</h3>
              <div className="clar-plan-price">
                <span className="clar-plan-price-n">$24,000<span className="clar-plan-sm">/mo</span></span>
                <span className="clar-plan-price-unit">90-day notice · no lock-in</span>
              </div>
            </header>
            <p className="clar-plan-desc">
              For firms who want a trained hand on call, quarterly
              roadmapping, and automatic model-refresh cycles once the
              first workload is live.
            </p>
            <ul className="clar-plan-list">
              {[
                'Quarterly roadmap with your team',
                'Model-refresh cycle gated by eval regression',
                'On-call bench for incidents and new workloads',
                'Up to two new workloads shipped per year',
                'Annual framework re-attestation',
              ].map((it) => (
                <li key={it}><span>✓</span>{it}</li>
              ))}
            </ul>
            <a href="#book" className="clar-btn clar-btn--secondary clar-btn--lg clar-plan-cta">
              Book a retainer call
            </a>
          </article>
        </div>

        <p className="clar-pricing-note">
          Enterprise or regulated buyers with custom compliance needs —
          pricing varies. Please see <a href="#book" className="clar-link">the booking form</a>.
        </p>
      </section>

      {/* ───────── MID CTA ───────── */}
      <section className="clar-mid" data-clar-reveal>
        <div className="clar-mid-inner">
          <div>
            <span className="clar-eyebrow">30-minute call</span>
            <h3>Not ready for the pilot? Start with the call.</h3>
            <p>We&apos;ll read your stack, give you the integration map, and tell you (honestly) whether you need us at all.</p>
          </div>
          <a href="#book" className="clar-btn clar-btn--primary clar-btn--lg">
            Book a discovery call
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2 6 H10 M7 3 L10 6 L7 9" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </a>
        </div>
      </section>

      {/* ───────── FAQ / OBJECTIONS ───────── */}
      <section id="faq" className="clar-sec" data-clar-reveal>
        <header className="clar-sec-head">
          <span className="clar-eyebrow">Frequently asked</span>
          <h2 className="clar-h2">
            The questions we get most,<br />answered on the page.
          </h2>
        </header>

        <div className="clar-faq">
          {[
            {
              q: 'What if it doesn\'t work?',
              a: 'Every pilot has a written exit clause. You can cancel by the end of week 2 at no charge. In roughly one engagement in six, we ourselves conclude the bridge is not the right device — we say so, we don\'t invoice, and we usually recommend another house.',
            },
            {
              q: 'Why fixed price?',
              a: 'We\'ve run both models for five years. Fixed-scope engagements ship faster, have clearer ROI, and make it easier for your finance team to say yes. Time-and-materials is available on request for engagements where scope genuinely cannot be set in advance.',
            },
            {
              q: 'Who owns the code?',
              a: 'You do. Every artifact — the bridge code, the evals, the redaction policy, the architecture diagrams — is delivered under a permissive license and lives in your repository. The retainer is optional; many firms take it for year one and then bring the work in-house.',
            },
            {
              q: 'What about security and compliance?',
              a: 'SOC 2 Type II. Mutual NDA templated or sign yours. Zero-retention agreements with every upstream model provider. Region-pinned inference. For regulated buyers, see the Signal page for our full enterprise posture.',
            },
            {
              q: 'Can you work with our existing AI tools?',
              a: 'Almost certainly. The bridge sits between your stack and the surfaces your team uses; it doesn\'t replace other tools. If you already have a retrieval stack, an agent framework, or a chosen model provider, we build around them, not over them.',
            },
            {
              q: 'What if the model we want doesn\'t exist yet?',
              a: 'The bridge is model-agnostic by design. We\'ve rotated the underlying model twice in the 2025 cohort without a rewrite — for Northbound, mid-engagement. Plan for rotation; don\'t architect around a specific provider.',
            },
          ].map((f) => (
            <article key={f.q} className="clar-faq-item">
              <h4>{f.q}</h4>
              <p>{f.a}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ───────── BOOK ───────── */}
      <section id="book" className="clar-book" data-clar-reveal>
        <div className="clar-book-inner">
          <div className="clar-book-copy">
            <span className="clar-eyebrow">Reserve · book a call</span>
            <h2 className="clar-h2">
              Fill in three fields.<br />
              <span className="clar-h2-accent">We reply within one business day.</span>
            </h2>
            <p>
              No decks. No sales choreography. A senior engineer reads
              your note, schedules the call, and — if we&apos;re not a
              fit — tells you where to look next.
            </p>
            <ul className="clar-book-list">
              <li><span>✓</span> One business-day reply with a calendar link</li>
              <li><span>✓</span> Mutual NDA available before the call</li>
              <li><span>✓</span> If we decline, we usually recommend a partner</li>
              <li><span>✓</span> Fixed-scope pilot · flat $84,000 · week-2 exit</li>
            </ul>
          </div>

          <form
            className="clar-book-form"
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
          >
            <label>
              <span>Work email</span>
              <input type="email" required placeholder="you@company.com" />
            </label>
            <label>
              <span>Company</span>
              <input type="text" placeholder="Company · industry · size" />
            </label>
            <label>
              <span>What should we read first?</span>
              <textarea rows="3" placeholder="A sentence or two on the workload you'd like the bridge to carry." />
            </label>
            <button type="submit" className="clar-btn clar-btn--primary clar-btn--lg clar-book-submit">
              {sent ? '✓ Received · reply within 1 business day' : 'Book the call'}
              {!sent && <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden><path d="M2 6 H10 M7 3 L10 6 L7 9" stroke="currentColor" strokeWidth="1.4" /></svg>}
            </button>
            <p className="clar-book-foot">
              SOC 2 · NDA-first · no spam, no newsletter drops
            </p>
          </form>
        </div>
      </section>

      {/* ───────── FOOTER ───────── */}
      <footer className="clar-foot">
        <div className="clar-foot-inner">
          <div className="clar-foot-brand">
            <span className="clar-foot-mark">Solutions</span>
            <span>© 2026 · built in transit · 42°21′N</span>
          </div>
          <nav className="clar-foot-nav">
            <a href="#">Main edition</a>
            <a href="#pilot">The pilot</a>
            <a href="#pricing">Pricing</a>
            <a href="#book">Book a call</a>
            <a href="#">Security</a>
          </nav>
          <div className="clar-foot-meta">
            SOC 2 Type II · mutual NDA templated · 10-week guarantee
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ================================================================= */
const CLAR_CSS = `
.clar-root {
  --bg: #ffffff;
  --bg-soft: #faf9f4;
  --bg-panel: #f4f3ee;
  --ink: #1a1c20;
  --ink-2: #3a3e45;
  --ink-dim: #6b7280;
  --ink-mute: #9aa1ad;
  --blue: #2d5cf6;
  --blue-deep: #1e3fb8;
  --blue-soft: #eaf0ff;
  --ochre: #d9893a;
  --ochre-deep: #a85f1e;
  --ochre-soft: #fbf1e3;
  --rule: #e6e1d6;

  min-height: 100vh;
  background: var(--bg);
  color: var(--ink);
  font-family: 'Inter Tight', system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.55;
  letter-spacing: -0.005em;
  position: relative;
  font-feature-settings: 'cv11', 'ss01';
}
.clar-root a { color: inherit; text-decoration: none; }

/* ───────── NAV ───────── */
.clar-nav {
  position: sticky; top: 0; z-index: 50;
  background: color-mix(in oklab, var(--bg) 88%, transparent);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--rule);
}
.clar-nav-inner {
  max-width: 1320px; margin: 0 auto;
  display: grid; grid-template-columns: auto 1fr auto;
  gap: 28px; align-items: center;
  padding: 14px 28px;
}
.clar-nav-brand {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: 'Inter Tight', sans-serif;
  font-size: 15px; font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
}
.clar-nav-logo {
  display: inline-flex; position: relative;
  width: 22px; height: 22px;
  background: var(--ink); border-radius: 4px;
  overflow: hidden;
}
.clar-nav-logo > span:first-child {
  position: absolute; inset: 0; background: var(--blue);
  clip-path: polygon(0 55%, 100% 40%, 100% 100%, 0 100%);
}
.clar-nav-logo > span:last-child {
  position: absolute; right: 4px; top: 4px; width: 6px; height: 6px;
  background: var(--ochre); border-radius: 1px;
}
.clar-nav-links {
  display: flex; gap: 28px; justify-self: center;
  font-size: 14px; color: var(--ink-2);
}
.clar-nav-links a { transition: color 180ms; }
.clar-nav-links a:hover { color: var(--blue); }
.clar-nav-right { display: flex; align-items: center; gap: 16px; }
.clar-nav-return { font-size: 13px; color: var(--ink-dim); }
.clar-nav-return:hover { color: var(--ink); }

/* ───────── BUTTONS ───────── */
.clar-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 9px 16px; border-radius: 6px;
  font-family: 'Inter Tight', sans-serif;
  font-size: 13px; font-weight: 500;
  letter-spacing: -0.005em;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 180ms, border-color 180ms, color 180ms;
}
.clar-btn--lg { padding: 13px 22px; font-size: 14px; gap: 10px; border-radius: 7px; }
.clar-btn--primary {
  background: var(--ochre);
  color: #fff;
  border-color: var(--ochre);
  font-weight: 600;
}
.clar-btn--primary:hover {
  background: var(--ochre-deep);
  border-color: var(--ochre-deep);
}
.clar-btn--secondary {
  background: var(--ink);
  color: #fff;
  border-color: var(--ink);
}
.clar-btn--secondary:hover {
  background: var(--blue);
  border-color: var(--blue);
}

.clar-link {
  color: var(--blue); border-bottom: 1px solid currentColor;
}

/* ───────── HERO ───────── */
.clar-hero {
  max-width: 1320px; margin: 0 auto;
  padding: 72px 28px 56px;
  display: grid; grid-template-columns: 1.3fr 1fr;
  gap: 56px;
  align-items: start;
}
.clar-hero-copy { max-width: 640px; }
.clar-kick {
  display: inline-flex; align-items: center; gap: 10px; flex-wrap: wrap;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px; letter-spacing: 0.14em;
  color: var(--ink-dim); text-transform: uppercase;
  margin-bottom: 24px;
}
.clar-kick-pill {
  padding: 5px 10px; background: var(--blue); color: #fff;
  border-radius: 999px; letter-spacing: 0.16em; font-weight: 600;
}
.clar-h1 {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 500;
  font-size: clamp(40px, 6vw, 76px);
  line-height: 1;
  letter-spacing: -0.03em;
  margin: 0 0 22px;
  color: var(--ink);
}
.clar-h1-accent {
  color: var(--ochre);
  font-weight: 500;
}
.clar-lede {
  font-size: 18px; line-height: 1.56;
  color: var(--ink-2);
  max-width: 580px;
  margin: 0 0 28px;
}
.clar-hero-cta { display: flex; flex-wrap: wrap; gap: 10px; }
.clar-hero-trust {
  display: flex; align-items: center; flex-wrap: wrap;
  gap: 20px; margin-top: 40px;
  padding: 20px 0; border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}
.clar-hero-trust > div {
  display: flex; flex-direction: column; gap: 2px;
}
.clar-hero-trust strong {
  font-family: 'Inter Tight', sans-serif;
  font-size: 22px; font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
}
.clar-hero-trust span {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px; letter-spacing: 0.06em;
  color: var(--ink-dim);
}
.clar-trust-sep {
  width: 1px; height: 32px; background: var(--rule);
}

/* hero pilot card */
.clar-hero-pilot {
  padding: 32px 28px;
  border: 2px solid var(--ink);
  background: var(--bg);
  border-radius: 8px;
  position: sticky; top: 96px;
}
.clar-pilot-tag {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 4px 10px;
  background: var(--blue-soft);
  border-radius: 999px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--blue-deep); font-weight: 600;
  margin-bottom: 18px;
}
.clar-pilot-tag-dot {
  width: 6px; height: 6px; border-radius: 999px; background: var(--blue);
  box-shadow: 0 0 6px var(--blue);
}
.clar-pilot-title {
  font-family: 'Inter Tight', sans-serif;
  font-size: 14px; color: var(--ink-dim);
  letter-spacing: 0.01em;
  margin-bottom: 4px;
}
.clar-pilot-price {
  display: flex; flex-direction: column; gap: 2px;
  padding-bottom: 18px;
  border-bottom: 1px dashed var(--rule);
  margin-bottom: 18px;
}
.clar-pilot-price-n {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 600;
  font-size: 48px; line-height: 1;
  letter-spacing: -0.04em;
  color: var(--ink);
}
.clar-pilot-price-unit {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px; color: var(--ink-dim);
  letter-spacing: 0.1em;
}

.clar-pilot-list {
  list-style: none; padding: 0; margin: 0 0 22px;
  display: flex; flex-direction: column; gap: 0;
}
.clar-pilot-list li {
  display: grid; grid-template-columns: 80px 1fr; gap: 12px; align-items: baseline;
  padding: 10px 0;
  border-bottom: 1px solid var(--rule);
  font-size: 14px;
}
.clar-pilot-list li:last-child { border-bottom: none; }
.clar-pilot-k {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px; letter-spacing: 0.1em;
  color: var(--ochre); font-weight: 500;
  text-transform: uppercase;
}
.clar-pilot-v { color: var(--ink-2); line-height: 1.45; }

.clar-pilot-cta { width: 100%; justify-content: center; }
.clar-pilot-foot {
  margin: 10px 0 0;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10.5px; letter-spacing: 0.1em;
  color: var(--ink-dim); text-align: center;
}

/* ───────── SECTIONS ───────── */
.clar-sec {
  max-width: 1320px; margin: 0 auto;
  padding: 80px 28px 40px;
}
.clar-sec--split { padding-top: 64px; }
.clar-sec-head { margin-bottom: 40px; max-width: 780px; }
.clar-eyebrow {
  display: inline-block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--blue);
  padding: 3px 0;
  margin-bottom: 14px;
  border-bottom: 1px solid var(--blue);
}
.clar-h2 {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 500;
  font-size: clamp(30px, 4.2vw, 56px);
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin: 0 0 14px;
  color: var(--ink);
}
.clar-h2-accent { color: var(--ochre); font-weight: 500; }
.clar-sec-lede {
  font-size: 17px; line-height: 1.58;
  color: var(--ink-2); max-width: 600px; margin: 0;
}

/* ───────── STEPS ───────── */
.clar-steps {
  list-style: none; padding: 0; margin: 0 0 56px;
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 0;
  border-top: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
}
.clar-step {
  display: flex; flex-direction: column; gap: 16px;
  padding: 32px 28px;
  border-right: 1px solid var(--rule);
  background: var(--bg);
}
.clar-step:last-child { border-right: none; }
.clar-step-n {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px; font-weight: 600;
  color: var(--ochre);
  letter-spacing: 0.14em;
  padding: 4px 10px;
  border: 1px solid var(--ochre);
  border-radius: 3px;
  align-self: flex-start;
  background: var(--ochre-soft);
}
.clar-step-body h3 {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 600;
  font-size: 22px;
  letter-spacing: -0.02em;
  margin: 0 0 10px;
  color: var(--ink);
}
.clar-step-body p {
  font-size: 15px; line-height: 1.6;
  color: var(--ink-2); margin: 0;
}

.clar-bp-wrap {
  max-width: 900px; margin: 0 auto;
  padding: 24px;
  background: var(--bg-soft);
  border: 1px solid var(--rule);
  border-radius: 8px;
}
.clar-bp { width: 100%; height: auto; display: block; }

/* ───────── PILOT SCOPE ───────── */
.clar-scope {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 0;
  border: 1px solid var(--ink);
  border-radius: 8px;
  overflow: hidden;
}
.clar-scope-in, .clar-scope-out {
  padding: 28px 28px 32px;
}
.clar-scope-in {
  background: var(--bg);
  border-right: 1px solid var(--rule);
}
.clar-scope-out { background: var(--bg-panel); }
.clar-scope-h {
  font-family: 'Inter Tight', sans-serif;
  font-size: 13px; font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--blue);
  margin: 0 0 18px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--rule);
}
.clar-scope-h--out { color: var(--ink-dim); }
.clar-scope-in ul, .clar-scope-out ul {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 10px;
}
.clar-scope-in li {
  display: grid; grid-template-columns: 20px 1fr; gap: 10px;
  font-size: 15px; color: var(--ink); line-height: 1.5;
}
.clar-tick { color: var(--blue); font-weight: 700; }
.clar-scope-out li {
  display: grid; grid-template-columns: 20px 1fr; gap: 10px; align-items: baseline;
}
.clar-cross { color: var(--ink-dim); font-weight: 600; }
.clar-scope-out strong {
  display: block;
  font-size: 15px; color: var(--ink); font-weight: 600; margin-bottom: 2px;
}
.clar-scope-out span {
  font-size: 13.5px; line-height: 1.5; color: var(--ink-dim);
}

/* ───────── PRICING ───────── */
.clar-pricing {
  display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
}
.clar-plan {
  padding: 36px 32px;
  border: 2px solid var(--ink);
  border-radius: 10px;
  display: flex; flex-direction: column; gap: 18px;
  background: var(--bg);
  position: relative;
}
.clar-plan--secondary {
  border-color: var(--rule);
  background: var(--bg-soft);
}
.clar-plan header { display: flex; flex-direction: column; gap: 10px; }
.clar-plan-kicker {
  display: inline-flex; align-self: flex-start;
  padding: 4px 10px;
  background: var(--blue-soft);
  color: var(--blue-deep);
  border-radius: 999px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10.5px; letter-spacing: 0.12em; font-weight: 600;
  text-transform: uppercase;
}
.clar-plan h3 {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 600;
  font-size: 34px;
  letter-spacing: -0.025em;
  margin: 0;
  color: var(--ink);
}
.clar-plan-price { display: flex; flex-direction: column; gap: 4px; }
.clar-plan-price-n {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 600;
  font-size: 52px; line-height: 1;
  letter-spacing: -0.04em;
  color: var(--ink);
}
.clar-plan-sm {
  font-size: 20px; color: var(--ink-dim); font-weight: 500; letter-spacing: -0.02em;
}
.clar-plan-price-unit {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px; color: var(--ink-dim);
  letter-spacing: 0.1em;
}
.clar-plan-desc {
  font-size: 15px; line-height: 1.58;
  color: var(--ink-2); margin: 0;
}
.clar-plan-list {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 10px;
  padding-top: 16px;
  border-top: 1px solid var(--rule);
}
.clar-plan-list li {
  display: grid; grid-template-columns: 18px 1fr; gap: 10px;
  font-size: 14.5px; color: var(--ink);
}
.clar-plan-list span { color: var(--ochre); font-weight: 700; }
.clar-plan-cta { margin-top: auto; justify-content: center; }

.clar-pricing-note {
  margin-top: 20px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px; color: var(--ink-dim);
  letter-spacing: 0.02em;
  text-align: center;
}

/* ───────── MID ───────── */
.clar-mid {
  max-width: 1320px; margin: 40px auto 0; padding: 0 28px;
}
.clar-mid-inner {
  display: grid; grid-template-columns: 1fr auto;
  gap: 32px; align-items: center;
  padding: 32px 36px;
  background: var(--ink); color: #fff;
  border-radius: 10px;
}
.clar-mid-inner .clar-eyebrow { color: var(--ochre); border-color: var(--ochre); }
.clar-mid-inner h3 {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 500;
  font-size: clamp(22px, 2.4vw, 32px);
  letter-spacing: -0.025em;
  margin: 4px 0 8px;
  line-height: 1.15;
}
.clar-mid-inner p {
  color: rgba(255,255,255,0.7); font-size: 14px; margin: 0;
  max-width: 560px; line-height: 1.55;
}

/* ───────── FAQ ───────── */
.clar-faq {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 0;
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}
.clar-faq-item {
  padding: 28px 32px;
  border-right: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}
.clar-faq-item:nth-child(2n) { border-right: none; }
.clar-faq-item:nth-last-child(-n+2) { border-bottom: none; }
.clar-faq-item h4 {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 600;
  font-size: 19px;
  letter-spacing: -0.015em;
  margin: 0 0 10px;
  color: var(--ink);
}
.clar-faq-item h4::before {
  content: 'Q.  ';
  color: var(--blue); font-weight: 700;
}
.clar-faq-item p {
  font-size: 15px; line-height: 1.6;
  color: var(--ink-2); margin: 0;
}

/* ───────── BOOK ───────── */
.clar-book {
  max-width: 1320px; margin: 0 auto;
  padding: 80px 28px;
}
.clar-book-inner {
  display: grid; grid-template-columns: 1fr 1fr; gap: 56px;
  align-items: start;
  padding: 48px;
  background: var(--bg-soft);
  border: 1px solid var(--rule);
  border-radius: 12px;
}
.clar-book-copy { max-width: 480px; }
.clar-book-copy p {
  font-size: 16px; line-height: 1.58;
  color: var(--ink-2); margin: 18px 0 22px;
}
.clar-book-list {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 10px;
}
.clar-book-list li {
  display: grid; grid-template-columns: 18px 1fr; gap: 10px;
  font-size: 14.5px; color: var(--ink);
}
.clar-book-list span { color: var(--ochre); font-weight: 700; }

.clar-book-form {
  display: flex; flex-direction: column; gap: 16px;
  padding: 32px;
  background: var(--bg);
  border: 1px solid var(--ink);
  border-radius: 8px;
}
.clar-book-form label { display: flex; flex-direction: column; gap: 6px; }
.clar-book-form span {
  font-family: 'Inter Tight', sans-serif;
  font-size: 12px; font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--ink);
}
.clar-book-form input, .clar-book-form textarea {
  background: var(--bg-soft);
  border: 1px solid var(--rule);
  border-radius: 6px;
  padding: 11px 14px;
  font-family: 'Inter Tight', sans-serif;
  font-size: 14.5px; color: var(--ink);
  outline: none; resize: none;
  transition: border-color 180ms;
}
.clar-book-form input::placeholder, .clar-book-form textarea::placeholder {
  color: var(--ink-mute);
}
.clar-book-form input:focus, .clar-book-form textarea:focus { border-color: var(--blue); }
.clar-book-submit { margin-top: 6px; width: 100%; justify-content: center; }
.clar-book-foot {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px; color: var(--ink-dim);
  letter-spacing: 0.1em; text-align: center; margin: 0;
}

/* ───────── FOOTER ───────── */
.clar-foot {
  max-width: 1320px; margin: 0 auto;
  padding: 0 28px 40px;
}
.clar-foot-inner {
  display: flex; justify-content: space-between; flex-wrap: wrap;
  gap: 18px;
  padding-top: 28px;
  border-top: 1px solid var(--rule);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px; color: var(--ink-dim);
  letter-spacing: 0.08em;
}
.clar-foot-brand { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; }
.clar-foot-mark { color: var(--ink); font-weight: 600; font-size: 13px; letter-spacing: -0.01em; text-transform: none; }
.clar-foot-nav { display: flex; gap: 18px; }
.clar-foot-nav a:hover { color: var(--blue); }

/* ───────── RESPONSIVE ───────── */
@media (max-width: 1100px) {
  .clar-hero { grid-template-columns: 1fr; }
  .clar-hero-pilot { position: static; }
  .clar-steps { grid-template-columns: 1fr; }
  .clar-step { border-right: none; border-bottom: 1px solid var(--rule); }
  .clar-step:last-child { border-bottom: none; }
  .clar-scope { grid-template-columns: 1fr; }
  .clar-scope-in { border-right: none; border-bottom: 1px solid var(--rule); }
  .clar-pricing { grid-template-columns: 1fr; }
  .clar-faq { grid-template-columns: 1fr; }
  .clar-faq-item { border-right: none !important; }
  .clar-book-inner { grid-template-columns: 1fr; padding: 32px; }
  .clar-mid-inner { grid-template-columns: 1fr; }
}
@media (max-width: 720px) {
  .clar-nav-links { display: none; }
  .clar-nav-inner { grid-template-columns: 1fr auto; }
  .clar-nav-return { display: none; }
  .clar-hero-trust { gap: 14px; }
  .clar-trust-sep { display: none; }
}
`
