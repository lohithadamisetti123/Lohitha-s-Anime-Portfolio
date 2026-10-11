'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { PROFILE, SKILL_GENRES, STATS } from '@/lib/data';
import { live, seg } from '@/lib/store';

/** The gap the character leaps through on his way down. */
export function Flight() {
  return (
    <section className="flight" id="flight" aria-hidden>
      <div className="flight-card">
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ amount: 0.6 }} transition={{ duration: 0.6 }}>
          CHAPTER II
        </motion.span>
        <motion.b initial={{ opacity: 0, letterSpacing: '0.5em', filter: 'blur(10px)' }} whileInView={{ opacity: 1, letterSpacing: '0.04em', filter: 'blur(0px)' }} viewport={{ amount: 0.6 }} transition={{ duration: 1.2 }}>
          ORIGIN
        </motion.b>
      </div>
    </section>
  );
}

function useLive() {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0, prev = -1;
    const t = () => {
      const x = live.about;
      if (Math.abs(x - prev) > 0.002) {
        prev = x;
        setV(x);
      }
      raf = requestAnimationFrame(t);
    };
    raf = requestAnimationFrame(t);
    return () => cancelAnimationFrame(raf);
  }, []);
  return v;
}

const step = (p: number, a: number) => ({ opacity: seg(p, a, a + 0.08), transform: `translateY(${(1 - seg(p, a, a + 0.08)) * 30}px)` });

const STORY =
  'I copy a stack once and master it forever. I build scalable full-stack products with React, Node.js and modern backends — clean APIs, sharp system design, and code that ships. Department topper in Data Science, top 100 at Myntra HackerRamp, and 1,250+ problems solved across platforms.';

/** Ring dial for a stat — fills as you scroll. */
function Dial({ value, suffix, label, k }: { value: number; suffix: string; label: string; k: number }) {
  const C = 2 * Math.PI * 34;
  return (
    <div className="dial">
      <svg viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="34" className="d-bg" />
        <circle cx="40" cy="40" r="34" className="d-fg" style={{ strokeDasharray: C, strokeDashoffset: C * (1 - k) }} />
        {Array.from({ length: 24 }).map((_, i) => (
          <line key={i} x1="40" y1="2" x2="40" y2={i % 6 === 0 ? 7 : 4.5} transform={`rotate(${i * 15} 40 40)`} className="d-tick" />
        ))}
      </svg>
      <b>
        {Math.round(value * k)}
        <i>{suffix}</i>
      </b>
      <span>{label}</span>
    </div>
  );
}

export default function About() {
  const p = useLive();
  const words = STORY.split(' ');
  const inkP = seg(p, 0.16, 0.55);
  return (
    <section className="about" id="about">
      <div className="about-sticky">
        <div className="about-glow" />
        <div className="about-panel">
          <div className="ab-kicker" style={step(p, 0.02)}>
            <i /> CHAPTER II · ORIGIN
          </div>
          <h2 className="ab-title" style={step(p, 0.06)}>
            The developer
            <br />
            <span>behind the mask.</span>
          </h2>
          <p className="ab-ink" style={step(p, 0.12)}>
            {words.map((w, i) => {
              const lit = seg(inkP * words.length, i - 1, i + 1);
              return (
                <span key={i} style={{ opacity: 0.16 + lit * 0.84, color: lit > 0.9 && /topper|HackerRamp|1,250\+|forever\./.test(w) ? 'var(--red)' : undefined }}>
                  {w}{' '}
                </span>
              );
            })}
          </p>
          <div className="ab-dials" style={step(p, 0.5)}>
            {STATS.map((s, i) => (
              <Dial key={s.label} {...s} k={seg(p, 0.52 + i * 0.04, 0.7 + i * 0.04)} />
            ))}
          </div>
          <div className="ab-tags" style={step(p, 0.72)}>
            {SKILL_GENRES.map((g, i) => (
              <span key={g.name}>
                <i>{String(i + 1).padStart(2, '0')}</i>
                {g.name}
              </span>
            ))}
          </div>
          <a className="ab-resume" href={PROFILE.resume} target="_blank" rel="noreferrer" style={step(p, 0.78)}>
            Read the full script (résumé) <span>↗</span>
          </a>
        </div>
        <div className="ab-progress">
          <i style={{ transform: `scaleY(${p})` }} />
        </div>
      </div>
    </section>
  );
}
