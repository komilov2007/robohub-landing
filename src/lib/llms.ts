import { localeUrl, type Locale } from "@/i18n/config";
import { ROBOHUB_DESCRIPTION_EN, ROBOHUB_ORIGIN } from "@/lib/seo";
import { EMAIL, INSTAGRAM_URL, OFFICE_ADDRESS, PHONE, TELEGRAM_URL, YOUTUBE_URL } from "@/lib/contacts";
import { messages as faqMessages, type Part } from "@/app/[locale]/robohub/components/faq/faq.i18n";
import { messages as pricingMessages } from "@/app/[locale]/robohub/components/pricing/pricing.i18n";
import { messages as trustMessages } from "@/app/[locale]/robohub/components/trust/trust.i18n";
import { messages as marketMessages } from "@/app/[locale]/robohub/components/market/market.i18n";
import { MP, ROWS } from "@/app/[locale]/robohub/components/market/regions-data";
import { CRM, STOCK } from "@/app/[locale]/robohub/components/integrations/integrations.data";
import { getLessons, getTopics } from "@/app/[locale]/robohub/academy/lib/academy";
import { lessonUrl, topicPath } from "@/app/[locale]/robohub/academy/lib/links";

// /llms.txt, /ru/llms.txt, /uz/llms.txt va /llms-full.txt — AI yordamchilar (ChatGPT, Claude, Gemini, Perplexity …) uchun
// sayt haqida ma'lumot (llmstxt.org formati: Markdown, bitta H1, qisqa tavsif, bo'limlar va havolalar). TZ "SEO, GEO", 3.2.
// Raqamlar (narx, sotuvchilar soni, marketpleyslar, integratsiyalar, FAQ, darslar) sahifadagi matnlarning o'zidan olinadi —
// sayt va llms.txt bir-biridan farq qilmasin. Matn o'zgarsa — bu yerga tegish shart emas.

// Fayl yangilangan sana (llms.txt tepasida). Matn yoki tuzilish o'zgartirilganda — shu sanani yangilang.
export const LLMS_UPDATED = "2026-10-30";

export type LlmsLang = Extract<Locale, "en" | "ru" | "uz">;
export const LLMS_LANGS: LlmsLang[] = ["en", "ru", "uz"];

const url = (locale: Locale, path: string) => localeUrl(locale, path);
const plain = (parts: Part[]) => parts.map((p) => (typeof p === "string" ? p : p.b)).join("");
const stat = (locale: Locale, i: number) => trustMessages[locale].stats[i];
const marketsNow = [...new Set(ROWS.flatMap((r) => r.now))].map((id) => MP[id].name);
const integrations = [...STOCK, ...CRM].map((s) => s.name).join(", ");

// Qisqa matn har tilda: sarlavhalar, tavsif, sahifalar va aloqa
const TEXT: Record<
  LlmsLang,
  {
    summary: string;
    facts: string;
    markets: string;
    pages: string;
    home: string;
    academy: string;
    aiStudio: string;
    calculator: string;
    contacts: string;
    phone: string;
    address: string;
    social: string;
    other: string;
    full: string;
    langs: string;
  }
