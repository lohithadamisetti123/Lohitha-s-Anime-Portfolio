'use client';

import { useEffect, useRef } from 'react';

/** Red ring cursor with a trailing blade streak; grows over links/buttons. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    document.documentElement.classList.add('has-cursor');
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf = 0, hot = false;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement;
      hot = !!t.closest('a, button, [data-hot]');
    };
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      const vx = x - rx, vy = y - ry;
      const sp = Math.min(1, Math.hypot(vx, vy) / 120);
      const ang = Math.atan2(vy, vx);
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) rotate(${ang}rad) scale(${(hot ? 1.9 : 1) * (1 + sp * 0.6)}, ${(hot ? 1.9 : 1) * (1 - sp * 0.35)})`;
        ring.current.classList.toggle('hot', hot);
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', move);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);
  return (
    <>
      <div className="cur-ring" ref={ring} aria-hidden />
      <div className="cur-dot" ref={dot} aria-hidden />
    </>
  );
}
