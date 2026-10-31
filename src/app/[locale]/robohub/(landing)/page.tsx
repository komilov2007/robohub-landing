import Header from "../components/header/header";
import ContactModal from "../components/contact/contact-modal";
import Hero from "../components/hero/hero";
import Trust from "../components/trust/trust";
import Problem from "../components/problem/problem";
import Features from "../components/features/features";
import FreeTools from "../components/free-tools/free-tools";
import HowItWorks from "../components/how-it-works/how-it-works";
import Integrations from "../components/integrations/integrations";
import Market from "../components/market/market";
import Reviews from "../components/reviews/reviews";
import Pricing from "../components/pricing/pricing";
import Faq from "../components/faq/faq";
import Contact from "../components/contact/contact";
import FinalCta from "../components/final-cta/final-cta";
import ScrollReveal from "../components/scroll-reveal/scroll-reveal";
import ToTop from "../components/to-top/to-top";
import Reels from "../components/reels/reels";
import MobileCta from "../components/mobile-cta/mobile-cta";
import { messages as faqMessages } from "../components/faq/faq.i18n";
import { getLocale } from "@/i18n/server";
import { locales, localeUrl } from "@/i18n/config";
import { BRAND, jsonLd, ogImageUrl, ROBOHUB_ORG, ROBOHUB_ORG_REF, ROBOHUB_ORIGIN, ROBOHUB_WEBSITE_REF } from "@/lib/seo";
import { messages as pricingMessages } from "../components/pricing/pricing.i18n";
import { messages as problemMessages, videoLang } from "../components/problem/problem.i18n";
import { messages } from "./layout";

export default async function Page() {
  const locale = await getLocale();
  const t = messages[locale];
  // Qidiruv tizimlari uchun: kompaniya (logo, manzil, aloqa, ijtimoiy tarmoqlar), sayt, sahifa, platforma (tarif narxi —
  // narxlar bo'limidagi qiymat) va FAQ — sahifadagi matnlarning o'zi
  const url = localeUrl(locale, "/");
  const price = Number(pricingMessages[locale].price.replace(/\D/g, ""));
  // "Robohubsiz / Robohub bilan" sxema videosi (Muammo bo'limi) — Google Video qidiruvi uchun: nomi, tavsifi, posteri, fayli
  const vLang = videoLang(locale);
  const video = problemMessages[locale].video;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      ROBOHUB_ORG,
      {
        "@type": "WebSite",
        "@id": ROBOHUB_WEBSITE_REF["@id"],
        url: ROBOHUB_ORIGIN,
        name: BRAND,
        inLanguage: [...locales],
        publisher: ROBOHUB_ORG_REF,
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: t.title,
        description: t.description,
        inLanguage: locale,
        isPartOf: ROBOHUB_WEBSITE_REF,
        about: ROBOHUB_ORG_REF,
        primaryImageOfPage: ogImageUrl("robohub", locale),
      },
      {
        "@type": "SoftwareApplication",
        name: BRAND,
        url,
        description: t.description,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        inLanguage: locale,
        publisher: ROBOHUB_ORG_REF,
        offers: {
          "@type": "Offer",
          price: String(price),
          priceCurrency: "UZS",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price,
            priceCurrency: "UZS",
            referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
          },
        },
      },
      {
        "@type": "VideoObject",
        "@id": `${url}#comparison-video`,
        name: video.name,
        description: video.desc,
        thumbnailUrl: [`${ROBOHUB_ORIGIN}/video/robohub-13s-${vLang}.webp`, `${ROBOHUB_ORIGIN}/video/robohub-mobile-${vLang}.webp`],
        contentUrl: `${ROBOHUB_ORIGIN}/robohub-13s-${vLang}.mp4`,
        uploadDate: vLang === "ru" ? "2026-10-30T16:45:00+05:00" : "2026-10-29T15:08:00+05:00",
        duration: "PT13S",
        width: 1920,
        height: 600,
        inLanguage: vLang,
        isFamilyFriendly: true,
        publisher: ROBOHUB_ORG_REF,
      },
      {
        "@type": "FAQPage",
        url,
        mainEntity: faqMessages[locale].items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a.map((x) => (typeof x === "string" ? x : x.b)).join("") },
        })),
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <Header />
      <ContactModal />
      <main>
        <Hero />
        <Trust />
        <Problem />
        <Features />
        <HowItWorks />
        <Integrations />
        <Market />
        <Reviews />
        <Pricing />
        <FreeTools />
        <Faq />
        <Contact />
        <FinalCta />
      </main>
      <ScrollReveal />
      <ToTop />
      <Reels />
      <MobileCta />
    </>
  );
}
