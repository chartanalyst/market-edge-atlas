update public.site_content set data = '[
 {"id":"hero","label":"Hero","enabled":true},
 {"id":"ticker","label":"Market ticker","enabled":true},
 {"id":"about","label":"About","enabled":true},
 {"id":"markets","label":"Research Universe","enabled":true},
 {"id":"featured","label":"Featured analysis","enabled":true},
 {"id":"certifications","label":"Certifications","enabled":true},
 {"id":"reports","label":"Reports","enabled":true},
 {"id":"performance","label":"Performance dashboard","enabled":true},
 {"id":"journal","label":"Trading journal","enabled":true},
 {"id":"process","label":"Analysis process","enabled":true},
 {"id":"services","label":"Services","enabled":true},
 {"id":"why","label":"Why work with me","enabled":true},
 {"id":"testimonials","label":"Testimonials","enabled":false},
 {"id":"faq","label":"FAQ","enabled":true},
 {"id":"contact","label":"Contact","enabled":true}
]'::jsonb, updated_at = now() where key = 'sections';