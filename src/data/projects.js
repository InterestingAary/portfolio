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
