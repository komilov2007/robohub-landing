import Link from "next/link";
import { RobohubLogo } from "../logo/logo";
import { getLocale } from "@/i18n/server";
import { getTopics } from "../../lib/academy";
import { PHONE, PHONE_TEL, START_URL, academyHref, topicHref, robohubHome, robohubPricing } from "../../lib/links";
import { messages } from "./footer.i18n";
import ContactIcon, { type ContactIconName } from "@/components/contact-icon/contact-icon";
import { EMAIL, EMAIL_HREF, INSTAGRAM_URL, TELEGRAM_URL, YOUTUBE_URL } from "@/lib/contacts";

// Footer "Aloqa": ikon + oddiy matn (chegarasiz)
const CONTACTS: { icon: ContactIconName; label: string; href: string; external?: boolean }[] = [
  { icon: "phone", label: PHONE, href: PHONE_TEL },
  { icon: "email", label: EMAIL, href: EMAIL_HREF },
  { icon: "telegram", label: "Telegram", href: TELEGRAM_URL, external: true },
  { icon: "instagram", label: "Instagram", href: INSTAGRAM_URL.robohub, external: true },
  { icon: "youtube", label: "YouTube", href: YOUTUBE_URL, external: true },
];

// Joriy yil — keshlangan (cacheComponents: prerender'da new Date() to'g'ridan-to'g'ri ishlatilmaydi)
async function Year() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

const MARKETPLACES = ["uzum", "wildberries", "yandex", "ozon"];

// Footer — Robohub landingi footeri uslubida (to'q fon, logo, ustunlar)
export default async function Footer() {
  const locale = await getLocale();
  const t = messages[locale];
  return (
    <footer className="ac-footer" id="ac-footer" data-theme="dark">
      <div className="container">
        <div className="ac-footer__grid">
          <div className="ac-footer__about">
            <Link href={academyHref(locale)} className="ac-footer__logo" aria-label="Robohub Academy">
              <RobohubLogo />
              <span>Academy</span>
            </Link>
            <p>{t.about}</p>
            <p className="ac-footer__mps" aria-hidden="true">
              {MARKETPLACES.map((m) => (
                <img key={m} src={`/marketplaces/${m}.svg`} alt="" width={30} height={30} loading="lazy" />
              ))}
            </p>
          </div>
          <nav aria-label={t.topics}>
            <h3>{t.topics}</h3>
            <ul className="ac-footer__cols">
              {getTopics(locale).map((x) => (
                <li key={x.slug}>
                  <Link href={topicHref(locale, x.slug)}>{x.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Robohub">
            <h3>Robohub</h3>
            <ul>
              <li>
                <a href={robohubHome(locale)}>{t.home}</a>
              </li>
              <li>
                <a href={robohubPricing(locale)}>{t.pricing}</a>
              </li>
              <li>
                <a href={START_URL} target="_blank" rel="noopener">{t.start}</a>
              </li>
            </ul>
          </nav>
          <div>
            <h3>{t.contacts}</h3>
            <ul className="ac-footer__contacts">
              {CONTACTS.map((c) => (
                <li key={c.icon}>
                  <a href={c.href} {...(c.external ? { target: "_blank", rel: "noopener" } : {})}>
                    <ContactIcon name={c.icon} />
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="ac-footer__bar">
          <p>
            © <Year /> Robohub. {t.rights}
          </p>
          <p>Robohub Academy</p>
        </div>
      </div>
    </footer>
  );
}
