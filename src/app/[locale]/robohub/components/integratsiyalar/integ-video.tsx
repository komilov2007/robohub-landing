"use client";

import { useEffect, useRef } from "react";
import type { messages } from "./integratsiyalar.i18n";

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
      if (video.readyState >= 1) showFrame();
      else video.addEventListener("loadedmetadata", showFrame, { once: true });
      return () => video.removeEventListener("loadedmetadata", showFrame);
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.3 },
    );
    io.observe(video);
    return () => io.disconnect();
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
      preload="metadata"
      aria-label={t.label}
    />
  );
}
