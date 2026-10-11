'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { AWARDS, CERTS } from '@/lib/data';

/** Awards as spinning seals + certifications on a marquee that skews with scroll speed. */
export default function Honors() {
  const rowA = useRef<HTMLDivElement>(null);
  const rowB = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0, x = 0, v = 0, lastY = window.scrollY;
    const loop = () => {
      const y = window.scrollY;
      const dv = y - lastY;
      lastY = y;
      v += (dv - v) * 0.12;
      x -= 0.6 + Math.abs(v) * 0.35;
      const w = (rowA.current?.scrollWidth || 2) / 2;
      if (-x > w) x += w;
      const skew = Math.max(-12, Math.min(12, v * 0.4));
      if (rowA.current) rowA.current.style.transform = `translate3d(${x}px,0,0) skewX(${-skew}deg)`;
      if (rowB.current) rowB.current.style.transform = `translate3d(${-w - x}px,0,0) skewX(${skew}deg)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const certs = [...CERTS, ...CERTS];
  return (
    <section className="honors" id="honors">
      <header className="sec-head center">
        <p className="eyebrow">CHAPTER V</p>
        <h2>
          Seals of <span>honor</span>
        </h2>
      </header>
      <div className="seals">
        {AWARDS.map((a, i) => (
          <motion.div key={a.title} className="seal" data-hot initial={{ opacity: 0, y: 60, rotate: -8 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ delay: i * 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <svg viewBox="0 0 200 200" className="seal-ring">
              <defs>
                <path id={`sp${i}`} d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
              </defs>
              <circle cx="100" cy="100" r="96" className="sr-o" />
              <circle cx="100" cy="100" r="68" className="sr-i" />
              <text>
                <textPath href={`#sp${i}`}>{`${a.laurel} ✦ ${a.laurel} ✦ ${a.laurel} ✦ `}</textPath>
              </text>
            </svg>
            <div className="seal-core">
              <span className="seal-n">{String(i + 1).padStart(2, '0')}</span>
              <b>{a.title}</b>
              <small>{a.sub}</small>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="marquee" aria-label="Certifications">
        <div className="mq-row" ref={rowA}>
          {certs.map((c, i) => (
            <span key={i} className="mq-item">
              <b>{c.title}</b>
              <em>{c.by}</em>
              <i>✦</i>
            </span>
          ))}
        </div>
        <div className="mq-row outline" ref={rowB}>
          {certs.map((c, i) => (
            <span key={i} className="mq-item">
              <b>{c.by}</b>
              <i>✦</i>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
