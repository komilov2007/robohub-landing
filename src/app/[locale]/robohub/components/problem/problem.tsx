import type { CSSProperties } from "react";
import { getMessages } from "@/i18n/server";
import ProblemScript from "./problem-script";
import { messages } from "./problem.i18n";

// "Keyin esa" qatoridagi navbatdagi maydonchalar
const NEXT = [
  { name: "alif shop", logo: "/robosell/icons/alif.svg" },
  { name: "Kaspi.kz", logo: "/marketplaces/kaspi.svg" },
  { name: "Halyk Market", logo: "/marketplaces/halyk.svg" },
  { name: "Click", logo: "/robosell/icons/click-outline.svg" },
  { name: "Zoomrad", logo: "/robosell/icons/zoomrad.svg" },
];

// 2. MUAMMO — head (sarlavha) → media (sxema videosi) → foot ("keyin esa").
// Video 0–8 s "Robohubsiz", keyin "Robohub bilan" sxemasini ko'rsatadi; problem.script.js videoning vaqtiga qarab
// data-state ni almashtiradi va head/foot dagi ikki variantdan mosini ko'rsatadi. "Robohub bilan" qismida
// bo'lim foni mint rangga o'tadi (video bilan bir vaqtda silliq almashadi), tepa o'ngdagi tugmalar videoni shu qismga o'tkazadi. Video bezak (aria-hidden) —
// mazmuni matnda.
// Telefondagi sahna (pain__stage) uchun: 4 marketpleys va 7 vazifa ikonkasi (24×24, chiziqli) — vazifa nomlari tartibida
const MPS = [
  { id: "uzum", name: "Uzum Market", logo: "/marketplaces/uzum.svg" },
  { id: "wb", name: "Wildberries", logo: "/marketplaces/wildberries.svg" },
  { id: "ozon", name: "Ozon", logo: "/marketplaces/ozon.svg" },
  { id: "yandex", name: "Yandex Market", logo: "/marketplaces/yandex.svg" },
];
const TASK_ICONS = [
  "M3 5h18v14H3zM3 15l5-5 4 4 3-3 6 6", // kartochkalar
  "M12 3 3 8l9 5 9-5zM3 13l9 5 9-5", // qoldiqlar
  "M6 8h12l-1 12H7zM9 8V6a3 3 0 0 1 6 0v2", // buyurtmalar
  "M3 10v4h4l6 4V6l-6 4zM16 9a4 4 0 0 1 0 6", // reklama
  "M5 20v-7M12 20V5M19 20v-11", // analitika
  "M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6", // hujjatlar
  "M2 7h12v9H2zM14 10h4l3 3v3h-7M6 19.5a1.5 1.5 0 1 0 0-.01M17 19.5a1.5 1.5 0 1 0 0-.01", // yetkazish
];
type Stage = (typeof messages)["uz"]["stage"];

const Ico = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={d} />
  </svg>
);

function Boss({ s }: { s: Stage }) {
  return (
    <div className="ps__boss">
      <span className="ps__boss-ico">
        <Ico d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0" />
      </span>
      <span>
        <b>{s.boss}</b>
        <small>{s.bossSub}</small>
      </span>
    </div>
  );
}

// pastdagi 4 marketpleys plitkasi; prefix — qaysi qism ("b" — Robohubsiz, "a" — Robohub bilan: ✓ belgisi chiqadi)
function Tiles({ prefix }: { prefix: "a" | "b" }) {
  return (
    <span className="ps__mps">
      {MPS.map((m, i) => (
        <span className="ps__mp" data-i={i} key={m.id}>
          <img src={m.logo} alt="" width={26} height={26} />
          {m.name}
          {prefix === "a" && (
            <i className="ps__ok">
              <Ico d="M5 12.5l4.5 4.5L19 7.5" />
            </i>
          )}
        </span>
      ))}
    </span>
  );
}

