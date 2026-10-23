import type { ReactNode } from "react";
import Icon from "../icon/svg-icon";
import { STATUS, uzs, type Order } from "./demo-data";

// Robosell admin panelining "Buyurtmalar ro'yxati" sahifasi — rb-frontend'dagi bilan bir xil tuzilma va matnlar.
// 1440×820 px o'lchamda chiziladi, sahnada CSS scale bilan kichraytiriladi (robosell.css → .rs-adm).
const NAV: { icon: string; label: string; more?: boolean; on?: boolean; dark?: boolean }[] = [
  { icon: "category", label: "Boshqaruv paneli" },
  { icon: "invoice-active", label: "Buyurtmalar", on: true },
  { icon: "users", label: "Mijozlar" },
  { icon: "chat", label: "Chat" },
  { icon: "package-box", label: "Mahsulotlar", more: true },
  { icon: "chart-arrow-up", label: "Marketing", more: true },
  { icon: "robot", label: "Platformalar", more: true },
  { icon: "card", label: "To'lov turi" },
  { icon: "fast-delivery", label: "Yetkazib berish" },
  { icon: "location", label: "Filiallar" },
  { icon: "users", label: "Xodimlar", more: true },
  { icon: "transfer-active", label: "Tarif rejasi", dark: true },
  { icon: "store", label: "Robo market" },
];

const TABS = ["Barchasi", "Yangi", "Jarayonda", "Muddati o'tgan", "Tayyor", "Yo'lda", "Buyurtmalar tarixi"];

type Props = {
  orders: Order[];
  fresh: number | null; // hozirgina tushgan buyurtma (yashil yorug'lik bilan)
  pressed: number | null; // xodim tugmasini "bosgan" qator
  total: number;
  ring?: boolean; // qo‘ng‘iroqcha "jiringlaydi" (yangi buyurtma)
  children?: ReactNode; // ustidagi qatlam (kursor)
};

