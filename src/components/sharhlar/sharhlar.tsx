"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

// Sotuvchilar sharhlari. Matnlar Robohub'ning avvalgi landingidan olingan.
const REVIEWS: { num: string; label: string; title: string; text: string; who: string; meta: string }[] = [
  {
    num: "75%",
    label: "tezroq joʻnatish",
    title: "Toʻrt marketpleysni yarim kunda uladik — va nihoyat barcha buyurtmalarni bitta lentada koʻramiz.",
    text: "Ilgari toʻrtta kabinet bilan ovora boʻlib, doim ortiqcha sotardik. Endi buyurtmalar bitta lentaga keladi, etiketkalar toʻplab chop etiladi, joʻnatish esa ancha tezlashdi. Ulanish yarim kun oldi.",
    who: "Elektronika va gadjetlar sotuvchisi",
    meta: "4 ta marketpleys · 2023-yildan beri",
  },
  {
    num: "+32%",
    label: "sof marja",
    title: "Birinchi marta har bir mahsuldagi haqiqiy foydani koʻryapman — komissiya va logistikadan keyin.",
    text: "Moliyaviy tahlil komissiya, logistika va reklamani oʻzi hisobga oladi. Sezdirmay zarar keltirayotgan mahsulotlarni olib tashladim va sof marja oshdi. Birinchi haftadayoq oʻzini qopladi.",
    who: "Kosmetika va goʻzallik sotuvchisi",
    meta: "Uzum va Wildberries · 2022-yildan beri",
  },
  {
    num: "−90%",
    label: "bekor qilishlar",
    title: "Qoldiqlar barcha doʻkonlarda sinxron, shuning uchun bekor qilishlar deyarli nolga tushdi.",
    text: "Robohub Uzum, Yandex Market, Wildberries va Ozon’da qoldiqlarni bir vaqtda aniq saqlaydi. Yoʻq narsani sotishni toʻxtatdik va endi u butun bek-ofisimizni yuritadi.",
    who: "Uy-roʻzgʻor buyumlari sotuvchisi",
    meta: "3 ta marketpleys · 2021-yildan beri",
  },
  {
    num: "12 soat",
    label: "haftasiga tejaldi",
    title: "Narx va kartochkalarni barcha marketpleyslarda ommaviy tahrirlash jamoamga haftasiga bir kun tejaydi.",
    text: "Avval kabinetlar oʻrtasida soatlab nusxa koʻchirardik, endi bu bitta harakat. Narx, qoldiq va kartochkalar hamma joyda birdan yangilanadi — jamoaning katalogni oʻstirishga vaqti qoldi.",
    who: "Bolalar tovarlari sotuvchisi",
    meta: "4 ta marketpleys · 2023-yildan beri",
  },
  {
    num: "4 → 1",
    label: "marketpleys bitta oynada",
    title: "Buyurtma, yetkazib berish va moliya endi bitta oynada.",
    text: "Bitta marketpleysdan toʻrttagacha kengaydik, yangi xodim olmasdan. Dashboard nima sotilayotgani va nima qotib qolganini koʻrsatadi, shuning uchun xarid qarorlari aniq.",
    who: "Avto ehtiyot qismlar sotuvchisi",
    meta: "4 ta marketpleys · 2022-yildan beri",
  },
  {
    num: "×2",
    label: "takroriy buyurtmalar",
    title: "Sharhlarga darhol javob va oʻsha kuni joʻnatish kartochkalarimizni qidiruvda yuqoriga koʻtardi.",
    text: "Mijozlarga avtomatik javob beramiz, buyurtmalar oʻsha kuni joʻnaydi. Reytinglar oshdi, kartochkalar yuqoriroq chiqadi, takroriy buyurtmalar uch oyda ikki baravar oshdi. Qoʻllab-quvvatlash ham zoʻr.",
    who: "Oziq-ovqat va eko mahsulot sotuvchisi",
    meta: "Yandex Market va Uzum · 2024-yildan beri",
  },
];

// Har sharh ekranda shuncha turadi, keyin navbatdagisiga oʻtadi.
const STEP = 6000;

export default function Sharhlar() {
  const [at, setAt] = useState(0);
  // sichqoncha ustida yoki klaviatura fokusida turganda avtomatik almashish toʻxtaydi
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setAt((i) => (i + 1) % REVIEWS.length), STEP);
    return () => clearTimeout(id);
  }, [at, paused]);

  const r = REVIEWS[at];

  return (
    <section className="revs" id="sharhlar" data-theme="brand" aria-labelledby="revs-title">
      <div className="container">
        <p className="revs__eyebrow" data-sr="">Sharhlar</p>
        {/* Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi */}
        <h2 className="revs__title" id="revs-title" data-sr="" style={{ "--d": "80ms" } as CSSProperties}>
          Bizga ishonmang — <span className="accent">sotuvchilarni tinglang</span>
        </h2>
        <p className="revs__lead" data-sr="" style={{ "--d": "140ms" } as CSSProperties}>
          Sotuvchilar Robohubga oʻtgach nimalar oʻzgargani haqida: tezroq joʻnatish, kamroq bekor qilish va nihoyat koʻrinadigan foyda.
        </p>

        {/* Tabloga oʻxshash: tepada oltita natija raqami, pastda tanlangan raqam ortidagi sotuvchining gapi.
            Raqam bosilsa oʻsha sharh ochiladi; aks holda STEP oraligʻida oʻzi almashadi. */}
        <div
          className="revs__stage"
          data-sr=""
          style={{ "--d": "200ms", "--step": STEP + "ms" } as CSSProperties}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="revs__tabs" role="tablist" aria-label="Sotuvchilar natijalari">
            {REVIEWS.map((x, i) => (
              <button
                className={"revs__tab" + (i === at ? " is-on" : "")}
                key={x.num}
                type="button"
                role="tab"
                id={"revs-tab-" + i}
                aria-selected={i === at}
                aria-controls="revs-panel"
                onClick={() => setAt(i)}
              >
                <b>{x.num}</b>
                <span>{x.label}</span>
                {/* vaqt chizigʻi: toʻlganda keyingi sharhga oʻtadi */}
                {i === at && !paused && <i aria-hidden="true" />}
              </button>
            ))}
          </div>
          <article className="revs__spot" id="revs-panel" role="tabpanel" aria-labelledby={"revs-tab-" + at} key={at}>
            <div>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </div>
            <div className="revs__who">
              <i aria-hidden="true">{r.who[0]}</i>
              <span>
                <b>{r.who}</b>
                <span>{r.meta}</span>
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
