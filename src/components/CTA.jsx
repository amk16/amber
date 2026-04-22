import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function CTA() {
  const root = useRef(null)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // orbit rings
      gsap.to('[data-ring]', {
        rotate: 360,
        repeat: -1,
        duration: 28,
        ease: 'none',
        transformOrigin: '50% 50%',
      })
      gsap.to('[data-ring-2]', {
        rotate: -360,
        repeat: -1,
        duration: 44,
        ease: 'none',
        transformOrigin: '50% 50%',
      })

      // orbiting dot
      gsap.to('[data-orbit]', {
        rotate: 360,
        repeat: -1,
        duration: 12,
        ease: 'none',
        transformOrigin: '50% 50%',
      })

      // headline reveal
      gsap.from('[data-cta-line]', {
        yPercent: 110,
        duration: 1,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 70%',
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={root}
      className="relative py-40 px-6 md:px-10 overflow-hidden"
      style={{ borderTop: '1px solid var(--rule)' }}
    >
      {/* orbit backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          viewBox="-200 -200 400 400"
          className="w-[min(120vw,1200px)] h-[min(120vw,1200px)] opacity-50"
        >
          <circle
            data-ring
            r="180"
            fill="none"
            stroke="var(--border-strong)"
            strokeDasharray="2 6"
          />
          <circle
            data-ring-2
            r="130"
            fill="none"
            stroke="var(--border)"
            strokeDasharray="1 10"
          />
          <circle r="80" fill="none" stroke="var(--rule)" />
          <g data-orbit>
            <circle
              cx="180"
              cy="0"
              r="4"
              fill="var(--accent)"
              style={{ filter: 'drop-shadow(0 0 8px var(--accent))' }}
            />
          </g>
          <g data-orbit>
            <circle cx="0" cy="130" r="2" fill="var(--text-dim)" />
          </g>
        </svg>
      </div>

      <div className="relative max-w-[1000px] mx-auto text-center">
        <div className="flex justify-center mb-8">
          <div className="section-index">
            <span className="led" />
            <span>05 / Let’s build</span>
          </div>
        </div>

        <h2
          className="f-display mx-auto"
          style={{
            fontSize: 'clamp(44px, 8vw, 128px)',
            lineHeight: 0.92,
          }}
        >
          <div className="overflow-hidden">
            <span data-cta-line className="inline-block">Let’s engineer</span>
          </div>
          <div className="overflow-hidden">
            <span data-cta-line className="inline-block">
              the{' '}
              <span className="f-serif" style={{ color: 'var(--accent)' }}>
                bridge
              </span>
              .
            </span>
          </div>
        </h2>

        <p
          className="mt-8 max-w-[520px] mx-auto text-[16px]"
          style={{ color: 'var(--text-dim)' }}
        >
          Send us a line. We’ll respond with a 30-minute audit slot and a short
          questionnaire — no decks, no sales choreography.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (!email) return
            setSent(true)
          }}
          className="mt-10 mx-auto flex items-center gap-2 max-w-[520px] p-2 rounded-full"
          style={{
            border: '1px solid var(--border-strong)',
            background:
              'color-mix(in oklab, var(--surface) 70%, transparent)',
          }}
        >
          <input
            required
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent px-4 py-3 outline-none text-[15px]"
            style={{ color: 'var(--text)' }}
          />
          <button type="submit" className="btn-primary">
            {sent ? '✓ Received' : 'Request audit'}
            {!sent && (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M1 5 H9 M5.5 1.5 L9 5 L5.5 8.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
              </svg>
            )}
          </button>
        </form>

        <div className="mt-14 flex flex-wrap justify-center gap-8 f-mono text-[11px]" style={{ color: 'var(--text-dim)' }}>
          <span>SOC2 engagement posture</span>
          <span style={{ color: 'var(--border-strong)' }}>◆</span>
          <span>NDA-first discovery</span>
          <span style={{ color: 'var(--border-strong)' }}>◆</span>
          <span>10-week guarantee</span>
        </div>
      </div>
    </section>
  )
}
