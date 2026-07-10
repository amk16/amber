import {
  getAuth,
  GoogleAuthProvider,
  connectAuthEmulator,
  signInWithPopup,
  signOut as fbSignOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { app, USE_EMULATOR } from './firebase'

// Auth is only used by the local ops dashboard, so it lives in its own module
// and never ships in the public marketing bundle.
export const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

if (USE_EMULATOR) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
}

export const signIn = () => signInWithPopup(auth, googleProvider)
export const signOut = () => fbSignOut(auth)
export const onAuth = (cb) => onAuthStateChanged(auth, cb)
