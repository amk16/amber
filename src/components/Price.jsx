/* The money page is the quietest block on the site (selling memo #8): ledger
   rows, published numbers, accent reserved for the CTA. Checkpoint law decided
   2026-07-21 — Blueprint paid upfront, build checkpoints paid on acceptance. */

import { useIntake } from '../intake/IntakeContext'

const TERMS = [
  {
    n: '01',
    name: 'The assessment.',
    body: 'Twenty minutes on how your work flows, then a written assessment within 48 hours — what we’d fix, sized options, honest numbers. Yours to keep either way.',
    price: 'Free',
  },
  {
    n: '02',
    name: 'The blueprint.',
    body: 'Checkpoint zero, paid to begin. Research into your workflow, returned as the full build plan — every checkpoint named and priced, with plain acceptance criteria. One revision round with you, then it freezes. The plan is yours — it works with any builder.',
    price: '$1,500–3,000',
  },
  {
    n: '03',
    name: 'The build.',
    body: 'Typically three to five checkpoints, each shipping something you can see running. Pay for a checkpoint when you accept it — and stop at any one, owing nothing further, keeping everything shipped.',
    price: '$3,000–8,000',
  },
  {
    n: '04',
    name: 'The care.',
    body: 'Hosted, monitored, sharpened as real usage teaches us what matters. Monthly, cancel anytime. First month included with any build.',
    price: 'from $500/mo',
  },
]

export default function Price() {
  const { open } = useIntake()
  return (
    <section id="price" className="px-6 pt-28 md:px-10 md:pt-40">
      <div className="mx-auto max-w-[1200px]">
        <p className="kicker" data-reveal>
          <b>C/01</b>&ensp;—&ensp;Terms
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-6">
          <h2
            className="f-display text-[clamp(2.5rem,5.4vw,4.6rem)] md:col-span-7"
            data-reveal
          >
            Pay for what <em>ships</em>.
          </h2>
          <p
            className="body-copy self-end text-[16.5px] md:col-span-4 md:col-start-9"
            data-reveal
          >
            Prices published, fixed, never hourly. Every engagement is a
            sequence of checkpoints — each one named, priced, and accepted
            before the next begins.
          </p>
        </div>

        <div className="mt-16 md:mt-24" data-reveal-stagger>
          {TERMS.map((t) => (
            <div key={t.n} className="ledger-row" data-reveal-child>
              <span className="f-mono text-[13px] tracking-[0.08em] text-[var(--accent-display)]">
                {t.n}
              </span>
              <p className="m-0 max-w-[58ch] text-[17px] leading-[1.55]">
                <span className="f-serif text-[21px] text-[var(--text)]">
                  {t.name}
                </span>{' '}
                <span className="text-[var(--text-dim)]">{t.body}</span>
              </p>
              <span className="row-meta kicker whitespace-nowrap">
                {t.price}
              </span>
            </div>
          ))}
        </div>

        <div
          className="mt-12 flex flex-col gap-8 md:mt-16 md:flex-row md:items-center md:justify-between"
          data-reveal
        >
          <p className="m-0 max-w-[58ch] text-[13px] leading-[1.7] text-[var(--text-dim)]">
            A checkpoint’s terms hold for 30 days · the next checkpoint begins
            when the last is settled · acceptance within five business days of
            delivery · budget pressure removes checkpoints — it never
            discounts one.
          </p>
          <button type="button" onClick={open} className="btn-primary shrink-0">
            Book a meeting <span className="arr" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}
