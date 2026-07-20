import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FALLBACK_PROJECTS, THUMBNAIL_BUCKET, type Project } from "@/lib/portfolio-data";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async (): Promise<Project[]> => {
      const { data, error } = await supabase
        .from("projects")
        .select("id, title, url, description, sort_order, thumbnail_url")
        .order("sort_order", { ascending: true });
      if (error || !data || data.length === 0) return FALLBACK_PROJECTS;

      // For rows whose thumbnail_url is a storage path (no protocol),
      // mint a signed URL so private-bucket images are viewable publicly.
      const rows = data as Project[];
      const paths = rows
        .map((r) => r.thumbnail_url)
        .filter((u): u is string => !!u && !/^https?:\/\//i.test(u));
      if (paths.length > 0) {
        const { data: signed } = await supabase.storage
          .from(THUMBNAIL_BUCKET)
          .createSignedUrls(paths, 60 * 60 * 24 * 365);
        const map = new Map<string, string>();
        signed?.forEach((s) => {
          if (s.path && s.signedUrl) map.set(s.path, s.signedUrl);
        });
        return rows.map((r) =>
          r.thumbnail_url && map.has(r.thumbnail_url)
            ? { ...r, thumbnail_url: map.get(r.thumbnail_url)! }
            : r,
        );
      }
      return rows;
    },
  });
}