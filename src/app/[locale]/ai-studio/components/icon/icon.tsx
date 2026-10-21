import type { CSSProperties } from "react";

// AI Studio ikonlari — o'zimiz chizmaymiz: Robohub/Robosell ikon to'plamidagi tayyor SVG'lar.
// Kerakli fayllar public/ai-studio/icons ga ko'chirilgan (boshqa saytlar o'z papkasini o'zgartirsa ham buzilmasin);
// AI belgisi — robohub ilovasidan: public/ai-studio/ai.svg.
// SVG CSS mask sifatida qo'yiladi, shuning uchun rangi currentColor'dan olinadi (fon/mavzuga moslashadi).
const SRC = {
  ai: "/ai-studio/ai.svg",
  sparkle: "/ai-studio/icons/auto-awesome.svg",
  arrow: "/ai-studio/icons/arrow-upward.svg", // CSS'da 90° buriladi (as-i--right)
  check: "/ai-studio/icons/tick.svg",
  checkCircle: "/ai-studio/icons/check-circle.svg",
  clock: "/ai-studio/icons/clock-circle.svg",
  wallet: "/ai-studio/icons/wallet.svg",
  eyeOff: "/ai-studio/icons/eye-close.svg",
  sell: "/ai-studio/icons/sell.svg",
  send: "/ai-studio/icons/send.svg",
  trend: "/ai-studio/icons/trend-up.svg",
  shield: "/ai-studio/icons/check-circle.svg",
  star: "/ai-studio/icons/star.svg",
  fire: "/ai-studio/icons/fire.svg",
  fhd: "/ai-studio/icons/fhd.svg",
  image: "/ai-studio/icons/image-add.svg",
  drag: "/ai-studio/icons/drag.svg",
  cursor: "/ai-studio/icons/interactive.svg",
  calendar: "/ai-studio/icons/calendar-outline.svg",
  crown: "/ai-studio/icons/crown.svg",
} as const;

export type IconName = keyof typeof SRC;

export default function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <span
      className={"as-i" + (className ? " " + className : "")}
      style={{ "--src": `url(${SRC[name]})` } as CSSProperties}
      aria-hidden="true"
    />
  );
}
