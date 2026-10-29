import { getLocale } from "@/i18n/server";
import { grotesk, inter } from "../../ai-studio/fonts";
import Reveal from "../../ai-studio/components/reveal/reveal";
import AnnounceBar from "@/components/announce-bar/announce-bar";
import Header from "./components/header/header";
import Hero from "./components/hero/hero";
import Why from "./components/why/why";
import CalculatorSection from "./components/calculator-section/calculator-section";
import Formula from "./components/formula/formula";
import Race from "./components/race/race";
import Journey from "./components/journey/journey";
import Faq from "./components/faq/faq";
import Finale from "./components/finale/finale";
import Footer from "./components/footer/footer";
import Motion from "./components/motion/motion";
import { buildContent } from "./calculator.content";
import { messages } from "./calculator.i18n";
import { localeHref } from "@/i18n/config";
import { jsonLd as ldScript, BRAND, ROBOHUB_ORG_REF, ROBOHUB_ORIGIN } from "@/lib/seo";
import ProductPeek from "@/components/product-peek/product-peek";

// Marketpleys kalkulyatori landingi — robohub.uz/calculator (/ru, /en ham). Konsepsiya: "sotuvdan qancha foyda qoladi?".
// Tartib: hero (pul oqimi) → muammo (komissiya — hammasi emas) → KALKULYATOR (markazda) →
// formula (imkoniyatlar) → marketpleys poygasi + kimlar uchun → skroll yo'li (3 qadam) → chat-FAQ → final → footer.
// Kalkulyatordan pastdagi bo'limlar — o'z vizual tilida (sections.css, .cx-*), boshqa landinglardan mustaqil.
// Kalkulyatorning o'zi — rb-market'dagi MarketplaceCalculator'ning mehmon varianti, o'sha ochiq API bilan
// (components/calculator). Dizayn tizimi — AI Studio'niki: shriftlar (Inter, Space Grotesk, header/footer'da Onest) va ranglar.
export default async function Page() {
  const locale = await getLocale();
  const c = buildContent(locale);
  const t = messages[locale];

  // Qidiruv tizimlari uchun: bepul veb-ilova va FAQPage (rb-market'dagi JSON-LD bilan bir xil ma'no)
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: t.appName,
      url: ROBOHUB_ORIGIN + localeHref(locale, "/calculator"),
      description: t.metaDescription,
      inLanguage: locale,
      provider: { ...ROBOHUB_ORG_REF, "@type": "Organization", name: BRAND, url: ROBOHUB_ORIGIN },
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "UZS" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: c.FAQ.items.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
    },
  ];

  return (
    <div className={`as cc ${inter.variable} ${grotesk.variable}`} id="top">
      {/* Header ustidagi reklama polosasi — skroll qilinsa chiqib ketadi */}
      <AnnounceBar locale={locale} />
      <Header nav={c.NAV} ui={c.T.ui} locale={locale} />
      <main>
        <Hero hero={c.HERO} />
        <Why why={c.WHY} receipt={c.HERO.receipt} />
        <CalculatorSection calc={c.CALC} dict={c.dict} locale={locale} />
        <Formula formula={c.S.formula} features={c.FEATURES} />
        <Race compare={c.COMPARE} race={c.S.race} who={c.WHO} />
        <Journey steps={c.STEPS} demo={c.S.journey} cta={c.HERO.cta} />
        <Faq faq={c.FAQ} chat={c.S.chat} />
        <Finale final={c.FINAL} home={localeHref(locale, "/")} />
      </main>
      <Footer footer={c.FOOTER} nav={c.NAV} tag={c.T.ui.tag} home={c.T.ui.home} locale={locale} />
      {/* footer ostida — kabinet skrinshoti va "Kirish" (ro'yxatdan o'tish) */}
      <ProductPeek locale={locale} label={c.T.ui.login} bg="#002B29" />
      <Reveal />
      <Motion />
      <script type="application/ld+json" dangerouslySetInnerHTML={ldScript(jsonLd)} />
    </div>
  );
}
