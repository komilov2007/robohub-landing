"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import AdminScreen from "./admin-screen";
import ShopScreen from "./shop-screen";
import { DAY, FIRST_ID, INCOMING, NEXT, SHOP, START_ORDERS, uzs, type Order } from "./demo-data";

// Hero sahnasi — bitta ravon ssenariy:
//   1) telefonda mijoz do'konni aylantiradi, "Sotib olish" → to'lov → "Buyurtma berish";
//   2) buyurtma chipta-karta bo'lib telefondan chiqadi va egri yo'l bo'ylab admin jadvaliga uchib qo'nadi —
//      o'sha zahoti jadvalda yangi qator paydo bo'ladi, qo'ng'iroqcha jiringlaydi, "Yangi" hisoblagichi oshadi;
//   3) admin oynasida kursor kelib "Qabul qilish"ni bosadi — holat "Jarayonda"ga o'tadi.
// Pastda — ssenariy bilan sinxron 3 qadam (tanlaydi → to'laydi → admin qabul qiladi).
// Sahna dizayn o'lchamida chiziladi (yon: 880×760, tor: 420×780) va bitta scale bilan sig'diriladi.
// Uchish va kursor nishonlari DOM'dagi haqiqiy elementlar joyidan hisoblanadi (o'lcham o'zgarsa ham aniq).
const DESIGN = { side: 880, narrow: 420 } as const;
type Mode = keyof typeof DESIGN;

const SCRIPT: [number, string][] = [
  [700, "scroll"],
  [2400, "buy"],
  [3300, "sheet"],
  [4400, "press"],
  [5100, "done"],
  [5600, "fly"],
  [7300, "cursor"],
  [8300, "click"],
  [8550, "accept"],
  [9300, "reset"],
  [10400, "loop"],
];

// trekker qadamlari; ms — qadam davomiyligi (SCRIPT vaqtlariga mos, progress chizig'i uchun)
const STEPS = [
  { title: "Mijoz tanlaydi", text: "Telegram bot yoki saytda", ms: 3300 },
  { title: "To‘laydi", text: "Click, Payme yoki naqd", ms: 2300 },
  { title: "Admin qabul qiladi", text: "Buyurtma darhol panelda", ms: 3700 },
];

