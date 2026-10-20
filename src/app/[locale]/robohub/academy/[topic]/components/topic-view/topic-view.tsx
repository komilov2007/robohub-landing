import { getLesson, type Lesson, type Topic } from "../../../lib/academy";
import { isoDuration, yt } from "../../../lib/youtube";
import { ACADEMY_BASE, lessonHref, topicHref } from "../../../lib/links";
import { LESSON_NOTES } from "../../../lib/lesson-notes";
import { PlayerProvider } from "../../../components/player/player-context";
import Stage from "../stage/stage";
import LessonInfo from "../lesson-info/lesson-info";
import TopicsRail from "../topics-rail/topics-rail";
import Questions from "../questions/questions";
import Cta from "../cta/cta";
import MobileNextBar from "../mobile-next-bar/mobile-next-bar";

// Mavzu sahifasi (/academy/{mavzu}) va dars sahifasi (/academy/{mavzu}/{dars}) uchun umumiy ko'rinish.
// Farqi — qaysi dars ochiq turishi (lesson) va JSON-LD.
export const SITE = "https://robohub.uz";

// Darsning qisqa tavsifi (meta description, VideoObject): xulosa + "Bu nima?"; ~160 belgigacha
export function lessonDescription(l: Lesson, max = 160): string {
  const text = [l.summary, LESSON_NOTES[l.n]?.concept]
    .filter(Boolean)
    .join(" ");
  return text.length <= max
    ? text
    : `${text.slice(0, text.lastIndexOf(" ", max - 1))}…`;
}

function videoLd(topic: Topic, l: Lesson) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: l.title,
    description: lessonDescription(l, 500),
    thumbnailUrl: [yt.thumb(l.youtubeId), yt.thumbHq(l.youtubeId)],
    ...(l.uploadDate && { uploadDate: l.uploadDate }),
    embedUrl: `https://www.youtube-nocookie.com/embed/${l.youtubeId}`,
    contentUrl: yt.watch(l.youtubeId),
    url: `${SITE}${lessonHref(topic.slug, l.n)}`,
    duration: isoDuration(l.durationSec),
    inLanguage: "uz",
  };
}

// Strukturalangan ma'lumot (schema.org) — Google sahifani "tushunishi" va natijalarda boyroq ko'rsatishi uchun:
//   BreadcrumbList — natijada "robohub.uz › Academy › Mavzu (› Dars)" yo'li;
//   VideoObject    — sahifadagi asosiy video (uploadDate — Google talab qiladigan maydon, YouTube'dagi sana);
//   FAQPage        — "Savollar" bo'limi (faqat mavzu sahifasida — dars sahifalarida takrorlanmasin).
function JsonLd({ topic, lesson }: { topic: Topic; lesson?: Lesson }) {
  const crumbs = [
    { name: "Robohub Academy", item: `${SITE}${ACADEMY_BASE}` },
    { name: topic.name, item: `${SITE}${topicHref(topic.slug)}` },
    ...(lesson
      ? [
          {
            name: lesson.title,
            item: `${SITE}${lessonHref(topic.slug, lesson.n)}`,
          },
        ]
      : []),
  ];
  const main = lesson ?? getLesson(topic.mainLesson);
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        ...c,
      })),
    },
    ...(main ? [videoLd(topic, main)] : []),
    ...(lesson
      ? []
      : [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: topic.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.a.replace(/\n\n/g, " "),
              },
            })),
          },
        ]),
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default function TopicView({
  topic,
  lesson,
}: {
  topic: Topic;
  lesson?: Lesson;
}) {
  return (
    <PlayerProvider
      topic={topic.slug}
      mainLesson={topic.mainLesson}
      initialLesson={lesson?.n}
    >
      <JsonLd topic={topic} lesson={lesson} />
      {/* Hero = sarlavha, pleyer va mavzu darslari (YouTube kabi); pastda — tanlangan dars haqida matn, savollar va CTA */}
      <Stage topic={topic} />
      <LessonInfo topic={topic} />
      <TopicsRail topic={topic} />
      <Questions topic={topic} />
      <Cta topic={topic} />
      <MobileNextBar />
    </PlayerProvider>
  );
}
