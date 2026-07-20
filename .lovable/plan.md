# Altairagency24 — Website Plan

A single-page (multi-section) marketing site for your web design business, plus a lightweight admin area so you can add new portfolio projects yourself. Built to deploy on Cloudflare Workers (the template already targets workers.dev).

## Brand & Design

- Logo: your uploaded globe/"ALTAIRAGENCY24" mark, saved as a Lovable Asset and used in the header + favicon.
- Direction: clean, high-contrast black/white with a single accent, tight modern typography — matches the logo's bold, monochrome feel. Not the generic purple-gradient look.
- Icons via `lucide-react` throughout (no AI images).
- Fully responsive, mobile-first (your visitors are mostly on phones).

## Site Structure (single scrollable page)

1. **Header** — logo, nav anchors, "Get a quote" button (opens WhatsApp to +27 73 662 7793).
2. **Hero** — headline "Your business deserves a better website.", subhead, CTAs (WhatsApp quote + View work).
3. **Why you need a website** — 4–6 icon cards explaining why clients need one: credibility & trust, 24/7 storefront, being found on Google, converting visitors into customers, showcasing work, competing with bigger brands.
4. **Services** — Web Design, Web Development, Fast Turnaround, Ongoing Support (icon cards).
5. **Portfolio** — grid of project cards (title + live link + screenshot thumbnail auto-captured via a free screenshot service URL, no AI images). Seeded in this order:
   1. lsjandcomoanies.altairwebs24.workers.dev
   2. brightbarber.lovable.app
   3. nthumeni-architecture-showcase-545e9666.altairwebs24.workers.dev
   4. mangueze-reimagined.altairwebs24.workers.dev
   5. connect-shine.altairwebs24.workers.dev
   6. nlandassociatesinc.lovable.app/services
   7. bricksway.altairwebs24.workers.dev
   8. plutofxkid.altairwebs24.workers.dev
   9. stylesiinterior.lovable.app
   10. foremostprinting.lovable.app
6. **Process** — 3–4 steps: Brief → Design → Build → Launch.
7. **Contact / CTA** — WhatsApp, email (Altairwebs24@gmail.com), phone (+27 73 662 7793), Instagram (altairagency_24), TikTok (@altairagency). "Open 24 hours" badge.
8. **Footer** — logo, socials, copyright.

## Admin (add new portfolio projects yourself)

- Enable **Lovable Cloud** for auth + database.
- `projects` table: `id, title, url, description, sort_order, created_at`. Public read; insert/update/delete restricted via RLS to the admin user.
- `/auth` route: email magic-link sign-in.
- `/admin` route: gated — only the account with email **Altairwebs24@gmail.com** can access. Shows a form to add a project (title, URL, optional description) and a list with edit/delete + drag-to-reorder.
- The Portfolio section on the homepage reads live from this table (falling back to the seeded list above so the site never looks empty).

## Global tweaks

- `src/styles.css`: add `#lovable-badge { display: none !important; }` so anything with that ID is hidden everywhere.
- SEO head: real title "Altairagency24 — Web Design & Development", proper meta description, OG/Twitter tags.

## Deployment

- Template already builds for Cloudflare Workers, so it will publish to a `*.workers.dev`-style free subdomain (Lovable's publish flow gives you a `lovable.app` URL; you can also deploy the built Worker bundle to your own `altairwebs24.workers.dev` account — same output).

## Technical notes

- Stack unchanged: TanStack Start + Tailwind v4 + shadcn.
- Portfolio thumbnails: use a free public screenshot endpoint (e.g. `https://image.thum.io/get/width/800/...`) so there are no AI-generated images and no manual uploads needed.
- Admin authorization is enforced server-side (RLS + email check), not just hidden in the UI.

Approve this and I'll build it.