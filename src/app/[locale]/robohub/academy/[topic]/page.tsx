import { Suspense } from "react";
import type { Metadata } from "next";
import { OG_LOCALE } from "@/lib/seo";
import { redirect } from "next/navigation";
import { getLocale } from "@/i18n/server";
import { getLesson, getTopic, TOPIC_ROUTES } from "../lib/academy";
import { yt } from "../lib/youtube";
import { academyHref, languageAlternates, topicHref, topicPath } from "../lib/links";
import StageSkeleton from "./components/stage/stage-skeleton";
import TopicView from "./components/topic-view/topic-view";
import "./topic.css";

// Mavzu sahifasi: /academy/{topic} (ru/en: /ru/academy/{topic}) — asosiy dars ochiq.
// Boshqa darslarning o'z sahifasi bor: [lesson]/page.tsx. 8 ta mavzu oldindan statik yig'iladi (har til uchun).
export function generateStaticParams() {
  return TOPIC_ROUTES.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/robohub/academy/[topic]">): Promise<Metadata> {
  const locale = await getLocale();
  const topic = getTopic((await params).topic, locale);
  if (!topic) return {};
  const cover = getLesson(topic.mainLesson, locale);
  const images = cover ? [{ url: yt.thumb(cover.youtubeId), width: 1280, height: 720 }] : undefined;
  const url = topicHref(locale, topic.slug);
  return {
    title: topic.name,
    description: topic.hero.subtitle,
    alternates: { canonical: url, languages: languageAlternates(topicPath(topic.slug)) },
    openGraph: { siteName: "Robohub Academy", locale: OG_LOCALE[locale], title: `${topic.name} | Robohub Academy`, description: topic.hero.subtitle, url, images },
    twitter: { card: "summary_large_image", title: `${topic.name} | Robohub Academy`, description: topic.hero.subtitle, images },
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
  const locale = await getLocale();
  const topic = getTopic((await params).topic, locale);
  // Mavjud bo'lmagan slug → Academy bosh sahifasi (joriy tilda)
  if (!topic) redirect(academyHref(locale));
  return <TopicView topic={topic} />;
}
