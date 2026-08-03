# Market Edge Atlas — Handover

Live site: https://market-edge-atlas.lovable.app

## Completed features

| Feature | Status |
|---------|--------|
| Social links (X, Telegram, Discord, Email, LinkedIn, Instagram) | Done |
| Contact form (UI + server + DB fallback) | Done — needs migration + email key |
| Admin CMS (`/auth` → `/admin`) | Done |
| Live prices (BTC, ETH, SOL, gold) | Done |
| Trading journal + equity curve (R from 0) | Done |
| Light theme / dark toggle removed | Done |
| Session Coverage map removed | Done |
| Hero panel image upload in CMS | Done |
| Contact inbox in admin | Done |
| Branding + favicon | Done |

## You must configure (one-time)

### 1. Run database migration

Open **Supabase → SQL Editor** and run the full file:

`supabase/migrations/20260802103000_contact_submissions_and_links.sql`

This creates `contact_submissions`, fixes public insert on `inquiries`, and seeds social links.

Or locally (needs `SUPABASE_ACCESS_TOKEN` from https://supabase.com/dashboard/account/tokens):

```sh
npm run db:contact-migration
```

### 2. Server environment variables (Lovable Cloud)

Local `.env` does **not** sync to production. In Lovable Cloud / hosting env, set:

| Variable | Purpose |
|----------|---------|
| `SUPABASE_SERVICE_ROLE_KEY` | Admin bootstrap, server writes |
| `WEB3FORMS_ACCESS_KEY` | Contact form email (optional if SMTP is set) |
| `SMTP_USER` / `SMTP_PASS` | Gmail or other SMTP (checked first) |
| `CONTACT_TO` | `ubaid.ullah2005op@gmail.com` |
| `BOOTSTRAP_ADMIN_EMAIL` | First admin email (developer or client) |

Restart the app after saving env vars.

### 3. Admin access

1. Go to `/auth`
2. Sign up or sign in with the bootstrap admin email
3. First sign-in auto-grants admin if no admin exists yet
4. Open `/admin` to edit copy, links, analyses, reports, trades, and contact inbox

Client admin (when ready): `chartanalyst1000@gmail.com` — add to `user_roles` in Supabase or transfer bootstrap email.

### 4. Contact form email

**Option A — SMTP (Gmail or any provider)**

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your@gmail.com
SMTP_PASS=your_app_password   # no spaces
SMTP_FROM="Market Edge Atlas"
CONTACT_TO=ubaid.ullah2005op@gmail.com
```

**Option B — Web3Forms**

1. Register at https://web3forms.com
2. Copy access key → `WEB3FORMS_ACCESS_KEY`

Without email config, submissions still save to DB after migration (visible in **Contact inbox**).

### 5. Replacement images (when client sends assets)

In `/admin` → **Page copy** → **Hero section** → upload **Hero panel image**.

For analyses/reports: use cover image upload in the respective admin tabs.

## Not in source control

| Item | Notes |
|------|-------|
| Lovable “Edit with” badge | Only on `*.lovable.app`; gone on custom domain / other host |
| Client stock/chart images | Waiting on client assets |

## Admin quick guide

- **Analyses / Reports / Trading journal** — CRUD with publish toggle
- **Page copy** — hero text, about, contact email display
- **Social links** — platform URLs
- **Performance KPIs / Ticker** — static fallbacks; live crypto/gold overlay when APIs respond
- **Contact inbox** — read and delete form submissions

## Development

```sh
npm i
cp .env.example .env   # fill in values
npm run dev
```

Tests: `/`, `/#contact`, `/#journal`, `/auth`, `/admin`
