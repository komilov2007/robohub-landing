import type { CSSProperties } from "react";
import Link from "next/link";
import { getLocale } from "@/i18n/server";
import { getTopics, TOTAL_LESSONS, lessonsByTopic, topicMinutes, type Topic } from "../../../lib/academy";
import { common } from "../../../lib/common.i18n";
import { messages } from "./topics-rail.i18n";
import { yt } from "../../../lib/youtube";
import { topicHref } from "../../../lib/links";
import Swiper from "../../../components/swiper/swiper";
import Icon, { ICONS } from "../../../components/svg-icon/svg-icon";
import { imgAlt } from "@/lib/img-alt";

// "Mavzular" — alohida bo'lim (to'liq kenglikdagi och neytral fon, katta sarlavha): barcha mavzular bitta qatorda,
// swiper'da. Kartochka — mavzu kartochkasi (video emas): ikon va hajmi, nom, qisqa tavsif, pastda darslarning
// kichik muqovalari ustma-ust va "Ochish". Hover'da ko'tariladi, chegara yorishadi — soyasiz. Joriy mavzu ajratilgan.
const STACK = 3;

export default async function TopicsRail({ topic }: { topic: Topic }) {
  const locale = await getLocale();
  const t = messages[locale];
  const c = common[locale];
  const topics = getTopics(locale);
  return (
    <section className="acx-rail" data-theme="light" aria-labelledby="ac-rail-title">
      <div className="container">
        <div className="acx-head" data-reveal>
          <h2 id="ac-rail-title" className="acx-h2">
            {t.title} <span className="acx-mark">{t.mark}</span>
          </h2>
          <p className="acx-head__note">
            {c.topics(topics.length)} · {c.lessons(TOTAL_LESSONS)}
          </p>
        </div>
        <Swiper label={t.kicker} className="acx-tv">
          {topics.map((x, i) => {
            const cur = x.slug === topic.slug;
            const ls = lessonsByTopic(x.slug, locale);
            const more = ls.length - STACK;
            return (
              <li key={x.slug} style={{ "--i": i } as CSSProperties}>
                <Link href={topicHref(locale, x.slug)} className={`acx-tc${cur ? " is-current" : ""}`} aria-current={cur ? "page" : undefined}>
                  <span className="acx-tc__top">
                    <span className="acx-tc__ico" aria-hidden="true">
                      <Icon d={x.icon} size={22} />
                    </span>
                    {cur ? (
                      <span className="acx-tc__now">{t.here}</span>
                    ) : (
                      <span className="acx-tc__size">
                        {c.lessons(ls.length)} · {c.minShort(topicMinutes(x.slug))}
                      </span>
                    )}
                  </span>
                  <span className="acx-tc__name">{x.name}</span>
                  <span className="acx-tc__short">{x.short}</span>
                  <span className="acx-tc__foot">
                    <span className="acx-tc__stack" aria-hidden="true">
                      {ls.slice(0, STACK).map((l, k) => (
                        <img key={l.n} src={yt.thumbMq(l.youtubeId)} width={96} height={54} alt={imgAlt(locale, "lesson", l.title)} loading="lazy" decoding="async" style={{ "--k": k } as CSSProperties} />
                      ))}
                      {more > 0 && <b>+{more}</b>}
                    </span>
                    <span className="acx-tc__go">
                      {t.open}
                      <Icon d={ICONS.arrowRight} size={14} />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
