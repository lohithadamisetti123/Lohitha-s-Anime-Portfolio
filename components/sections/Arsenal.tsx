'use client';

import { useRef, useState } from 'react';
import { SKILL_GENRES, TOP10 } from '@/lib/data';
import { pad2, useScrollProgress } from '@/lib/useScroll';

/** Skills as a 3D drum of blades that turns with your scroll. */
export default function Arsenal() {
  const sec = useRef<HTMLElement>(null);
  const drum = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const N = SKILL_GENRES.length;
  const STEP = 360 / N;

  useScrollProgress(sec, (p) => {
    const t = p * (N - 1);
    if (drum.current) drum.current.style.transform = `translateZ(calc(var(--r) * -1)) rotateX(-6deg) rotateY(${-t * STEP}deg)`;
    const a = Math.round(t);
    setActive((x) => (x === a ? x : a));
  });

  return (
    <section className="arsenal" id="skills" ref={sec}>
      <div className="ars-sticky">
        <div className="ars-head">
          <p className="eyebrow">CHAPTER III</p>
          <h2>
            The
            <br />
            <span>Arsenal</span>
          </h2>
          <p className="ars-count">
            <b>{pad2(active + 1)}</b>
            <span>/ {pad2(N)}</span>
          </p>
          <p className="ars-now" key={active}>
            {SKILL_GENRES[active].name}
          </p>
          <ol className="ars-top">
            {TOP10.slice(0, 5).map((t, i) => (
              <li key={t.name}>
                <i>{pad2(i + 1)}</i>
                {t.name}
                <em>{t.genre}</em>
              </li>
            ))}
          </ol>
        </div>

        <div className="ars-scene">
          <div className="ars-drum" ref={drum}>
            {SKILL_GENRES.map((g, i) => (
              <article key={g.name} className={`ars-panel ${i === active ? 'on' : ''}`} style={{ transform: `rotateY(${i * STEP}deg) translateZ(var(--r))` }}>
                <span className="ap-idx">{pad2(i + 1)}</span>
                <h3>{g.name}</h3>
                <ul>
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
                <i className="ap-edge" />
              </article>
            ))}
          </div>
          <div className="ars-floor" />
        </div>
      </div>
    </section>
  );
}
