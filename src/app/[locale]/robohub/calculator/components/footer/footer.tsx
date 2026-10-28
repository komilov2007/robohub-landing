import Logo from "../logo/logo";
import FooterTrust from "@/components/footer-trust/footer-trust";
import ContactIcon, { type ContactIconName } from "@/components/contact-icon/contact-icon";
import OfficeAddress from "@/components/office-address/office-address";
import { ACADEMY_PATH } from "@/lib/sites";
import { EMAIL, EMAIL_HREF, INSTAGRAM_URL, PHONE, PHONE_HREF, TELEGRAM_URL, YOUTUBE_URL } from "@/lib/contacts";
import { localeHref, type Locale } from "@/i18n/config";
import { type Content } from "../../calculator.content";
import { sellerUrl } from "@/lib/sites";

const CONTACTS: { icon: ContactIconName; label: string; href: string; external?: boolean }[] = [
  { icon: "phone", label: PHONE, href: PHONE_HREF },
  { icon: "email", label: EMAIL, href: EMAIL_HREF },
  { icon: "telegram", label: "Telegram", href: TELEGRAM_URL, external: true },
  { icon: "instagram", label: "Instagram", href: INSTAGRAM_URL.robohub, external: true },
  { icon: "youtube", label: "YouTube", href: YOUTUBE_URL, external: true },
];

const MARKETPLACES = ["uzum", "wildberries", "yandex", "ozon"];

// Joriy yil — keshlangan (cacheComponents: prerender'da new Date() to'g'ridan-to'g'ri ishlatilmaydi)
async function Year() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

// Footer — Robohub Academy footer'i bilan bir xil (o'sha ac-footer tuzilishi va uslubi, data-theme="dark"):
// logo + izoh + marketpleys belgilari, kalkulyator bo'limlari (2 ustun), Robohub havolalari, aloqa, mualliflik qatori.
export default function Footer({
  footer,
  nav,
  tag,
  home,
  locale,
}: {
  footer: Content["FOOTER"];
  nav: Content["NAV"];
  tag: string;
  home: string;
  locale: Locale;
}) {
  const robohub = [
    { label: footer.links.home, href: localeHref(locale, "/") },
    { label: footer.links.studio, href: localeHref(locale, "/ai-studio") },
    { label: footer.links.academy, href: localeHref(locale, ACADEMY_PATH) },
    { label: footer.links.cabinet, href: sellerUrl(locale, "") },
  ];
  const [before, after = ""] = footer.rights.split("{{year}}");

  return (
    <footer className="ac-footer" data-theme="dark">
      <div className="as-wrap">
        <div className="ac-footer__grid">
          <div className="ac-footer__about">
            <a href="#top" className="ac-footer__logo" aria-label={home}>
              <Logo tag={tag} />
            </a>
            <p>{footer.about}</p>
            <p className="ac-footer__mps" aria-hidden="true">
              {MARKETPLACES.map((m) => (
                <img key={m} src={`/marketplaces/${m}.svg`} alt="" width={30} height={30} loading="lazy" />
              ))}
            </p>
            <FooterTrust />
          </div>
          <nav aria-label={footer.calc}>
            <h3>{footer.calc}</h3>
            <ul className="ac-footer__cols">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label={footer.robohub}>
            <h3>{footer.robohub}</h3>
            <ul>
              {robohub.map((l) => (
                <li key={l.label}>
                  <a href={l.href} {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h3>{footer.contacts}</h3>
            <ul className="ac-footer__contacts">
              {CONTACTS.map((c) => (
                <li key={c.icon}>
                  <a href={c.href} {...(c.external ? { target: "_blank", rel: "noopener" } : {})}>
                    <ContactIcon name={c.icon} />
                    {c.label}
                  </a>
                </li>
              ))}
              <OfficeAddress />
            </ul>
          </div>
        </div>
        <div className="ac-footer__bar">
          <p>
            {before}
            <Year />
            {after}
          </p>
          <p>Robohub · {tag}</p>
        </div>
      </div>
    </footer>
  );
}
