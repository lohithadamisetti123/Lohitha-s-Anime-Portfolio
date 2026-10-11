'use client';

import { useRef } from 'react';
import { EPISODES } from '@/lib/data';
import { clamp } from '@/lib/store';
import { pad2, useScrollProgress } from '@/lib/useScroll';

/** Projects as mission dossiers that stack on top of each other as you scroll, with a cursor spotlight. */
export default function Missions() {
  const stack = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const N = EPISODES.length;

  useScrollProgress(
    stack,
    (_p, r) => {
      const vh = window.innerHeight;
      cards.current.forEach((c, i) => {
        if (!c) return;
        const next = cards.current[i + 1];
        let k = 0;
        if (next) {
          const nt = next.getBoundingClientRect().top;
          k = clamp(1 - (nt - vh * 0.12) / (vh * 0.75));
        } else {
          k = clamp(-(r.bottom - vh) / (vh * 0.6));
        }
        const inner = c.firstElementChild as HTMLElement;
        inner.style.transform = `scale(${1 - k * 0.08}) rotateX(${k * 6}deg)`;
        inner.style.filter = `brightness(${1 - k * 0.55})`;
      });
    },
    'view',
  );

  const spot = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const b = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - b.left}px`);
    el.style.setProperty('--my', `${e.clientY - b.top}px`);
  };

  return (
    <section className="missions" id="projects">
      <header className="sec-head">
        <p className="eyebrow">CHAPTER IV</p>
        <h2>
          Missions <span>completed</span>
        </h2>
        <p className="sec-sub">Three classified dossiers. Hover to shine a light on them.</p>
      </header>
      <div className="ms-stack" ref={stack}>
        {EPISODES.map((e, i) => (
          <article key={e.id} className="ms-card" ref={(el) => { cards.current[i] = el; }} style={{ top: `calc(11vh + ${i * 26}px)`, zIndex: i + 1 }}>
            <div className="ms-inner" onPointerMove={spot} data-hot>
              <div className="ms-spot" />
              <div className="ms-media">
                <img src={e.still} alt="" loading="lazy" />
                <div className="ms-duo" />
                <span className="ms-big">{pad2(i + 1)}</span>
                <span className="ms-stamp">{e.rank}</span>
              </div>
              <div className="ms-body">
                <p className="ms-file">
                  DOSSIER {pad2(i + 1)} / {pad2(N)} <i /> {e.genres.join(' · ')}
                </p>
                <h3>{e.name}</h3>
                <p className="ms-tag">“{e.tagline}”</p>
                <p className="ms-desc">{e.desc}</p>
                <ul className="ms-tech">
                  {e.tech.slice(0, 9).map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <a className="ms-link" href={e.url} target="_blank" rel="noreferrer">
                  <span>Open the source</span>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
