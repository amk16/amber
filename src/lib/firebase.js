import { initializeApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import {
  getFirestore,
  initializeFirestore,
  connectFirestoreEmulator,
  persistentLocalCache,
} from 'firebase/firestore'
import {
  getAuth,
  GoogleAuthProvider,
  connectAuthEmulator,
} from 'firebase/auth'

// Config comes from Vite env (VITE_FIREBASE_*). Firebase web keys are public by
// design (they identify the project; security lives in firestore.rules), so the
// deployed marketing build ships them safely. For emulator dev the values are
// ignored. See .env.example.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? 'demo-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? 'demo.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? 'demo-archon',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? 'demo.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '0',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? 'demo-app',
}

export const app = initializeApp(firebaseConfig)

const USE_EMULATOR = import.meta.env.VITE_USE_EMULATOR === 'true'

// Offline cache serves cached reads instantly and rides out flaky connections.
export const db = USE_EMULATOR
  ? getFirestore(app)
  : initializeFirestore(app, { localCache: persistentLocalCache() })

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

if (USE_EMULATOR) {
  connectFirestoreEmulator(db, '127.0.0.1', 8080)
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
}

// App Check is the abuse gate for the public (no-auth) create path. Only
// initialised when a reCAPTCHA site key is configured, so emulator/local dev
// runs without it.
const RECAPTCHA_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY
if (RECAPTCHA_KEY && !USE_EMULATOR) {
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(RECAPTCHA_KEY),
    isTokenAutoRefreshEnabled: true,
  })
}
