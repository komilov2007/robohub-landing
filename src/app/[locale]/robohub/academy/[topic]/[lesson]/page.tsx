import { Suspense } from "react";
import type { Metadata } from "next";
import { permanentRedirect, redirect } from "next/navigation";
import { getLessonBySlug, getTopic, LESSONS, TOPICS } from "../../lib/academy";
import { yt } from "../../lib/youtube";
import { ACADEMY_BASE, lessonHref, topicHref } from "../../lib/links";
import StageSkeleton from "../components/stage/stage-skeleton";
import TopicView, {
  lessonDescription,
} from "../components/topic-view/topic-view";
import "../topic.css";

// Dars sahifasi: /academy/{topic}/{slug} — har bir dars Google'da alohida natija bo'lib chiqishi uchun
// (o'z sarlavhasi, tavsifi, canonical va VideoObject). Ko'rinish mavzu sahifasi bilan bir xil, faqat shu dars ochiq.
// Mavzuning asosiy darsi bu yerda yo'q — u mavzu sahifasining o'zi (/academy/{topic}).
export function generateStaticParams() {
  const main = new Set(TOPICS.map((t) => t.mainLesson));
  return LESSONS.filter((l) => !main.has(l.n)).map((l) => ({
    topic: l.topic,
    lesson: l.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/robohub/academy/[topic]/[lesson]">): Promise<Metadata> {
  const p = await params;
  const topic = getTopic(p.topic);
  const lesson = getLessonBySlug(p.topic, p.lesson);
  if (!topic || !lesson) return {};
  const description = lessonDescription(lesson);
  const images = [
    { url: yt.thumb(lesson.youtubeId), width: 1280, height: 720 },
  ];
  return {
    title: lesson.title,
    description,
    alternates: { canonical: lessonHref(topic.slug, lesson.n) },
    openGraph: {
      type: "video.other",
      title: `${lesson.title} — Robohub Academy`,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${lesson.title} — Robohub Academy`,
      description,
    },
  };
}

export default function LessonPage({
  params,
}: PageProps<"/[locale]/robohub/academy/[topic]/[lesson]">) {
  return (
    <Suspense fallback={<StageSkeleton />}>
      <LessonContent params={params} />
    </Suspense>
  );
}

async function LessonContent({
  params,
}: {
  params: PageProps<"/[locale]/robohub/academy/[topic]/[lesson]">["params"];
}) {
  const p = await params;
  const topic = getTopic(p.topic);
  if (!topic) redirect(ACADEMY_BASE);
  const lesson = getLessonBySlug(topic.slug, p.lesson);
  // Noma'lum dars → mavzu sahifasi; asosiy dars → mavzu sahifasining o'zi (bitta sahifaga bitta manzil)
  if (!lesson) redirect(topicHref(topic.slug));
  if (lesson.n === topic.mainLesson) permanentRedirect(topicHref(topic.slug));
  return <TopicView topic={topic} lesson={lesson} />;
}
