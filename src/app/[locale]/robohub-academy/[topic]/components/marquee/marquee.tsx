"use client";

import { useEffect, useRef, useState } from "react";

// Marketpleyslar lentasi — faqat ekranda ko'rinib turganda harakatlanadi (IntersectionObserver → React holati).
// Ichki kontent ikki marta: translateX(-50%) bilan uzluksiz aylanadi. Dekor — aria-hidden.
const ITEMS = [
  { logo: "uzum", name: "Uzum Market" },
  { logo: "wildberries", name: "Wildberries" },
  { logo: "yandex", name: "Yandex Market" },
  { logo: "ozon", name: "Ozon" },
];

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const row = ITEMS.concat(ITEMS, ITEMS);
  return (
    <div ref={ref} className={`ac-marquee${visible ? " is-running" : ""}`} aria-hidden="true">
      <div className="ac-marquee__track">
        {[0, 1].map((k) => (
          <div className="ac-marquee__row" key={k}>
            {row.map((m, i) => (
              <span key={i}>
                <img src={`/marketplaces/${m.logo}.svg`} alt="" width={24} height={24} loading="lazy" />
                {m.name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
