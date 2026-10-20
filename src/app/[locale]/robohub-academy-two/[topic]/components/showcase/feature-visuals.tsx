import type { ReactNode } from "react";
import type { TopicSlug } from "../../../lib/academy";
import { Analitika, Boshqaruv, Logo, MP, Mahsulotlar, Ombor, Win, v, type Mp } from "./visuals";

// "Videoda nima bor" ko'rgazmasidagi har bir band uchun o'z vizuali (FEATURE_VISUALS[mavzu][band tartibi],
// tartib lib/academy.ts → topic.features bilan bir xil). Band tanlanganda sahnadagi vizual shu yerdan almashadi.
// Hammasi illyustratsiya (aria-hidden, sahnada "namuna" yozuvi): raqam va nomlar namunaviy.
// Animatsiyalar faqat CSS — topic.css → "BAND VIZUALLARI" (acx-fv-), mavzu vizuallari — academy.css → "VIZUALLAR".

const ACCENT: Record<Mp, string> = { uzum: "#A77BFF", wildberries: "#FF7AD9", yandex: "#FFC93C", ozon: "#7EB0FF" };

// ───────── Analitika ─────────
function Costs() {
  const parts: [string, number, string][] = [
    ["Komissiya", 34, "#B8FFB0"],
    ["Logistika", 24, "#34E5E6"],
    ["Reklama", 18, "#00A39C"],
    ["Saqlash", 14, "#7EB0FF"],
    ["Jarimalar", 10, "#FF9478"],
  ];
  let acc = 0;
  return (
    <div className="ac-v acx-fv">
      <Win title="Xarajatlar tarkibi" dark>
        <div className="acx-fv-costs">
          <div className="acx-fv-donut">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="46" className="acx-fv-donut__track" />
              {parts.map(([n, p, c], i) => {
                const off = acc;
                acc += p;
                return <circle key={n} cx="60" cy="60" r="46" pathLength={100} stroke={c} strokeDashoffset={-off} style={v({ "--p": p - 1.5, "--i": i })} />;
              })}
            </svg>
            <span>
              <b>93,4 mln</b>
              <small>jami xarajat</small>
            </span>
          </div>
          <ul className="acx-fv-legend">
            {parts.map(([n, p, c], i) => (
              <li key={n} style={v({ "--i": i, "--c": c, "--w": `${p * 2.6}%` })}>
                <i />
                <span>{n}</span>
                <em />
                <b>{p}%</b>
              </li>
            ))}
          </ul>
        </div>
      </Win>
    </div>
  );
}

function Top() {
  const rows: [string, string, number, boolean?][] = [
    ["Krossovka Air Run", "1 240 dona", 100],
    ["Termos 1 L", "980 dona", 79],
    ["Futbolka basic", "760 dona", 61],
    ["Ryukzak urban", "410 dona", 33],
    ["Sumka mini", "38 dona", 6, true],
  ];
  return (
    <div className="ac-v acx-fv">
      <Win title="TOP mahsulotlar · 30 kun" dark>
        <ol className="acx-fv-top">
          {rows.map(([name, val, w, slow], i) => (
            <li key={name} className={slow ? "is-slow" : undefined} style={v({ "--i": i, "--w": `${w}%` })}>
              <b>{slow ? "▼" : i + 1}</b>
              <span className="acx-fv-top__name">
                {name}
                <span className="acx-fv-top__bar">
                  <i />
                </span>
              </span>
              <em>{val}</em>
            </li>
          ))}
        </ol>
      </Win>
    </div>
  );
}

