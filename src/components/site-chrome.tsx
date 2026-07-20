import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import logoAsset from "@/assets/altair-logo.png.asset.json";

export const WHATSAPP =
  "https://wa.me/27736627793?text=Hi%20Altairagency24%2C%20I%27d%20like%20a%20quote%20for%20a%20website.";
export const EMAIL = "Altairwebs24@gmail.com";
export const PHONE = "+27 73 662 7793";
export const INSTAGRAM = "https://instagram.com/altairagency_24";
export const TIKTOK = "https://tiktok.com/@altairagency";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-foreground bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={logoAsset.url}
            alt="Altairagency24"
            className="h-9 w-9 object-contain"
          />
          <span className="text-sm tracking-tight sm:text-base">
            ALTAIRAGENCY<span className="font-serif-accent">24</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-widest md:flex">
          <a href="/#why" className="hover:opacity-60">Why</a>
          <a href="/#services" className="hover:opacity-60">Services</a>
          <Link to="/work" className="hover:opacity-60">Work</Link>
          <a href="/#contact" className="hover:opacity-60">Contact</a>
        </nav>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 bg-foreground px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-background transition hover:opacity-90"
        >
          <MessageCircle className="h-3.5 w-3.5" /> Quote
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <img src={logoAsset.url} alt="" className="h-7 w-7 object-contain" />
          <span className="text-sm">ALTAIRAGENCY<span className="font-serif-accent">24</span></span>
        </div>
        <p className="text-[11px] uppercase tracking-widest text-foreground/60">
          © {new Date().getFullYear()} Altairwebs24 · Web Design & Development
        </p>
        <Link to="/auth" className="text-[11px] uppercase tracking-widest text-foreground/60 hover:text-foreground">
          Admin
        </Link>
      </div>
    </footer>
  );
}