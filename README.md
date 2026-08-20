# Aaryan Mittal — Portfolio

Personal portfolio of **Aaryan Mittal** — B.Tech CCE student, developer, builder, and creator. Built with React 19 + Vite, animated with Framer Motion and Lenis smooth scrolling, styled with Tailwind CSS 4.

Live: **[https://interestingaary.github.io/portfolio/](https://interestingaary.github.io/portfolio/)**

---

## Features

- **4 switchable themes** — `nebula`, `ocean`, `heavenly`, `hell` — with per-theme accent colors, textures, and decor (starfields, feathers, skulls, bubbles). Choice persists via `localStorage`.
- **Immersive scroll experience** — Lenis smooth scrolling, parallax starfields, scroll-scrubbed sections (manifesto paint, embroidery thread down the left edge), and a fullscreen circular transition curtain between sections.
- **Embroidery section** — a needle stitches a thread down the page as you scroll; text paints itself in word-by-word with a growing stitch line.
- **Ambient sound** — synthesized background music (zero audio assets), soft click on every press, and a gentle tick while scrolling; mute toggle in the navbar, persisted via `localStorage`.
- **Interactive sections** — Projects with modal + fullscreen interface-preview viewer (screenshots, not live iframes), GitHub-repo live cards, achievements, journey timeline, skills, code showcase (fetches your public GitHub repos), and contact.
- **Accessibility first** — reduced-motion mode renders every animation statically (verified), skip-to-content link, keyboard-usable menus/modals, semantic headings, contrast-aware per-theme colors.
- **Security hardening** — strict Content-Security-Policy (production builds only), referrer policy, no third-party scripts or tracking.

## Tech Stack

| Layer    | Choice                                        |
| -------- | --------------------------------------------- |
| UI       | React 19, Tailwind CSS 4                      |
| Motion   | Framer Motion, Lenis (smooth scroll)          |
| Icons    | lucide-react                                  |
| Build    | Vite 8                                        |
| Deploy   | GitHub Pages via GitHub Actions (auto)        |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Production build (outputs to dist/)
npm run build

# 4. Preview the production build (http://localhost:4173)
npm run preview
```

> The dev server does **not** apply the production Content-Security-Policy — it is injected into `dist/index.html` only at build time (`vite.config.js`).

## Customizing Your Data

All personal content lives in **one place** — `src/data/`:

- **`src/data/profile.js`** — name, role, tagline, bio, education, social links, creator channels. Empty links are hidden from the UI automatically.
- **`src/data/projects.js`** — projects shown in the grid: title, description, tags, image (`public/assets/projects/`), and links. Shipped projects show a screenshot of their built HTML interface instead of a live iframe so the demo never runs (and drains performance) inside the card.
- **`src/data/skills.js`** — skill groups, currently-learning list, DSA topics (also feeds the ticker marquee).
- **`src/data/repos.js`** — fallback repo list for the code section when the GitHub API is rate-limited.

Project images: add them to `public/assets/projects/` and reference as `assets/projects/<file>.png`.

## Themes

Themes are defined in `src/index.css` via CSS custom properties:

```
--color-bg / --color-fg / --color-accent / --color-panel / --color-edge
--mark / --mark-ink / --dot (per-theme textures & highlight colors)
```

To add a new theme: add a `[data-theme="..."]` block in `src/index.css`, register it in the `THEMES` array in `src/App.jsx`, and add its decor component if desired (see `NebulaDecor`, `FeatherDecor`, `HellDecor`, `OceanDecor`).

## Deployment

Pushing to `main` auto-deploys to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) (build → `upload-pages-artifact` → `deploy-pages`).

```bash
git push origin main
```

No manual steps — the workflow uses least-privilege permissions and `persist-credentials: false`.

## Repository Layout

```
portfolio/
├── .github/workflows/deploy.yml   # Auto-deploy to GitHub Pages
├── public/
│   └── assets/                    # Project screenshots, favicon
├── src/
│   ├── components/                # All sections + decor + effects
│   ├── data/                      # profile, projects, skills, repos
│   ├── lib/                       # Easter eggs, ambient sound engine
│   ├── App.jsx                    # Layout, theme switching, nav wiring
│   ├── main.jsx                   # Entry
│   └── index.css                  # Design tokens, themes, keyframes
├── index.html                     # Meta, inline theme-init script, CSP hooks
└── vite.config.js                 # Build config + production CSP injection
```

## Accessibility & Performance

- `prefers-reduced-motion` is honored globally — every scroll animation has a static fallback (verified via automated audits).
- Focus styles, semantic landmarks, and ARIA labels throughout.
- No web fonts beyond Inter / Space Grotesk / Instrument Serif; no heavy media; parallax uses cheap `transform`/`background-position` updates only.

## License

All content (text, design, branding) belongs to Aaryan Mittal. Code is shared for reference — please don't clone the site wholesale; build your own. 😄