import { ABOUT_FRAMES, HERO_FRAMES, HERO_SKIP, live } from './store';

type Seq = (HTMLImageElement | null)[];
export const frames: { hero: Seq; about: Seq } = {
  hero: new Array(HERO_FRAMES).fill(null),
  about: new Array(ABOUT_FRAMES).fill(null),
};

const pad = (n: number) => String(n).padStart(3, '0');
let started = false;
const listeners = new Set<(p: number) => void>();

export function onFrameProgress(fn: (p: number) => void) {
  listeners.add(fn);
  fn(live.frameProgress);
  return () => {
    listeners.delete(fn);
  };
}

/** Loads coarse frames first (every 8th), then fills in, so scrubbing works almost immediately. */
export function loadFrames() {
  if (started || typeof window === 'undefined') return;
  started = true;
  const jobs: { seq: 'hero' | 'about'; i: number }[] = [];
  const seen = new Set<string>();
  for (const step of [16, 8, 4, 2, 1]) {
    for (let i = 0; i < HERO_FRAMES; i += step) push('hero', i);
    push('hero', HERO_FRAMES - 1);
    for (let i = 0; i < ABOUT_FRAMES; i += step) push('about', i);
    push('about', ABOUT_FRAMES - 1);
  }
  function push(seq: 'hero' | 'about', i: number) {
    const k = seq + i;
    if (seen.has(k)) return;
    seen.add(k);
    jobs.push({ seq, i });
  }
  const total = jobs.length;
  let done = 0;
  let cursor = 0;
  const CONCURRENCY = 6;
  const next = () => {
    const job = jobs[cursor++];
    if (!job) return;
    const img = new Image();
    img.decoding = 'async';
    img.src = `/frames/${job.seq}-hd/${pad(job.i + 1 + (job.seq === 'hero' ? HERO_SKIP : 0))}.webp`;
    const finish = () => {
      done++;
      live.frameProgress = done / total;
      listeners.forEach((l) => l(live.frameProgress));
      next();
    };
    img.onload = () => {
      frames[job.seq][job.i] = img;
      finish();
    };
    img.onerror = finish;
  };
  for (let c = 0; c < CONCURRENCY; c++) next();
}

/** Nearest loaded frame to index i. */
export function nearest(seq: Seq, i: number) {
  const n = Math.round(i);
  if (seq[n]) return seq[n];
  for (let d = 1; d < seq.length; d++) {
    if (seq[n - d]) return seq[n - d];
    if (seq[n + d]) return seq[n + d];
  }
  return null;
}
