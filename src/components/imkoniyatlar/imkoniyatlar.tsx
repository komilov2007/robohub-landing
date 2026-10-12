import type { CSSProperties } from "react";
import ImkoniyatlarScript from "./imkoniyatlar-script";

export default function Imkoniyatlar() {
  return (
    <>
      <section className="feat" id="imkoniyatlar" data-theme="light" aria-labelledby="feat-title">
        <div className="container">
          <p className="feat__eyebrow" data-sr="">Imkoniyatlar</p>{" "}
          {/* Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi */}{" "}
          <h2 className="feat__title" id="feat-title" data-sr="" style={{ "--d": "80ms" } as CSSProperties}>
            <span>Bitta kabinet.</span>{" "}
            <span className="accent">18 ta vosita.</span>
          </h2>{" "}
          {/* NAMUNA MA'LUMOT: demolardagi barcha son, mahsulot nomi, buyurtma raqami, promokod
         va matnlar shartli — vosita nima qilishini ko'rsatish uchun, haqiqiy ma'lumot emas. */}{" "}
          <div className="feat__acc" id="feat-acc" data-sr="" style={{ "--d": "160ms" } as CSSProperties}>
            {/* Markaz: Robohub belgisi (faqat desktop sahnasida ko'rinadi) */}{" "}
            <div className="feat__core" data-theme="dark" aria-hidden="true">
              <svg viewBox="0 0 33.8675 15.06">
                <use href="#rh-mark" />
              </svg>{" "}
              <span className="feat__orbit">{" "}
                <img src="/marketplaces/uzum.svg" alt="" width="30" height="30" />{" "}
                <img src="/marketplaces/wildberries.svg" alt="" width="30" height="30" />{" "}
                <img src="/marketplaces/ozon.svg" alt="" width="30" height="30" />{" "}
                <img src="/marketplaces/yandex.svg" alt="" width="30" height="30" />{" "}
              </span>
            </div>{" "}
            <svg className="feat__wires" aria-hidden="true" />{" "}
            {/* ===== 1 ===== */}{" "}
            <article className="feat-col feat-col--tl">
              <h3 className="feat-col__head">
                <button className="feat-col__tab" type="button">
                  <span className="feat-col__ico" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="9" rx="2" />
                      <rect x="14" y="3" width="7" height="5" rx="2" />
                      <rect x="14" y="12" width="7" height="9" rx="2" />
                      <rect x="3" y="16" width="7" height="5" rx="2" />
                    </svg>
                  </span>{" "}
                  <span className="feat-col__title">Hamma marketpleys bitta ekranda</span>{" "}
                  <span className="feat-col__num" aria-hidden="true">01</span>{" "}
                  <span className="feat-col__tools" aria-hidden="true">
                    <span>Dashboard</span>
                    <span>Buyurtmalar</span>
                    <span>FBO taʼminlash</span>
                  </span>
                </button>
              </h3>{" "}
              <i className="feat-col__prog" aria-hidden="true" />{" "}
              <div className="feat-col__ctl">
                <button className="feat-ctl" type="button" data-next="">
                  {"Keyingisi "}
                  <span aria-hidden="true">→</span>
                </button>{" "}
                <button className="feat-ctl feat-ctl--x" type="button" data-close="" aria-label="Yopish">✕</button>
              </div>{" "}
              <div className="feat-col__body">
                <div className="feat-grid feat-grid--3">
                  {/* Dashboard */}{" "}
                  <div className="feat-tile" data-theme="dark" style={{ "--t": "0" } as CSSProperties}>
                    <div className="feat-tile__head">
                      <h4 className="feat-tile__name">Dashboard</h4>
                    </div>{" "}
                    <div className="demo" aria-hidden="true">
                      <div className="d-grid3">
                        <div className="d-tile di" style={{ "--i": "0" } as CSSProperties}>
                          <span className="d-cap">Buyurtmalar</span>
                          <b className="d-num">128</b>
                        </div>{" "}
                        <div className="d-tile di" style={{ "--i": "1" } as CSSProperties}>
                          <span className="d-cap">Sof foyda</span>
                          <b className="d-num">4 860 000</b>
                        </div>{" "}
                        <div className="d-tile di" style={{ "--i": "2" } as CSSProperties}>
                          <span className="d-cap">Qoldiq</span>
                          <b className="d-num">2 314</b>
                        </div>
                      </div>{" "}
                      <div className="d-tile di" style={{ "--i": "3" } as CSSProperties}>
                        <span className="d-cap">Sotuvlar · 7 kun</span>{" "}
                        <div className="d-cols">
                          <i style={{ "--h": "38%", "--j": "0" } as CSSProperties} />
                          <i style={{ "--h": "52%", "--j": "1" } as CSSProperties} />
                          <i style={{ "--h": "46%", "--j": "2" } as CSSProperties} />
                          <i style={{ "--h": "66%", "--j": "3" } as CSSProperties} />
                          <i style={{ "--h": "60%", "--j": "4" } as CSSProperties} />
                          <i style={{ "--h": "84%", "--j": "5" } as CSSProperties} />
                          <i style={{ "--h": "100%", "--j": "6" } as CSSProperties} />
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  {/* Buyurtmalar */}{" "}
                  <div className="feat-tile" data-theme="dark" style={{ "--t": "1" } as CSSProperties}>
                    <div className="feat-tile__head">
                      <h4 className="feat-tile__name">Buyurtmalar</h4>
                    </div>{" "}
                    <div className="demo" aria-hidden="true">
                      <div className="d-row di" style={{ "--i": "0" } as CSSProperties}>
                        <img className="mp-ico" src="/marketplaces/uzum.svg" alt="" />
                        <span>#48213 · Simsiz quloqchin</span>
                        <b className="d-tag">Yangi</b>
                      </div>{" "}
                      <div className="d-row di" style={{ "--i": "1" } as CSSProperties}>
                        <img className="mp-ico" src="/marketplaces/wildberries.svg" alt="" />
                        <span>#48212 · Termos 500 ml</span>
                        <b className="d-tag d-tag--warn">Yigʻilmoqda</b>
                      </div>{" "}
                      <div className="d-row di" style={{ "--i": "2" } as CSSProperties}>
                        <img className="mp-ico" src="/marketplaces/ozon.svg" alt="" />
                        <span>#48211 · Telefon gʻilofi</span>
                        <b className="d-tag d-tag--mute">Yoʻlda</b>
                      </div>{" "}
                      <div className="d-row di" style={{ "--i": "3" } as CSSProperties}>
                        <img className="mp-ico" src="/marketplaces/yandex.svg" alt="" />
                        <span>#48210 · Sport sumka</span>
                        <b className="d-tag d-tag--mute">Topshirildi</b>
                      </div>
                    </div>
                  </div>{" "}
                  {/* FBO ta'minlash */}{" "}
                  <div className="feat-tile" data-theme="dark" style={{ "--t": "2" } as CSSProperties}>
                    <div className="feat-tile__head">
                      <h4 className="feat-tile__name">FBO taʼminlash</h4>
                    </div>{" "}
                    <div className="demo" aria-hidden="true">
                      <div className="d-row di" style={{ "--i": "0" } as CSSProperties}>
                        <span>Termos 500 ml</span>
                        <em className="d-dim">4 kun</em>
                        <div className="d-bar" style={{ flex: "0 0 40px" }}>
                          <i style={{ "--w": "18%", "--c": "var(--accent)" } as CSSProperties} />
                        </div>
                        <b className="d-tag">+120 dona</b>
                      </div>{" "}
                      <div className="d-row di" style={{ "--i": "1" } as CSSProperties}>
                        <span>Simsiz quloqchin</span>
                        <em className="d-dim">9 kun</em>
                        <div className="d-bar" style={{ flex: "0 0 40px" }}>
                          <i style={{ "--w": "40%", "--c": "var(--accent)" } as CSSProperties} />
                        </div>
                        <b className="d-tag">+60 dona</b>
                      </div>{" "}
                      <div className="d-row di" style={{ "--i": "2" } as CSSProperties}>
                        <span>Sport sumka</span>
                        <em className="d-dim">21 kun</em>
                        <div className="d-bar" style={{ flex: "0 0 40px" }}>
                          <i style={{ "--w": "78%" } as CSSProperties} />
                        </div>
                        <b className="d-tag d-tag--mute">yetarli</b>
                      </div>{" "}
                      <div className="d-row di" style={{ "--i": "3" } as CSSProperties}>
                        <span>Blender</span>
                        <em className="d-dim">30 kun</em>
                        <div className="d-bar" style={{ flex: "0 0 40px" }}>
                          <i style={{ "--w": "100%" } as CSSProperties} />
                        </div>
                        <b className="d-tag d-tag--mute">yetarli</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>{" "}
            {/* ===== 2 ===== */}{" "}
            <article className="feat-col feat-col--tr">
              <h3 className="feat-col__head">
                <button className="feat-col__tab" type="button">
                  <span className="feat-col__ico" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 20h18" />
                      <path d="M6 16v-4" />
                      <path d="M11 16V8" />
                      <path d="M16 16v-6" />
                      <path d="M4 9l5-4 5 3 6-5" />
                    </svg>
                  </span>{" "}
                  <span className="feat-col__title">Foydangizni aniq biling</span>{" "}
                  <span className="feat-col__num" aria-hidden="true">02</span>{" "}
                  <span className="feat-col__tools" aria-hidden="true">
                    <span>Sof foyda va marja</span>
                    <span>ROI</span>
                    <span>ABC/XYZ tahlil</span>
                    <span>AI tavsiyalar</span>
                  </span>
                </button>
              </h3>{" "}
              <i className="feat-col__prog" aria-hidden="true" />{" "}
              <div className="feat-col__ctl">
                <button className="feat-ctl" type="button" data-next="">
                  {"Keyingisi "}
                  <span aria-hidden="true">→</span>
                </button>{" "}
                <button className="feat-ctl feat-ctl--x" type="button" data-close="" aria-label="Yopish">✕</button>
              </div>{" "}
              <div className="feat-col__body">
                <div className="feat-grid feat-grid--4">
                  {/* Sof foyda va marja */}{" "}
                  <div className="feat-tile" data-theme="dark" style={{ "--t": "0" } as CSSProperties}>
                    <div className="feat-tile__head">
                      <h4 className="feat-tile__name">Sof foyda va marja</h4>
                      <b className="d-tag di" style={{ "--i": "12" } as CSSProperties}>Marja 26%</b>
                    </div>{" "}
                    <div className="demo" aria-hidden="true">
                      <div className="d-line di" style={{ "--i": "0" } as CSSProperties}>
                        <span>Tushum</span>
                        <div className="d-bar">
                          <i style={{ "--w": "100%" } as CSSProperties} />
                        </div>
                        <b>1 000 000</b>
                      </div>{" "}
                      <div className="d-line di" style={{ "--i": "1" } as CSSProperties}>
                        <span className="d-dim">Tannarx</span>
                        <div className="d-bar">
                          <i style={{ "--w": "40%", "--c": "var(--accent)" } as CSSProperties} />
                        </div>
                        <b>−400 000</b>
                      </div>{" "}
                      <div className="d-line di" style={{ "--i": "2" } as CSSProperties}>
                        <span className="d-dim">Komissiya</span>
                        <div className="d-bar">
                          <i style={{ "--w": "18%", "--c": "var(--accent)" } as CSSProperties} />
                        </div>
                        <b>−180 000</b>
                      </div>{" "}
                      <div className="d-line di" style={{ "--i": "3" } as CSSProperties}>
                        <span className="d-dim">Logistika</span>
                        <div className="d-bar">
                          <i style={{ "--w": "9%", "--c": "var(--accent)" } as CSSProperties} />
                        </div>
                        <b>−90 000</b>
                      </div>{" "}
                      <div className="d-line di" style={{ "--i": "4" } as CSSProperties}>
                        <span className="d-dim">Reklama</span>
                        <div className="d-bar">
                          <i style={{ "--w": "7%", "--c": "var(--accent)" } as CSSProperties} />
                        </div>
                        <b>−70 000</b>
                      </div>{" "}
                      <div className="d-line d-line--sum di" style={{ "--i": "6" } as CSSProperties}>
                        <span>Sof foyda</span>
                        <div className="d-bar">
                          <i style={{ "--w": "26%" } as CSSProperties} />
                        </div>
                        <b>260 000</b>
                      </div>
                    </div>
                  </div>{" "}
                  {/* ROI */}{" "}
                  <div className="feat-tile" data-theme="dark" style={{ "--t": "1" } as CSSProperties}>
                    <div className="feat-tile__head">
                      <h4 className="feat-tile__name">ROI</h4>
                    </div>{" "}
                    <div className="demo" aria-hidden="true">
                      <div className="d-hero di" style={{ "--i": "0" } as CSSProperties}>
                        <b className="d-big">148%</b>
                        <span className="d-cap">ROI</span>
                      </div>{" "}
                      <div className="d-line di" style={{ "--i": "1" } as CSSProperties}>
                        <span className="d-dim">Sarflandi</span>
                        <div className="d-bar">
                          <i style={{ "--w": "40%", "--c": "var(--accent)" } as CSSProperties} />
                        </div>
                        <b>500 000</b>
                      </div>{" "}
                      <div className="d-line di" style={{ "--i": "2" } as CSSProperties}>
                        <span>Qaytdi</span>
                        <div className="d-bar">
                          <i style={{ "--w": "100%" } as CSSProperties} />
                        </div>
                        <b>1 240 000</b>
                      </div>
                    </div>
                  </div>{" "}
                  {/* ABC/XYZ tahlil */}{" "}
                  <div className="feat-tile" data-theme="dark" style={{ "--t": "2" } as CSSProperties}>
                    <div className="feat-tile__head">
                      <h4 className="feat-tile__name">ABC/XYZ tahlil</h4>
                    </div>{" "}
                    <div className="demo" aria-hidden="true">
                      <div className="d-matrix">
                        <span />
                        <span>X</span>
                        <span>Y</span>
                        <span>Z</span>{" "}
                        <span>A</span>
                        <b className="is-top" style={{ "--i": "0" } as CSSProperties}>24</b>
                        <b className="is-good" style={{ "--i": "1" } as CSSProperties}>11</b>
                        <b style={{ "--i": "2" } as CSSProperties}>6</b>{" "}
                        <span>B</span>
                        <b className="is-good" style={{ "--i": "3" } as CSSProperties}>18</b>
                        <b style={{ "--i": "4" } as CSSProperties}>15</b>
                        <b style={{ "--i": "5" } as CSSProperties}>9</b>{" "}
                        <span>C</span>
                        <b style={{ "--i": "6" } as CSSProperties}>12</b>
                        <b style={{ "--i": "7" } as CSSProperties}>20</b>
                        <b className="is-bad" style={{ "--i": "8" } as CSSProperties}>31</b>
                      </div>
                    </div>
                  </div>{" "}
                  {/* AI tavsiyalar */}{" "}
                  <div className="feat-tile" data-theme="dark" style={{ "--t": "3" } as CSSProperties}>
                    <div className="feat-tile__head">
                      <h4 className="feat-tile__name">AI tavsiyalar</h4>
                    </div>{" "}
                    <div className="demo" aria-hidden="true">
                      <div className="d-row di" style={{ "--i": "0" } as CSSProperties}>
                        <i className="d-spark">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l1.9 5.6a3 3 0 0 0 1.9 1.9L21.4 11.4a.6.6 0 0 1 0 1.2l-5.6 1.9a3 3 0 0 0-1.9 1.9L12 22l-1.9-5.6a3 3 0 0 0-1.9-1.9L2.6 12.6a.6.6 0 0 1 0-1.2l5.6-1.9a3 3 0 0 0 1.9-1.9L12 2z" />
                          </svg>
                        </i>
                        <span>Termos 500 ml — qoldiq 3 kunda tugaydi</span>
                      </div>{" "}
                      <div className="d-row di" style={{ "--i": "2" } as CSSProperties}>
                        <i className="d-spark">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l1.9 5.6a3 3 0 0 0 1.9 1.9L21.4 11.4a.6.6 0 0 1 0 1.2l-5.6 1.9a3 3 0 0 0-1.9 1.9L12 22l-1.9-5.6a3 3 0 0 0-1.9-1.9L2.6 12.6a.6.6 0 0 1 0-1.2l5.6-1.9a3 3 0 0 0 1.9-1.9L12 2z" />
                          </svg>
                        </i>
                        <span>Sport sumka — reklama oʻzini oqlamayapti</span>
                      </div>{" "}
                      <div className="d-row di" style={{ "--i": "4" } as CSSProperties}>
                        <i className="d-spark">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l1.9 5.6a3 3 0 0 0 1.9 1.9L21.4 11.4a.6.6 0 0 1 0 1.2l-5.6 1.9a3 3 0 0 0-1.9 1.9L12 22l-1.9-5.6a3 3 0 0 0-1.9-1.9L2.6 12.6a.6.6 0 0 1 0-1.2l5.6-1.9a3 3 0 0 0 1.9-1.9L12 2z" />
                          </svg>
                        </i>
                        <span>Blender — talab oshdi, narxni koʻrib chiqing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>{" "}
            {/* ===== 3 ===== */}{" "}
            <article className="feat-col feat-col--bl">
              <h3 className="feat-col__head">
                <button className="feat-col__tab" type="button">
                  <span className="feat-col__ico" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
                      <path d="M4 7.5l8 4.5 8-4.5" />
                      <path d="M12 12v9" />
                    </svg>
                  </span>{" "}
                  <span className="feat-col__title">Qoldiqni nazorat qiling</span>{" "}
                  <span className="feat-col__num" aria-hidden="true">03</span>{" "}
                  <span className="feat-col__tools" aria-hidden="true">
                    <span>Ombor sinxronizatsiyasi</span>
                    <span>Tovarlarni guruhlash</span>
                    <span>Excel import</span>
                    <span>Yoʻqotilgan mahsulotlar</span>
                  </span>
                </button>
              </h3>{" "}
              <i className="feat-col__prog" aria-hidden="true" />{" "}
              <div className="feat-col__ctl">
                <button className="feat-ctl" type="button" data-next="">
                  {"Keyingisi "}
                  <span aria-hidden="true">→</span>
                </button>{" "}
                <button className="feat-ctl feat-ctl--x" type="button" data-close="" aria-label="Yopish">✕</button>
              </div>{" "}
              <div className="feat-col__body">
                <div className="feat-grid feat-grid--4">
                  {/* Ombor sinxronizatsiyasi */}{" "}
                  <div className="feat-tile" data-theme="dark" style={{ "--t": "0" } as CSSProperties}>
                    <div className="feat-tile__head">
                      <h4 className="feat-tile__name">Ombor sinxronizatsiyasi</h4>
                    </div>{" "}
                    <div className="demo" aria-hidden="true">
                      <div className="d-sync">
                        <div className="d-sync__src di" style={{ "--i": "0" } as CSSProperties}>
                          <span className="d-cap">Omborda</span>
                          <b className="d-big">24</b>
                        </div>{" "}
                        <span className="d-sync__ico di" style={{ "--i": "1" } as CSSProperties}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 11a8 8 0 0 0-14.5-4.5L4 8" />
                            <path d="M4 4v4h4" />
                            <path d="M4 13a8 8 0 0 0 14.5 4.5L20 16" />
                            <path d="M20 20v-4h-4" />
                          </svg>
                        </span>{" "}
                        <div className="d-sync__list">
                          <div className="d-row di" style={{ "--i": "3" } as CSSProperties}>
                            <img className="mp-ico" src="/marketplaces/uzum.svg" alt="" />
                            <span>Uzum</span>
                            <b>24</b>
                            <b className="d-tag">✓</b>
                          </div>{" "}
                          <div className="d-row di" style={{ "--i": "4" } as CSSProperties}>
                            <img className="mp-ico" src="/marketplaces/wildberries.svg" alt="" />
                            <span>Wildberries</span>
                            <b>24</b>
                            <b className="d-tag">✓</b>
                          </div>{" "}
                          <div className="d-row di" style={{ "--i": "5" } as CSSProperties}>
                            <img className="mp-ico" src="/marketplaces/ozon.svg" alt="" />
                            <span>Ozon</span>
                            <b>24</b>
                            <b className="d-tag">✓</b>
                          </div>{" "}
                          <div className="d-row di" style={{ "--i": "6" } as CSSProperties}>
                            <img className="mp-ico" src="/marketplaces/yandex.svg" alt="" />
                            <span>Yandex</span>
                            <b>24</b>
                            <b className="d-tag">✓</b>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  {/* Tovarlarni guruhlash */}{" "}
                  <div className="feat-tile" data-theme="dark" style={{ "--t": "1" } as CSSProperties}>
                    <div className="feat-tile__head">
                      <h4 className="feat-tile__name">Tovarlarni guruhlash</h4>
                      <b className="d-tag di" style={{ "--i": "12" } as CSSProperties}>1 guruh · 4 kartochka</b>
                    </div>{" "}
                    <div className="demo" aria-hidden="true">
                      <div className="d-group">
                        <div className="d-row di" style={{ "--i": "0" } as CSSProperties}>
                          <img className="mp-ico" src="/marketplaces/uzum.svg" alt="" />
                          <span>Termos 500 ml</span>
                          <em className="d-dim">UZ-1182</em>
                        </div>{" "}
                        <div className="d-row di" style={{ "--i": "1" } as CSSProperties}>
                          <img className="mp-ico" src="/marketplaces/wildberries.svg" alt="" />
                          <span>Термос 500 мл</span>
                          <em className="d-dim">WB-77410</em>
                        </div>{" "}
                        <div className="d-row di" style={{ "--i": "2" } as CSSProperties}>
                          <img className="mp-ico" src="/marketplaces/ozon.svg" alt="" />
                          <span>Термос, 0.5 л</span>
                          <em className="d-dim">OZ-30915</em>
                        </div>{" "}
                        <div className="d-row di" style={{ "--i": "3" } as CSSProperties}>
                          <img className="mp-ico" src="/marketplaces/yandex.svg" alt="" />
                          <span>Termos 0,5 l</span>
                          <em className="d-dim">YM-5521</em>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  {/* Excel import */}{" "}
                  <div className="feat-tile" data-theme="dark" style={{ "--t": "2" } as CSSProperties}>
                    <div className="feat-tile__head">
                      <h4 className="feat-tile__name">Excel import</h4>
                      <b className="d-tag di" style={{ "--i": "12" } as CSSProperties}>128 ta tovar ✓</b>
                    </div>{" "}
                    <div className="demo" aria-hidden="true">
                      <div className="d-row di" style={{ "--i": "0" } as CSSProperties}>
                        <i className="d-file">XLS</i>
                        <span>tovarlar.xlsx</span>
                        <div className="d-bar d-load" style={{ flex: "0 0 38%" }}>
                          <i style={{ "--w": "100%" } as CSSProperties} />
                        </div>
                      </div>{" "}
                      <div className="d-row di" style={{ "--i": "9" } as CSSProperties}>
                        <span>Termos 500 ml</span>
                        <em className="d-dim">89 000 soʻm</em>
                        <b>120</b>
                      </div>{" "}
                      <div className="d-row di" style={{ "--i": "10" } as CSSProperties}>
                        <span>Simsiz quloqchin</span>
                        <em className="d-dim">164 000 soʻm</em>
                        <b>60</b>
                      </div>{" "}
                      <div className="d-row di" style={{ "--i": "10" } as CSSProperties}>
                        <span>Sport sumka</span>
                        <em className="d-dim">347 000 soʻm</em>
                        <b>35</b>
                      </div>
                    </div>
                  </div>{" "}
                  {/* Yo'qotilgan mahsulotlar */}{" "}
                  <div className="feat-tile" data-theme="dark" style={{ "--t": "3" } as CSSProperties}>
                    <div className="feat-tile__head">
                      <h4 className="feat-tile__name">Yoʻqotilgan mahsulotlar</h4>
                    </div>{" "}
                    <div className="demo" aria-hidden="true">
                      <div className="d-hero di" style={{ "--i": "0" } as CSSProperties}>
                        <b className="d-big" style={{ color: "var(--accent)" }}>5</b>
                        <span className="d-cap">dona topilmadi</span>
                      </div>{" "}
                      <div className="d-row di" style={{ "--i": "1" } as CSSProperties}>
                        <img className="mp-ico" src="/marketplaces/wildberries.svg" alt="" />
                        <span>Termos 500 ml</span>
                        <b className="d-tag d-tag--warn">−2 dona</b>
                      </div>{" "}
                      <div className="d-row di" style={{ "--i": "2" } as CSSProperties}>
                        <img className="mp-ico" src="/marketplaces/ozon.svg" alt="" />
                        <span>Telefon gʻilofi</span>
                        <b className="d-tag d-tag--warn">−1 dona</b>
                      </div>{" "}
                      <div className="d-row di" style={{ "--i": "3" } as CSSProperties}>
                        <img className="mp-ico" src="/marketplaces/uzum.svg" alt="" />
                        <span>Simsiz quloqchin</span>
                        <b className="d-tag d-tag--warn">−2 dona</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>{" "}
            {/* ===== 4 ===== */}{" "}
            <article className="feat-col feat-col--br">
              <h3 className="feat-col__head">
                <button className="feat-col__tab" type="button">
                  <span className="feat-col__ico" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 17l6-6 4 4 8-8" />
                      <path d="M15 7h6v6" />
                    </svg>
                  </span>{" "}
                  <span className="feat-col__title">Savdoni o‘stiring</span>{" "}
                  <span className="feat-col__num" aria-hidden="true">04</span>{" "}
                  <span className="feat-col__tools" aria-hidden="true">
                    <span>Avtobidder</span>
                    <span>Promokodlar</span>
                    <span>Aksiyalar taqvimi</span>
                    <span>Bust TOP</span>
                  </span>
                </button>
              </h3>{" "}
              <i className="feat-col__prog" aria-hidden="true" />{" "}
              <div className="feat-col__ctl">
                <button className="feat-ctl" type="button" data-next="">
                  {"Keyingisi "}
                  <span aria-hidden="true">→</span>
                </button>{" "}
                <button className="feat-ctl feat-ctl--x" type="button" data-close="" aria-label="Yopish">✕</button>
              </div>{" "}
              <div className="feat-col__body">
                <div className="feat-grid feat-grid--4">
                  {/* Avtobidder */}{" "}
                  <div className="feat-tile" data-theme="dark" style={{ "--t": "0" } as CSSProperties}>
                    <div className="feat-tile__head">
                      <h4 className="feat-tile__name">Avtobidder</h4>
                    </div>{" "}
                    <div className="demo" aria-hidden="true">
                      <div className="d-row di" style={{ "--i": "0" } as CSSProperties}>
                        <span>Maqsad</span>
                        <b>3-oʻrin</b>
                        <b className="d-tag">Avto</b>
                      </div>{" "}
                      <div className="d-tile di" style={{ "--i": "1" } as CSSProperties}>
                        <span className="d-cap">Stavka oʻzi moslashadi</span>{" "}
                        <div className="d-bar d-bid" style={{ marginTop: "12px", height: "12px" }}>
                          <i />
                        </div>
                      </div>{" "}
                      <div className="d-row di" style={{ "--i": "2" } as CSSProperties}>
                        <span>Hozirgi oʻrin</span>
                        <b className="d-tag">3</b>
                      </div>
                    </div>
                  </div>{" "}
                  {/* Promokodlar */}{" "}
                  <div className="feat-tile" data-theme="dark" style={{ "--t": "1" } as CSSProperties}>
                    <div className="feat-tile__head">
                      <h4 className="feat-tile__name">Promokodlar</h4>
                    </div>{" "}
                    <div className="demo" aria-hidden="true">
                      <div className="d-ticket di" style={{ "--i": "0" } as CSSProperties}>
                        <code>YOZ10</code>
                        <span>42 marta ishlatildi</span>
                        <b>−10%</b>
                      </div>{" "}
                      <div className="d-ticket di" style={{ "--i": "1" } as CSSProperties}>
                        <code>YANGI15</code>
                        <span>17 marta ishlatildi</span>
                        <b>−15%</b>
                      </div>{" "}
                      <div className="d-ticket di" style={{ "--i": "2" } as CSSProperties}>
                        <code>DOIMIY5</code>
                        <span>96 marta ishlatildi</span>
                        <b>−5%</b>
                      </div>
                    </div>
                  </div>{" "}
                  {/* Aksiyalar taqvimi (kunlar JS bilan chiziladi) */}{" "}
                  <div className="feat-tile" data-theme="dark" style={{ "--t": "2" } as CSSProperties}>
                    <div className="feat-tile__head">
                      <h4 className="feat-tile__name">Aksiyalar taqvimi</h4>
                    </div>{" "}
                    <div className="demo" aria-hidden="true">
                      <div className="d-cal" data-cal="" />{" "}
                      <ul className="d-legend">
                        <li>
                          <img className="mp-ico" src="/marketplaces/uzum.svg" alt="" />
                          3–6
                        </li>{" "}
                        <li>
                          <img className="mp-ico" src="/marketplaces/wildberries.svg" alt="" />
                          11–14
                        </li>{" "}
                        <li>
                          <img className="mp-ico" src="/marketplaces/ozon.svg" alt="" />
                          19–23
                        </li>
                      </ul>
                    </div>
                  </div>{" "}
                  {/* Bust TOP */}{" "}
                  <div className="feat-tile" data-theme="dark" style={{ "--t": "3" } as CSSProperties}>
                    <div className="feat-tile__head">
                      <h4 className="feat-tile__name">Bust TOP</h4>
                    </div>{" "}
                    <div className="demo" aria-hidden="true">
                      <ol className="d-rank">
                        <li>
                          <div className="d-row is-me">
                            <span>Termos 500 ml</span>
                            <b className="d-tag">↑ 3</b>
                          </div>
                        </li>{" "}
                        <li>
                          <div className="d-row">
                            <span className="d-dim">Raqobatchi tovar</span>
                          </div>
                        </li>{" "}
                        <li>
                          <div className="d-row">
                            <span className="d-dim">Raqobatchi tovar</span>
                          </div>
                        </li>{" "}
                        <li>
                          <div className="d-row">
                            <span className="d-dim">Raqobatchi tovar</span>
                          </div>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </article>{" "}
            {/* ===== 5 ===== */}{" "}
            <article className="feat-col feat-col--bc">
              <h3 className="feat-col__head">
                <button className="feat-col__tab" type="button">
                  <span className="feat-col__ico" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
                    </svg>
                  </span>{" "}
                  <span className="feat-col__title">Mijozlar bilan ishlang</span>{" "}
                  <span className="feat-col__num" aria-hidden="true">05</span>{" "}
                  <span className="feat-col__tools" aria-hidden="true">
                    <span>Chat</span>
                    <span>Sharhlar</span>
                    <span>Yulduz boʻyicha avtojavob</span>
                  </span>
                </button>
              </h3>{" "}
              <i className="feat-col__prog" aria-hidden="true" />{" "}
              <div className="feat-col__ctl">
                <button className="feat-ctl" type="button" data-next="">
                  {"Keyingisi "}
                  <span aria-hidden="true">→</span>
                </button>{" "}
                <button className="feat-ctl feat-ctl--x" type="button" data-close="" aria-label="Yopish">✕</button>
              </div>{" "}
              <div className="feat-col__body">
                <div className="feat-grid feat-grid--3">
                  {/* Chat */}{" "}
                  <div className="feat-tile" data-theme="dark" style={{ "--t": "0" } as CSSProperties}>
                    <div className="feat-tile__head">
                      <h4 className="feat-tile__name">Chat</h4>
                    </div>{" "}
                    <div className="demo" aria-hidden="true">
                      <div className="d-msg di" style={{ "--i": "0" } as CSSProperties}>
                        <img className="mp-ico" src="/marketplaces/uzum.svg" alt="" />
                        <p>Yetkazib berish qachon boʻladi?</p>
                      </div>{" "}
                      <div className="d-msg d-msg--me di" style={{ "--i": "4" } as CSSProperties}>
                        <p>Ertaga yetkaziladi</p>
                      </div>{" "}
                      <div className="d-msg di" style={{ "--i": "9" } as CSSProperties}>
                        <img className="mp-ico" src="/marketplaces/wildberries.svg" alt="" />
                        <p>Qora rangi bormi?</p>
                      </div>{" "}
                      <div className="d-msg d-msg--me di" style={{ "--i": "11" } as CSSProperties}>
                        <p>Ha, omborda bor</p>
                      </div>
                    </div>
                  </div>{" "}
                  {/* Sharhlar */}{" "}
                  <div className="feat-tile" data-theme="dark" style={{ "--t": "1" } as CSSProperties}>
                    <div className="feat-tile__head">
                      <h4 className="feat-tile__name">Sharhlar</h4>
                    </div>{" "}
                    <div className="demo" aria-hidden="true">
                      <div className="d-row di" style={{ "--i": "0" } as CSSProperties}>
                        <img className="mp-ico" src="/marketplaces/uzum.svg" alt="" />
                        <b className="d-stars">★★★★★</b>
                        <span>Sifati zoʻr, tez yetib keldi</span>
                      </div>{" "}
                      <div className="d-row di" style={{ "--i": "1" } as CSSProperties}>
                        <img className="mp-ico" src="/marketplaces/ozon.svg" alt="" />
                        <b className="d-stars">
                          ★★★★
                          <s>★</s>
                        </b>
                        <span>Yaxshi, qadogʻi biroz ezilgan</span>
                      </div>{" "}
                      <div className="d-row di" style={{ "--i": "2" } as CSSProperties}>
                        <img className="mp-ico" src="/marketplaces/wildberries.svg" alt="" />
                        <b className="d-stars">
                          ★★
                          <s>★★★</s>
                        </b>
                        <span>Rangi rasmdagidan farq qiladi</span>
                      </div>{" "}
                      <div className="d-row di" style={{ "--i": "3" } as CSSProperties}>
                        <img className="mp-ico" src="/marketplaces/yandex.svg" alt="" />
                        <b className="d-stars">★★★★★</b>
                        <span>Tavsiya qilaman</span>
                      </div>
                    </div>
                  </div>{" "}
                  {/* Yulduz bo'yicha avtojavob */}{" "}
                  <div className="feat-tile" data-theme="dark" style={{ "--t": "2" } as CSSProperties}>
                    <div className="feat-tile__head">
                      <h4 className="feat-tile__name">Yulduz boʻyicha avtojavob</h4>
                    </div>{" "}
                    <div className="demo" aria-hidden="true">
                      <div className="d-row di" style={{ "--i": "0" } as CSSProperties}>
                        <b className="d-stars">★★★★★</b>
                        <span>Xaridingiz uchun rahmat!</span>
                        <i className="d-switch" />
                      </div>{" "}
                      <div className="d-row di" style={{ "--i": "1" } as CSSProperties}>
                        <b className="d-stars">
                          ★★★★
                          <s>★</s>
                        </b>
                        <span>Fikringiz uchun rahmat!</span>
                        <i className="d-switch" />
                      </div>{" "}
                      <div className="d-row di" style={{ "--i": "2" } as CSSProperties}>
                        <b className="d-stars">
                          ★★★
                          <s>★★</s>
                        </b>
                        <span>Nimani yaxshilashimiz mumkin?</span>
                        <i className="d-switch" />
                      </div>{" "}
                      <div className="d-row di" style={{ "--i": "3" } as CSSProperties}>
                        <b className="d-stars">
                          ★
                          <s>★★★★</s>
                        </b>
                        <span>Uzr soʻraymiz, yordam beramiz</span>
                        <i className="d-switch" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
      <ImkoniyatlarScript />
    </>
  );
}
