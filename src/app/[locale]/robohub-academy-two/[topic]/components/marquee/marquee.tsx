// Marketpleyslar tasmasi — bosh sahifadagi mavzular tasmasi kabi: hero ostidan chiqib turgan, og'gan brend tasma,
// rasmiy logolar (public/marketplaces) va nomlar cheksiz yuguradi. Ichki kontent ikki marta — translateX(-50%).
const ITEMS = [
  { logo: "uzum", name: "Uzum Market" },
  { logo: "wildberries", name: "Wildberries" },
  { logo: "yandex", name: "Yandex Market" },
  { logo: "ozon", name: "Ozon" },
];

export default function Marquee() {
  const row = ITEMS.concat(ITEMS);
  return (
    <div className="acx-ticker acx-ticker--mp" aria-hidden="true">
      <div className="acx-ticker__band">
        <div className="acx-ticker__track">
          {[0, 1].map((k) => (
            <span className="acx-ticker__row" key={k}>
              {row.map((m, i) => (
                <span key={i} className="acx-ticker__item">
                  <img src={`/marketplaces/${m.logo}.svg`} alt="" width={40} height={40} loading="lazy" />
                  {m.name}
                  <i>✦</i>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
