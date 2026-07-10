// Set this to the Google account that runs the dashboard — MUST match
// ownerEmail() in firestore.rules, or reads will be denied by the rules.
export const OWNER_EMAIL = 'alimalik3162000@gmail.com'

// Firestore Timestamp | null (pending serverTimestamp) → a compact "3d" age.
export function fmtAge(ts) {
  if (!ts?.toDate) return 'just now'
  const then = ts.toDate().getTime()
  const mins = Math.floor((Date.now() - then) / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h`
  const days = Math.floor(hrs / 24)
  return `${days}d`
}

export function fmtWhen(ts) {
  if (!ts?.toDate) return '—'
  return ts.toDate().toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}
