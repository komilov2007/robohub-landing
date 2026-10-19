"use client";

import { useEffect, useRef, useState } from "react";

// Sticky bo'limlar menyusi (5.4). Aktiv bo'lim IntersectionObserver bilan aniqlanadi.
export default function SectionNav({ lessonCount }: { lessonCount: number }) {
  const links = [
    { id: "videos", label: `Video darslar (${lessonCount})` },
    { id: "how", label: "Videoda nima bor" },
    { id: "questions", label: "Savollar" },
  ];
  const [active, setActive] = useState("");
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = ["videos", "how", "questions"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const visible = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        // Ekran yuqori qismidagi birinchi ko'rinayotgan bo'lim
        const first = sections.find((s) => visible.get(s.id));
        setActive(first?.id ?? "");
      },
      { rootMargin: "-80px 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Mobilda aktiv link gorizontal ro'yxatda ko'rinib tursin
  useEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>(".is-active");
    if (!list || !el) return;
    list.scrollTo({ left: el.offsetLeft - 20, behavior: "smooth" });
  }, [active]);

  return (
    <nav className="ac-snav" aria-label="Sahifa bo‘limlari">
      <ul className="container ac-snav__list" ref={listRef}>
        {links.map((l) => (
          <li key={l.id}>
            <a
              href={`#${l.id}`}
              className={l.id === active ? "is-active" : undefined}
              aria-current={l.id === active ? "location" : undefined}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
