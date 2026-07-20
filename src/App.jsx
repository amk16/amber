import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Method from './components/Method'
import Proof from './components/Proof'
import Foundation from './components/Foundation'
import Close from './components/Close'
import Footer from './components/Footer'
import IntakeModal from './components/IntakeModal'
import { IntakeProvider } from './intake/IntakeContext'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function App() {
  const root = useRef(null)
  const chapter = useRef(null)

  useGSAP(
    () => {
      // Nav ink flips over the dark chapter. An instant attribute swap,
      // not motion: it runs regardless of prefers-reduced-motion.
      const nav = root.current.querySelector('.site-nav')
      ScrollTrigger.create({
        trigger: chapter.current,
        start: 'top 44px',
        end: 'bottom 44px',
        onToggle: (self) =>
          nav.setAttribute('data-ink', self.isActive ? 'dark' : 'light'),
      })

      // Newsreader loads late enough to move trigger positions; re-measure.
      if (document.fonts?.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh())
      }

      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Quiet reveals: rise ≤ 24px, once. Above-the-fold elements get a
        // small cascade so the first paint reads as typesetting, not a pop.
        let foldIndex = 0
        gsap.utils.toArray('[data-reveal]').forEach((el) => {
          const inFold =
            el.getBoundingClientRect().top < window.innerHeight * 0.85
          gsap.from(el, {
            y: 24,
            autoAlpha: 0,
            duration: 0.9,
            ease: 'power2.out',
            delay: inFold ? 0.12 * foldIndex++ : 0,
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          })
        })

        gsap.utils.toArray('[data-reveal-stagger]').forEach((parent) => {
          gsap.from(parent.querySelectorAll('[data-reveal-child]'), {
            y: 20,
            autoAlpha: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.09,
            scrollTrigger: { trigger: parent, start: 'top 82%', once: true },
          })
        })

        // THE SET-PIECE — the flip. The proof chapter's ground crossfades
        // from paper to dark ink as it enters, and back as it leaves.
        // The chapter is statically dark in CSS, so without this tween
        // (no JS, reduced motion) the page is complete and still flips.
        const cs = getComputedStyle(document.documentElement)
        const v = (name) => cs.getPropertyValue(name).trim()
        const paper = {
          '--ch-bg': v('--bg'),
          '--ch-text': v('--text'),
          '--ch-dim': v('--text-dim'),
          '--ch-rule': v('--rule'),
        }
        const ink = {
          '--ch-bg': v('--flip-bg'),
          '--ch-text': v('--flip-text'),
          '--ch-dim': v('--flip-dim'),
          '--ch-rule': v('--flip-rule'),
        }

        gsap.fromTo(chapter.current, paper, {
          ...ink,
          ease: 'none',
          scrollTrigger: {
            trigger: chapter.current,
            start: 'top 75%',
            end: 'top 25%',
            scrub: true,
          },
        })
        gsap.fromTo(chapter.current, ink, {
          ...paper,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: chapter.current,
            start: 'bottom 75%',
            end: 'bottom 25%',
            scrub: true,
          },
        })

        // The cover-slip (amendment 2026-07-21) — the one scripted moment
        // beside the flip, and subordinate to it: the Close header arrives
        // covered by a slip of the chapter's ink asking the question. On
        // enter it holds a beat, the question lifts away, and the ink —
        // sliced into strips — pulls upward at staggered speeds, so the
        // reveal fills like a cup, the uncovering line rising unevenly.
        // Once. visibility:hidden in CSS keeps the static page complete.
        const slip = root.current.querySelector('[data-cover-slip]')
        if (slip) {
          const strips = slip.querySelectorAll('[data-cover-strip]')
          gsap.set(slip, { autoAlpha: 1 })
          gsap
            .timeline({
              scrollTrigger: {
                trigger: '[data-cover-wrap]',
                start: 'top 75%',
                once: true,
              },
            })
            .to(
              '[data-cover-text]',
              { autoAlpha: 0, y: -24, duration: 0.5, ease: 'power2.in' },
              0.6
            )
            .to(
              strips,
              {
                yPercent: -101,
                // staggered speeds: neighbours drain at different rates
                duration: (i) => 0.9 + (i % 4) * 0.18,
                ease: 'power3.inOut',
                stagger: { each: 0.07, from: 'edges' },
              },
              0.85
            )
            .from(
              '[data-cover-under]',
              { y: 14, duration: 0.8, ease: 'power2.out' },
              '-=0.9'
            )
        }

        // The ink pass (2026-07-21) — reveal-tier, not a set-piece: the
        // accent travels the Foundation header like a proof-reader's pen,
        // each letter tinting and releasing with a soft trail, and settles
        // on the word it was always going to choose. The em is accent in
        // static CSS, so without this tween the end state simply stands.
        const pass = root.current.querySelector('[data-inkpass]')
        if (pass) {
          const chars = pass.querySelectorAll('[data-ch]')
          const free = [...chars].filter((c) => !c.hasAttribute('data-hold'))
          const hold = pass.querySelectorAll('[data-hold]')
          gsap.set(hold, { color: 'var(--text)' }) // starts as ink; JS-only
          gsap
            .timeline({
              scrollTrigger: { trigger: pass, start: 'top 70%', once: true },
            })
            .to(
              chars,
              {
                color: 'var(--accent-display)',
                duration: 0.16,
                stagger: 0.045,
                ease: 'power1.in',
              },
              0
            )
            .to(
              free,
              {
                color: 'var(--text)',
                duration: 0.3,
                stagger: 0.045,
                ease: 'power1.out',
              },
              0.4
            )
        }
      })
    },
    { scope: root }
  )

  return (
    <IntakeProvider>
      <div ref={root}>
        <Nav />
        <main>
          <Hero />
          <Method />
          <div ref={chapter} className="chapter-dark">
            <Proof />
            <Foundation />
          </div>
          <Close />
        </main>
        <Footer />
      </div>
      <IntakeModal />
    </IntakeProvider>
  )
}
