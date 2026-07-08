import { SITE } from '../config'
import { ArchonMark } from './Nav'

export default function Footer() {
  return (
    <footer
      className="px-6 md:px-10 py-10"
      style={{ borderTop: '1px solid var(--rule)', background: 'var(--bg-grain)' }}
    >
      <div className="max-w-[1400px] mx-auto flex flex-wrap justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <ArchonMark size={22} />
          <span className="f-display text-[14px]">Archon Systems</span>
          <span className="kicker ml-2">© 2026</span>
        </div>

        <nav
          className="flex flex-wrap gap-6 f-mono text-[11px] uppercase tracking-[0.14em]"
          style={{ color: 'var(--text-dim)' }}
        >
          <a href={`mailto:${SITE.email}`} className="link-under">{SITE.email}</a>
          <a href={SITE.linkedin} className="link-under" target="_blank" rel="noreferrer">LinkedIn</a>
        </nav>
      </div>
    </footer>
  )
}
