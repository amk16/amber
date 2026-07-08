const GUARANTEES = [
  ['Your data lives in your own deployment', 'not shared, not used to train anything'],
  ['You own your system', 'deployment and customizations are yours, in writing'],
  ['Fixed price, no hourly meter', 'the number is agreed before work starts'],
]

const STACK = [
  'Python', 'FastAPI', 'Postgres', 'React', 'Next.js', 'Claude', 'PyTorch', 'Vercel',
]

export default function Foundation() {
  return (
    <section id="foundation" className="relative px-6 md:px-10 py-28">
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-6">
        <div data-reveal className="col-span-12 mb-10">
          <span className="section-index">
            <span className="led" />
            §3 · The foundation
          </span>
        </div>

        <div data-reveal className="col-span-12 lg:col-span-7">
          <h2 className="f-display text-[clamp(30px,4vw,52px)] mb-8">
            Built by an engineer,<br />
            not assembled from <span className="f-serif" style={{ color: 'var(--accent)' }}>parts.</span>
          </h2>
          <p className="text-[16.5px] leading-[1.65] max-w-[58ch]" style={{ color: 'var(--text-dim)' }}>
            The foundation behind these builds spans production ML pipelines, robotics
            research, and agent systems. Which means when your workflow needs something
            custom, custom is what it gets, not a no-code tool bent out of shape.
          </p>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 f-mono text-[12px]" style={{ color: 'var(--muted)' }}>
            {STACK.map((t, i) => (
              <span key={t} className="flex items-center gap-6">
                <span>{t}</span>
                {i < STACK.length - 1 && <span style={{ color: 'var(--border-strong)' }}>·</span>}
              </span>
            ))}
          </div>
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
              <div className="f-mono text-[12px]" style={{ color: 'var(--muted)' }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
