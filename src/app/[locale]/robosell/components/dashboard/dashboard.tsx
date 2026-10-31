"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { DASHBOARD } from "../../robosell.content";
import Icon from "../icon/svg-icon";

// 5-bo'lim — "jonli dashboard bento". Har widget — admin panelning bitta bo'limi (DASHBOARD.tabs):
//   statistika (daromad grafigi), buyurtmalar (tushayotgan lenta), to'lovlar (diagramma), mahsulotlar (top + ombor),
//   mijozlar (bazasi va qayta xarid). Bo'lim ko'rinib turganda: grafik chiziladi, raqamlar sanaladi,
//   har ~2.6 s da yangi buyurtma tushadi va daromad o'sadi. Ekrandan chiqsa — to'xtaydi. Hamma raqamlar NAMUNA.
const T = Object.fromEntries(DASHBOARD.tabs.map((t) => [t.id, t])) as Record<(typeof DASHBOARD.tabs)[number]["id"], (typeof DASHBOARD.tabs)[number]>;

const FEED = [
  { who: "Aziza K.", sum: 149000, src: "telegram", st: "Yangi" },
  { who: "Jasur T.", sum: 690000, src: "globe", st: "Yangi" },
  { who: "Malika R.", sum: 1250000, src: "click-outline", st: "Yangi" },
  { who: "Bekzod U.", sum: 420000, src: "instagram", st: "Yangi" },
  { who: "Sevara M.", sum: 215000, src: "telegram", st: "Yangi" },
  { who: "Otabek N.", sum: 189000, src: "globe", st: "Yangi" },
];
// davrlar: grafik nuqtalari, o'q yorliqlari va KPI (NAMUNA)
const PERIODS = [
  { id: "Kun", pts: [14, 18, 16, 28, 40, 52, 46, 58, 66, 61, 72, 78], axis: ["09", "11", "13", "15", "17", "19", "21"], rev: 4_820_000, ord: 24, avg: 201_000, unit: "ming", max: 620 },
  { id: "Hafta", pts: [30, 38, 34, 46, 42, 58, 52, 64, 60, 70, 66, 80], axis: ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"], rev: 12_400_000, ord: 312, avg: 397_000, unit: "mln", max: 2.4 },
  { id: "Oy", pts: [22, 30, 26, 38, 34, 46, 41, 55, 50, 62, 58, 70, 66, 78], axis: ["1", "5", "10", "15", "20", "25", "30"], rev: 48_240_000, ord: 1284, avg: 386_000, unit: "mln", max: 5.1 },
];
const PAYS = [
  { icon: "click", w: 52, h: 21, share: 42, color: "#00524F" },
  { icon: "payme", w: 56, h: 16, share: 28, color: "#5DC983" },
  { icon: "robo-pay", w: 20, h: 20, share: 18, color: "#A8EBC0", label: "Robopay" },
  { icon: "", w: 0, h: 0, share: 12, color: "#E3EAE7", label: "Naqd" },
];
const TOP = [
  { img: "/ai/krem-infografika-sostav.webp", name: "Namlovchi krem", n: 312, w: 92 },
  { img: "/categories/shoes.webp", name: "Krossovka", n: 198, w: 64 },
  { img: "/categories/accessories.webp", name: "Soat U-Boat", n: 86, w: 34 },
];
const AVATARS = [
  ["AK", "#5DC983"],
  ["JT", "#2AABEE"],
  ["MR", "#DD2A7B"],
  ["BU", "#F2AF4C"],
  ["SM", "#7C5CFF"],
];

// diagramma: conic-gradient bo'laklari (o'zgarmaydi)
const DONUT = PAYS.map((p, i) => {
  const from = PAYS.slice(0, i).reduce((s, x) => s + x.share, 0);
  return `${p.color} ${from}% ${from + p.share}%`;
}).join(",");

const fmt = (n: number) => n.toLocaleString("ru-RU").replace(/ /g, " ");

export default function Dashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const [tick, setTick] = useState(0); // nechta yangi buyurtma tushdi
  const [pi, setPi] = useState(2); // davr
  const [hold, setHold] = useState(false); // foydalanuvchi davrni o'zi tanladi
  const [hover, setHover] = useState<number | null>(null); // grafikda kursor ostidagi nuqta

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!live || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setTick((x) => x + 1), 2600);
    return () => clearInterval(t);
  }, [live]);

  // davr o'zi almashadi (foydalanuvchi tanlamaguncha)
  useEffect(() => {
    if (!live || hold || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setPi((p) => (p + 1) % PERIODS.length), 6500);
    return () => clearInterval(t);
  }, [live, hold]);

  const feed = Array.from({ length: 4 }, (_, i) => ({ ...FEED[(tick - i + FEED.length * 100) % FEED.length], id: 29182 + tick - i }));
  const added = FEED.slice(0, tick).reduce((s, o) => s + o.sum, 0) + Math.max(0, tick - FEED.length) * 300000;
  const P = PERIODS[pi];
  const revenue = P.rev + added;
  const orders = P.ord + tick;
  // grafikning oxirgi nuqtasi har yangi buyurtma bilan biroz ko'tariladi
  const pts = P.pts.map((p, i) => (i === P.pts.length - 1 ? Math.min(94, p + tick * 2) : p));
  const line = pts.map((p, i) => `${(i / (pts.length - 1)) * 100},${100 - p}`).join(" ");
  const hi = hover ?? pts.length - 1;
  // kursor ostidagi nuqta qiymati (davr birligida): grafik balandligi × davrning eng katta qiymati
  const hiVal = (pts[hi] / 100) * P.max;


  return (
    <div className="rs-bn" ref={ref} data-live={live || undefined}>
      {/* 1 — statistika */}
      <article className="rs-bn__w rs-bn__w--stats">
        <WHead n="01" title={T.stats.title} text={T.stats.text} />
        <div className="rs-bn__period" role="group" aria-label="Davr" style={{ "--i": pi } as CSSProperties}>
          {PERIODS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={i === pi}
              onClick={() => {
                setPi(i);
                setHold(true);
              }}
            >
              {p.id}
            </button>
          ))}
          <span className="rs-bn__thumb" aria-hidden="true" />
        </div>
        <div className="rs-bn__kpis" key={`k${pi}`}>
          <span>
            <small>Daromad</small>
            <b key={revenue}>{(revenue / 1e6).toFixed(1).replace(".", ",")} mln</b>
            <em>▲ 12%</em>
          </span>
          <span>
            <small>Buyurtmalar</small>
            <b key={orders}>{fmt(orders)}</b>
            <em>▲ 9%</em>
          </span>
          <span>
            <small>O‘rtacha chek</small>
            <b>{fmt(P.avg)}</b>
            <em>▲ 3%</em>
          </span>
        </div>
        <div
          className="rs-bn__chart"
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
            setHover(Math.round(x * (pts.length - 1)));
          }}
          onPointerLeave={() => setHover(null)}
        >
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" key={`c${pi}`}>
            <defs>
              <linearGradient id="rs-bn-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#5DC983" stopOpacity=".4" />
                <stop offset="1" stopColor="#5DC983" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[25, 50, 75].map((y) => (
              <line key={y} x1="0" x2="100" y1={y} y2={y} className="rs-bn__grid" />
            ))}
            <polygon points={`0,100 ${line} 100,100`} fill="url(#rs-bn-area)" className="rs-bn__area" />
            <polyline points={line} className="rs-bn__line" pathLength={1} />
          </svg>
          <span
            className={"rs-bn__dot" + (hover !== null ? " is-hover" : "")}
            style={{ "--x": `${(hi / (pts.length - 1)) * 100}%`, "--y": `${100 - pts[hi]}%` } as CSSProperties}
            aria-hidden="true"
          >
            <i />
            <em>
              {P.unit === "ming" ? Math.round(hiVal) : hiVal.toFixed(1).replace(".", ",")} {P.unit}
            </em>
          </span>
          <span className="rs-bn__days" aria-hidden="true">
            {P.axis.map((d) => (
              <i key={d}>{d}</i>
            ))}
          </span>
        </div>
      </article>

      {/* 2 — buyurtmalar lentasi */}
      <article className="rs-bn__w rs-bn__w--orders">
        <WHead n="02" title={T.orders.title} text={T.orders.text} />
        <ul className="rs-bn__feed" aria-label="So‘nggi buyurtmalar (namuna)">
          {feed.map((o, i) => (
            <li key={o.id} className={i === 0 && tick > 0 ? "is-new" : undefined}>
              <Icon name={o.src} size={20} />
              <span>
                <b>#{o.id}</b>
                <small>{o.who}</small>
              </span>
              <strong>{fmt(o.sum)}</strong>
              <em className={i === 0 ? "is-new" : i === 1 ? "is-prog" : "is-way"}>{i === 0 ? "Yangi" : i === 1 ? "Jarayonda" : "Yo‘lda"}</em>
            </li>
          ))}
        </ul>
      </article>

      {/* 3 — to'lovlar */}
      <article className="rs-bn__w rs-bn__w--pay">
        <WHead n="03" title={T.payments.title} text={T.payments.text} />
        <div className="rs-bn__pay">
          <span className="rs-bn__donut" style={{ "--g": DONUT } as CSSProperties} aria-hidden="true">
            <b>78%</b>
            <small>onlayn</small>
          </span>
          <ul>
            {PAYS.map((p) => (
              <li key={p.color}>
                <i style={{ background: p.color }} />
                {p.icon ? <Icon name={p.icon} w={p.w} h={p.h} alt={p.label ?? p.icon} /> : null}
                {p.label && <span>{p.label}</span>}
                <b>{p.share}%</b>
              </li>
            ))}
          </ul>
        </div>
      </article>

      {/* 4 — mahsulotlar */}
      <article className="rs-bn__w rs-bn__w--prod">
        <WHead n="04" title={T.products.title} text={T.products.text} />
        <ul className="rs-bn__top">
          {TOP.map((p, i) => (
            <li key={p.name} style={{ "--w": `${p.w}%`, "--i": i } as CSSProperties}>
              { }
              <img src={p.img} alt="" />
              <span>
                <b>{p.name}</b>
                <i />
              </span>
              <em>{p.n} ta</em>
            </li>
          ))}
        </ul>
        <p className="rs-bn__alert">
          <span>⚠</span> Quloqchin Koss Porta — 3 ta qoldi
        </p>
      </article>

      {/* 5 — mijozlar */}
      <article className="rs-bn__w rs-bn__w--cli">
        <WHead n="05" title={T.clients.title} text={T.clients.text} />
        <div className="rs-bn__cli">
          <span className="rs-bn__faces" aria-hidden="true">
            {AVATARS.map(([a, c]) => (
              <i key={a} style={{ background: c }}>
                {a}
              </i>
            ))}
          </span>
          <span className="rs-bn__big">
            <b>{fmt(932 + tick)}</b>
            <small>mijoz bazada</small>
          </span>
          <span className="rs-bn__ring" style={{ "--p": 41 } as CSSProperties}>
            <b>41%</b>
            <small>qayta xarid</small>
          </span>
        </div>
      </article>
    </div>
  );
}

function WHead({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <header className="rs-bn__head">
      <span className="rs-bn__n">{n}</span>
      <h3>{title}</h3>
      <p>{text}</p>
      <span className="rs-bn__live" aria-hidden="true">
        ● jonli
      </span>
    </header>
  );
}
