import { defineMessages } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import CertLightbox from "./cert-lightbox";
import "./footer-trust.css";

// Mukofotlar va guvohnomalar — to'rtala landing footerida bir xil (Robohub, Academy, AI Studio, Kalkulyator).
// Logotip ustunida, marketpleys belgilari ostida. Har tile: chapda yorliq ("G'olib") va mukofot logotipi
// (yoki hujjat nomi), o'ngda guvohnoma varag'i. Bosilganda guvohnoma sahifada katta ochiladi (cert-lightbox).
// Fayllar: public/logo (mukofot logotiplari), public/certificates (guvohnomalar).
type Item = {
  cert: string; // guvohnoma rasmi
  w: number;
  h: number;
  logo?: { src: string; w: number; h: number; name: string }; // mukofot — bo'lsa, tile'da yorliq + logotip
  name?: string; // mukofot bo'lmasa — tile'dagi nom
};

const ITEMS: Item[] = [
  {
    cert: "/certificates/it-park.webp", w: 1280, h: 887,
    logo: { src: "/logo/president-tech-award.svg", w: 400, h: 102, name: "President Tech Award" },
  },
  {
    cert: "/certificates/cyber-park.webp", w: 1600, h: 1132,
    logo: { src: "/logo/ebrd.svg", w: 149, h: 78, name: "EBRD" },
  },
  { cert: "/certificates/robohub-guvohnoma.webp", w: 1240, h: 1755 },
];

const messages = defineMessages({
  uz: {
    title: "Mukofotlar va guvohnomalar",
    winner: "G‘olib",
    close: "Yopish",
    state: { label: "Rasmiy ro‘yxatda", name: "“Robohub” MChJ" },
    alts: [
      "President Tech Award g‘olibi — IT Park rezidenti guvohnomasi",
      "EBRD (Yevropa tiklanish va taraqqiyot banki) g‘olibi — Cyber Park rezidenti guvohnomasi",
      "Yuridik shaxs davlat ro‘yxatidan o‘tganligi to‘g‘risidagi guvohnoma — “Robohub” MChJ",
    ],
  },
  ru: {
    title: "Награды и свидетельства",
    winner: "Победитель",
    close: "Закрыть",
    state: { label: "Госрегистрация", name: "ООО «Robohub»" },
    alts: [
      "Победитель President Tech Award — свидетельство резидента IT Park",
      "Победитель EBRD (Европейский банк реконструкции и развития) — сертификат резидента Cyber Park",
      "Свидетельство о государственной регистрации юридического лица — ООО «Robohub»",
    ],
  },
  en: {
    title: "Awards and certificates",
    winner: "Winner of",
    close: "Close",
    state: { label: "State registered", name: "Robohub LLC" },
    alts: [
      "President Tech Award winner — IT Park resident certificate",
      "EBRD (European Bank for Reconstruction and Development) winner — Cyber Park resident certificate",
      "Certificate of state registration of a legal entity — Robohub LLC",
    ],
  },
});

export default async function FooterTrust() {
  const t = messages[await getLocale()];
  return (
    <section className="ftrust" aria-labelledby="ftrust-title">
      <h3 className="ftrust__title" id="ftrust-title">
        {t.title}
      </h3>
      <ul className="ftrust__list">
        {ITEMS.map((it, i) => (
          <li key={it.cert}>
            <a className="ftrust__item" href={it.cert} target="_blank" rel="noopener" data-cert={it.cert} data-cert-alt={t.alts[i]} title={t.alts[i]}>
              <span className="ftrust__text">
                <small>{it.logo ? t.winner : t.state.label}</small>
                {it.logo ? (
                  <img className="ftrust__logo" src={it.logo.src} alt={it.logo.name} width={it.logo.w} height={it.logo.h} loading="lazy" />
                ) : (
                  <b>{t.state.name}</b>
                )}
              </span>
              {/* guvohnoma varag'i — orqasida ikkinchi qog'oz (::before) */}
              <span className="ftrust__paper">
                <img src={it.cert} alt="" width={it.w} height={it.h} loading="lazy" decoding="async" />
              </span>
            </a>
          </li>
        ))}
      </ul>
      <CertLightbox close={t.close} />
    </section>
  );
}
