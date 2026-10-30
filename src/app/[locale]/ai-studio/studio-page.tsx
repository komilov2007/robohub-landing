import { grotesk, inter } from "./fonts";
import AnnounceBar from "@/components/announce-bar/announce-bar";
import Header from "./components/header/header";
import Hero from "./components/hero/hero";
import Trust from "./components/trust/trust";
import Problem from "./components/problem/problem";
import Gallery from "./components/gallery/gallery";
import Steps from "./components/steps/steps";
import Modes from "./components/modes/modes";
import Pricing from "./components/pricing/pricing";
import Academy from "./components/academy/academy";
import Faq from "./components/faq/faq";
import FinalCta from "./components/final-cta/final-cta";
import Footer from "./components/footer/footer";
import Reveal from "./components/reveal/reveal";
import StudioModal from "./components/studio-modal/studio-modal";
import ProductPeek from "@/components/product-peek/product-peek";
import { ContentProvider } from "./content-context";
import { getC } from "./content.server";
import { PRICE_PER_IMAGE } from "./ai-studio.content";
import { messages } from "./ai-studio.i18n";
import { localeUrl } from "@/i18n/config";
import { jsonLd, BRAND, ROBOHUB_ORG_REF, ROBOHUB_ORIGIN } from "@/lib/seo";

// RoboHub AI Studio landingi. Konsepsiya — "oddiy fotodan sotadigan kartochkaga":
// hero'da oldin/keyin studiyasi, keyin ishonch (marketplace + raqamlar), muammo → yechim,
// natijalar galereyasi, 4 qadam, generatsiya rejimlari, token hisoblagichi, Academy, FAQ, yakuniy CTA va footer.
// Uslublar: ai-studio.css (hamma narsa .as ichida), matnlar (uz/ru/en): ai-studio.content.ts.
// Joriy tildagi kontent client komponentlarga ContentProvider orqali, server komponentlarga getC() orqali yetadi.
// path — sahifaning tilsiz yo'li: o'z domenida "/" (page.tsx), Robohub domenida "/aistudio" (robohub/aistudio/page.tsx)
export default async function StudioPage({ path = "/" }: { path?: string }) {
  const c = await getC(path);
  const t = messages[c.locale];
  // Qidiruv tizimlari uchun: veb-ilova (1 rasm narxi bilan) va FAQ. Manzil — canonical (robohub.uz/ai-studio), layout.tsx bilan bir xil
  const url = localeUrl(c.locale, "/aistudio");
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Robohub AI Studio",
        url,
        description: t.metaDescription,
        applicationCategory: "DesignApplication",
        operatingSystem: "Web",
        inLanguage: c.locale,
        offers: {
          "@type": "Offer",
          price: String(PRICE_PER_IMAGE),
          priceCurrency: "UZS",
          priceSpecification: { "@type": "UnitPriceSpecification", price: PRICE_PER_IMAGE, priceCurrency: "UZS", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitText: "image" } },
        },
        provider: { ...ROBOHUB_ORG_REF, "@type": "Organization", name: BRAND, url: ROBOHUB_ORIGIN },
      },
      {
        "@type": "FAQPage",
        url,
        mainEntity: c.FAQ.items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
      },
    ],
  };
  return (
    <ContentProvider value={c}>
    <div className={`as ${inter.variable} ${grotesk.variable}`} id="top">
      {/* Header ustidagi reklama polosasi — skroll qilinsa chiqib ketadi */}
      <AnnounceBar locale={c.locale} />
      <Header />
      <main>
        <Hero />
        <Trust />
        <Problem />
        <Gallery />
        <Steps />
        <Modes />
        <Pricing />
        <Academy />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      {/* footer ostida — kabinet skrinshoti va "Kirish" (ro'yxatdan o'tish) */}
      <ProductPeek locale={c.locale} label={c.T.ui.login} bg="#002A28" />
      <Reveal />
      <StudioModal />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
    </div>
    </ContentProvider>
  );
}
