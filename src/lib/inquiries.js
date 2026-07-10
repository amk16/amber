import {
  collection,
  doc,
  addDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'

// Single module for all `inquiries` reads/writes so the schema and the
// append-only event log stay consistent. The public may only create (rules
// enforce it); watch/setStage/addNote require the owner to be signed in.

export const STAGES = ['new', 'assessment', 'build', 'care', 'closed']

export const STAGE_LABELS = {
  new: 'New',
  assessment: 'Assessment',
  build: 'Build',
  care: 'Care',
  closed: 'Closed',
}

const inquiriesRef = collection(db, 'inquiries')

// Public create path. Returns the new doc id. `data` carries the raw form
// fields; everything else is set here so the payload always matches the rules.
export async function submitInquiry(data) {
  const clean = {
    name: (data.name ?? '').trim(),
    email: (data.email ?? '').trim(),
    firm: (data.firm ?? '').trim(),
    firmSize: (data.firmSize ?? '').trim(), // '' allowed (optional)
    message: (data.message ?? '').trim(),
    stage: 'new',
    source: 'website',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }
  const ref = await addDoc(inquiriesRef, clean)
  return ref.id
}

// Owner realtime read. Calls cb with an array of { id, ...data }, newest first.
export function watchInquiries(cb) {
  const q = query(inquiriesRef, orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  })
}

// Owner realtime read of one inquiry's append-only event log, oldest first.
export function watchEvents(inquiryId, cb) {
  const q = query(
    collection(db, 'inquiries', inquiryId, 'events'),
    orderBy('ts', 'asc'),
  )
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  })
}

// Owner: move an inquiry to a new stage and log the transition.
export async function setStage(inquiryId, from, to) {
  await updateDoc(doc(db, 'inquiries', inquiryId), {
    stage: to,
    updatedAt: serverTimestamp(),
  })
  await addDoc(collection(db, 'inquiries', inquiryId, 'events'), {
    type: 'stage',
    from,
    to,
    ts: serverTimestamp(),
  })
}

// Owner: append a note to an inquiry.
export async function addNote(inquiryId, note) {
  const text = (note ?? '').trim()
  if (!text) return
  await updateDoc(doc(db, 'inquiries', inquiryId), {
    updatedAt: serverTimestamp(),
  })
  await addDoc(collection(db, 'inquiries', inquiryId, 'events'), {
    type: 'note',
    note: text,
    ts: serverTimestamp(),
  })
}
