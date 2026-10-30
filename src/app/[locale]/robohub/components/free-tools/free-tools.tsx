import type { CSSProperties } from "react";
import { getLocale, getMessages } from "@/i18n/server";
import { localeHref, localeUrl } from "@/i18n/config";
import { aiImage } from "@/lib/ai-images";
import FreeToolsScript from "./free-tools-script";
import { messages } from "./free-tools.i18n";

// Namuna sonlarni joriy til formatida chiqarish (95 000 / 95,000)
function fmt(n: number, group: string) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, group);
}

export default async function FreeTools() {
  const locale = await getLocale();
  // infografika — joriy tildagi yozuvlar bilan (src/lib/ai-images.ts)
  const phoneInfographic = aiImage("phone", locale);
  const t = await getMessages(messages);
  const c = t.calc;
  const g = t.script.group;
  const cur = t.script.currency;
  return (
    <>
      <section className="tools" id="free-tools" data-theme="brand" aria-labelledby="tools-title">
        <div className="container">
          <div className="tools__head">
            <h2 className="tools__title" id="tools-title" data-sr="" style={{ "--d": "80ms" } as CSSProperties}>
              {t.title}
            </h2>
            <p className="tools__lead" data-sr="" style={{ "--d": "120ms" } as CSSProperties}>
              {t.lead}
            </p>
          </div>{" "}
          <div className="tools__grid">
            {/* ===== 1) Marketpleys kalkulyatori ===== */}{" "}
            <article className="tool" data-sr="" style={{ "--d": "120ms" } as CSSProperties}>
              <div className="tool__head">
                <div>
                  <h3 className="tool__name">
                    {/* Robohub belgisi — nom oldida */}
                    <svg className="tool__by" viewBox="0 0 33.8675 15.06" aria-hidden="true">
                      <use href="#rh-mark" />
                    </svg>
                    {c.name}
                  </h3>{" "}
                  <p className="tool__desc">{c.desc}</p>
                </div>
              </div>{" "}
              {/* Interfeys yozuvlari haqiqiy kalkulyatordan olingan.
             NAMUNA HISOB: komissiya shartli 15% deb olingan, haqiqiy tarif emas —
             aniq komissiya va yetkazib berish narxi kalkulyatorning o'zida hisoblanadi. */}{" "}
              <div className="win win--calc" data-theme="light">
                <div className="win__bar" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <span>{c.win}</span>
                </div>{" "}
                <p className="calc__mps" aria-hidden="true">
                  <span className="is-on">
                    <img loading="lazy" decoding="async" className="mp-ico" src="/marketplaces/uzum.svg" alt="" width="16" height="16" />
                    Uzum Market
                  </span>{" "}
                  <span>
                    <img loading="lazy" decoding="async" className="mp-ico" src="/marketplaces/yandex.svg" alt="" width="16" height="16" />
                    Yandex Market
                  </span>{" "}
                  <span>
                    <img loading="lazy" decoding="async" className="mp-ico" src="/marketplaces/wildberries.svg" alt="" width="16" height="16" />
                    Wildberries
                  </span>{" "}
                  <span>
                    <img loading="lazy" decoding="async" className="mp-ico" src="/marketplaces/ozon.svg" alt="" width="16" height="16" />
                    Ozon
                  </span>
                </p>{" "}
                <div className="calc" id="calc">
                  <div className="calc__form">
                    <p className="calc__step calc__opt">
                      <b>1</b>
                      {c.step1}
                    </p>{" "}
                    <label className="fld calc__opt">
                      <span>{c.productLabel}</span>{" "}
                      <span className="fld__box">
                        <input id="calc-name" type="text" defaultValue={c.productValue} placeholder={c.productPlaceholder} autoComplete="off" />
                      </span>
                    </label>{" "}
                    <div className="fld calc__opt" id="calc-catbox">
                      <span>{c.category}</span>{" "}
                      <p className="calc__ai">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 2l1.9 5.6a3 3 0 0 0 1.9 1.9L21.4 11.4a.6.6 0 0 1 0 1.2l-5.6 1.9a3 3 0 0 0-1.9 1.9L12 22l-1.9-5.6a3 3 0 0 0-1.9-1.9L2.6 12.6a.6.6 0 0 1 0-1.2l5.6-1.9a3 3 0 0 0 1.9-1.9L12 2z" />
                        </svg>
                        {` ${c.aiHint} `}
                      </p>{" "}
                      <span className="calc__cat">{c.categoryPath}</span>
                    </div>{" "}
                    <p className="calc__step">
                      <b>2</b>
                      {c.step2}
                    </p>{" "}
                    <div className="calc__pair">
                      <label className="fld">
                        <span>{c.cost}</span>{" "}
                        <span className="fld__box">
                          <input id="calc-cost" type="text" inputMode="numeric" defaultValue={fmt(95000, g)} placeholder={c.costPlaceholder} autoComplete="off" />
                          <i>{cur}</i>
                        </span>{" "}
                        <input className="calc__range" id="calc-cost-r" type="range" min="0" max="400000" step="1000" defaultValue="95000" aria-label={c.cost} />
                      </label>{" "}
                      <label className="fld">
                        <span>{c.price}</span>{" "}
                        <span className="fld__box">
                          <input id="calc-price" type="text" inputMode="numeric" defaultValue={fmt(189000, g)} placeholder={c.price} autoComplete="off" />
                          <i>{cur}</i>
                        </span>{" "}
                        <input className="calc__range" id="calc-price-r" type="range" min="0" max="500000" step="1000" defaultValue="189000" aria-label={c.price} />
                      </label>
                    </div>{" "}
                    {/* 3-qadam: ish modeli — yetkazib berish narxiga ta'sir qiladi (free-tools.script.js → LOG) */}
                    <p className="calc__step">
                      <b>3</b>
                      {c.step3}
                    </p>{" "}
                    <div className="calc__models" id="calc-models" role="radiogroup" aria-label={c.step3}>
                      {c.models.map((m, i) => (
                        <button key={m.id} type="button" role="radio" aria-checked={i === 0} data-model={m.id}>
                          <b>{m.name}</b>
                          <small>{m.desc}</small>
                        </button>
                      ))}
                    </div>{" "}
                    {/* 4-qadam: soliq va boshqa xarajatlar — ixtiyoriy, hisobga darhol qo'shiladi */}
                    <p className="calc__step calc__opt">
                      <b>4</b>
                      <span>
                        {c.step4}
                        <small>{c.step4Hint}</small>
                      </span>
                    </p>{" "}
                    <div className="calc__pair calc__opt">
                      <label className="fld">
                        <span>{c.tax}</span>{" "}
                        <span className="fld__box">
                          <input id="calc-tax" type="text" inputMode="decimal" placeholder="0" autoComplete="off" />
                          <i>%</i>
                        </span>
                      </label>{" "}
                      <label className="fld">
                        <span>{c.extra}</span>{" "}
                        <span className="fld__box">
                          <input id="calc-extra" type="text" inputMode="numeric" placeholder="0" autoComplete="off" />
                          <i>{cur}</i>
                        </span>
                      </label>
                    </div>{" "}
                    {/* demoga tegilgach chiqadi (free-tools.script.js → .calc.is-touched): to'liq kalkulyatorga, yangi oynada */}
                    <a className="calc__go" href={localeHref(locale, "/calculator")} target="_blank" rel="noopener" tabIndex={-1}>
                      {c.calcBtn}
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>{" "}
                  <div className="calc__res" aria-live="polite">
                    <p className="calc__res-title">{c.resTitle}</p>{" "}
                    <div className="calc__card">
                      <p className="calc__q">{c.question}</p>{" "}
                      <p className="calc__sum">
                        <b id="calc-left">{fmt(60400, g)}</b>
                        <span id="calc-unit">{cur}</span>
                      </p>{" "}
                      <p className="calc__kpis">
                        <span>
                          {`${c.margin} `}
                          <b id="calc-margin">{`32${t.script.decimal}0%`}</b>
                        </span>
                        <span>
                          {`${c.roi} `}
                          <b id="calc-roi">{`63${t.script.decimal}6%`}</b>
                        </span>
                        <span>
                          {`${c.breakeven} `}
                          <b id="calc-be">{fmt(117942, g)}</b>
                        </span>
                      </p>
                    </div>{" "}
                    {/* xaridor to'lagan narx: komissiya, yetkazish, tannarx va foydaga qanday bo'linadi */}
                    <div className="calc__where">
                      <h4>{c.where}</h4>
                      <div className="calc__bar" id="calc-bar" aria-hidden="true">
                        <i className="is-fee" />
                        <i className="is-log" />
                        <i className="is-tax" />
                        <i className="is-cost" />
                        <i className="is-left" />
                      </div>
                      <ul>
                        <li className="is-fee">
                          <span>{c.toMp}</span>
                          <em id="calc-w-fee-p">15%</em>
                          <b id="calc-w-fee">{fmt(28350, g)}</b>
                        </li>
                        <li className="is-log">
                          <span>{c.toLog}</span>
                          <em id="calc-w-log-p">3%</em>
                          <b id="calc-w-log">{fmt(5250, g)}</b>
                        </li>
                        <li className="is-tax">
                          <span>{c.toTax}</span>
                          <em id="calc-w-tax-p">0%</em>
                          <b id="calc-w-tax">0</b>
                        </li>
                        <li className="is-cost">
                          <span>{c.toCost}</span>
                          <em id="calc-w-cost-p">50%</em>
                          <b id="calc-w-cost">{fmt(95000, g)}</b>
                        </li>
                        <li className="is-left">
                          <span>{c.toYou}</span>
                          <em id="calc-w-left-p">32%</em>
                          <b id="calc-w-left">{fmt(60400, g)}</b>
                        </li>
                      </ul>
                    </div>{" "}
                    <div className="calc__detail calc__opt">
                      <h4>{c.detail}</h4>{" "}
                      <ul>
                        <li style={{ "--i": "0" } as CSSProperties}>
                          <span>{c.buyerPays}</span>
                          <b id="calc-r-price">{`${fmt(189000, g)} ${cur}`}</b>
                        </li>{" "}
                        <li style={{ "--i": "1" } as CSSProperties}>
                          <span>{c.fee}</span>
                          <b id="calc-r-fee">{`− ${fmt(28350, g)} ${cur}`}</b>
                        </li>{" "}
                        <li style={{ "--i": "2" } as CSSProperties}>
                          <span>{c.logistics}</span>
                          <b id="calc-r-log">{`− ${fmt(5250, g)} ${cur}`}</b>
                        </li>{" "}
                        <li className="is-total" style={{ "--i": "3" } as CSSProperties}>
                          <span>{c.payout}</span>
                          <b id="calc-r-pay">{`${fmt(155400, g)} ${cur}`}</b>
                        </li>{" "}
                        <li style={{ "--i": "4" } as CSSProperties}>
                          <span>{c.taxRow}</span>
                          <b id="calc-r-tax">{`0 ${cur}`}</b>
                        </li>{" "}
                        <li style={{ "--i": "5" } as CSSProperties}>
                          <span>{c.productCost}</span>
                          <b id="calc-r-cost">{`− ${fmt(95000, g)} ${cur}`}</b>
                        </li>
                      </ul>
                    </div>{" "}
                    <p className="calc__foot calc__opt">{c.foot}</p>
                  </div>
                </div>{" "}
                <p className="win__note">{c.note}</p>
              </div>
              {/* tugma oyna ostida; vosita yangi oynada ochiladi (nisbiy — shu domendagi sahifa, joriy tilda) */}
              <a className="tool__go" href={localeHref(locale, "/calculator")} target="_blank" rel="noopener">
                {`${c.go} `}
                <span className="arrow" aria-hidden="true">→</span>
              </a>
            </article>{" "}
            {/* ===== 2) AI infografika ===== */}{" "}
            <article className="tool" data-sr="" style={{ "--d": "220ms" } as CSSProperties}>
              <div className="tool__head">
                <div>
                  <h3 className="tool__name">
                    <span className="tool__ai-ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9zM18.5 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
                      </svg>
                    </span>
                    <span className="tool__ai">{t.ai.name}</span>
                  </h3>{" "}
                  <p className="tool__desc">{t.ai.desc}</p>
                </div>
              </div>{" "}
              {/* Rasmlar va uslub nomlari haqiqiy AI infografika sahifasidan (public/ai/) */}{" "}
              <div className="win win--ai" data-theme="dark">
                <div className="win__bar" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <span>AI studio</span>
                </div>{" "}
                <div className="ai" id="ai">
                  <ol className="ai__steps" aria-hidden="true">
                    <li className="is-done">
                      <b>✓</b>
                      {t.ai.steps[0]}
                    </li>{" "}
                    <li className="is-done">
                      <b>✓</b>
                      {t.ai.steps[1]}
                    </li>{" "}
                    <li className="is-done">
                      <b>✓</b>
                      {t.ai.steps[2]}
                    </li>
                  </ol>{" "}
                  <div className="ai__stage">
                    <figure className="ai__src">
                      <img src="/ai/old-iphone.jpg" alt={t.ai.srcAlt} width="360" height="480" loading="lazy" />{" "}
                      <figcaption>{t.ai.yourPhoto}</figcaption>
                    </figure>{" "}
                    <span className="ai__arrow" aria-hidden="true">{" "}
                      <svg viewBox="0 0 60 34" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 5c8 20 26 26 50 18" />
                        <path d="M44 14l10 9-12 6" />
                      </svg>{" "}
                    </span>{" "}
                    <div className="ai__frame">
                      <div className="ai__shot">
                        <span className="ai__ring" aria-hidden="true" />{" "}
                        <div className="cmp" id="cmp">
                          <img src="/ai/old-iphone.jpg" alt="" width="360" height="480" loading="lazy" />{" "}
                          <span className="cmp__tag cmp__tag--l">{t.ai.yourPhoto}</span>{" "}
                          <div className="cmp__after">
                            <img id="cmp-result" src="/ai/iphone1.webp" alt={t.ai.resultAlt} width="360" height="480" loading="lazy" />{" "}
                            <span className="cmp__tag cmp__tag--r">{" "}
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M12 2l1.9 5.6a3 3 0 0 0 1.9 1.9L21.4 11.4a.6.6 0 0 1 0 1.2l-5.6 1.9a3 3 0 0 0-1.9 1.9L12 22l-1.9-5.6a3 3 0 0 0-1.9-1.9L2.6 12.6a.6.6 0 0 1 0-1.2l5.6-1.9a3 3 0 0 0 1.9-1.9L12 2z" />
                              </svg>
                              {` ${t.ai.resultTag} `}
                            </span>{" "}
                            <span className="cmp__size">750×1000</span>
                          </div>{" "}
                          <div className="cmp__gen" aria-hidden="true">
                            <div className="cmp__timer" id="cmp-timer">
                              <svg viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="15.9" pathLength="100" />
                                <circle cx="18" cy="18" r="15.9" pathLength="100" />
                              </svg>{" "}
                              <p>
                                <b id="cmp-count">30</b>
                                {t.ai.seconds}
                              </p>
                            </div>
                          </div>{" "}
                          <span className="cmp__handle" aria-hidden="true" />{" "}
                          <input className="cmp__range" id="cmp-range" type="range" min="0" max="100" defaultValue="0" aria-label={t.ai.compare} />
                        </div>
                      </div>{" "}
                      <p className="ai__cap" aria-hidden="true">
                        <b>‹ ›</b>
                        {t.ai.compare}
                      </p>
                    </div>
                  </div>{" "}
                  <p className="ai__label">{t.ai.chooseStyle}</p>{" "}
                  <div className="ai__styles" role="group" aria-label={t.ai.chooseStyle}>
                    <button className="ai__style is-on" type="button" aria-pressed="true" data-img="/ai/iphone1.webp">
                      <img src="/ai/iphone1.webp" alt="" width="360" height="480" loading="lazy" />
                      <span>{t.ai.styles[0]}</span>
                    </button>{" "}
                    <button className="ai__style" type="button" aria-pressed="false" data-img="/ai/iphone3.webp">
                      <img src="/ai/iphone3.webp" alt="" width="360" height="480" loading="lazy" />
                      <span>{t.ai.styles[1]}</span>
                    </button>{" "}
                    <button className="ai__style" type="button" aria-pressed="false" data-img="/ai/iphone4.webp">
                      <img src="/ai/iphone4.webp" alt="" width="360" height="480" loading="lazy" />
                      <span>{t.ai.styles[2]}</span>
                    </button>{" "}
                    <button className="ai__style" type="button" aria-pressed="false" data-img={phoneInfographic}>
                      <img src={phoneInfographic} alt="" width="360" height="480" loading="lazy" />
                      <span>{t.ai.styles[3]}</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* tugma oyna ostida; vosita yangi oynada ochiladi (nisbiy — shu domendagi sahifa, joriy tilda) */}
              <a className="tool__go" href={localeUrl(locale, "/aistudio")} target="_blank" rel="noopener">
                {`${t.ai.go} `}
                <span className="arrow" aria-hidden="true">→</span>
              </a>
            </article>
          </div>
        </div>
      </section>
      <FreeToolsScript t={t.script} />
    </>
  );
}
