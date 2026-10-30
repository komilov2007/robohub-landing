import type { CSSProperties } from "react";
import Icon from "../icon/svg-icon";
import { fill } from "../../ai-studio.content";
import { getC } from "../../content.server";
import { getLesson } from "../../../robohub/academy/lib/academy";
import { lessonHref } from "../../../robohub/academy/lib/links";
import { yt } from "../../../robohub/academy/lib/youtube";

// Robohub Academy: mijoz uchun ixcham blok. Chapda savol + tugma, o'ngda 3 ta haqiqiy dars kartasi
// (kartochka yaratish, narxlarni yangilash, Uzum Market'ni ulash) — nomi joriy tilda, muqova YouTube'dan,
// bosilsa o'sha darsning Academy sahifasi ochiladi. Darslar ro'yxati — ai-studio.content.ts → DATA.lessons.
// Kartalar biroz qiyshiq "taxlam" bo'lib turadi va sekin suzadi; muqovada Ken Burns zoom, play tugmasi to'lqin chiqaradi.
// Server komponent: Academy'ning katta darslar fayli brauzer bundle'iga tushmaydi.
export default async function Academy() {
  const { ACADEMY, locale } = await getC();
  const lessons = ACADEMY.lessons.flatMap((n) => {
    const lesson = getLesson(n, locale);
    return lesson
      ? [{ n, title: lesson.title, img: yt.thumbMq(lesson.youtubeId), href: `https://robohub.uz${lessonHref(locale, lesson.topic, n)}` }]
      : [];
  });

  return (
    <section className="as-acad" aria-labelledby="as-acad-title" data-pause>
      <div className="as-wrap">
        {/* telefon (≤767px) — alohida: sarlavha, darslar vertikal ro'yxat (muqova + nom), tugma pastda to'liq kenglikda */}
        <div className="as-am as-only-m" data-rv>
          <p className="as-am__title" role="heading" aria-level={2}>{ACADEMY.title}</p>
          <p className="as-am__lead">{ACADEMY.lead}</p>
          <ul className="as-am__list">
            {lessons.map((l, i) => (
              <li key={l.n} style={{ "--k": i } as CSSProperties}>
                <a href={l.href} target="_blank" rel="noopener" className="as-am__item">
                  <span className="as-am__cover">
                    <img src={l.img} alt="" loading="lazy" width={320} height={180} />
                    <span className="as-am__play" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M8 5.2v13.6a1 1 0 0 0 1.5.86l10.6-6.8a1 1 0 0 0 0-1.72L9.5 4.34A1 1 0 0 0 8 5.2z" />
                      </svg>
                    </span>
                  </span>
                  <span className="as-am__txt">
                    <span className="as-am__meta">
                      {fill(ACADEMY.lesson, { n: l.n })}
                      <i>{ACADEMY.free}</i>
                    </span>
                    <span className="as-am__name">{l.title}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a className="as-btn as-btn--primary as-btn--lg as-am__cta" href={ACADEMY.url} target="_blank" rel="noopener">
            {ACADEMY.cta}
            <span className="as-btn__ico" aria-hidden="true">
              <Icon name="arrow" className="as-i--right" />
            </span>
          </a>
        </div>

        <div className="as-acad__box as-only-d" data-rv>
          <div className="as-acad__copy">
            <h2 className="as-acad__title" id="as-acad-title">
              {ACADEMY.title}
            </h2>
            <p className="as-acad__lead">{ACADEMY.lead}</p>
            <a className="as-btn as-btn--primary as-btn--lg" href={ACADEMY.url} target="_blank" rel="noopener">
              {ACADEMY.cta}
              <span className="as-btn__ico" aria-hidden="true">
                <Icon name="arrow" className="as-i--right" />
              </span>
            </a>
          </div>

          <ul className="as-lessons">
            {lessons.map((l, i) => (
              <li key={l.n} className="as-lesson" style={{ "--k": i } as CSSProperties}>
                <a href={l.href} target="_blank" rel="noopener" className="as-lesson__link">
                  <span className="as-lesson__cover">
                    <img src={l.img} alt="" loading="lazy" width={320} height={180} />
                    <span className="as-lesson__play" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M8 5.2v13.6a1 1 0 0 0 1.5.86l10.6-6.8a1 1 0 0 0 0-1.72L9.5 4.34A1 1 0 0 0 8 5.2z" />
                      </svg>
                    </span>
                    <span className="as-lesson__free">{ACADEMY.free}</span>
                  </span>
                  <span className="as-lesson__meta">{fill(ACADEMY.lesson, { n: l.n })}</span>
                  <span className="as-lesson__title">{l.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
