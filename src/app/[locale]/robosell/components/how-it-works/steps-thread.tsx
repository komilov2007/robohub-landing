"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Step = { title: string; text: string; chip: string };

// Qadamlar ekran o'rtasidagi chiziqdan o'tganda yonadi (IntersectionObserver, layout o'qilmaydi).
// Oldingi qadamlar "bajarildi" holatida qoladi. JS siz va reduced-motion'da hammasi yoniq.
export default function StepsThread({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(steps.length - 1);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = Array.from(list.querySelectorAll<HTMLElement>("[data-step]"));
    setActive(-1);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const i = Number((e.target as HTMLElement).dataset.step);
          // pastga: chiziqqa yetgan qadam yonadi; tepaga qaytilganda — chiziqdan pastga tushgani o'chadi
          if (e.isIntersecting) setActive((a) => Math.max(a, i));
          else if (e.boundingClientRect.top > (e.rootBounds?.bottom ?? 0)) setActive((a) => Math.min(a, i - 1));
        });
      },
      { rootMargin: "0px 0px -45% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const fill = active < 0 ? 0 : active / (steps.length - 1);

  return (
    <ol className="rs-thread" ref={listRef} style={{ "--fill": fill } as CSSProperties}>
      {steps.map((s, i) => (
        <li
          key={s.title}
          data-step={i}
          className={"rs-msg" + (i <= active ? " is-read" : "") + (i === active ? " is-now" : "")}
        >
          <span className="rs-msg__n" aria-hidden="true">
            {i + 1}
          </span>
          <div className="rs-msg__bubble">
            <b>{s.title}</b>
            <span>{s.text}</span>
            <code>{s.chip}</code>
            <small className="rs-msg__tick" aria-hidden="true">
              ✓✓
            </small>
          </div>
        </li>
      ))}
    </ol>
  );
}
