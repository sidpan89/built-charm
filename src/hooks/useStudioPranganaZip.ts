import { useEffect, useState } from "react";
import JSZip from "jszip";

export type StudioPranganaTeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string; // object URL or normal URL
};

export type StudioPranganaProject = {
  id: number;
  title: string;
  category: string;
  location: string;
  image: string; // object URL or normal URL
};

type ZipStatus = "idle" | "loading" | "ready" | "error";

type ZipCache = {
  status: ZipStatus;
  team: StudioPranganaTeamMember[];
  projects: StudioPranganaProject[];
  error?: string;
};

const cache: ZipCache = {
  status: "idle",
  team: [],
  projects: [],
};

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const normalizeZipPath = (p: string) => p.replace(/^\.+\//, "").replace(/^\//, "");

async function resolveImageFromZip(zip: JSZip, src: string): Promise<string> {
  const cleaned = normalizeZipPath(src.trim());
  if (!cleaned) return "";
  if (/^https?:\/\//i.test(cleaned) || cleaned.startsWith("data:")) return cleaned;

  const direct = zip.file(cleaned);
  const byEnd = direct ? null : zip.file(new RegExp(`${escapeRegex(cleaned)}$`, "i"))?.[0];
  const file = direct ?? byEnd;
  if (!file) return "";

  const blob = await file.async("blob");
  return URL.createObjectURL(blob);
}

function findSection(doc: Document, keywords: string[]) {
  const byId = keywords
    .map((k) => doc.querySelector(`#${CSS.escape(k)}`))
    .find(Boolean) as HTMLElement | null;
  if (byId) return byId;

  const sections = Array.from(doc.querySelectorAll("section")) as HTMLElement[];
  const rx = new RegExp(keywords.map(escapeRegex).join("|"), "i");

  return (
    sections.find((s) => rx.test(s.id) || rx.test(s.className)) ??
    sections.find((s) => rx.test(s.textContent ?? "")) ??
    null
  );
}

function uniqueBy<T>(arr: T[], keyFn: (v: T) => string) {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const item of arr) {
    const k = keyFn(item);
    if (!k || seen.has(k)) continue;
    seen.add(k);
    out.push(item);
  }
  return out;
}

function extractCardRoots(section: HTMLElement) {
  const roots = new Set<HTMLElement>();
  const imgs = Array.from(section.querySelectorAll("img"));

  for (const img of imgs) {
    let el = img.parentElement as HTMLElement | null;
    for (let i = 0; i < 6 && el; i++) {
      const hasHeading = !!el.querySelector("h1,h2,h3,h4,h5");
      if (hasHeading) {
        roots.add(el);
        break;
      }
      el = el.parentElement as HTMLElement | null;
    }
  }

  return Array.from(roots);
}

function pickText(el: Element | null | undefined) {
  return (el?.textContent ?? "").replace(/\s+/g, " ").trim();
}

function parseTeamFromDocument(doc: Document) {
  const teamSection =
    findSection(doc, ["team"]) ??
    findSection(doc, ["our-team", "our team", "team-section"]);

  if (!teamSection) return [] as StudioPranganaTeamMember[];

  const roots = extractCardRoots(teamSection);
  const members = roots
    .map((root) => {
      const img = root.querySelector("img");
      const heading = root.querySelector("h3,h4,h5,h2,h1");
      const name = pickText(heading);

      const roleEl =
        root.querySelector(".role, .designation, .title") ??
        root.querySelector("p, span");
      const role = pickText(roleEl);

      const paragraphs = Array.from(root.querySelectorAll("p"))
        .map((p) => pickText(p))
        .filter(Boolean);
      const bio =
        paragraphs.sort((a, b) => b.length - a.length)[0] ??
        (paragraphs[0] ?? "");

      const image = img?.getAttribute("src")?.trim() ?? "";

      return {
        name,
        role: role === name ? "" : role,
        bio: bio === role ? "" : bio,
        image,
      } satisfies StudioPranganaTeamMember;
    })
    .filter((m) => m.name || m.image || m.role || m.bio);

  return uniqueBy(members, (m) => `${m.name}|${m.role}|${m.image}`);
}

function parseProjectsFromDocument(doc: Document) {
  const portfolioSection =
    findSection(doc, ["portfolio"]) ??
    findSection(doc, ["projects", "work", "our-work"]);

  if (!portfolioSection) return [] as Omit<StudioPranganaProject, "id">[];

  const roots = extractCardRoots(portfolioSection);
  const projects = roots
    .map((root) => {
      const img = root.querySelector("img");
      const heading = root.querySelector("h3,h4,h5,h2,h1");
      const title = pickText(heading);

      const categoryEl = root.querySelector(".category, [data-category]");
      const category =
        pickText(categoryEl) ||
        (root.getAttribute("data-category") ?? "") ||
        "Project";

      const locationEl = root.querySelector(".location, .place");
      const location = pickText(locationEl);

      const image = img?.getAttribute("src")?.trim() ?? "";

      return {
        title: title || "Untitled Project",
        category,
        location,
        image,
      };
    })
    .filter((p) => p.title || p.image);

  return uniqueBy(projects, (p) => `${p.title}|${p.image}`);
}

async function loadZipOnce() {
  if (cache.status === "loading" || cache.status === "ready") return cache;

  cache.status = "loading";
  cache.error = undefined;

  try {
    const res = await fetch("/studio_pragana.zip", { cache: "no-store" });
    if (!res.ok) {
      throw new Error(
        "studio_pragana.zip not found. Please ensure the ZIP is present in /public."
      );
    }

    const buf = await res.arrayBuffer();
    const zip = await JSZip.loadAsync(buf);

    const htmlFile = zip.file("index.html") ?? zip.file(/\.html$/i)?.[0];
    if (!htmlFile) throw new Error("No HTML file found inside the ZIP.");

    const html = await htmlFile.async("string");
    const doc = new DOMParser().parseFromString(html, "text/html");

    const rawTeam = parseTeamFromDocument(doc);
    const rawProjects = parseProjectsFromDocument(doc);

    const team = await Promise.all(
      rawTeam.map(async (m) => ({
        ...m,
        image: m.image ? await resolveImageFromZip(zip, m.image) : "",
      }))
    );

    const projects = await Promise.all(
      rawProjects.map(async (p, i) => ({
        id: i + 1,
        ...p,
        image: p.image ? await resolveImageFromZip(zip, p.image) : "",
      }))
    );

    cache.team = team.filter((m) => m.name || m.image);
    cache.projects = projects.filter((p) => p.title || p.image);
    cache.status = "ready";

    if (cache.team.length === 0 && cache.projects.length === 0) {
      cache.error =
        "ZIP loaded, but no team/portfolio data could be detected in its HTML.";
    }

    return cache;
  } catch (e) {
    cache.status = "error";
    cache.team = [];
    cache.projects = [];
    cache.error = e instanceof Error ? e.message : "Failed to load ZIP.";
    return cache;
  }
}

export function useStudioPranganaZip() {
  const [status, setStatus] = useState<ZipStatus>(cache.status);
  const [team, setTeam] = useState<StudioPranganaTeamMember[]>(cache.team);
  const [projects, setProjects] = useState<StudioPranganaProject[]>(cache.projects);
  const [error, setError] = useState<string | undefined>(cache.error);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const next = await loadZipOnce();
      if (!mounted) return;

      setStatus(next.status);
      setTeam(next.team);
      setProjects(next.projects);
      setError(next.error);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return { status, team, projects, error };
}
