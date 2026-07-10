import { useEffect, useRef, useState, useCallback } from 'react'
import { useIntake } from '../intake/IntakeContext'

const FIRM_SIZES = ['Just me', '2–10', '11–50', '50+']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const EMPTY = { name: '', email: '', firm: '', firmSize: '', message: '', website: '' }

export default function IntakeModal() {
  const { isOpen, close } = useIntake()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const dialogRef = useRef(null)
  const firstFieldRef = useRef(null)

  const reset = useCallback(() => {
    setForm(EMPTY)
    setErrors({})
    setStatus('idle')
  }, [])

  const handleClose = useCallback(() => {
    close()
    // reset after the close so the success/idle state doesn't flash on the way out
    setTimeout(reset, 200)
  }, [close, reset])

  // Body scroll lock + focus management + ESC while open.
  useEffect(() => {
    if (!isOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstFieldRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') handleClose()
      if (e.key === 'Tab') trapFocus(e, dialogRef.current)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [isOpen, handleClose])

  if (!isOpen) return null

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Your name, please.'
    if (!EMAIL_RE.test(form.email.trim())) next.email = 'A valid work email.'
    if (!form.firm.trim()) next.firm = 'Which firm?'
    if (!form.message.trim()) next.message = 'A sentence is plenty.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'submitting') return
    if (!validate()) return
    // Honeypot: bots fill the hidden field. Pretend success, write nothing.
    if (form.website.trim()) {
      setStatus('success')
      return
    }
    setStatus('submitting')
    try {
      // Lazy-load Firebase so the heavy SDK stays out of the initial marketing
      // bundle — it only loads when someone actually submits.
      const { submitInquiry } = await import('../lib/inquiries')
      await submitInquiry(form)
      setStatus('success')
    } catch (err) {
      console.error('intake submit failed', err)
      setStatus('error')
    }
  }

  return (
    <div
      className="intake-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div
        className="intake-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="intake-title"
        ref={dialogRef}
      >
        <div className="intake-head">
          <p className="kicker" style={{ color: 'var(--accent)' }}>
            C/01&ensp;—&ensp;The first meeting
          </p>
          <button
            type="button"
            className="intake-x"
            onClick={handleClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {status === 'success' ? (
          <div className="intake-done">
            <h2 id="intake-title" className="f-display intake-title">
              Received. We’ll be in <em>touch</em>.
            </h2>
            <p className="body-copy" style={{ marginTop: '14px' }}>
              Thanks, {form.name.split(' ')[0] || 'and'} — your note is with us.
              Expect a reply from {' '}
              <span className="f-mono">contact@archonsystems.com</span>.
            </p>
            <button type="button" className="btn-primary intake-submit" onClick={handleClose}>
              Close
            </button>
          </div>
        ) : (
          <form className="intake-form" onSubmit={onSubmit} noValidate>
            <h2 id="intake-title" className="f-display intake-title">
              Tell us what’s eating your <em>week</em>.
            </h2>
            <p className="body-copy intake-lede">
              A few lines is enough. We reply with next steps — no automated
              sequence, no sales call scheduled behind your back.
            </p>

            <Field label="Name" error={errors.name}>
              <input
                ref={firstFieldRef}
                className="intake-input"
                type="text"
                value={form.name}
                onChange={set('name')}
                autoComplete="name"
                aria-invalid={!!errors.name}
              />
            </Field>

            <div className="intake-row">
              <Field label="Work email" error={errors.email}>
                <input
                  className="intake-input"
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                />
              </Field>
              <Field label="Firm" error={errors.firm}>
                <input
                  className="intake-input"
                  type="text"
                  value={form.firm}
                  onChange={set('firm')}
                  autoComplete="organization"
                  aria-invalid={!!errors.firm}
                />
              </Field>
            </div>

            <Field label="Firm size" hint="optional">
              <div className="intake-sizes">
                {FIRM_SIZES.map((s) => (
                  <button
                    type="button"
                    key={s}
                    className={
                      'intake-size' + (form.firmSize === s ? ' is-on' : '')
                    }
                    onClick={() =>
                      setForm((f) => ({
                        ...f,
                        firmSize: f.firmSize === s ? '' : s,
                      }))
                    }
                    aria-pressed={form.firmSize === s}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="What’s eating your team’s time?" error={errors.message}>
              <textarea
                className="intake-input intake-textarea"
                rows={4}
                value={form.message}
                onChange={set('message')}
                aria-invalid={!!errors.message}
              />
            </Field>

            {/* Honeypot — visually hidden, off the tab order. Bots fill it. */}
            <input
              className="intake-hp"
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={form.website}
              onChange={set('website')}
            />

            {status === 'error' && (
              <p className="intake-error-banner" role="alert">
                Something broke on our end. Try again, or write{' '}
                contact@archonsystems.com.
              </p>
            )}

            <div className="intake-actions">
              <button
                type="submit"
                className="btn-primary intake-submit"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending…' : 'Send'}
                {status !== 'submitting' && (
                  <span className="arr" aria-hidden="true">→</span>
                )}
              </button>
              <button type="button" className="link-quiet" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

function Field({ label, hint, error, children }) {
  return (
    <label className="intake-field">
      <span className="intake-label kicker">
        {label}
        {hint && <span className="intake-hint"> · {hint}</span>}
      </span>
      {children}
      {error && <span className="intake-error">{error}</span>}
    </label>
  )
}

// Keep focus inside the dialog while Tab-cycling.
function trapFocus(e, root) {
  if (!root) return
  const focusables = root.querySelectorAll(
    'a[href], button:not([disabled]), input:not([tabindex="-1"]), textarea, select, [tabindex]:not([tabindex="-1"])',
  )
  if (focusables.length === 0) return
  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}
