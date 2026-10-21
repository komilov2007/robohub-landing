"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import Icon, { ICONS } from "../svg-icon/svg-icon";
import { useAcademyLocale } from "../locale/locale";
import { messages } from "./swiper.i18n";

// Yengil swiper (kutubxonasiz): gorizontal scroll-snap lenta, chap/o'ng strelkalar (bir sahifaga suradi),
// sichqoncha bilan sudrab surish (sensorli ekranda — brauzerning o'z scroll'i), chetlarda yumshoq so'nish.
// Strelka va so'nish faqat o'sha tomonga surish mumkin bo'lsa ko'rinadi. children — <li> elementlar.
export default function Swiper({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  const t = messages[useAcademyLocale()];
  const trackRef = useRef<HTMLUListElement>(null);
  const drag = useRef({ x: 0, left: 0, moved: false, active: false });
  const [edges, setEdges] = useState({ prev: false, next: false });
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = track.scrollWidth - track.clientWidth;
        setEdges({ prev: track.scrollLeft > 4, next: track.scrollLeft < max - 4 });
      });
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(track);
    // joriy element (aria-current) boshida ko'rinib tursin
    const cur = track.querySelector<HTMLElement>("[aria-current]");
    if (cur) track.scrollLeft = Math.max(0, cur.closest("li")!.offsetLeft - track.offsetLeft - 8);
    return () => {
      track.removeEventListener("scroll", update);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const track = trackRef.current;
    const item = track?.firstElementChild as HTMLElement | null;
    if (!track || !item) return;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0");
    const per = Math.max(1, Math.floor(track.clientWidth / (item.offsetWidth + gap)));
    track.scrollBy({ left: dir * per * (item.offsetWidth + gap), behavior: "smooth" });
  };

  const onPointerDown = (e: PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { x: e.clientX, left: trackRef.current!.scrollLeft, moved: false, active: true };
  };
  const onPointerMove = (e: PointerEvent<HTMLUListElement>) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      setDragging(true);
      trackRef.current!.setPointerCapture(e.pointerId);
    }
    if (d.moved) trackRef.current!.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    drag.current.active = false;
    setDragging(false);
  };

  return (
    <div className={`acx-swiper${edges.prev ? " has-prev" : ""}${edges.next ? " has-next" : ""}`}>
      <ul
        ref={trackRef}
        className={`acx-swiper__track${dragging ? " is-dragging" : ""}${className ? ` ${className}` : ""}`}
        aria-label={label}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        // surilganda ichidagi havola bosilib ketmasin
        onClickCapture={(e) => {
          if (drag.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
        onDragStart={(e) => e.preventDefault()}
      >
        {children}
      </ul>
      <button type="button" className="acx-swiper__arrow acx-swiper__arrow--prev" aria-label={t.prev} tabIndex={edges.prev ? 0 : -1} onClick={() => step(-1)}>
        <Icon d={ICONS.chevronLeft} size={20} />
      </button>
      <button type="button" className="acx-swiper__arrow acx-swiper__arrow--next" aria-label={t.next} tabIndex={edges.next ? 0 : -1} onClick={() => step(1)}>
        <Icon d={ICONS.chevronRight} size={20} />
      </button>
    </div>
  );
}
