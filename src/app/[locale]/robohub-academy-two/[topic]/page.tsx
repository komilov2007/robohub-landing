import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTopic, lessonsByTopic, TOPICS, type Topic } from "../lib/academy";
import { isoDuration, yt } from "../lib/youtube";
import { PlayerProvider } from "../components/player/player-context";
import Stage from "./components/stage/stage";
import StageSkeleton from "./components/stage/stage-skeleton";
import Marquee from "./components/marquee/marquee";
import SectionNav from "./components/section-nav/section-nav";
import Showcase from "./components/showcase/showcase";
import Questions from "./components/questions/questions";
import Cta from "./components/cta/cta";
import MobileNextBar from "./components/mobile-next-bar/mobile-next-bar";

// Mavzu sahifasi: /{topic} (Robohub_academy.md, 5-bo'lim). 8 ta mavzu oldindan statik yig'iladi.
// ?dars=N client tomonda o'qiladi (player-context) — sahifa statik qoladi.
export function generateStaticParams() {
  return TOPICS.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/robohub-academy-two/[topic]">): Promise<Metadata> {
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
export default function TopicPage({ params }: PageProps<"/[locale]/robohub-academy-two/[topic]">) {
  return (
    <Suspense fallback={<StageSkeleton />}>
      <TopicContent params={params} />
    </Suspense>
  );
}

async function TopicContent({ params }: { params: PageProps<"/[locale]/robohub-academy-two/[topic]">["params"] }) {
  const topic = getTopic((await params).topic);
  // Mavjud bo'lmagan slug → Academy bosh sahifasi
  if (!topic) redirect("/");

  return (
    <PlayerProvider topic={topic.slug} mainLesson={topic.mainLesson}>
      <JsonLd topic={topic} />
      {/* Hero = asosiy video; pastda — mavzuga xos vizual (har sahifada boshqacha), savollar va CTA */}
      <Stage topic={topic} />
      <Marquee />
      <SectionNav lessonCount={lessonsByTopic(topic.slug).length} />
      <Showcase topic={topic} />
      <Questions topic={topic} />
      <Cta topic={topic} />
      <MobileNextBar />
    </PlayerProvider>
  );
}
