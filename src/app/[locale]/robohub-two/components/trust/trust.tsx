import { getMessages } from "@/i18n/server";
import { COMPANIES } from "./companies";
import { messages } from "./trust.i18n";

export default async function Trust() {
  const t = await getMessages(messages);
  return (
    <>
      <section className="trust" id="trust" data-theme="light" aria-label={t.label}>
        <div className="trusted" aria-label={t.label} role="group">
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
    </>
  );
}
