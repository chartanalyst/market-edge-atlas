-- Grant admin to the site owner (safe to re-run).
-- Apply via Lovable chat: "Run migration 20260804120000_grant_site_owner_admin.sql on connected Supabase"

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE lower(email) = lower('chartanalyst1000@gmail.com')
ON CONFLICT (user_id, role) DO NOTHING;