const BASE_TOTAL = 128; // "N ta yozuvdan" — NAMUNA
const at = (cycle: number) => {
  const m = 17 * 60 + 46 + cycle * 3;
  return `${DAY}, ${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
};
const CURSOR_HOME = { x: 1500, y: 700 };

export default function HeroDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<{ mode: Mode; k: number } | null>(null);
  const [scene, setScene] = useState(0);
  const [stage, setStage] = useState<number | null>(null); // trekkerdagi faol qadam
  const [cycle, setCycle] = useState(0);
  const [orders, setOrders] = useState<Order[]>(START_ORDERS);
  const [fresh, setFresh] = useState<number | null>(null);
  const [pressed, setPressed] = useState<number | null>(null);
  const [ring, setRing] = useState(false);
  const [cursor, setCursor] = useState({ ...CURSOR_HOME, on: false, down: false });
  const ordersRef = useRef<Order[]>(START_ORDERS);

  // o'lchamga moslash
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const w = e.contentRect.width;
      const mode: Mode = w < 520 ? "narrow" : "side";
      setFit({ mode, k: w / DESIGN[mode] });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ssenariy
  useEffect(() => {
    const box = boxRef.current;
    if (!box || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timers: number[] = [];
    let running = false;
    let landed = false;
    let c = 0;
    let anim: Animation | null = null;

    const commit = (next: Order[]) => {
      ordersRef.current = next;
      setOrders(next);
    };

    // element joyi sahna (dizayn) koordinatalarida
    const local = (el: Element) => {
      const inn = innerRef.current!;
      const ir = inn.getBoundingClientRect();
      const k = ir.width / inn.offsetWidth;
      const r = el.getBoundingClientRect();
      return { x: (r.left - ir.left) / k, y: (r.top - ir.top) / k, w: r.width / k, h: r.height / k };
    };

    const land = () => {
      const inc = INCOMING[c % INCOMING.length];
      const id = FIRST_ID + c;
      const product = SHOP.collection[inc.product];
      // jadval o'lchami o'zgarmaydi: eng eskisi tushib qoladi, qolganlari bir holat oldinga siljiydi
      // (aks holda bir necha aylanishdan keyin hamma qator "Jarayonda" bo'lib qoladi)
      commit([
        { id, client: inc.client, time: at(c), price: product.price, pay: inc.pay, service: "DELIVERY", status: "NEW", platform: "telegram" },
        ...ordersRef.current.slice(0, START_ORDERS.length - 1).map((o) => ({ ...o, status: NEXT[o.status] ?? o.status })),
      ]);
      landed = true;
      setFresh(id);
      setRing(true);
    };

    const fly = () => {
      const inn = innerRef.current;
      const t = ticketRef.current;
      const src = inn?.querySelector(".rs-shop__ok");
      const dst = inn?.querySelector(".rs-adm__tr");
      if (!inn || !t || !src || !dst) return land();
      const a = local(src);
      const b = local(dst);
      const W = 290;
      const H = 66;
      const sx = a.x + a.w / 2 - W / 2;
      const sy = a.y + a.h / 2 - H / 2;
      const ex = b.x + 6;
      const ey = b.y + b.h / 2 - H / 2;
      const mx = (sx + ex) / 2 + 40;
      const my = Math.min(sy, ey) - 70;
      anim = t.animate(
        [
          { transform: `translate(${sx}px,${sy}px) scale(.3)`, opacity: 0 },
          { transform: `translate(${sx}px,${sy - 40}px) scale(1)`, opacity: 1, offset: 0.18 },
          { transform: `translate(${mx}px,${my}px) scale(1.06) rotate(-4deg)`, opacity: 1, offset: 0.58 },
          { transform: `translate(${ex}px,${ey}px) scale(.92) rotate(0deg)`, opacity: 1, offset: 0.92 },
          { transform: `translate(${ex}px,${ey}px) scale(.9)`, opacity: 0 },
        ],
        { duration: 1500, easing: "cubic-bezier(.45,0,.2,1)", fill: "both" },
      );
      timers.push(window.setTimeout(land, 1380));
    };

    // kursor nishoni — yangi qatordagi "Qabul qilish". Admin ichki koordinatalarida (offset zanjiri bo‘yicha —
    // oynaning 3D burilishi va scale’dan qat’i nazar aniq)
    const aim = () => {
      const adm = innerRef.current?.querySelector<HTMLElement>(".rs-adm");
      const btn = adm?.querySelector<HTMLElement>(".rs-adm__tr.is-fresh .rs-adm__act--green");
      if (!adm || !btn) return;
      let x = 0;
      let y = 0;
      let el: HTMLElement | null = btn;
      while (el && el !== adm) {
        x += el.offsetLeft;
        y += el.offsetTop;
        el = el.offsetParent as HTMLElement | null;
      }
      setCursor({ x: x + btn.offsetWidth * 0.55, y: y + btn.offsetHeight * 0.6, on: true, down: false });
    };

    const step = (ev: string) => {
      switch (ev) {
        case "scroll":
          setScene(1);
          break;
        case "buy":
          setScene(2);
          break;
        case "sheet":
          setScene(3);
          setStage(1);
          break;
        case "press":
          setScene(4);
          break;
        case "done":
          setScene(5);
          break;
        case "fly":
          setStage(2);
          fly();
          break;
        case "cursor":
          setRing(false);
          aim();
          break;
        case "click":
          setCursor((cur) => ({ ...cur, down: true }));
          setPressed(FIRST_ID + c);
          break;
        case "accept": {
          const id = FIRST_ID + c;
          commit(ordersRef.current.map((o) => (o.id === id ? { ...o, status: "PROGRESS" } : o)));
          setPressed(null);
          setCursor((cur) => ({ ...cur, down: false }));
          break;
        }
        case "reset":
          setScene(0);
          setStage(null);
          setFresh(null);
          setCursor((cur) => ({ ...cur, ...CURSOR_HOME, on: false }));
          break;
        case "loop":
          c += 1;
          landed = false;
          setCycle(c);
          running = false;
          run();
          break;
      }
    };

    const run = () => {
      if (running) return;
      running = true;
      setStage(0);
      timers = SCRIPT.map(([ms, ev]) => window.setTimeout(() => step(ev), ms));
    };
    const stop = () => {
      if (!running) return;
      timers.forEach(clearTimeout);
      timers = [];
      anim?.cancel();
      running = false;
      // aylanish o'rtasida to'xtasa — keyingi safar toza boshlanadi (takror buyurtma raqami bo'lmaydi)
      if (landed) {
        c += 1;
        landed = false;
        setCycle(c);
      }
      setScene(0);
      setStage(null);
      setFresh(null);
      setPressed(null);
      setRing(false);
      setCursor({ ...CURSOR_HOME, on: false, down: false });
    };

    let visible = false;
    const sync = () => (visible && !document.hidden ? run() : stop());
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    });
    io.observe(box);
    document.addEventListener("visibilitychange", sync);
    return () => {
      timers.forEach(clearTimeout);
      anim?.cancel();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  const inc = INCOMING[cycle % INCOMING.length];
  const product = SHOP.collection[inc.product];
  const orderId = FIRST_ID + cycle;

  return (
    <div
      className="rs-show"
      ref={boxRef}
      data-mode={fit?.mode}
      role="img"
      aria-label="Mijoz do‘konda mahsulot tanlab to‘laydi, buyurtma shu zahoti admin paneldagi buyurtmalar ro‘yxatiga tushadi va xodim uni qabul qiladi"
    >
      <div className="rs-show__in" ref={innerRef} aria-hidden="true" style={fit ? { transform: `scale(${fit.k})` } : undefined}>
        {/* brend rangidagi sahna-panel: oyna yuqori chetidan chiqib turadi, telefon chap-pastdan osilib turadi */}
        <div className="rs-stage" />

        {/* admin — brauzer oynasida */}
        <div className="rs-win">
          <div className="rs-win__bar">
            <span className="rs-win__dots">
              <i />
              <i />
              <i />
            </span>
            <span className="rs-win__url">
              <i>🔒</i> admin.robosell.uz/orders
            </span>
          </div>
          <div className="rs-win__view">
            <AdminScreen
              orders={orders}
              fresh={fresh}
              pressed={pressed}
              ring={ring}
              total={BASE_TOTAL + orders[0].id - START_ORDERS[0].id}
            >
              <span
                className={"rs-cursor" + (cursor.on ? " is-on" : "") + (cursor.down ? " is-down" : "")}
                style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
              >
                <svg viewBox="0 0 24 24" width="40" height="40">
                  <path d="M4 2 L4 19 L8.6 14.8 L11.6 21.6 L14.6 20.3 L11.7 13.6 L18 13.6 Z" fill="#000211" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
              </span>
            </AdminScreen>
          </div>
        </div>

        {/* telefon — do'kon */}
        <div className="rs-ph">
          <div className="rs-ph__screen">
            <ShopScreen scene={scene} pick={inc.product} orderId={orderId} pay={inc.pay} />
          </div>
        </div>

        {/* ssenariy qadamlari (.rs-flow) — faol qadamda progress chizig'i to'ladi */}
        <ol className="rs-flow">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className={stage === i ? "is-on" : stage !== null && i < stage ? "is-done" : undefined}
              style={{ "--d": `${s.ms}ms` } as CSSProperties}
            >
              <span className="rs-flow__n">{i + 1}</span>
              <b>{s.title}</b>
              <small>{s.text}</small>
              <i className="rs-flow__bar" key={stage === i ? cycle : "idle"} />
            </li>
          ))}
        </ol>

        {/* uchadigan buyurtma */}
        <div className="rs-ticket" ref={ticketRef}>
          <img src={product.img} alt="" />
          <span>
            <b>Yangi buyurtma #{orderId}</b>
            <small>
              {uzs(product.price)} · {inc.pay}
            </small>
          </span>
          <i className="rs-ticket__ok">✓</i>
        </div>
      </div>
    </div>
  );
}
