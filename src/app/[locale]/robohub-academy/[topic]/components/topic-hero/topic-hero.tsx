import type { CSSProperties } from "react";
import Link from "next/link";
import { lessonsByTopic, readingTime, topicMinutes, type Topic } from "../../../lib/academy";
import Icon from "../../../components/svg-icon/svg-icon";
import Marker from "../../../components/marker/marker";
import HeroPlayer from "./hero-player";

// Mavzu hero'si — assimetrik: tepada gigant mavzu nomi (sahifaning "ismi"), ostida chapda H1 (hero.title +
// sariq marker), o'ngda asosiy dars pleyeri. Qog'oz fon — bosh sahifaning teal hero'sidan farqli ritm.
export default function TopicHero({ topic }: { topic: Topic }) {
  const count = lessonsByTopic(topic.slug).length;
  return (
    <section className="ac-th" aria-labelledby="ac-th-title">
      <div className="ac-wrap">
        <nav className="ac-crumbs ac-rise" aria-label="Breadcrumb">
          <Link href="/">Academy</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{topic.name}</span>
        </nav>
        <p className="ac-th__name" aria-hidden="true" style={{ "--len": topic.name.length } as CSSProperties}>
          <span className="ac-th__ico">
            <Icon d={topic.icon} size={44} />
          </span>
          <span className="ac-w">{topic.name}</span>
        </p>
        <div className="ac-th__grid">
          <div className="ac-th__text">
            <h1 id="ac-th-title" className="ac-th__title">
              <span className="ac-w" style={{ "--d": "80ms" } as CSSProperties}>
                {topic.hero.title}
              </span>{" "}
              <Marker delay={700}>{topic.hero.highlight}</Marker>
            </h1>
            <p className="ac-th__lead ac-rise" style={{ "--d": "160ms" } as CSSProperties}>
              {topic.hero.subtitle}
            </p>
            <dl className="ac-th__facts ac-rise" style={{ "--d": "220ms" } as CSSProperties}>
              <div>
                <dt>{count}</dt>
                <dd>video dars</dd>
              </div>
              <div>
                <dt>{topicMinutes(topic.slug)}</dt>
                <dd>daqiqa video</dd>
              </div>
              <div>
                <dt>{readingTime(topic)}</dt>
                <dd>daqiqa o‘qish</dd>
              </div>
            </dl>
          </div>
          <div className="ac-th__media ac-pop">
            <HeroPlayer />
          </div>
        </div>
      </div>
    </section>
  );
}
