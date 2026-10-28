"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type TouchEvent,
  type WheelEvent,
} from "react";
import { createPortal, flushSync } from "react-dom";
import { RobohubMark } from "@/components/robohub-404/logo";
import { idle } from "@/lib/idle";
import { fontClass } from "../../fonts";

type Lang = "uz" | "ru";
type Reel = { id: string; name?: string; lang: Lang; wide?: boolean };
type Texts = {
  title: string;
  open: string;
  close: string;
  prev: string;
  next: string;
  cta: string;
  client: string;
  drag: string;
  hide: string;
  langs: Record<Lang, string>;
};
type Corner = "tl" | "tr" | "bl" | "br";

// Burchakdagi kartochka: brauzer bo'shagach paydo bo'ladi (LCP'ga ta'sir qilmaydi), video ovozsiz o'ynaydi
// va har ROTATE ms da keyingisiga almashadi (tepadagi chiziqlar — "stories" kabi). Kartochkani sudrab istalgan
// burchakka qo'yish mumkin: qo'yib yuborilganda eng yaqin burchakka yopishadi, tanlov localStorage'da eslab qolinadi.
// Bosilganda — to'liq ekran pleyer: ovoz bilan; kompyuterda video o'ng yonida panel (sarlavha, mijozlar ro'yxati,
// ↑/↓, CTA); ↑/↓, klaviatura strelkalari, g'ildirak va telefonda surish bilan almashadi, video tugasa — keyingisi.
// Kamroq harakat tanlangan bo'lsa (prefers-reduced-motion) burchakda video emas, faqat muqova.
const ROTATE = 12000;
const CORNER_KEY = "rb-reels-corner";
const HIDE_KEY = "rb-reels-hidden"; // × bosilsa — shu seans (tab yopilguncha) qaytib chiqmaydi
// Sahifadagi boshqa joydan (sharhlar bo'limidagi video kartalar) to'liq ekran pleyerni ochish:
// window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: index })) — burchakdagi kartochka yopilgan bo'lsa ham ishlaydi
export const OPEN_EVENT = "rb-reels:open";
const CORNERS: readonly Corner[] = ["tl", "tr", "bl", "br"];
const ORIGIN = "https://www.youtube-nocookie.com";

const base = (id: string) => `${ORIGIN}/embed/${id}?playsinline=1&rel=0&modestbranding=1&iv_load_policy=3`;
// burchakdagi kichik pleyer: ovozsiz, boshqaruvsiz, aylanib o'ynaydi. JS API — o'ynay boshlaganini bilish uchun:
// shungacha ustida muqova turadi (YouTube yuklanayotgandagi sarlavha va play tugmasi ko'rinmaydi)
const previewSrc = (id: string) =>
  `${base(id)}&autoplay=1&mute=1&controls=0&disablekb=1&fs=0&loop=1&playlist=${id}&enablejsapi=1`;
// to'liq ekran: ovoz bilan (bosish — foydalanuvchi harakati, brauzer ruxsat beradi), video tugaganini bilish uchun JS API
const fullSrc = (id: string) => `${base(id)}&autoplay=1&controls=1&enablejsapi=1`;
// Shorts'ning vertikal muqovasi; oddiy (gorizontal) videoda — odatiy muqova
const poster = (id: string, wide?: boolean) => `https://i.ytimg.com/vi/${id}/${wide ? "hqdefault" : "oar2"}.jpg`;

// video tili: bayroq + yozuv ("Oʻzbek tilida")
const LangTag = ({ lang, label }: { lang: Lang; label: string }) => (
  <em className="reels-lang">
    <img src={`/flags/${lang}.svg`} alt="" width="14" height="14" />
    {label}
  </em>
);

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={d} />
  </svg>
);

