import { grotesk, inter, onest } from "./fonts";
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
import { ContentProvider } from "./content-context";
import { getC } from "./content.server";

// RoboHub AI Studio landingi. Konsepsiya — "oddiy fotodan sotadigan kartochkaga":
// hero'da oldin/keyin studiyasi, keyin ishonch (marketplace + raqamlar), muammo → yechim,
// natijalar galereyasi, 4 qadam, generatsiya rejimlari, token hisoblagichi, Academy, FAQ, yakuniy CTA va footer.
// Uslublar: ai-studio.css (hamma narsa .as ichida), matnlar (uz/ru/en): ai-studio.content.ts.
// Joriy tildagi kontent client komponentlarga ContentProvider orqali, server komponentlarga getC() orqali yetadi.
// path — sahifaning tilsiz yo'li: o'z domenida "/" (page.tsx), Robohub domenida "/ai-studio" (robohub/ai-studio/page.tsx)
export default async function StudioPage({ path = "/" }: { path?: string }) {
  const c = await getC(path);
  return (
    <ContentProvider value={c}>
    <div className={`as ${inter.variable} ${grotesk.variable} ${onest.variable}`} id="top">
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
      <Reveal />
      <StudioModal />
    </div>
    </ContentProvider>
  );
}
