import { SITE } from '../config'

export default function CTA() {
  return (
    <section
      id="book"
      className="relative px-6 md:px-10 py-32 overflow-hidden"
      style={{ background: 'var(--bg-grain)', borderTop: '1px solid var(--rule)' }}
    >
      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />
      <div className="relative max-w-[900px] mx-auto text-center">
        <div data-reveal className="kicker mb-8">work with us</div>
        <h2 data-reveal className="f-display" style={{ fontSize: 'clamp(36px,5.5vw,72px)' }}>
          If paperwork is eating your firm’s week,
          <br />
          the first step is{' '}
          <span className="f-serif" style={{ color: 'var(--accent)' }}>twenty minutes.</span>
        </h2>
        <p data-reveal className="mt-8 text-[16px] max-w-[52ch] mx-auto" style={{ color: 'var(--text-dim)' }}>
          A short call, then a written assessment within 48 hours: what we’d fix,
          what it costs, whether it’s worth it. Yours to keep either way.
        </p>
        <div data-reveal className="mt-12 flex items-center justify-center gap-3 flex-wrap">
          <a href={SITE.calendar} className="btn-primary">
            Book 20 minutes
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 5 H9 M5.5 1.5 L9 5 L5.5 8.5" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </a>
          <a href={`mailto:${SITE.email}`} className="btn-ghost">
            {SITE.email}
          </a>
        </div>
      </div>
    </section>
  )
}
