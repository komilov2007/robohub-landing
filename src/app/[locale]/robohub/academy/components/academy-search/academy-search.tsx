"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { getLessonsSorted, getTopic, normalize, type Lesson } from "../../lib/academy";
import Icon, { ICONS } from "../svg-icon/svg-icon";
import { lessonHref } from "../../lib/links";
import { useAcademyLocale } from "../locale/locale";
import { messages } from "./academy-search.i18n";

// Academy qidiruvi (7.1): joriy tildagi title, summary, points va mavzu nomi bo'yicha.
// Kichik harf, o‘/o' va g‘/g' (ruschada ё/е) farqi hisobga olinmaydi (normalize). Klaviatura: ↑ ↓ Enter Esc.
type Entry = { lesson: Lesson; topicName: string; title: string; hay: string };
const indexes = new Map<Locale, Entry[]>();
function buildIndex(locale: Locale): Entry[] {
  const cached = indexes.get(locale);
  if (cached) return cached;
  const index = getLessonsSorted(locale).map((l) => {
    const topicName = getTopic(l.topic, locale)?.name ?? "";
    return {
      lesson: l,
      topicName,
      title: " " + normalize(l.title),
      // boshida bo'shliq: o'zak faqat so'z boshidan qidiriladi (" missi" — "komissiya" ga mos kelmaydi)
      hay: " " + normalize([l.title, l.summary, ...l.points, topicName].join(" ")),
    };
  });
  indexes.set(locale, index);
  return index;
}

// So'z qo'shimchalar bilan o'zgaradi (guruhlayman / guruhlash / guruhlarga), shuning uchun
// so'zning boshidagi o'zagi qidiriladi: uzunligining ~60%, kamida 4 harf ("guruhlayman" → "guruhla").
const stem = (w: string) => (w.length <= 4 ? w : w.slice(0, Math.max(4, Math.ceil(w.length * 0.6))));

// stop — savol so'zlari (har darsda bor, qidiruvga ta'sir qilmasin), *.i18n.ts dan
function search(query: string, locale: Locale) {
  const stop = new Set(messages[locale].stop);
  const all = normalize(query).split(" ").filter(Boolean);
  const words = all.filter((w) => !stop.has(w));
  const terms = (words.length ? words : all).map(stem);
  if (!terms.length) return [];
  // So'zlarning kamida 2/3 qismi topilishi kerak; sarlavhadagi moslik ikki baravar og'ir
  const need = Math.ceil(terms.length * 0.67);
  return buildIndex(locale).map((item) => {
    const hits = terms.filter((t) => item.hay.includes(" " + t)).length;
    if (hits < need) return null;
    const score = hits + terms.filter((t) => item.title.includes(" " + t)).length * 2;
    return { item, score };
  })
    .filter((r): r is NonNullable<typeof r> => r !== null)
    .sort((a, b) => b.score - a.score || a.item.lesson.n - b.item.lesson.n)
    .slice(0, 8)
    .map((r) => r.item);
}

export default function AcademySearch() {
  const locale = useAcademyLocale();
  const t = messages[locale];
  const router = useRouter();
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const results = useMemo(() => search(query, locale), [query, locale]);
  const showDropdown = open && query.trim().length > 0;
  const listRef = useRef<HTMLUListElement>(null);

  // Klaviatura bilan tanlangan natija ro'yxat scroll'ida ko'rinib tursin
  useEffect(() => {
    if (active < 0) return;
    listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = (i: number) => {
    const r = results[i];
    if (!r) return;
    setOpen(false);
    router.push(lessonHref(locale, r.lesson.topic, r.lesson.n));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => (results.length ? (a + 1) % results.length : -1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (results.length ? (a <= 0 ? results.length - 1 : a - 1) : -1));
    } else if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  };

  return (
    <div className="ac-search">
      <form
        className="ac-search__box"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (results.length) go(active >= 0 ? active : 0);
          else setOpen(true);
        }}
      >
        <label htmlFor={`${id}-input`} className="ac-search__label">
          {t.label}
        </label>
        <div className="ac-search__row">
          <Icon d={ICONS.search} size={20} className="ac-search__ico" />
          <input
            ref={inputRef}
            id={`${id}-input`}
            type="search"
            autoComplete="off"
            placeholder={t.placeholder}
            value={query}
            role="combobox"
            aria-expanded={showDropdown}
            aria-controls={`${id}-list`}
            aria-autocomplete="list"
            aria-activedescendant={showDropdown && active >= 0 ? `${id}-opt-${active}` : undefined}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              setActive(-1);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            onKeyDown={onKeyDown}
          />
          {query && (
            <button
              type="button"
              className="ac-search__clear"
              aria-label={t.clear}
              // mousedown — input fokusini yo'qotmaslik uchun
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setQuery("");
                setActive(-1);
                inputRef.current?.focus();
              }}
            >
              <Icon d={ICONS.close} size={14} />
            </button>
          )}
          <button type="submit" className="btn btn--accent ac-search__btn">
            {t.submit}
          </button>
        </div>

        {showDropdown && (
          <div className="ac-search__dropdown">
            {results.length > 0 && (
              <p className="ac-search__count" aria-hidden="true">
                {t.found(results.length)} <span>↑ ↓ · Enter</span>
              </p>
            )}
            {results.length ? (
              <ul id={`${id}-list`} role="listbox" aria-label={t.listLabel} ref={listRef}>
                {results.map((r, i) => (
                  <li
                    key={r.lesson.n}
                    id={`${id}-opt-${i}`}
                    role="option"
                    aria-selected={i === active}
                    className={i === active ? "is-active" : undefined}
                    // mousedown — blur'dan oldin ishlashi uchun
                    onMouseDown={(e) => {
                      e.preventDefault();
                      go(i);
                    }}
                    onMouseEnter={() => setActive(i)}
                  >
                    <span className="ac-search__n">{r.lesson.n}</span>
                    <span className="ac-search__text">
                      <strong>{r.lesson.title}</strong>
                      <span>{r.topicName}</span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="ac-search__empty" id={`${id}-list`} role="status">
                {t.empty}{" "}
                <a href="#topics" onMouseDown={(e) => e.preventDefault()} onClick={() => setOpen(false)}>
                  {t.seeAll}
                </a>
              </p>
            )}
          </div>
        )}
      </form>

      <div className="ac-search__popular">
        <span>{t.popularLabel}</span>
        <ul>
          {t.popular.map((p) => (
            <li key={p}>
              <button
                type="button"
                className="ac-chip"
                onClick={() => {
                  setQuery(p);
                  setActive(-1);
                  setOpen(true);
                  inputRef.current?.focus();
                }}
              >
                {p}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
