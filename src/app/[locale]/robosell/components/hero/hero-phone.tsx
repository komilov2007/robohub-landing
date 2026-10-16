"use client";

import { useEffect, useRef, useState } from "react";
import { SHOP, money } from "../../robosell.content";

// Ssenariy qadamlari (ms): 0 — bo'sh savat, 1 — lavash qo'shildi, 2 — pitsa qo'shildi,
// 3 — "Buyurtma berish" bosildi, 4 — buyurtma dashboard'ga tushdi; keyin boshidan.
const TIMELINE = [0, 1000, 2200, 3500, 4300, 8200];
const PICKS = [0, 2]; // savatga tushadigan mahsulotlar (SHOP.items indekslari)
const BARS = [42, 58, 50, 72, 64, 86];

// Hero o'ng tomoni: telefon ichidagi Telegram WebApp do'kon va yonidagi mini-dashboard.
// Ko'rinishlar CSS da (data-step bo'yicha), bu yerda faqat qadam almashadi.
// Ekrandan tashqarida yoki tab yashirin bo'lsa to'xtaydi; reduced-motion'da yakuniy holat turadi.
export default function HeroPhone() {
  const [step, setStep] = useState(4);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timers: number[] = [];
    let running = false;
    const stop = () => {
      timers.forEach(clearTimeout);
      timers = [];
      running = false;
    };
    const run = () => {
      if (running) return;
      running = true;
      setStep(0);
      TIMELINE.slice(1).forEach((at, i) => {
        timers.push(
          window.setTimeout(() => {
            if (i + 1 < TIMELINE.length - 1) setStep(i + 1);
            else {
              running = false;
              run();
            }
          }, at),
        );
      });
    };
    let visible = false;
    const sync = () => (visible && !document.hidden ? run() : stop());
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    });
    io.observe(root);
    document.addEventListener("visibilitychange", sync);
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  const picked = PICKS.filter((_, i) => step > i);
  const count = picked.length;
  const sum = picked.reduce((s, i) => s + SHOP.items[i].price, 0);
  const done = step >= 4;

  return (
    <div className="rs-stage" ref={rootRef} data-step={step}>
      {/* Telefon — bezak; ekran o'quvchiga bitta tavsif yetarli */}
      <div className="rs-phone" role="img" aria-label="Telegram ichidagi Robosell do‘koni: mahsulot savatga qo‘shiladi va buyurtma beriladi">
        <div className="rs-phone__screen" aria-hidden="true">
          <div className="rs-tg">
            <span className="rs-tg__back">‹</span>
            <span className="rs-tg__ava">R</span>
            <span className="rs-tg__who">
              <b>{SHOP.bot}</b>
              <small>bot</small>
            </span>
          </div>
          <div className="rs-shop">
            <div className="rs-shop__cats">
              {SHOP.cats.map((c, i) => (
                <span key={c} className={i === 0 ? "is-on" : undefined}>
                  {c}
                </span>
              ))}
            </div>
            <div className="rs-shop__grid">
              {SHOP.items.map((it, i) => {
                const n = picked.filter((p) => p === i).length;
                return (
                  <div key={it.name} className={"rs-pp" + (n ? " is-picked" : "") + (PICKS[step - 1] === i && step < 3 ? " is-tap" : "")}>
                    <span className={`rs-pp__img rs-pp__img--${it.tone}`} />
                    <b>{it.name}</b>
                    <span className="rs-pp__row">
                      <small>{money(it.price)}</small>
                      <span className="rs-pp__add">{n ? n : "+"}</span>
                    </span>
                    <span className="rs-pp__fly">+1</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={"rs-mainbtn" + (count ? " is-on" : "") + (step === 3 ? " is-press" : "")}>
            {done ? "Buyurtma berildi ✓" : `Buyurtma berish · ${money(sum)} so‘m`}
          </div>
          <div className={"rs-sent" + (done ? " is-on" : "")}>
            <span className="rs-sent__ok">✓</span>
            <b>Buyurtma qabul qilindi</b>
            <small>#{SHOP.orders[1]} · {money(PICKS.reduce((s, i) => s + SHOP.items[i].price, 0))} so‘m</small>
          </div>
        </div>
      </div>

      {/* Mini-dashboard: buyurtma tushganda raqamlar oshadi (NAMUNA raqamlar) */}
      <div className="rs-dash" aria-hidden="true">
        <span className="rs-dash__head">
          Bugun <i>jonli</i>
        </span>
        <div className="rs-dash__kpis">
          <span>
            <small>Daromad</small>
            <b>{done ? SHOP.revenue[1] : SHOP.revenue[0]} mln</b>
          </span>
          <span>
            <small>Buyurtmalar</small>
            <b className={done ? "is-bump" : undefined}>{money(done ? SHOP.orders[1] : SHOP.orders[0])}</b>
          </span>
          <span>
            <small>Mijozlar</small>
            <b>{SHOP.clients}</b>
          </span>
        </div>
        <div className="rs-dash__bars">
          {BARS.map((h, i) => (
            <i key={i} style={{ height: `${i === BARS.length - 1 && done ? 100 : h}%` }} />
          ))}
        </div>
      </div>

      <div className={"rs-toast" + (done ? " is-on" : "")} aria-hidden="true">
        <span className="rs-toast__ico">🔔</span>
        <span>
          <b>Yangi buyurtma!</b>
          <small>
            #{SHOP.orders[1]} · Telegram · {money(PICKS.reduce((s, i) => s + SHOP.items[i].price, 0))} so‘m
          </small>
        </span>
      </div>
    </div>
  );
}
