'use client';

import { RefObject, useEffect, useRef } from 'react';
import { clamp } from './store';

/**
 * Calls cb(progress, rect) every frame while the element is near the viewport.
 * 'pin'  → 0..1 across a tall section with a sticky child
 * 'view' → 0..1 from element entering bottom to leaving top
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement>,
  cb: (p: number, r: DOMRect) => void,
  mode: 'pin' | 'view' = 'pin',
) {
  const fn = useRef(cb);
  fn.current = cb;
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = ref.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        if (r.bottom > -vh * 0.5 && r.top < vh * 1.5) {
          const p = mode === 'pin' ? clamp(-r.top / Math.max(1, r.height - vh)) : clamp((vh - r.top) / (vh + r.height));
          fn.current(p, r);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ref, mode]);
}

export const pad2 = (n: number) => String(n).padStart(2, '0');
