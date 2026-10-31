import { officialOrigin, siteFromHost } from "@/lib/site-host";
import { ogImageUrl, ROBOHUB_ORIGIN } from "@/lib/seo";
import { locales, officialUrl, type Locale } from "@/i18n/config";
import { aiImage, type AiProduct } from "@/lib/ai-images";
import { getLessons, getTopics } from "../[locale]/robohub/academy/lib/academy";
import { lessonPath, topicPath } from "../[locale]/robohub/academy/lib/links";
import { yt } from "../[locale]/robohub/academy/lib/youtube";
import { messages as problemMessages, videoLang } from "../[locale]/robohub/components/problem/problem.i18n";

// /sitemap-images.xml — Google Rasmlar uchun: har sahifadagi asosiy rasmlar (ulashish rasmi, guvohnomalar,
// AI Studio namunalari, Academy dars muqovalari). robots.txt'da e'lon qilingan (faqat Robohub domenida; boshqasida — 404).
// Manzillar doim rasmiy domen bilan (sitemap.ts kabi). Yangi dars qo'shilsa — avtomatik tushadi (academy.ts).
const CERTS = ["/certificates/cyber-park.webp", "/certificates/it-park.webp", "/certificates/robohub-guvohnoma.webp"];
const AI_PRODUCTS: AiProduct[] = ["phone", "thermos", "bag", "earbuds", "glasses", "keyboard"];
// Bosh sahifadagi "oddiy foto → AI infografika" namunasi (Bepul vositalar bo'limi)
const HOME_AI = ["/ai/iphone-ishodnoe-foto.jpg", "/ai/iphone-foto-na-stole-ai.webp"];

// Bosh sahifadagi sxema videosi (Muammo bo'limi, "Robohubsiz / Robohub bilan") — <video:video> yozuvi
type Video = { thumb: string; title: string; desc: string; src: string };
const homeVideo = (l: Locale): Video => {
  const v = videoLang(l);
  const t = problemMessages[l].video;
  return { thumb: abs(`/video/robohub-13s-${v}.webp`), title: t.name, desc: t.desc, src: abs(`/robohub-13s-${v}.mp4`) };
};

const abs = (src: string) => (src.startsWith("http") ? src : ROBOHUB_ORIGIN + src);
const pageUrl = (locale: Locale, path: string) => officialUrl(locale, path);
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Faqat shu domendagi sahifalar (official — robohub.kz, academy.robohub.uz …); rasmlar istalgan domenda bo'lishi mumkin
function build(official: string): string {
  const entries: { loc: string; images: string[]; video?: Video }[] = [];
  for (const l of locales) {
    const video = homeVideo(l);
    entries.push({
      loc: pageUrl(l, "/"),
      images: [ogImageUrl("robohub", l), `${ROBOHUB_ORIGIN}/logo/robohub.png`, video.thumb, ...HOME_AI.map(abs), ...CERTS.map(abs)],
      video,
    });
    entries.push({ loc: pageUrl(l, "/aistudio"), images: [ogImageUrl("ai-studio", l), ...AI_PRODUCTS.map((p) => abs(aiImage(p, l)))] });
    entries.push({ loc: pageUrl(l, "/calculator"), images: [ogImageUrl("calculator", l)] });
    entries.push({ loc: pageUrl(l, "/academy"), images: [ogImageUrl("academy", l)] });
    const lessons = getLessons(l);
    for (const t of getTopics(l)) {
      const main = lessons.find((x) => x.n === t.mainLesson);
      if (main) entries.push({ loc: pageUrl(l, topicPath(t.slug)), images: [yt.thumb(main.youtubeId)] });
    }
    for (const x of lessons) {
      const path = lessonPath(x.topic, x.n);
      if (path !== topicPath(x.topic)) entries.push({ loc: pageUrl(l, path), images: [yt.thumb(x.youtubeId)] });
    }
  }
  const body = entries
    .filter((e) => new URL(e.loc).origin === official)
    .map(
      (e) =>
        `<url><loc>${esc(e.loc)}</loc>${e.images.map((i) => `<image:image><image:loc>${esc(i)}</image:loc></image:image>`).join("")}${
          e.video
            ? `<video:video><video:thumbnail_loc>${esc(e.video.thumb)}</video:thumbnail_loc><video:title>${esc(e.video.title)}</video:title><video:description>${esc(e.video.desc)}</video:description><video:content_loc>${esc(e.video.src)}</video:content_loc><video:duration>13</video:duration><video:family_friendly>yes</video:family_friendly></video:video>`
            : ""
        }</url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${body}
</urlset>
`;
}

export async function GET() {
  const { headers } = await import("next/headers");
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "";
  if (siteFromHost(host) === "robosell") return new Response("Not found", { status: 404 });
  return new Response(build(officialOrigin(host) ?? ROBOHUB_ORIGIN), { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
