import type { CSSProperties } from "react";
import BepulVositalarScript from "./bepul-vositalar-script";

export default function BepulVositalar() {
  return (
    <>
      <section className="tools" id="bepul-vositalar" data-theme="brand" aria-labelledby="tools-title">
        <div className="container">
          <p className="tools__eyebrow" data-sr="">Bepul vositalar</p>{" "}
          {/* Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi */}{" "}
          <h2 className="tools__title" id="tools-title" data-sr="" style={{ "--d": "80ms" } as CSSProperties}>
            <span>Avval sinab ko‘ring.</span>{" "}
            <span className="accent">Keyin qaror qilasiz.</span>
          </h2>{" "}
          <div className="tools__grid">
            {/* ===== 1) Marketpleys kalkulyatori ===== */}{" "}
            <article className="tool" data-sr="" style={{ "--d": "120ms" } as CSSProperties}>
              <div className="tool__head">
                <div>
                  <h3 className="tool__name">Marketpleys kalkulyatori</h3>{" "}
                  <p className="tool__desc">Sotuvdan qancha foyda qoladi? Roʻyxatsiz, bepul.</p>
                </div>{" "}
                <a className="tool__go" href="/calculator/">
                  {"Oʻtish "}
                  <span className="arrow" aria-hidden="true">→</span>
                </a>
              </div>{" "}
              {/* Interfeys yozuvlari haqiqiy kalkulyatordan olingan.
             NAMUNA HISOB: komissiya shartli 15% deb olingan, haqiqiy tarif emas —
             aniq komissiya va yetkazib berish narxi kalkulyatorning o'zida hisoblanadi. */}{" "}
              <div className="win win--calc" data-theme="light">
                <div className="win__bar" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <span>Kalkulyator</span>
                </div>{" "}
                <p className="calc__mps" aria-hidden="true">
                  <span className="is-on">
                    <img className="mp-ico" src="/marketplaces/uzum.svg" alt="" width="16" height="16" />
                    Uzum Market
                  </span>{" "}
                  <span>
                    <img className="mp-ico" src="/marketplaces/yandex.svg" alt="" width="16" height="16" />
                    Yandex Market
                  </span>{" "}
                  <span>
                    <img className="mp-ico" src="/marketplaces/wildberries.svg" alt="" width="16" height="16" />
                    Wildberries
                  </span>{" "}
                  <span>
                    <img className="mp-ico" src="/marketplaces/ozon.svg" alt="" width="16" height="16" />
                    Ozon
                  </span>
                </p>{" "}
                <div className="calc" id="calc">
                  <div className="calc__form">
                    <p className="calc__step">
                      <b>1</b>
                      Qaysi mahsulot?
                    </p>{" "}
                    <label className="fld">
                      <span>Mahsulot nomi</span>{" "}
                      <span className="fld__box">
                        <input id="calc-name" type="text" defaultValue="Termos 500 ml" placeholder="Mahsulot nomini kiriting" autoComplete="off" />
                      </span>
                    </label>{" "}
                    <div className="fld" id="calc-catbox">
                      <span>Kategoriya</span>{" "}
                      <p className="calc__ai">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 2l1.9 5.6a3 3 0 0 0 1.9 1.9L21.4 11.4a.6.6 0 0 1 0 1.2l-5.6 1.9a3 3 0 0 0-1.9 1.9L12 22l-1.9-5.6a3 3 0 0 0-1.9-1.9L2.6 12.6a.6.6 0 0 1 0-1.2l5.6-1.9a3 3 0 0 0 1.9-1.9L12 2z" />
                        </svg>
                        {" AI tavsiyasi "}
                      </p>{" "}
                      <span className="calc__cat">{"Uy-roʻzgʻor buyumlari > Oshxona buyumlari > Termo…"}</span>
                    </div>{" "}
                    <p className="calc__step">
                      <b>2</b>
                      Narxlar
                    </p>{" "}
                    <div className="calc__pair">
                      <label className="fld">
                        <span>Tannarx</span>{" "}
                        <span className="fld__box">
                          <input id="calc-cost" type="text" inputMode="numeric" defaultValue="95 000" placeholder="Tannarx" autoComplete="off" />
                          <i>soʻm</i>
                        </span>{" "}
                        <input className="calc__range" id="calc-cost-r" type="range" min="0" max="400000" step="1000" defaultValue="95000" aria-label="Tannarx" />
                      </label>{" "}
                      <label className="fld">
                        <span>Narx</span>{" "}
                        <span className="fld__box">
                          <input id="calc-price" type="text" inputMode="numeric" defaultValue="189 000" placeholder="Narx" autoComplete="off" />
                          <i>soʻm</i>
                        </span>{" "}
                        <input className="calc__range" id="calc-price-r" type="range" min="0" max="500000" step="1000" defaultValue="189000" aria-label="Narx" />
                      </label>
                    </div>
                  </div>{" "}
                  <div className="calc__res" aria-live="polite">
                    <p className="calc__res-title">Hisob-kitob</p>{" "}
                    <div className="calc__card">
                      <p className="calc__q">Bitta sotuvdan qancha qoladi?</p>{" "}
                      <p className="calc__sum">
                        <b id="calc-left">65 650</b>
                        <span id="calc-unit">soʻm</span>
                      </p>{" "}
                      <div className="calc__bar" id="calc-bar" aria-hidden="true">
                        <i className="is-fee" />
                        <i className="is-cost" />
                        <i className="is-left" />
                      </div>{" "}
                      <p className="calc__kpis">
                        <span>
                          {"Marja "}
                          <b id="calc-margin">34,7%</b>
                        </span>
                        <span>
                          {"ROI "}
                          <b id="calc-roi">69,1%</b>
                        </span>
                      </p>
                    </div>{" "}
                    <div className="calc__detail">
                      <h4>Batafsil hisob</h4>{" "}
                      <ul>
                        <li style={{ "--i": "0" } as CSSProperties}>
                          <span>Xaridor toʻlaydi</span>
                          <b id="calc-r-price">189 000 soʻm</b>
                        </li>{" "}
                        <li style={{ "--i": "1" } as CSSProperties}>
                          <span>Marketpleys komissiyasi</span>
                          <b id="calc-r-fee">− 28 350 soʻm</b>
                        </li>{" "}
                        <li className="is-total" style={{ "--i": "2" } as CSSProperties}>
                          <span>Hisobingizga tushadi</span>
                          <b id="calc-r-pay">160 650 soʻm</b>
                        </li>{" "}
                        <li style={{ "--i": "3" } as CSSProperties}>
                          <span>Mahsulot tannarxi</span>
                          <b id="calc-r-cost">− 95 000 soʻm</b>
                        </li>
                      </ul>
                    </div>{" "}
                    <p className="calc__foot">Saqlash, qaytarishlar va reklama hisobga kirmaydi</p>
                  </div>
                </div>{" "}
                <p className="win__note">Namuna hisob: komissiya 15% deb olingan. Aniq tarif kalkulyatorda.</p>
              </div>
            </article>{" "}
            {/* ===== 2) AI infografika ===== */}{" "}
            <article className="tool" data-sr="" style={{ "--d": "220ms" } as CSSProperties}>
              <div className="tool__head">
                <div>
                  <h3 className="tool__name">AI infografika</h3>{" "}
                  <p className="tool__desc">Mahsulot rasmi ~30 soniyada, 750×1000.</p>
                </div>{" "}
                <a className="tool__go" href="/ai-infografika/">
                  {"Oʻtish "}
                  <span className="arrow" aria-hidden="true">→</span>
                </a>
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
                      Rasm yuklang
                    </li>{" "}
                    <li className="is-done">
                      <b>✓</b>
                      Uslubni tanlang
                    </li>{" "}
                    <li className="is-done">
                      <b>✓</b>
                      Tayyor rasm
                    </li>
                  </ol>{" "}
                  <div className="ai__stage">
                    <figure className="ai__src">
                      <img src="/ai/base_cosmetics.jpg" alt="Yuklangan oddiy mahsulot rasmi: oq banka" width="360" height="480" loading="lazy" />{" "}
                      <figcaption>Sizning rasmingiz</figcaption>
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
                          <img src="/ai/base_cosmetics.jpg" alt="" width="360" height="480" loading="lazy" />{" "}
                          <span className="cmp__tag cmp__tag--l">Sizning rasmingiz</span>{" "}
                          <div className="cmp__after">
                            <img id="cmp-result" src="/ai/cosmetics_composition.jpg" alt="AI tayyorlagan rasm" width="360" height="480" loading="lazy" />{" "}
                            <span className="cmp__tag cmp__tag--r">{" "}
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M12 2l1.9 5.6a3 3 0 0 0 1.9 1.9L21.4 11.4a.6.6 0 0 1 0 1.2l-5.6 1.9a3 3 0 0 0-1.9 1.9L12 22l-1.9-5.6a3 3 0 0 0-1.9-1.9L2.6 12.6a.6.6 0 0 1 0-1.2l5.6-1.9a3 3 0 0 0 1.9-1.9L12 2z" />
                              </svg>
                              {" AI natija "}
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
                                soniya
                              </p>
                            </div>
                          </div>{" "}
                          <span className="cmp__handle" aria-hidden="true" />{" "}
                          <input className="cmp__range" id="cmp-range" type="range" min="0" max="100" defaultValue="0" aria-label="Asl rasm bilan solishtirish" />
                        </div>
                      </div>{" "}
                      <p className="ai__cap" aria-hidden="true">
                        <b>‹ ›</b>
                        Asl rasm bilan solishtirish
                      </p>
                    </div>
                  </div>{" "}
                  <p className="ai__label">Uslubni tanlang</p>{" "}
                  <div className="ai__styles" role="group" aria-label="Uslubni tanlang">
                    <button className="ai__style is-on" type="button" aria-pressed="true" data-img="/ai/cosmetics_composition.jpg">
                      <img src="/ai/cosmetics_composition.jpg" alt="" width="360" height="480" loading="lazy" />
                      <span>Kompozitsiya bilan</span>
                    </button>{" "}
                    <button className="ai__style" type="button" aria-pressed="false" data-img="/ai/cosmetics_in_use.jpg">
                      <img src="/ai/cosmetics_in_use.jpg" alt="" width="360" height="480" loading="lazy" />
                      <span>Ishlatilishda</span>
                    </button>{" "}
                    <button className="ai__style" type="button" aria-pressed="false" data-img="/ai/cosmetics_everyday.jpg">
                      <img src="/ai/cosmetics_everyday.jpg" alt="" width="360" height="480" loading="lazy" />
                      <span>Kundalik sahna</span>
                    </button>{" "}
                    <button className="ai__style" type="button" aria-pressed="false" data-img="/ai/cosmetics_studio.jpg">
                      <img src="/ai/cosmetics_studio.jpg" alt="" width="360" height="480" loading="lazy" />
                      <span>Katalog (studiya)</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
      <BepulVositalarScript />
    </>
  );
}
