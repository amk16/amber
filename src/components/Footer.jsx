export default function Footer() {
  return (
    <footer
      className="px-6 md:px-10 py-10"
      style={{ borderTop: '1px solid var(--rule)', background: 'var(--bg-grain)' }}
    >
      <div className="max-w-[1400px] mx-auto flex flex-wrap justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
            <rect x="0.5" y="0.5" width="27" height="27" rx="4" stroke="var(--text)" strokeOpacity="0.6" />
            <path d="M7 14 L13 14 L13 8 L21 8" stroke="var(--text)" strokeWidth="1.3" fill="none" />
            <path d="M7 20 L15 20 L15 14 L21 14 L21 20" stroke="var(--accent)" strokeWidth="1.3" fill="none" />
          </svg>
          <span className="f-display text-[14px]">solutions</span>
          <span className="kicker ml-2">© 2026</span>
        </div>

        <nav className="flex flex-wrap gap-6 f-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: 'var(--text-dim)' }}>
          <a href="#/precision" className="link-under" style={{ color: 'var(--accent)' }}>Precision ↗</a>
          <a href="#" className="link-under">Manifesto</a>
          <a href="#" className="link-under">Privacy</a>
          <a href="#" className="link-under">Terms</a>
          <a href="#" className="link-under">LinkedIn</a>
          <a href="#" className="link-under">GitHub</a>
        </nav>

        <span className="kicker">Built in transit · 42.36°N 71.06°W</span>
      </div>
    </footer>
  )
}
