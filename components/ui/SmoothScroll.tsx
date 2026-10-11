'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';

let lenis: Lenis | null = null;
let locked = false;

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.6 });
  else el.scrollIntoView({ behavior: 'smooth' });
}

/** Smoothly "plays" the page to an absolute y over `duration` seconds (linear, like a video). */
export function playTo(y: number, duration: number) {
  if (lenis) lenis.scrollTo(y, { duration, easing: (t: number) => t, lock: false, force: true });
  else window.scrollTo({ top: y, behavior: 'smooth' });
}

export function setScrollLocked(lock: boolean) {
  locked = lock;
  if (lenis) (lock ? lenis.stop() : lenis.start());
  document.documentElement.style.overflow = lock ? 'hidden' : '';
}

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    lenis = new Lenis({ duration: 1.15, easing: (t: number) => 1 - Math.pow(1 - t, 4), smoothWheel: true, wheelMultiplier: 1.15, touchMultiplier: 1.4 });
    if (locked) lenis.stop();
    let raf = 0;
    const loop = (t: number) => {
      lenis?.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
  return null;
}
