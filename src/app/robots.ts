import type { MetadataRoute } from "next";
import { requestOrigin, siteFromHost } from "@/lib/site-host";
import { ROBOHUB_ORIGIN, ROBOSELL_ORIGIN } from "@/lib/seo";

// /robots.txt — hamma sahifa ochiq, /api/ (ichki so'rovlar) yopiq.
// *.vercel.app'da ham Disallow YO'Q: u yerda sahifalar X-Robots-Tag: noindex beradi (next.config.ts) —
// Google uni ko'rishi uchun sahifani ochib o'qiy olishi kerak. Sitemap — faqat rasmiy domenda.
//
// AI botlar: eski robohub.uz saytidagi siyosat saqlangan — o'qitish uchun yig'adigan GPTBot, Google-Extended va CCBot yopiq
// (Google/Yandex qidiruviga ta'sir qilmaydi). TODO: ochish/yopish — biznes qarori (SEO-HISOBOT, "AI qidiruv" bo'limi).
// Eslatma: Cloudflare "Managed robots.txt" yoqilgan bo'lsa, u bu faylning boshiga o'z qoidalarini qo'shadi.
const AI_TRAINING_BOTS = ["GPTBot", "Google-Extended", "CCBot"];

export default async function robots(): Promise<MetadataRoute.Robots> {
  const origin = await requestOrigin();
  const site = siteFromHost(new URL(origin).host);
  const official = site === "robosell" ? ROBOSELL_ORIGIN : ROBOHUB_ORIGIN;
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: AI_TRAINING_BOTS, disallow: "/" },
    ],
    // sitemap faqat o'z domenida e'lon qilinadi (Google boshqa domendagi sitemap'ni qabul qilmaydi)
    sitemap: origin === official ? `${official}/sitemap.xml` : undefined,
  };
}
