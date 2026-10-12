import IshonchScript from "./ishonch-script";
import { COMPANIES } from "./companies";

export default function Ishonch() {
  return (
    <>
      <section className="trust" id="ishonch" data-theme="light" aria-label="Natijalar va bizga ishongan sotuvchilar">
        <div className="container">
          {/* Raqamlar — sotuvchilar sharhlaridagi natijalar ("Sharhlar" bo'limi bilan bir xil) */}
          <p className="trust__cap" data-sr="">Robohubga o‘tgan sotuvchilar aytgan natijalar</p>
          <ul className="trust__stats" id="trust-stats" data-sr="">
            <li className="trust__stat">
              <b data-to="90" data-pre="−" data-suf="%">−90%</b>
              <span>Bekor qilingan buyurtmalar</span>
              <small>Qoldiq hamma joyda to‘g‘ri — yo‘q tovar sotilmaydi</small>
            </li>{" "}
            <li className="trust__stat">
              <b data-to="32" data-pre="+" data-suf="%">+32%</b>
              <span>Sof foyda (marja)</span>
              <small>Zarariga sotilayotgan tovarlar ko‘rinib qoldi</small>
            </li>{" "}
            <li className="trust__stat">
              <b data-to="75" data-pre="" data-suf="%">75%</b>
              <span>Tezroq jo‘natish</span>
              <small>Buyurtmalar bitta ro‘yxatda yig‘iladi</small>
            </li>{" "}
            <li className="trust__stat">
              <b data-to="12" data-pre="" data-suf=" soat">12 soat</b>
              <span>Haftasiga tejalgan vaqt</span>
              <small>Kabinetlar orasida yurish va qo‘lda hisob yo‘q</small>
            </li>
          </ul>
        </div>{" "}
        <div className="trusted" aria-label="Bizga ishongan sotuvchilar" role="group">
          {/* ekran o'quvchilar uchun: har bir nom bir marta (JS to'ldiradi) */}{" "}
          <p className="sr-only" id="trusted-names">{COMPANIES.map((c) => c.name).filter(Boolean).join(", ")}</p>{" "}
          {/* harakatlanuvchi lenta bezak: elementlarni JS chizadi, har nom ikki marta takrorlanadi */}{" "}
          <div className="trusted__mask" aria-hidden="true">
            <ul className="trusted__track" id="trusted-track">
            {/* Ro'yxat ikki marta chiziladi. Uslub raqami COMPANIES ichidagi indeksdan olinadi
                (ikkinchi nusxada ham o'sha indeks) — aks holda ulanish joyi bilinib qoladi. */}
            {[...COMPANIES, ...COMPANIES].map((c, n) => {
              const i = n % COMPANIES.length;
              return (
                <li className="trusted__item" key={n}>
                  {c.logo ? (
                    <img
                      className={"trusted__logo " + c.imgClass}
                      src={c.logo}
                      alt={c.name}
                      width={c.width}
                      height={c.height}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      draggable={false}
                    />
                  ) : (
                    <span className={"trusted__word trusted__word--" + (i % 4)}>{c.name}</span>
                  )}
                </li>
              );
            })}
          </ul>
          </div>
        </div>
      </section>
      <IshonchScript />
    </>
  );
}
