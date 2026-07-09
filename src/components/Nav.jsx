import { SITE } from '../config'

const LINKS = [
  { href: '#method', label: 'Method' },
  { href: '#proof', label: 'Proof' },
  { href: '#foundation', label: 'Foundation' },
]

export default function Nav() {
  return (
    <header className="site-nav fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-6 py-4 md:px-10">
        <a
          href="#top"
          className="f-serif text-[19px] leading-none tracking-[-0.01em] text-current no-underline"
        >
          Archon <span className="not-italic" style={{ fontWeight: 440 }}>Systems</span>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </nav>

        <a href={SITE.calendar} className="btn-primary !px-5 !py-3">
          Book 20 minutes
        </a>
      </div>
    </header>
  )
}
