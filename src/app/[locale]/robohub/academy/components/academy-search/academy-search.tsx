"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { getLessonsSorted, getTopic, normalize, type Lesson, lessonNo } from "../../lib/academy";
import Icon, { ICONS } from "../svg-icon/svg-icon";
import { lessonHref } from "../../lib/links";
import { useAcademyLocale } from "../locale/locale";
import { messages } from "./academy-search.i18n";

// Academy qidiruvi (7.1): har dars barcha tillardagi title, summary, points va mavzu nomi bo'yicha topiladi —
// sahifa tili qanday bo'lishidan qat'i nazar ("склад", "sklad", "ombor", "warehouse" — hammasi Ombor darslarini topadi).
// Kirill va lotin bir xil ko'rinishga keltiriladi (translit): "склад" → "sklad". Natija — joriy tildagi dars.
// Kichik harf, o‘/o' va g‘/g' (ruschada ё/е), diakritika (ә қ ң, á ń ó …) farqi hisobga olinmaydi. Klaviatura: ↑ ↓ Enter Esc.
const CYR: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ж: "j", з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
  п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "x", ц: "s", ч: "ch", ш: "sh", щ: "sh", ъ: "", ы: "i", ь: "", э: "e",
  ю: "yu", я: "ya", ў: "o", қ: "q", ғ: "g", ҳ: "h", һ: "h", ә: "a", ө: "o", ү: "u", ұ: "u", ң: "n", ҷ: "j", ӣ: "i", ӯ: "u",
  і: "i",
};
// Kirill (o'zbek, rus, qozoq, qirg'iz, tojik) → lotin; so'ng lotin diakritikasi olib tashlanadi
// (qoraqalpoqcha á ǵ ı ń ó ú → a g i n o u): "sabaq", "сабақ", "sabáq" bir xil ko'rinadi.
const latin = (s: string) =>
  normalize(s.normalize("NFC"))
    .replace(/[\u0400-\u04ff]/g, (ch) => CYR[ch] ?? ch)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i");
// qidiruv indeksi tuziladigan tillar (kontenti bo'lgan har bir til; yangi til qo'shilsa — shu yerda ham)
const SEARCH_LOCALES: Locale[] = ["uz", "ru", "en", "kk", "ky", "kaa", "tg"];

type Entry = { lesson: Lesson; topicName: string; title: string; hay: string };
const indexes = new Map<Locale, Entry[]>();
function buildIndex(locale: Locale): Entry[] {
  const cached = indexes.get(locale);
  if (cached) return cached;
  // dars raqami (n) bo'yicha barcha tillardagi matnlar bitta "pichan"ga yig'iladi
  const all = new Map<number, string[]>();
  const titles = new Map<number, string[]>();
  for (const loc of SEARCH_LOCALES) {
    for (const l of getLessonsSorted(loc)) {
      const topicName = getTopic(l.topic, loc)?.name ?? "";
      all.set(l.n, [...(all.get(l.n) ?? []), l.title, l.summary, ...l.points, topicName]);
      titles.set(l.n, [...(titles.get(l.n) ?? []), l.title]);
    }
  }
  const index = getLessonsSorted(locale).map((l) => ({
    lesson: l,
    topicName: getTopic(l.topic, locale)?.name ?? "",
    // boshida bo'shliq: o'zak faqat so'z boshidan qidiriladi (" missi" — "komissiya" ga mos kelmaydi)
    title: " " + latin((titles.get(l.n) ?? [l.title]).join(" ")),
    hay: " " + latin((all.get(l.n) ?? [l.title]).join(" ")),
  }));
  indexes.set(locale, index);
  return index;
}

// So'z qo'shimchalar bilan o'zgaradi (guruhlayman / guruhlash / guruhlarga), shuning uchun
// so'zning boshidagi o'zagi qidiriladi: uzunligining ~60%, kamida 4 harf ("guruhlayman" → "guruhla").
const stem = (w: string) => (w.length <= 4 ? w : w.slice(0, Math.max(4, Math.ceil(w.length * 0.6))));

// stop — savol so'zlari (har darsda bor, qidiruvga ta'sir qilmasin), barcha tillardagi *.i18n.ts dan
const STOP = new Set(SEARCH_LOCALES.flatMap((l) => messages[l].stop.map(latin)));
function search(query: string, locale: Locale) {
  const all = latin(query).split(" ").filter(Boolean);
  const words = all.filter((w) => !STOP.has(w));
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
                    <span className="ac-search__n">{lessonNo(r.lesson.n)}</span>
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
