'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { PROFILE } from '@/lib/data';
import { scrollToId } from './SmoothScroll';

export const CHAPTERS = [
  { id: 'billboard', label: 'Prologue' },
  { id: 'about', label: 'Origin' },
  { id: 'skills', label: 'Arsenal' },
  { id: 'projects', label: 'Missions' },
  { id: 'honors', label: 'Honors' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Finale' },
];

export default function TopNav({ show }: { show: boolean }) {
  const [active, setActive] = useState(0);
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const t = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      const mid = window.innerHeight * 0.45;
      let a = 0;
      CHAPTERS.forEach((c, i) => {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top <= mid) a = i;
      });
      setActive((x) => (x === a ? x : a));
      raf = requestAnimationFrame(t);
    };
    raf = requestAnimationFrame(t);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.header className="nav" initial={{ y: -40, opacity: 0 }} animate={{ y: show ? 0 : -40, opacity: show ? 1 : 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
      <div className="nav-progress" ref={bar} />
      <button className="nav-mark" onClick={() => scrollToId('billboard')} aria-label="Back to top">
        <span className="nm-sq">LD</span>
        <span className="nm-txt">
          {PROFILE.realName}
          <small>{PROFILE.role}</small>
        </span>
      </button>
      <nav className="nav-chapters">
        {CHAPTERS.map((c, i) => (
          <button key={c.id} className={i === active ? 'on' : ''} onClick={() => scrollToId(c.id)}>
            <i>{String(i).padStart(2, '0')}</i>
            <span>{c.label}</span>
          </button>
        ))}
      </nav>
      <a className="nav-cta" href={`mailto:${PROFILE.email}`}>
        <span>Hire me</span>
      </a>
    </motion.header>
  );
}