> = {
  en: {
    summary: ROBOHUB_DESCRIPTION_EN,
    facts: "Key facts",
    markets: "Connected marketplaces",
    pages: "Pages",
    home: "Robohub platform: features, integrations, pricing and FAQ",
    academy: "free short video lessons on working with Robohub and marketplaces",
    aiStudio: "AI-generated product cards and infographics for Uzum, Wildberries and Ozon from a product photo",
    calculator: "free net-profit calculator for Uzum, Yandex Market, Wildberries and Ozon (commission, delivery, tax, cost price)",
    contacts: "Contacts",
    phone: "Phone",
    address: "Address",
    social: "Social",
    other: "Other languages",
    full: "Full facts (pricing, marketplaces by country, integrations, FAQ, Academy lessons)",
    langs: "The site is available in 7 languages: Uzbek (default, no prefix), Russian (/ru), English (/en), Kazakh (/kk), Kyrgyz (/ky), Karakalpak (/kaa), Tajik (/tg).",
  },
  ru: {
    summary:
      "Robohub — узбекская SaaS-платформа для продавцов маркетплейсов: управление магазинами на Uzum Market, Wildberries, Ozon и Yandex Market из одного кабинета — заказы, карточки товаров, цены, остатки и аналитика.",
    facts: "Ключевые факты",
    markets: "Подключённые маркетплейсы",
    pages: "Страницы",
    home: "Платформа Robohub: возможности, интеграции, тариф и FAQ",
    academy: "бесплатные короткие видеоуроки по работе с Robohub и маркетплейсами",
    aiStudio: "карточки товаров и инфографика для Uzum, Wildberries и Ozon с помощью ИИ по фото товара",
    calculator: "бесплатный калькулятор чистой прибыли на Uzum, Yandex Market, Wildberries и Ozon (комиссия, доставка, налог, себестоимость)",
    contacts: "Контакты",
    phone: "Телефон",
    address: "Адрес",
    social: "Соцсети",
    other: "Другие языки",
    full: "Полные факты на английском (тариф, маркетплейсы по странам, интеграции, FAQ, уроки Academy)",
    langs: "Сайт на 7 языках: узбекский (основной, без префикса), русский (/ru), английский (/en), казахский (/kk), кыргызский (/ky), каракалпакский (/kaa), таджикский (/tg).",
  },
  uz: {
    summary:
      "Robohub — marketpleys sotuvchilari uchun o‘zbek SaaS-platformasi: Uzum Market, Wildberries, Ozon va Yandex Market do‘konlarini bitta kabinetdan boshqarish — buyurtmalar, mahsulot kartochkalari, narxlar, qoldiqlar va analitika.",
    facts: "Asosiy faktlar",
    markets: "Ulangan marketpleyslar",
    pages: "Sahifalar",
    home: "Robohub platformasi: imkoniyatlar, integratsiyalar, tarif va FAQ",
    academy: "Robohub va marketpleyslarda ishlash bo‘yicha bepul qisqa video darslar",
    aiStudio: "mahsulot rasmidan Uzum, Wildberries va Ozon uchun AI yordamida kartochka va infografika yaratish",
    calculator: "Uzum, Yandex Market, Wildberries va Ozon'da sof foydani hisoblash uchun bepul kalkulyator (komissiya, yetkazish, soliq, tannarx)",
    contacts: "Aloqa",
    phone: "Telefon",
    address: "Manzil",
    social: "Ijtimoiy tarmoqlar",
    other: "Boshqa tillar",
    full: "To‘liq faktlar inglizcha (tarif, mamlakatlar bo‘yicha marketpleyslar, integratsiyalar, FAQ, Academy darslari)",
    langs: "Sayt 7 tilda: o‘zbekcha (asosiy, prefikssiz), ruscha (/ru), inglizcha (/en), qozoqcha (/kk), qirg‘izcha (/ky), qoraqalpoqcha (/kaa), tojikcha (/tg).",
  },
};

function factLines(locale: LlmsLang): string[] {
  const p = pricingMessages[locale];
  const tr = trustMessages[locale];
  return [
    `- ${tr.title} ${tr.titleAccent} (${stat(locale, 0).value} ${stat(locale, 0).label}; ${stat(locale, 1).value} ${stat(locale, 1).label}; ${stat(locale, 2).value} ${stat(locale, 2).label})`,
    `- ${TEXT[locale].markets}: ${marketsNow.join(", ")}`,
    `- ${p.planName.trim()}: ${p.price} ${p.unit}. ${p.extraBefore}${p.extraPrice}`,
  ];
}

/** /llms.txt (en), /ru/llms.txt, /uz/llms.txt — qisqa xarita */
export function llmsShort(lang: LlmsLang): string {
  const t = TEXT[lang];
  const others = LLMS_LANGS.filter((l) => l !== lang).map((l) => `- [${l.toUpperCase()}](${ROBOHUB_ORIGIN}${l === "en" ? "" : `/${l}`}/llms.txt)`);
  return `# Robohub

> ${t.summary}

Updated: ${LLMS_UPDATED}

${t.langs}

## ${t.facts}

${factLines(lang).join("\n")}

## ${t.pages}

- [Robohub](${url(lang, "/")}): ${t.home}
- [Robohub Academy](${url(lang, "/academy")}): ${t.academy}
- [Robohub AI Studio](${url(lang, "/aistudio")}): ${t.aiStudio}
- [Marketplace calculator](${url(lang, "/calculator")}): ${t.calculator}

## ${t.contacts}

- ${t.phone}: ${PHONE}
- Email: ${EMAIL}
- Telegram: ${TELEGRAM_URL}
- ${t.address}: ${OFFICE_ADDRESS[lang]}

## ${t.social}

- [YouTube](${YOUTUBE_URL})
- [Instagram](${INSTAGRAM_URL.robohub})

## ${t.other}

${others.join("\n")}

## Optional

- [${t.full}](${ROBOHUB_ORIGIN}/llms-full.txt)
- [Sitemap](${ROBOHUB_ORIGIN}/sitemap.xml)
`;
}

