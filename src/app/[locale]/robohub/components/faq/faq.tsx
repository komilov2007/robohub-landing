"use client";

import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";

// Javoblar sahifaning o'zidagi va Robohub vositalari sahifalaridagi ma'lumotga tayanadi.
// Tasdiqlanmagan mavzular (bepul sinov, bekor qilish) ataylab kiritilmagan.
const FAQ: { q: string; a: ReactNode }[] = [
  {
    q: "Robohub qaysi marketpleyslar bilan ishlaydi?",
    a: <><b>Uzum Market, Yandex Market, Wildberries va Ozon.</b> Toʻrttalasidagi buyurtma, tovar, qoldiq va analitika bitta kabinetda turadi.</>,
  },
  {
    q: "Ulash qancha vaqt oladi?",
    a: <><b>Bir necha daqiqa.</b> Roʻyxatdan oʻtasiz, marketpleys kabinetidan olingan API kalitini kiritasiz — maʼlumotlar kabinetga avtomatik keladi. Qiyin boʻlsa, jamoamiz yordam beradi.</>,
  },
  {
    q: "Narxi qancha?",
    a: <><b>Oyiga 500 000 soʻm.</b> 6 oyga toʻlasangiz 5%, 12 oyga toʻlasangiz 15% chegirma. Tarifga 4 ta marketpleys va har biriga 3 tadan doʻkon kiradi.</>,
  },
  {
    q: "Nechta doʻkon ulash mumkin?",
    a: <><b>Tarif ichida 12 tagacha:</b> har marketpleysga 3 tadan. Koʻproq kerak boʻlsa, har bir qoʻshimcha doʻkon oyiga 99 000 soʻm.</>,
  },
  {
    q: "Ombor va hisob tizimim bilan ishlaydimi?",
    a: <><b>Ha.</b> МойСклад, BILLZ, ERA, Smartup, YesPOS, Bito, Sales Doctor, Apicore va Retail CRM bilan integratsiya bor. Baʼzilari menejer bilan birga sozlanadi.</>,
  },
  {
    q: "Foydamni qanday koʻraman?",
    a: <>Dashboardda <b>sof foyda, marja va ROI</b> koʻrinadi; ABC/XYZ tahlil va AI tavsiyalar qaysi tovar foyda keltirayotganini koʻrsatadi.</>,
  },
  {
    q: "Kalkulyator va AI infografika pullikmi?",
    a: <><b>Marketpleys kalkulyatori bepul</b> va roʻyxatdan oʻtmasdan ishlaydi. AI infografikada dastlabki 3 ta rasm bepul, keyingilari — bittasi 1 500 soʻm.</>,
  },
  {
    q: "Qanday qoʻllab-quvvatlash bor?",
    a: <><b>Oʻzbek, rus va ingliz tillarida</b> telefon va Telegram orqali jonli yordam beramiz.</>,
  },
];

export default function Faq() {
  // doim bitta savol tanlangan: kompyuterda javobi oʻngdagi panelda, telefonda savolning tagida chiqadi
  const [open, setOpen] = useState(0);

  return (
    <section className="faq" id="savollar" data-theme="light" aria-labelledby="faq-title">
      <div className="container">
        <p className="faq__eyebrow" data-sr="">Savollar</p>
        {/* Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi */}
        <h2 className="faq__title" id="faq-title" data-sr="" style={{ "--d": "80ms" } as CSSProperties}>
          Ko‘p so‘raladigan <span className="accent">savollar</span>
        </h2>

        <div className="faq__grid" data-sr="" style={{ "--d": "140ms" } as CSSProperties}>
          <div className="faq__list">
            {FAQ.map((f, i) => {
              const isOpen = open === i;
              return (
                <article className={"faq-item" + (isOpen ? " is-open" : "")} key={f.q}>
                  <h3>
                    <button className="faq-item__q" type="button" aria-expanded={isOpen} aria-controls={"faq-a-" + i} onClick={() => setOpen(i)}>
                      <span className="faq-item__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                      {f.q}
                      <span className="faq-item__x" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path d="M9 6l6 6-6 6" />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  {/* telefonda koʻrinadi; kompyuterda javob oʻngdagi panelda */}
                  <div className="faq-item__a" id={"faq-a-" + i}>
                    <div>
                      <p>{f.a}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="faq__panel" data-theme="dark">
            {/* key — savol almashganda javob qaytadan paydo boʻlish animatsiyasi bilan chiqadi; panel ekran oʻquvchilar uchun takror */}
            <div className="faq__answer" key={open} aria-hidden="true">
              <p className="faq__num">{String(open + 1).padStart(2, "0")}</p>
              <h3>{FAQ[open].q}</h3>
              <p>{FAQ[open].a}</p>
            </div>
            <a className="faq__help" href="tel:+998999857226">
              <i aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                </svg>
              </i>
              <span>
                <span>Qoʻllab-quvvatlash xizmati</span>
                <b>+998 (99) 985 72 26</b>
              </span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
