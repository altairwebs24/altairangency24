import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Globe,
  Zap,
  Search,
  ShieldCheck,
  TrendingUp,
  Smartphone,
  Code2,
  Palette,
  LifeBuoy,
  ArrowRight,
  Mail,
  Phone,
  MessageCircle,
  Instagram,
  Clock,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import logoAsset from "@/assets/altair-logo.png.asset.json";
import { supabase } from "@/integrations/supabase/client";
import {
  FALLBACK_PROJECTS,
  screenshotUrl,
  type Project,
} from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const WHATSAPP = "https://wa.me/27736627793?text=Hi%20Altairagency24%2C%20I%27d%20like%20a%20quote%20for%20a%20website.";
const EMAIL = "Altairwebs24@gmail.com";
const PHONE = "+27 73 662 7793";
const INSTAGRAM = "https://instagram.com/altairagency_24";
const TIKTOK = "https://tiktok.com/@altairagency";

function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async (): Promise<Project[]> => {
      const { data, error } = await supabase
        .from("projects")
        .select("id, title, url, description, sort_order")
        .order("sort_order", { ascending: true });
      if (error || !data || data.length === 0) return FALLBACK_PROJECTS;
      return data as Project[];
    },
  });
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#top" className="flex items-center gap-2">
          <img src={logoAsset.url} alt="Altairagency24 logo" className="h-9 w-9 rounded-full bg-background object-contain" />
          <span className="text-sm font-bold tracking-tight sm:text-base">ALTAIRAGENCY<span className="text-muted-foreground">24</span></span>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <a href="#why" className="hover:text-foreground">Why a site</a>
          <a href="#services" className="hover:text-foreground">Services</a>
          <a href="#work" className="hover:text-foreground">Work</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
        </nav>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background transition hover:opacity-90"
        >
          <MessageCircle className="h-3.5 w-3.5" /> Get a quote
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3 w-3" /> Web Design & Development
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">
            Your business deserves a <span className="underline decoration-foreground decoration-4 underline-offset-4">better website</span>.
          </h1>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            We design and build fast, modern websites that turn visitors into customers — with quick turnaround and honest pricing. DM for a free quote.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:opacity-90 sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" /> DM for a free quote
            </a>
            <a
              href="#work"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary sm:w-auto"
            >
              View recent work <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> Open 24 hours</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1"><Zap className="h-3 w-3" /> Fast turnaround</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const WHY_ITEMS = [
  { icon: ShieldCheck, title: "Look credible", body: "Nine out of ten customers Google you before they buy. A polished site instantly says you're the real deal." },
  { icon: Clock, title: "Open 24/7", body: "Your site sells while you sleep — answering questions, showing prices, and taking bookings around the clock." },
  { icon: Search, title: "Get found on Google", body: "Without a website you're invisible in search. A proper site puts you in front of people already looking for you." },
  { icon: TrendingUp, title: "Convert visitors", body: "Clear pages, sharp copy and simple contact flows turn casual browsers into real leads and paying customers." },
  { icon: Smartphone, title: "Impress on mobile", body: "Most visits come from phones. A responsive site keeps every one of them from bouncing to your competitor." },
  { icon: Globe, title: "Own your brand", body: "Social profiles come and go. A website is your home base — one link that tells your whole story." },
];

function WhyASite() {
  return (
    <section id="why" className="border-b border-border bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Why you need a website</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Social media is rented. A website is yours.
          </h2>
          <p className="mt-3 text-muted-foreground">
            If your business only lives on Instagram or TikTok, you're one algorithm change away from disappearing. Here's why a real website changes everything.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_ITEMS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border bg-background p-6 transition hover:shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { icon: Palette, title: "Web Design", body: "Custom, on-brand designs — not templates." },
  { icon: Code2, title: "Web Development", body: "Fast, modern code that runs great on any device." },
  { icon: Zap, title: "Fast Turnaround", body: "Most sites go live in days, not months." },
  { icon: LifeBuoy, title: "Ongoing Support", body: "Edits, tweaks and updates whenever you need them." },
];

function Services() {
  return (
    <section id="services" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Services</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to launch.</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border p-6">
              <Icon className="h-6 w-6" />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const { data: projects } = useProjects();
  const list = projects ?? FALLBACK_PROJECTS;
  return (
    <section id="work" className="border-b border-border bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Recent work</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Sites we've built lately.</h2>
          </div>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline">
            Start your project <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-2xl border border-border bg-background transition hover:shadow-md"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-secondary">
                <img
                  src={screenshotUrl(p.url)}
                  alt={`${p.title} website screenshot`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex items-center justify-between gap-2 p-4">
                <div className="min-w-0">
                  <h3 className="truncate font-semibold">{p.title}</h3>
                  <p className="truncate text-xs text-muted-foreground">{new URL(p.url).host}</p>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-foreground" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROCESS = [
  { n: "01", t: "Brief", b: "You tell us what you sell and who buys it." },
  { n: "02", t: "Design", b: "We mock up your site and refine until you love it." },
  { n: "03", t: "Build", b: "We code it fast, responsive and SEO-ready." },
  { n: "04", t: "Launch", b: "We deploy, hand over, and stick around for support." },
];

function Process() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Process</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Simple, no drama.</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((s) => (
            <div key={s.n} className="rounded-2xl border border-border p-6">
              <div className="text-xs font-semibold text-muted-foreground">{s.n}</div>
              <h3 className="mt-2 text-lg font-semibold">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-b border-border bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest opacity-70">Let's talk</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Ready when you are.</h2>
            <p className="mt-3 text-sm opacity-80">
              Bringing your vision to life, one pixel at a time. DM for a free quote — we usually reply within a couple of hours.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-background/30 px-3 py-1 text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> Open now · 24 hours
            </span>
          </div>
          <div className="space-y-3">
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-background/20 p-4 transition hover:bg-background/5">
              <MessageCircle className="h-5 w-5" />
              <div>
                <div className="text-sm font-semibold">WhatsApp us</div>
                <div className="text-xs opacity-70">{PHONE}</div>
              </div>
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 rounded-xl border border-background/20 p-4 transition hover:bg-background/5">
              <Mail className="h-5 w-5" />
              <div>
                <div className="text-sm font-semibold">Email</div>
                <div className="text-xs opacity-70">{EMAIL}</div>
              </div>
            </a>
            <a href={`tel:+27736627793`} className="flex items-center gap-3 rounded-xl border border-background/20 p-4 transition hover:bg-background/5">
              <Phone className="h-5 w-5" />
              <div>
                <div className="text-sm font-semibold">Call</div>
                <div className="text-xs opacity-70">{PHONE}</div>
              </div>
            </a>
            <div className="grid grid-cols-2 gap-3">
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl border border-background/20 p-4 transition hover:bg-background/5">
                <Instagram className="h-5 w-5" />
                <span className="text-sm font-semibold">Instagram</span>
              </a>
              <a href={TIKTOK} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl border border-background/20 p-4 transition hover:bg-background/5">
                <Globe className="h-5 w-5" />
                <span className="text-sm font-semibold">TikTok</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <img src={logoAsset.url} alt="" className="h-7 w-7 rounded-full object-contain" />
          <span className="text-sm font-semibold">Altairagency24</span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Altairwebs24 · Professional Web Design & Digital Solutions
        </p>
        <Link to="/auth" className="text-xs text-muted-foreground hover:text-foreground">Admin</Link>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <WhyASite />
        <Services />
        <Portfolio />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}