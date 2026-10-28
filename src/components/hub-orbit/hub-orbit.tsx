import type { CSSProperties } from "react";
import "./hub-orbit.css";

// Yakuniy kartalardagi animatsiya (Robohub, Academy, AI Studio, Kalkulyator — bir xil):
// markazda Robohub belgisi, atrofida bitta halqada marketpleyslar. Har 7 soniyada markazdan har bir
// logotipga chiziq chiziladi, logotip "otilib" chiqadi, chiziqlar bo'ylab nuqta yuguradi, oxirida so'nadi.
// Belgi SVG'si shu yerning o'zida — sahifada #rh-mark symbol bo'lishi shart emas.
const MARKETPLACES = [
  "/marketplaces/uzum.svg",
  "/robosell/icons/alif.svg",
  "/marketplaces/wildberries.svg",
  "/robosell/icons/click-outline.svg",
  "/marketplaces/ozon.svg",
  "/robosell/icons/zoomrad.svg",
  "/marketplaces/yandex.svg",
];
// o'z foni yo'q (shaffof) logotiplar — oq plitkaga qo'yiladi
const PLAIN = ["/robosell/icons/alif.svg", "/robosell/icons/click-outline.svg", "/robosell/icons/zoomrad.svg"];
const START = -90; // birinchi logotip — tepada

export default function HubOrbit({ className }: { className?: string }) {
  return (
    <div className={className ? `hub-orbit ${className}` : "hub-orbit"} aria-hidden="true">
      <span className="hub-orbit__ring">
        {MARKETPLACES.flatMap((src, i) => {
          const style = { "--a": `${START + (i * 360) / MARKETPLACES.length}deg`, "--i": i } as CSSProperties;
          return [
            // markazdan shu logotipgacha to'g'ri chiziq
            <i key={`l-${src}`} className="hub-orbit__spoke" style={style} />,
            <img key={src} src={src} alt="" width="54" height="54" loading="lazy" className={PLAIN.includes(src) ? "is-plain" : undefined} style={style} />,
          ];
        })}
      </span>
      <span className="hub-orbit__mark">
        <svg viewBox="0 7.97 33.8675 15.06">
          <path
            fill="currentColor"
            d="M26.3414 7.97623H7.5261C3.37004 7.97623 0 11.3439 0 15.5C0 19.656 3.37004 23.0261 7.5261 23.0261H26.3414C30.4974 23.0261 33.8675 19.656 33.8675 15.5C33.8675 11.3439 30.4974 7.97388 26.3414 7.97388V7.97623ZM24.4587 20.2067C23.1031 20.2067 21.8841 19.6325 21.0251 18.7147C20.0131 17.6039 18.5564 16.9097 16.9349 16.9097C15.3134 16.9097 13.8543 17.6039 12.8424 18.717C11.9834 19.6325 10.7644 20.2067 9.4088 20.2067C6.81068 20.2067 4.7044 18.1005 4.7044 15.5023C4.7044 12.9042 6.81068 10.7979 9.4088 10.7979C10.7644 10.7979 11.9834 11.3722 12.8424 12.2876C13.8543 13.3984 15.3111 14.0927 16.9349 14.0927C18.5564 14.0927 20.0155 13.3984 21.0274 12.2853C21.8864 11.3698 23.1055 10.7956 24.461 10.7956C27.0591 10.7956 29.1654 12.9018 29.1654 15.5C29.1654 18.0981 27.0591 20.2044 24.461 20.2044L24.4587 20.2067Z"
          />
        </svg>
      </span>
    </div>
  );
}
