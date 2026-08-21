/**
 * ─────────────────────────────────────────────────────────────
 *  PROJECTS — add a new project by adding one object here.
 *
 *  status: "winner" | "live" | "building"
 *  shipped: true → appears under SHIPPED, false → under BUILDING
 *  Optional case-study fields are only rendered if filled in.
 *  Empty links are hidden automatically.
 * ─────────────────────────────────────────────────────────────
 */
export const projects = [
  {
    id: "dsaglazer",
    name: "DSAglazzer",
    shipped: true,
    status: "live",
    category: "Web",
    oneLiner: "Spaced repetition DSA revision tracker — remember what you solve, revise on time.",
    accent: "#14b8a6",
    glyph: "DG",
    // Screenshot of the shipped interface, shown in place of a live embed
    // so the demo doesn't run (and drain performance) inside the card.
    image: "assets/projects/dsaglazer.png",
    milestone: "Latest shipped · PWA + Extension",

    overview:
      "DSAglazzer is an offline-first DSA revision tracker built with React 19 + Vite + Tailwind CSS v4. Every solved problem is scheduled through spaced repetition (Day 3 → Day 7 → Day 30 — fully customizable) so you revisit patterns at the exact moment you'd otherwise forget them. It includes a 365-day GitHub-style heatmap, streaks, smart filters (topic, difficulty, platform, 23 algorithm tags), calendar with dots and agenda drawer, and analytics (Recharts). It's PWA-installable, supports dark/light themes, browser notifications, import/export, and a Chrome Extension (MV3) that auto-detects Accepted solves on LeetCode, GFG, Codeforces, CodeChef, and AtCoder.",

    problem:
      "Solving many DSA problems doesn't help if you forget the patterns — most revision trackers are manual spreadsheets or lack timing logic, so hard-earned patterns fade before interviews.",

    solution:
      "Automate the revision schedule: log a solve once, let the spaced repetition engine surface it on Day 3, 7, and 30 (or your own intervals), and give one-tap Complete / Skip / Overdue flows with a Today's Revision queue that keeps you honest.",

    features: [
      "Spaced repetition engine (3/7/30 defaults, editable 1–365 days)",
      "Offline-first — 100% LocalStorage, PWA installable",
      "365-day GitHub-style heatmap (teal scale) + smart daily streak",
      "Full CRUD & smart filters (topic/difficulty/platform/23 tags/favourites)",
      "Calendar month view with overdue/due/upcoming dots + agenda drawer",
      "Analytics — Recharts difficulty donut + top topics + completion rate",
      "Portfolio-grade UI — Inter + Space Grotesk + Instrument Serif, grain + dot-grid + Lenis + Reveal",
      "Dark/Light token themes, notifications, import/export JSON",
      "Chrome Extension (MV3) auto-detects Accepted solves on 5 platforms",
    ],

    technologies: [
      "React 19",
      "TypeScript",
      "Vite 8",
      "Tailwind CSS 4",
      "Framer Motion 13",
      "Lenis",
      "Recharts",
      "React Router 7",
      "PWA (vite-plugin-pwa)",
      "Vitest",
      "Chrome Extension (MV3)",
    ],

    role: "Designed, built, and shipped solo — from spaced repetition logic and data model to UI, PWA, extension, tests (49), and CI/CD to GitHub Pages.",

    challenges: [
      "Tuning spaced repetition intervals so they feel helpful rather than noisy",
      "Building a Chrome Extension that reliably detects Accepted on 5 different sites",
      "Keeping an offline-first LocalStorage + PWA app fast and consistent across views",
    ],

    learned: [
      "How spaced repetition and active recall actually improve retention for DSA",
      "Shipping a full PWA with installability, theming, and offline caching",
      "End-to-end CI/CD with GitHub Actions to Pages and keeping a polished portfolio-grade UI consistent",
    ],

    links: {
      demo: "https://interestingaary.github.io/DSAglazzer/",
      github: "https://github.com/InterestingAary/DSAglazzer",
    },
  },

  {
    id: "rural-guards",
    name: "Rural Guards",
    shipped: true,
    status: "winner",
    category: "Software",
    oneLiner: "Hackathon-winning rural safety & assistance platform for farmers and fishermen.",
    accent: "#5b9dff",
    glyph: "RG",
    // Screenshot of the built HTML interface, shown in place of a live embed
    // so the demo page doesn't run (and drain performance) inside the card.
    image: "assets/projects/rural-guards.png",
    achievement: "1st Place — Open Innovation · Srujana 2026",

    overview:
      "Rural Guards is a rural support and emergency safety platform for farmers and fishermen — built with my team for the Srujana 2026 hackathon. It combines AI crop disease detection, weather guidance, government scheme awareness, dealer discovery, and dam-alert communication with role-based controls, an interactive map, and voice assistance.",

    problem:
      "Farmers and fishermen can face fragmented access to information, weather guidance, emergency alerts, and support resources — and critical warnings may not reach the right people in time.",

    solution:
      "Build one platform combining useful rural assistance and emergency communication — bringing crop help, weather, schemes, dealers, and dam alerts together in a single, accessible system.",

    features: [
      "AI crop disease detection",
      "Weather-based agricultural guidance",
      "Government scheme awareness",
      "Dealer discovery with interactive maps",
      "Dam alert communication",
      "Role-based controls",
      "Emergency communication",
      "Voice assistance",
    ],

    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "Express.js",
      "Python",
      "APIs",
      "Leaflet",
      "Twilio",
      "ElevenLabs",
    ],

    role: "Worked with my team across the stack — frontend, backend, API integrations, and the map and alert features.",

    challenges: [
      "Building a working product with a team under hackathon time pressure",
      "Coordinating multiple APIs (maps, SMS, voice) into one smooth flow",
      "Keeping the platform simple enough for non-technical rural users",
    ],

    learned: [
      "How to ship a working product with a team under a tight deadline",
      "Hands-on experience with real APIs, maps, and alert systems",
      "That designing for real users changes how you choose features",
    ],

links: {
      demo: "", // TODO: add the deployed URL when available
      github: "https://github.com/InterestingAary/Rural-Guards", // verified public repo
    },
  },

  {
    id: "birthday-wishes",
    name: "Birthday Wishes",
    shipped: true,
    status: "live",
    category: "Web",
    oneLiner: "A personalized, shareable birthday web experience built as my first publicly deployed website.",
    accent: "#7aa7f7",
    glyph: "BW",
    // Screenshot of the built HTML interface, shown in place of a live embed
    // so the demo page doesn't run (and drain performance) inside the card.
    image: "assets/projects/birthday-wishes.png",
    milestone: "First public deployment",

    overview:
      "A small personalized web experience where a sender customizes a birthday website for someone, shares the link, and the receiver gets a personal experience. Built to explore interactive web design and deployment — my first public website.",

    problem:
      "I wanted to learn the full journey of shipping a web project — from designing an interactive experience to deploying it publicly.",

    solution:
      "Built a customizable birthday experience with playful, interactive styling, then deployed it so anyone with the link can open it.",

    features: [
      "Customizable birthday experience",
      "Interactive, playful design",
      "Responsive on phones",
      "Publicly deployed & shareable",
    ],

    technologies: ["HTML", "CSS", "JavaScript"],

    role: "Designed, built, and deployed it solo — front to back.",

    challenges: [
      "First deployment — figuring out hosting and domains",
      "Making the design feel intentional rather than template-like",
    ],

    learned: [
      "The complete build → deploy loop for a web project",
      "That small, well-made projects are worth shipping",
    ],

    links: {
      demo: "https://interestingaary.github.io/birthday-cake/",
      github: "https://github.com/InterestingAary/birthday-cake", // verified public repo
    },
  },

  {
    id: "muzilo",
    name: "Muzilo",
    shipped: false,
    status: "building",
    category: "Software",
    oneLiner: "Project currently being developed.",
    accent: "#5b9dff",
    glyph: "MZ",

    overview: "",

    problem: "",
    solution: "",
    features: [],
    technologies: [],
    role: "",
    challenges: [],
    learned: [],

    links: {
      demo: "",
      github: "",
    },
  },

  {
    id: "omnitriage",
    name: "OmniTriage",
    shipped: false,
    status: "building",
    category: "Software",
    oneLiner: "Project currently being developed.",
    accent: "#6f93e8",
    glyph: "OT",

    overview: "",

    problem: "",
    solution: "",
    features: [],
    technologies: [],
    role: "",
    challenges: [],
    learned: [],

    links: {
      demo: "",
      github: "",
    },
  },

  {
    id: "gym-training",
    name: "Gym Training",
    shipped: false,
    status: "building",
    category: "Software",
    oneLiner: "Project currently being developed.",
    accent: "#5b9dff",
    glyph: "GT",

    overview: "",

    problem: "",
    solution: "",
    features: [],
    technologies: [],
    role: "",
    challenges: [],
    learned: [],

    links: {
      demo: "",
      github: "",
    },
  },
];
