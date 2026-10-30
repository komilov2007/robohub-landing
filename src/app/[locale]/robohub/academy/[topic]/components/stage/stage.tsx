import type { CSSProperties } from "react";
import Link from "next/link";
import { getLocale, getMessages } from "@/i18n/server";
import type { Lesson, Topic } from "../../../lib/academy";
import { academyHref, topicHref } from "../../../lib/links";
import { messages } from "./stage.i18n";
import Aurora from "../../../components/aurora/aurora";
import { HeroScreen, Playlist } from "./stage-player";

// Mavzu hero'si — YouTube kabi: tepada faqat sarlavha; ostida chapda katta pleyer (ostida matn yo'q),
// o'ngda (telefonda — pastda) shu mavzuning barcha darslari pleylist bo'lib turadi — balandligi videoga teng.
// lessonPage — dars sahifasi (/academy/{mavzu}/{dars}): H1 — dars nomi (lesson-info.tsx), mavzu sarlavhasi — H2.
// Har dars sahifasida H1 o'ziga xos bo'ladi (SEO); ko'rinish bir xil — uslub klassga bog'langan.
// Sarlavha ustida — ko‘rinadigan yo‘l (breadcrumb): Robohub Academy › Mavzu (› Dars); JSON-LD BreadcrumbList bilan bir xil (topic-view.tsx, TZ 9.1.4).
export default async function Stage({ topic, lesson }: { topic: Topic; lesson?: Lesson }) {
  const lessonPage = !!lesson;
  const Title = lessonPage ? "h2" : "h1";
  const [locale, t] = await Promise.all([getLocale(), getMessages(messages)]);
  return (
    <section id="videos" className="acx-hero acx-hero--topic" data-theme="dark" data-glow aria-labelledby="ac-stage-title">
      <Aurora />
      <div className="container">
        <nav className="acx-crumbs" aria-label={t.crumbs}>
          <ol>
            <li>
              <Link href={academyHref(locale)}>Robohub Academy</Link>
            </li>
            <li>
              {lessonPage ? <Link href={topicHref(locale, topic.slug)}>{topic.name}</Link> : <span aria-current="page">{topic.name}</span>}
            </li>
            {lesson && (
              <li>
                <span aria-current="page">{lesson.title}</span>
              </li>
            )}
          </ol>
        </nav>
        <Title id="ac-stage-title" className="acx-title acx-title--topic">
          <span className="acx-word" style={{ "--d": "60ms" } as CSSProperties}>
            {topic.hero.title}
          </span>{" "}
          <span className="acx-word acx-word--grad" style={{ "--d": "200ms" } as CSSProperties}>
            {topic.hero.highlight}
          </span>
        </Title>
        <div className="acx-watch">
          {/* kirish animatsiyasi opacity'siz (topic.css) — pleyer muqovasi LCP, darhol chiziladi */}
          <div className="acx-watch__main">
            <HeroScreen />
          </div>
          <Playlist topic={topic} />
        </div>
      </div>
    </section>
  );
}
