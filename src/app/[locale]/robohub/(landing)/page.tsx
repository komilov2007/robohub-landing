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
import { localeHref } from "@/i18n/config";
import { jsonLd, ROBOHUB_ORG, ROBOHUB_ORIGIN } from "@/lib/seo";
import { messages } from "./layout";

export default async function Page() {
  const locale = await getLocale();
  const t = messages[locale];
  // Qidiruv tizimlari uchun: kompaniya (logo, aloqa, ijtimoiy tarmoqlar), sayt va FAQ — sahifadagi matnlarning o'zi
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      ROBOHUB_ORG,
      {
        "@type": "WebSite",
        "@id": `${ROBOHUB_ORIGIN}/#website`,
        url: ROBOHUB_ORIGIN,
        name: "Robohub",
        description: t.description,
        inLanguage: locale,
        publisher: { "@id": ROBOHUB_ORG["@id"] },
      },
      {
        "@type": "FAQPage",
        url: ROBOHUB_ORIGIN + localeHref(locale, "/"),
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
