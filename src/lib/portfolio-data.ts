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
];

export const ADMIN_EMAIL = "altairwebs24@gmail.com";

export function screenshotUrl(url: string): string {
  // Free screenshot service — no signup, no AI images.
  return `https://image.thum.io/get/width/800/crop/600/noanimate/${encodeURIComponent(url)}`;
}

export const THUMBNAIL_BUCKET = "project-thumbnails";