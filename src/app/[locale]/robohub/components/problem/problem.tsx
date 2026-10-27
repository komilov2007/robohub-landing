import type { CSSProperties, ReactNode } from "react";
import { getMessages } from "@/i18n/server";
import ProblemScript from "./problem-script";
import { messages } from "./problem.i18n";

const MARKETPLACES = [
  { id: "uzum", name: "Uzum Market" },
  { id: "wildberries", name: "Wildberries" },
  { id: "ozon", name: "Ozon" },
  { id: "yandex", name: "Yandex Market" },
];
// "Keyin esa" qatoridagi navbatdagi maydonchalar
const NEXT = [
  { name: "alif shop", logo: "/robosell/icons/alif.svg" },
  { name: "Kaspi.kz", logo: "/marketplaces/kaspi.svg" },
  { name: "Halyk Market", logo: "/marketplaces/halyk.svg" },
  { name: "Click", logo: "/robosell/icons/click-outline.svg" },
  { name: "Zoomrad", logo: "/robosell/icons/zoomrad.svg" },
];

const ic = (paths: ReactNode, box = 24) => (
  <svg className="ic" viewBox={`0 0 ${box} ${box}`}>
    {paths}
  </svg>
);

const PERSON = ic(
  <>
    <circle cx="12" cy="8" r="3.6" />
    <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
  </>,
);
const ARROW = ic(<path d="M3 8h10M9.5 4.5L13 8l-3.5 3.5" />, 16);
const CHECK = ic(<path d="M5 12.5l4.5 4.5L19 7.5" />);

// vazifalar belgilari (i18n tasks tartibida): kartochka, qoldiq, buyurtma, reklama, analitika, hujjat, yetkazish
const TASK_ICONS = [
  ic(
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="M20.5 15.5l-4.5-4.5-8 8.5" />
    </>,
  ),
  ic(<path d="M12 3.5l8.5 4.5-8.5 4.5L3.5 8zM3.5 12.2l8.5 4.5 8.5-4.5M3.5 16.2l8.5 4.5 8.5-4.5" />),
  ic(<path d="M5 8h14l-1.2 11.6a1.5 1.5 0 0 1-1.5 1.4H7.7a1.5 1.5 0 0 1-1.5-1.4zM9 10.5V7a3 3 0 0 1 6 0v3.5" />),
  ic(<path d="M3.5 10v4h3l7 4.5v-13l-7 4.5zM17 9a4 4 0 0 1 0 6" />),
  ic(<path d="M4 20h16M7 16.5v-4M12 16.5v-9M17 16.5v-6.5" />),
  ic(<path d="M14 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8zM14 3.5V8h4.5M9 12.5h6M9 16h4" />),
  ic(
    <>
      <path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3.2v2.8h-7" />
      <circle cx="6.5" cy="17" r="1.8" />
      <circle cx="16.5" cy="17" r="1.8" />
    </>,
  ),
];

// raqamlar belgilari (i18n stats tartibida)
const COIN = ic(
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M14.6 9.2c-.4-.9-1.4-1.4-2.6-1.4-1.5 0-2.6.8-2.6 1.9 0 2.6 5.3 1.3 5.3 4 0 1.1-1.2 2-2.7 2-1.3 0-2.4-.6-2.8-1.5M12 6.3v1.5M12 16.2v1.5" />
  </>,
);
const STAT_ICONS = {
  before: [
    COIN,
    ic(<path d="M8.5 8.5h11v11h-11zM15.5 8.5V6A1.5 1.5 0 0 0 14 4.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5" />),
    ic(
      <>
        <path d="M3 12s3.3-6 9-6 9 6 9 6-3.3 6-9 6-9-6-9-6z" />
        <circle cx="12" cy="12" r="2.6" />
        <path d="M4.5 4.5l15 15" />
      </>,
    ),
  ],
  after: [COIN, ic(<path d="M3.5 4.5h17V16h-17zM9 20h6M12 16v4" />), CHECK],
};

