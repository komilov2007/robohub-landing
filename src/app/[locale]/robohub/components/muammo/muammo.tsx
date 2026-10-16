import type { CSSProperties } from "react";
import { getMessages } from "@/i18n/server";
import MuammoScript from "./muammo-script";
import { messages } from "./muammo.i18n";

export default async function Muammo() {
  const t = await getMessages(messages);
  return (
    <>
      <section className="pain" id="muammo" data-theme="dark" aria-labelledby="muammo-title">
        <div className="pain__pin">
          <div className="container pain__stage">
            <div className="pain__left">
              <p className="pain__eyebrow" data-sr="">{t.eyebrow}</p>{" "}
              {/* Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi: ʻ bu shriftda harf ustiga minib qoladi */}{" "}
              <h2 className="pain__title" id="muammo-title" data-sr="" style={{ "--d": "80ms" } as CSSProperties}>
                <span>{t.title}</span>{" "}
                <span className="accent">{t.titleAccent}</span>
              </h2>{" "}
              {/* NAMUNA: rasmlardagi oynalar va sonlar (1 000 000, 24 / 31 / 0 / 18) shartli, muammoni ko'rsatish uchun */}{" "}
              <ol className="pain__list" id="pain-list">
                <li className="pain-item" data-sr="">
                  <div className="art" data-n="01" aria-hidden="true">
                    <span className="a-cap" data-label={t.badge}>{t.i1.cap}</span>
                    <span className="a-wins">
                      <span className="a-win">
                        <span className="a-win__head">
                          <b className="a-win__x">X</b>
                          Uzum.xlsx
                          <img className="mp-ico" src="/marketplaces/uzum.svg" alt="" width="14" height="14" />
                        </span>
                        <span className="a-win__rows" />
                      </span>
                      <span className="a-win">
                        <span className="a-win__head">
                          <b className="a-win__x">X</b>
                          Wildberries.xlsx
                          <img className="mp-ico" src="/marketplaces/wildberries.svg" alt="" width="14" height="14" />
                        </span>
                        <span className="a-win__rows" />
                      </span>
                      <span className="a-win">
                        <span className="a-win__head">
                          <b className="a-win__x">X</b>
                          Ozon.xlsx
                          <img className="mp-ico" src="/marketplaces/ozon.svg" alt="" width="14" height="14" />
                        </span>
                        <span className="a-win__rows" />
                      </span>
                      <span className="a-win">
                        <span className="a-win__head">
                          <b className="a-win__x">X</b>
                          Yandex.xlsx
                          <img className="mp-ico" src="/marketplaces/yandex.svg" alt="" width="14" height="14" />
                        </span>
                        <span className="a-win__rows" />
                      </span>
                    </span>
                    <span className="a-res">{t.i1.res}</span>
                  </div>{" "}
                  <div className="pain-item__text">
                    <span className="pain-item__num" aria-hidden="true">01</span>{" "}
                    <h3>{t.i1.title}</h3>{" "}
                    <p>{t.i1.text}</p>
                  </div>
                </li>{" "}
                <li className="pain-item" data-sr="">
                  <div className="art" data-n="02" aria-hidden="true">
                    <span className="a-cap" data-label={t.badge}>{t.i2.cap}</span>
                    <span className="a-money">
                      <span className="a-money__top">
                        <span>{t.i2.sold}</span>
                        <b>{t.i2.amount}</b>
                      </span>
                      {/* har bo'lakning haqiqiy ulushi noma'lum — shuning uchun "?" */}
                      <span className="a-bar">
                        <i>{t.i2.commission}</i>
                        <i>{t.i2.logistics}</i>
                        <i>{t.i2.ads}</i>
                        <i className="is-left">{t.i2.yours}</i>
                      </span>
                      <span className="a-money__note">{t.i2.note}</span>
                      <span className="a-money__sum">
                        {t.i2.left}
                        <b>???</b>
                      </span>
                    </span>
                    <span className="a-res">{t.i2.res}</span>
                  </div>{" "}
                  <div className="pain-item__text">
                    <span className="pain-item__num" aria-hidden="true">02</span>{" "}
                    <h3>{t.i2.title}</h3>{" "}
                    <p>{t.i2.text}</p>
                  </div>
                </li>{" "}
                <li className="pain-item" data-sr="">
                  <div className="art" data-n="03" aria-hidden="true">
                    <span className="a-cap" data-label={t.badge}>{t.i3.cap}</span>
                    <span className="a-stock">
                      <span className="a-box">
                        <span>{t.i3.warehouse}</span>
                        <b>24</b>
                        <span>{t.i3.pcs}</span>
                      </span>
                      <span className="a-sites">
                        <span className="a-site">
                          <img src="/marketplaces/uzum.svg" alt="" width="18" height="18" />
                          <span>Uzum</span>
                          <b>24</b>
                          <em>{t.i3.ok}</em>
                        </span>
                        <span className="a-site is-bad">
                          <img src="/marketplaces/wildberries.svg" alt="" width="18" height="18" />
                          <span>Wildberries</span>
                          <b>31</b>
                          <em>{t.i3.extra}</em>
                        </span>
                        <span className="a-site is-bad">
                          <img src="/marketplaces/ozon.svg" alt="" width="18" height="18" />
                          <span>Ozon</span>
                          <b>0</b>
                          <em>{t.i3.none}</em>
                        </span>
                        <span className="a-site is-bad">
                          <img src="/marketplaces/yandex.svg" alt="" width="18" height="18" />
                          <span>Yandex Market</span>
                          <b>18</b>
                          <em>{t.i3.few}</em>
                        </span>
                      </span>
                    </span>
                    <span className="a-res">{t.i3.res}</span>
                  </div>{" "}
                  <div className="pain-item__text">
                    <span className="pain-item__num" aria-hidden="true">03</span>{" "}
                    <h3>{t.i3.title}</h3>{" "}
                    <p>{t.i3.text}</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>{" "}
          <div className="pain__flood" data-theme="mint">
            <div className="pain__flood-in">
              <span className="pain__merge" aria-hidden="true">{" "}
                <img src="/marketplaces/uzum.svg" alt="" width="52" height="52" style={{ "--x": "-120px" } as CSSProperties} />{" "}
                <img src="/marketplaces/wildberries.svg" alt="" width="52" height="52" style={{ "--x": "-40px" } as CSSProperties} />{" "}
                <img src="/marketplaces/ozon.svg" alt="" width="52" height="52" style={{ "--x": "40px" } as CSSProperties} />{" "}
                <img src="/marketplaces/yandex.svg" alt="" width="52" height="52" style={{ "--x": "120px" } as CSSProperties} />{" "}
              </span>{" "}
              <p className="pain__fix">{t.fix}</p>
            </div>
          </div>
        </div>
      </section>
      <MuammoScript />
    </>
  );
}
