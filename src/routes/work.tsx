import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { useProjects } from "@/lib/use-projects";
import { screenshotUrl, type Project } from "@/lib/portfolio-data";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Altairagency24" },
      {
        name: "description",
        content: "Recent websites designed and built by Altairagency24.",
      },
    ],
  }),
  component: WorkPage,
});

function Card({ p }: { p: Project }) {
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
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = screenshotUrl(p.url); }}
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

function WorkPage() {
  const { data: projects = [] } = useProjects();
  const sorted = [...projects].sort((a, b) => b.sort_order - a.sort_order);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <section className="border-b border-foreground">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:py-24">
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/60 hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> Home
            </Link>
            <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl">
              Selected <span className="font-serif-accent">work.</span>
            </h1>
            <p className="mt-4 max-w-lg text-foreground/70">
              Every site here is live, custom-built, and ships fast. Tap through to visit.
            </p>
          </div>
        </section>
        <section className="border-b border-foreground">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sorted.map((p) => <Card key={p.id} p={p} />)}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}