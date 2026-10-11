import type { ProfileId } from './data';

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Live, mutable state shared by render loops (never triggers React renders). */
export const live = {
  mouse: { x: 0, y: 0 },
  hero: 0, // 0..1 progress through the pinned hero
  flight: 0, // 0..1 fly-down between hero and about
  about: 0, // 0..1 progress through the pinned about
  exit: 0, // px the about section has scrolled past its end
  frameProgress: 0, // 0..1 how many frames are loaded
};

/** First second (24 frames @24fps) of hero.mp4 is a fumbled take — skipped. */
export const HERO_SKIP = 24;
export const HERO_FRAMES = 240 - HERO_SKIP;
export const ABOUT_FRAMES = 96;

/** Hero scroll → hero frame (holds at both ends so the billboard and end card can breathe). */
export const heroFrameAt = (p: number) => seg(p, 0.05, 0.9) * (HERO_FRAMES - 1);
export const aboutFrameAt = (p: number) => seg(p, 0.08, 0.85) * (ABOUT_FRAMES - 1);

export const viewer: { id: ProfileId | null } = { id: null };
