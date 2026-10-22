"use client";

import { useEffect, useRef, useState } from "react";
import { TELEGRAM_URL } from "@/lib/contacts";
import type { Content } from "../../calculator.content";

// FAQ — suhbat: savol chipini bosasiz, u "sizning" xabaringiz bo'lib chiqadi, yordamchi "yozmoqda…" deydi va javob beradi.
// Birinchi savol-javob boshidan ochiq. Savollar rb-market landingidagilar — FAQPage JSON-LD ham shu ro'yxatdan (page.tsx).
type Message = { from: "you" | "bot"; text: string; id: number };

const TYPING_MS = 900;

export default function Faq({ faq, chat }: { faq: Content["FAQ"]; chat: Content["S"]["chat"] }) {
  const [asked, setAsked] = useState<number[]>([0]);
  const [messages, setMessages] = useState<Message[]>([
    { from: "you", text: faq.items[0].q, id: 0 },
    { from: "bot", text: faq.items[0].a, id: 1 },
  ]);
  const [typing, setTyping] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Yangi xabar — suhbat oxiriga suriladi (faqat suhbat oynasi ichida, sahifa joyida qoladi)
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const ask = (i: number) => {
    if (typing) return;
    setAsked((prev) => [...prev, i]);
    setMessages((prev) => [...prev, { from: "you", text: faq.items[i].q, id: prev.length }]);
    setTyping(true);
    timer.current = setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { from: "bot", text: faq.items[i].a, id: prev.length }]);
    }, TYPING_MS);
  };

  const left = faq.items.map((it, i) => ({ ...it, i })).filter((it) => !asked.includes(it.i));

  return (
    <section className="cx-faq" id="faq" aria-labelledby="cx-faq-title">
      <div className="as-wrap cx-faq__grid">
        <header className="cx-head" data-io>
          <span className="cx-kicker cx-kicker--light">
            <i />
            {faq.eyebrow}
          </span>
          <h2 id="cx-faq-title">{faq.title}</h2>
          <a className="cx-btn cx-btn--line" href={TELEGRAM_URL} target="_blank" rel="noopener">
            {chat.tg} <span aria-hidden="true">↗</span>
          </a>
        </header>

        <div className="cx-chat" data-io>
          <div className="cx-chat__top">
            <span className="cx-chat__avatar" aria-hidden="true">
              <img src="/calculator/icons/pc-calculator.svg" alt="" width={20} height={20} />
            </span>
            <div>
              <b>{chat.bot}</b>
              <span className="cx-chat__online">{chat.online}</span>
            </div>
          </div>

          <div className="cx-chat__log" ref={logRef} role="log" aria-live="polite">
            {messages.map((m) => (
              <p key={m.id} className={`cx-msg is-${m.from}`}>
                {m.text}
              </p>
            ))}
            {typing && (
              <p className="cx-msg is-bot is-typing" aria-label={chat.typing}>
                <i />
                <i />
                <i />
              </p>
            )}
          </div>

          <div className="cx-chat__ask">
            {left.length ? (
              <>
                <span>{chat.more}</span>
                <div className="cx-chat__chips">
                  {left.map((it) => (
                    <button key={it.i} type="button" className="cx-qchip" disabled={typing} onClick={() => ask(it.i)}>
                      {it.q}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <span>{chat.done}</span>
            )}
          </div>
        </div>
      </div>

      {/* Qidiruv va JS'siz o'qish uchun — barcha savol-javoblar to'liq matnda (ko'rinmas, lekin o'qiladi) */}
      <dl className="cx-sr">
        {faq.items.map((it) => (
          <div key={it.q}>
            <dt>{it.q}</dt>
            <dd>{it.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
