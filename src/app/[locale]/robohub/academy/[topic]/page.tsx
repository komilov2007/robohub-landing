import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTopic, lessonsByTopic, TOPICS } from "../lib/academy";
import { yt } from "../lib/youtube";
import { ACADEMY_BASE, topicHref } from "../lib/links";
import StageSkeleton from "./components/stage/stage-skeleton";
import TopicView from "./components/topic-view/topic-view";
import "./topic.css";

// Mavzu sahifasi: /academy/{topic} — asosiy dars ochiq. Boshqa darslarning o'z sahifasi bor: [lesson]/page.tsx.
// 8 ta mavzu oldindan statik yig'iladi.
export function generateStaticParams() {
  return TOPICS.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/robohub/academy/[topic]">): Promise<Metadata> {
  const topic = getTopic((await params).topic);
  if (!topic) return {};
  const cover = lessonsByTopic(topic.slug).find((l) => l.n === topic.mainLesson);
  const images = cover ? [{ url: yt.thumb(cover.youtubeId), width: 1280, height: 720 }] : undefined;
  return {
    title: topic.name,
    description: topic.hero.subtitle,
    alternates: { canonical: topicHref(topic.slug) },
    openGraph: { title: `${topic.name} — Robohub Academy`, description: topic.hero.subtitle, images },
    twitter: { card: "summary_large_image", title: `${topic.name} — Robohub Academy`, description: topic.hero.subtitle },
  };
}

// params (URL ma'lumoti) <Suspense> ichida o'qiladi: App Shell (header + skelet) hamma mavzu uchun bitta,
// sahifalar orasida o'tish darhol bo'ladi. Ma'lum 8 mavzu build'da to'liq HTML bo'lib yig'iladi.
export default function TopicPage({ params }: PageProps<"/[locale]/robohub/academy/[topic]">) {
  return (
    <Suspense fallback={<StageSkeleton />}>
      <TopicContent params={params} />
    </Suspense>
  );
}

async function TopicContent({ params }: { params: PageProps<"/[locale]/robohub/academy/[topic]">["params"] }) {
  const topic = getTopic((await params).topic);
  // Mavjud bo'lmagan slug → Academy bosh sahifasi
  if (!topic) redirect(ACADEMY_BASE);
  return <TopicView topic={topic} />;
}
