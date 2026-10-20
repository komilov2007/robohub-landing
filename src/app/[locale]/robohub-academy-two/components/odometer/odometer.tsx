import type { CSSProperties } from "react";

// Raqam "odometr" kabi aylanib chiqadi — faqat CSS (JS'siz, server HTML'ida ham to'g'ri qiymat).
// Ekran o'quvchilar uchun haqiqiy raqam yashirin matnda.
const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export default function Odometer({ value, delay = 0 }: { value: number; delay?: number }) {
  return (
    <span className="acx-odo">
      <span className="acx-sr">{value}</span>
      <span aria-hidden="true" className="acx-odo__row">
        {String(value)
          .split("")
          .map((d, i) => (
            <span key={i} className="acx-odo__col" style={{ "--v": d, "--i": i, "--d": `${delay}ms` } as CSSProperties}>
              <span>
                {DIGITS.map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </span>
            </span>
          ))}
      </span>
    </span>
  );
}
