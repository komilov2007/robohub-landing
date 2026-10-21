"use client";

import { useEffect, useRef, useState } from "react";
import { FINAL } from "../../robosell.content";

// Jonli chat: ko'rinib turganda xabarlar navbat bilan chiqadi (oldidan "yozmoqda…" nuqtalari),
// oxirida biroz turib, boshidan takrorlanadi. Serverda va reduced-motion'da — butun suhbat.
export default function FinalChat() {
  const [n, setN] = useState(FINAL.chat.length);
  const [typing, setTyping] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timers: number[] = [];
    let on = false;
    const run = () => {
      timers.forEach(clearTimeout);
      timers = [];
      setN(0);
      let t = 300;
      FINAL.chat.forEach((_, i) => {
        timers.push(window.setTimeout(() => setTyping(true), t));
        t += 900;
        timers.push(
          window.setTimeout(() => {
            setTyping(false);
            setN(i + 1);
          }, t),
        );
        t += 700;
      });
      timers.push(window.setTimeout(() => on && run(), t + 3200));
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !on) {
          on = true;
          run();
        } else if (!e.isIntersecting && on) {
          on = false;
          timers.forEach(clearTimeout);
          setTyping(false);
          setN(FINAL.chat.length);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const next = FINAL.chat[n];
  return (
    <div className="rs-fin__chat" ref={ref} aria-hidden="true">
      <div className="rs-fin__chat-head">
        <span className="rs-fin__chat-ava">R</span>
        <span>
          <b>Robosell jamoasi</b>
          <small>{typing ? "yozmoqda…" : "onlayn"}</small>
        </span>
        <i />
      </div>
      <div className="rs-fin__msgs">
        {FINAL.chat.slice(0, n).map((m) => (
          <p key={m.text} className={"rs-fin__msg" + (m.me ? " is-me" : "")}>
            {m.text}
            {m.me && <small>✓✓</small>}
          </p>
        ))}
        {typing && next && (
          <p className={"rs-fin__msg rs-fin__typing" + (next.me ? " is-me" : "")}>
            <i />
            <i />
            <i />
          </p>
        )}
      </div>
    </div>
  );
}
