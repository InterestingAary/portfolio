import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Content-Security-Policy for the production build.
// Injected only at build time (apply: "build") so the dev server is unaffected.
// The sha256 hashes allow the two inline scripts in index.html
// (theme init + JSON-LD structured data); everything else must come
// from the site's own origin.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'sha256-X0whBwcSQhza1DeSYt5gto9VRd+flPh0BOK14Nor3fw=' 'sha256-TzT5pN/AF+vLPWkFYfrFeTF/CMprZnEcILIbP0cvNTc='",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
  "connect-src 'self' https://api.github.com",
  "frame-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const cspPlugin = {
  name: "inject-csp",
  apply: "build",
  transformIndexHtml(html) {
    return html.replace(
      '<meta charset="UTF-8" />',
      '<meta charset="UTF-8" />\n    <meta http-equiv="Content-Security-Policy" content="' + CSP + '" />'
    );
  },
};

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss(), cspPlugin],
});