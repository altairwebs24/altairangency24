
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view projects"
  ON public.projects FOR SELECT
  USING (true);

CREATE POLICY "Only admin can insert projects"
  ON public.projects FOR INSERT
  TO authenticated
  WITH CHECK (lower(auth.jwt() ->> 'email') = 'altairwebs24@gmail.com');

CREATE POLICY "Only admin can update projects"
  ON public.projects FOR UPDATE
  TO authenticated
  USING (lower(auth.jwt() ->> 'email') = 'altairwebs24@gmail.com')
  WITH CHECK (lower(auth.jwt() ->> 'email') = 'altairwebs24@gmail.com');

CREATE POLICY "Only admin can delete projects"
  ON public.projects FOR DELETE
  TO authenticated
  USING (lower(auth.jwt() ->> 'email') = 'altairwebs24@gmail.com');

INSERT INTO public.projects (title, url, sort_order) VALUES
  ('LSJ & Companies', 'https://lsjandcomoanies.altairwebs24.workers.dev/', 10),
  ('Bright Barber', 'https://brightbarber.lovable.app', 20),
  ('Nthumeni Architecture', 'https://nthumeni-architecture-showcase-545e9666.altairwebs24.workers.dev/', 30),
  ('Mangueze Reimagined', 'https://mangueze-reimagined.altairwebs24.workers.dev/', 40),
  ('Connect Shine', 'https://connect-shine.altairwebs24.workers.dev/', 50),
  ('N. Land Associates', 'https://nlandassociatesinc.lovable.app/services', 60),
  ('Bricksway', 'https://bricksway.altairwebs24.workers.dev/', 70),
  ('Plutofxkid', 'https://plutofxkid.altairwebs24.workers.dev/', 80),
  ('Stylesi Interior', 'https://stylesiinterior.lovable.app/', 90),
  ('Foremost Printing', 'https://foremostprinting.lovable.app', 100);
