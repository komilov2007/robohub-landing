// Marketpleyslar polosasi — Robohub'dagi "trusted" lentasi kabi: rasmiy logolar (public/marketplaces) va nomlar.
// Ichki kontent ikki marta — translateX(-50%) uzluksiz aylanadi. data-reveal="loop": ekrandan chiqsa to'xtaydi.
const ITEMS = [
  { logo: "uzum", name: "Uzum Market" },
  { logo: "wildberries", name: "Wildberries" },
  { logo: "yandex", name: "Yandex Market" },
  { logo: "ozon", name: "Ozon" },
];

export default function Marquee() {
  const row = ITEMS.concat(ITEMS, ITEMS);
  return (
    <div className="ac-marquee" aria-hidden="true" data-reveal="loop">
      <div className="ac-marquee__track">
        {[0, 1].map((k) => (
          <div className="ac-marquee__row" key={k}>
            {row.map((m, i) => (
              <span key={i}>
                <img src={`/marketplaces/${m.logo}.svg`} alt="" width={26} height={26} loading="lazy" />
                {m.name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
