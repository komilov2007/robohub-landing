import type { CSSProperties } from "react";
import Link from "next/link";
import { lessonsByTopic, readingTime, topicMinutes, type Topic } from "../../../lib/academy";
import Icon from "../../../components/svg-icon/svg-icon";
import StagePlayer from "./stage-player";

// Mavzu hero'si — to'q "sahna": markazda sarlavha, ostida katta pleyer (video shu yerning o'zida ko'riladi),
// "hozir ijroda" paneli va mavzu darslari. Fon — brandbook'dagi bir xil to'q #002B29, urg'u — mint va cyan.
export default function Stage({ topic }: { topic: Topic }) {
  const count = lessonsByTopic(topic.slug).length;
  return (
    <section id="videos" className="ac-stage" data-theme="dark" aria-labelledby="ac-stage-title">
      <div className="container">
        <div className="ac-stage__head">
          <div className="ac-stage__top ac-rise">
            <nav className="ac-crumbs" aria-label="Breadcrumb">
              <Link href="/">Academy</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{topic.name}</span>
            </nav>
            <p className="ac-glass-pill">
              <Icon d={topic.icon} size={15} />
              {count} ta video dars · {topicMinutes(topic.slug)} daqiqa · {readingTime(topic)} daqiqa o‘qish
            </p>
          </div>
          <h1 id="ac-stage-title" className="ac-stage__title">
            <span className="ac-w">{topic.hero.title}</span>{" "}
            <span className="ac-w" style={{ "--d": "90ms" } as CSSProperties}>
              <span className="ac-grad">{topic.hero.highlight}</span>
            </span>
          </h1>
          <p className="ac-stage__lead ac-rise" style={{ "--d": "140ms" } as CSSProperties}>
            {topic.hero.subtitle}
          </p>
        </div>
        <div className="ac-stage__media ac-pop">
          <StagePlayer topic={topic.slug} />
        </div>
      </div>
    </section>
  );
}
