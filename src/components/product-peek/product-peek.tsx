import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import { sellerUrl } from "@/lib/sites";
import { srcAlt } from "@/lib/img-alt";
import "./product-peek.css";

// Footer ostidagi "kabinetga nazar": Robohub admin panelining skrinshoti — faqat yuqori yarmi ko'rinadi,
// pastga qarab footer rangiga singib ketadi; o'rtada "Kirish" — sotuvchi kabinetida ro'yxatdan o'tish (joriy tilda).
// AI Studio va Kalkulyator landinglarida. bg — footer foni (davomi bo'lib ko'rinishi uchun).
// Skrinshot hozircha faqat ruscha (public/capabilities/ru/products.webp) — boshqa tillardagisi qo'shilsa, shu yerda tanlanadi.
const IMG = "/capabilities/ru/products.webp";

export default function ProductPeek({ locale, label, bg }: { locale: Locale; label: string; bg: string }) {
  const href = sellerUrl(locale);
  return (
    <div className="ppeek" style={{ "--pp-bg": bg } as CSSProperties}>
      <div className="ppeek__frame">
        <img src={IMG} alt={srcAlt(locale, IMG)} width={1600} height={911} loading="lazy" decoding="async" />
        <a className="ppeek__btn" href={href} target="_blank" rel="noopener">
          {label}
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 12h15M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </div>
  );
}
