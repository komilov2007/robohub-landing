import type { CSSProperties } from "react";
import MuammoScript from "./muammo-script";

export default function Muammo() {
  return (
    <>
      <section className="pain" id="muammo" data-theme="dark" aria-labelledby="muammo-title">
        <div className="pain__pin">
          <div className="container pain__stage">
            <div className="pain__left">
              <p className="pain__eyebrow" data-sr="">Muammo</p>{" "}
              {/* Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi: ʻ bu shriftda harf ustiga minib qoladi */}{" "}
              <h2 className="pain__title" id="muammo-title" data-sr="" style={{ "--d": "80ms" } as CSSProperties}>
                <span>Sotuv to‘rt joyda.</span>{" "}
                <span className="accent">Hisob-kitob ham to‘rt joyda.</span>
              </h2>{" "}
              {/* NAMUNA: rasmlardagi oynalar va sonlar (1 000 000, 24 / 31 / 0 / 18) shartli, muammoni ko'rsatish uchun */}{" "}
              <ol className="pain__list" id="pain-list">
                <li className="pain-item" data-sr="">
                  <div className="art" data-n="01" aria-hidden="true">
                    <span className="a-cap">Har marketpleys uchun alohida kabinet va alohida jadval</span>
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
                    <span className="a-res">4 ta parol, 4 ta fayl — jamini o‘zingiz qo‘shasiz</span>
                  </div>{" "}
                  <div className="pain-item__text">
                    <span className="pain-item__num" aria-hidden="true">01</span>{" "}
                    <h3>4 ta kabinet, 4 ta Excel</h3>{" "}
                    <p>Har kuni toʻrtta joyga kirib hisob yuritish.</p>
                  </div>
                </li>{" "}
                <li className="pain-item" data-sr="">
                  <div className="art" data-n="02" aria-hidden="true">
                    <span className="a-cap">Sotuv summasi ma’lum, undan qanchasi qolishi — yo‘q</span>
                    <span className="a-money">
                      <span className="a-money__top">
                        <span>Bir oyda sotdingiz</span>
                        <b>1 000 000</b>
                      </span>
                      {/* har bo'lakning haqiqiy ulushi noma'lum — shuning uchun "?" */}
                      <span className="a-bar">
                        <i>Komissiya ?</i>
                        <i>Logistika ?</i>
                        <i>Reklama ?</i>
                        <i className="is-left">Sizga ?</i>
                      </span>
                      <span className="a-money__note">Qanchasi xarajat, qanchasi sizniki — har kabinetdan alohida yig‘ib hisoblash kerak</span>
                      <span className="a-money__sum">
                        Qo‘lingizda qoldi
                        <b>???</b>
                      </span>
                    </span>
                    <span className="a-res">Qaysi tovar zarariga sotilayotganini bilmaysiz</span>
                  </div>{" "}
                  <div className="pain-item__text">
                    <span className="pain-item__num" aria-hidden="true">02</span>{" "}
                    <h3>Foydam qancha qolayotganini bilmayman</h3>{" "}
                    <p>Komissiya, reklama, logistika — hammasi aralash.</p>
                  </div>
                </li>{" "}
                <li className="pain-item" data-sr="">
                  <div className="art" data-n="03" aria-hidden="true">
                    <span className="a-cap">Omborda bitta son, kabinetlarda — har xil</span>
                    <span className="a-stock">
                      <span className="a-box">
                        <span>Omborda</span>
                        <b>24</b>
                        <span>dona</span>
                      </span>
                      <span className="a-sites">
                        <span className="a-site">
                          <img src="/marketplaces/uzum.svg" alt="" width="18" height="18" />
                          <span>Uzum</span>
                          <b>24</b>
                          <em>to‘g‘ri</em>
                        </span>
                        <span className="a-site is-bad">
                          <img src="/marketplaces/wildberries.svg" alt="" width="18" height="18" />
                          <span>Wildberries</span>
                          <b>31</b>
                          <em>ortiqcha</em>
                        </span>
                        <span className="a-site is-bad">
                          <img src="/marketplaces/ozon.svg" alt="" width="18" height="18" />
                          <span>Ozon</span>
                          <b>0</b>
                          <em>yo‘q deb turibdi</em>
                        </span>
                        <span className="a-site is-bad">
                          <img src="/marketplaces/yandex.svg" alt="" width="18" height="18" />
                          <span>Yandex Market</span>
                          <b>18</b>
                          <em>kam</em>
                        </span>
                      </span>
                    </span>
                    <span className="a-res">Bor tovar sotilmaydi, yo‘q tovar esa sotilib ketadi</span>
                  </div>{" "}
                  <div className="pain-item__text">
                    <span className="pain-item__num" aria-hidden="true">03</span>{" "}
                    <h3>Qoldiq yo‘qoladi yoki kamayadi</h3>{" "}
                    <p>Omborda bor, kabinetda yoʻq.</p>
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
              <p className="pain__fix">Robohub buni bitta joyga yig‘adi.</p>
            </div>
          </div>
        </div>
      </section>
      <MuammoScript />
    </>
  );
}
