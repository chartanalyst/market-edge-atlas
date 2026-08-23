update public.site_content
set data = (
  select coalesce(jsonb_agg(section), '[]'::jsonb)
  from jsonb_array_elements(data) as section
  where section->>'id' <> 'performance'
),
updated_at = now()
where key = 'sections'
  and jsonb_typeof(data) = 'array';
