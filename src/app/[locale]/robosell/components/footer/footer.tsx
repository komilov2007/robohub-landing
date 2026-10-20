import { FOOTER } from "../../robosell.content";
import Logo from "../logo/logo";
import ContactIcon from "@/components/contact-icon/contact-icon";

// Footer — oxirgi, eng to'q "pufakcha" (#000211): logo, uch ustun havolalar, huquqiy qator.
export default function Footer() {
  return (
    <footer className="rs-foot">
      <div className="rs-wrap">
        <div className="rs-foot__grid">
          <div className="rs-foot__brand">
            <Logo />
            <p>{FOOTER.about}</p>
          </div>
          {FOOTER.cols.map((c) => (
            <nav key={c.title} className="rs-foot__col" aria-label={c.title}>
              <h2>{c.title}</h2>
              <ul>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} {...(l.external ? { target: "_blank", rel: "noopener" } : {})}>
                      {l.icon && <ContactIcon name={l.icon} className="rs-foot__ico" />}
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="rs-foot__bottom">
          <small>© 2026 Robosell</small>
          <ul>
            {FOOTER.legal.map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
            <li aria-label="Tillar">UZ · RU · EN</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
