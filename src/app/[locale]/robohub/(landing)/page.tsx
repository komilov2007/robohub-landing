import Header from "../components/header/header";
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

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Trust />
        <Problem />
        <Features />
        <FreeTools />
        <HowItWorks />
        <Integrations />
        <Market />
        <Reviews />
        <Pricing />
        <Faq />
        <Contact />
        <FinalCta />
      </main>
      <ScrollReveal />
    </>
  );
}
