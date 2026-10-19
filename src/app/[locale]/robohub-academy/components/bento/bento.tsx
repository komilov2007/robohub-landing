import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { TOPICS, lessonsByTopic, topicMinutes, type TopicSlug } from "../../lib/academy";
import Icon from "../svg-icon/svg-icon";
import Marker from "../marker/marker";
import BentoProgress from "./bento-progress";

// Mavzular — bento: Analitika va Buyurtmalar katta, qolganlari kichik. Har kartochkada mavzuning
// kabinetdan olingan mini-UI bo'lagi (aria-hidden, namunaviy) — nima o'rganilishini ko'rsatadi.
const v = (o: Record<string, string | number>) => o as CSSProperties;
const MP = ["uzum", "wildberries", "yandex", "ozon"] as const;

const MINI: Record<TopicSlug, () => ReactNode> = {
  analitika: () => (
    <div className="ac-mini ac-mini--chart">
      <p>
        Savdo <b>124,6 mln</b>
      </p>
      <div className="ac-mini__bars">
        {[30, 44, 38, 56, 50, 68, 61, 80, 72, 92].map((h, i) => (
          <i key={i} style={v({ "--h": `${h}%`, "--i": i })} />
        ))}
      </div>
    </div>
  ),
  buyurtmalar: () => (
    <ul className="ac-mini ac-mini--orders">
      {[
        ["uzum", "#1042", "Yangi"],
        ["wildberries", "#5531", "Yig‘ilmoqda"],
        ["yandex", "#778", "Yetkazildi"],
      ].map(([mp, id, st], i) => (
        <li key={id} style={v({ "--i": i })}>
          <img src={`/marketplaces/${mp}.svg`} alt="" width={18} height={18} loading="lazy" />
          <b>{id}</b>
          <em className={`is-${i}`}>{st}</em>
        </li>
      ))}
    </ul>
  ),
  mahsulotlar: () => (
    <div className="ac-mini ac-mini--price">
      <s>320 000</s>
      <b>299 000</b>
    </div>
  ),
  ombor: () => (
    <div className="ac-mini ac-mini--stock">
      {[80, 54, 22].map((w, i) => (
        <i key={i} style={v({ "--w": `${w}%`, "--i": i })} />
      ))}
    </div>
  ),
  marketing: () => (
    <div className="ac-mini ac-mini--cal">
      {Array.from({ length: 14 }, (_, i) => (
        <i key={i} className={[3, 4, 9, 10, 11].includes(i) ? "is-on" : undefined} />
      ))}
    </div>
  ),
  integratsiya: () => (
    <div className="ac-mini ac-mini--mps">
      {MP.map((mp, i) => (
        <img key={mp} src={`/marketplaces/${mp}.svg`} alt="" width={26} height={26} loading="lazy" style={v({ "--i": i })} />
      ))}
    </div>
  ),
  muloqot: () => (
    <div className="ac-mini ac-mini--chat">
      <span>42 o‘lcham bormi?</span>
      <span className="is-out">Ha, bor!</span>
    </div>
  ),
  boshqaruv: () => (
    <div className="ac-mini ac-mini--roles">
      {[1, 1, 0, 1, 0, 0].map((on, i) => (
        <i key={i} className={on ? "is-on" : undefined} />
      ))}
    </div>
  ),
};

export default function Bento() {
  return (
    <section className="ac-topics" id="topics" aria-labelledby="ac-topics-title">
      <div className="ac-wrap">
        <div className="ac-topics__head">
          <h2 id="ac-topics-title" className="ac-h2">
            Nimani <Marker view>o‘rganmoqchisiz?</Marker>
          </h2>
          <p>
            {TOPICS.length} ta mavzu — kabinetning {TOPICS.length} ta bo‘limi. Har biri qisqa darslar to‘plami.
          </p>
        </div>
        <ul className="ac-bento">
          {TOPICS.map((t, i) => {
            const lessons = lessonsByTopic(t.slug);
            const Mini = MINI[t.slug];
            const big = i < 2;
            return (
              <li key={t.slug} className={`ac-bento__cell${big ? " is-big" : ""} ac-bento__cell--${t.slug}`} data-reveal style={v({ "--ri": i % 3 })}>
                <Link href={`/${t.slug}`} className="ac-bento__card">
                  <span className="ac-bento__top">
                    <span className="ac-bento__ico">
                      <Icon d={t.icon} size={big ? 24 : 20} />
                    </span>
                    <span className="ac-bento__min">{topicMinutes(t.slug)} daq video</span>
                  </span>
                  <span className="ac-bento__mini" aria-hidden="true">
                    <Mini />
                  </span>
                  <span className="ac-bento__name">{t.name}</span>
                  <span className="ac-bento__short">{t.short}</span>
                  <BentoProgress lessons={lessons.map((l) => l.n)} />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
