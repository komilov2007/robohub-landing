"use client";

import { localeHref, type Locale } from "@/i18n/config";
import { useRobohubOrigin } from "@/lib/robohub-origin";
import { messages } from "@/app/[locale]/robohub/components/header/header.i18n";
import { AI_TOOL, FEAT_ICONS, FEAT_STEP, SOON_TOOL, TOOL_ICONS, featHash } from "@/app/[locale]/robohub/components/header/menu-icons";
import "./robohub-menu.css";

// "Imkoniyatlar" — Robohub landingi header'idagi panel (matn va ikonkalar o'sha yerdan), Kalkulyator va AI Studio
// header'larida (Academy'dagi bilan bir xil ko'rinish). <ul> ichiga birinchi band bo'lib qo'yiladi; linkClass — o'sha
// header menyusining havola klassi (rang, pastki chiziq). Ochilish — CSS (:hover / :focus-within), robohub-menu.css.
// Har band Robohub saytiga yangi oynada olib boradi: "#features" kabilar — landing bo'limiga, qolganlari — o'z sahifasiga.
// Domen — joriy muhitdagi Robohub (lokal / Vercel / robohub.uz — src/lib/robohub-origin.ts): AI Studio o'z domenida ochilsa ham.
export default function RobohubMenu({ locale, linkClass }: { locale: Locale; linkClass: string }) {
  const t = messages[locale] ?? messages.uz;
  const origin = useRobohubOrigin();
  const home = localeHref(locale, "/");
  const to = (href: string) => (href.startsWith("#") ? `${origin}${home}${href}` : `${origin}${href}`);
  const label = t.nav.find((n) => "menu" in n && n.menu === "features")?.label ?? t.features.title;
  return (
    <li className="rhm">
      <a href={to("#features")} target="_blank" rel="noopener" className={`${linkClass} rhm__link`}>
        {label}
        <svg className="rhm__mark" viewBox="0 7.97 33.8675 15.06" width="24" height="11" aria-hidden="true">
          <path
            fill="currentColor"
            d="M26.3414 7.97623H7.5261C3.37004 7.97623 0 11.3439 0 15.5C0 19.656 3.37004 23.0261 7.5261 23.0261H26.3414C30.4974 23.0261 33.8675 19.656 33.8675 15.5C33.8675 11.3439 30.4974 7.97388 26.3414 7.97388V7.97623ZM24.4587 20.2067C23.1031 20.2067 21.8841 19.6325 21.0251 18.7147C20.0131 17.6039 18.5564 16.9097 16.9349 16.9097C15.3134 16.9097 13.8543 17.6039 12.8424 18.717C11.9834 19.6325 10.7644 20.2067 9.4088 20.2067C6.81068 20.2067 4.7044 18.1005 4.7044 15.5023C4.7044 12.9042 6.81068 10.7979 9.4088 10.7979C10.7644 10.7979 11.9834 11.3722 12.8424 12.2876C13.8543 13.3984 15.3111 14.0927 16.9349 14.0927C18.5564 14.0927 20.0155 13.3984 21.0274 12.2853C21.8864 11.3698 23.1055 10.7956 24.461 10.7956C27.0591 10.7956 29.1654 12.9018 29.1654 15.5C29.1654 18.0981 27.0591 20.2044 24.461 20.2044L24.4587 20.2067Z"
          />
        </svg>
        <svg className="rhm__caret" width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      <div className="rhm__panel">
        <div className="rhm__inner">
          <div>
            <p className="rhm__title">{t.features.title}</p>
            <ul className="rhm__grid">
              {t.features.items.map((x, i) => (
                <li key={x.t}>
                  <a className="rhm__item" href={to(featHash(FEAT_STEP[i]))} target="_blank" rel="noopener">
                    <Ico d={FEAT_ICONS[i]} />
                    <b>{x.t}</b>
                    <span>{x.d}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="rhm__side">
            <p className="rhm__title">{t.tools.title}</p>
            <ul className="rhm__list">
              {t.tools.items.map((x, i) => (
                <li key={x.t}>
                  <a className={i === AI_TOOL ? "rhm__item is-ai" : "rhm__item"} href={to(x.href)} target="_blank" rel="noopener">
                    <Ico d={TOOL_ICONS[i]} />
                    <b>
                      {x.t}
                      {i === SOON_TOOL && <em className="rhm__soon">{t.soon}</em>}
                    </b>
                    <span>{x.d}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
}

function Ico({ d }: { d: string }) {
  return (
    <svg className="rhm__ico" viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
