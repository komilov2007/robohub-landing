import type { MetadataRoute } from "next";
import { requestOrigin, siteFromHost } from "@/lib/site-host";
import { locales, localeHref } from "@/i18n/config";
import { LESSON_ROUTES, TOPIC_ROUTES } from "./[locale]/robohub/academy/lib/academy";
import { lessonPath, topicPath, ACADEMY_BASE } from "./[locale]/robohub/academy/lib/links";
import { TOPICS as OLD_TOPICS } from "./[locale]/robohub-academy/lib/academy";

// /sitemap.xml — Google'ga beriladigan sahifalar ro'yxati. Bitta loyiha bir necha domenda ishlaydi (src/proxy.ts),
// shuning uchun ro'yxat so'rov kelgan domen bo'yicha quriladi: har domen faqat o'z sahifalarini, o'z manzili bilan beradi
// (Google boshqa domen manzillarini sitemap'da qabul qilmaydi).
// Yangi dars yoki mavzu qo'shilsa — avtomatik shu yerga tushadi (academy.ts dan o'qiladi).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = await requestOrigin();
  const site = siteFromHost(new URL(base).host);

  // Landing: uch tilda, har biri qolgan ikkitasiga hreflang bilan bog'langan
  const home: MetadataRoute.Sitemap[number] = {
    url: base,
    changeFrequency: "weekly",
    priority: 1,
    alternates: { languages: { uz: base, ru: `${base}/ru`, en: `${base}/en`, "x-default": base } },
  };
  const landing: MetadataRoute.Sitemap = [
    home,
    { ...home, url: `${base}/ru`, priority: 0.8 },
    { ...home, url: `${base}/en`, priority: 0.8 },
  ];

  if (site === "robohub-academy") {
    // eski Academy (faqat o'zbekcha): bosh sahifa va mavzular
    return [
      { url: base, changeFrequency: "weekly", priority: 1 },
      ...OLD_TOPICS.map((t) => ({ url: `${base}/${t.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ];
  }
  if (site !== "robohub") return landing;

  // Robohub: landing + Academy (bosh sahifa, 8 mavzu, har bir darsning o'z sahifasi) — uch tilda,
  // har sahifa qolgan ikki tildagi nusxasiga hreflang bilan bog'langan (uz — x-default)
  const latest = (dates: (string | undefined)[]) => dates.filter(Boolean).sort().at(-1);
  const academy = (path: string, entry: Omit<MetadataRoute.Sitemap[number], "url" | "alternates">): MetadataRoute.Sitemap => {
    const languages: Record<string, string> = {};
    for (const l of locales) languages[l] = `${base}${localeHref(l, path)}`;
    languages["x-default"] = languages.uz;
    return locales.map((l) => ({ ...entry, url: languages[l], alternates: { languages } }));
  };
  return [
    ...landing,
    // AI Studio — Robohub domenida /ai-studio (robohub.uz/ai-studio, robohub-landing.vercel.app/ai-studio)
    ...academy("/ai-studio", { changeFrequency: "weekly", priority: 0.9 }),
    // Marketpleys kalkulyatori — robohub.uz/calculator
    ...academy("/calculator", { changeFrequency: "weekly", priority: 0.9 }),
    ...academy(ACADEMY_BASE, { lastModified: latest(LESSON_ROUTES.map((l) => l.uploadDate)), changeFrequency: "weekly", priority: 0.9 }),
    ...TOPIC_ROUTES.flatMap((t) =>
      academy(topicPath(t.slug), {
        lastModified: latest(LESSON_ROUTES.filter((l) => l.topic === t.slug).map((l) => l.uploadDate)),
        changeFrequency: "monthly",
        priority: 0.8,
      }),
    ),
    ...LESSON_ROUTES.filter((l) => TOPIC_ROUTES.find((t) => t.slug === l.topic)?.mainLesson !== l.n).flatMap((l) =>
      academy(lessonPath(l.topic, l.n), { lastModified: l.uploadDate, changeFrequency: "monthly", priority: 0.7 }),
    ),
  ];
}
