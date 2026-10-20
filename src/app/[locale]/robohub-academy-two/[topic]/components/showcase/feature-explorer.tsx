"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { getLesson, type Topic, type TopicSlug } from "../../../lib/academy";
import { fmt, yt } from "../../../lib/youtube";
import Icon, { ICONS, PlayGlyph } from "../../../components/svg-icon/svg-icon";
import PlayLink from "../play-link/play-link";
import { FEATURE_VISUALS } from "./feature-visuals";
import { VISUALS } from "./visuals";

// "Videoda nima bor" ko'rgazmasi: chapda raqamlangan bandlar (tablar) va faol bandning video darsi, o'ngda to'q sahna —
// faol bandning o'z vizuali (feature-visuals.tsx; band almashganda animatsiya bilan almashadi). Ikki ustun bir xil balandlikda. Faol band ostidagi chiziq AUTO ms'da to'ladi va keyingi bandga o'tadi
// (CSS animatsiya tugashi — onAnimationEnd). Sichqoncha/fokus ustida yoki bo'lim ekrandan tashqarida — pauza (CSS).
// prefers-reduced-motion: animatsiya yo'q → avtomatik almashish ham yo'q, faqat bosib tanlanadi.
const AUTO = 6500;

export default function FeatureExplorer({ topic, features }: { topic: TopicSlug; features: Topic["features"] }) {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = (i: number, focus = false) => {
    const n = (i + features.length) % features.length;
    setActive(n);
    if (focus) tabRefs.current[n]?.focus();
  };

  // Klaviatura: ↑/↓ (← →) — bandlar orasida, Home/End — birinchi/oxirgi
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const map: Record<string, number> = { ArrowDown: active + 1, ArrowRight: active + 1, ArrowUp: active - 1, ArrowLeft: active - 1, Home: 0, End: features.length - 1 };
    if (e.key in map) {
      e.preventDefault();
      go(map[e.key], true);
    }
  };

  const f = features[active];
  const lesson = getLesson(f.lesson);
  const Visual = FEATURE_VISUALS[topic][active] ?? VISUALS[topic];

  return (
    <div className={`acx-fx${inView ? " is-inview" : ""}`} ref={rootRef} style={{ "--auto": `${AUTO}ms` } as CSSProperties}>
      <div className="acx-fx__side">
        <div className="acx-fx__tabs" role="tablist" aria-orientation="vertical" aria-label="Videoda nima bor" onKeyDown={onKeyDown}>
          {features.map((x, i) => {
            const l = getLesson(x.lesson);
            const on = i === active;
            return (
              <button
                key={x.title}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${base}-tab-${i}`}
                aria-selected={on}
                aria-controls={`${base}-panel`}
                tabIndex={on ? 0 : -1}
                className={`acx-fx__tab${on ? " is-active" : ""}`}
                onClick={() => go(i)}
                data-glow
              >
                <span className="acx-fx__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="acx-fx__body">
                  <span className="acx-fx__name">{x.title}</span>
                  <span className="acx-fx__meta">
                    {x.lesson}-dars{l ? ` · ${fmt(l.durationSec)}` : ""}
                  </span>
                  <span className="acx-fx__more">
                    <span>{x.text}</span>
                  </span>
                </span>
                <span className="acx-fx__bar" aria-hidden="true">
                  {on && <i key={active} onAnimationEnd={() => go(active + 1)} />}
                </span>
              </button>
            );
          })}
        </div>

        {lesson && (
          <div className="acx-fx__lesson" key={active}>
            <PlayLink n={lesson.n} className="acx-fx__thumb">
              <img src={yt.thumbMq(lesson.youtubeId)} width={320} height={180} alt="" loading="lazy" decoding="async" />
              <span className="acx-fx__play" aria-hidden="true">
                <PlayGlyph size={16} />
              </span>
              <span className="acx-fx__dur">{fmt(lesson.durationSec)}</span>
              <span className="acx-sr">Videoni ko‘rish: {lesson.title}</span>
            </PlayLink>
            <div className="acx-fx__info">
              <p className="acx-fx__label">
                {lesson.n}-dars · {f.title}
              </p>
              <p className="acx-fx__title">{lesson.title}</p>
              {lesson.points.length > 0 && (
                <ul className="acx-fx__points" aria-label="Ushbu darsda">
                  {lesson.points.slice(0, 3).map((p, i) => (
                    <li key={p} style={{ "--i": i } as CSSProperties}>
                      <Icon d={ICONS.check} size={12} />
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="acx-fx__stage" role="tabpanel" id={`${base}-panel`} aria-labelledby={`${base}-tab-${active}`}>
        <span className="acx-fx__aurora" aria-hidden="true">
          <i />
          <i />
        </span>
        <div className="acx-fx__visual" aria-hidden="true">
          <div className="acx-fx__scene" key={active}>
            <Visual />
          </div>
          <span className="acx-fx__sample">namuna</span>
        </div>
      </div>
    </div>
  );
}
