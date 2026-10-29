import { siteFromHost } from "@/lib/site-host";
import { ROBOHUB_ORIGIN } from "@/lib/seo";
import { EMAIL, PHONE, TELEGRAM_URL, YOUTUBE_URL, INSTAGRAM_URL, OFFICE_ADDRESS } from "@/lib/contacts";

// /llms.txt — AI yordamchilar (ChatGPT, Claude, Perplexity …) uchun sayt haqida qisqa ma'lumot (llmstxt.org formati:
// Markdown, bitta H1, qisqa tavsif, bo'limlar va havolalar). Faqat Robohub domenida; boshqa saytlarda — 404.
// Matn sahifalardagi ma'lumotlardan olingan; yangi landing yoki aloqa ma'lumoti o'zgarsa — shu yerda ham yangilanadi.
const BODY = `# Robohub

> Robohub — marketpleys sotuvchilari uchun platforma: Uzum Market, Wildberries, Ozon va Yandex Market do'konlarini bitta kabinetdan boshqarish (buyurtmalar, mahsulot kartochkalari, narxlar, qoldiqlar va analitika).

Sayt 7 tilda: o'zbekcha (asosiy), ruscha, inglizcha, qozoqcha, qirg'izcha, qoraqalpoqcha, tojikcha.
Til manzili: bosh sahifa — ${ROBOHUB_ORIGIN}/ru; bo'limlar — ${ROBOHUB_ORIGIN}/academy/ru, ${ROBOHUB_ORIGIN}/aistudio/ru, ${ROBOHUB_ORIGIN}/calculator/ru (en, kk, ky, kaa, tg ham).

## Sahifalar

- [Robohub — platforma](${ROBOHUB_ORIGIN}): marketpleyslarni bitta kabinetda boshqarish, tariflar va FAQ
- [Robohub Academy](${ROBOHUB_ORIGIN}/academy): Robohub va marketpleyslarda ishlash bo'yicha qisqa video darslar (analitika, buyurtmalar, mahsulotlar, ombor, marketing, integratsiya)
- [Robohub AI Studio](${ROBOHUB_ORIGIN}/aistudio): mahsulot rasmidan Uzum, Wildberries va Ozon uchun AI yordamida tayyor kartochka (infografika) yaratish
- [Marketpleys kalkulyatori](${ROBOHUB_ORIGIN}/calculator): Uzum, Yandex Market, Wildberries va Ozon'da sof foydani hisoblash (komissiya, yetkazish, soliq, tannarx) — bepul

## Aloqa

- Telefon: ${PHONE}
- Email: ${EMAIL}
- Telegram: ${TELEGRAM_URL}
- Manzil: ${OFFICE_ADDRESS.uz}

## Ijtimoiy tarmoqlar

- [YouTube](${YOUTUBE_URL})
- [Instagram](${INSTAGRAM_URL.robohub})

## Optional

- [Sitemap](${ROBOHUB_ORIGIN}/sitemap.xml)
`;

export async function GET() {
  const { headers } = await import("next/headers");
  const h = await headers();
  if (siteFromHost(h.get("x-forwarded-host") ?? h.get("host") ?? "") !== "robohub") return new Response("Not found", { status: 404 });
  return new Response(BODY, { headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
