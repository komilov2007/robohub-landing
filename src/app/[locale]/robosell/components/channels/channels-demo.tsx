"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { CHANNELS } from "../../robosell.content";
import Icon from "../icon/svg-icon";

// "Bir marta qo'shing — hamma joyda chiqadi" sahnasi.
// Aylanish: 0 — admin kartasida yangi mahsulot to'ldiriladi, 1 — "Nashr qilish" bosiladi,
// 2 — uchta chiziq bo'ylab nur pastga tushadi, 3 — mahsulot Telegram, sayt va Click katalogi boshiga bir vaqtda tushadi.
// Keyin keyingi mahsulot bilan takrorlanadi. Faqat ko'rinib turganda aylanadi.
// Serverda va reduced-motion'da — yakuniy holat (mahsulot hamma joyda turibdi).
type Product = { img: string; name: string; price: string; cat: string };
const PRODUCTS: Product[] = [
  { img: "/categories/shoes.webp", name: "Krossovka White Glitter", price: "690 000", cat: "Poyabzal" },
  { img: "/categories/accessories.webp", name: "Soat U-Boat Classic", price: "1 250 000", cat: "Aksessuarlar" },
  { img: "/ai/cosmetics_composition.webp", name: "Namlovchi krem, 50 ml", price: "149 000", cat: "Go‘zallik" },
  { img: "/categories/electronics.webp", name: "Quloqchin Koss Porta", price: "420 000", cat: "Elektronika" },
  { img: "/categories/home.webp", name: "Kreslo Retro", price: "2 900 000", cat: "Uy uchun" },
];
// katalogda doim turadigan eski mahsulotlar
const BASE: Product[] = [
  { img: "/categories/sport.webp", name: "Gantel 24 kg", price: "380 000", cat: "Sport" },
  { img: "/categories/books.webp", name: "Kitoblar to‘plami", price: "210 000", cat: "Kitoblar" },
  { img: "/categories/kids.webp", name: "O‘yinchoq quti", price: "175 000", cat: "Bolalar" },
  { img: "/categories/health.webp", name: "Vitaminlar to‘plami", price: "96 000", cat: "Salomatlik" },
];
const SCRIPT: [number, number][] = [
  [0, 0],
  [1600, 1],
  [2000, 2],
  [2900, 3],
];
const LOOP_MS = 6200;

export default function ChannelsDemo() {
  const [phase, setPhase] = useState(3);
  const [n, setN] = useState(0); // nechta mahsulot nashr qilingan (oxirgisi — PRODUCTS[(n-1)%len])
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timers: number[] = [];
    let running = false;
    const cycle = () => {
      setN((x) => x + 1);
      timers = SCRIPT.map(([ms, p]) => window.setTimeout(() => setPhase(p), ms));
      timers.push(window.setTimeout(cycle, LOOP_MS));
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !running) {
          running = true;
          cycle();
        } else if (!e.isIntersecting && running) {
          running = false;
          timers.forEach(clearTimeout);
          setPhase(3);
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const cur = PRODUCTS[Math.max(0, n - 1) % PRODUCTS.length];
  // katalog: yangi mahsulot (tushgan bo'lsa) + oldingilari
  const prev = n > 1 ? PRODUCTS[(n - 2) % PRODUCTS.length] : null;
  const landed = phase === 3;
  const list = [...(landed ? [cur] : []), ...(prev ? [prev] : []), ...BASE];
  const key = `${n}-${landed}`;

  return (
    <div className="rs-cx" ref={ref} data-phase={phase}>
      {/* admin: mahsulot qo'shish */}
      <div className="rs-cx__admin">
        <div className="rs-cx__admin-head">
          <Icon name="logo" w={96} h={15} alt="Robosell" />
          <span>Mahsulot qo‘shish</span>
        </div>
        <div className="rs-cx__form" key={n}>
          { }
          <img src={cur.img} alt="" />
          <span className="rs-cx__fields">
            <span className="rs-cx__field">
              <small>Nomi</small>
              <b>{cur.name}</b>
            </span>
            <span className="rs-cx__row2">
              <span className="rs-cx__field">
                <small>Narx</small>
                <b>{cur.price} so‘m</b>
              </span>
              <span className="rs-cx__field">
                <small>Kategoriya</small>
                <b>{cur.cat}</b>
              </span>
            </span>
          </span>
        </div>
        <div className="rs-cx__targets">
          {[
            ["telegram", "Telegram"],
            ["globe", "Sayt"],
            ["click-outline", "Click"],
          ].map(([ic, l]) => (
            <span key={l}>
              <Icon name={ic} size={16} />
              {l}
              <i>✓</i>
            </span>
          ))}
        </div>
        <span className="rs-cx__publish">
          <i className="rs-cx__spin" />
          <em>{landed ? "✓ 3 ta kanalda nashr qilindi" : "Nashr qilish"}</em>
        </span>
      </div>

      {/* nur yo'llari */}
      <svg className="rs-cx__wires" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true" key={`w${n}`}>
        {["M600 0 C 600 70, 186 40, 186 120", "M600 0 L 600 120", "M600 0 C 600 70, 1014 40, 1014 120"].map((d) => (
          <g key={d}>
            <path className="rs-cx__road" d={d} />
            <path className="rs-cx__beam" d={d} pathLength={1} />
          </g>
        ))}
      </svg>
      <span className="rs-cx__down" aria-hidden="true">
        ↓ bir vaqtda 3 ta kanalga
      </span>

      {/* kanallar */}
      <ul className="rs-cx__channels">
        {CHANNELS.list.map((c, i) => (
          <li key={c.id} className={`rs-cx__ch rs-cx__ch--${c.id}`} style={{ "--i": i } as CSSProperties}>
            <div className="rs-cx__screen" aria-hidden="true">
              <Skin id={c.id} />
              <div className={`rs-cx__grid rs-cx__grid--${c.id}`}>
                {list.slice(0, 4).map((p, j) => (
                  <span key={j === 0 && landed ? key + p.img : p.img} className={"rs-cx__item" + (j === 0 && landed ? " is-new" : "")}>
                    { }
                    <img src={p.img} alt="" />
                    {j === 0 && landed && <em>Yangi</em>}
                    <b>{p.price}</b>
                    <small>{p.name}</small>
                  </span>
                ))}
              </div>
              <span className={"rs-cx__ping" + (landed ? " is-on" : "")} key={`p${key}`}>
                +1 mahsulot
              </span>
            </div>
            <div className="rs-cx__label">
              <h3>{c.name}</h3>
              <p>{c.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Skin({ id }: { id: string }) {
  if (id === "tg")
    return (
      <div className="rs-cx__skin rs-cx__skin--tg">
        <span className="rs-cx__ava">R</span>
        <span className="rs-cx__who">
          <b>Robosell Shop</b>
          <small>bot · WebApp</small>
        </span>
        <Icon name="telegram" size={20} />
      </div>
    );
  if (id === "web")
    return (
      <div className="rs-cx__skin rs-cx__skin--web">
        <span className="rs-cx__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="rs-cx__url">robosellshop.uz</span>
      </div>
    );
  return (
    <div className="rs-cx__skin rs-cx__skin--click">
      <Icon name="click" w={60} h={24} alt="" />
      <span>Robosell Shop</span>
    </div>
  );
}
