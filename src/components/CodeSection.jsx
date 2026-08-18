import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "./icons";
import { profile } from "../data/profile";
import { languageColors, repos as manualRepos } from "../data/repos";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch {
    return "";
  }
}

function RepoCard({ repo, index }) {
  const color = languageColors[repo.language] ?? "#8b949e";
  return (
    <Reveal delay={index * 0.06}>
      <div className="group flex h-full flex-col rounded-2xl border border-edge bg-panel p-6 transition-colors duration-300 hover:border-accent/50">
        <div className="flex items-center justify-between gap-3">
          <h3 className="flex min-w-0 items-center gap-2 font-mono text-sm font-semibold text-zinc-100">
            <GitHubIcon className="h-4 w-4 shrink-0 text-zinc-500" aria-hidden="true" />
            <span className="truncate">{repo.name}</span>
          </h3>
          {repo.url && (
            <a
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${repo.name} on GitHub`}
              className="shrink-0 rounded-lg border border-edge p-1.5 text-zinc-400 transition-colors hover:border-accent/50 hover:text-accent"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
        <p className="mt-3 flex-1 text-xs leading-relaxed text-zinc-500">
          {repo.description || "No description yet."}
        </p>
        <p className="mt-4 flex items-center gap-2 font-mono text-[11px] text-zinc-500">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
          {repo.language}
          {repo.updatedAt && (
            <span className="text-zinc-600">· updated {repo.updatedAt}</span>
          )}
        </p>
      </div>
    </Reveal>
  );
}

export default function CodeSection() {
  const handle = profile.links.github ? profile.links.github.split("/").filter(Boolean).pop() : "";
  const [remote, setRemote] = useState(null); // null = not loaded, [] = loaded but empty

  useEffect(() => {
    if (!handle) return;
    let cancelled = false;
    fetch(`https://api.github.com/users/${handle}/repos?sort=updated&per_page=6`)
      .then((r) => {
        if (!r.ok) throw new Error("github api");
        return r.json();
      })
      .then((list) => {
        if (cancelled) return;
        const mapped = (list ?? []).map((r) => ({
          name: r.name,
          description: r.description,
          language: r.language,
          url: r.html_url,
          updatedAt: formatDate(r.updated_at),
        }));
        setRemote(mapped.length ? mapped : []);
      })
      .catch(() => {
        if (!cancelled) setRemote("error");
      });
    return () => {
      cancelled = true;
    };
  }, [handle]);

  const apiFailed = remote === "error";
  const loading = remote === null && !!handle;
  const list = apiFailed || !handle ? manualRepos : remote;

  return (
    <section id="code" className="relative py-28 md:py-36">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Open source / code"
          title="Work in public."
          description="Straight from my GitHub — no inflated stats, just code."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="rounded-2xl border border-edge bg-panel p-7">
              <div className="flex items-center gap-4">
                <span
                  className="flex h-16 w-16 items-center justify-center rounded-2xl font-display text-2xl font-bold text-ink"
                  style={{
                    background: "linear-gradient(135deg, #5b9dff 0%, #3f7fdd 100%)",
                  }}
                  aria-hidden="true"
                >
                  A
                </span>
                <div>
                  <p className="font-display text-xl font-bold text-zinc-100">{profile.name}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    {handle ? `github.com/${handle}` : "GitHub handle — add in src/data/profile.js"}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-zinc-400">
                Most of my code lives here — projects, experiments, and DSA practice.
              </p>
              {profile.links.github && (
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-accent"
                >
                  <GitHubIcon className="h-4 w-4" /> Visit GitHub
                </a>
              )}
            </div>
          </Reveal>

          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2" aria-busy="true">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-36 animate-pulse rounded-2xl border border-edge bg-panel"
                />
              ))}
            </div>
          ) : list.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2">
              {list.slice(0, 6).map((r, i) => (
                <RepoCard key={r.name} repo={r} index={i} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-2xl border border-dashed border-edge p-10 text-sm text-zinc-600">
              Repositories are being published here as I go.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}