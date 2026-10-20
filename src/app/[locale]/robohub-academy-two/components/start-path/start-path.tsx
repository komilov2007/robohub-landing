"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { START_PATH, getTopic, lessonsByTopic, topicMinutes } from "../../lib/academy";
import { useWatched } from "../../lib/progress";
import Icon, { ICONS } from "../svg-icon/svg-icon";

// "Boshlang'ich yo'l" — yangi foydalanuvchi uchun 4 qadam (START_PATH). Progress localStorage'dan:
// tugatilgan qadam belgilanadi, birinchi tugatilmagani — "joriy" qadam.
// Ko'rinish: tepada tugunli chiziq — scroll bilan to'lib boradi (CSS scroll-driven), joriy tugun pulsatsiyalanadi.
export default function StartPath() {
  const watched = useWatched();
  const steps = START_PATH.map((s) => {
    const topic = getTopic(s.topic)!;
    const lessons = lessonsByTopic(s.topic);
    return { ...s, topic, lessons, done: lessons.filter((l) => watched.has(l.n)).length };
  });
  const current = steps.findIndex((s) => s.done < s.lessons.length);
  const lessonCount = steps.reduce((sum, s) => sum + s.lessons.length, 0);
  const minutes = steps.reduce((sum, s) => sum + topicMinutes(s.topic.slug), 0);

  return (
    <section className="acx-path" id="start" data-theme="light" aria-labelledby="ac-path-title">
      <div className="container">
        <div className="acx-head" data-reveal>
          <p className="acx-kicker">Boshlang‘ich yo‘l</p>
          <h2 id="ac-path-title" className="acx-h2">
            Yangi boshlayapsizmi? <span className="acx-mark">Shu tartibda ko‘ring</span>
          </h2>
          <p className="acx-head__note">
            {steps.length} qadam · {lessonCount} dars · {minutes} daqiqa
          </p>
        </div>

        <div className="acx-path__track">
        <span className="acx-path__rail" aria-hidden="true">
          <i />
        </span>
        <ol className="acx-path__list">
          {steps.map((s, i) => {
            const finished = s.done === s.lessons.length;
            const state = finished ? "is-done" : i === current ? "is-current" : "";
            return (
              <li key={s.topic.slug} className={state} style={{ "--i": i } as CSSProperties}>
                <span className="acx-path__node" aria-hidden="true">
                  {finished ? <Icon d={ICONS.check} size={16} /> : i + 1}
                </span>
                <Link href={`/${s.topic.slug}`} className="acx-step" data-glow aria-current={i === current ? "step" : undefined}>
                  <span className="acx-step__top">
                    <span className="acx-step__ico">
                      <Icon d={finished ? ICONS.check : s.topic.icon} size={22} />
                    </span>
                    {(finished || i === current) && (
                      <span className="acx-step__status">
                        {finished ? "Tugatildi" : s.done > 0 ? `${s.done} / ${s.lessons.length} ko‘rildi` : "Shu yerdan boshlang"}
                      </span>
                    )}
                  </span>
                  <span className="acx-step__n">{i + 1}-qadam</span>
                  <span className="acx-step__name">{s.topic.name}</span>
                  <span className="acx-step__text">{s.step}</span>
                  <span className="acx-step__meta">
                    {s.lessons.length} dars · {topicMinutes(s.topic.slug)} daq
                    <span className="acx-step__go">
                      <Icon d={ICONS.arrowRight} size={16} />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
        </div>
      </div>
    </section>
  );
}
