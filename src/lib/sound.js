/**
 * Ambient sound system — synthesized entirely with the Web Audio API so the
 * site ships zero audio assets. Background music (soft chord pad + sparse
 * music-box melody), a gentle click on every pointer press, and a quiet tick
 * while scrolling. Toggle state persists in localStorage; music only starts
 * after the first user gesture (browser autoplay policy).
 */

const STORAGE_KEY = "portfolio-sound";

const CHORDS = [
  { notes: [110.0, 277.18, 329.63, 493.88] }, // Amaj9
  { notes: [92.5, 220.0, 277.18, 329.63] }, // F#m7
  { notes: [73.42, 220.0, 277.18, 369.99] }, // Dmaj9
  { notes: [82.41, 207.65, 246.94, 329.63] }, // Esus4 → E
];

const CHORD_DURATION = 8;
const CHORD_FADE = 1.6;

let enabled = null;
let ctx = null;
let master = null;
let musicGain = null;
let musicOn = false;
let started = false;
let chordIdx = 0;
let nextNoteTime = 0;
let schedulerId = null;
let lastClickAt = 0;
let lastTickAt = 0;
const listeners = new Set();

function readPref() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
}

function writePref(v) {
  try {
    localStorage.setItem(STORAGE_KEY, v ? "on" : "off");
  } catch {}
}

function emit() {
  for (const fn of listeners) fn(!!enabled);
}

function ensureCtx() {
  if (ctx) return ctx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = 0.9;
  master.connect(ctx.destination);
  musicGain = ctx.createGain();
  musicGain.gain.value = 0;
  musicGain.connect(master);
  return ctx;
}

function padNote(freq, t, dur, pan) {
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.value = freq;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.05, t + CHORD_FADE);
  g.gain.setValueAtTime(0.05, t + dur - CHORD_FADE);
  g.gain.linearRampToValueAtTime(0, t + dur);
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1100;
  const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
  if (panner) panner.pan.value = pan;
  osc.connect(filter);
  filter.connect(g);
  if (panner) g.connect(panner), panner.connect(musicGain);
  else g.connect(musicGain);
  osc.start(t);
  osc.stop(t + dur + 0.05);
}

function pluck(freq, t, gain) {
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = freq;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
  const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
  if (panner) panner.pan.value = (Math.random() - 0.5) * 0.6;
  osc.connect(g);
  if (panner) g.connect(panner), panner.connect(musicGain);
  else g.connect(musicGain);
  osc.start(t);
  osc.stop(t + 1.7);
}

function scheduleChord(chord, t) {
  chord.notes.forEach((f, i) => {
    padNote(f, t, CHORD_DURATION, i % 2 === 0 ? -0.35 : 0.35);
  });
}

function scheduleMelody(chord, t) {
  const pool = [...chord.notes.slice(1), chord.notes[1] * 2, chord.notes[2] * 2];
  let mt = t + 0.4;
  while (mt < t + CHORD_DURATION - 1) {
    const f = pool[Math.floor(Math.random() * pool.length)];
    pluck(f, mt, 0.035 + Math.random() * 0.02);
    mt += 1.1 + Math.random() * 0.9;
  }
}

function scheduler() {
  if (!musicOn || !ctx) return;
  while (nextNoteTime < ctx.currentTime + 0.8) {
    const chord = CHORDS[chordIdx];
    scheduleChord(chord, nextNoteTime);
    scheduleMelody(chord, nextNoteTime);
    nextNoteTime += CHORD_DURATION;
    chordIdx = (chordIdx + 1) % CHORDS.length;
  }
}

function startMusic() {
  if (musicOn || !ctx) return;
  musicOn = true;
  musicGain.gain.cancelScheduledValues(ctx.currentTime);
  musicGain.gain.setValueAtTime(musicGain.gain.value, ctx.currentTime);
  musicGain.gain.linearRampToValueAtTime(1, ctx.currentTime + 1.5);
  nextNoteTime = ctx.currentTime + 0.1;
  scheduler();
  schedulerId = setInterval(scheduler, 250);
}

function stopMusic() {
  if (!musicOn || !ctx) return;
  musicOn = false;
  if (schedulerId) {
    clearInterval(schedulerId);
    schedulerId = null;
  }
  const t = ctx.currentTime;
  musicGain.gain.cancelScheduledValues(t);
  musicGain.gain.setValueAtTime(musicGain.gain.value, t);
  musicGain.gain.linearRampToValueAtTime(0, t + 0.6);
}

function playClick() {
  if (!ctx || !master) return;
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(760, t);
  osc.frequency.exponentialRampToValueAtTime(340, t + 0.07);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.14, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
  osc.connect(g);
  g.connect(master);
  osc.start(t);
  osc.stop(t + 0.12);
}

function playTick() {
  if (!ctx || !master) return;
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(920, t);
  osc.frequency.exponentialRampToValueAtTime(640, t + 0.05);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.025, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
  osc.connect(g);
  g.connect(master);
  osc.start(t);
  osc.stop(t + 0.1);
}

export function isSoundEnabled() {
  if (enabled === null) enabled = readPref();
  return enabled;
}

export function setSoundEnabled(v) {
  enabled = !!v;
  writePref(enabled);
  if (enabled) {
    ensureCtx();
    if (ctx) {
      if (ctx.state === "suspended") ctx.resume();
      startMusic();
    }
  } else {
    stopMusic();
  }
  emit();
}

export function subscribeSound(fn) {
  listeners.add(fn);
  fn(isSoundEnabled());
  return () => listeners.delete(fn);
}

export function setupSounds() {
  if (enabled === null) enabled = readPref();
  if (typeof window === "undefined" || !("AudioContext" in window || "webkitAudioContext" in window)) return;

  const onGesture = () => {
    const ac = ensureCtx();
    if (!ac) return;
    if (ac.state === "suspended") ac.resume();
    if (enabled) startMusic();
  };
  const onPointerDown = () => {
    onGesture();
    if (!enabled) return;
    const now = performance.now();
    if (now - lastClickAt < 70) return;
    lastClickAt = now;
    playClick();
  };
  const onScroll = () => {
    onGesture();
    if (!enabled) return;
    const now = performance.now();
    if (now - lastTickAt < 150) return;
    lastTickAt = now;
    playTick();
  };

  window.addEventListener("pointerdown", onPointerDown, true);
  window.addEventListener("keydown", onGesture, true);
  window.addEventListener("wheel", onScroll, { passive: true });
  document.addEventListener("scroll", onScroll, { passive: true });
}