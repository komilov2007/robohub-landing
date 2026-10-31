"use client";

import { imgSize } from "@/lib/img-size";
import { useEffect, useRef, useState } from "react";
import { idle } from "@/lib/idle";
// Chegaralar (~70 KB) alohida chunk: brauzer bo'sh qolganda import() bilan yuklanadi — birinchi ekran JS iga kirmaydi
type GeoData = typeof import("./globe-data");

// Yer shari: haqiqiy chegaralar bilan chizilgan, to'liq ko'rinadigan globus. Robohub ishlaydigan besh
// mamlakat o'z shakli va o'z joyida yashil bilan bo'yalgan; navbat bilan bittasi yonadi va globus sekin
// o'sha tomonga buriladi. Sichqoncha bilan tortib aylantirsa ham bo'ladi.
// Nomlar — market.i18n.ts da; server ota komponent (market.tsx) `names` prop orqali uzatadi.
// Tartib chapdagi ro'yxat (regions.tsx) bilan bir xil: navbat va pastdagi tugmalar shu tartibda.
// lon/lat — yorliq bog'lanadigan nuqta (mamlakat ichida); side — yorliq nuqtaning qaysi tomonida turishi.
const COUNTRIES = [
  { id: "uz", lon: 63.5, lat: 41.6, side: "left" },
  { id: "kz", lon: 67.5, lat: 48.4, side: "right" },
  { id: "kg", lon: 74.8, lat: 41.4, side: "right" },
  { id: "ru", lon: 60, lat: 60.5, side: "top" },
  { id: "tj", lon: 71, lat: 38.6, side: "bottom" },
] as const;

export type CountryId = (typeof COUNTRIES)[number]["id"];
// telefondagi kartochka uchun: har mamlakatning marketpleyslari (market.tsx tayyorlaydi — regions-data.ts dan)
type GlobeMp = { name: string; logo: string; wide: boolean; alt: string };
export type GlobeMps = Record<CountryId, { now: GlobeMp[]; soon: GlobeMp[] }>;

const BASE = { lon: 68, lat: 40 };   // globus shu nuqtaga qarab turadi
const HOLD = 3000;                    // har mamlakat shuncha vaqt yonib turadi (ms)
const RAD = Math.PI / 180;

