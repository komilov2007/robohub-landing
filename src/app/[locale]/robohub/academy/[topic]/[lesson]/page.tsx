import { Suspense } from "react";
import type { Metadata } from "next";
import { OG_LOCALE } from "@/lib/seo";
import { permanentRedirect, redirect } from "next/navigation";
import { getLocale } from "@/i18n/server";
import { getLessonBySlug, getTopic, LESSON_ROUTES, TOPIC_ROUTES } from "../../lib/academy";
import { yt } from "../../lib/youtube";
import { localeUrl } from "@/i18n/config";
import { academyHref, languageAlternates, lessonPath, topicHref } from "../../lib/links";
import StageSkeleton from "../components/stage/stage-skeleton";
import TopicView, {
  lessonDescription,
} from "../components/topic-view/topic-view";
import "../topic.css";

// Dars sahifasi: /academy/{topic}/{slug} (ru/en: /ru/academy/…) — har bir dars Google'da alohida natija bo'lib chiqishi uchun
// (o'z sarlavhasi, tavsifi, canonical, hreflang va VideoObject). Ko'rinish mavzu sahifasi bilan bir xil, faqat shu dars ochiq.
// Mavzuning asosiy darsi bu yerda yo'q — u mavzu sahifasining o'zi (/academy/{topic}).
export function generateStaticParams() {
  const main = new Set(TOPIC_ROUTES.map((t) => t.mainLesson));
  return LESSON_ROUTES.filter((l) => !main.has(l.n)).map((l) => ({
    topic: l.topic,
    lesson: l.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/robohub/academy/[topic]/[lesson]">): Promise<Metadata> {
  const p = await params;
  const locale = await getLocale();
  const topic = getTopic(p.topic, locale);
  const lesson = getLessonBySlug(p.topic, p.lesson, locale);
  if (!topic || !lesson) return {};
  const description = lessonDescription(lesson, locale);
  const images = [
    { url: yt.thumb(lesson.youtubeId), width: 1280, height: 720 },
  ];
  const url = localeUrl(locale, lessonPath(topic.slug, lesson.n));
  return {
    title: lesson.title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(lessonPath(topic.slug, lesson.n)),
    },
    openGraph: {
      type: "video.other",
      siteName: "Robohub Academy",
      locale: OG_LOCALE[locale],
      title: `${lesson.title} | Robohub Academy`,
      description,
      url,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${lesson.title} | Robohub Academy`,
      description,
      images,
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
  const locale = await getLocale();
  const topic = getTopic(p.topic, locale);
  if (!topic) redirect(academyHref(locale));
  const lesson = getLessonBySlug(topic.slug, p.lesson, locale);
  // Noma'lum dars → mavzu sahifasi; asosiy dars → mavzu sahifasining o'zi (bitta sahifaga bitta manzil)
  if (!lesson) redirect(topicHref(locale, topic.slug));
  if (lesson.n === topic.mainLesson) permanentRedirect(topicHref(locale, topic.slug));
  return <TopicView topic={topic} lesson={lesson} />;
}
