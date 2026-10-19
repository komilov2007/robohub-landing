import type { CSSProperties } from "react";
import Link from "next/link";
import { LESSONS, TOPICS, TOTAL_LESSONS, TOTAL_TOPICS, lessonsByTopic } from "./lib/academy";
import { PHONE, PHONE_TEL, START_URL } from "./lib/links";
import AcademySearch from "./components/academy-search/academy-search";
import ContinueChip from "./components/continue-chip/continue-chip";
import TopicCard from "./components/topic-card/topic-card";
import LessonFeed from "./components/lesson-feed/lesson-feed";
import Icon, { ICONS } from "./components/svg-icon/svg-icon";
import { RobohubMark } from "./components/logo/logo";

// Academy bosh sahifasi. Hero — to'q "sahna": sarlavha, "davom ettirish" havolasi va mavzular qatori;
// qidiruv hero'ning pastki chetida — yarmi hero'da, yarmi Mavzular bo'limida.
// Video mavzu sahifalarining hero'sida — bosh sahifa yo'naltiruvchi. Pastda — mavzu kartochkalari va yordam bloki.
const MARKETPLACES = ["uzum", "wildberries", "yandex", "ozon"];

export default function AcademyHome() {
  const totalMinutes = Math.round(LESSONS.reduce((s, l) => s + l.durationSec, 0) / 60);
  return (
    <>
      <section className="ac-stage ac-stage--home" data-theme="dark" aria-labelledby="ac-home-title">
        <div className="container">
          <div className="ac-stage__head">
            <div className="ac-stage__top ac-rise">
              <p className="ac-glass-pill">
                <span className="ac-glass-pill__mps" aria-hidden="true">
                  {MARKETPLACES.map((m) => (
                    <img key={m} src={`/marketplaces/${m}.svg`} alt="" width={18} height={18} />
                  ))}
                </span>
                Robohub Academy · {TOTAL_LESSONS} dars · {TOTAL_TOPICS} mavzu<span className="ac-hide-sm"> · {totalMinutes} daqiqa</span>
              </p>
            </div>
            <h1 id="ac-home-title" className="ac-stage__title">
              <span className="ac-w">Robohub’ni</span>{" "}
              <span className="ac-w" style={{ "--d": "80ms" } as CSSProperties}>
                <span className="ac-grad">qisqa darslarda</span>
              </span>{" "}
              <span className="ac-w" style={{ "--d": "160ms" } as CSSProperties}>
                o‘rganing
              </span>
            </h1>
            <p className="ac-stage__lead ac-rise" style={{ "--d": "140ms" } as CSSProperties}>
              Har mavzuda qisqa matn, sxema va video. O‘qing yoki ko‘ring — qaysi biri qulay bo‘lsa.
            </p>
            <div className="ac-stage__continue ac-rise" style={{ "--d": "220ms" } as CSSProperties}>
              <ContinueChip />
            </div>
          </div>

          <nav className="ac-rail" aria-label="Mavzular">
            <ul>
              {TOPICS.map((t, i) => (
                <li key={t.slug} style={{ "--d": `${500 + i * 50}ms` } as CSSProperties}>
                  <Link href={`/${t.slug}`}>
                    <Icon d={t.icon} size={16} />
                    {t.name}
                    <small>{lessonsByTopic(t.slug).length}</small>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section className="ac-section ac-topics" id="topics" data-theme="light" aria-labelledby="ac-topics-title">
        {/* Qidiruv hero bilan mavzular orasidagi "ko'prik": yarmi to'q hero ustida, yarmi shu bo'limda */}
        <div className="container ac-dock">
          <div className="ac-dock__inner ac-rise" style={{ "--d": "300ms" } as CSSProperties}>
            <AcademySearch />
          </div>
        </div>
        <div className="container">
          <div className="ac-head ac-head--split" data-reveal>
            <div>
              <p className="ac-eyebrow">Mavzular</p>
              <h2 id="ac-topics-title" className="ac-h2">
                Nimani <span className="ac-accent">o‘rganmoqchisiz?</span>
              </h2>
            </div>
            <p className="ac-head__note">
              {TOTAL_TOPICS} mavzu · {TOTAL_LESSONS} dars · {totalMinutes} daqiqa video
            </p>
          </div>
          <ul className="ac-tgrid">
            {TOPICS.map((t, i) => (
              <TopicCard key={t.slug} topic={t} index={i} />
            ))}
          </ul>
        </div>
      </section>

      <LessonFeed />

      <section className="ac-section ac-section--last" id="help" data-theme="light" aria-labelledby="ac-help-title">
        <div className="container">
          <div className="ac-end" data-theme="brand" data-reveal>
            <div className="ac-end__text">
              <p className="ac-eyebrow ac-eyebrow--on-dark">Yordam</p>
              <h2 id="ac-help-title" className="ac-h2">
                Javob <span className="ac-accent">topilmadimi?</span>
              </h2>
              <p>Savolingizni yozing yoki qo‘ng‘iroq qiling — jamoamiz yordam beradi.</p>
              {/* TODO (14-bo'lim, 7-savol): Telegram linki bo'lsa — shu yerga uchinchi tugma */}
              <div className="ac-end__btns">
                <a href={PHONE_TEL} className="btn btn--lg btn--primary">
                  <Icon d={ICONS.phone} size={18} /> {PHONE}
                </a>
                <a href={START_URL} className="btn btn--lg btn--outline">
                  Bepul boshlash
                </a>
              </div>
            </div>
            <div className="ac-end__orbit" aria-hidden="true">
              <span className="ac-end__ring ac-end__ring--in" />
              <span className="ac-end__ring">
                {MARKETPLACES.map((m) => (
                  <img key={m} src={`/marketplaces/${m}.svg`} alt="" width={54} height={54} loading="lazy" />
                ))}
              </span>
              <span className="ac-end__mark">
                <RobohubMark />
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