export default function Globe({ names, mps, soon }: { names: Record<CountryId, string>; mps?: GlobeMps; soon?: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pinRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const pausedUntil = useRef(0);
  // tugma yoki shar ustidagi bosish: shu mamlakat yonadi, avtomatik navbat 7 s to'xtaydi, globus unga buriladi
  const pick = (i: number, at: number) => {
    pausedUntil.current = at + 7000;
    setActive(i);
    requestAnimationFrame(() => stageRef.current?.dispatchEvent(new Event("globe:pick")));
  };

  // faol mamlakat bo'limga yoziladi (data-active) — chapdagi ro'yxat (regions.tsx) o'sha qatorni yoritadi
  useEffect(() => {
    activeRef.current = active;
    stageRef.current?.closest("section")?.setAttribute("data-active", COUNTRIES[active].id);
  }, [active]);

  // chapdagi ro'yxatda mamlakat qatori bosilsa — globus o'sha mamlakatga buriladi
  useEffect(() => {
    const sec = stageRef.current?.closest("section");
    if (!sec) return;
    const onClick = (e: MouseEvent) => {
      const row = (e.target as HTMLElement).closest<HTMLElement>(".reg__row[data-c]");
      const i = row ? COUNTRIES.findIndex((c) => c.id === row.dataset.c) : -1;
      if (i >= 0) pick(i, e.timeStamp);
    };
    sec.addEventListener("click", onClick);
    return () => sec.removeEventListener("click", onClick);
  });

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!stage || !canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = false;
    let lon0: number = BASE.lon;
    let lat0: number = BASE.lat;
    let userLon = 0; // foydalanuvchi tortib bergan qo'shimcha burilish
    let userLat = 0;
    let drag: { x: number; y: number; lon: number; lat: number } | null = null;
    let lastSwitch = 0;
    let geo: GeoData | null = null;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = stage.clientWidth;
      h = stage.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // ortografik proyeksiya: [x, y, z] — z > 0 bo'lsa nuqta biz tomonda
    let sinP0 = 0;
    let cosP0 = 1;
    const project = (lon: number, lat: number, R: number, cx: number, cy: number): [number, number, number] => {
      const l = (lon - lon0) * RAD;
      const p = lat * RAD;
      const cosP = Math.cos(p);
      const sinP = Math.sin(p);
      const cosL = Math.cos(l);
      return [cx + R * cosP * Math.sin(l), cy - R * (cosP0 * sinP - sinP0 * cosP * cosL), sinP0 * sinP + cosP0 * cosP * cosL];
    };

    // halqani chizish: orqa tomondagi nuqtalar shar chetiga (ufqqa) suriladi — shakl chetda toza kesiladi
    const trace = (ring: number[], R: number, cx: number, cy: number) => {
      let any = false;
      for (let i = 0; i < ring.length; i += 2) {
        const pt = project(ring[i] / 10, ring[i + 1] / 10, R, cx, cy);
        let x = pt[0];
        let y = pt[1];
        if (pt[2] < 0) {
          const dx = x - cx;
          const dy = y - cy;
          const len = Math.hypot(dx, dy) || 1;
          x = cx + (dx / len) * R;
          y = cy + (dy / len) * R;
        } else any = true;
        if (i) ctx.lineTo(x, y);
        else ctx.moveTo(x, y);
      }
      ctx.closePath();
      return any;
    };

    // meridian yoki parallel chizig'i: faqat ko'rinadigan qismi
    const gridLine = (pts: [number, number][], R: number, cx: number, cy: number) => {
      ctx.beginPath();
      let pen = false;
      for (const [lon, lat] of pts) {
        const [x, y, z] = project(lon, lat, R, cx, cy);
        if (z < 0) {
          pen = false;
          continue;
        }
        if (pen) ctx.lineTo(x, y);
        else ctx.moveTo(x, y);
        pen = true;
      }
      ctx.stroke();
    };

    const draw = (now: number) => {
      if (!geo) return; // chegaralar hali yuklanmagan
      const { LAND, TARGETS } = geo;
      const R = Math.min(w, h) / 2 - 10; // shar to'liq ko'rinadi
      if (R <= 0) return; // karta yashirin (telefonda display:none) — o'lchami 0, chiziladigan narsa yo'q
      const cx = w / 2;
      const cy = h / 2;
      const cur = COUNTRIES[activeRef.current];

      // globus sekin faol mamlakat tomonga buriladi (to'liq emas — butun mintaqa doim ko'rinib turadi)
      const tLon = BASE.lon + (cur.lon - BASE.lon) * 0.4 + userLon;
      const tLat = Math.max(-10, Math.min(70, BASE.lat + (cur.lat - BASE.lat) * 0.3 + userLat));
      const k = reduced.matches || drag ? 1 : 0.028;
      lon0 += (tLon - lon0) * k;
      lat0 += (tLat - lat0) * k;
      sinP0 = Math.sin(lat0 * RAD);
      cosP0 = Math.cos(lat0 * RAD);

      ctx.clearRect(0, 0, w, h);

      // atmosfera: shar atrofidagi yumshoq halqa
      const halo = ctx.createRadialGradient(cx, cy, R * 0.94, cx, cy, R + 10);
      halo.addColorStop(0, "rgba(184,255,176,.28)");
      halo.addColorStop(1, "rgba(184,255,176,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, R + 10, 0, Math.PI * 2);
      ctx.fill();

      // okean
      const sea = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.45, R * 0.05, cx, cy, R);
      sea.addColorStop(0, "#FFFFFF");
      sea.addColorStop(0.6, "#EEF5F1");
      sea.addColorStop(1, "#D5E5DD");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = sea;
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      // meridian va parallellar: globus ekani bilinib turadi
      ctx.strokeStyle = "rgba(0,82,79,.07)";
      ctx.lineWidth = 1;
      for (let lon = -180; lon < 180; lon += 20) {
        const pts: [number, number][] = [];
        for (let lat = -90; lat <= 90; lat += 5) pts.push([lon, lat]);
        gridLine(pts, R, cx, cy);
      }
      for (let lat = -60; lat <= 80; lat += 20) {
        const pts: [number, number][] = [];
        for (let lon = -180; lon <= 180; lon += 5) pts.push([lon, lat]);
        gridLine(pts, R, cx, cy);
      }

      // boshqa quruqlik
      ctx.fillStyle = "#C2D5CC";
      ctx.strokeStyle = "#D9E6E0";
      ctx.lineWidth = 0.8;
      ctx.lineJoin = "round";
      for (const ring of LAND) {
        ctx.beginPath();
        if (trace(ring, R, cx, cy)) {
          ctx.fill();
          ctx.stroke();
        }
      }

      // besh mamlakat: o'z shakli bilan; faol mamlakat to'qroq va "nafas oladi"
      const pulse = reduced.matches ? 1 : 0.5 + 0.5 * Math.sin(now / 450);
      for (const c of COUNTRIES) {
        if (c.id === cur.id) continue;
        ctx.fillStyle = "#4E9483";
        ctx.strokeStyle = "rgba(255,255,255,.75)";
        ctx.lineWidth = 0.9;
        for (const ring of TARGETS[c.id]) {
          ctx.beginPath();
          if (trace(ring, R, cx, cy)) {
            ctx.fill();
            ctx.stroke();
          }
        }
      }
      ctx.save();
      ctx.shadowColor = "rgba(0,82,79,.55)";
      ctx.shadowBlur = 10 + 10 * pulse;
      ctx.fillStyle = "#00524F";
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1.2;
      for (const ring of TARGETS[cur.id]) {
        ctx.beginPath();
        if (trace(ring, R, cx, cy)) {
          ctx.fill();
          ctx.stroke();
        }
      }
      ctx.restore();

      // chetga qarab qorayish: sharning hajmi
      const shade = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.4, R * 0.2, cx, cy, R);
      shade.addColorStop(0, "rgba(255,255,255,.14)");
      shade.addColorStop(0.7, "rgba(0,54,52,0)");
      shade.addColorStop(1, "rgba(0,54,52,.2)");
      ctx.fillStyle = shade;
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
      ctx.restore();

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,.35)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // yorliqlar: HTML elementlar, joyi har kadrda proyeksiyadan olinadi (aynan mamlakat ustida)
      COUNTRIES.forEach((c, i) => {
        const el = pinRefs.current[i];
        if (!el) return;
        const [x, y, z] = project(c.lon, c.lat, R, cx, cy);
        el.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`;
        el.style.opacity = z > 0.15 ? "1" : "0";
      });
    };

    const tick = (now: number) => {
      raf = 0;
      if (!lastSwitch) lastSwitch = now;
      // navbat bilan almashish (foydalanuvchi tanlagan yoki aylantirgan bo'lsa — biroz kutadi)
      if (!reduced.matches && !drag && now > pausedUntil.current && now - lastSwitch > HOLD) {
        lastSwitch = now;
        setActive((a) => (a + 1) % COUNTRIES.length);
      }
      draw(now);
      if (visible && !reduced.matches) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    // sichqoncha / barmoq bilan aylantirish
    const onDown = (e: PointerEvent) => {
      drag = { x: e.clientX, y: e.clientY, lon: userLon, lat: userLat };
      stage.setPointerCapture(e.pointerId);
      stage.classList.add("is-drag");
    };
    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      const R = Math.min(w, h) / 2 - 10;
      userLon = drag.lon - ((e.clientX - drag.x) / R) * 60;
      userLat = drag.lat + ((e.clientY - drag.y) / R) * 60;
      kick();
    };
    const onUp = (e: PointerEvent) => {
      if (!drag) return;
      drag = null;
      stage.classList.remove("is-drag");
      pausedUntil.current = e.timeStamp + 6000;
      lastSwitch = e.timeStamp;
    };
    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", onUp);

    const ro = new ResizeObserver(() => {
      resize();
      kick();
    });
    ro.observe(stage);
    // ekrandan tashqarida chizilmaydi
    const io = new IntersectionObserver((es) => {
      visible = es[0].isIntersecting;
      if (visible) {
        lastSwitch = 0;
        kick();
      }
    });
    io.observe(stage);
    // tugma bosilganda: qo'lda burilgan burchak tashlanadi, globus tanlangan mamlakatga qaytadi
    const onPick = () => {
      userLon = 0;
      userLat = 0;
      lastSwitch = 0;
      kick();
    };
    stage.addEventListener("globe:pick", onPick);
    let alive = true;
    idle().then(() => import("./globe-data")).then((m) => {
      if (!alive) return;
      geo = m;
      kick();
    });
    // o'lcham ResizeObserver'ning birinchi chaqiruvida olinadi (layout tayyor bo'lganda) —
    // effekt ichida clientWidth o'qish majburiy reflow berardi
    kick();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointercancel", onUp);
      stage.removeEventListener("globe:pick", onPick);
    };
  }, []);

  // at — bosish vaqti (hodisaning timeStamp'i, performance.now() bilan bir xil soat)

  return (
    <div className="globe">
      <div className="globe__stage" ref={stageRef} aria-hidden="true">
        <canvas ref={canvasRef} />
        {COUNTRIES.map((c, i) => (
          <span
            key={c.id}
            className={`globe__pin globe__pin--${c.side}` + (i === active ? " is-on" : "")}
            ref={(el) => {
              pinRefs.current[i] = el;
            }}
          >
            <i />
            <b>
              <img src={`/flags/${c.id}.svg`} alt="" width="14" height="14" loading="lazy" />
              {names[c.id]}
            </b>
            {/* telefonda: faol mamlakat nomi ostida — shu yerdagi marketpleyslar kartochkasi (robohub.css → .globe__card) */}
            {mps && (
              <span className="globe__card">
                <span className="globe__mps">
                  {mps[c.id].now.map((m) => (
                    <img loading="lazy" decoding="async" key={m.name} src={m.logo} {...imgSize(m.logo)} alt={m.alt} title={m.name} className={m.wide ? "is-wide" : undefined} />
                  ))}
                </span>
                {mps[c.id].soon.length > 0 && (
                  <span className="globe__soon">
                    <em>{soon}</em>
                    {mps[c.id].soon.map((m) => (
                      <img loading="lazy" decoding="async" key={m.name} src={m.logo} {...imgSize(m.logo)} alt={m.alt} title={m.name} className={m.wide ? "is-wide" : undefined} />
                    ))}
                  </span>
                )}
              </span>
            )}
          </span>
        ))}
      </div>
      <ul className="globe__list">
        {COUNTRIES.map((c, i) => (
          <li key={c.id}>
            <button type="button" className={i === active ? "is-on" : undefined} aria-pressed={i === active} onClick={(e) => pick(i, e.timeStamp)}>
              <img loading="lazy" decoding="async" src={`/flags/${c.id}.svg`} alt="" width="16" height="16" />
              {names[c.id]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
