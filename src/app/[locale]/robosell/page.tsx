import { onest } from "./fonts";
import Header from "./components/header/header";
import Hero from "./components/hero/hero";
import Problem from "./components/problem/problem";
import Steps from "./components/steps/steps";
import Channels from "./components/channels/channels";
import DashboardSection from "./components/dashboard/dashboard-section";
import Integrations from "./components/integrations/integrations";
import Industries from "./components/industries/industries";
import Reviews from "./components/reviews/reviews";
import Pricing from "./components/pricing/pricing";
import Faq from "./components/faq/faq";
import FinalCta from "./components/final-cta/final-cta";
import Footer from "./components/footer/footer";
import Reveal from "./components/reveal/reveal";
import { FAQ, PRICING } from "./robosell.content";
import { messages } from "./robosell.i18n";
import { jsonLd, ROBOHUB_ORG, ROBOSELL_ORIGIN } from "@/lib/seo";

// Qidiruv tizimlari uchun: veb-xizmat (tariflar narxi bilan) va FAQ. Matn o'zbekcha — sxema ham o'zbekcha (canonical — uz).
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Robosell",
      url: ROBOSELL_ORIGIN,
      description: messages.uz.metaDescription,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Telegram",
      inLanguage: "uz",
      offers: PRICING.plans.map((p) => ({
        "@type": "Offer",
        name: p.name,
        price: String(p.price),
        priceCurrency: "UZS",
        description: p.note,
      })),
      provider: ROBOHUB_ORG,
    },
    {
      "@type": "FAQPage",
      url: ROBOSELL_ORIGIN,
      mainEntity: FAQ.list.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

// Robosell landingi. Har bo'lim o'z fon, kompozitsiya va animatsiyasiga ega:
//   hero — do'kondan admin panelga uchadigan buyurtma; 02 — oldin/keyin surgichi; 03 — to'ladigan yo'l;
//   04 — katalogdan kanallarga oqim; 05 — jonli dashboard; 06 — ulash pulti; 07 — biznes turlari;
//   hamkorlar sharhlari (ikki qatorli lenta); 08 — narxlar; 09 — FAQ; 10 — jonli chatli yakuniy CTA.
// Uslublar: robosell.css, matnlar: robosell.content.ts.
export default function Page() {
  return (
    <div className={`rs ${onest.variable}`} id="top">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Steps />
        <Channels />
        <DashboardSection />
        <Integrations />
        <Industries />
        <Reviews />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <Reveal />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
    </div>
  );
}
