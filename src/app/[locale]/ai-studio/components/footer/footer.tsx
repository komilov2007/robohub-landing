import Logo from "../logo/logo";
import FooterTrust from "@/components/footer-trust/footer-trust";
import { getC } from "../../content.server";
import ContactIcon, { type ContactIconName } from "@/components/contact-icon/contact-icon";
import OfficeAddress from "@/components/office-address/office-address";
import { EMAIL, EMAIL_HREF, INSTAGRAM_URL, PHONE, PHONE_HREF, TELEGRAM_URL, YOUTUBE_URL } from "@/lib/contacts";

const ext = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {});

// Aloqa: ikon + oddiy matn (Academy footer'idagidek)
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

// Footer — Robohub Academy footer'i bilan bir xil dizayn: to'q teal fon, logo + izoh + marketplace belgilari,
// havola ustunlari (katta harfli sarlavhalar), ikonkali aloqa, pastda mualliflik qatori.
export default async function Footer() {
  const { FOOTER, T } = await getC();
  return (
    <footer className="as-footer">
      <div className="as-wrap">
        <div className="as-footer__grid">
          <div className="as-footer__about">
            <a href="#top" className="as-footer__logo" aria-label={T.ui.home}>
              <Logo />
            </a>
            <p>{FOOTER.about}</p>
            <p className="as-footer__mps" aria-hidden="true">
              {MARKETPLACES.map((m) => (
                <img key={m} src={`/marketplaces/${m}.svg`} alt="" width={30} height={30} loading="lazy" />
              ))}
            </p>
            <FooterTrust />
          </div>

          {FOOTER.cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h3>{c.title}</h3>
              <ul>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} {...ext(l.href)}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3>{FOOTER.contacts}</h3>
            <ul className="as-footer__contacts">
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
        <div className="as-footer__bar">
          <p>
            © <Year /> Robohub. {FOOTER.rights}
          </p>
          <p>Robohub AI Studio</p>
        </div>
      </div>
    </footer>
  );
}
