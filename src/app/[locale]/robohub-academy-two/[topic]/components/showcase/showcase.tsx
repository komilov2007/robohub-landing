import type { CSSProperties } from "react";
import { TOPICS, type Topic } from "../../../lib/academy";
import Icon, { ICONS } from "../../../components/svg-icon/svg-icon";
import PlayLink from "../play-link/play-link";
import { VISUALS } from "./visuals";

// Videodan keyingi bo'lim — har mavzuda o'ziga xos: chapda qisqa matn va video havolalari,
// o'ngda mavzuning animatsiyali vizuali (visuals.tsx). Juft mavzularda tomonlar almashadi.
export default function Showcase({ topic }: { topic: Topic }) {
  const Visual = VISUALS[topic.slug];
  const flip = TOPICS.findIndex((t) => t.slug === topic.slug) % 2 === 1;
  return (
    <section id="how" className={`ac-section ac-show${flip ? " ac-show--flip" : ""}`} aria-labelledby="ac-show-title">
      <div className="container ac-show__grid">
        <div className="ac-show__text" data-reveal>
          <p className="ac-eyebrow">Videoda nima bor</p>
          <h2 id="ac-show-title" className="ac-h2">
            {topic.solution.title}
          </h2>
          <p className="ac-show__lead">{topic.solution.text}</p>
          <ul className="ac-show__list">
            {topic.features.map((f) => (
              <li key={f.title}>
                <PlayLink n={f.lesson} className="ac-show__item">
                  <span className="ac-show__play" aria-hidden="true">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 4.5v15l13-7.5z" />
                    </svg>
                  </span>
                  <span className="ac-show__name">{f.title}</span>
                  <span className="ac-show__n">{f.lesson}-dars</span>
                  <Icon d={ICONS.arrowRight} size={16} className="ac-show__go" />
                </PlayLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="ac-show__visual" aria-hidden="true" data-reveal style={{ "--ri": 1 } as CSSProperties}>
          <Visual />
          <p className="ac-sample">namuna</p>
        </div>
      </div>
    </section>
  );
}
