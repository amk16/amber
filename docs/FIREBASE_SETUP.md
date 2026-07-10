# Firebase setup — Archon intake + ops dashboard

One-time setup to take the intake form live and read submissions in the local
ops dashboard. All of this is on Firebase's **free (Spark) tier** — no billing
card needed. ~5–10 minutes.

## 1. Create the project

1. Go to <https://console.firebase.google.com> → **Add project**.
2. Name it (e.g. `archon-systems`). Google Analytics: not needed, turn off.
3. Note the **Project ID** it assigns (may have a suffix, e.g. `archon-systems-4f2a1`).

## 2. Enable Firestore

1. Left nav → **Build → Firestore Database → Create database**.
2. **Production mode** (locked — our rules open exactly what's needed).
3. Pick a **location** near you/your clients (one-time, permanent — e.g. `asia-south1` Mumbai, or `us-central`).

## 3. Enable Google sign-in (for the dashboard)

1. **Build → Authentication → Get started**.
2. **Sign-in method → Google → Enable**, set a support email, Save.
   (`localhost` is authorized automatically, so the local dashboard works.)

## 4. Register the web app + copy config

1. Project Overview → the **`</>` (web)** icon → register an app (nickname `archon-web`, no Hosting).
2. It shows a `firebaseConfig = { … }`. Keep that tab open — you'll copy 6 values next.

## 5. Fill `.env`

In `~/Desktop/solutions/`, copy the template and paste your values:

```bash
cp .env.example .env
```

Then edit `.env` (it's gitignored — never committed) with the values from step 4:

```
VITE_FIREBASE_API_KEY=AIza…
VITE_FIREBASE_AUTH_DOMAIN=archon-systems-xxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=archon-systems-xxxx
VITE_FIREBASE_STORAGE_BUCKET=archon-systems-xxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=…
VITE_FIREBASE_APP_ID=1:…:web:…
VITE_RECAPTCHA_SITE_KEY=        # leave blank for now (see step 8)
VITE_USE_EMULATOR=              # leave blank
```

## 6. Set the owner email (two places, must match)

The dashboard is readable only by the Google account you sign in with. Put that
account's email in **both**:

- `firestore.rules` → `ownerEmail()` (currently `alimalik3162000@gmail.com`)
- `src/ops/opsUtil.js` → `OWNER_EMAIL`

If you'll sign in with a different Google account, change both to that email.

## 7. Deploy the security rules

```bash
cd ~/Desktop/solutions
npx firebase login                       # opens browser, sign in
npx firebase use <your-project-id>       # from step 1
npx firebase deploy --only firestore:rules
```

This publishes `firestore.rules`: the public can only **create** a valid
inquiry; reads/updates require your signed-in owner account.

## 8. (Before the PUBLIC deploy, not needed to test) reCAPTCHA + App Check

Blocks bots from spamming the public create path.

1. **Build → App Check** → register the Web app → provider **reCAPTCHA v3** →
   it walks you to create a site key (or reuse one from
   <https://www.google.com/recaptcha/admin>).
2. Put the **site key** in `.env` → `VITE_RECAPTCHA_SITE_KEY=…`.
3. In App Check, **Enforce** on Firestore once you've confirmed traffic works.

Until then the rules already protect data; App Check only adds spam resistance.

## 9. Test it

```bash
npm run dev
```

- Marketing site (`http://localhost:5173/`) → click **Book a meeting** → submit →
  a doc should appear under **Firestore → inquiries** in the console.
- Dashboard (`http://localhost:5173/ops.html`) → **Sign in with Google** (owner
  account) → the inquiry shows in **New** → move it to **Assessment** → add a note.

## Going live (later)

- Marketing site deploys to Vercel as before (`npm run build` — the dashboard is
  intentionally excluded). Add the 6 `VITE_FIREBASE_*` vars + `VITE_RECAPTCHA_SITE_KEY`
  to the Vercel project's Environment Variables so the deployed form can write.
- The ops dashboard stays **local-only** — run `npm run dev` and open `/ops.html`
  whenever you want to read submissions. Never deployed.
