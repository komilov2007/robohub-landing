import { onest } from "./fonts";
import Header from "./components/header/header";
import Hero from "./components/hero/hero";
import Problem from "./components/problem/problem";
import Channels from "./components/channels/channels";
import Features from "./components/features/features";
import Analytics from "./components/analytics/analytics";
import Integrations from "./components/integrations/integrations";
import HowItWorks from "./components/how-it-works/how-it-works";
import Pricing from "./components/pricing/pricing";
import Reviews from "./components/reviews/reviews";
import FinalCta from "./components/final-cta/final-cta";
import Footer from "./components/footer/footer";
import Reveal from "./components/reveal/reveal";

// Robosell landingi. Konsepsiya — "do'kon chatdagi suhbat": hero'dan keyingi har bo'lim
// chat pufakchasi (.rs-sec): bir burchagi o'tkir va "dumcha"li, navbatma-navbat chap/o'ng,
// har biri oldingisi ustiga chiqadi. Uslublar: robosell.css, matnlar: robosell.content.ts.
export default function Page() {
  return (
    <div className={`rs ${onest.variable}`} id="top">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Channels />
        <Features />
        <Analytics />
        <Integrations />
        <HowItWorks />
        <Pricing />
        <Reviews />
        <FinalCta />
      </main>
      <Footer />
      <Reveal />
    </div>
  );
}