function Matrix() {
  const counts = [12, 7, 3, 9, 14, 5, 4, 8, 16];
  const heat = [1, 0.8, 0.55, 0.7, 0.6, 0.4, 0.35, 0.25, 0.15];
  return (
    <div className="ac-v acx-fv">
      <Win title="ABC × XYZ" dark>
        <div className="acx-fv-matrix">
          <span className="acx-fv-matrix__y">Foyda (ABC)</span>
          <div className="acx-fv-matrix__grid">
            <i />
            {["X", "Y", "Z"].map((c) => (
              <b key={c}>{c}</b>
            ))}
            {["A", "B", "C"].map((r, ri) => (
              <div key={r} className="acx-fv-matrix__row">
                <b>{r}</b>
                {["X", "Y", "Z"].map((c, ci) => {
                  const k = ri * 3 + ci;
                  return (
                    <span key={c} style={v({ "--h": heat[k], "--i": k })}>
                      <strong>
                        {r}
                        {c}
                      </strong>
                      <small>{counts[k]} SKU</small>
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
          <span className="acx-fv-matrix__x">Talab barqarorligi (XYZ)</span>
        </div>
      </Win>
    </div>
  );
}

// ───────── Buyurtmalar ─────────
function Orders({ mp }: { mp: Mp }) {
  const rows: [string, string, string][] = [
    ["#1042", "Krossovka Air Run", "299 000"],
    ["#1041", "Termos 1 L", "145 000"],
    ["#1039", "Futbolka basic", "89 000"],
  ];
  return (
    <div className="ac-v acx-fv" style={v({ "--acc": ACCENT[mp] })}>
      <Win title={`Buyurtmalar · ${MP[mp]}`} dark>
        <div className="acx-fv-tabs">
          <span className="is-on">Yangi 12</span>
          <span>Yig‘ilmoqda 5</span>
          <span>Yetkazildi 48</span>
        </div>
        <ul className="acx-fv-orders">
          {rows.map(([id, name, sum], i) => (
            <li key={id} style={v({ "--i": i })}>
              <Logo mp={mp} size={26} />
              <span>
                <strong>{id}</strong>
                <small>{name}</small>
              </span>
              <b>{sum} so‘m</b>
              <em className={i === 0 ? "acx-fv-status is-live" : "acx-fv-status"}>
                {i === 0 ? (
                  <>
                    <span>Yangi</span>
                    <span>Yig‘ilmoqda</span>
                    <span>Yuborildi</span>
                  </>
                ) : (
                  <span>{i === 1 ? "Yig‘ilmoqda" : "Yuborildi"}</span>
                )}
              </em>
            </li>
          ))}
        </ul>
      </Win>
    </div>
  );
}

function Fbo() {
  return (
    <div className="ac-v acx-fv">
      <div className="acx-fv-fbo">
        <div className="acx-fv-wh">
          <p>O‘z omborim</p>
          <ul>
            {[
              ["Krossovka Air Run", "120"],
              ["Termos 1 L", "80"],
              ["Futbolka basic", "60"],
            ].map(([n, q]) => (
              <li key={n}>
                {n}
                <b>{q}</b>
              </li>
            ))}
          </ul>
        </div>
        <div className="acx-fv-road" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="acx-fv-wh acx-fv-wh--mp">
          <p>
            <Logo mp="uzum" size={20} /> Uzum FBO · Toshkent
          </p>
          <strong>Ta’minlash #2041</strong>
          <span className="acx-fv-meter">
            <i />
          </span>
          <small>260 dona · 4 qadoq</small>
        </div>
      </div>
    </div>
  );
}

// ───────── Mahsulotlar ─────────
function ProductForm() {
  const fields: [string, string][] = [
    ["Nomi", "Krossovka Air Run"],
    ["Kategoriya", "Poyabzal · Sport"],
    ["Narx", "299 000 so‘m"],
  ];
  return (
    <div className="ac-v acx-fv">
      <Win title="Yangi tovar kartochkasi">
        <div className="acx-fv-form">
          <div className="acx-fv-form__img">
            <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 12l-8 8-9-9V3h8zM7 7h.01" />
            </svg>
          </div>
          <div className="acx-fv-form__fields">
            {fields.map(([k, val], i) => (
              <label key={k} style={v({ "--i": i, "--n": val.length })}>
                <small>{k}</small>
                <span>
                  <em>{val}</em>
                </span>
              </label>
            ))}
            <div className="acx-fv-sizes">
              {["40", "41", "42", "43"].map((s, i) => (
                <span key={s} style={v({ "--i": i })}>
                  {s}
                </span>
              ))}
            </div>
            <span className="acx-fv-btn">Saqlash va yuborish</span>
          </div>
        </div>
      </Win>
    </div>
  );
}

// ───────── Ombor ─────────
function Groups() {
  const rows: [string, string, number][] = [
    ["Toshkent", "3 ombor · 1 240 dona", 92],
    ["Rossiya", "1 ombor · 860 dona", 64],
    ["Samarqand", "2 ombor · 410 dona", 31],
  ];
  return (
    <div className="ac-v acx-fv">
      <Win title="Ombor guruhlari" dark>
        <ul className="acx-fv-groups">
          {rows.map(([name, sub, w], i) => (
            <li key={name} style={v({ "--i": i, "--w": `${w}%` })}>
              <span>
                <strong>{name}</strong>
                <small>{sub}</small>
              </span>
              <span className="acx-fv-meter">
                <i />
              </span>
            </li>
          ))}
          <li className="acx-fv-groups__add">+ Yangi guruh</li>
        </ul>
      </Win>
    </div>
  );
}

function Missing() {
  const rows: [string, string, string][] = [
    ["SKU 10482 · Krossovka", "Uzum FBO", "−12"],
    ["SKU 20817 · Termos", "WB Koledino", "−4"],
    ["SKU 31190 · Sumka", "Yandex", "−2"],
  ];
  return (
    <div className="ac-v acx-fv">
      <Win title="Missing · 3 ta mahsulot" dark>
        <ul className="acx-fv-missing">
          {rows.map(([sku, wh, q], i) => (
            <li key={sku} style={v({ "--i": i })}>
              <i />
              <span>
                <strong>{sku}</strong>
                <small>{wh}</small>
              </span>
              <b>{q} dona</b>
            </li>
          ))}
        </ul>
      </Win>
    </div>
  );
}

// ───────── Marketing ─────────
function Promos() {
  const rows: [string, string, number, boolean][] = [
    ["BAHOR15", "−15%", 72, true],
    ["YANGI10", "−10%", 45, true],
    ["VIP25", "−25%", 100, false],
  ];
  return (
    <div className="ac-v acx-fv">
      <div className="acx-fv-promos">
        {rows.map(([code, off, used, on], i) => (
          <div key={code} className={`acx-fv-ticket${on ? "" : " is-off"}`} style={v({ "--i": i, "--w": `${used}%` })}>
            <span className="acx-fv-ticket__off">{off}</span>
            <span className="acx-fv-ticket__body">
              <strong>{code}</strong>
              <span className="acx-fv-meter">
                <i />
              </span>
              <small>{on ? `${used}% ishlatildi` : "Tugagan"}</small>
            </span>
            <em>{on ? "Faol" : "Tugadi"}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

function Calendar() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const promo = new Map<number, string>([
    [4, "a"], [5, "a"], [6, "a"], [11, "b"], [12, "b"], [18, "c"], [19, "c"], [20, "c"], [21, "c"], [26, "a"],
  ]);
  return (
    <div className="ac-v acx-fv">
      <Win title="Aksiyalar taqvimi · Noyabr" className="ac-v-cal">
        <div className="ac-v-cal__grid">
          {["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"].map((d) => (
            <b key={d}>{d}</b>
          ))}
          {days.map((d) => (
            <span key={d} className={promo.has(d) ? `is-${promo.get(d)}` : undefined} style={v({ "--i": d })}>
              {d}
            </span>
          ))}
        </div>
        <div className="ac-v-cal__legend">
          <span className="is-a">Promokod</span>
          <span className="is-b">Chegirma</span>
          <span className="is-c">Mavsumiy aksiya</span>
        </div>
      </Win>
    </div>
  );
}

function Boost() {
  return (
    <div className="ac-v acx-fv">
      <div className="ac-v-boost acx-fv-boost">
        <p>Boost TOP · qidiruv natijasi</p>
        <div className="ac-v-boost__list">
          <span className="ac-v-boost__ranks">
            <b>1</b>
            <b>2</b>
            <b>3</b>
            <b>4</b>
          </span>
          <ol>
            <li>Sport poyabzal</li>
            <li>Yugurish krossovkasi</li>
            <li>Kedi klassik</li>
            <li className="is-me">
              Sizning krossovkangiz<em>▲ 3</em>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

// ───────── Integratsiya ─────────
function Connect({ mp }: { mp: Mp }) {
  return (
    <div className="ac-v acx-fv" style={v({ "--acc": ACCENT[mp] })}>
      <Win title="Integratsiyalar · Yangi ulanish">
        <div className="acx-fv-connect">
          <div className="acx-fv-connect__head">
            <Logo mp={mp} size={52} />
            <span>
              <strong>{MP[mp]}</strong>
              <small>Sotuvchi akkaunti</small>
            </span>
          </div>
          <label className="acx-fv-key">
            <small>API kalit</small>
            <span>
              <em>••••••••••••••••••••</em>
            </span>
          </label>
          <span className="acx-fv-btn acx-fv-btn--swap">
            <span>Ulash</span>
            <span>✓ Ulandi</span>
          </span>
          <ul className="acx-fv-sync">
            {["Mahsulotlar", "Buyurtmalar", "Qoldiqlar"].map((s, i) => (
              <li key={s} style={v({ "--i": i })}>
                <i />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </Win>
    </div>
  );
}

// ───────── Muloqot ─────────
function Chat() {
  return (
    <div className="ac-v acx-fv">
      <Win title="Chat · Uzum Market">
        <div className="ac-v-chat">
          <div className="ac-v-msg ac-v-msg--in">
            Assalomu alaykum! 42 o‘lcham bormi?
            <small>Aziza · 10:24</small>
          </div>
          <div className="ac-v-typing">
            <i />
            <i />
            <i />
          </div>
          <div className="ac-v-msg ac-v-msg--out">
            Va alaykum assalom! Ha, 42 o‘lcham omborda bor, bugun jo‘natamiz.
            <small>Operator · 10:25</small>
          </div>
        </div>
      </Win>
    </div>
  );
}

function AutoReply() {
  return (
    <div className="ac-v acx-fv">
      <div className="acx-fv-auto">
        <Win title="Avtojavob sozlamasi" dark>
          <div className="acx-fv-auto__set">
            <span className="acx-fv-auto__row">
              Avtojavob yoqilgan
              <i className="acx-fv-toggle" />
            </span>
            <span className="acx-fv-auto__stars">
              {["★5", "★4", "★3"].map((s, i) => (
                <b key={s} className={i < 2 ? "is-on" : undefined}>
                  {s}
                </b>
              ))}
            </span>
            <span className="acx-fv-auto__tpl">“Fikringiz uchun rahmat, {"{ism}"}! Sizni yana kutamiz.”</span>
          </div>
        </Win>
        <div className="acx-fv-review">
          <span className="ac-v-review__stars">★★★★★</span>
          <p>“Tez yetkazishdi, rahmat!”</p>
          <span className="acx-fv-review__reply">
            <b>Avtojavob</b> Fikringiz uchun rahmat, Aziza! Sizni yana kutamiz.
          </span>
        </div>
      </div>
    </div>
  );
}

// ───────── Boshqaruv ─────────
function Docs() {
  const rows: [string, string, boolean][] = [
    ["Hisob-faktura №214", "12.11", true],
    ["Yetkazish dalolatnomasi", "10.11", true],
    ["Shartnoma · Uzum", "08.11", false],
  ];
  return (
    <div className="ac-v acx-fv">
      <Win title="Hujjatlar" dark>
        <ul className="acx-fv-docs">
          {rows.map(([name, date, ok], i) => (
            <li key={name} style={v({ "--i": i })}>
              <i />
              <span>
                <strong>{name}</strong>
                <small>{date} · PDF</small>
              </span>
              <em className={ok ? "is-ok" : undefined}>{ok ? "Imzolangan" : "Kutilmoqda"}</em>
            </li>
          ))}
        </ul>
      </Win>
    </div>
  );
}

function Infographic() {
  return (
    <div className="ac-v acx-fv">
      <div className="acx-fv-info">
        <div className="acx-fv-info__card">
          <div className="acx-fv-info__img">
            <svg viewBox="0 0 24 24" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 12l-8 8-9-9V3h8zM7 7h.01" />
            </svg>
          </div>
          {["Suv o‘tkazmaydi", "Yengil — 280 g", "40–45 o‘lcham"].map((t, i) => (
            <span key={t} className={`acx-fv-callout acx-fv-callout--${i}`} style={v({ "--i": i })}>
              {t}
            </span>
          ))}
        </div>
        <Win title="Infografika · Oktabr" dark className="acx-fv-info__chart">
          <div className="acx-fv-bars">
            {[42, 64, 51, 78, 69, 90].map((h, i) => (
              <i key={i} style={v({ "--h": `${h}%`, "--i": i })} />
            ))}
          </div>
        </Win>
      </div>
    </div>
  );
}

export const FEATURE_VISUALS: Record<TopicSlug, (() => ReactNode)[]> = {
  analitika: [Analitika, Costs, Top, Matrix],
  buyurtmalar: [() => <Orders mp="uzum" />, () => <Orders mp="wildberries" />, () => <Orders mp="yandex" />, Fbo],
  mahsulotlar: [ProductForm, Mahsulotlar],
  ombor: [Ombor, Groups, Missing, Fbo],
  marketing: [Promos, Calendar, Boost],
  integratsiya: [() => <Connect mp="uzum" />, () => <Connect mp="wildberries" />, () => <Connect mp="yandex" />, () => <Connect mp="ozon" />],
  muloqot: [Chat, AutoReply],
  boshqaruv: [Boshqaruv, Docs, Infographic],
};
