/*
 * Case-study wording status (do not deploy to production until cleared):
 *  - Legal build: confirm final wording against the Chennai engagement (follow-up 2026-07-17)
 *  - Pulse: requires Kajol's sign-off on the paragraph
 */

const CASES = [
  {
    index: 'CASE · 01',
    vertical: 'Legal',
    title: 'First drafts for a litigation firm',
    before:
      'A law firm handling hospital matters spent afternoons assembling reply drafts from precedent files.',
    after:
      'A drafting system now produces the first draft from the case record. Associates shape instead of assemble, and the file trail stays clean.',
    spec: ['document intake', 'precedent retrieval', 'draft generation', 'review trail'],
  },
  {
    index: 'CASE · 02',
    vertical: 'Marketing',
    title: 'An intelligence brief for a marketing CEO',
    before:
      'A marketing-agency CEO needed to stay ahead of the AI developments her clients ask about, without hiring research staff.',
    after:
      'A pipeline that reads the landscape weekly and writes her a private, decision-ready brief.',
    spec: ['source monitoring', 'relevance filtering', 'synthesis', 'weekly delivery'],
  },
]

export default function Work() {
  return (
    <section id="work" className="relative px-6 md:px-10 py-28" style={{ background: 'var(--bg-grain)' }}>
      <div className="max-w-[1400px] mx-auto">
        <div data-reveal className="flex items-center justify-between mb-16 flex-wrap gap-4">
          <span className="section-index">
            <span className="led" />
            §2 · Recent work
          </span>
          <span className="kicker">real engagements · no logo walls</span>
        </div>

        <div className="flex flex-col gap-0">
          {CASES.map((c, i) => (
            <article
              key={c.index}
              data-reveal
              className="grid grid-cols-12 gap-6 py-14"
              style={{ borderTop: i === 0 ? '1px solid var(--rule)' : 'none', borderBottom: '1px solid var(--rule)' }}
            >
              <div className="col-span-12 md:col-span-3 flex md:flex-col justify-between md:justify-start gap-4">
                <span className="kicker">{c.index}</span>
                <span className="chip w-fit">{c.vertical}</span>
              </div>

              <div className="col-span-12 md:col-span-5">
                <h3 className="f-display text-[clamp(26px,3vw,38px)] mb-6">{c.title}</h3>
                <p className="text-[15.5px] leading-[1.65]" style={{ color: 'var(--text-dim)' }}>
                  {c.before}{' '}
                  <span style={{ color: 'var(--text)' }}>{c.after}</span>
                </p>
              </div>

              <div className="col-span-12 md:col-span-3 md:col-start-10">
                <div className="kicker mb-3">system spec</div>
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

        <p data-reveal className="mt-10 text-[14px] f-mono" style={{ color: 'var(--muted)' }}>
          Client names shared on request, with their permission.
        </p>
      </div>
    </section>
  )
}
