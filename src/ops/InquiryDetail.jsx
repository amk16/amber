import { useEffect, useState } from 'react'
import {
  watchEvents,
  setStage,
  addNote,
  STAGES,
  STAGE_LABELS,
} from '../lib/inquiries'
import { fmtWhen } from './opsUtil'

export default function InquiryDetail({ inquiry, onClose }) {
  const [events, setEvents] = useState([])
  const [note, setNote] = useState('')
  const [busy, setBusy] = useState(false)

  // Parent keys this component by inquiry.id, so it remounts (fresh events
  // state) per inquiry — no manual reset needed.
  useEffect(() => watchEvents(inquiry.id, setEvents), [inquiry.id])

  const move = async (to) => {
    if (to === inquiry.stage || busy) return
    setBusy(true)
    try {
      await setStage(inquiry.id, inquiry.stage || 'new', to)
    } finally {
      setBusy(false)
    }
  }

  const submitNote = async (e) => {
    e.preventDefault()
    const text = note.trim()
    if (!text || busy) return
    setBusy(true)
    try {
      await addNote(inquiry.id, text)
      setNote('')
    } finally {
      setBusy(false)
    }
  }

  return (
    <aside className="ops-detail">
      <div className="ops-detail-head">
        <span className="kicker" style={{ color: 'var(--accent)' }}>Inquiry</span>
        <button className="intake-x" onClick={onClose} aria-label="Close">✕</button>
      </div>

      <h2 className="f-display ops-detail-name">{inquiry.name}</h2>
      <p className="ops-detail-firm">{inquiry.firm}</p>

      <dl className="ops-meta">
        <div><dt className="kicker">Email</dt><dd><a href={`mailto:${inquiry.email}`}>{inquiry.email}</a></dd></div>
        {inquiry.firmSize && <div><dt className="kicker">Firm size</dt><dd>{inquiry.firmSize}</dd></div>}
        <div><dt className="kicker">Received</dt><dd>{fmtWhen(inquiry.createdAt)}</dd></div>
      </dl>

      <div className="ops-block">
        <span className="kicker">Message</span>
        <p className="ops-message">{inquiry.message}</p>
      </div>

      <div className="ops-block">
        <span className="kicker">Stage</span>
        <div className="ops-stages">
          {STAGES.map((s) => (
            <button
              key={s}
              className={'ops-stage' + ((inquiry.stage || 'new') === s ? ' is-on' : '')}
              onClick={() => move(s)}
              disabled={busy}
            >
              {STAGE_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      <div className="ops-block">
        <span className="kicker">Log</span>
        <ul className="ops-timeline">
          {events.map((ev) => (
            <li key={ev.id} className="ops-event">
              <span className="ops-event-when">{fmtWhen(ev.ts)}</span>
              <span className="ops-event-body">
                {ev.type === 'stage' ? (
                  <>Moved to <strong>{STAGE_LABELS[ev.to] || ev.to}</strong></>
                ) : (
                  ev.note
                )}
              </span>
            </li>
          ))}
          {events.length === 0 && <li className="ops-empty">No activity yet.</li>}
        </ul>
        <form onSubmit={submitNote} className="ops-note-form">
          <input
            className="intake-input"
            placeholder="Add a note…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button className="btn-primary" disabled={busy || !note.trim()}>Add</button>
        </form>
      </div>
    </aside>
  )
}
