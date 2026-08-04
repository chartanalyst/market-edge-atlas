GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

GRANT SELECT, INSERT, DELETE, UPDATE ON public.contact_submissions TO authenticated;
GRANT SELECT, INSERT ON public.contact_submissions TO anon;
GRANT ALL ON public.contact_submissions TO service_role;

DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;
CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions FOR INSERT TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can read contact submissions" ON public.contact_submissions;
CREATE POLICY "Admins can read contact submissions"
ON public.contact_submissions FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins delete contact submissions" ON public.contact_submissions;
CREATE POLICY "Admins delete contact submissions"
ON public.contact_submissions FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins update contact submissions" ON public.contact_submissions;
CREATE POLICY "Admins update contact submissions"
ON public.contact_submissions FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

GRANT INSERT ON public.inquiries TO anon, authenticated;
DROP POLICY IF EXISTS "Anyone can submit inquiries" ON public.inquiries;
CREATE POLICY "Anyone can submit inquiries"
ON public.inquiries FOR INSERT TO anon, authenticated
WITH CHECK (true);

ALTER TABLE public.weekly_reports
  ADD COLUMN IF NOT EXISTS asset text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS market text NOT NULL DEFAULT 'Crypto',
  ADD COLUMN IF NOT EXISTS tradingview_url text;

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE lower(email) = lower('chartanalyst1000@gmail.com')
ON CONFLICT (user_id, role) DO NOTHING;

INSERT INTO public.site_content (key, data, updated_at)
VALUES (
  'links',
  '[
    {"platform":"Email","label":"Email","href":"mailto:ubaid.ullah2005op@gmail.com"},
    {"platform":"X","label":"X","href":"https://x.com/AChartAnalyst"},
    {"platform":"Telegram","label":"Telegram","href":"https://t.me/chartanalyst01"},
    {"platform":"Discord","label":"Discord","href":"https://discord.gg/2RntKagEdU"},
    {"platform":"Instagram","label":"Instagram","href":"https://instagram.com/twxubaid"},
    {"platform":"LinkedIn","label":"LinkedIn","href":"https://www.linkedin.com/in/ubaid-ullah-656748301/"}
  ]'::jsonb,
  now()
)
ON CONFLICT (key) DO UPDATE
SET data = EXCLUDED.data, updated_at = now();

INSERT INTO public.site_content (key, data, updated_at)
VALUES (
  'copy',
  jsonb_build_object('contact', jsonb_build_object('email', 'ubaid.ullah2005op@gmail.com')),
  now()
)
ON CONFLICT (key) DO UPDATE
SET data = public.site_content.data || jsonb_build_object(
  'contact',
  COALESCE(public.site_content.data->'contact', '{}'::jsonb) || jsonb_build_object('email', 'ubaid.ullah2005op@gmail.com')
),
updated_at = now();