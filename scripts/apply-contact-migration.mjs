/**
 * Apply contact_submissions + links seed migration.
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env (from Lovable Cloud / Supabase → Settings → API).
 *
 * Usage: node scripts/apply-contact-migration.mjs
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnv() {
  try {
    const raw = readFileSync(resolve(root, ".env"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      let v = m[2].trim();
      if (
        (v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))
      ) {
        v = v.slice(1, -1);
      }
      if (!process.env[m[1]]) process.env[m[1]] = v;
    }
  } catch {
    /* no .env */
  }
}

loadEnv();

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(`
Missing env. Add to .env then re-run:

  SUPABASE_SERVICE_ROLE_KEY=your_service_role_or_sb_secret_key

Get it from: Supabase Dashboard → Project Settings → API → service_role
(or Lovable Cloud → Supabase / backend secrets)

Then: node scripts/apply-contact-migration.mjs
`);
  process.exit(1);
}

const sql = readFileSync(
  resolve(root, "supabase/migrations/20260802103000_contact_submissions_and_links.sql"),
  "utf8",
);

const endpoint = `${url.replace(/\/$/, "")}/rest/v1/rpc/`; // won't work for raw SQL

// Use PostgREST can't run DDL. Use pg via supabase SQL API if available.
// Supabase database query endpoint (Management) needs access token.
// Fallback: execute via supabase-js rpc won't work for arbitrary SQL.
// Use the SQL Editor compatible approach through postgres wire — not available in browser.
// Best available: supabase /pg/query is not public.
//
// Use fetch to Supabase Management API is complex.
// Practical approach: use `@supabase/supabase-js` with service role won't run DDL.
//
// So we use the Database REST... actually Supabase has:
// POST https://api.supabase.com/v1/projects/{ref}/database/query
// with personal access token.

const projectRef = process.env.SUPABASE_PROJECT_ID;
const accessToken = process.env.SUPABASE_ACCESS_TOKEN; // personal access token

if (accessToken && projectRef) {
  const res = await fetch(
    `https://api.supabase.com/v1/projects/${projectRef}/database/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: sql }),
    },
  );
  const text = await res.text();
  if (!res.ok) {
    console.error("Migration failed:", res.status, text);
    process.exit(1);
  }
  console.log("Migration applied via Management API.");
  console.log(text);
  process.exit(0);
}

console.error(`
Service role key alone cannot run DDL over the Data API.

Easiest options (pick one):

1) Paste the SQL file into Supabase SQL Editor and Run:
   supabase/migrations/20260802103000_contact_submissions_and_links.sql

2) Or add a Supabase Personal Access Token and re-run:
   SUPABASE_ACCESS_TOKEN=sbp_...
   (https://supabase.com/dashboard/account/tokens)
   node scripts/apply-contact-migration.mjs
`);
process.exit(1);
