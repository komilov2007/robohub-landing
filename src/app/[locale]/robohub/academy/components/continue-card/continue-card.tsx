"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { TOTAL_LESSONS, getLesson, getLessonsSorted, getTopic, nextLesson, type Lesson, lessonNo } from "../../lib/academy";
import { useLastLesson, useWatched } from "../../lib/progress";
import { fmt, yt } from "../../lib/youtube";
import Icon, { ICONS, PlayGlyph } from "../svg-icon/svg-icon";
import { lessonHref } from "../../lib/links";
import { common } from "../../lib/common.i18n";
import { useAcademyLocale } from "../locale/locale";
import { messages } from "./continue-card.i18n";
import { imgAlt } from "@/lib/img-alt";

// Bosh sahifa hero'sidagi kartochka: oxirgi ko'rilgan dars ("Davom ettiring") yoki Boshlang'ich yo'lning
// birinchi darsi ("Shu yerdan boshlang"), ostida keyingi 3 dars va umumiy progress.
// localStorage gidratatsiyadan keyin o'qiladi — server HTML'ida boshlang'ich dars.
// Ko'rinish: 3D'da og'gan, suzib turadigan kartochka (data-tilt — kursorga qarab og'adi), orqasida ikki "soya" varaq.
function upNext(n: number, count: number, locale: Locale): Lesson[] {
  const out: Lesson[] = [];
  for (let l = nextLesson(n, locale); l && out.length < count; l = nextLesson(l.n, locale)) out.push(l);
  return out;
}

export default function ContinueCard() {
  const locale = useAcademyLocale();
  const t = messages[locale];
  const c = common[locale];
  const last = useLastLesson();
  const watched = useWatched();
  const href = (l: Lesson) => lessonHref(locale, l.topic, l.n);
  const lastLesson = last ? getLesson(last.n, locale) : undefined;
  // Birinchi kirishda — butun Akademiyaning 1-darsi (mavzudan qat'i nazar); keyin — oxirgi ko'rilgan dars
  const lesson = lastLesson ?? getLessonsSorted(locale)[0];
  const next = upNext(lesson.n, 3, locale);

  return (
    <div className="acx-cc" data-tilt>
      <div className="acx-cc__float">
        <span className="acx-cc__sheet acx-cc__sheet--2" aria-hidden="true" />
        <span className="acx-cc__sheet acx-cc__sheet--1" aria-hidden="true" />
        <div className="acx-cc__card" data-glow>
          <Link href={href(lesson)} className="acx-cc__main">
            <span className="acx-cc__thumb">
              <picture>
                <source srcSet={yt.thumbHqWebp(lesson.youtubeId)} type="image/webp" />
                <img src={yt.thumbHq(lesson.youtubeId)} width={480} height={360} alt={imgAlt(locale, "lesson", lesson.title)} fetchPriority="high" decoding="async" />
              </picture>
              <span className="acx-cc__scan" aria-hidden="true" />
              <span className="acx-cc__badge">
                <i aria-hidden="true" />
                {lastLesson ? t.continue : c.startHere}
              </span>
              <span className="acx-cc__dur">{fmt(lesson.durationSec)}</span>
              <span className="acx-cc__play" aria-hidden="true">
                <i />
                <i />
                <PlayGlyph size={24} />
              </span>
            </span>
            <span className="acx-cc__info">
              <small>
                {getTopic(lesson.topic, locale)?.name} · {c.lessonN(lessonNo(lesson.n))}
              </small>
              <strong>{lesson.title}</strong>
            </span>
          </Link>

          {next.length > 0 && (
            <div className="acx-cc__next">
              <p>{t.next}</p>
              <ol>
                {next.map((l, i) => (
                  <li key={l.n} style={{ "--i": i } as CSSProperties}>
                    <Link href={href(l)}>
                      <span className={`acx-cc__n${watched.has(l.n) ? " is-done" : ""}`}>
                        {watched.has(l.n) ? <Icon d={ICONS.check} size={14} /> : lessonNo(l.n)}
                      </span>
                      <span className="acx-cc__title">{l.title}</span>
                      <em>{fmt(l.durationSec)}</em>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="acx-cc__foot">
            <span className="acx-meter" style={{ "--p": watched.size / TOTAL_LESSONS } as CSSProperties}>
              <i />
            </span>
            <span>{t.progress(watched.size, TOTAL_LESSONS)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
