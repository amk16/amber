import { useEffect, useState } from 'react'
import { onAuth, signIn, signOut } from '../lib/auth'
import { watchInquiries, STAGES, STAGE_LABELS } from '../lib/inquiries'
import InquiryDetail from './InquiryDetail'
import { OWNER_EMAIL, fmtAge } from './opsUtil'

export default function OpsApp() {
  const [authState, setAuthState] = useState('loading') // loading | out | denied | in
  const [user, setUser] = useState(null)
  const [inquiries, setInquiries] = useState([])
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    return onAuth((u) => {
      if (!u) return setAuthState('out')
      setUser(u)
      setAuthState(u.email === OWNER_EMAIL ? 'in' : 'denied')
    })
  }, [])

  useEffect(() => {
    if (authState !== 'in') return
    return watchInquiries(setInquiries)
  }, [authState])

  if (authState === 'loading') return <div className="ops-center">…</div>

  if (authState === 'out') {
    return (
      <div className="ops-center">
        <div className="ops-gate">
          <p className="kicker" style={{ color: 'var(--accent)' }}>Archon · Ops</p>
          <h1 className="f-display ops-gate-title">The inquiry desk.</h1>
          <p className="body-copy" style={{ margin: '10px 0 22px' }}>
            Sign in with the studio Google account to read submissions.
          </p>
          <button className="btn-primary" onClick={signIn}>Sign in with Google</button>
        </div>
      </div>
    )
  }

  if (authState === 'denied') {
    return (
      <div className="ops-center">
        <div className="ops-gate">
          <h1 className="f-display ops-gate-title">Not you.</h1>
          <p className="body-copy" style={{ margin: '10px 0 22px' }}>
            {user.email} isn’t the owner account. This desk is private.
          </p>
          <button className="link-quiet" onClick={signOut}>Sign out</button>
        </div>
      </div>
    )
  }

  const selected = inquiries.find((i) => i.id === selectedId) || null
  const byStage = (stage) => inquiries.filter((i) => (i.stage || 'new') === stage)

  return (
    <div className="ops">
      <header className="ops-head">
        <div>
          <span className="kicker" style={{ color: 'var(--accent)' }}>Archon · Ops</span>
          <span className="ops-count">{inquiries.length} inquiries</span>
        </div>
        <button className="link-quiet" onClick={signOut}>Sign out</button>
      </header>

      <div className="ops-board">
        {STAGES.map((stage) => {
          const items = byStage(stage)
          return (
            <section key={stage} className="ops-col">
              <div className="ops-col-head">
                <span className="kicker">{STAGE_LABELS[stage]}</span>
                <span className="ops-col-n">{items.length}</span>
              </div>
              <div className="ops-col-body">
                {items.map((i) => (
                  <button
                    key={i.id}
                    className={'ops-card' + (i.id === selectedId ? ' is-sel' : '')}
                    onClick={() => setSelectedId(i.id)}
                  >
                    <span className="ops-card-name">{i.name}</span>
                    <span className="ops-card-firm">{i.firm}</span>
                    <span className="ops-card-msg">{i.message}</span>
                    <span className="ops-card-age">{fmtAge(i.createdAt)}</span>
                  </button>
                ))}
                {items.length === 0 && <p className="ops-empty">—</p>}
              </div>
            </section>
          )
        })}
      </div>

      {selected && (
        <InquiryDetail
          key={selected.id}
          inquiry={selected}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  )
}
