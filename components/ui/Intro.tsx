'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { onFrameProgress } from '@/lib/frames';
import { PROFILE } from '@/lib/data';

const EASE = [0.76, 0, 0.24, 1] as const;

/** Cinematic cold open: a red line burns in while frames load, then the letterbox splits open. */
export default function Intro({ onDone }: { onDone: () => void }) {
  const [p, setP] = useState(0);
  const [open, setOpen] = useState(false);
  const done = useRef(false);

  useEffect(() => onFrameProgress(setP), []);

  const finish = () => {
    if (done.current) return;
    done.current = true;
    setOpen(true);
    setTimeout(onDone, 1250);
  };

  useEffect(() => {
    if (p > 0.22) {
      const t = setTimeout(finish, 900);
      return () => clearTimeout(t);
    }
  }, [p]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const t = setTimeout(finish, 7000);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const pct = Math.min(100, Math.round((p / 0.22) * 100));

  return (
    <div className={`intro ${open ? 'open' : ''}`}>
      <motion.div className="intro-half top" animate={{ y: open ? '-100%' : '0%' }} transition={{ duration: 1.1, ease: EASE, delay: 0.15 }} />
      <motion.div className="intro-half bot" animate={{ y: open ? '100%' : '0%' }} transition={{ duration: 1.1, ease: EASE, delay: 0.15 }} />
      <AnimatePresence>
        {!open && (
          <motion.div className="intro-core" exit={{ opacity: 0, scale: 1.08, filter: 'blur(8px)' }} transition={{ duration: 0.5 }}>
            <motion.p className="intro-pre" initial={{ opacity: 0, letterSpacing: '1.2em' }} animate={{ opacity: 1, letterSpacing: '0.6em' }} transition={{ duration: 1.6, ease: 'easeOut' }}>
              A {PROFILE.realName.toUpperCase()} PORTFOLIO
            </motion.p>
            <div className="intro-line">
              <i style={{ transform: `scaleX(${pct / 100})` }} />
            </div>
            <p className="intro-pct">
              <span>REEL 01</span>
              <b>{String(pct).padStart(3, '0')}</b>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
