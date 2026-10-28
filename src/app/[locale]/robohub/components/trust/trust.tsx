import type { CSSProperties } from "react";
import { getMessages } from "@/i18n/server";
import { COMPANIES, ROWS, type Company } from "./companies";
import TrustScript from "./trust-script";
import { messages } from "./trust.i18n";

// Har qator lentasining bir aylanish vaqti (s): qatorlar har xil tezlikda, juftlari teskari tomonga oqadi.
const SPEEDS = [64, 52, 76, 58, 70, 48];
// Har qator necha nusxada chiziladi — robohub.css dagi trust-roll ham shu songa boʻlib suradi (-100% / 3).
const COPIES = 3;

// Kartalar belgilari — stats tartibida: sotuvchi (doʻkon), mahsulot (quti), buyurtma (savat)
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

// Kartalar ostidagi qator: Robohub ulanadigan marketpleyslar — hero orbitasidagi yettitasi, shu tartibda.
// Nomlari tarjima qilinmaydi (logotip ustiga olib borilganda va ekran o'quvchilar uchun).
const MARKETPLACES = [
  { logo: "/marketplaces/uzum.svg", name: "Uzum Market" },
  { logo: "/robosell/icons/alif.svg", name: "alif shop" },
  { logo: "/marketplaces/wildberries.svg", name: "Wildberries" },
  { logo: "/robosell/icons/click-outline.svg", name: "Click" },
  { logo: "/marketplaces/ozon.svg", name: "Ozon" },
  { logo: "/robosell/icons/zoomrad.svg", name: "Zoomrad" },
  { logo: "/marketplaces/yandex.svg", name: "Yandex Market" },
];
// reach belgilari — reach tartibida: mamlakatlar (globus), bitta kabinet (monitor)
const REACH_ICONS = [
  <svg viewBox="0 0 24 24" key="globe">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.3 2.4 3.5 5.2 3.5 8.5s-1.2 6.1-3.5 8.5c-2.3-2.4-3.5-5.2-3.5-8.5s1.2-6.1 3.5-8.5z" />
  </svg>,
  <svg viewBox="0 0 24 24" key="desk">
    <rect x="3" y="4" width="18" height="12.5" rx="2" />
    <path d="M9 20.5h6M12 16.5v4M7 8.5h4M7 12h7" />
  </svg>,
];

// Ayrim logotiplar plitkada mayda yoki xunuk chiqadi (faylning o'zida bo'sh joy ko'p, yoki banner ko'rinishida) —
// shular uchun alohida sozlama (fayl nomi bo'yicha): fill — rasm plitkani to'liq egallaydi (o'z foni bilan),
// wide — ikki plitka kengligida, pad — ichki bo'sh joy (standart 14%, keng plitkada 12% 20%), zoom — kattalashtirish.
const TUNE: Record<string, { fill?: boolean; wide?: boolean; pad?: string; zoom?: number }> = {
  beltop: { fill: true, wide: true },
  albino: { wide: true, pad: "16% 14%" },
  "telefon-center-xiva": { wide: true, pad: "12% 14%" },
  "doremi-baby": { wide: true, pad: "8% 22%" },
  "li-ning": { pad: "8%" },
  joma: { pad: "9%" },
  "art-focus": { pad: "3%" },
  "comfort-man": { pad: "6%" },
  "kids-plate": { pad: "3%" },
  cosmica: { fill: true, zoom: 1.4 },
  mixmart: { fill: true, zoom: 1.3 },
};
const tuneOf = (logo: string) => TUNE[logo.slice(logo.lastIndexOf("/") + 1, logo.lastIndexOf("."))] ?? {};

// Plitka: logotip yoki matnli nom. Kvadrat, oʻz fonli logotip (object-cover) plitkani toʻliq egallaydi,
// qolganlari oq plitka ichida; juda keng logotip (DI sport, Beltop...) ikki plitka kengligida — kvadratda mayda boʻlib qoladi.
// Nomning rangi (data-c) va shrifti (data-f) qator va oʻrniga qarab almashadi.
const Tile = ({ c, k }: { c: Company; k: number }) => {
  if (!c.logo) {
    return (
      <span className="trust__tile trust__tile--word" data-c={k % 6} data-f={k % 4}>
        {c.name}
      </span>
    );
  }
  const tune = tuneOf(c.logo);
  const fill = tune.fill ?? c.imgClass?.includes("object-cover");
  const wide = tune.wide ?? Boolean(c.width && c.height && c.width / c.height >= 2.8);
  return (
    <span
      className={"trust__tile" + (fill ? " trust__tile--fill" : "") + (wide ? " trust__tile--wide" : "")}
      style={{ "--logo-pad": tune.pad, "--logo-z": tune.zoom } as CSSProperties}
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
  );
};

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
                {/* ekranga kirganda noldan teriladi (trust.script.js) */}
                <span data-count="">{s.value}</span>
                <i>+</i>
              </b>
              <span className="trust__label">{s.label}</span>
            </li>
          ))}
        </ul>

        {/* qamrov: tepada marketpleys logotiplari, pastda 4 mamlakat · bitta kabinet — kartalar ostida, ramkasiz */}
        <ul className="trust__reach" data-sr="" style={{ "--d": "410ms" } as CSSProperties}>
          <li className="trust__reach-mps">
            {/* yozuv — logotiplar marketpleyslar ekani tushunarli bo'lsin */}
            <span className="trust__reach-k">{t.mps}</span>
            <span className="trust__reach-logos" aria-label={MARKETPLACES.map((m) => m.name).join(", ")} role="img">
              {MARKETPLACES.map((m) => (
                <img key={m.name} src={m.logo} alt="" title={m.name} width="22" height="22" />
              ))}
            </span>
          </li>
          {t.reach.map((r, i) => (
            <li key={i}>
              <span className="trust__reach-ico" aria-hidden="true">
                {REACH_ICONS[i]}
              </span>
              <span>
                <b>{r.value}</b> {r.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <TrustScript />
    </section>
  );
}
