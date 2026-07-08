/*
 * Case-study wording status (do not deploy to production until cleared):
 *  - Legal build: confirm final wording against the Chennai engagement (follow-up 2026-07-17)
 *  - Marketing brief: requires the client's sign-off on the paragraph
 */

const CASES = [
  {
    n: '01',
    vertical: 'Legal',
    title: 'First drafts for a litigation firm',
    body: 'Associates spent afternoons assembling reply drafts from precedent files. The system now produces the first draft from the case record; associates review and shape instead of assembling, and every draft keeps a clean file trail.',
    spec: ['document intake', 'precedent retrieval', 'draft generation', 'review trail'],
  },
  {
    n: '02',
    vertical: 'Marketing',
    title: 'A weekly intelligence brief for an agency CEO',
    body: 'The CEO needed to stay ahead of the AI developments clients ask about, without hiring research staff. The system reads the landscape weekly and delivers a private, decision-ready brief.',
    spec: ['source monitoring', 'relevance filtering', 'synthesis', 'weekly delivery'],
  },
]

export default function Work() {
  return (
    <section id="work" className="relative px-6 md:px-10 py-28" style={{ background: 'var(--bg-grain)' }}>
      <div className="max-w-[1400px] mx-auto">
        <h2 data-reveal className="f-display text-[clamp(28px,3.2vw,42px)] mb-16">
          Recent work
        </h2>

        <div className="flex flex-col gap-0">
          {CASES.map((c, i) => (
            <article
              key={c.n}
              data-reveal
              className="grid grid-cols-12 gap-6 py-14"
              style={{ borderTop: i === 0 ? '1px solid var(--rule)' : 'none', borderBottom: '1px solid var(--rule)' }}
            >
              <div className="col-span-12 md:col-span-3 flex md:flex-col justify-between md:justify-start gap-4">
                <span className="kicker">{c.n}</span>
                <span className="chip w-fit">{c.vertical}</span>
              </div>

              <div className="col-span-12 md:col-span-5">
                <h3 className="f-display text-[clamp(24px,2.6vw,34px)] mb-6">{c.title}</h3>
                <p className="text-[15.5px] leading-[1.65]" style={{ color: 'var(--text-dim)' }}>
                  {c.body}
                </p>
              </div>

              <div className="col-span-12 md:col-span-3 md:col-start-10">
                <div className="kicker mb-3">in the build</div>
                <ul className="flex flex-col gap-2">
                  {c.spec.map((s) => (
                    <li
                      key={s}
                      className="f-mono text-[12px] flex items-center gap-3"
                      style={{ color: 'var(--text-dim)' }}
                    >
                      <span
                        className="inline-block w-1 h-1 rounded-full"
                        style={{ background: 'var(--accent)' }}
                      />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <p data-reveal className="mt-10 text-[13.5px]" style={{ color: 'var(--muted)' }}>
          Client names shared on request, with their permission.
        </p>
      </div>
    </section>
  )
}
