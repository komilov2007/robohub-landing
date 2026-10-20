import type { CSSProperties } from "react";
import Link from "next/link";
import { TOPICS, TOTAL_LESSONS, lessonsByTopic, topicMinutes, type Topic } from "../../../lib/academy";
import { yt } from "../../../lib/youtube";
import { topicHref } from "../../../lib/links";
import Swiper from "../../../components/swiper/swiper";
import Icon, { ICONS } from "../../../components/svg-icon/svg-icon";

// "Mavzular" — alohida bo'lim (to'liq kenglikdagi och neytral fon, katta sarlavha): barcha mavzular bitta qatorda,
// swiper'da. Kartochka — mavzu kartochkasi (video emas): ikon va hajmi, nom, qisqa tavsif, pastda darslarning
// kichik muqovalari ustma-ust va "Ochish". Hover'da ko'tariladi, chegara yorishadi — soyasiz. Joriy mavzu ajratilgan.
const STACK = 3;

export default function TopicsRail({ topic }: { topic: Topic }) {
  return (
    <section className="acx-rail" data-theme="light" aria-labelledby="ac-rail-title">
      <div className="container">
        <div className="acx-head" data-reveal>
          <p className="acx-kicker">Mavzular</p>
          <h2 id="ac-rail-title" className="acx-h2">
            Boshqa mavzularni ham <span className="acx-mark">o‘rganing</span>
          </h2>
          <p className="acx-head__note">
            {TOPICS.length} mavzu · {TOTAL_LESSONS} dars
          </p>
        </div>
        <Swiper label="Mavzular" className="acx-tv">
          {TOPICS.map((t, i) => {
            const cur = t.slug === topic.slug;
            const ls = lessonsByTopic(t.slug);
            const more = ls.length - STACK;
            return (
              <li key={t.slug} style={{ "--i": i } as CSSProperties}>
                <Link href={topicHref(t.slug)} className={`acx-tc${cur ? " is-current" : ""}`} aria-current={cur ? "page" : undefined}>
                  <span className="acx-tc__top">
                    <span className="acx-tc__ico" aria-hidden="true">
                      <Icon d={t.icon} size={22} />
                    </span>
                    {cur ? (
                      <span className="acx-tc__now">Hozir shu yerdasiz</span>
                    ) : (
                      <span className="acx-tc__size">
                        {ls.length} dars · {topicMinutes(t.slug)} daq
                      </span>
                    )}
                  </span>
                  <span className="acx-tc__name">{t.name}</span>
                  <span className="acx-tc__short">{t.short}</span>
                  <span className="acx-tc__foot">
                    <span className="acx-tc__stack" aria-hidden="true">
                      {ls.slice(0, STACK).map((l, k) => (
                        <img key={l.n} src={yt.thumbMq(l.youtubeId)} width={96} height={54} alt="" loading="lazy" decoding="async" style={{ "--k": k } as CSSProperties} />
                      ))}
                      {more > 0 && <b>+{more}</b>}
                    </span>
                    <span className="acx-tc__go">
                      Ochish
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
