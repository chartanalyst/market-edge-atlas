# Upgrade to a managed market research platform

No rebuild. The existing design language, animations, branding, routes and sections stay exactly as they are. Everything below extends what already exists (the current `/admin` dashboard, the `site_content` store, and the ivory/electric-blue design system).

Delivered in three phases so nothing regresses. Each phase ends with a working site.

---

## Phase 1 — Analyses, uploads, admin experience

**Real database tables** (replacing the JSON blob for analyses only; other copy stays in the existing editor):
- `analyses`: title, subtitle, market, category, timeframe, date, cover image, gallery images, TradingView link, tags, description, bias, market structure, invalidation, targets, summary, PDF attachment, featured toggle, published toggle, sort order.
- Admin: create / edit / delete, save as draft, publish, pin as featured, drag-to-reorder.
- Public site only ever shows published rows; drafts are visible to you in the dashboard.

**File uploads (Notion-style)**: private-read storage buckets for images, PDFs and the CV. Click Upload, pick a file, done — the app resizes and compresses on upload, stores a thumbnail variant, and serves images lazily with correct sizes.

**Public surfaces**:
- `/analysis` archive page in the current visual language: search (BTC, Gold, NASDAQ, any keyword), market filters (Crypto, Forex, Stocks, Indices, Commodities), category and tag filters, pagination.
- Homepage featured grid reads pinned analyses automatically; case-study pages render cover, gallery, PDF download and TradingView link.

**Section control**: a Sections panel in the dashboard where you toggle any homepage section on/off and drag to reorder. Nothing is deleted from the code — you decide what shows.

**Admin UX**: sidebar + list/detail layout, autosave drafts, inline validation, fast keyboard-friendly forms.

---

## Phase 2 — Reports, results, performance

- **Weekly Market Reports**: own table + admin CRUD (title, week, summary, body, charts/images, PDF, publish toggle) and a public Reports section/page matching the site style.
- **Trading Results**: table + admin CRUD for date, market, direction, entry, exit, R, percentage, win/loss, notes, screenshot.
- **Automatic metrics**: equity curve, total R, win rate, average RR, wins, losses, monthly performance, largest win, largest loss — all computed from the results table, so charts update the moment you save a result. No manual numbers.
- **Performance dashboard**: KPI cards for total analyses published, markets covered, trading results, plus equity curve, recent results and recent analyses — using the existing chart components and card styling.

---

## Phase 3 — Contact, links, polish

- **Contact form**: saves every inquiry to an Inquiries inbox in the dashboard and emails you at chartanalyst1000@gmail.com. Email sending needs a sender domain you own — I'll open the email setup step when we reach this phase; until it's verified, inquiries still land in the dashboard.
- **Social links** (dashboard-editable): email chartanalyst1000@gmail.com, X https://x.com/AChartAnalyst, Telegram https://t.me/structureanalyst, Discord https://discord.gg/kCU4swNPgw. TradingView removed for now; LinkedIn/GitHub fields available but blank.
- **CV management**: upload a new CV in the dashboard; the Download CV button always serves the latest version.
- **SEO**: per-page titles/descriptions, Open Graph and Twitter cards using each analysis's cover image, JSON-LD structured data for articles and the person profile, canonical URLs, sitemap.
- **Cleanup & performance**: consistent section spacing scale, tightened tablet and mobile layouts, lazy-loaded images and below-fold sections, accessibility pass (labels, focus states, contrast, reduced-motion).

---

## Technical notes

- Stack unchanged: existing React + TanStack Start + Tailwind + TypeScript project, extended in place.
- New tables get row-level security: public read for published rows only, full write restricted to your admin role (reusing the existing `has_role` setup). Storage buckets are write-restricted to admin; public assets are served through signed/public read paths.
- Content mutations go through server functions with validation, so nothing writable is exposed to the browser.
- Image processing happens at upload time in the browser (resize/compress/thumbnail) to keep the server runtime light, then stored as derived variants.
- Existing `site_content` editor and defaults stay in place; analyses/reports/results move to real tables because they need per-row publish state, ordering and file attachments.

Phase 1 starts as soon as you approve.