export default async function Problem() {
  const t = await getMessages(messages);
  const s = t.stage;
  const sides = ["before", "after"] as const;
  return (
    <section className="pain" id="problem" data-theme="dark" data-state="before" aria-labelledby="problem-title">
      <div className="container pain__frame">
        <div className="pain__head" data-sr="">
          {/* Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi: ʻ bu shriftda harf ustiga minib qoladi */}
          <div className="pain__swap">
            {sides.map((side) => (
              <div className={`pain__v--${side}`} key={side}>
                <h2 className="pain__title" id={side === "before" ? "problem-title" : undefined}>
                  <span className="accent">{t[side].title[0]}</span> {t[side].title[1]}
                </h2>
                <p className="pain__lead">{t[side].lead}</p>
              </div>
            ))}
          </div>
        </div>

        {/* qaysi sxema ko'rinayotgani va unga o'tish: bosilganda video shu qismga o'tadi (problem.script.js) */}
        <div className="pain__switch" role="group" aria-label={t.eyebrow}>
          {sides.map((side) => (
            <button type="button" data-to={side} aria-pressed={side === "before"} key={side}>
              {t[side].label}
            </button>
          ))}
        </div>

        {/* Telefonda video o'rniga — shu sxemaning tik (portret) varianti, HTML'da; vaqt jadvali videoniki bilan bir xil
            (0–8 s "Robohubsiz", 8.5–12.5 s "Robohub bilan"), holatlarni problem.script.js har kadrda belgilaydi. Bezak. */}
        <div className="pain__stage" aria-hidden="true">
          <div className="ps ps--b">
            <p className="ps__top">
              {s.beforeTop[0]}
              <br />
              {s.beforeTop[1]}
            </p>
            <Boss s={s} />
            <div className="ps__rows">
              {MPS.map((m, r) => (
                <div className="ps__row" key={m.id} style={{ "--r": r } as CSSProperties}>
                  <span className="ps__box ps__box--b" data-r={r} />
                  <span className="ps__mgr" data-r={r}>
                    <img src={m.logo} alt="" width={20} height={20} />
                    <span>
                      <b>{s.manager}</b>
                      <small>{s.salary}</small>
                    </span>
                  </span>
                  <span className="ps__cells">
                    {TASK_ICONS.map((d, c) => (
                      <i className="ps__cell" data-r={r} data-c={c} key={c}>
                        <Ico d={d} />
                      </i>
                    ))}
                  </span>
                </div>
              ))}
            </div>
            <p className="ps__k">{s.mps}</p>
            <Tiles prefix="b" />
          </div>

          <div className="ps ps--a">
            <p className="ps__top">
              {s.afterTop[0]}
              <br />
              {s.afterTop[1]}
            </p>
            <Boss s={s} />
            <span className="ps__stem">
              <span className="ps__box ps__box--hub" />
            </span>
            <div className="ps__hub">
              <span className="ps__logo">
                <svg viewBox="0 0 33.8675 15.06" aria-hidden="true">
                  <use href="#rh-mark" />
                </svg>
                robohub
              </span>
              <small>{s.hubSub}</small>
              <span className="ps__chips">
                {TASK_ICONS.map((d, i) => (
                  <span className="ps__chip" data-i={i} key={i}>
                    <Ico d={d} />
                    {s.tasks[i]}
                  </span>
                ))}
              </span>
            </div>
            <span className="ps__tree">
              {MPS.map((m, i) => (
                <span className="ps__box ps__box--a" data-i={i} style={{ "--i": i } as CSSProperties} key={m.id} />
              ))}
            </span>
            <Tiles prefix="a" />
          </div>
        </div>

        <div className="pain__media" data-sr="">
          <video src="/robohub-sxema.mp4" autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
        </div>

        <div className="pain__next" data-sr="">
          <span className="pain__next-k">{t.next}</span>
          <ul>
            {NEXT.map((n) => (
              <li key={n.name}>
                <img src={n.logo} alt="" width="22" height="22" />
                {n.name}
              </li>
            ))}
          </ul>
          <span className="pain__next-own">
            <span className="pain__next-ico" aria-hidden="true">
              <img src="/robosell/icons/website.svg" alt="" width="22" height="22" />
              <img src="/robosell/icons/telegram.svg" alt="" width="22" height="22" />
            </span>
            {t.own}
          </span>
          <b className="pain__next-cost pain__swap">
            {sides.map((side) => (
              <span className={`pain__v--${side}`} key={side}>
                {t[side].cost}
              </span>
            ))}
          </b>
        </div>
      </div>
      <ProblemScript />
    </section>
  );
}
