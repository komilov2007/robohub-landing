import type { CSSProperties } from "react";
import HeroScript from "./hero-script";
import HeroVideo from "./hero-video";

export default function Hero() {
  return (
    <>
      <section className="hero" id="hero" data-theme="light" aria-labelledby="hero-title">
        <div className="container hero__grid">
          <div className="hero__text">
            <h1 className="hero__title" id="hero-title">
              <span className="w" style={{ "--d": "80ms" } as CSSProperties}>Uzum,</span>{" "}
              <span className="w" style={{ "--d": "140ms" } as CSSProperties}>Wildberries,</span>{" "}
              <span className="w" style={{ "--d": "200ms" } as CSSProperties}>Ozon</span>{" "}
              <span className="w" style={{ "--d": "260ms" } as CSSProperties}>va</span>{" "}
              <span className="w" style={{ "--d": "320ms" } as CSSProperties}>Yandex</span>{" "}
              <span className="accent">{" "}
                <span className="w" style={{ "--d": "400ms" } as CSSProperties}>bitta</span>{" "}
                <span className="w" style={{ "--d": "460ms" } as CSSProperties}>kabinetda</span>{" "}
              </span>
            </h1>{" "}
            <p className="hero__lead reveal" style={{ "--d": "560ms" } as CSSProperties}>Buyurtma, qoldiq va foydani bir joydan boshqaring.</p>{" "}
            <ul className="hero__facts reveal" style={{ "--d": "660ms" } as CSSProperties}>
              <li>
                <span className="hero__mps" aria-hidden="true">{" "}
                  <img className="mp-ico" src="/marketplaces/uzum.svg" alt="" width="22" height="22" style={{ "--d": "760ms" } as CSSProperties} />{" "}
                  <img className="mp-ico" src="/marketplaces/wildberries.svg" alt="" width="22" height="22" style={{ "--d": "820ms" } as CSSProperties} />{" "}
                  <img className="mp-ico" src="/marketplaces/ozon.svg" alt="" width="22" height="22" style={{ "--d": "880ms" } as CSSProperties} />{" "}
                  <img className="mp-ico" src="/marketplaces/yandex.svg" alt="" width="22" height="22" style={{ "--d": "940ms" } as CSSProperties} />{" "}
                </span>
                {" 4 marketpleys "}
              </li>{" "}
              <li>10+ integratsiya</li>{" "}
              <li>AI yordamchi</li>
            </ul>{" "}
            <div className="hero__cta reveal" style={{ "--d": "760ms" } as CSSProperties}>
              <a className="btn btn--lg btn--primary" href="#boshlash">
                {" Hoziroq boshlash "}
                <span className="arrow" aria-hidden="true">→</span>
              </a>{" "}
              {/* ikkinchi tugma — video: bosilganda oynada ochiladi */}
              <HeroVideo />
            </div>
          </div>{" "}
          {/* Maket haqiqiy Robohub dashboardi skrinshoti asosida chizilgan (tuzilishi va bo'limlari o'sha).
         NAMUNA MA'LUMOT: barcha qiymatlar shartli — haqiqiy skrinshotda ko'rsatkichlar bo'sh (0) edi. */}{" "}
          <div className="hero__visual">
            <div className="hero__frame">
              <div className="hero__bar" aria-hidden="true">
                <i />
                <i />
                <i />
                <span>robohub.uz</span>
              </div>{" "}
              <div className="hero__clip">
                <div className="dash" id="dash" role="img" aria-label="Robohub dashboardi: GMV, buyurtmalar, marja, qaytarishlar va oʻrtacha koʻrsatkichlar bitta ekranda (namuna)">
                  <div className="dash__side">
                    <svg className="dash__logo" viewBox="0 0 127 31">
                      <use href="#rh-logo" />
                    </svg>{" "}
                    <div className="dash__shoprow">
                      <div className="dash__shop">
                        <span>Doʻkonim</span>
                        <i />
                      </div>
                      <div className="dash__plus">
                        <span>+</span>
                      </div>
                    </div>{" "}
                    <div className="dash__nav is-on">
                      <span>Dashboard</span>
                      <b>BETA</b>
                    </div>{" "}
                    <div className="dash__nav">
                      <span>Buyurtmalar</span>
                    </div>{" "}
                    <div className="dash__nav">
                      <span>FBO taʼminlash</span>
                    </div>{" "}
                    <div className="dash__nav">
                      <span>Tovarlar</span>
                    </div>{" "}
                    <div className="dash__nav">
                      <span>Ombor</span>
                    </div>{" "}
                    <div className="dash__nav">
                      <span>Marketing</span>
                    </div>{" "}
                    <div className="dash__nav">
                      <span>Analitika</span>
                    </div>{" "}
                    <div className="dash__nav">
                      <span>AI studiya</span>
                    </div>{" "}
                    <div className="dash__nav">
                      <span>Integratsiya</span>
                    </div>{" "}
                    <div className="dash__nav">
                      <span>Mijozlar bilan muloqot</span>
                    </div>{" "}
                    <div className="dash__nav">
                      <span>Hujjatlar</span>
                      <b>BETA</b>
                    </div>{" "}
                    <div className="dash__user">
                      <b>Robohub Demo</b>
                      <span>demo@robohub.uz</span>
                    </div>
                  </div>{" "}
                  <div className="dash__main">
                    <div className="dash__top">
                      <h3>Dashboard</h3>{" "}
                      <div className="dash__tab is-on">
                        <span>Barchasi</span>
                      </div>{" "}
                      <div className="dash__tab">
                        <img className="mp-ico" src="/marketplaces/wildberries.svg" alt="" />
                        <span>Wildberries</span>
                      </div>{" "}
                      <div className="dash__btn">
                        <span>Analitika qoʻllanmasi</span>
                      </div>{" "}
                      <div className="dash__btn">
                        <span>Tannarxni yuklash</span>
                      </div>{" "}
                      <div className="dash__date">
                        <span>13/09/2026 — 12/10/2026</span>
                      </div>
                    </div>{" "}
                    <div className="dash__body">
                      <div className="dash__period">
                        <div className="dash__chip is-cur">
                          <span>
                            {"JORIY "}
                            <b>2026-09-13 → 2026-10-12</b>
                          </span>
                        </div>{" "}
                        <div className="dash__chip">
                          <span>
                            {"OLDINGI DAVR "}
                            <b>2026-08-14 → 2026-09-12</b>
                          </span>
                        </div>{" "}
                        <div className="dash__chip">
                          <span>Operatsion xarajatlar</span>
                        </div>
                      </div>{" "}
                      <div className="dash__panel">
                        <p className="dash__panel-h">
                          <b>KPI xulosa</b>
                          <span>Umumiy koʻrsatkichlar vs. oldingi davr</span>
                        </p>{" "}
                        <div className="dash__groups">
                          <div className="kpi-g kpi-g--blue">
                            <p className="kpi-g__t">GMV · Buyurtmalar · Sotuvlar · Xarajatlar</p>{" "}
                            <div className="kpi-g__grid">
                              <div className="kpi-c" style={{ "--k": "0" } as CSSProperties}>
                                <p className="kpi-c__l">
                                  <i>
                                    <svg viewBox="0 0 24 24">
                                      <path d="M4 16l5-5 4 4 7-8" />
                                    </svg>
                                  </i>
                                  Yalpi GMV
                                </p>
                                <b className="kpi-c__v" data-n="48600000" data-suf=" UZS" data-key="gmv">48 600 000 UZS</b>
                                <span className="kpi-c__s">+12,4% · oldingi</span>
                              </div>{" "}
                              <div className="kpi-c kpi-c--blue" style={{ "--k": "1" } as CSSProperties}>
                                <p className="kpi-c__l">
                                  <i>
                                    <svg viewBox="0 0 24 24">
                                      <path d="M4 16l5-5 4 4 7-8" />
                                    </svg>
                                  </i>
                                  Sof GMV
                                </p>
                                <b className="kpi-c__v" data-n="41250000" data-suf=" UZS">41 250 000 UZS</b>
                                <span className="kpi-c__s">+10,8% · oldingi</span>
                              </div>{" "}
                              <div className="kpi-c" style={{ "--k": "2" } as CSSProperties}>
                                <p className="kpi-c__l">
                                  <i>
                                    <svg viewBox="0 0 24 24">
                                      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />
                                    </svg>
                                  </i>
                                  Yalpi buyurtmalar
                                </p>
                                <b className="kpi-c__v" data-n="342" data-suf="" data-key="orders">342</b>
                                <span className="kpi-c__s">+9,2% · oldingi</span>
                              </div>{" "}
                              <div className="kpi-c" style={{ "--k": "3" } as CSSProperties}>
                                <p className="kpi-c__l">
                                  <i>
                                    <svg viewBox="0 0 24 24">
                                      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />
                                    </svg>
                                  </i>
                                  Sof buyurtmalar
                                </p>
                                <b className="kpi-c__v" data-n="296" data-suf="">296</b>
                                <span className="kpi-c__s">+8,1% · oldingi</span>
                              </div>{" "}
                              <div className="kpi-c" style={{ "--k": "4" } as CSSProperties}>
                                <p className="kpi-c__l">
                                  <i>
                                    <svg viewBox="0 0 24 24">
                                      <path d="M6 18L18 6" />
                                      <circle cx="7.5" cy="7.5" r="2" />
                                      <circle cx="16.5" cy="16.5" r="2" />
                                    </svg>
                                  </i>
                                  Sof buyurtmalar ulushi
                                </p>
                                <b className="kpi-c__v" data-n="86.5" data-suf="%">86,5%</b>
                                <span className="kpi-c__s">+1,2% · oldingi</span>
                              </div>{" "}
                              <div className="kpi-c" style={{ "--k": "5" } as CSSProperties}>
                                <p className="kpi-c__l">
                                  <i>
                                    <svg viewBox="0 0 24 24">
                                      <path d="M4 5h2l2 10h9l2-7H8" />
                                    </svg>
                                  </i>
                                  Sotuvlar soni
                                </p>
                                <b className="kpi-c__v" data-n="281" data-suf="">281</b>
                                <span className="kpi-c__s">+7,6% · oldingi</span>
                              </div>{" "}
                              <div className="kpi-c" style={{ "--k": "6" } as CSSProperties}>
                                <p className="kpi-c__l">
                                  <i>
                                    <svg viewBox="0 0 24 24">
                                      <circle cx="12" cy="12" r="8" />
                                      <path d="M12 8v8" />
                                    </svg>
                                  </i>
                                  Xarajatlar summasi (ETR)
                                </p>
                                <b className="kpi-c__v" data-n="9840000" data-suf=" UZS">9 840 000 UZS</b>
                                <span className="kpi-c__s">+4,3% · oldingi</span>
                              </div>{" "}
                              <div className="kpi-c" style={{ "--k": "7" } as CSSProperties}>
                                <p className="kpi-c__l">
                                  <i>
                                    <svg viewBox="0 0 24 24">
                                      <path d="M6 18L18 6" />
                                      <circle cx="7.5" cy="7.5" r="2" />
                                      <circle cx="16.5" cy="16.5" r="2" />
                                    </svg>
                                  </i>
                                  Xarajatlar ulushi (ETR%)
                                </p>
                                <b className="kpi-c__v" data-n="23.9" data-suf="%">23,9%</b>
                                <span className="kpi-c__s">−1,5% · oldingi</span>
                              </div>{" "}
                              <div className="kpi-c kpi-c--blue" style={{ "--k": "8" } as CSSProperties}>
                                <p className="kpi-c__l">
                                  <i>
                                    <svg viewBox="0 0 24 24">
                                      <circle cx="12" cy="12" r="8" />
                                      <path d="M12 8v8" />
                                    </svg>
                                  </i>
                                  Marja
                                </p>
                                <b className="kpi-c__v" data-n="12380000" data-suf=" UZS">12 380 000 UZS</b>
                                <span className="kpi-c__s">+14,2% · oldingi</span>
                              </div>{" "}
                              <div className="kpi-c" style={{ "--k": "9" } as CSSProperties}>
                                <p className="kpi-c__l">
                                  <i>
                                    <svg viewBox="0 0 24 24">
                                      <path d="M6 18L18 6" />
                                      <circle cx="7.5" cy="7.5" r="2" />
                                      <circle cx="16.5" cy="16.5" r="2" />
                                    </svg>
                                  </i>
                                  Marjinallik (marja %)
                                </p>
                                <b className="kpi-c__v" data-n="30" data-suf="%">30,0%</b>
                                <span className="kpi-c__s">+0,9% · oldingi</span>
                              </div>{" "}
                              <div className="kpi-c" style={{ "--k": "10" } as CSSProperties}>
                                <p className="kpi-c__l">
                                  <i>
                                    <svg viewBox="0 0 24 24">
                                      <path d="M4 16l5-5 4 4 7-8" />
                                    </svg>
                                  </i>
                                  ROI
                                </p>
                                <b className="kpi-c__v" data-n="68.4" data-suf="%">68,4%</b>
                                <span className="kpi-c__s">+5,1% · oldingi</span>
                              </div>
                            </div>
                          </div>{" "}
                          <div className="kpi-g kpi-g--red">
                            <p className="kpi-g__t">Qaytarishlar · Bekor qilishlar</p>{" "}
                            <div className="kpi-g__grid">
                              <div className="kpi-c" style={{ "--k": "11" } as CSSProperties}>
                                <p className="kpi-c__l">
                                  <i>
                                    <svg viewBox="0 0 24 24">
                                      <path d="M9 7l-4 4 4 4" />
                                      <path d="M5 11h9a5 5 0 0 1 0 10h-2" />
                                    </svg>
                                  </i>
                                  Qaytarishlar soni
                                </p>
                                <b className="kpi-c__v" data-n="18" data-suf="">18</b>
                                <span className="kpi-c__s">−2 · oldingi</span>
                              </div>{" "}
                              <div className="kpi-c" style={{ "--k": "12" } as CSSProperties}>
                                <p className="kpi-c__l">
                                  <i>
                                    <svg viewBox="0 0 24 24">
                                      <path d="M9 7l-4 4 4 4" />
                                      <path d="M5 11h9a5 5 0 0 1 0 10h-2" />
                                    </svg>
                                  </i>
                                  Qaytarishlar summasi
                                </p>
                                <b className="kpi-c__v" data-n="2150000" data-suf=" UZS">2 150 000 UZS</b>
                                <span className="kpi-c__s">−6,0% · oldingi</span>
                              </div>{" "}
                              <div className="kpi-c kpi-c--pink" style={{ "--k": "13" } as CSSProperties}>
                                <p className="kpi-c__l">
                                  <i>
                                    <svg viewBox="0 0 24 24">
                                      <path d="M9 7l-4 4 4 4" />
                                      <path d="M5 11h9a5 5 0 0 1 0 10h-2" />
                                    </svg>
                                  </i>
                                  Qaytarish ulushi (soni)
                                </p>
                                <b className="kpi-c__v" data-n="5.3" data-suf="%">5,3%</b>
                                <span className="kpi-c__s">−0,8% · oldingi</span>
                              </div>{" "}
                              <div className="kpi-c" style={{ "--k": "14" } as CSSProperties}>
                                <p className="kpi-c__l">
                                  <i>
                                    <svg viewBox="0 0 24 24">
                                      <path d="M9 7l-4 4 4 4" />
                                      <path d="M5 11h9a5 5 0 0 1 0 10h-2" />
                                    </svg>
                                  </i>
                                  Qaytarish ulushi (summa)
                                </p>
                                <b className="kpi-c__v" data-n="4.4" data-suf="%">4,4%</b>
                                <span className="kpi-c__s">−0,5% · oldingi</span>
                              </div>{" "}
                              <div className="kpi-c" style={{ "--k": "15" } as CSSProperties}>
                                <p className="kpi-c__l">
                                  <i>
                                    <svg viewBox="0 0 24 24">
                                      <circle cx="12" cy="12" r="8" />
                                      <path d="M9 9l6 6M15 9l-6 6" />
                                    </svg>
                                  </i>
                                  Bekor qilishlar soni
                                </p>
                                <b className="kpi-c__v" data-n="28" data-suf="">28</b>
                                <span className="kpi-c__s">+3 · oldingi</span>
                              </div>{" "}
                              <div className="kpi-c" style={{ "--k": "16" } as CSSProperties}>
                                <p className="kpi-c__l">
                                  <i>
                                    <svg viewBox="0 0 24 24">
                                      <circle cx="12" cy="12" r="8" />
                                      <path d="M9 9l6 6M15 9l-6 6" />
                                    </svg>
                                  </i>
                                  Bekor qilishlar summasi
                                </p>
                                <b className="kpi-c__v" data-n="5200000" data-suf=" UZS">5 200 000 UZS</b>
                                <span className="kpi-c__s">+2,1% · oldingi</span>
                              </div>{" "}
                              <div className="kpi-c" style={{ "--k": "17" } as CSSProperties}>
                                <p className="kpi-c__l">
                                  <i>
                                    <svg viewBox="0 0 24 24">
                                      <circle cx="12" cy="12" r="8" />
                                      <path d="M9 9l6 6M15 9l-6 6" />
                                    </svg>
                                  </i>
                                  Bekor qilish ulushi (soni)
                                </p>
                                <b className="kpi-c__v" data-n="8.2" data-suf="%">8,2%</b>
                                <span className="kpi-c__s">+0,4% · oldingi</span>
                              </div>{" "}
                              <div className="kpi-c" style={{ "--k": "18" } as CSSProperties}>
                                <p className="kpi-c__l">
                                  <i>
                                    <svg viewBox="0 0 24 24">
                                      <circle cx="12" cy="12" r="8" />
                                      <path d="M9 9l6 6M15 9l-6 6" />
                                    </svg>
                                  </i>
                                  Bekor qilish ulushi (summa)
                                </p>
                                <b className="kpi-c__v" data-n="10.7" data-suf="%">10,7%</b>
                                <span className="kpi-c__s">+0,3% · oldingi</span>
                              </div>
                            </div>
                          </div>{" "}
                          <div className="kpi-g kpi-g--green">
                            <p className="kpi-g__t">Oʻrtacha koʻrsatkichlar</p>{" "}
                            <div className="kpi-g__grid">
                              <div className="kpi-c" style={{ "--k": "19" } as CSSProperties}>
                                <p className="kpi-c__l">
                                  <i>
                                    <svg viewBox="0 0 24 24">
                                      <path d="M4 12V5h7l9 9-7 7z" />
                                    </svg>
                                  </i>
                                  Tovarning oʻrtacha narxi
                                </p>
                                <b className="kpi-c__v" data-n="142000" data-suf=" UZS">142 000 UZS</b>
                                <span className="kpi-c__s">+2,2% · oldingi</span>
                              </div>{" "}
                              <div className="kpi-c" style={{ "--k": "20" } as CSSProperties}>
                                <p className="kpi-c__l">
                                  <i>
                                    <svg viewBox="0 0 24 24">
                                      <path d="M4 12V5h7l9 9-7 7z" />
                                    </svg>
                                  </i>
                                  Oʻrtacha chek
                                </p>
                                <b className="kpi-c__v" data-n="146800" data-suf=" UZS">146 800 UZS</b>
                                <span className="kpi-c__s">+1,6% · oldingi</span>
                              </div>{" "}
                              <div className="kpi-c" style={{ "--k": "21" } as CSSProperties}>
                                <p className="kpi-c__l">
                                  <i>
                                    <svg viewBox="0 0 24 24">
                                      <path d="M4 5h2l2 10h9l2-7H8" />
                                    </svg>
                                  </i>
                                  Buyurtmadagi tovarlar
                                </p>
                                <b className="kpi-c__v" data-n="1.2" data-suf="">1,2</b>
                                <span className="kpi-c__s">0,0 · oldingi</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>{" "}
                      <div className="dash__ai">
                        <p>
                          <b>AI tavsiyalar</b>
                          <span>Aqlli maslahatlar va harakatlar rejasi</span>
                        </p>
                        <i>
                          <span>Tavsiyalar olish</span>
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="hero__toast" id="hero-toast" aria-hidden="true">
              <span className="hero__sync" id="hero-sync">{" "}
                <i data-mp="Uzum">
                  <img className="mp-ico" src="/marketplaces/uzum.svg" alt="" />
                </i>{" "}
                <i data-mp="Yandex">
                  <img className="mp-ico" src="/marketplaces/yandex.svg" alt="" />
                </i>{" "}
                <i data-mp="Wildberries">
                  <img className="mp-ico" src="/marketplaces/wildberries.svg" alt="" />
                </i>{" "}
                <i data-mp="Ozon">
                  <img className="mp-ico" src="/marketplaces/ozon.svg" alt="" />
                </i>{" "}
              </span>{" "}
              <span>
                <b>4 marketpleys ulangan</b>
                <span className="hero__live">Sinxron ishlayapti</span>
              </span>
            </div>{" "}
            <div className="hero__ai" aria-hidden="true">
              <i>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l1.9 5.6a3 3 0 0 0 1.9 1.9L21.4 11.4a.6.6 0 0 1 0 1.2l-5.6 1.9a3 3 0 0 0-1.9 1.9L12 22l-1.9-5.6a3 3 0 0 0-1.9-1.9L2.6 12.6a.6.6 0 0 1 0-1.2l5.6-1.9a3 3 0 0 0 1.9-1.9L12 2z" />
                </svg>
              </i>{" "}
              <span>
                <b>AI yordamchi</b>
                <span>3 ta mahsulot qoldigʻi kamaymoqda</span>
              </span>
            </div>
          </div>
        </div>
      </section>
      <HeroScript />
    </>
  );
}
