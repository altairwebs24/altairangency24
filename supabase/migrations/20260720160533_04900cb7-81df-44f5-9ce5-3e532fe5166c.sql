ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS thumbnail_url text;
CREATE POLICY "Admin can upload thumbnails" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-thumbnails' AND lower((auth.jwt() ->> 'email'::text)) = 'altairwebs24@gmail.com');
CREATE POLICY "Admin can update thumbnails" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'project-thumbnails' AND lower((auth.jwt() ->> 'email'::text)) = 'altairwebs24@gmail.com');
CREATE POLICY "Admin can delete thumbnails" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'project-thumbnails' AND lower((auth.jwt() ->> 'email'::text)) = 'altairwebs24@gmail.com');
CREATE POLICY "Public can view thumbnails" ON storage.objects FOR SELECT USING (bucket_id = 'project-thumbnails');