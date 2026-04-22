import { useRef } from 'react'

const CAPS = [
  {
    code: 'CAP · 01',
    title: 'Workflow automation',
    body:
      'Agents embedded into your ops tools — tickets, CRM, ERP — so decisions happen in seconds, not in Slack threads.',
    stack: ['LangGraph', 'Zapier', 'n8n', 'Temporal'],
    diagram: (
      <g>
        <rect x="10" y="24" width="50" height="16" rx="2" fill="var(--surface-2)" stroke="var(--border-strong)" />
        <rect x="72" y="16" width="50" height="16" rx="2" fill="var(--surface-2)" stroke="var(--border-strong)" />
        <rect x="72" y="40" width="50" height="16" rx="2" fill="var(--surface-2)" stroke="var(--border-strong)" />
        <rect x="134" y="32" width="50" height="16" rx="2" fill="color-mix(in oklab, var(--accent) 18%, var(--surface-2))" stroke="var(--accent)" />
        <path d="M60 32 L72 24" stroke="var(--text-dim)" />
        <path d="M60 32 L72 48" stroke="var(--text-dim)" />
        <path d="M122 24 L134 40" stroke="var(--accent)" />
        <path d="M122 48 L134 40" stroke="var(--accent)" />
      </g>
    ),
  },
  {
    code: 'CAP · 02',
    title: 'Dashboard intelligence',
    body:
      'The charts you already ship, augmented with an agent that explains anomalies, drafts commentary, and suggests next steps.',
    stack: ['Looker', 'Metabase', 'Tableau', 'Superset'],
    diagram: (
      <g>
        <rect x="16" y="14" width="168" height="50" rx="3" fill="var(--surface-2)" stroke="var(--border-strong)" />
        <polyline points="26,54 50,40 72,46 96,28 120,34 144,20 172,24" fill="none" stroke="var(--accent)" strokeWidth="1.4" />
        <circle cx="96" cy="28" r="3" fill="var(--accent)" />
        <rect x="104" y="30" width="52" height="14" rx="2" fill="var(--surface)" stroke="var(--accent)" />
        <line x1="108" y1="37" x2="150" y2="37" stroke="var(--text-dim)" strokeDasharray="2 2" />
      </g>
    ),
  },
  {
    code: 'CAP · 03',
    title: 'Data pipeline AI',
    body:
      'We tune, harden, and wire LLMs into dbt, Airflow, and Kafka — so the pipeline itself gets smarter as data lands.',
    stack: ['dbt', 'Airflow', 'Kafka', 'Snowflake'],
    diagram: (
      <g>
        {[30, 80, 130].map((x, i) => (
          <circle key={i} cx={x} cy={32} r={12} fill="var(--surface-2)" stroke="var(--border-strong)" />
        ))}
        <circle cx={180} cy={32} r={14} fill="color-mix(in oklab, var(--accent) 22%, var(--surface-2))" stroke="var(--accent)" />
        <line x1={42} y1={32} x2={68} y2={32} stroke="var(--text-dim)" />
        <line x1={92} y1={32} x2={118} y2={32} stroke="var(--text-dim)" />
        <line x1={142} y1={32} x2={166} y2={32} stroke="var(--accent)" />
        <text x={30} y={36} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="var(--text-dim)">raw</text>
        <text x={80} y={36} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="var(--text-dim)">stage</text>
        <text x={130} y={36} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="var(--text-dim)">model</text>
        <text x={180} y={37} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="var(--accent)">infer</text>
      </g>
    ),
  },
  {
    code: 'CAP · 04',
    title: 'Custom model integration',
    body:
      'When off-the-shelf isn’t enough: fine-tunes, RAG over your private corpus, and evals you actually trust in production.',
    stack: ['OpenAI', 'Anthropic', 'Pinecone', 'Weights&Biases'],
    diagram: (
      <g>
        <rect x="20" y="20" width="60" height="40" rx="3" fill="var(--surface-2)" stroke="var(--border-strong)" />
        <text x="50" y="36" textAnchor="middle" fontFamily="Syne" fontSize="10" fill="var(--text)">corpus</text>
        <text x="50" y="50" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="var(--text-dim)">private</text>
        <path d="M80 40 L120 40" stroke="var(--accent)" strokeDasharray="3 3" />
        <polygon points="120,38 120,42 126,40" fill="var(--accent)" />
        <rect x="126" y="20" width="60" height="40" rx="3" fill="color-mix(in oklab, var(--accent) 14%, var(--surface-2))" stroke="var(--accent)" />
        <text x="156" y="36" textAnchor="middle" fontFamily="Syne" fontSize="10" fill="var(--text)">model</text>
        <text x="156" y="50" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="var(--accent)">fine-tuned</text>
      </g>
    ),
  },
]

export default function Capabilities() {
  const track = useRef(null)

  return (
    <section
      id="capabilities"
      className="relative py-32 px-6 md:px-10"
      style={{ borderTop: '1px solid var(--rule)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-30 schematic-grid"
        aria-hidden
      />
      <div className="relative max-w-[1400px] mx-auto">
        <div
          data-reveal
          className="flex flex-wrap items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="section-index mb-6">
              <span className="led" />
              <span>03 / Capabilities</span>
            </div>
            <h2
              className="f-display"
              style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', maxWidth: 860 }}
            >
              Four patterns.
              <br />
              <span className="f-serif" style={{ color: 'var(--accent)' }}>Infinite </span>
              compositions.
            </h2>
          </div>
          <p
            className="max-w-[360px] text-[15px]"
            style={{ color: 'var(--text-dim)' }}
          >
            Every engagement starts with these primitives and ends somewhere specific
            to your team. No templates, no demos masquerading as products.
          </p>
        </div>

        <div
          ref={track}
          data-reveal-stagger
          className="grid grid-cols-12 gap-6"
        >
          {CAPS.map((c, i) => (
            <article
              key={c.code}
              data-reveal-child
              className="card col-span-12 md:col-span-6 p-8 rounded-xl flex flex-col gap-6 min-h-[360px]"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
                e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
              }}
            >
              <header className="flex items-center justify-between">
                <span className="kicker" style={{ color: 'var(--accent)' }}>
                  {c.code}
                </span>
                <span
                  className="f-mono text-[10px]"
                  style={{ color: 'var(--text-dim)' }}
                >
                  0{i + 1} / 04
                </span>
              </header>

              <svg viewBox="0 0 200 80" className="w-full h-20">
                <line x1="0" y1="40" x2="200" y2="40" stroke="var(--rule)" strokeDasharray="2 4" />
                {c.diagram}
              </svg>

              <h3 className="f-display text-[28px]" style={{ letterSpacing: '-0.025em' }}>
                {c.title}
              </h3>
              <p
                className="text-[15px] leading-[1.6]"
                style={{ color: 'var(--text-dim)' }}
              >
                {c.body}
              </p>

              <div className="mt-auto pt-4 border-t" style={{ borderColor: 'var(--rule)' }}>
                <div className="flex flex-wrap gap-2">
                  {c.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
