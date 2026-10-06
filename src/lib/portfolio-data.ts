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
  // Free screenshot service — no signup, no AI images.
  return `https://image.thum.io/get/width/800/crop/600/noanimate/${encodeURIComponent(url)}`;
}

export const THUMBNAIL_BUCKET = "project-thumbnails";