/**
 * Apply all SQL migrations in supabase/migrations/ (sorted by filename).
 *
 * Option A — Supabase Management API (recommended):
 *   SUPABASE_ACCESS_TOKEN=sbp_... node scripts/apply-all-migrations.mjs
 *
 * Option B — paste supabase/migrations/20260804200000_admin_api_complete.sql
 *   into Supabase SQL Editor if you only need the latest fixes.
 */
import { readFileSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const migrationsDir = resolve(root, "supabase/migrations");

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
const projectRef =
  process.env.SUPABASE_PROJECT_ID ||
  url?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
const accessToken = process.env.SUPABASE_ACCESS_TOKEN;

const files = readdirSync(migrationsDir)
  .filter((f) => f.endsWith(".sql"))
  .sort();

if (!files.length) {
  console.error("No migration files found in supabase/migrations/");
  process.exit(1);
}

const sql = files
  .map((file) => {
    const body = readFileSync(resolve(migrationsDir, file), "utf8").trim();
    return `-- >>> ${file}\n${body}`;
  })
  .join("\n\n");

console.log(`Prepared ${files.length} migration file(s):`);
for (const f of files) console.log(`  - ${f}`);

if (!accessToken || !projectRef) {
  console.error(`
Cannot run DDL without Supabase Management API access.

Quick fix (Lovable chat — paste once):
  "Run migration 20260804200000_admin_api_complete.sql on connected Supabase"

Or locally with a personal access token:
  https://supabase.com/dashboard/account/tokens

  SUPABASE_ACCESS_TOKEN=sbp_...
  node scripts/apply-all-migrations.mjs
`);
  process.exit(1);
}

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

console.log("All migrations applied via Management API.");
if (text.trim()) console.log(text);
