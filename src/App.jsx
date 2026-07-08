import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import Nav from './components/Nav'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Work from './components/Work'
import Foundation from './components/Foundation'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Precision from './experiments/Precision'
import Clarity from './experiments/Clarity'

gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin)

const PALETTES = [
  {
    id: 'paper',
    name: 'Paper',
    desc: 'Warm cream + rust',
    swatch: ['#eee8da', '#cfc7b2', '#c2410c', '#161512'],
  },
  {
    id: 'obsidian',
    name: 'Obsidian',
    desc: 'Carbon + electric lime',
    swatch: ['#0a0a0a', '#232323', '#d4ff3a', '#f3f2ec'],
  },
  {
    id: 'cobalt',
    name: 'Cobalt',
    desc: 'Deep navy + mint',
    swatch: ['#080d1c', '#1c2a4d', '#5eead4', '#e6ecfb'],
  },
  {
    id: 'terminal',
    name: 'Terminal',
    desc: 'Pure black + green',
    swatch: ['#020502', '#14281a', '#39ff88', '#d5f5d8'],
  },
]

export default function App() {
  const [palette, setPalette] = useState('paper')
  const [hash, setHash] = useState(
    typeof window !== 'undefined' ? window.location.hash : ''
  )
  const root = useRef(null)
  const isExperiment = hash === '#/precision' || hash === '#/clarity'

  useEffect(() => {
    document.documentElement.setAttribute('data-palette', palette)
  }, [palette])

  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Global reveal on scroll (hooks stay above the experiment early-return)
  useGSAP(
    () => {
      if (isExperiment) return
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        })
      })

      gsap.utils.toArray('[data-reveal-stagger]').forEach((parent) => {
        const kids = parent.querySelectorAll('[data-reveal-child]')
        gsap.from(kids, {
          y: 32,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: parent,
            start: 'top 80%',
            once: true,
          },
        })
      })
    },
    { scope: root, dependencies: [isExperiment], revertOnUpdate: true }
  )

  if (hash === '#/precision') return <Precision />
  if (hash === '#/clarity') return <Clarity />

  return (
    <div ref={root} className="min-h-screen">
      <Nav palettes={PALETTES} current={palette} onChange={setPalette} />
      <main>
        <Hero />
        <HowItWorks />
        <Work />
        <Foundation />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