/** /llms-full.txt — to'liq faktlar (inglizcha) */
export function llmsFull(): string {
  const en: Locale = "en";
  const p = pricingMessages.en;
  const m = marketMessages.en;
  const countries = ROWS.map((r) => {
    const now = r.now.map((id) => MP[id].name).join(", ");
    const soon = r.soon.length ? `; coming soon: ${r.soon.map((id) => MP[id].name).join(", ")}` : "";
    return `- ${m.countries[r.id]}: ${now}${soon}`;
  });
  const faq = faqMessages.en.items.map((f) => `### ${f.q}\n\n${plain(f.a)}`);
  const lessons = getLessons(en);
  const academy = getTopics(en).map((t) => {
    const list = lessons
      .filter((l) => l.topic === t.slug)
      .map((l) => `  - [Lesson ${l.n}. ${l.title}](${lessonUrl(en, t.slug, l.n)})`);
    return `- [${t.name}](${url(en, topicPath(t.slug))}): ${t.short}\n${list.join("\n")}`;
  });
  return `# Robohub — full facts

> ${ROBOHUB_DESCRIPTION_EN}

Updated: ${LLMS_UPDATED}
Short version: ${ROBOHUB_ORIGIN}/llms.txt (also /ru/llms.txt, /uz/llms.txt)

## What Robohub is

${ROBOHUB_DESCRIPTION_EN} Sellers connect their marketplace accounts via API keys; products, orders and stock load into Robohub automatically. Robohub also syncs stock across marketplaces, so a product sold on one platform is updated on the others.

- Company: “Robohub” LLC (Tashkent, Uzbekistan)
- Customers: ${trustMessages.en.title} ${trustMessages.en.titleAccent} — ${stat(en, 0).value} ${stat(en, 0).label}, ${stat(en, 1).value} ${stat(en, 1).label}, ${stat(en, 2).value} ${stat(en, 2).label}
- Recognition: partner of EBRD; winner of President Tech Award; Cyber Park resident (Robohub LLC); IT Park Uzbekistan resident (Robosell LLC)

## Marketplaces by country

Connected now: ${marketsNow.join(", ")}.

${countries.join("\n")}

## Integrations

- Warehouse and accounting systems: ${STOCK.map((s) => s.name).join(", ")}
- CRM: ${CRM.map((s) => s.name).join(", ")}

All integrations: ${integrations}.

## Pricing

- ${p.planName.trim()}: ${p.price} ${p.unit} (paid for 3 months: ${p.total}); 6- and 12-month terms with discounts
- ${p.extraBefore}${p.extraPrice}
${p.groups.map((g) => `- ${g.title}: ${g.items.join("; ")}`).join("\n")}

## Free tools

- [Marketplace calculator](${url(en, "/calculator")}): ${TEXT.en.calculator}
- [AI Studio](${url(en, "/aistudio")}): ${TEXT.en.aiStudio}
- [Robohub Academy](${url(en, "/academy")}): ${TEXT.en.academy}

## FAQ

${faq.join("\n\n")}

## Robohub Academy lessons

Videos are in Uzbek; lesson pages are available in all 7 site languages.

${academy.join("\n")}

## Contacts

- Phone: ${PHONE}
- Email: ${EMAIL}
- Telegram support: ${TELEGRAM_URL}
- Address: ${OFFICE_ADDRESS.en}
- YouTube: ${YOUTUBE_URL}
- Instagram: ${INSTAGRAM_URL.robohub}
`;
}

/** Faqat Robohub domenida beriladi — boshqa saytlarda 404 */
export function textResponse(body: string): Response {
  return new Response(body, { headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
