import type { CSSProperties } from "react";
import Link from "next/link";
import { lessonsByTopic, readingTime, topicMinutes, type Topic } from "../../../lib/academy";
import Icon from "../../../components/svg-icon/svg-icon";
import Aurora from "../../../components/aurora/aurora";
import { HeroScreen, NowPlaying } from "./stage-player";

// Mavzu hero'si — bosh sahifa bilan bir xil to'q aurora sahna, ikki ustun: chapda yo'l, sarlavha, tavsif va
// ixcham "tanlangan dars" kartochkasi; o'ngda katta pleyer. Darslar ro'yxati hero'da emas — ostidagi
// "Mavzu darslari" bo'limida (lessons.tsx).
export default function Stage({ topic }: { topic: Topic }) {
  const count = lessonsByTopic(topic.slug).length;
  return (
    <section id="videos" className="acx-hero acx-hero--topic" data-theme="dark" data-glow aria-labelledby="ac-stage-title">
      <Aurora />
      <div className="container acx-thero">
        <div className="acx-thero__text">
          <div className="acx-thead__top acx-in">
            <nav className="acx-crumbs" aria-label="Breadcrumb">
              <Link href="/">Academy</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{topic.name}</span>
            </nav>
            <p className="acx-badge acx-badge--topic">
              <span className="acx-badge__ico" aria-hidden="true">
                <Icon d={topic.icon} size={15} />
              </span>
              {count} ta video dars · {topicMinutes(topic.slug)} daqiqa · {readingTime(topic)} daqiqa o‘qish
            </p>
          </div>
          <h1 id="ac-stage-title" className="acx-title acx-title--topic">
            <span className="acx-word" style={{ "--d": "60ms" } as CSSProperties}>
              {topic.hero.title}
            </span>{" "}
            <span className="acx-word acx-word--grad" style={{ "--d": "200ms" } as CSSProperties}>
              {topic.hero.highlight}
            </span>
          </h1>
          <p className="acx-lead acx-in" style={{ "--d": "320ms" } as CSSProperties}>
            {topic.hero.subtitle}
          </p>
          <div className="acx-in" style={{ "--d": "420ms" } as CSSProperties}>
            <NowPlaying />
          </div>
        </div>
        {/* kirish animatsiyasi opacity'siz (topic.css) — pleyer muqovasi LCP, darhol chiziladi */}
        <div className="acx-thero__media">
          <HeroScreen />
        </div>
      </div>
    </section>
  );
}
