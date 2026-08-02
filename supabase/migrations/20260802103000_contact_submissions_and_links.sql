-- Contact form inbox + public insert (no auth required to submit)
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  organisation text,
  topic text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.contact_submissions TO anon, authenticated;
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;
CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions FOR INSERT TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can read contact submissions" ON public.contact_submissions;
CREATE POLICY "Admins can read contact submissions"
ON public.contact_submissions FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Also allow public inserts on existing inquiries table (fallback)
GRANT INSERT ON public.inquiries TO anon, authenticated;
DROP POLICY IF EXISTS "Anyone can submit inquiries" ON public.inquiries;
CREATE POLICY "Anyone can submit inquiries"
ON public.inquiries FOR INSERT TO anon, authenticated
WITH CHECK (true);

-- Seed official social + contact links (overrides placeholder defaults)
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

-- Keep contact email in copy aligned with inbox
INSERT INTO public.site_content (key, data, updated_at)
VALUES (
  'copy',
  jsonb_build_object(
    'contact', jsonb_build_object('email', 'ubaid.ullah2005op@gmail.com')
  ),
  now()
)
ON CONFLICT (key) DO UPDATE
SET data = public.site_content.data || jsonb_build_object(
  'contact',
  COALESCE(public.site_content.data->'contact', '{}'::jsonb) || jsonb_build_object('email', 'ubaid.ullah2005op@gmail.com')
),
updated_at = now();
