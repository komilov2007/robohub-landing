import type { MetadataRoute } from "next";
import { requestOrigin, siteFromHost } from "@/lib/site-host";
import { ROBOHUB_ORIGIN, ROBOSELL_ORIGIN } from "@/lib/seo";

// /robots.txt — hamma sahifa ochiq, /api/ (ichki so'rovlar) yopiq.
// *.vercel.app'da ham Disallow YO'Q: preview manzillar X-Robots-Tag: noindex beradi (next.config.ts) — Google uni ko'rishi
// uchun sahifani ochib o'qiy olishi kerak (Disallow bo'lsa, sarlavhani ko'rmay URL'ni indeksda qoldirishi mumkin).
// Sitemap — faqat rasmiy domenda.
//
// AI botlar (TZ "SEO, GEO", 3.1): ChatGPT, Gemini, Claude, Perplexity va boshqalar saytni o'qiy olsin — ochiq
// (Robohub'ni bilishi va tavsiya qilishi uchun). Yandex Neyro va Copilot — oddiy qidiruv indeksidan ("*" qoidasi).
// Eslatma: Vercel Firewall'da "Block AI bots" o'chiq turishi kerak; Cloudflare "Managed robots.txt" yoqilsa — bu faylning
// boshiga o'z qoidalarini qo'shadi.
const AI_BOTS = [
  // OpenAI: o'qitish, ChatGPT Search, foydalanuvchi o'tishlari
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Google Gemini va AI Overviews
  "Google-Extended",
  // Anthropic Claude
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Apple Intelligence, Meta AI, Mistral, Common Crawl
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "MistralAI-User",
  "CCBot",
];

export default async function robots(): Promise<MetadataRoute.Robots> {
  const origin = await requestOrigin();
  const site = siteFromHost(new URL(origin).host);
  const official = site === "robosell" ? ROBOSELL_ORIGIN : ROBOHUB_ORIGIN;
  const rule = { allow: "/", disallow: "/api/" };
  return {
    rules: [
      { userAgent: "*", ...rule },
      { userAgent: AI_BOTS, ...rule },
    ],
    // sitemap faqat o'z domenida e'lon qilinadi (Google boshqa domendagi sitemap'ni qabul qilmaydi)
    sitemap:
      origin !== official
        ? undefined
        : site === "robohub"
          ? [`${official}/sitemap.xml`, `${official}/sitemap-images.xml`]
          : `${official}/sitemap.xml`,
  };
}
