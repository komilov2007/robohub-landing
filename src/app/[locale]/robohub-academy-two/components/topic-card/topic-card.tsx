import type { CSSProperties } from "react";
import Link from "next/link";
import { getLesson, lessonsByTopic, topicMinutes, type Topic } from "../../lib/academy";
import { fmt, yt } from "../../lib/youtube";
import Icon, { ICONS, PlayGlyph } from "../svg-icon/svg-icon";
import TopicProgress from "./topic-progress";

// Mavzu kartochkasi — butun kartochka link. Tepada asosiy dars muqovasi (hover'da play),
// ostida nom, qisqa tavsif, birinchi darslar ro'yxati va progress (localStorage'dan).
export default function TopicCard({ topic, index }: { topic: Topic; index: number }) {
  const lessons = lessonsByTopic(topic.slug);
  const main = getLesson(topic.mainLesson) ?? lessons[0];
  const shown = lessons.slice(0, 3);
  const more = lessons.length - shown.length;

  return (
    <li data-reveal style={{ "--ri": index % 4 } as CSSProperties}>
      <Link href={`/${topic.slug}`} className="ac-tcard">
        <span className="ac-tcard__cover">
          <img src={yt.thumbMq(main.youtubeId)} width={320} height={180} alt="" loading="lazy" decoding="async" />
          <span className="ac-tcard__ico">
            <Icon d={topic.icon} size={20} />
          </span>
          <span className="ac-tcard__count">
            {lessons.length} dars · {topicMinutes(topic.slug)} daq
          </span>
          <span className="ac-tcard__play" aria-hidden="true">
            <PlayGlyph size={16} />
          </span>
        </span>

        <span className="ac-tcard__body">
          <span className="ac-tcard__name">
            {topic.name}
            <Icon d={ICONS.arrowRight} size={18} className="ac-tcard__go" />
          </span>
          <span className="ac-tcard__short">{topic.short}</span>

          <span className="ac-tcard__lessons">
            {shown.map((l) => (
              <span key={l.n} className="ac-tcard__lesson">
                <b>{l.n}</b>
                <span>{l.title}</span>
                <em>{fmt(l.durationSec)}</em>
              </span>
            ))}
            {more > 0 && <span className="ac-tcard__more">+ yana {more} ta dars</span>}
          </span>

          <TopicProgress lessons={lessons.map((l) => l.n)} />
        </span>
      </Link>
    </li>
  );
}
