import type { CSSProperties } from "react";
import Link from "next/link";
import { lessonsByTopic, topicMinutes, type Topic } from "../../lib/academy";
import { fmt } from "../../lib/youtube";
import Icon, { ICONS, PlayGlyph } from "../svg-icon/svg-icon";
import TopicProgress from "./topic-progress";

// Mavzu kartochkasi (bento): ikon, nom, qisqa tavsif, darslar ro'yxati va progress (localStorage'dan).
// Kartochkaning bo'sh joyi — mavzu sahifasiga (nom havolasi ::after bilan butun kartochkani qoplaydi),
// har bir dars qatori — o'sha darsning o'ziga (/{mavzu}?dars=N). Havola ichida havola bo'lmasligi uchun shunday.
// data-glow — kursor ortidan yuradigan yorug'lik va chegara. featured — gridda katta (2×2), barcha darslar ko'rinadi.
export default function TopicCard({ topic, index, featured = false }: { topic: Topic; index: number; featured?: boolean }) {
  const lessons = lessonsByTopic(topic.slug);
  const shown = featured ? lessons : lessons.slice(0, 3);
  const more = lessons.length - shown.length;

  return (
    <li className={featured ? "is-featured" : undefined} data-reveal style={{ "--ri": index % 4, "--i": index } as CSSProperties}>
      <div className="acx-tcard" data-glow>
        <span className="acx-tcard__head">
          <span className="acx-tcard__ico">
            <Icon d={topic.icon} size={featured ? 28 : 22} />
          </span>
          <span className="acx-tcard__count">
            {lessons.length} dars · {topicMinutes(topic.slug)} daq
          </span>
        </span>

        <span className="acx-tcard__name">
          <Link href={`/${topic.slug}`} className="acx-tcard__link">
            {topic.name}
          </Link>
          <span className="acx-tcard__go" aria-hidden="true">
            <Icon d={ICONS.arrowRight} size={16} />
          </span>
        </span>
        <span className="acx-tcard__short">{topic.short}</span>

        <span className="acx-tcard__lessons">
          {shown.map((l, i) => (
            <Link key={l.n} href={`/${topic.slug}?dars=${l.n}`} className="acx-tcard__lesson" style={{ "--j": i } as CSSProperties}>
              <b>
                <span>{l.n}</span>
                <PlayGlyph size={10} />
              </b>
              <span>{l.title}</span>
              <em>{fmt(l.durationSec)}</em>
            </Link>
          ))}
          {more > 0 && <span className="acx-tcard__more">+ yana {more} ta dars</span>}
        </span>

        <TopicProgress lessons={lessons.map((l) => l.n)} />
      </div>
    </li>
  );
}
