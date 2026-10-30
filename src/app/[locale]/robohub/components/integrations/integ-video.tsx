"use client";

import { useEffect, useRef } from "react";
import type { messages } from "./integrations.i18n";

type T = (typeof messages)["uz"]["video"];

// Bitta kartochka Robohub orqali barcha marketpleyslarga tarqalishini ko'rsatadigan video.
// Faqat ekranda ko'ringanda o'ynaydi; "harakatni kamaytirish" yoqilgan bo'lsa to'xtab turadi.
export default function IntegVideo({ t }: { t: T }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // harakatsiz rejim: mazmuni ko'rinadigan kadrda to'xtab turadi
      const showFrame = () => { video.currentTime = 2; };
      video.preload = "metadata"; // preload="none" bo'lsa kadr hech qachon yuklanmaydi
      if (video.readyState >= 1) showFrame();
      else video.addEventListener("loadedmetadata", showFrame, { once: true });
      return () => video.removeEventListener("loadedmetadata", showFrame);
    }

    let inView = false;
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
        if (inView) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.3 },
    );
    io.observe(video);
    // iOS Safari brauzerdan chiqilganda videoni to'xtatadi — qaytganda ekranda bo'lsa, qayta yoqamiz
    const resume = () => {
      if (!document.hidden && inView) video.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", resume);
    window.addEventListener("pageshow", resume);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("pageshow", resume);
    };
  }, []);

  return (
    <video
      ref={ref}
      className="integ__video"
      src="/section-one-hub.mp4"
      width={500}
      height={500}
      muted
      loop
      playsInline
      // sahifa ochilganda yuklanmaydi — ekranga kirganda play() yuklaydi (TZ 6.3)
      preload="none"
      aria-label={t.label}
    />
  );
}
