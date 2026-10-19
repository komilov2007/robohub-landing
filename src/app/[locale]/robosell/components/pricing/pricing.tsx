import { PINGS, PRICING } from "../../robosell.content";
import Section from "../section/section";
import PricingClient from "./pricing-client";

// 8-bo'lim. Davr tanlovi narxlarni qayta hisoblaydi; Basic — sariq ramka va "Mashhur".
// Mobilda kartalar slayder (Basic birinchi), taqqoslash jadvali — kartalar.
export default function Pricing() {
  return (
    <Section id="pricing" side="in" tone="white" ping={PINGS.pricing} labelledBy="price-title">
      <div className="rs-wrap">
        <header className="rs-head rs-head--center">
          <h2 className="rs-h2" id="price-title" data-rv="">
            {PRICING.title}
          </h2>
        </header>
        <PricingClient p={PRICING} />
      </div>
    </Section>
  );
}
