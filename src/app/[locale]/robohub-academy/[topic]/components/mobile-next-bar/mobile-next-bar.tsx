"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nextLesson } from "../../../lib/academy";
import { usePlayer } from "../../../components/player/player-context";

// Mobil pastki sticky panel: "Keyingi dars" + [Ko'rish]. Hero (pleyer) va footer ko'ringanda yashirinadi.
export default function MobileNextBar() {
  const { selected, topic, select } = usePlayer();
  const [hidden, setHidden] = useState(true);
  const next = nextLesson(selected);

  useEffect(() => {
    const targets = [document.querySelector(".ac-th"), document.getElementById("ac-footer")].filter(
      (el): el is Element => el !== null,
    );
    const visible = new Map<Element, boolean>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) visible.set(e.target, e.isIntersecting);
      setHidden([...visible.values()].some(Boolean));
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  if (!next) return null;
  const sameTopic = next.topic === topic;

  return (
    <div className={`ac-nextbar${hidden ? " is-hidden" : ""}`} data-theme="dark" inert={hidden}>
      <div className="ac-nextbar__text">
        <span>Keyingi dars · {next.n}</span>
        <strong>{next.title}</strong>
      </div>
      {sameTopic ? (
        <button type="button" className="btn btn--primary ac-nextbar__btn" onClick={() => select(next.n, { play: true, scroll: true })}>
          Ko‘rish
        </button>
      ) : (
        <Link href={`/${next.topic}?dars=${next.n}`} className="btn btn--primary ac-nextbar__btn">
          Ko‘rish
        </Link>
      )}
    </div>
  );
}
