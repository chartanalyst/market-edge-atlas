# Editable Website Content (Private Admin Dashboard)

Turn the site's hardcoded content into database-backed content you can edit yourself from a private `/admin` area, after signing in. Public pages keep their exact current design and functionality — only the source of the text changes.

## What you get

- **Sign-in page** (`/auth`) with email + password. Only accounts you approve as admin can reach the dashboard.
- **Admin dashboard** (`/admin`) with a sidebar for each content group:
  - Hero, About, Contact details, Stats/KPIs, Ticker items
  - Markets covered, Services, Analysis process, Experience timeline
  - Featured analyses (full case studies: title, slug, summary, body, tags, metrics)
  - Insights / blog posts
  - Testimonials, Why work with me, FAQ, Coverage map
- **Per-item editing**: list view with add / edit / reorder / delete, and a form per item matching today's fields exactly.
- **Live site reads from the database**, so a save shows up on the public site immediately.
- Existing content is migrated in as the starting data — nothing is lost.

## How it works (technical)

- Enable Lovable Cloud (database + auth).
- Tables mirroring `src/lib/site-data.ts`: `analyses`, `insights`, `markets`, `services`, `process_steps`, `timeline`, `faqs`, `testimonials`, `differentiators`, `stats`, `ticker_items`, `coverage_map`, plus a `site_settings` key/value table for hero, about and contact copy. Each list table gets `sort_order`, timestamps, and grants.
- Roles in a separate `user_roles` table with a `has_role()` security-definer function; no roles on profiles. Public read policies (`anon` SELECT) for site content; write policies restricted to `admin`.
- Seed migration inserts all current content from `site-data.ts` verbatim.
- Public pages load content through a public server function (publishable-key client), replacing the static imports; types stay compatible so section components need only their data source swapped.
- Admin routes live under `src/routes/_authenticated/admin/*`; writes go through `createServerFn` with `requireSupabaseAuth` and an admin role check. Zod validation on every form.
- First admin: after you sign up, I grant your account the `admin` role.

## Out of scope

- No inline on-page editing (dashboard only).
- No image uploads in this pass — image/icon fields stay as text (icon name / URL). Say the word and I'll add a storage-backed uploader.
- Contact form submissions stay as-is (toast only, no inbox).
