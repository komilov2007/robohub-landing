"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nextLesson } from "../../../lib/academy";
import { usePlayer } from "../../../components/player/player-context";
import { PlayGlyph } from "../../../components/svg-icon/svg-icon";
import { lessonHref } from "../../../lib/links";

// Mobil pastki sticky panel (shisha kapsula): "Keyingi dars" + [Ko'rish]. Hero (pleyer) va footer ko'ringanda yashirinadi.
export default function MobileNextBar() {
  const { selected, topic, select } = usePlayer();
  const [hidden, setHidden] = useState(true);
  const next = nextLesson(selected);

  useEffect(() => {
    const targets = [document.querySelector(".acx-hero"), document.getElementById("ac-footer")].filter(
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
  const btn = (
    <>
      <PlayGlyph size={14} /> Ko‘rish
    </>
  );

  return (
    <div className={`acx-nextbar${hidden ? " is-hidden" : ""}`} data-theme="dark" inert={hidden}>
      <div className="acx-nextbar__text">
        <span>Keyingi dars · {next.n}</span>
        <strong>{next.title}</strong>
      </div>
      {sameTopic ? (
        <button type="button" className="acx-nextbar__btn" onClick={() => select(next.n, { play: true, scroll: true })}>
          {btn}
        </button>
      ) : (
        <Link href={lessonHref(next.topic, next.n)} className="acx-nextbar__btn">
          {btn}
        </Link>
      )}
    </div>
  );
}
