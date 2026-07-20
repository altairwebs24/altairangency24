import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter, WHATSAPP, EMAIL, PHONE, INSTAGRAM, TIKTOK } from "@/components/site-chrome";
import { useProjects } from "@/lib/use-projects";
import { screenshotUrl } from "@/lib/portfolio-data";
import {
  ArrowRight, ArrowUpRight, Mail, Phone, MessageCircle, Instagram,
  Music2, Clock, ShieldCheck, Search, TrendingUp, Smartphone, Globe,
  Palette, Code2, Zap, LifeBuoy,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-foreground bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:pt-24">
        <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-foreground/60">
          <span className="h-px w-8 bg-foreground/60" />
          <span>Est. 2024 · Web Studio</span>
        </div>
        <h1 className="mt-6 text-[13vw] leading-[0.88] sm:text-[8rem] md:text-[10rem]">
          BETTER
          <br />
          <span className="font-serif-accent font-normal">websites,</span>
          <br />
          FASTER.
        </h1>
        <div className="mt-10 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
          <p className="max-w-lg text-lg leading-snug text-foreground/70 sm:text-xl">
            Altairagency24 designs and builds high-converting websites for small brands
            that are tired of looking small. <span className="font-serif-accent text-foreground">DM for a free quote.</span>
          </p>
          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-foreground px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-background transition hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" /> Get a Quote
            </a>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 border border-foreground px-6 py-3.5 text-sm font-semibold uppercase tracking-wider transition hover:bg-foreground hover:text-background"
            >
              See Work <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-foreground bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-background/20 md:grid-cols-4">
          {[
            { k: "24h", v: "Open around the clock" },
            { k: "10+", v: "Live sites shipped" },
            { k: "3–7", v: "Day turnaround" },
            { k: "0", v: "Templates used" },
          ].map((s) => (
            <div key={s.k} className="px-5 py-6">
              <div className="text-4xl leading-none sm:text-5xl">{s.k}</div>
              <div className="mt-2 text-xs uppercase tracking-widest opacity-70">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const WHY_ITEMS = [
  { icon: ShieldCheck, title: "Credibility", body: "9 in 10 customers Google you before they buy. A real site says you're serious." },
  { icon: Clock, title: "Open 24/7", body: "Your site sells while you sleep — answering, quoting, booking around the clock." },
  { icon: Search, title: "Found on Google", body: "Without a site you're invisible in search. A proper site puts you in front of buyers." },
  { icon: TrendingUp, title: "Convert visitors", body: "Sharp copy and simple flows turn casual browsers into paying customers." },
  { icon: Smartphone, title: "Mobile-first", body: "Most visits are on phones. A responsive site stops them bouncing to a competitor." },
  { icon: Globe, title: "Own your brand", body: "Social profiles come and go. A website is your home base — one link, whole story." },
];

function WhyASite() {
  return (
    <section id="why" className="border-b border-foreground">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:py-28">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground/60">01 — Why</p>
            <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl">
              You need a <span className="font-serif-accent">website.</span>
            </h2>
            <p className="mt-4 max-w-sm text-foreground/70">
              Social media is rented land. A website is yours — forever.
            </p>
          </div>
          <div className="grid gap-0 divide-y divide-foreground border-y border-foreground sm:grid-cols-2 sm:divide-x">
            {WHY_ITEMS.map(({ icon: Icon, title, body }, i) => (
              <div key={title} className={`p-6 ${i >= 2 ? "sm:border-t sm:border-foreground" : ""}`}>
                <Icon className="h-6 w-6" strokeWidth={1.5} />
                <h3 className="mt-4 text-xl">{title}</h3>
                <p className="mt-2 text-sm text-foreground/70">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { icon: Palette, title: "Web Design", body: "Custom, on-brand — not templates." },
  { icon: Code2, title: "Development", body: "Fast, modern code that flies on any device." },
  { icon: Zap, title: "Fast Turnaround", body: "Live in days, not months." },
  { icon: LifeBuoy, title: "Ongoing Support", body: "Edits and updates whenever you need." },
];

function Services() {
  return (
    <section id="services" className="border-b border-foreground bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:py-28">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] opacity-60">02 — Services</p>
            <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl">
              What we <span className="font-serif-accent">do.</span>
            </h2>
          </div>
        </div>
        <div className="mt-12 grid gap-0 divide-y divide-background/20 border-y border-background/20 sm:grid-cols-2 sm:divide-x lg:grid-cols-4 lg:divide-y-0">
          {SERVICES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="group p-6 transition hover:bg-background hover:text-foreground">
              <Icon className="h-8 w-8" strokeWidth={1.5} />
              <h3 className="mt-6 text-2xl">{title}</h3>
              <p className="mt-2 text-sm opacity-70 group-hover:opacity-100">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p }: { p: import("@/lib/portfolio-data").Project }) {
  const img = p.thumbnail_url ?? screenshotUrl(p.url);
  let host = p.url;
  try { host = new URL(p.url).host; } catch {}
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noreferrer"
      className="group block border border-foreground bg-background transition hover:-translate-y-1"
    >
      <div className="aspect-[4/3] w-full overflow-hidden border-b border-foreground bg-secondary">
        <img
          src={img}
          alt={`${p.title} website`}
          loading="lazy"
          className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = screenshotUrl(p.url);
          }}
        />
      </div>
      <div className="flex items-center justify-between gap-2 p-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg">{p.title}</h3>
          <p className="truncate text-xs uppercase tracking-widest text-foreground/60">{host}</p>
        </div>
        <ArrowUpRight className="h-5 w-5 shrink-0 transition group-hover:rotate-45" />
      </div>
    </a>
  );
}

function LatestWork() {
  const { data: projects = [] } = useProjects();
  // "Last 3" = 3 most recently added (highest sort_order).
  const latest = [...projects].sort((a, b) => b.sort_order - a.sort_order).slice(0, 3);
  return (
    <section id="work" className="border-b border-foreground">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground/60">03 — Latest work</p>
            <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl">
              Fresh off the <span className="font-serif-accent">press.</span>
            </h2>
          </div>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 border border-foreground px-5 py-3 text-sm font-semibold uppercase tracking-wider transition hover:bg-foreground hover:text-background"
          >
            View more <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {latest.map((p) => <ProjectCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}

const PROCESS = [
  { n: "01", t: "Brief", b: "You tell us what you sell and who buys it." },
  { n: "02", t: "Design", b: "We mock it up and refine until you love it." },
  { n: "03", t: "Build", b: "We code it fast, responsive and SEO-ready." },
  { n: "04", t: "Launch", b: "We deploy and stick around for support." },
];

function Process() {
  return (
    <section className="border-b border-foreground">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:py-28">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground/60">04 — Process</p>
          <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl">
            Simple, <span className="font-serif-accent">no drama.</span>
          </h2>
        </div>
        <ol className="mt-12 divide-y divide-foreground border-y border-foreground">
          {PROCESS.map((s) => (
            <li key={s.n} className="grid grid-cols-[auto_1fr] items-baseline gap-6 py-6 sm:grid-cols-[80px_1fr_2fr]">
              <div className="font-serif-accent text-3xl">{s.n}</div>
              <h3 className="text-2xl sm:text-3xl">{s.t}</h3>
              <p className="col-span-2 text-foreground/70 sm:col-span-1">{s.b}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-b border-foreground bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:py-28">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] opacity-60">05 — Contact</p>
            <h2 className="mt-4 text-5xl sm:text-6xl md:text-7xl">
              Let's <span className="font-serif-accent">talk.</span>
            </h2>
            <p className="mt-4 max-w-md opacity-80">
              DM for a free quote — we usually reply within a couple of hours.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 border border-background/40 px-3 py-1 text-xs uppercase tracking-widest">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Open now · 24 hours
            </span>
          </div>
          <div className="grid gap-0 divide-y divide-background/20 border border-background/20">
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-5 transition hover:bg-background hover:text-foreground">
              <MessageCircle className="h-5 w-5" /><div><div className="text-sm font-semibold uppercase tracking-wider">WhatsApp</div><div className="text-xs opacity-70">{PHONE}</div></div>
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 p-5 transition hover:bg-background hover:text-foreground">
              <Mail className="h-5 w-5" /><div><div className="text-sm font-semibold uppercase tracking-wider">Email</div><div className="text-xs opacity-70">{EMAIL}</div></div>
            </a>
            <a href={`tel:+27736627793`} className="flex items-center gap-4 p-5 transition hover:bg-background hover:text-foreground">
              <Phone className="h-5 w-5" /><div><div className="text-sm font-semibold uppercase tracking-wider">Call</div><div className="text-xs opacity-70">{PHONE}</div></div>
            </a>
            <div className="grid grid-cols-2 divide-x divide-background/20">
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="flex items-center gap-2 p-5 transition hover:bg-background hover:text-foreground">
                <Instagram className="h-5 w-5" /><span className="text-sm font-semibold uppercase tracking-wider">Instagram</span>
              </a>
              <a href={TIKTOK} target="_blank" rel="noreferrer" className="flex items-center gap-2 p-5 transition hover:bg-background hover:text-foreground">
                <Music2 className="h-5 w-5" /><span className="text-sm font-semibold uppercase tracking-wider">TikTok</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <WhyASite />
        <Services />
        <LatestWork />
        <Process />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}