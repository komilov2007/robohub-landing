import { PRICING } from "../../robosell.content";
import PricingClient from "./pricing-client";

// 8-bo'lim. Sirpanuvchi davr tanlagichi, narxlar sanab o'zgaradi; "Mashhur" kartada aylanuvchi chegara;
// har kartada barcha imkoniyatlar (bor/yo'q). Pastda ochiladigan taqqoslash jadvali.
export default function Pricing() {
  return (
    <section className="rs-price" id="pricing" aria-labelledby="price-title">
      <div className="rs-price__bg" aria-hidden="true" />
      <div className="rs-wrap">
        <header className="rs-head2">
          <h2 className="rs-title" id="price-title" data-rv="">
            {PRICING.title}
          </h2>
          <p className="rs-sub" data-rv="">
            {PRICING.lead}
          </p>
        </header>
        <PricingClient p={PRICING} />
      </div>
    </section>
  );
}
