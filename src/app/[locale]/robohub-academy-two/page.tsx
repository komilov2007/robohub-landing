import type { CSSProperties } from "react";
import { LESSONS, TOPICS, TOTAL_LESSONS, TOTAL_TOPICS } from "./lib/academy";
import { PHONE, PHONE_TEL, START_URL } from "./lib/links";
import AcademySearch from "./components/academy-search/academy-search";
import ContinueCard from "./components/continue-card/continue-card";
import StartPath from "./components/start-path/start-path";
import TopicCard from "./components/topic-card/topic-card";
import LessonFeed from "./components/lesson-feed/lesson-feed";
import Odometer from "./components/odometer/odometer";
import Aurora from "./components/aurora/aurora";
import MpPeek from "./components/mp-peek/mp-peek";
import Icon, { ICONS } from "./components/svg-icon/svg-icon";
import { RobohubMark } from "./components/logo/logo";
import "./home.css";

// Academy bosh sahifasi ("tirik aurora" dizayni, uslublar — home.css):
//   Hero — to'liq kenglikdagi to'q sahna: harakatlanuvchi aurora, oqib keluvchi to'r, kursor yorug'ligi;
//   chapda sarlavha, qidiruv va odometr-statistika, o'ngda 3D "Shu yerdan boshlang / Davom ettiring" kartochkasi.
//   Keyin mavzular nomlari lentasi, Boshlang'ich yo'l, bento-mavzular, jonli darslar lentasi va yordam bloki.
const MARKETPLACES = ["uzum", "wildberries", "yandex", "ozon"];

export default function AcademyHome() {
  const totalMinutes = Math.round(LESSONS.reduce((s, l) => s + l.durationSec, 0) / 60);
  const stats = [
    { value: TOTAL_LESSONS, label: "video dars" },
    { value: TOTAL_TOPICS, label: "mavzu" },
    { value: totalMinutes, label: "daqiqa jami" },
  ];
  return (
    <>
      <section className="acx-hero" data-theme="dark" data-glow aria-labelledby="ac-home-title">
        <Aurora />

        <div className="container acx-hero__inner">
          <div className="acx-hero__text">
            {/* kapsula: logolar ustiga kelinsa yoyiladi, har biri — o'sha marketpleysni ulash videosi (kichik oyna) */}
            <MpPeek style={{ "--d": "0ms" } as CSSProperties} />
            <h1 id="ac-home-title" className="acx-title">
              <span className="acx-word" style={{ "--d": "60ms" } as CSSProperties}>
                Robohub’ni
              </span>{" "}
              <span className="acx-word acx-word--grad" style={{ "--d": "180ms" } as CSSProperties}>
                qisqa darslarda
              </span>{" "}
              <span className="acx-word" style={{ "--d": "300ms" } as CSSProperties}>
                o‘rganing
              </span>
            </h1>
            <p className="acx-lead acx-in" style={{ "--d": "380ms" } as CSSProperties}>
              Har bir dars — bitta vazifa va bir necha daqiqa. Savolingizni yozing yoki boshlang‘ich yo‘ldan boring.
            </p>
            <div className="acx-search acx-in" style={{ "--d": "480ms" } as CSSProperties}>
              <AcademySearch />
            </div>
            <ul className="acx-stats acx-in" style={{ "--d": "580ms" } as CSSProperties}>
              {stats.map((s, i) => (
                <li key={s.label}>
                  <b>
                    <Odometer value={s.value} delay={700 + i * 150} />
                  </b>
                  <span>{s.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="acx-hero__visual">
            <span className="acx-orbit" aria-hidden="true">
              {MARKETPLACES.map((m, i) => (
                <img key={m} src={`/marketplaces/${m}.svg`} alt="" width={52} height={52} style={{ "--i": i } as CSSProperties} />
              ))}
            </span>
            <ContinueCard />
          </div>
        </div>
      </section>

      <div className="acx-ticker" aria-hidden="true">
        <div className="acx-ticker__band">
        <div className="acx-ticker__track">
          {[0, 1].map((copy) => (
            <span key={copy} className="acx-ticker__row">
              {TOPICS.map((t) => (
                <span key={t.slug} className="acx-ticker__item">
                  <Icon d={t.icon} size={30} />
                  {t.name}
                  <i>✦</i>
                </span>
              ))}
            </span>
          ))}
        </div>
        </div>
      </div>

      <StartPath />

      <section className="acx-topics" id="topics" data-theme="light" aria-labelledby="ac-topics-title">
        <div className="container">
          <div className="acx-head" data-reveal>
            <p className="acx-kicker">Mavzular</p>
            <h2 id="ac-topics-title" className="acx-h2">
              Nimani <span className="acx-mark">o‘rganmoqchisiz?</span>
            </h2>
          </div>
          <ul className="acx-bento">
            {TOPICS.map((t, i) => (
              <TopicCard key={t.slug} topic={t} index={i} featured={i === 0} />
            ))}
          </ul>
        </div>
      </section>

      <LessonFeed />

      <section className="acx-help" id="help" data-theme="light" aria-labelledby="ac-help-title">
        <div className="container">
          <div className="acx-end" data-theme="brand" data-glow data-reveal>
            <div className="acx-end__mesh" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="acx-end__text">
              <p className="acx-kicker acx-kicker--dark">Yordam</p>
              <h2 id="ac-help-title" className="acx-h2">
                Javob <span className="acx-grad">topilmadimi?</span>
              </h2>
              <p>Savolingizni yozing yoki qo‘ng‘iroq qiling — jamoamiz yordam beradi.</p>
              {/* TODO (14-bo'lim, 7-savol): Telegram linki bo'lsa — shu yerga uchinchi tugma */}
              <div className="acx-end__btns">
                <a href={PHONE_TEL} className="acx-btn acx-btn--light" data-magnet>
                  <Icon d={ICONS.phone} size={18} /> {PHONE}
                </a>
                <a href={START_URL} target="_blank" rel="noopener" className="acx-btn acx-btn--ghost" data-magnet>
                  Hoziroq boshlash
                </a>
              </div>
            </div>
            <div className="acx-end__orbit" aria-hidden="true">
              <span className="acx-end__ring acx-end__ring--3" />
              <span className="acx-end__ring acx-end__ring--2" />
              <span className="acx-end__ring acx-end__ring--1">
                {MARKETPLACES.map((m) => (
                  <img key={m} src={`/marketplaces/${m}.svg`} alt="" width={54} height={54} loading="lazy" />
                ))}
              </span>
              <span className="acx-end__mark">
                <RobohubMark />
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
