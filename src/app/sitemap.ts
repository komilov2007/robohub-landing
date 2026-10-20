import type { MetadataRoute } from "next";
import { requestOrigin, siteFromHost } from "@/lib/site-host";
import { LESSONS, TOPICS } from "./[locale]/robohub/academy/lib/academy";
import { lessonHref, topicHref, ACADEMY_BASE } from "./[locale]/robohub/academy/lib/links";
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

  // Robohub: landing + Academy (bosh sahifa, 8 mavzu, har bir darsning o'z sahifasi)
  const latest = (dates: (string | undefined)[]) => dates.filter(Boolean).sort().at(-1);
  return [
    ...landing,
    { url: `${base}${ACADEMY_BASE}`, lastModified: latest(LESSONS.map((l) => l.uploadDate)), changeFrequency: "weekly", priority: 0.9 },
    ...TOPICS.map((t) => ({
      url: `${base}${topicHref(t.slug)}`,
      lastModified: latest(LESSONS.filter((l) => l.topic === t.slug).map((l) => l.uploadDate)),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...LESSONS.filter((l) => TOPICS.find((t) => t.slug === l.topic)?.mainLesson !== l.n).map((l) => ({
      url: `${base}${lessonHref(l.topic, l.n)}`,
      lastModified: l.uploadDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
