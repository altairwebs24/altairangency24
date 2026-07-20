import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { ADMIN_EMAIL, THUMBNAIL_BUCKET, screenshotUrl, type Project } from "@/lib/portfolio-data";
import { ArrowUp, ArrowDown, Trash2, Plus, LogOut, Loader2, ExternalLink, Upload, X } from "lucide-react";

export const Route = createFileRoute("/admin")({
  ssr: false,
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        navigate({ to: "/auth" });
        return;
      }
      setUser(data.user);
      setChecking(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate({ to: "/auth" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  if (checking || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const isAdmin = user.email?.toLowerCase() === ADMIN_EMAIL;
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-xl font-bold">Not authorised</h1>
        <p className="text-sm text-muted-foreground">
          Signed in as {user.email}. Only {ADMIN_EMAIL} can manage projects.
        </p>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            navigate({ to: "/auth" });
          }}
          className="rounded-md border border-border px-4 py-2 text-sm"
        >
          Sign out
        </button>
      </div>
    );
  }

  return <AdminDashboard email={user.email!} />;
}

function AdminDashboard({ email }: { email: string }) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const { data: projects = [], refetch } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id, title, url, description, sort_order, thumbnail_url")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Project[];
    },
  });

  async function uploadThumb(p: Project, file: File) {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${p.id}-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from(THUMBNAIL_BUCKET)
      .upload(path, file, { upsert: true, contentType: file.type });
    if (upErr) { alert(upErr.message); return; }
    // Remove old file if it was a storage path
    if (p.thumbnail_url && !/^https?:\/\//i.test(p.thumbnail_url)) {
      await supabase.storage.from(THUMBNAIL_BUCKET).remove([p.thumbnail_url]);
    }
    const { error } = await supabase.from("projects").update({ thumbnail_url: path }).eq("id", p.id);
    if (error) { alert(error.message); return; }
    await refetch();
    qc.invalidateQueries({ queryKey: ["projects"] });
  }

  async function clearThumb(p: Project) {
    if (p.thumbnail_url && !/^https?:\/\//i.test(p.thumbnail_url)) {
      await supabase.storage.from(THUMBNAIL_BUCKET).remove([p.thumbnail_url]);
    }
    await supabase.from("projects").update({ thumbnail_url: null }).eq("id", p.id);
    await refetch();
    qc.invalidateQueries({ queryKey: ["projects"] });
  }

  async function addProject(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setSaving(true);
    try {
      const maxOrder = projects.reduce((m, p) => Math.max(m, p.sort_order), 0);
      const { error } = await supabase.from("projects").insert({
        title,
        url,
        description: description || null,
        sort_order: maxOrder + 10,
      });
      if (error) throw error;
      setTitle("");
      setUrl("");
      setDescription("");
      await refetch();
      qc.invalidateQueries({ queryKey: ["projects"] });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to add");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this project?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) alert(error.message);
    await refetch();
    qc.invalidateQueries({ queryKey: ["projects"] });
  }

  async function move(p: Project, dir: -1 | 1) {
    const idx = projects.findIndex((x) => x.id === p.id);
    const swapWith = projects[idx + dir];
    if (!swapWith) return;
    await Promise.all([
      supabase.from("projects").update({ sort_order: swapWith.sort_order }).eq("id", p.id),
      supabase.from("projects").update({ sort_order: p.sort_order }).eq("id", swapWith.id),
    ]);
    await refetch();
    qc.invalidateQueries({ queryKey: ["projects"] });
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-sm font-semibold">← Back to site</Link>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="hidden sm:inline">{email}</span>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: "/auth" });
              }}
              className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs"
            >
              <LogOut className="h-3 w-3" /> Sign out
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-bold">Manage portfolio</h1>
        <p className="mt-1 text-sm text-muted-foreground">Add new projects — they appear on your homepage instantly.</p>

        <form onSubmit={addProject} className="mt-6 space-y-3 rounded-2xl border border-border bg-background p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              required
              placeholder="Project name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              required
              type="url"
              placeholder="https://project-url.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <input
            placeholder="Short description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          {err && <p className="text-xs text-destructive">{err}</p>}
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-4 py-2 text-sm font-semibold text-background disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Add project
          </button>
        </form>

        <div className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-background">
          {projects.length === 0 && (
            <div className="p-6 text-center text-sm text-muted-foreground">No projects yet.</div>
          )}
          {projects.map((p, i) => (
            <ProjectRow
              key={p.id}
              p={p}
              first={i === 0}
              last={i === projects.length - 1}
              onMove={move}
              onDelete={remove}
              onUpload={uploadThumb}
              onClearThumb={clearThumb}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectRow({
  p, first, last, onMove, onDelete, onUpload, onClearThumb,
}: {
  p: Project;
  first: boolean;
  last: boolean;
  onMove: (p: Project, dir: -1 | 1) => void;
  onDelete: (id: string) => void;
  onUpload: (p: Project, file: File) => Promise<void>;
  onClearThumb: (p: Project) => Promise<void>;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const preview = p.thumbnail_url && /^https?:\/\//i.test(p.thumbnail_url)
    ? p.thumbnail_url
    : screenshotUrl(p.url);
  return (
    <div className="flex items-center gap-3 p-4">
      <div className="h-14 w-20 shrink-0 overflow-hidden rounded border border-border bg-secondary">
        <img src={preview} alt="" className="h-full w-full object-cover object-top" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-semibold">{p.title}</div>
        <a href={p.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <span className="truncate">{p.url}</span> <ExternalLink className="h-3 w-3 shrink-0" />
        </a>
        <div className="mt-1 flex items-center gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              setBusy(true);
              await onUpload(p, f);
              setBusy(false);
              if (fileRef.current) fileRef.current.value = "";
            }}
          />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={busy}
            className="inline-flex items-center gap-1 rounded border border-border px-2 py-1 text-[11px] disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-3 w-3 animate-spin" /> : <Upload className="h-3 w-3" />}
            {p.thumbnail_url ? "Replace image" : "Upload image"}
          </button>
          {p.thumbnail_url && (
            <button
              onClick={() => onClearThumb(p)}
              className="inline-flex items-center gap-1 rounded border border-border px-2 py-1 text-[11px] text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" /> Use auto
            </button>
          )}
        </div>
      </div>
      <button disabled={first} onClick={() => onMove(p, -1)} className="rounded border border-border p-1.5 disabled:opacity-30" aria-label="Move up">
        <ArrowUp className="h-4 w-4" />
      </button>
      <button disabled={last} onClick={() => onMove(p, 1)} className="rounded border border-border p-1.5 disabled:opacity-30" aria-label="Move down">
        <ArrowDown className="h-4 w-4" />
      </button>
      <button onClick={() => onDelete(p.id)} className="rounded border border-border p-1.5 text-destructive hover:bg-destructive/10" aria-label="Delete">
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}