import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTopic, lessonsByTopic, TOPICS, type Topic } from "../lib/academy";
import { isoDuration, yt } from "../lib/youtube";
import { PlayerProvider } from "../components/player/player-context";
import TopicHero from "./components/topic-hero/topic-hero";
import TopicSkeleton from "./components/topic-hero/topic-skeleton";
import Marquee from "./components/marquee/marquee";
import Scrolly, { type ScrollyStep } from "./components/scrolly/scrolly";
import VideoLessons from "./components/video-lessons/video-lessons";
import Questions from "./components/questions/questions";
import NextTopic from "./components/next-topic/next-topic";
import MobileNextBar from "./components/mobile-next-bar/mobile-next-bar";
import Marker from "../components/marker/marker";

// Mavzu sahifasi: /{topic}. Vazifasi — tushuntirish: hero (asosiy dars) → scrollytelling (kabinet sahnasi)
// → video darslar → savollar → keyingi mavzu. Mavzular oldindan statik yig'iladi.
// ?dars=N client tomonda o'qiladi (player-context) — sahifa statik qoladi.
export function generateStaticParams() {
  return TOPICS.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/robohub-academy/[topic]">): Promise<Metadata> {
  const topic = getTopic((await params).topic);
  if (!topic) return {};
  const cover = lessonsByTopic(topic.slug).find((l) => l.n === topic.mainLesson);
  const images = cover ? [{ url: yt.thumb(cover.youtubeId), width: 1280, height: 720 }] : undefined;
  return {
    title: topic.name,
    description: topic.hero.subtitle,
    alternates: { canonical: `/${topic.slug}` },
    openGraph: { title: `${topic.name} — Robohub Academy`, description: topic.hero.subtitle, images },
    twitter: { card: "summary_large_image", title: `${topic.name} — Robohub Academy`, description: topic.hero.subtitle },
  };
}

// Har bir dars uchun VideoObject (11-bo'lim)
function JsonLd({ topic }: { topic: Topic }) {
  const data = lessonsByTopic(topic.slug).map((l) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: l.title,
    description: l.summary,
    thumbnailUrl: yt.thumb(l.youtubeId),
    embedUrl: `https://www.youtube-nocookie.com/embed/${l.youtubeId}`,
    contentUrl: yt.watch(l.youtubeId),
    duration: isoDuration(l.durationSec),
    inLanguage: "uz",
  }));
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

// params (URL ma'lumoti) <Suspense> ichida o'qiladi: App Shell (header + skelet) hamma mavzu uchun bitta,
// sahifalar orasida o'tish darhol bo'ladi. Ma'lum 8 mavzu build'da to'liq HTML bo'lib yig'iladi.
export default function TopicPage({ params }: PageProps<"/[locale]/robohub-academy/[topic]">) {
  return (
    <Suspense fallback={<TopicSkeleton />}>
      <TopicContent params={params} />
    </Suspense>
  );
}

async function TopicContent({ params }: { params: PageProps<"/[locale]/robohub-academy/[topic]">["params"] }) {
  const topic = getTopic((await params).topic);
  // Mavjud bo'lmagan slug → Academy bosh sahifasi
  if (!topic) redirect("/");

  // Scrollytelling qadamlari: avval flow (jarayon), so'ng features (imkoniyatlar). Flow kartochkasi
  // asosiy darsga, feature kartochkasi o'z darsiga olib boradi.
  const steps: ScrollyStep[] = [
    ...topic.flow.map((f, i) => ({ kicker: `${i + 1} / ${topic.flow.length} · Jarayon`, title: f, lesson: topic.mainLesson })),
    ...topic.features.map((f) => ({ kicker: "Imkoniyat", title: f.title, text: f.text, lesson: f.lesson })),
  ];

  return (
    <PlayerProvider topic={topic.slug} mainLesson={topic.mainLesson}>
      <JsonLd topic={topic} />
      <TopicHero topic={topic} />
      <Marquee />
      <section id="how" className="ac-how" aria-labelledby="ac-how-title">
        <div className="ac-wrap">
          <div className="ac-how__head">
            <h2 id="ac-how-title" className="ac-h2">
              {topic.name} <Marker view>qanday ishlaydi</Marker>
            </h2>
            <p>{topic.solution.text}</p>
          </div>
          <Scrolly slug={topic.slug} steps={steps} flowCount={topic.flow.length} />
        </div>
      </section>
      <VideoLessons topic={{ slug: topic.slug, name: topic.name }} />
      <Questions topic={topic} />
      <NextTopic topic={topic} />
      <MobileNextBar />
    </PlayerProvider>
  );
}
