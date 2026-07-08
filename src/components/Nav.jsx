import { useEffect, useState } from 'react'
import { SITE } from '../config'

export function ArchonMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <rect x="0.5" y="0.5" width="27" height="27" rx="4" stroke="var(--text)" strokeOpacity="0.6" />
      {/* A as a load-bearing truss */}
      <path d="M7 21 L14 7 L21 21" stroke="var(--text)" strokeWidth="1.3" fill="none" />
      <path d="M10.2 15 H17.8" stroke="var(--accent)" strokeWidth="1.3" />
      <circle cx="14" cy="7" r="1.6" fill="var(--accent)" />
    </svg>
  )
}

export default function Nav({ palettes, current, onChange }) {
  const [open, setOpen] = useState(false)
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      const d = new Date()
      const hh = String(d.getUTCHours()).padStart(2, '0')
      const mm = String(d.getUTCMinutes()).padStart(2, '0')
      setTime(`${hh}:${mm} UTC`)
    }
    tick()
    const i = setInterval(tick, 30_000)
    return () => clearInterval(i)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className="flex items-center justify-between px-6 md:px-10 py-4 backdrop-blur-md"
        style={{
          background: 'color-mix(in oklab, var(--bg) 70%, transparent)',
          borderBottom: '1px solid var(--rule)',
        }}
      >
        <a href="#" className="flex items-center gap-3">
          <ArchonMark />
          <div className="flex flex-col leading-none">
            <span className="f-display text-[15px]" style={{ letterSpacing: '-0.02em' }}>
              Archon Systems
            </span>
            <span className="kicker" style={{ fontSize: 9 }}>
              {SITE.tagline}
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8 f-mono text-[12px] uppercase tracking-[0.15em]">
          <a href="#how" className="link-under">How it works</a>
          <a href="#work" className="link-under">Recent work</a>
          <a href="#foundation" className="link-under">Foundation</a>
        </nav>

        <div className="flex items-center gap-3 md:gap-5">
          <span className="hidden md:inline f-mono text-[11px]" style={{ color: 'var(--text-dim)' }}>
            {time}
          </span>

          {/* Palette switcher — design-review tool; hide before production deploy */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="relative flex items-center gap-2 px-3 py-2 rounded-full"
            style={{
              border: '1px solid var(--border)',
              background: 'color-mix(in oklab, var(--surface) 80%, transparent)',
            }}
          >
            <span
              className="swatch"
              style={{
                '--s1': palettes.find((p) => p.id === current).swatch[0],
                '--s2': palettes.find((p) => p.id === current).swatch[1],
                '--s3': palettes.find((p) => p.id === current).swatch[2],
                '--s4': palettes.find((p) => p.id === current).swatch[3],
                width: 14,
                height: 14,
              }}
            />
            <span className="f-mono text-[11px] uppercase tracking-[0.14em]">
              {palettes.find((p) => p.id === current).name}
            </span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 3.5 L5 6.5 L8 3.5" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </button>

          {open && (
            <div
              className="absolute right-6 md:right-10 top-16 p-2 rounded-lg"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border-strong)',
                boxShadow: '0 20px 60px -12px rgba(0,0,0,0.25)',
                minWidth: 240,
              }}
            >
              <div className="px-3 pt-2 pb-3">
                <div className="kicker mb-2">Color system</div>
                <div className="flex flex-col gap-1">
                  {palettes.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onChange(p.id)
                        setOpen(false)
                      }}
                      className="flex items-center gap-3 px-2 py-2 rounded text-left"
                      style={{
                        background:
                          current === p.id
                            ? 'color-mix(in oklab, var(--accent) 12%, transparent)'
                            : 'transparent',
                      }}
                    >
                      <span
                        className="swatch"
                        style={{
                          '--s1': p.swatch[0],
                          '--s2': p.swatch[1],
                          '--s3': p.swatch[2],
                          '--s4': p.swatch[3],
                        }}
                      />
                      <span className="flex flex-col">
                        <span className="f-mono text-[12px] uppercase tracking-[0.14em]">{p.name}</span>
                        <span className="text-[11px]" style={{ color: 'var(--muted)' }}>{p.desc}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <a href={SITE.calendar} className="btn-primary hidden md:inline-flex">
            Book 20 minutes
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 9 L9 1 M4 1 H9 V6" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  )
}
