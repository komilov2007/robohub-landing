import type { MetadataRoute } from "next";
import { requestOrigin, siteFromHost } from "@/lib/site-host";
import { ROBOHUB_ORIGIN, ROBOSELL_ORIGIN } from "@/lib/seo";
import { locales, localeHref } from "@/i18n/config";
import { LESSON_ROUTES, TOPIC_ROUTES } from "./[locale]/robohub/academy/lib/academy";
import { lessonPath, topicPath, ACADEMY_BASE } from "./[locale]/robohub/academy/lib/links";

// /sitemap.xml — Google va Yandex'ga beriladigan sahifalar ro'yxati.
// Manzillar doim rasmiy domen bilan (https://robohub.uz/...): sahifa robohub-landing.vercel.app'da ochilsa ham
// sitemap'da birorta vercel.app manzil bo'lmaydi (vercel.app — X-Robots-Tag: noindex, next.config.ts).
// Har URL'da 7 til + x-default (xhtml:link). Yangi dars yoki mavzu qo'shilsa — avtomatik shu yerga tushadi (academy.ts).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = siteFromHost(new URL(await requestOrigin()).host);

  // AI Studio o'z domenida — canonical robohub.uz/aistudio (u Robohub sitemap'ida), bu yerda beriladigan sahifa yo'q
  if (site === "ai-studio") return [];
  // Robosell: matn hozircha faqat o'zbekcha — /ru va /en o'zbekcha sahifaga canonical (robosell/layout.tsx)
  if (site === "robosell") return [{ url: ROBOSELL_ORIGIN, changeFrequency: "weekly", priority: 1 }];

  const latest = (dates: (string | undefined)[]) => dates.filter(Boolean).sort().at(-1);
  // Bitta sahifa — 7 tilda, har biri qolgan tillardagi nusxasiga hreflang bilan bog'langan (uz — x-default).
  // Bosh sahifa "https://robohub.uz" (oxirida "/" siz) — canonical bilan aynan bir xil.
  const page = (path: string, entry: Omit<MetadataRoute.Sitemap[number], "url" | "alternates">): MetadataRoute.Sitemap => {
    const languages: Record<string, string> = {};
    for (const l of locales) languages[l] = ROBOHUB_ORIGIN + (path === "/" && l === "uz" ? "" : localeHref(l, path));
    languages["x-default"] = languages.uz;
    return locales.map((l) => ({ ...entry, url: languages[l], alternates: { languages } }));
  };
  return [
    ...page("/", { changeFrequency: "weekly", priority: 1 }),
    ...page(ACADEMY_BASE, { lastModified: latest(LESSON_ROUTES.map((l) => l.uploadDate)), changeFrequency: "weekly", priority: 0.9 }),
    ...page("/aistudio", { changeFrequency: "weekly", priority: 0.9 }),
    ...page("/calculator", { changeFrequency: "weekly", priority: 0.9 }),
    ...TOPIC_ROUTES.flatMap((t) =>
      page(topicPath(t.slug), {
        lastModified: latest(LESSON_ROUTES.filter((l) => l.topic === t.slug).map((l) => l.uploadDate)),
        changeFrequency: "monthly",
        priority: 0.8,
      }),
    ),
    ...LESSON_ROUTES.filter((l) => TOPIC_ROUTES.find((t) => t.slug === l.topic)?.mainLesson !== l.n).flatMap((l) =>
      page(lessonPath(l.topic, l.n), { lastModified: l.uploadDate, changeFrequency: "monthly", priority: 0.7 }),
    ),
  ];
}
