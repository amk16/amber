const GUARANTEES = [
  ['Your data stays in your deployment', 'not shared, not used to train anything'],
  ['You own the system', 'deployment and customizations are yours, in writing'],
  ['Fixed price', 'agreed before work starts; no hourly billing'],
]

export default function Foundation() {
  return (
    <section id="foundation" className="relative px-6 md:px-10 py-28">
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-6">
        <div data-reveal className="col-span-12 lg:col-span-7">
          <h2 className="f-display text-[clamp(28px,3.6vw,48px)] mb-8">
            Engineered, <span style={{ color: 'var(--accent)' }}>not assembled.</span>
          </h2>
          <p className="text-[16.5px] leading-[1.65] max-w-[58ch]" style={{ color: 'var(--text-dim)' }}>
            Archon builds on production machine-learning and agent-systems engineering.
            When your workflow needs something custom, it gets custom, not a no-code
            template bent out of shape. That is the difference between a tool your team
            tolerates and a system it relies on.
          </p>
        </div>

        <div data-reveal-stagger className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col">
          <div className="kicker mb-4">every build, in writing</div>
          {GUARANTEES.map(([head, sub], i) => (
            <div
              key={head}
              data-reveal-child
              className="py-5"
              style={{ borderTop: '1px solid var(--rule)', borderBottom: i === GUARANTEES.length - 1 ? '1px solid var(--rule)' : 'none' }}
            >
              <div className="text-[15px] mb-1">{head}</div>
              <div className="text-[12.5px]" style={{ color: 'var(--muted)' }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
