'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { PROFILE, SUBTITLES } from '@/lib/data';
import { live } from '@/lib/store';
import { playTo, scrollToId } from '@/components/ui/SmoothScroll';

const EASE = [0.16, 1, 0.3, 1] as const;


function Words({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={className}>
      {text.split('').map((ch, i) => (
        <span className="ch-mask" key={i}>
          <motion.span initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ delay: delay + i * 0.035, duration: 1, ease: EASE }}>
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Billboard({ ready }: { ready: boolean }) {
  const [p, setP] = useState(0);
  const last = useRef(-1);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const v = live.hero;
      if (Math.abs(v - last.current) > 0.0012) {
        last.current = v;
        setP(v);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const lines = SUBTITLES.filter((s) => !s.sfx);
  const sub = lines.find((s) => p >= s.from && p < s.to);
  const intro = p < 0.05;
  const end = p > 0.9;

  return (
    <section className="hero" id="billboard">
      <div className="hero-sticky">
        <div className="hero-shade" />

        <AnimatePresence>
          {ready && intro && (
            <motion.div className="hero-intro" key="intro" exit={{ opacity: 0, x: -40, filter: 'blur(6px)', transition: { duration: 0.45 } }}>
              <motion.p className="hi-credit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1 }}>
                <i /> {PROFILE.realName} presents
              </motion.p>
              <h1 className="hi-title">
                <Words text={PROFILE.title} delay={0.3} className="t1" />
                <Words text={PROFILE.subtitle} delay={0.65} className="t2" />
              </h1>
              <motion.p className="hi-role" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.9, ease: EASE }}>
                {PROFILE.role} <span>·</span> React <span>·</span> Node <span>·</span> System Design
              </motion.p>
              <motion.p className="hi-log" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: 0.9, ease: EASE }}>
                Everyone wanted to know what was under the mask. Scroll, and the scene plays frame by frame. Stop, and time stops with you.
              </motion.p>
              <motion.div className="hi-actions" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.9, ease: EASE }}>
                <button
                  className="btn-red"
                  onClick={() => {
                    const el = document.getElementById('billboard')!;
                    playTo(el.offsetTop + el.offsetHeight - window.innerHeight, 10);
                  }}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path d="M7 4l13 8-13 8z" fill="currentColor" />
                  </svg>
                  Play the scene
                </button>
                <button className="btn-line" onClick={() => scrollToId('projects')}>
                  Skip to missions
                </button>
              </motion.div>
              <motion.div className="hi-cue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
                <span className="cue-track">
                  <i />
                </span>
                Scroll to play · scroll up to rewind
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* vertical scrub rail */}
        <div className="hero-rail" style={{ opacity: intro ? 0 : 1 }}>
          <i style={{ transform: `scaleY(${p})` }} />
          <b style={{ top: `${p * 100}%` }} />
        </div>

        {/* the story, told on the left in manga lettering */}
        <div className="story">
          <AnimatePresence mode="wait">
            {sub && !intro && !end && (
              <motion.div key={sub.text} className="story-line" initial="h" animate="s" exit="x">
                <motion.span className="story-no" variants={{ h: { opacity: 0, x: -20 }, s: { opacity: 1, x: 0 }, x: { opacity: 0 } }} transition={{ duration: 0.5 }}>
                  {String(lines.indexOf(sub) + 1).padStart(2, '0')} <i /> {String(lines.length).padStart(2, '0')}
                </motion.span>
                <p className="story-text">
                  {sub.text.split(' ').map((w, i) => (
                    <span className="sw" key={i}>
                      <motion.span
                        variants={{
                          h: { y: '115%', rotate: 6, opacity: 0 },
                          s: { y: '0%', rotate: 0, opacity: 1, transition: { delay: i * 0.07, duration: 0.7, ease: EASE } },
                          x: { y: '-60%', opacity: 0, filter: 'blur(6px)', transition: { duration: 0.3, delay: i * 0.02 } },
                        }}
                      >
                        {w}
                      </motion.span>{' '}
                    </span>
                  ))}
                </p>
                <motion.i className="story-brush" variants={{ h: { scaleX: 0 }, s: { scaleX: 1, transition: { delay: 0.25, duration: 0.9, ease: EASE } }, x: { opacity: 0 } }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* end title card */}
        <AnimatePresence>
          {end && (
            <motion.div className="hero-end" key="end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.3 } }}>
              <motion.p className="he-kicker" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.8, ease: EASE }}>
                CHAPTER I — UNMASKED
              </motion.p>
              <h2 className="he-name">
                <Words text={PROFILE.first} delay={0.15} />
                <Words text={PROFILE.last} delay={0.35} className="red" />
              </h2>
              <motion.i className="he-slash" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 0.9, ease: EASE }} />
              <motion.p className="he-role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
                {PROFILE.role} — keep scrolling, he’s coming down.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
