import type { CSSProperties } from "react";
import Link from "next/link";
import { lessonsByTopic, topicMinutes, type Topic, lessonNo } from "../../lib/academy";
import { fmt } from "../../lib/youtube";
import Icon, { ICONS, PlayGlyph } from "../svg-icon/svg-icon";
import TopicProgress from "./topic-progress";
import { topicHref, lessonHref } from "../../lib/links";
import { getLocale } from "@/i18n/server";
import { common } from "../../lib/common.i18n";

// Mavzu kartochkasi (bento): ikon, nom, qisqa tavsif, darslar ro'yxati va progress (localStorage'dan).
// Kartochkaning bo'sh joyi — mavzu sahifasiga (nom havolasi ::after bilan butun kartochkani qoplaydi),
// har bir dars qatori — o'sha darsning o'z sahifasiga. Havola ichida havola bo'lmasligi uchun shunday.
// data-glow — kursor ortidan yuradigan yorug'lik va chegara. featured — gridda katta (2×2), barcha darslar ko'rinadi.
export default async function TopicCard({ topic, index, featured = false }: { topic: Topic; index: number; featured?: boolean }) {
  const locale = await getLocale();
  const c = common[locale];
  const lessons = lessonsByTopic(topic.slug, locale);
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
            {c.lessons(lessons.length)} · {c.minShort(topicMinutes(topic.slug))}
          </span>
        </span>

        <span className="acx-tcard__name">
          <Link href={topicHref(locale, topic.slug)} className="acx-tcard__link">
            {topic.name}
          </Link>
          <span className="acx-tcard__go" aria-hidden="true">
            <Icon d={ICONS.arrowRight} size={16} />
          </span>
        </span>
        <span className="acx-tcard__short">{topic.short}</span>

        <span className="acx-tcard__lessons">
          {shown.map((l, i) => (
            <Link key={l.n} href={lessonHref(locale, topic.slug, l.n)} className="acx-tcard__lesson" style={{ "--j": i } as CSSProperties}>
              <b>
                <span>{lessonNo(l.n)}</span>
                <PlayGlyph size={10} />
              </b>
              <span>{l.title}</span>
              <em>{fmt(l.durationSec)}</em>
            </Link>
          ))}
          {more > 0 && <span className="acx-tcard__more">{c.more(more)}</span>}
        </span>

        <TopicProgress lessons={lessons.map((l) => l.n)} />
      </div>
    </li>
  );
}
