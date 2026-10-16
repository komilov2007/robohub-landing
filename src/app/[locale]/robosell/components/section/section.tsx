import type { ReactNode } from "react";

type Props = {
  id: string;
  // dumcha qaysi tomonda: in — chapda (kiruvchi xabar), out — o'ngda (chiquvchi xabar)
  side: "in" | "out";
  tone: "white" | "soft" | "teal" | "ink";
  // tepadagi kichik "chat" xabari
  ping?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
};

// Hero'dan keyingi har bo'limning qobig'i: chat pufakchasi shaklidagi fon (robosell.css → .rs-sec).
export default function Section({ id, side, tone, ping, labelledBy, className, children }: Props) {
  return (
    <section
      id={id}
      className={`rs-sec rs-sec--${side} rs-sec--${tone}${className ? " " + className : ""}`}
      aria-labelledby={labelledBy}
    >
      {ping && (
        <p className="rs-ping" data-rv="" aria-hidden="true">
          {ping}
          <span className="rs-ping__time">✓✓</span>
        </p>
      )}
      {children}
    </section>
  );
}
