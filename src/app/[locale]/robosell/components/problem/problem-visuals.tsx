import type { CSSProperties, ReactNode } from "react";
import Icon from "../icon/svg-icon";

// "Muammo va yechim" vizuallari. Har tur uchun ikki holat: OLD — Robosell'siz tartibsizlik,
// NEW — Robosell interfeysi. Surgichli taqqoslashda ikkalasi bir xil katakda ustma-ust turadi (problem-compare.tsx).
export type Kind = "chats" | "catalog" | "pay" | "stats";

const d = (i: number) => ({ "--j": i }) as CSSProperties;

export function OldVisual({ kind }: { kind: Kind }) {
  return <div className="rs-sv">{OLD[kind]}</div>;
}

export function NewVisual({ kind }: { kind: Kind }) {
  return <div className="rs-sv">{NEW[kind]}</div>;
}

const OLD: Record<Kind, ReactNode> = {
  chats: (
    <div className="rs-o-chats">
      {[
        ["A", "Aziza", "Krossovkaning 40-razmeri bormi?", "9+", "#2AABEE"],
        ["J", "Jasur", "Manzil: Chilonzor 9, 14-uy…", "3", "#F2AF4C"],
        ["M", "Malika", "Narxi qancha? Yetkazasizmi?", "5", "#DD2A7B"],
        ["☎", "+998 90 *** 12", "Javobsiz qo‘ng‘iroq (3)", "3", "#EB5769"],
        ["S", "Sardor", "Kecha yozgandim, javob yo‘q…", "2", "#5DC983"],
      ].map(([a, n, t, b, c], i) => (
        <span key={n} className="rs-o-chat" style={{ ...d(i), "--c": c } as CSSProperties}>
          <i>{a}</i>
          <span>
            <b>{n}</b>
            <small>{t}</small>
          </span>
          <em>{b}</em>
        </span>
      ))}
      <span className="rs-o-note">Kim nima buyurdi?! 😵</span>
    </div>
  ),
  catalog: (
    <div className="rs-o-cat">
      <div className="rs-o-paper">
        <span>Krem — 149 ming?</span>
        <span>
          <s>Soat — 1 200</s> 1 250 000
        </span>
        <span>Krossovka — qoldi 3? 5?</span>
        <span>Quloqchin — 420 (so‘rash kerak)</span>
      </div>
      <div className="rs-o-xls">
        {["A", "B", "C", "1", "Narx", "Qoldiq", "2", "#REF!", "=B2*?", "3", "119000", "#N/A"].map((v, i) => (
          <span key={i} className={v.startsWith("#") || v.startsWith("=") ? "is-err" : undefined}>
            {v}
          </span>
        ))}
      </div>
    </div>
  ),
  pay: (
    <div className="rs-o-pay">
      <span className="rs-o-bub rs-o-bub--in">To‘ladim, chekni tashladim 👇</span>
      <span className="rs-o-shot">
        <i />
        <i />
        <i />
      </span>
      <span className="rs-o-bub rs-o-bub--out">Bir daqiqa, bankdan tekshiraman…</span>
      <span className="rs-o-wait">⏳ Pul tushdimi?</span>
    </div>
  ),
  stats: (
    <div className="rs-o-stats">
      <div className="rs-o-sum">
        <span>Dushanba … 2 400 000</span>
        <span>Seshanba … 1 9?? 000</span>
        <span>
          <s>Chorshanba … 3 100 000</s>
        </span>
        <span className="rs-o-sum__q">Foyda = ???</span>
      </div>
      <span className="rs-o-big">?</span>
    </div>
  ),
};

const NEW: Record<Kind, ReactNode> = {
  chats: (
    <div className="rs-n-panel">
      <div className="rs-n-head">
        <b>Buyurtmalar</b>
        <span className="rs-n-tabs">
          <i className="is-on">Barchasi</i>
          <i>
            Yangi <em>5</em>
          </i>
          <i>Jarayonda</i>
        </span>
      </div>
      {[
        [29182, "Aziza K.", "238,000", "telegram"],
        [29181, "Jasur T.", "119,000", "globe"],
        [29180, "Malika R.", "285,000", "instagram"],
        [29179, "Operator", "150,000", "user"],
        [29178, "Sardor B.", "119,000", "click-outline"],
      ].map(([id, n, s, p], i) => (
        <span key={id} className="rs-n-row" style={d(i)}>
          <b>{id}</b>
          <span>{n}</span>
          <span>{s} UZS</span>
          <Icon name={String(p)} size={18} />
          <em className="rs-n-st">Yangi</em>
        </span>
      ))}
    </div>
  ),
  catalog: (
    <div className="rs-n-panel">
      <div className="rs-n-head">
        <b>Mahsulotlar</b>
        <span className="rs-n-btn">+ Mahsulot qo‘shish</span>
      </div>
      {[
        ["/ai/cosmetics_composition.webp", "Namlovchi krem, 50 ml", "149,000", 24],
        ["/categories/accessories.webp", "Soat U-Boat Classic", "1,250,000", 12],
        ["/categories/shoes.webp", "Krossovka White Glitter", "690,000", 8],
        ["/categories/electronics.webp", "Quloqchin Koss Porta", "420,000", 31],
      ].map(([im, n, p, q], i) => (
        <span key={im} className="rs-n-prod" style={d(i)}>
          <img src={String(im)} alt="" />
          <span>
            <b>{n}</b>
            <small>{p} UZS</small>
          </span>
          <em>Qoldiq: {q}</em>
          <i className="rs-n-toggle" />
        </span>
      ))}
    </div>
  ),
  pay: (
    <div className="rs-n-panel">
      <div className="rs-n-head">
        <b>To‘lov turlari</b>
      </div>
      {[
        ["click", 64, 26],
        ["payme", 62, 18],
        ["robo-pay", 26, 26],
      ].map(([n, w, h], i) => (
        <span key={n} className="rs-n-pm" style={d(i)}>
          <Icon name={String(n)} w={Number(w)} h={Number(h)} />
          {n === "robo-pay" && <b>Robopay</b>}
          <em>Ulangan</em>
          <i className="rs-n-toggle" />
        </span>
      ))}
      <span className="rs-n-paid" style={d(3)}>
        <i>✓</i>
        <span>
          <b>#29178 · 149,000 UZS</b>
          <small>Click orqali to‘landi · avtomatik tasdiqlandi</small>
        </span>
      </span>
    </div>
  ),
  stats: (
    <div className="rs-n-panel">
      <div className="rs-n-kpis">
        {[
          ["Daromad", "48,2 mln", "+12%"],
          ["Foyda", "12,6 mln", "+18%"],
          ["Buyurtmalar", "1 284", "+9%"],
        ].map(([l, v, g], i) => (
          <span key={l} style={d(i)}>
            <small>{l}</small>
            <b>{v}</b>
            <em>{g}</em>
          </span>
        ))}
      </div>
      <div className="rs-n-chart">
        {[38, 52, 44, 63, 58, 76, 70, 88, 82, 96].map((h, i) => (
          <i key={i} style={{ ...d(i), "--h": `${h}%` } as CSSProperties} />
        ))}
      </div>
      <div className="rs-n-top">
        <small>Top mahsulotlar</small>
        {[
          ["/ai/cosmetics_composition.webp", "Namlovchi krem", "312 ta"],
          ["/categories/shoes.webp", "Krossovka", "198 ta"],
        ].map(([im, n, c], i) => (
          <span key={im} style={d(i + 3)}>
            <img src={im} alt="" />
            <b>{n}</b>
            <em>{c}</em>
          </span>
        ))}
      </div>
    </div>
  ),
};
