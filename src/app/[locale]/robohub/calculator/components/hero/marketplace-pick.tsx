import { CALCULATOR_MARKETPLACES, MARKETPLACE_META } from "../calculator/constants";
import { getLocale } from "@/i18n/server";
import { imgAlt } from "@/lib/img-alt";

// Hero'dagi marketpleyslar — faqat ko'rsatish uchun (bosilmaydi): kalkulyator qaysi to'rttasini hisoblashi.
export default async function MarketplacePick({ label }: { label: string }) {
  const locale = await getLocale();
  return (
    <div className="cc-pick">
      <span className="cc-pick__label">{label}</span>
      <ul className="cc-pick__list">
        {CALCULATOR_MARKETPLACES.map((mp) => (
          <li key={mp} className="cc-pick__mp">
            <img src={MARKETPLACE_META[mp].icon} alt={imgAlt(locale, "marketplace", MARKETPLACE_META[mp].label)} width={42} height={42} />
            <span className="cc-pick__name">{MARKETPLACE_META[mp].label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