// 2. MUAMMO — ikki sxema: avval Robohubsiz (tadbirkor → 4 menejer → har birida 7 vazifa → 4 marketpleys),
// keyin Robohub bilan (tadbirkor → bitta kabinetda 7 vazifa → 4 marketpleys).
// Keng ekranda sahna ekranga qotadi va skroll bilan birinchisi ikkinchisiga aylanadi (problem.script.js);
// aks holda ikkala sxema ketma-ket turadi. Sxemalar bezak (aria-hidden) — mazmuni sarlavha, matn va raqamlarda.
export default async function Problem() {
  const t = await getMessages(messages);
  const tasks = (done: boolean) => (
    <ul className="dg__tasks">
      {t.tasks.map((name, k) => (
        <li className="dg__task" key={k} style={{ "--k": k } as CSSProperties}>
          {TASK_ICONS[k]}
          <span>{name}</span>
          {done && <i className="dg__ok">{CHECK}</i>}
        </li>
      ))}
    </ul>
  );
  const mp = (m: (typeof MARKETPLACES)[number], i: number) => (
    <div className="dg__mp" key={m.id} style={{ "--r": i + 2 } as CSSProperties}>
      <img src={`/marketplaces/${m.id}.svg`} alt="" width="26" height="26" />
      <span>{m.name}</span>
    </div>
  );
  const slide = (side: "before" | "after") => {
    const s = t[side];
    const done = side === "after";
    return (
      <div className={`pain__slide pain__slide--${side}`} data-theme={done ? "mint" : undefined}>
        <div className="container pain__frame">
          <div className="pain__head" data-sr="">
            <p className="pain__eyebrow">
              <svg viewBox="0 0 33.8675 15.06" aria-hidden="true">
                <use href="#rh-mark" />
              </svg>
              {t.eyebrow} · {s.label}
            </p>
            {/* Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi: ʻ bu shriftda harf ustiga minib qoladi */}
            <h2 className="pain__title" id={done ? "problem-title-after" : "problem-title"}>
              <span className="accent">{s.title[0]}</span> {s.title[1]}
            </h2>
            <p className="pain__lead">{s.lead}</p>
          </div>

          <p className="sr-only">
            {s.tasksLabel}: {t.tasks.join(", ")}.
          </p>
          <div className={`dg dg--${side}`} aria-hidden="true" data-sr="">
            {side === "before" ? (
              <>
                <span className="dg__label dg__label--mgr">{t.before.mgrLabel}</span>
                <span className="dg__label dg__label--tasks">{s.tasksLabel}</span>
                <span className="dg__label dg__label--mp">{t.mpLabel}</span>
                <div className="dg__who">
                  {PERSON}
                  <b>{t.who.title}</b>
                  <small>{t.who.note}</small>
                </div>
                <i className="dg__tree dg__tree--l" />
                {MARKETPLACES.map((m, i) => (
                  <div className="dg__row" key={m.id} style={{ "--r": i + 2, "--i": i } as CSSProperties}>
                    <div className="dg__mgr">
                      <img src={`/marketplaces/${m.id}.svg`} alt="" width="22" height="22" />
                      <b>{t.before.manager}</b>
                      <small>{t.before.salary}</small>
                    </div>
                    <i className="dg__arrow">{ARROW}</i>
                    {tasks(false)}
                    <i className="dg__arrow dg__arrow--go">{ARROW}</i>
                  </div>
                ))}
                {MARKETPLACES.map(mp)}
              </>
            ) : (
              <>
                <span className="dg__label dg__label--tasks">{s.tasksLabel}</span>
                <span className="dg__label dg__label--mp">{t.mpLabel}</span>
                <div className="dg__who">
                  {PERSON}
                  <b>{t.who.title}</b>
                  <small>{t.who.note}</small>
                </div>
                <i className="dg__line" />
                <div className="dg__panel">
                  <div className="dg__panel-head">
                    <svg viewBox="0 0 127 31">
                      <use href="#rh-logo" />
                    </svg>
                    <span>{t.after.panel}</span>
                  </div>
                  {tasks(true)}
                </div>
                <i className="dg__tree dg__tree--r" />
                {MARKETPLACES.map(mp)}
              </>
            )}
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
            <b className="pain__next-cost">{s.cost}</b>
          </div>

          <ul className="pain__stats" data-sr="">
            {s.stats.map((st, k) => (
              <li key={k}>
                <span className="pain__stat-ico" aria-hidden="true">
                  {STAT_ICONS[side][k]}
                </span>
                <b>{st.value}</b>
                <small>{st.label}</small>
              </li>
            ))}
          </ul>

          {/* sahna qotganda: qaysi sxema ko'rinayotgani va unga o'tish (problem.script.js) */}
          {!done && (
            <div className="pain__switch" role="group" aria-label={t.eyebrow}>
              <button type="button" data-to="before" aria-pressed="true">
                {t.before.label}
              </button>
              <button type="button" data-to="after" aria-pressed="false">
                {t.after.label}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };
  return (
    <section className="pain" id="problem" data-theme="dark" aria-labelledby="problem-title">
      <div className="pain__stage">
        {slide("before")}
        {slide("after")}
      </div>
      <ProblemScript />
    </section>
  );
}
