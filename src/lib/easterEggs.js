const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

let buffer = 0;

function triggerEgg() {
  document.body.classList.remove("egg-mode");
  // force reflow so the animation restarts on repeated triggers
  void document.body.offsetWidth;
  document.body.classList.add("egg-mode");
  setTimeout(() => document.body.classList.remove("egg-mode"), 4000);
}

export function setupEasterEggs() {
  console.log(
    "%cAARYAN MITTAL%c\nBUILD → EXPERIMENT → LEARN → IMPROVE → SHIP",
    "color:#5b9dff;font-family:ui-monospace,monospace;font-size:15px;font-weight:700",
    "color:#a1a1aa;font-family:ui-monospace,monospace;font-size:12px",
  );
  console.log("%cNice of you to open DevTools. Try the Konami code → ↑ ↑ ↓ ↓ ← → ← → B A", "color:#71717a;font-size:11px");

  window.addEventListener("keydown", (e) => {
    if (e.key === KONAMI[buffer]) {
      buffer += 1;
      if (buffer === KONAMI.length) {
        buffer = 0;
        triggerEgg();
      }
    } else {
      buffer = e.key === KONAMI[0] ? 1 : 0;
    }
  });
}
