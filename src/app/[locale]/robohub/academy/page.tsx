import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { getLocale } from "@/i18n/server";
import { getLessons, getTopics, TOTAL_LESSONS, TOTAL_TOPICS } from "./lib/academy";
import { ACADEMY_BASE, PHONE, PHONE_TEL, START_URL } from "./lib/links";
import { jsonLd, pageMetadata, ROBOHUB_ORG, ROBOHUB_ORIGIN } from "@/lib/seo";
import { localeHref } from "@/i18n/config";
import { messages as metaMessages } from "./layout";
import { messages } from "./home.i18n";
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

// canonical, hreflang, OG/Twitter va ulashish rasmi: /academy, /ru/academy, /en/academy.
// Sarlavha absolute — layout'dagi "%s — Robohub Academy" shabloni bosh sahifaga qo'shilmasin.
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = metaMessages[locale];
  const meta = pageMetadata({
    origin: ROBOHUB_ORIGIN,
    locale,
    path: ACADEMY_BASE,
    title: t.title,
    description: t.description,
    siteName: "Robohub Academy",
    image: "/og/academy-{locale}.jpg",
  });
  return { ...meta, title: { absolute: t.title } };
}

export default async function AcademyHome() {
  const locale = await getLocale();
  const t = messages[locale];
  const topics = getTopics(locale);
  const totalMinutes = Math.round(getLessons(locale).reduce((s, l) => s + l.durationSec, 0) / 60);
  const stats = [
    { value: TOTAL_LESSONS, label: t.stats.lessons(TOTAL_LESSONS) },
    { value: TOTAL_TOPICS, label: t.stats.topics(TOTAL_TOPICS) },
    { value: totalMinutes, label: t.stats.minutes(totalMinutes) },
  ];
  // Qidiruv tizimlari uchun: Academy — mavzular to'plami (har mavzu o'z sahifasi bilan), nashriyotchi — Robohub
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: metaMessages[locale].title,
    description: metaMessages[locale].description,
    url: ROBOHUB_ORIGIN + localeHref(locale, ACADEMY_BASE),
    inLanguage: locale,
    publisher: ROBOHUB_ORG,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: topics.map((x, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: x.name,
        url: ROBOHUB_ORIGIN + localeHref(locale, `${ACADEMY_BASE}/${x.slug}`),
      })),
    },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <section className="acx-hero" data-theme="dark" data-glow aria-labelledby="ac-home-title">
        <Aurora />

        <div className="container acx-hero__inner">
          <div className="acx-hero__text">
            {/* kapsula: logolar ustiga kelinsa yoyiladi, har biri — o'sha marketpleysni ulash videosi (kichik oyna) */}
            <MpPeek style={{ "--d": "0ms" } as CSSProperties} />
            <h1 id="ac-home-title" className="acx-title">
              <span className="acx-word" style={{ "--d": "60ms" } as CSSProperties}>
                {t.title[0]}
              </span>{" "}
              <span className="acx-word acx-word--grad" style={{ "--d": "180ms" } as CSSProperties}>
                {t.title[1]}
              </span>{" "}
              <span className="acx-word" style={{ "--d": "300ms" } as CSSProperties}>
                {t.title[2]}
              </span>
            </h1>
            <p className="acx-lead acx-in" style={{ "--d": "380ms" } as CSSProperties}>
              {t.lead}
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
              {topics.map((x) => (
                <span key={x.slug} className="acx-ticker__item">
                  <Icon d={x.icon} size={30} />
                  {x.name}
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
            <p className="acx-kicker">{t.topicsKicker}</p>
            <h2 id="ac-topics-title" className="acx-h2">
              {t.topicsTitle} <span className="acx-mark">{t.topicsMark}</span>
            </h2>
          </div>
          <ul className="acx-bento">
            {topics.map((x, i) => (
              <TopicCard key={x.slug} topic={x} index={i} featured={i === 0} />
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
              <p className="acx-kicker acx-kicker--dark">{t.helpKicker}</p>
              <h2 id="ac-help-title" className="acx-h2">
                {t.helpTitle} <span className="acx-grad">{t.helpMark}</span>
              </h2>
              <p>{t.helpText}</p>
              {/* TODO (14-bo'lim, 7-savol): Telegram linki bo'lsa — shu yerga uchinchi tugma */}
              <div className="acx-end__btns">
                <a href={PHONE_TEL} className="acx-btn acx-btn--light" data-magnet>
                  <Icon d={ICONS.phone} size={18} /> {PHONE}
                </a>
                <a href={START_URL} target="_blank" rel="noopener" className="acx-btn acx-btn--ghost" data-magnet>
                  {t.start}
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
