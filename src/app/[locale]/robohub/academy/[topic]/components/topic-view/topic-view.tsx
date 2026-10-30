import { localeUrl, type Locale } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { getLesson, type Lesson, type Topic } from "../../../lib/academy";
import { isoDuration, yt } from "../../../lib/youtube";
import { academyUrl, lessonUrl, topicPath } from "../../../lib/links";
import { getLessonNote } from "../../../lib/lesson-notes";
import { PlayerProvider } from "../../../components/player/player-context";
import Stage from "../stage/stage";
import LessonInfo from "../lesson-info/lesson-info";
import TopicsRail from "../topics-rail/topics-rail";
import Questions from "../questions/questions";
import Cta from "../cta/cta";
import MobileNextBar from "../mobile-next-bar/mobile-next-bar";

// Mavzu sahifasi (/academy/{mavzu}) va dars sahifasi (/academy/{mavzu}/{dars}) uchun umumiy ko'rinish.
// Farqi — qaysi dars ochiq turishi (lesson) va JSON-LD.
// Organization va WebSite — robohub.uz; sahifa manzillari — o'z tili domenida (qozoqcha — robohub.kz)
export const SITE = "https://robohub.uz";

// Darsning qisqa tavsifi (meta description, VideoObject): xulosa + "Bu nima?" — butun gaplar bilan, ~160 belgigacha.
// Gap o'rtasida kesilmaydi ("…" bilan tugaydigan tavsif — TZ 9.1.2): sig'gan gaplar olinadi; tavsif juda qisqa
// qolsa (< 110), keyingi gap biroz oshib ketsa ham (max + 40 gacha) qo'shiladi.
export function lessonDescription(l: Lesson, locale: Locale, max = 160): string {
  const sentences = [l.summary, getLessonNote(l.n, locale)?.concept]
    .filter(Boolean)
    .join(" ")
    .split(/(?<=[.!?…])\s+/)
    .filter(Boolean);
  let out = "";
  for (const s of sentences) {
    const next = out ? `${out} ${s}` : s;
    if (next.length <= max || !out || (out.length < 110 && next.length <= max + 40)) out = next;
    else {
      // tavsif hali qisqa, keyingi gap esa uzun — uni gap bo'lagi chegarasida (":", ";", ",", " —") nuqta bilan yopamiz
      const room = max - out.length - 1;
      // kuchli chegara afzal: ":" / ";" → " —" → ","
      const cut = [":", ";", " —", ","].map((p) => s.lastIndexOf(p, room)).find((i) => i > 40) ?? -1;
      if (out.length < 110 && cut > 40) out = `${out} ${s.slice(0, cut).trimEnd()}.`;
      break;
    }
    if (out.length > max) break;
  }
  return out;
}

function videoLd(topic: Topic, l: Lesson, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: l.title,
    description: lessonDescription(l, locale, 500),
    thumbnailUrl: [yt.thumb(l.youtubeId), yt.thumbHq(l.youtubeId)],
    ...(l.uploadDate && { uploadDate: l.uploadDate }),
    embedUrl: `https://www.youtube-nocookie.com/embed/${l.youtubeId}`,
    contentUrl: yt.watch(l.youtubeId),
    url: lessonUrl(locale, topic.slug, l.n),
    duration: isoDuration(l.durationSec),
    inLanguage: "uz", // video o'zbekcha (sahifa matni joriy tilda)
  };
}

// Strukturalangan ma'lumot (schema.org) — Google sahifani "tushunishi" va natijalarda boyroq ko'rsatishi uchun:
//   BreadcrumbList — natijada "robohub.uz › Academy › Mavzu (› Dars)" yo'li;
//   VideoObject    — sahifadagi asosiy video (uploadDate — Google talab qiladigan maydon, YouTube'dagi sana);
//   FAQPage        — "Savollar" bo'limi (faqat mavzu sahifasida — dars sahifalarida takrorlanmasin).
function JsonLd({ topic, lesson, locale }: { topic: Topic; lesson?: Lesson; locale: Locale }) {
  const crumbs = [
    { name: "Robohub", item: localeUrl(locale, "/") },
    { name: "Robohub Academy", item: academyUrl(locale) },
    { name: topic.name, item: localeUrl(locale, topicPath(topic.slug)) },
    ...(lesson
      ? [
          {
            name: lesson.title,
            item: lessonUrl(locale, topic.slug, lesson.n),
          },
        ]
      : []),
  ];
  const main = lesson ?? getLesson(topic.mainLesson, locale);
  // Sahifa sanasi — ochiq turgan dars videosining sanasi (sahifada ham shu sana ko'rinadi: lesson-info.tsx)
  const date = main?.uploadDate;
  const url = lesson ? lessonUrl(locale, topic.slug, lesson.n) : localeUrl(locale, topicPath(topic.slug));
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: lesson?.title ?? topic.name,
      inLanguage: locale,
      isPartOf: { "@id": `${SITE}/#website` },
      publisher: { "@id": `${SITE}/#organization` },
      ...(date && { datePublished: date, dateModified: date }),
    },
    // Maqola sifatida: muallif — Robohub jamoasi (sahifada ham ko'rinadi: lesson-info.tsx), sanalar (TZ 9.1.5)
    ...(main
      ? [
          {
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "@id": `${url}#article`,
            headline: main.title,
            description: lessonDescription(main, locale),
            image: [yt.thumb(main.youtubeId)],
            inLanguage: locale,
            mainEntityOfPage: { "@id": `${url}#webpage` },
            author: { "@type": "Organization", "@id": `${SITE}/#organization`, name: "Robohub", url: SITE },
            publisher: { "@id": `${SITE}/#organization` },
            ...(date && { datePublished: date, dateModified: date }),
          },
        ]
      : []),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        ...c,
      })),
    },
    ...(main ? [videoLd(topic, main, locale)] : []),
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

export default async function TopicView({
  topic,
  lesson,
}: {
  topic: Topic;
  lesson?: Lesson;
}) {
  const locale = await getLocale();
  return (
    <PlayerProvider
      topic={topic.slug}
      mainLesson={topic.mainLesson}
      initialLesson={lesson?.n}
    >
      <JsonLd topic={topic} lesson={lesson} locale={locale} />
      {/* Hero = sarlavha, pleyer va mavzu darslari (YouTube kabi); pastda — tanlangan dars haqida matn, savollar va CTA */}
      <Stage topic={topic} lesson={lesson} />
      <LessonInfo topic={topic} lessonPage={!!lesson} />
      <TopicsRail topic={topic} />
      <Questions topic={topic} />
      <Cta topic={topic} />
      <MobileNextBar />
    </PlayerProvider>
  );
}
