"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { lessonsByTopic } from "../../lib/academy";
import { fmt, yt } from "../../lib/youtube";
import Icon, { ICONS, PlayGlyph } from "../svg-icon/svg-icon";
import { lessonHref, topicHref } from "../../lib/links";
import { common } from "../../lib/common.i18n";
import { useAcademyLocale } from "../locale/locale";
import { messages } from "./mp-peek.i18n";
import { logoAlt } from "@/lib/img-alt";

// Bosh sahifa hero kapsulasi: "Robohub Academy · marketpleys sotuvchilari uchun" va ustma-ust 4 marketpleys logosi.
// Logolar ustiga kelinsa — ular yoyiladi; bittasiga kelinsa (yoki klaviatura fokusi) — tagida kichik ko'rinish oynasi:
// shu marketpleysni ulash darsining muqovasi va nomi. Video bu yerda ijro bo'lmaydi: logo yoki muqova bosilsa —
// Integratsiya sahifasi shu dars bilan ochiladi. Oyna ustida turilsa ochiq qoladi; chiqilsa biroz kutib yopiladi.
const MARKETPLACES = [
  { logo: "uzum", name: "Uzum Market" },
  { logo: "wildberries", name: "Wildberries" },
  { logo: "yandex", name: "Yandex Market" },
  { logo: "ozon", name: "Ozon" },
];
export default function MpPeek({ style }: { style?: CSSProperties }) {
  const locale = useAcademyLocale();
  const t = messages[locale];
  const c = common[locale];
  // Integratsiya darslari tartibi MARKETPLACES bilan bir xil (22 Uzum, 23 WB, 24 Yandex, 25 Ozon)
  const LESSONS = lessonsByTopic("integration", locale);
  const href = (n: number) => lessonHref(locale, "integration", n);
  const [active, setActive] = useState<number | null>(null);
  // x — oyna markazi (kapsulaga nisbatan), ax — strelkaning markazdan siljishi (oyna ekran chetiga qisilganda)
  const [pos, setPos] = useState({ x: 0, ax: 0 });
  const rootRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const show = (i: number) => {
    clearTimeout(timer.current);
    const el = itemRefs.current[i];
    const root = rootRef.current;
    if (el && root) {
      const cx = el.getBoundingClientRect().left + el.offsetWidth / 2;
      const half = window.innerWidth < 768 ? 135 : 150; // oyna kengligining yarmi (home.css → .acx-mppop)
      const center = Math.min(Math.max(cx, 12 + half), window.innerWidth - 12 - half);
      setPos({ x: center - root.getBoundingClientRect().left, ax: cx - center });
    }
    setActive(i);
  };
  const hide = () => {
    clearTimeout(timer.current);
    setActive(null);
  };
  const scheduleHide = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(hide, 260);
  };
  const keep = () => clearTimeout(timer.current);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && hide();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const lesson = active !== null ? LESSONS[active] : undefined;
  const mp = active !== null ? MARKETPLACES[active] : undefined;

  return (
    <div
      ref={rootRef}
      className={`acx-in acx-mpb${active !== null ? " is-open" : ""}`}
      style={style}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && hide()}
    >
      <div className="acx-badge acx-badge--mp">
        <span className="acx-mps" onPointerLeave={(e) => e.pointerType === "mouse" && scheduleHide()}>
          {MARKETPLACES.map((m, i) => (
            <Link
              key={m.logo}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              href={LESSONS[i] ? href(LESSONS[i].n) : topicHref(locale, "integration")}
              className={`acx-mps__item${i === active ? " is-active" : ""}`}
              style={{ "--k": i } as CSSProperties}
              aria-label={t.connectLabel(m.name)}
              onPointerEnter={(e) => e.pointerType === "mouse" && show(i)}
              onFocus={() => show(i)}
            >
              <img loading="lazy" decoding="async" src={`/marketplaces/${m.logo}.svg`} alt={logoAlt(locale, `/marketplaces/${m.logo}.svg`)} width={24} height={24} />
            </Link>
          ))}
        </span>
        Robohub Academy<span className="acx-hide-sm"> · {t.forSellers}</span>
      </div>

      {lesson && mp && (
        <div
          className="acx-mppop"
          data-theme="dark"
          style={{ "--x": `${pos.x}px`, "--ax": `${pos.ax}px` } as CSSProperties}
          onPointerEnter={keep}
          onPointerLeave={(e) => e.pointerType === "mouse" && scheduleHide()}
        >
          {/* butun kartochka — bitta havola (klaviatura uchun logoning o'zi havola, shuning uchun tabIndex=-1) */}
          <Link href={href(lesson.n)} className="acx-mppop__card" key={active} tabIndex={-1} aria-hidden="true">
            <span className="acx-mppop__meta">
              <img loading="lazy" decoding="async" src={`/marketplaces/${mp.logo}.svg`} alt="" width={18} height={18} />
              {mp.name}
              <span>
                {c.lessonN(lesson.n)} · {fmt(lesson.durationSec)}
              </span>
            </span>
            <span className="acx-mppop__thumb">
              <img loading="lazy" src={yt.thumbHq(lesson.youtubeId)} width={480} height={360} alt="" decoding="async" />
              <span className="acx-mppop__play">
                <PlayGlyph size={18} />
              </span>
            </span>
            <span className="acx-mppop__title">{lesson.title}</span>
            <span className="acx-mppop__more">
              {t.watch}
              <Icon d={ICONS.arrowRight} size={14} />
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
