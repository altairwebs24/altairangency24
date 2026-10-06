export interface Project {
  id: string;
  title: string;
  url: string;
  description?: string | null;
  sort_order: number;
  thumbnail_url?: string | null;
}

// Fallback list used if the database is unreachable or empty. Ordered the way
// you asked — LSJ first, Foremost last.
export const FALLBACK_PROJECTS: Project[] = [
  { id: "f-1", title: "LSJ & Companies", url: "https://lsjandcomoanies.altairwebs24.workers.dev/", sort_order: 10 },
  { id: "f-2", title: "Bright Barber", url: "https://brightbarber.lovable.app", sort_order: 20 },
  { id: "f-3", title: "Nthumeni Architecture", url: "https://nthumeni-architecture-showcase-545e9666.altairwebs24.workers.dev/", sort_order: 30 },
  { id: "f-4", title: "Mangueze Reimagined", url: "https://mangueze-reimagined.altairwebs24.workers.dev/", sort_order: 40 },
  { id: "f-5", title: "Connect Shine", url: "https://connect-shine.altairwebs24.workers.dev/", sort_order: 50 },
  { id: "f-6", title: "N. Land Associates", url: "https://nlandassociatesinc.lovable.app/services", sort_order: 60 },
  { id: "f-7", title: "Bricksway", url: "https://bricksway.altairwebs24.workers.dev/", sort_order: 70 },
  { id: "f-8", title: "Plutofxkid", url: "https://plutofxkid.altairwebs24.workers.dev/", sort_order: 80 },
  { id: "f-9", title: "Stylesi Interior", url: "https://stylesiinterior.lovable.app/", sort_order: 90 },
  { id: "f-10", title: "Foremost Printing", url: "https://foremostprinting.lovable.app", sort_order: 100 },
  { id: "f-11", title: "Hotboxx", url: "https://hotboxx.co.za", sort_order: 110 },
  { id: "f-12", title: "Urbanfield", url: "https://urbanfield.altairwebs24.workers.dev", sort_order: 120 },
  { id: "f-13", title: "Mahamba Kitchen Projects", url: "https://mahamba-kitchen-projects.altairwebs24.workers.dev/", sort_order: 130 },
  { id: "f-14", title: "Flipaholics", url: "https://flipaholics.co.za", sort_order: 140 },
  { id: "f-15", title: "Floor2Frames Solutions", url: "https://floor2frames-solutions.altairwebs24.workers.dev", sort_order: 150 },
  { id: "f-16", title: "Antique Built-In Solutions", url: "https://antique-built-in-solutions.lovable.app", sort_order: 160 },
  { id: "f-17", title: "Mastercraft Projects", url: "https://mastercraftprojects.lovable.app/", sort_order: 170 },
];

export const ADMIN_EMAIL = "altairwebs24@gmail.com";

export function screenshotUrl(url: string): string {
  // Mobile-viewport screenshot (raw URL, not encoded — thum.io needs it raw).
  return `https://image.thum.io/get/width/600/crop/1100/viewportWidth/390/noanimate/${url}`;
}

export function fallbackScreenshotUrl(url: string): string {
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=600&h=1100&vpw=390&vph=715`;
}

export const isLovableSite = (url: string) => /\.lovable\.app/i.test(url);

/** Newest first, lovable.app sites always last. */
export function orderProjects(list: Project[]): Project[] {
  return [...list].sort((a, b) => {
    const la = isLovableSite(a.url) ? 1 : 0, lb = isLovableSite(b.url) ? 1 : 0;
    return la - lb || b.sort_order - a.sort_order;
  });
}
export const THUMBNAIL_BUCKET = "project-thumbnails";