export default function ReelsClient({ t, reels }: { t: Texts; reels: Reel[] }) {
  const [ready, setReady] = useState(false);
  const [still, setStill] = useState(false); // reduced motion — video o'rniga muqova
  const [corner, setCorner] = useState<Corner>("br");
  const [index, setIndex] = useState(0);
  const [full, setFull] = useState<number | null>(null);
  const [dir, setDir] = useState<1 | -1>(1); // almashish yo'nalishi — animatsiya uchun
  const [hiddenTab, setHiddenTab] = useState(false);
  const [liveId, setLiveId] = useState<string | null>(null); // burchakda haqiqatan o'ynayotgan video
  const [hidden, setHidden] = useState(false); // × bilan yopilgan
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const previewRef = useRef<HTMLIFrameElement>(null);
  const drag = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const dragged = useRef(false); // sudralgan bo'lsa — keyingi "click" ochmaydi
  const touchY = useRef<number | null>(null);
  const touchX = useRef(0);
  const wheelAt = useRef(0);
  const count = reels.length;

  useEffect(() => {
    let off = false;
    idle(3000).then(() => {
      if (off) return;
      try {
        const saved = localStorage.getItem(CORNER_KEY) as Corner | null;
        if (saved && CORNERS.includes(saved)) setCorner(saved);
        if (sessionStorage.getItem(HIDE_KEY)) setHidden(true);
      } catch {}
      setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      setReady(true);
    });
    const onVis = () => setHiddenTab(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      off = true;
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // Burchakda almashish (to'liq ekran ochiq yoki tab ko'rinmayotgan paytda — to'xtaydi)
  useEffect(() => {
    if (!ready || full !== null || hiddenTab || count < 2) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % count), ROTATE);
    return () => window.clearTimeout(id);
  }, [ready, full, hiddenTab, index, count]);

  // To'liq ekran: sahifa aylanmaydi, fokus — "Yopish"ga; yopilganda fokus kartochkaga qaytadi
  const isOpen = full !== null;
  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      root.style.overflow = prev;
    };
  }, [isOpen]);

  // YouTube iframe API xabarlari (tashqi skriptsiz): burchakdagi video o'ynay boshladi (1) — muqova olinadi;
  // to'liq ekrandagi video tugadi (0) — keyingisi
  useEffect(() => {
    if (!ready) return;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== ORIGIN || typeof e.data !== "string") return;
      let state: number | undefined;
      try {
        const data = JSON.parse(e.data) as { event?: string; info?: number | { playerState?: number } };
        if (data.event !== "onStateChange" && data.event !== "infoDelivery") return;
        state = typeof data.info === "number" ? data.info : data.info?.playerState;
      } catch {
        return;
      }
      const preview = previewRef.current;
      if (preview && e.source === preview.contentWindow && state === 1) setLiveId(preview.dataset.id ?? null);
      else if (e.source === frameRef.current?.contentWindow && state === 0) {
        setDir(1);
        setFull((f) => (f !== null && f < count - 1 ? f + 1 : f));
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [ready, count]);

  // sahifadan ochish so'rovi (sharhlar bo'limi)
  useEffect(() => {
    const onOpen = (e: Event) => {
      const i = (e as CustomEvent<number>).detail;
      if (typeof i !== "number" || i < 0 || i >= count) return;
      setReady(true);
      setDir(1);
      setFull(i);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, [count]);

  if (count === 0 || (!ready && full === null)) return null;
  const showCorner = ready && !hidden; // × bilan yopilgan bo'lsa — faqat to'liq ekran pleyer (sahifadan ochilganda)

  const reel = reels[index];
  const open = () => {
    if (dragged.current) {
      dragged.current = false;
      return;
    }
    setDir(1);
    setFull(index);
  };
  const close = () => {
    if (full !== null) setIndex(full);
    setFull(null);
    requestAnimationFrame(() => cardRef.current?.focus());
  };
  const hide = () => {
    try {
      sessionStorage.setItem(HIDE_KEY, "1");
    } catch {}
    setHidden(true);
  };
  const go = (i: number) => {
    setDir(full !== null && i < full ? -1 : 1);
    setFull(i);
  };
  const step = (d: 1 | -1) => {
    setDir(d);
    setFull((f) => (f === null ? f : (f + d + count) % count));
  };

  // ---- sudrash: kartochka barmoq/sichqoncha ortidan yuradi, qo'yilganda eng yaqin burchakka silliq yopishadi ----
  const onPointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
    drag.current = { x: e.clientX, y: e.clientY, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    const wrap = wrapRef.current;
    if (!d || !wrap) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.moved && Math.hypot(dx, dy) < 6) return; // oddiy bosish — sudrash emas
    d.moved = true;
    wrap.classList.add("is-drag");
    wrap.style.transform = `translate(${dx}px, ${dy}px)`;
  };
  const onPointerUp = () => {
    const d = drag.current;
    const wrap = wrapRef.current;
    drag.current = null;
    if (!d?.moved || !wrap) return;
    dragged.current = true;
    const first = wrap.getBoundingClientRect();
    const cx = first.left + first.width / 2;
    const cy = first.top + first.height / 2;
    const next = `${cy < window.innerHeight / 2 ? "t" : "b"}${cx < window.innerWidth / 2 ? "l" : "r"}` as Corner;
    try {
      localStorage.setItem(CORNER_KEY, next);
    } catch {}
    // FLIP: yangi burchakni darhol qo'llab, eski joydan unga silliq o'tkazamiz
    flushSync(() => setCorner(next));
    wrap.style.transform = "";
    const last = wrap.getBoundingClientRect();
    wrap.style.transform = `translate(${first.left - last.left}px, ${first.top - last.top}px)`;
    void wrap.offsetWidth;
    wrap.classList.remove("is-drag");
    wrap.style.transform = "";
  };

  // iframe yuklangach — YouTube'ga holat xabarlarini yuborishni so'raymiz
  const listen = (frame: HTMLIFrameElement | null) =>
    frame?.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: 1, channel: "widget" }), ORIGIN);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown" || e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") step(-1);
    else return;
    e.preventDefault();
  };
  // sichqoncha g'ildiragi (video tashqarisida) — bitta aylantirish = bitta video
  const onWheel = (e: WheelEvent) => {
    if (Math.abs(e.deltaY) < 20 || e.timeStamp - wheelAt.current < 700) return;
    wheelAt.current = e.timeStamp;
    step(e.deltaY > 0 ? 1 : -1);
  };
  // telefonda video atrofidagi joyni yuqoriga/pastga surish — keyingi/oldingi (reels kabi)
  // surish: yuqoriga/chapga — keyingi, pastga/o'ngga — oldingi (telefonda stories kabi; video ustida — chetdagi bosish joylari orqali)
  const onTouchStart = (e: TouchEvent) => {
    touchY.current = e.touches[0].clientY;
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchY.current === null) return;
    const dy = e.changedTouches[0].clientY - touchY.current;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchY.current = null;
    if (Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) > 50 : Math.abs(dy) > 50) step((Math.abs(dx) > Math.abs(dy) ? dx : dy) < 0 ? 1 : -1);
  };

  const current = full === null ? null : reels[full];

  return (
    <>
      {showCorner && (
      <div ref={wrapRef} className="reels is-on" data-corner={corner} style={{ "--rotate": `${ROTATE}ms` } as CSSProperties}>
        <button
          ref={cardRef}
          type="button"
          className="reels__card"
          onClick={open}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          aria-label={`${t.open}: ${t.title}`}
          title={t.drag}
        >
          <img className="reels__poster" src={poster(reel.id, reel.wide)} alt="" draggable={false} />
          {!still && full === null && (
            <iframe
              ref={previewRef}
              key={reel.id}
              data-id={reel.id}
              className={`reels__frame${liveId === reel.id ? " is-live" : ""}`}
              src={previewSrc(reel.id)}
              onLoad={() => listen(previewRef.current)}
              title={reel.name ?? t.client}
              allow="autoplay; encrypted-media; picture-in-picture"
              tabIndex={-1}
              aria-hidden="true"
            />
          )}
          <span className="reels__bars" aria-hidden="true">
            {reels.map((r, i) => (
              <i key={r.id} className={i < index ? "is-done" : i === index ? "is-on" : undefined}>
                {i === index && <b key={`${index}-${full === null && !hiddenTab}`} data-run={full === null && !hiddenTab ? "" : undefined} />}
              </i>
            ))}
          </span>
          <span className="reels__play" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
          <span className="reels__cap">
            <b>{t.title}</b>
            <small>{reel.name ?? t.client}</small>
          </span>
        </button>
        {/* yopish: kartochkadan tashqarida (tugma ichida tugma bo'lmaydi), o'ng tepa burchakda */}
        <button type="button" className="reels__hide" onClick={hide} aria-label={t.hide} title={t.hide}>
          <Icon d="M7 7l10 10M17 7L7 17" />
        </button>
      </div>
      )}

      {current &&
        createPortal(
          <div
            className={`reels-full ${fontClass}`}
            role="dialog"
            aria-modal="true"
            aria-label={t.title}
            onKeyDown={onKey}
            onWheel={onWheel}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            {/* telefonda: tepada stories chiziqlari — har video bitta bo'lak, ko'rilganlari to'lgan */}
            {count > 1 && (
              <span className="reels-full__stories" aria-hidden="true">
                {reels.map((r, i) => (
                  <i key={r.id} className={i < full! ? "is-done" : i === full ? "is-on" : undefined} />
                ))}
              </span>
            )}
            {/* orqa fon — joriy videoning xira muqovasi */}
            <img key={`bg-${current.id}`} className="reels-full__bg" src={poster(current.id, current.wide)} alt="" aria-hidden="true" />

            <div className="reels-full__wrap">
              <div className="reels-full__stage" key={current.id} data-dir={dir}>
                <img className="reels-full__poster" src={poster(current.id, current.wide)} alt="" />
                <iframe
                  ref={frameRef}
                  className="reels-full__frame"
                  src={fullSrc(current.id)}
                  title={`${t.title} — ${current.name ?? t.client}`}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  // yuklanguncha muqova ko'rinadi (iframe'ning qora foni uni yopmasin)
                  onLoad={(e) => {
                    e.currentTarget.classList.add("is-ready");
                    listen(frameRef.current);
                  }}
                />
                {/* telefonda: video chetlarini bosish — oldingi / keyingi (stories kabi); o'rtasi YouTube boshqaruvlari uchun ochiq */}
                {count > 1 && (
                  <>
                    <button type="button" className="reels-full__tap reels-full__tap--prev" onClick={() => step(-1)} aria-label={t.prev} />
                    <button type="button" className="reels-full__tap reels-full__tap--next" onClick={() => step(1)} aria-label={t.next} />
                  </>
                )}
              </div>

              {/* o'ng panel (telefonda — tepadagi qator): sarlavha, mijozlar, ↑/↓, CTA */}
              <aside className="reels-full__side">
                <div className="reels-full__head">
                  <span className="reels-full__avatar" aria-hidden="true">
                    <RobohubMark />
                  </span>
                  <span className="reels-full__title">
                    <b>{t.title}</b>
                    <small>
                      {current.name ?? t.client} · {t.langs[current.lang]} · {full! + 1}/{count}
                    </small>
                  </span>
                </div>

                <ol className="reels-full__list">
                  {reels.map((r, i) => (
                    <li key={r.id}>
                      <button type="button" className={i === full ? "is-on" : undefined} aria-current={i === full || undefined} onClick={() => go(i)}>
                        <img src={poster(r.id, r.wide)} alt="" />
                        <span>
                          <b>{r.name ?? t.client}</b>
                          {/* ikkinchi qator — video tili (sarlavhada "Robohub mijozlari" bor, takrorlanmaydi) */}
                          <small>
                            <LangTag lang={r.lang} label={t.langs[r.lang]} />
                          </small>
                        </span>
                        {i === full && (
                          <i className="reels-full__eq" aria-hidden="true">
                            <s />
                            <s />
                            <s />
                          </i>
                        )}
                      </button>
                    </li>
                  ))}
                </ol>

                {count > 1 && (
                  <div className="reels-full__nav">
                    <button type="button" className="reels-full__btn" onClick={() => step(-1)} aria-label={t.prev}>
                      <Icon d="M6 15l6-6 6 6" />
                    </button>
                    <button type="button" className="reels-full__btn" onClick={() => step(1)} aria-label={t.next}>
                      <Icon d="M6 9l6 6 6-6" />
                    </button>
                  </div>
                )}

                <a className="reels-full__cta" href="#start" onClick={close}>
                  {t.cta} <span aria-hidden="true">→</span>
                </a>
              </aside>
            </div>

            <button ref={closeRef} type="button" className="reels-full__btn reels-full__close" onClick={close} aria-label={t.close}>
              <Icon d="M6 6l12 12M18 6 6 18" />
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}
