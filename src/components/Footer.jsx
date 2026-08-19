import { ArrowUp } from "lucide-react";
import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-edge">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-center text-xs text-zinc-500 md:flex-row md:px-10 md:text-left">
        <p className="font-display font-semibold text-zinc-400">{profile.name}</p>
        <p>
          Built with curiosity, caffeine &amp; code.
          <span className="blink text-accent" aria-hidden="true">_</span>
        </p>
        <div className="flex items-center gap-4">
          <span>© 2026 {profile.name}</span>
          <a
            href="#top"
            aria-label="Back to top"
            className="rounded-lg border border-edge p-2 text-zinc-400 transition-colors hover:border-accent/50 hover:text-accent"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}