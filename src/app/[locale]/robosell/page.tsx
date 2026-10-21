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
    </div>
  );
}
