'use client';

import { useRef } from 'react';
import { SEASONS } from '@/lib/data';
import { useScrollProgress } from '@/lib/useScroll';

/** Education + experience as a horizontal pinned track, cut by a red blade line that draws as you scroll. */
export default function Journey() {
  const sec = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const line = useRef<SVGPathElement>(null);
  const items = SEASONS.flatMap((s) => s.episodes.map((e) => ({ ...e, season: s })));

  useScrollProgress(sec, (p) => {
    const t = track.current;
    if (!t) return;
    const max = t.scrollWidth - window.innerWidth;
    t.style.transform = `translate3d(${-p * max}px,0,0)`;
    if (line.current) line.current.style.strokeDashoffset = String(1 - p);
    t.querySelectorAll<HTMLElement>('.jr-panel').forEach((el) => {
      const r = el.getBoundingClientRect();
      const c = (r.left + r.width / 2) / window.innerWidth - 0.5;
      el.style.setProperty('--c', String(Math.max(-1, Math.min(1, c * 2))));
    });
  });

  return (
    <section className="journey" id="journey" ref={sec} style={{ height: `${(items.length + 1) * 90 + 60}vh` }}>
      <div className="jr-sticky">
        <div className="jr-track" ref={track}>
          <svg className="jr-line" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path ref={line} pathLength={1} d="M0,70 C120,40 220,85 340,60 S560,30 680,62 S880,80 1000,40" />
          </svg>
          <div className="jr-intro">
            <p className="eyebrow">CHAPTER VI</p>
            <h2>
              The
              <br />
              <span>Journey</span>
            </h2>
            <p>Three arcs. One path. Scroll sideways through time →</p>
          </div>
          {items.map((it, i) => (
            <article key={it.title} className="jr-panel">
              <div className="jr-img">
                <img src={it.still} alt="" loading="lazy" />
              </div>
              <div className="jr-text">
                <span className="jr-arc">
                  ARC {String(i + 1).padStart(2, '0')} · {it.season.name}
                </span>
                <b className="jr-year">{it.season.years}</b>
                <h3>{it.title}</h3>
                <p className="jr-where">{it.where}</p>
                <p className="jr-note">{it.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
