# Admin setup — Lovable only (no Supabase dashboard)

Site owner email: **chartanalyst1000@gmail.com**

## Step 1 — Push this code to GitHub

Lovable syncs from your connected repo. After push, wait for the project to rebuild.

## Step 2 — Supabase in Lovable Cloud

1. Open [Lovable project](https://lovable.dev/projects/3a3f1d14-383c-4f82-b6b3-e7cf92a49601)
2. Go to **Cloud** (or **Integrations**)
3. **Connect Supabase** if not already connected — Lovable injects `SUPABASE_URL`, keys, and usually the service role for server functions
4. Optional secret (only if admin still fails after publish):

   | Secret | Value |
   |--------|--------|
   | `BOOTSTRAP_ADMIN_EMAIL` | `chartanalyst1000@gmail.com` |
   | `SUPABASE_SERVICE_ROLE_KEY` | From Lovable’s Supabase connection panel (service role / secret key) |

5. **Publish** / redeploy the app after any secret change

## Step 3 — Run migration in Lovable chat (optional backup)

In the Lovable AI chat, paste:

```
Apply the SQL migration file supabase/migrations/20260804120000_grant_site_owner_admin.sql to the connected Supabase database.
```

This grants admin to `chartanalyst1000@gmail.com` even before sign-in.

## Step 4 — Client signs in

1. Open **https://market-edge-atlas.lovable.app/auth**
2. Sign in with **chartanalyst1000@gmail.com** + their password  
   (Use “Create the owner account” only if they never registered before.)
3. Open **https://market-edge-atlas.lovable.app/admin**

On first sign-in, the server auto-adds the `admin` role for the owner email.

## If it still fails

- Client must use **exact** email: `chartanalyst1000@gmail.com`
- Sign out, sign in again after publish
- Check Lovable Cloud logs for `[Supabase] Missing ... SERVICE_ROLE_KEY`
- Ask Lovable chat: “Is Supabase connected and is SUPABASE_SERVICE_ROLE_KEY available for server functions?”

## What changed in code

- Owner email is **chartanalyst1000@gmail.com** (not the developer email)
- Owner gets admin **even if a developer admin already exists**
- No manual Supabase SQL required if Cloud + sign-in works
