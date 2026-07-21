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
        // covered by a slip of the chapter's ink asking the question, holds
        // a beat, then slides off right to reveal the ask. Once, on enter.
        // The slip is visibility:hidden in CSS, so without this tween the
        // header simply stands uncovered.
        const slip = root.current.querySelector('[data-cover-slip]')
        if (slip) {
          gsap.set(slip, { autoAlpha: 1 })
          gsap
            .timeline({
              scrollTrigger: {
                trigger: '[data-cover-wrap]',
                start: 'top 75%',
                once: true,
              },
            })
            .to(slip, {
              xPercent: 101,
              duration: 1.4,
              ease: 'power3.inOut',
              delay: 0.6,
            })
            .to(
              slip.firstElementChild,
              { xPercent: -10, duration: 1.4, ease: 'power3.inOut' },
              '<'
            )
            .from(
              '[data-cover-under]',
              { y: 14, duration: 0.8, ease: 'power2.out' },
              '-=0.55'
            )
        }

        // The beam fill (reworked 2026-07-21) — reveal-tier: a beam of
        // accent moves rightward through the Foundation header, filling
        // each word and draining behind it; the last word fills and holds.
        // The hold word's fill is statically open in CSS, so without this
        // tween the finished state simply stands.
        const pass = root.current.querySelector('[data-inkpass]')
        if (pass) {
          const CLOSED = 'inset(-10% 100% -10% 0%)'
          const OPEN = 'inset(-10% 0% -10% 0%)'
          const DRAINED = 'inset(-10% 0% -10% 100%)'
          const tl = gsap.timeline({
            scrollTrigger: { trigger: pass, start: 'top 70%', once: true },
          })
          let t = 0
          pass.querySelectorAll('.beam-word').forEach((w) => {
            const fill = w.querySelector('.beam-fill')
            const hold = w.hasAttribute('data-hold')
            gsap.set(fill, { clipPath: CLOSED }) // JS-only; closes the hold word too
            const inkEm = w.querySelector(':scope > span:first-child em')
            if (inkEm) gsap.set(inkEm, { color: 'var(--text)' })
            tl.fromTo(
              fill,
              { clipPath: CLOSED },
              { clipPath: OPEN, duration: 0.38, ease: 'power2.inOut' },
              t
            )
            if (!hold) {
              tl.to(
                fill,
                { clipPath: DRAINED, duration: 0.38, ease: 'power2.inOut' },
                t + 0.3
              )
            }
            t += 0.34
          })
        }

        // The jobs ticking (2026-07-21) — hero ambient: the three snapshot
        // sentences' marks ignite in sequence, dim to a faint middot as the
        // next takes over, then all fade and the line rests. Runs only while
        // the hero is on screen; the static document shows no marks.
        const marks = gsap.utils.toArray('[data-jobs] .job-mark')
        if (marks.length) {
          const jobs = gsap.timeline({
            repeat: -1,
            repeatDelay: 2.4,
            paused: true,
          })
          marks.forEach((m, i) => {
            const at = i * 1.8
            jobs
              .to(m, { opacity: 1, duration: 0.35, ease: 'power2.out' }, at)
              .to(
                m,
                {
                  opacity: 0.4,
                  color: 'var(--text-dim)',
                  duration: 0.5,
                  ease: 'power1.out',
                },
                at + 1.55
              )
          })
          jobs.to(marks, {
            opacity: 0,
            color: 'var(--accent-display)',
            duration: 0.8,
            ease: 'power1.inOut',
            stagger: 0.08,
          })
          ScrollTrigger.create({
            trigger: '#top',
            start: 'top bottom',
            end: 'bottom top',
            onToggle: (self) => (self.isActive ? jobs.play() : jobs.pause()),
          })
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
