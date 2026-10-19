"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { TopicSlug } from "../../../lib/academy";
import Stage from "../stages/stages";
import PlayLink from "../play-link/play-link";

export type ScrollyStep = { kicker: string; title: string; text?: string; lesson: number };

// Scrollytelling: chapda sticky "sahna" (kabinet mini-UI), o'ngda scroll bo'ylab qadam kartochkalari.
// Ekran markazidan o'tgan kartochka sahna holatini belgilaydi: flow qadamlari — phase 0..2,
// features — phase 3 + focus. Mobil va reduced-motion'da sahna har kartochka ichida (CSS bilan almashadi).
export default function Scrolly({ slug, steps, flowCount }: { slug: TopicSlug; steps: ScrollyStep[]; flowCount: number }) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const items = [...(listRef.current?.children ?? [])] as HTMLElement[];
    if (!items.length) return;
    // Ekran o'rtasidagi ingichka chiziq — shu chiziqni kesib turgan kartochka faol
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const stateOf = (i: number) => (i < flowCount ? { phase: i, focus: -1 } : { phase: 3, focus: i - flowCount });
  const cur = stateOf(active);

  return (
    <div className="ac-scrolly">
      <div className="ac-scrolly__stage">
        <div className="ac-scrolly__sticky">
          <Stage slug={slug} phase={cur.phase} focus={cur.focus} />
          <ol className="ac-scrolly__dots" aria-hidden="true">
            {steps.map((_, i) => (
              <li key={i} className={i === active ? "is-active" : i < active ? "is-done" : undefined} />
            ))}
          </ol>
        </div>
      </div>

      <ol className="ac-scrolly__steps" ref={listRef}>
        {steps.map((s, i) => {
          const st = stateOf(i);
          return (
            <li
              key={i}
              data-step={i}
              className={`ac-step${i === active ? " is-active" : ""}${i < flowCount ? "" : " is-feature"}`}
              style={{ "--i": i } as CSSProperties}
            >
              <p className="ac-step__kicker">{s.kicker}</p>
              <h3 className="ac-step__title">{s.title}</h3>
              {s.text && <p className="ac-step__text">{s.text}</p>}
              <div className="ac-step__mini">
                <Stage slug={slug} phase={st.phase} focus={st.focus} />
              </div>
              <PlayLink n={s.lesson} className="ac-step__play">
                <span className="ac-step__play-ico" aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 4.5v15l13-7.5z" />
                  </svg>
                </span>
                Videoda · {s.lesson}-dars
              </PlayLink>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
