import { getLocale, getMessages } from "@/i18n/server";

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
// Video avval "Robohubsiz" (kompyuterda 0–8 s, telefonda 0–3.7 s), keyin "Robohub bilan" sxemasini ko'rsatadi; problem.script.js videoning vaqtiga qarab
// data-state ni almashtiradi va head/foot dagi ikki variantdan mosini ko'rsatadi. "Robohub bilan" qismida
// bo'lim foni mint rangga o'tadi (video bilan bir vaqtda silliq almashadi), tepa o'ngdagi tugmalar videoni shu qismga o'tkazadi. Video bezak (aria-hidden) —
// mazmuni matnda.
export default async function Problem() {
  const t = await getMessages(messages);
  // Videodagi yozuvlar tili: o'zbekcha sahifada — uz, qolgan barcha tillarda — en
  const lang = (await getLocale()) === "uz" ? "uz" : "en";
  const sides = ["before", "after"] as const;
  return (
    <section
      className="pain"
      id="problem"
      data-theme="dark"
      data-state="before"
      aria-labelledby="problem-title"
    >
      <div className="container pain__frame">
        <div className="pain__head" data-sr="">
          {/* Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi: ʻ bu shriftda harf ustiga minib qoladi */}
          <div className="pain__swap">
            {sides.map((side) => (
              <div className={`pain__v--${side}`} key={side}>
                <h2
                  className="pain__title"
                  id={side === "before" ? "problem-title" : undefined}
                >
                  <span className="accent">{t[side].title[0]}</span>{" "}
                  {t[side].title[1]}
                </h2>
                <p className="pain__lead">{t[side].lead}</p>
              </div>
            ))}
          </div>
        </div>

        {/* qaysi sxema ko'rinayotgani va unga o'tish: bosilganda video shu qismga o'tadi (problem.script.js) */}
        <div className="pain__switch" role="group" aria-label={t.eyebrow}>
          {sides.map((side) => (
            <button
              type="button"
              data-to={side}
              aria-pressed={side === "before"}
              key={side}
            >
              {t[side].label}
            </button>
          ))}
        </div>

        <div className="pain__media" data-sr="">
          {/* Telefonda (≤600px) — portret video (1080×1350), kompyuterda — keng (1920×600). Uzunligi va vaqt jadvali har xil (8.7 s / 13 s),
              problem.script.js qaysi biri o'ynayotganiga qarab (currentSrc) mos jadvalni oladi. Brauzer mosini o'zi tanlaydi. */}
          {/* key: til almashganda <video> qayta yaratiladi — aks holda brauzer eski <source> ni o'ynashda davom etadi.
              autoPlay yo'q, preload="none": video sahifa ochilganda emas, bo'lim ekranga kirganda yuklanadi (problem.script.js) */}
          <video
            key={lang}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
          >
            <source
              src={`/robohub-mobile-${lang}.mp4`}
              type="video/mp4"
              media="(max-width: 600px)"
            />
            <source src={`/robohub-13s-${lang}.mp4`} type="video/mp4" />
          </video>
        </div>

        <div className="pain__next" data-sr="">
          <span className="pain__next-k">{t.next}</span>
          <ul>
            {NEXT.map((n) => (
              <li key={n.name}>
                <img loading="lazy" decoding="async" src={n.logo} alt="" width="22" height="22" />
                {n.name}
              </li>
            ))}
          </ul>
          <span className="pain__next-own">
            <span className="pain__next-ico" aria-hidden="true">
              <img loading="lazy" decoding="async"
                src="/robosell/icons/website.svg"
                alt=""
                width="22"
                height="22"
              />
              <img loading="lazy" decoding="async"
                src="/robosell/icons/telegram.svg"
                alt=""
                width="22"
                height="22"
              />
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
