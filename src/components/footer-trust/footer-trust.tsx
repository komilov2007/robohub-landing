import { defineMessages } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import CertLightbox from "./cert-lightbox";
import "./footer-trust.css";

// Mukofotlar va guvohnomalar — to'rtala landing footerida bir xil (Robohub, Academy, AI Studio, Kalkulyator).
// Logotip ustunida, marketpleys belgilari ostida, ikki qator:
//   1) sarlavha va tashkilotlar logotiplari (kartasiz, yonma-yon), har biri ostida qisqa yorliq (rezident / sovrindor);
//   2) guvohnomalar — kichik varaqlar qatori; bosilganda sahifada katta ochiladi (cert-lightbox), JS'siz — yangi oynada.
// Fayllar: public/logo (logotiplar: EBRD va President Tech Award — oq, to'q fonga moslangan),
// public/certificates (guvohnomalar).
const LOGOS = [
  { src: "/logo/ebrd.svg", w: 149, h: 78, name: "EBRD" },
  { src: "/logo/president-tech-award.svg", w: 400, h: 102, name: "President Tech Award" },
];
const CERTS = [
  { src: "/certificates/cyber-park.webp", w: 1600, h: 1132 },
  { src: "/certificates/it-park.webp", w: 1280, h: 887 },
  { src: "/certificates/robohub-guvohnoma.webp", w: 1240, h: 1755 },
];

const messages = defineMessages({
  uz: {
    title: "Hamkor va sovrindor",
    roles: ["Hamkor", "Sovrindor"],
    certsTitle: "Guvohnomalar",
    certs: ["Cyber Park", "IT Park", "Davlat ro‘yxati"],
    alts: [
      "Cyber Park rezidenti guvohnomasi № 0016-26 R-152 — “Robohub” MChJ",
      "IT Park Uzbekistan rezidenti guvohnomasi — “Robosell” MChJ",
      "Yuridik shaxs davlat ro‘yxatidan o‘tganligi to‘g‘risidagi guvohnoma — “Robohub” MChJ",
    ],
    close: "Yopish",
  },
  ru: {
    title: "Партнёр и призёр",
    roles: ["Партнёр", "Призёр"],
    certsTitle: "Свидетельства",
    certs: ["Cyber Park", "IT Park", "Госрегистрация"],
    alts: [
      "Сертификат резидента Cyber Park № 0016-26 R-152 — ООО «Robohub»",
      "Свидетельство резидента IT Park Uzbekistan — ООО «Robosell»",
      "Свидетельство о государственной регистрации юридического лица — ООО «Robohub»",
    ],
    close: "Закрыть",
  },
  en: {
    title: "Partner & winner of",
    roles: ["Partner", "Winner"],
    certsTitle: "Certificates",
    certs: ["Cyber Park", "IT Park", "State registration"],
    alts: [
      "Cyber Park resident certificate No. 0016-26 R-152 — Robohub LLC",
      "IT Park Uzbekistan resident certificate — Robosell LLC",
      "Certificate of state registration of a legal entity — Robohub LLC",
    ],
    close: "Close",
  },
  kk: {
    title: "Серіктес және жүлдегер",
    roles: ["Серіктес", "Жүлдегер"],
    certsTitle: "Куәліктер",
    certs: ["Cyber Park", "IT Park", "Мемлекеттік тіркеу"],
    alts: [
      "Cyber Park резиденті сертификаты № 0016-26 R-152 — «Robohub» ЖШҚ",
      "IT Park Uzbekistan резиденті куәлігі — «Robosell» ЖШҚ",
      "Заңды тұлғаны мемлекеттік тіркеу туралы куәлік — «Robohub» ЖШҚ",
    ],
    close: "Жабу",
  },
  ky: {
    title: "Өнөктөш жана байге ээси",
    roles: ["Өнөктөш", "Байге ээси"],
    certsTitle: "Күбөлүктөр",
    certs: ["Cyber Park", "IT Park", "Мамлекеттик каттоо"],
    alts: [
      "Cyber Park резидентинин сертификаты № 0016-26 R-152 — «Robohub» ЖЧК",
      "IT Park Uzbekistan резидентинин күбөлүгү — «Robosell» ЖЧК",
      "Юридикалык жакты мамлекеттик каттоо жөнүндө күбөлүк — «Robohub» ЖЧК",
    ],
    close: "Жабуу",
  },
  kaa: {
    title: "Sherik hám sıylıq iyesi",
    roles: ["Sherik", "Sıylıq iyesi"],
    certsTitle: "Gúwalıqlar",
    certs: ["Cyber Park", "IT Park", "Mámleketlik dizim"],
    alts: [
      "Cyber Park rezidenti gúwalıǵı № 0016-26 R-152 — “Robohub” JShJ",
      "IT Park Uzbekistan rezidenti gúwalıǵı — “Robosell” JShJ",
      "Yuridikalıq shaxstı mámleketlik dizimnen ótkeriw haqqında gúwalıq — “Robohub” JShJ",
    ],
    close: "Jabıw",
  },
  tg: {
    title: "Шарик ва ҷоизадор",
    roles: ["Шарик", "Ҷоизадор"],
    certsTitle: "Шаҳодатномаҳо",
    certs: ["Cyber Park", "IT Park", "Бақайдгирии давлатӣ"],
    alts: [
      "Сертификати резиденти Cyber Park № 0016-26 R-152 — ҶДММ «Robohub»",
      "Шаҳодатномаи резиденти IT Park Uzbekistan — ҶДММ «Robosell»",
      "Шаҳодатнома дар бораи бақайдгирии давлатии шахси ҳуқуқӣ — ҶДММ «Robohub»",
    ],
    close: "Пӯшидан",
  },
});

export default async function FooterTrust() {
  const t = messages[await getLocale()];
  return (
    <section className="ftrust" aria-labelledby="ftrust-title">
      <p className="ftrust__title" id="ftrust-title">
        {t.title}
      </p>
      <ul className="ftrust__logos">
        {LOGOS.map((l, i) => (
          <li key={l.src}>
            <img src={l.src} alt={`${t.roles[i]} — ${l.name}`} width={l.w} height={l.h} loading="lazy" />          </li>
        ))}
      </ul>

      <p className="ftrust__title ftrust__title--sub">{t.certsTitle}</p>
      <ul className="ftrust__certs">
        {CERTS.map((c, i) => (
          <li key={c.src}>
            <a className="ftrust__cert" href={c.src} target="_blank" rel="noopener" data-cert={c.src} data-cert-alt={t.alts[i]} title={t.alts[i]}>
              <span className="ftrust__paper">
                <img src={c.src} alt="" width={c.w} height={c.h} loading="lazy" decoding="async" />
              </span>
              <span className="ftrust__name">{t.certs[i]}</span>
            </a>
          </li>
        ))}
      </ul>
      <CertLightbox close={t.close} />
    </section>
  );
}
