"use client";

import { localeOrigin, type Locale } from "@/i18n/config";
import { messages } from "../../../components/header/header.i18n";
import { AI_TOOL, FEAT_ICONS, FEAT_STEP, SOON_TOOL, TOOL_ICONS, featHash } from "../../../components/header/menu-icons";
import { robohubHome } from "../../lib/links";

// Academy header'idagi "Imkoniyatlar" — Robohub landingi header'idagi panelning o'zi (matn va ikonkalar o'sha yerdan).
// Nomdan keyin Robohub belgisi. Har band Robohub saytiga olib boradi (yangi oynada): "#features" kabi bo'limlar
// landingning o'sha bo'limiga, kalkulyator / AI studio — o'z sahifasiga. Ochilish — CSS (:hover / :focus-within), academy.css.
export default function RobohubMenu({ locale }: { locale: Locale }) {
  const t = messages[locale] ?? messages.uz;
  const home = robohubHome(locale);
  // Academy o'z subdomenida — bosh saytdagi sahifalar (kalkulyator …) to'liq manzil bilan
  const to = (href: string) => (href.startsWith("#") ? `${home}${href}` : href.startsWith("/") ? `${localeOrigin(locale)}${href}` : href);
  const label = t.nav.find((n) => n.menu === "features")?.label ?? t.features.title;
  return (
    <li className="ac-nav__rh">
      <a href={to("#features")} target="_blank" rel="noopener" className="ac-nav__link ac-nav__rh-link">
        {label}
        {/* Robohub belgisi — matndan o'ngda, fonsiz */}
        <span className="ac-nav__rh-chip" aria-hidden="true">
        <svg className="ac-nav__rh-mark" viewBox="0 7.97 33.8675 15.06" width="24" height="11">
          <path
            fill="currentColor"
            d="M26.3414 7.97623H7.5261C3.37004 7.97623 0 11.3439 0 15.5C0 19.656 3.37004 23.0261 7.5261 23.0261H26.3414C30.4974 23.0261 33.8675 19.656 33.8675 15.5C33.8675 11.3439 30.4974 7.97388 26.3414 7.97388V7.97623ZM24.4587 20.2067C23.1031 20.2067 21.8841 19.6325 21.0251 18.7147C20.0131 17.6039 18.5564 16.9097 16.9349 16.9097C15.3134 16.9097 13.8543 17.6039 12.8424 18.717C11.9834 19.6325 10.7644 20.2067 9.4088 20.2067C6.81068 20.2067 4.7044 18.1005 4.7044 15.5023C4.7044 12.9042 6.81068 10.7979 9.4088 10.7979C10.7644 10.7979 11.9834 11.3722 12.8424 12.2876C13.8543 13.3984 15.3111 14.0927 16.9349 14.0927C18.5564 14.0927 20.0155 13.3984 21.0274 12.2853C21.8864 11.3698 23.1055 10.7956 24.461 10.7956C27.0591 10.7956 29.1654 12.9018 29.1654 15.5C29.1654 18.0981 27.0591 20.2044 24.461 20.2044L24.4587 20.2067Z"
          />
        </svg>
        </span>
        <svg className="ac-nav__caret" width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      <div className="ac-rmega">
        <div className="ac-rmega__inner">
          <div>
            <p className="ac-rmega__title">{t.features.title}</p>
            <ul className="ac-rmega__grid">
              {t.features.items.map((x, i) => (
                <li key={x.t}>
                  <a className="ac-rmega__link" href={to(featHash(FEAT_STEP[i]))} target="_blank" rel="noopener">
                    <Ico d={FEAT_ICONS[i]} />
                    <b>{x.t}</b>
                    <span>{x.d}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="ac-rmega__side">
            <p className="ac-rmega__title">{t.tools.title}</p>
            <ul className="ac-rmega__list">
              {t.tools.items.map((x, i) => (
                <li key={x.t}>
                  <a className={i === AI_TOOL ? "ac-rmega__link is-ai" : "ac-rmega__link"} href={to(x.href)} target="_blank" rel="noopener">
                    <Ico d={TOOL_ICONS[i]} />
                    <b>
                      {x.t}
                      {i === SOON_TOOL && <em className="menu-soon">{t.soon}</em>}
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
    <svg className="ac-rmega__ico" viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
