import type { CSSProperties } from "react";
import { getMessages } from "@/i18n/server";
import { COMPANIES, ROWS, type Company } from "./companies";
import { messages } from "./trust.i18n";

// Har qator lentasining bir aylanish vaqti (s): qatorlar har xil tezlikda, juftlari teskari tomonga oqadi.
const SPEEDS = [64, 52, 76, 58, 70, 48];
// Har qator necha nusxada chiziladi — robohub.css dagi trust-roll ham shu songa boʻlib suradi (-100% / 3).
const COPIES = 3;

// Kartalar belgilari — stats tartibida: kompaniya (doʻkon), mahsulot (quti), buyurtma (savat)
const ICONS = [
  <svg viewBox="0 0 24 24" key="store">
    <path d="M4 10v10h16V10M3 10l2-6h14l2 6M3 10c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3M10 20v-5h4v5" />
  </svg>,
  <svg viewBox="0 0 24 24" key="box">
    <path d="M21 7.5L12 3 3 7.5m18 0L12 12m9-4.5v9L12 21m0-9L3 7.5M12 12v9M3 7.5v9L12 21" />
  </svg>,
  <svg viewBox="0 0 24 24" key="cart">
    <path d="M3 4h2.2l2.3 10.6a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.1L20.5 8H6.1" />
    <circle cx="9.5" cy="19.5" r="1.3" />
    <circle cx="17" cy="19.5" r="1.3" />
  </svg>,
];

// Plitka: logotip yoki matnli nom. Kvadrat, oʻz fonli logotip (object-cover) plitkani toʻliq egallaydi,
// qolganlari oq plitka ichida; juda keng logotip (DI sport, Beltop...) ikki plitka kengligida — kvadratda mayda boʻlib qoladi.
// Nomning rangi (data-c) va shrifti (data-f) qator va oʻrniga qarab almashadi.
const Tile = ({ c, k }: { c: Company; k: number }) =>
  c.logo ? (
    <span
      className={
        "trust__tile" +
        (c.imgClass?.includes("object-cover") ? " trust__tile--fill" : "") +
        (c.width && c.height && c.width / c.height >= 2.8 ? " trust__tile--wide" : "")
      }
    >
      <img
        src={c.logo}
        alt=""
        width={c.width}
        height={c.height}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        draggable={false}
      />
    </span>
  ) : (
    <span className="trust__tile trust__tile--word" data-c={k % 6} data-f={k % 4}>
      {c.name}
    </span>
  );

export default async function Trust() {
  const t = await getMessages(messages);
  return (
    <section className="trust" id="trust" data-theme="dark" aria-labelledby="trust-title">
      <div className="container">
        <div className="trust__head">
          {/* Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi */}
          <h2 className="trust__title" id="trust-title" data-sr="">
            <span>{t.title}</span> <span className="accent">{t.titleAccent}</span>
          </h2>
          <p className="trust__lead" data-sr="" style={{ "--d": "80ms" } as CSSProperties}>
            {t.lead}
          </p>
        </div>

        {/* ekran oʻquvchilar uchun: har bir nom bir marta */}
        <p className="sr-only">
          {`${t.label}: `}
          {COMPANIES.map((c) => c.name).filter(Boolean).join(", ")}
        </p>

        {/* Logotiplar devori — bezak. Keng ekranda butun section kengligida, matn ostida (section boʻyicha absolute),
            telefonda sarlavha ostida. Har qator COPIES marta chiziladi (lenta bir nusxaga surilganda ham keng ekran
            toʻla qoladi); uslub raqami asl qatordagi indeksdan olinadi — ulanish joyi bilinmaydi. */}
        <div className="trust__wall" aria-hidden="true">
          {ROWS.map((row, r) => (
            <div className="trust__row" key={r} style={{ "--dur": `${SPEEDS[r % SPEEDS.length]}s` } as CSSProperties}>
              <ul className="trust__track">
                {Array.from({ length: COPIES }, () => row).flat().map((c, n) => (
                  <li className="trust__item" key={n}>
                    <Tile c={c} k={(n % row.length) + r * 2} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* raqamlar: uchta karta ustma-ust (ustun) */}
        <ul className="trust__stats">
          {t.stats.map((s, i) => (
            <li className="trust__stat" key={i} data-sr="" style={{ "--d": `${140 + i * 90}ms` } as CSSProperties}>
              <span className="trust__ico" aria-hidden="true">{ICONS[i]}</span>
              <b className="trust__num">
                {s.value}
                <i>+</i>
              </b>
              <span className="trust__label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
