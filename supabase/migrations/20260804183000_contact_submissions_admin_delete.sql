-- Allow admins to delete and update contact_submissions (inbox delete button).
GRANT DELETE, UPDATE ON public.contact_submissions TO authenticated;

DROP POLICY IF EXISTS "Admins delete contact submissions" ON public.contact_submissions;
CREATE POLICY "Admins delete contact submissions"
ON public.contact_submissions FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins update contact submissions" ON public.contact_submissions;
CREATE POLICY "Admins update contact submissions"
ON public.contact_submissions FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
