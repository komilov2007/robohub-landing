import { CALCULATOR_MARKETPLACES, MARKETPLACE_META } from "../calculator/constants";

// Hero'dagi marketpleyslar — faqat ko'rsatish uchun (bosilmaydi): kalkulyator qaysi to'rttasini hisoblashi.
export default function MarketplacePick({ label }: { label: string }) {
  return (
    <div className="cc-pick">
      <span className="cc-pick__label">{label}</span>
      <ul className="cc-pick__list">
        {CALCULATOR_MARKETPLACES.map((mp) => (
          <li key={mp} className="cc-pick__mp">
            <img src={MARKETPLACE_META[mp].icon} alt="" width={42} height={42} />
            <span className="cc-pick__name">{MARKETPLACE_META[mp].label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
