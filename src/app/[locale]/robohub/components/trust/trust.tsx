import type { CSSProperties } from "react";
import { getLocale, getMessages } from "@/i18n/server";
import { imgAlt } from "@/lib/img-alt";
import type { Locale } from "@/i18n/config";
import { COMPANIES, ROWS, rowUnits, type Company } from "./companies";
import TrustScript from "./trust-script";
import { messages } from "./trust.i18n";

// Lenta tezligi (px/s, oddiy plitka 86px hisobida): qatorlar har xil tezlikda, juftlari teskari tomonga oqadi.
// Aylanish vaqti qator uzunligidan hisoblanadi — uzun va qisqa qatorlar bir xil sur'atda ko'rinadi.
const SPEEDS = [26, 32, 22, 24, 29, 35, 23];
// Bir nusxa keng ekrandan (≈ 3840px) uzun bo'lsa — 2 nusxa yetadi, aks holda 3 (lenta 1 nusxaga surilganda bo'sh joy chiqmasin)
const copiesOf = (units: number) => (units * 86 >= 3840 ? 2 : 3);

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

// Plitka rasmlari tayyor holda yig'ilgan (scripts/logos/build.mjs): fon + markazdagi logo, o'lchami bir xil —
// shuning uchun rasm plitkani to'liq egallaydi. bg — rasm yuklanguncha plitka foni.
const SIZE: Record<Company["shape"], [number, number]> = { square: [144, 144], wide: [315, 144], featured: [274, 144] };

const Tile = ({ c, locale }: { c: Company; locale: Locale }) => {
  if (!c.logo) {
    // logosi hali yo'q taniqli brend — nomi bilan matnli karta
    return (
      <span className="trust__tile trust__tile--wide trust__tile--word" data-w={c.word}>
        {c.name}
      </span>
    );
  }
  const [w, h] = SIZE[c.shape];
  return (
    <span className={`trust__tile trust__tile--${c.shape}`} style={{ background: c.bg }}>
      <img src={c.logo} alt={imgAlt(locale, "client", c.name)} title={c.name} width={w} height={h} loading="lazy" decoding="async" fetchPriority="low" draggable={false} />
    </span>
  );
};

export default async function Trust() {
  const t = await getMessages(messages);
  const locale = await getLocale();
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
            telefonda sarlavha ostida.
            Har qator 2–3 nusxada aylanadi (--n): lenta bir nusxaga surilganda ulanish joyi bilinmaydi.
            Serverda faqat bitta nusxa chiziladi — qolganlarini trust.script.js devor ekranga kirganda qo'shadi
            (sahifa ochilishida ~1300 ta ortiqcha element HTML, RSC va birinchi layout'ga tushmaydi). */}
        <div className="trust__wall" aria-hidden="true">
          {ROWS.map((row, r) => {
            const units = rowUnits(row);
            const n = copiesOf(units);
            const style = { "--dur": `${Math.round((units * 86) / SPEEDS[r % SPEEDS.length])}s`, "--n": n } as CSSProperties;
            return (
              <div className="trust__row" key={r} style={style}>
                <ul className="trust__track">
                  {row.map((c, i) => (
                    <li className="trust__item" key={i}>
                      <Tile c={c} locale={locale} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          {/* xiralik pardasi — kursor atrofida tiniq doira (robohub.css, trust.script.js) */}
          <div className="trust__veil" />
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
                <img loading="lazy" decoding="async" key={m.name} src={m.logo} alt={imgAlt(locale, "marketplace", m.name)} title={m.name} width="22" height="22" />
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