export default function AdminScreen({ orders, fresh, pressed, total, ring, children }: Props) {
  const count = (s: Order["status"]) => orders.filter((o) => o.status === s).length;
  const badges: Record<string, number> = { Yangi: count("NEW"), Jarayonda: count("PROGRESS") };
  const rows = orders.slice(0, 9);

  return (
    <div className="rs-adm">
      {/* ---------- sidebar ---------- */}
      <aside className="rs-adm__side">
        <div className="rs-adm__logo">
          <Icon name="logo" w={148} h={23} />
          <span className="rs-adm__collapse">
            <Icon name="arrow-left" size={14} />
          </span>
        </div>
        <div className="rs-adm__shop">
          <span className="rs-adm__select">
            Robosell Shop
            <Icon name="direction-down" size={16} />
          </span>
          <span className="rs-adm__add">
            <Icon name="plus" size={18} />
          </span>
        </div>
        <ul className="rs-adm__nav">
          {NAV.map((n) => (
            <li key={n.label} className={(n.on ? "is-on" : "") + (n.dark ? " is-dark" : "")}>
              <Icon name={n.icon} size={22} />
              <span>{n.label}</span>
              {n.on && badges.Yangi > 0 && <b className="rs-adm__count">{badges.Yangi}</b>}
              {n.more && <Icon name="direction-down" size={16} className="rs-adm__chev" />}
            </li>
          ))}
        </ul>
        <div className="rs-adm__plan">
          BASIC <small>(0 kun)</small>
        </div>
      </aside>

      <div className="rs-adm__main">
        {/* ---------- header ---------- */}
        <header className="rs-adm__head">
          <span className="rs-adm__lang">
            <Icon name="flag-uz" w={19} h={18} />
            O‘zb
            <Icon name="direction-down" size={14} />
          </span>
          <span className="rs-adm__balance">
            <span className="rs-adm__wallet">
              <Icon name="wallet" size={18} />
            </span>
            <span>
              <small>Sizning balansingiz</small>
              <b>329,610 UZS</b>
            </span>
            <span className="rs-adm__topup">
              <Icon name="plus" size={18} />
            </span>
          </span>
          <Icon name="help" w={22} h={22} className="rs-adm__help" />
          <span className={"rs-adm__bell" + (ring ? " is-ring" : "")}>
            <Icon name="notification" size={22} />
            <i />
          </span>
          <span className="rs-adm__ava">R</span>
        </header>

        {/* ---------- buyurtmalar ---------- */}
        <section className="rs-adm__card">
          <div className="rs-adm__top">
            <h4>Buyurtmalar ro‘yxati</h4>
            <span className="rs-adm__btn rs-adm__btn--out">
              <Icon name="file-download-outline" size={18} />
              Yig‘ish varaqasi
            </span>
            <span className="rs-adm__btn rs-adm__btn--soft">
              <Icon name="interactive" size={20} />
              Avto-javob
            </span>
            <span className="rs-adm__btn rs-adm__btn--main">
              <Icon name="plus-fill" size={20} />
              Buyurtma yaratish
            </span>
          </div>

          <div className="rs-adm__tabs">
            {TABS.map((t, i) => (
              <span key={t} className={i === 0 ? "is-on" : undefined}>
                {t}
                {badges[t] > 0 && (
                  <b key={`${t}${badges[t]}`} className={`rs-adm__tabcount rs-adm__tabcount--${t === "Yangi" ? "new" : "progress"}`}>
                    {badges[t]}
                  </b>
                )}
              </span>
            ))}
          </div>

          <div className="rs-adm__tools">
            <span className="rs-adm__search">
              <Icon name="search" size={16} />
              Buyurtma ID‘si, mijoz, buyurtma holati yoki boshqa so‘rov bo‘yicha qidirish
            </span>
            <span className="rs-adm__btn rs-adm__btn--out rs-adm__btn--sm">
              <Icon name="filter-outline" size={18} />
              Filtrlar
            </span>
            <span className="rs-adm__btn rs-adm__btn--out rs-adm__btn--sm">
              <Icon name="file-download-outline" size={18} />
              Eksport
            </span>
          </div>

          <div className="rs-adm__table">
            <div className="rs-adm__th">
              <span>Buyurtma ID‘si</span>
              <span>Mijoz ismi</span>
              <span>Sana va vaqt</span>
              <span>Narx</span>
              <span>To‘lov usuli</span>
              <span>Yetkazib berish turi</span>
              <span>Holat</span>
              <span>Platforma</span>
              <span>Harakat</span>
            </div>
            {rows.map((o) => (
              <div key={o.id} className={"rs-adm__tr" + (o.id === fresh ? " is-fresh" : "")}>
                <span>{o.id}</span>
                <span>{o.client}</span>
                <span>{o.time}</span>
                <span>{uzs(o.price)}</span>
                <span>{o.pay}</span>
                <span className="rs-adm__service">{o.service === "DELIVERY" ? "Yetkazib berish" : "Olib ketish"}</span>
                <span>
                  <em key={o.status} className={`rs-adm__st rs-adm__st--${STATUS[o.status].tone}`}>
                    {STATUS[o.status].label}
                  </em>
                </span>
                <span>
                  <Icon name={o.platform} size={22} />
                </span>
                <span>
                  <Action order={o} pressed={pressed === o.id} />
                </span>
              </div>
            ))}
          </div>

          <div className="rs-adm__foot">
            <span>Ko‘rsatish</span>
            <span className="rs-adm__per">
              10
              <Icon name="direction-down" size={14} />
            </span>
            <span className="rs-adm__info">
              {total} ta yozuvdan 1 dan {Math.min(10, total)} gacha ko‘rsatilgan
            </span>
            <span className="rs-adm__pager">« ‹ › »</span>
          </div>
        </section>
      </div>
      {children}
    </div>
  );
}

// "Harakat" ustuni: rb-frontend/components/orders/action bilan bir xil mantiq
function Action({ order, pressed }: { order: Order; pressed: boolean }) {
  const cls = "rs-adm__act" + (pressed ? " is-press" : "");
  switch (order.status) {
    case "NEW":
      return (
        <span className="rs-adm__acts">
          <span className="rs-adm__act rs-adm__act--red">Bekor qilish</span>
          <span className={cls + " rs-adm__act--green"}>Qabul qilish</span>
        </span>
      );
    case "PROGRESS":
      return (
        <span className={cls}>
          <Icon name="tick" size={16} />
          Tayyor
        </span>
      );
    case "READY":
      return order.service === "DELIVERY" ? (
        <span className={cls + " rs-adm__act--black"}>
          <Icon name="truck" size={16} />
          Yo‘lda
        </span>
      ) : (
        <span className={cls + " rs-adm__act--blue"}>
          <Icon name="tick-double" size={16} />
          Bajarilmoqda
        </span>
      );
    case "ON_THE_WAY":
      return (
        <span className={cls + " rs-adm__act--blue"}>
          <Icon name="tick-double" size={16} />
          Yetkazib berildi
        </span>
      );
    default:
      return null;
  }
}
