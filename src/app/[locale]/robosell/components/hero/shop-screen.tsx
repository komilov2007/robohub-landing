import Icon from "../icon/svg-icon";
import { SHOP, uzs } from "./demo-data";

// Robosell'da qurilgan do'kon (rb-shop) bosh sahifasi: tuzilma rb-shop'dagidek, kontent — NAMUNA (demo-data.ts).
// 390 px kenglikda chiziladi. Ko'rinishlar CSS da: .rs-shop[data-scene] — 0 tepa, 1+ kolleksiyagacha aylantirilgan,
// 2+ "Sotib olish" bosilgan, 3 — to‘lov oynasi, 4 — "Buyurtma berish" bosildi (yuklanmoqda), 5 — qabul qilindi.
type Props = { scene: number; pick: number; orderId: number; pay: string };

export default function ShopScreen({ scene, pick, orderId, pay }: Props) {
  const product = SHOP.collection[pick];
  const inCart = scene >= 2;
  return (
    <div className="rs-shop" data-scene={scene}>
      <div className="rs-shop__status">
        <b>9:41</b>
        <span className="rs-shop__island" />
        <span className="rs-shop__sig">
          <i />
          <i />
          <i />
          <i />
          <em />
        </span>
      </div>

      <div className="rs-shop__scroll">
        {/* tepa banner */}
        <div className="rs-shop__hero">
          <img src={SHOP.hero} alt="" />
          <span className="rs-shop__me">
            <Icon set="shop" name="user" size={22} />
          </span>
          <span className="rs-shop__chat">
            <Icon set="shop" name="chat" w={39} h={36} />
          </span>
        </div>

        <div className="rs-shop__sheet">
          <div className="rs-shop__search">
            <Icon set="shop" name="search" size={20} />
            Mahsulotlar va toifalarni qidirish
          </div>
          <div className="rs-shop__cats">
            {SHOP.categories.map((c) => (
              <span key={c.img}>
                <img src={c.img} alt="" />
                <small>{c.name}</small>
              </span>
            ))}
          </div>
        </div>

        <div className="rs-shop__block">
          <div className="rs-shop__title">
            <b>🔥 Mashhur</b>
            <span className="rs-shop__more">
              7 yana
              <Icon set="shop" name="direction-right" size={14} />
            </span>
          </div>
          <div className="rs-shop__row">
            {SHOP.popular.map((p) => (
              <span key={p.img} className="rs-shop__mini">
                <img src={p.img} alt="" />
                <b>{uzs(p.price)}</b>
                <small>{p.name}</small>
              </span>
            ))}
          </div>
        </div>

        <div className="rs-shop__block">
          <div className="rs-shop__banner">
            <span>
              <small>{SHOP.promo.tag}</small>
              <b>{SHOP.promo.title}</b>
            </span>
            <img src={SHOP.promo.img} alt="" />
          </div>
          <div className="rs-shop__title">
            <b>{SHOP.collectionTitle}</b>
            <span className="rs-shop__more">
              5 yana
              <Icon set="shop" name="direction-right" size={14} />
            </span>
          </div>
          <div className="rs-shop__grid">
            {SHOP.collection.map((p, i) => (
              <span key={p.img} className={"rs-shop__card" + (i === pick ? " is-pick" : "")}>
                <img src={p.img} alt="" />
                <b>{uzs(p.price)}</b>
                <small>{p.name}</small>
                <span className="rs-shop__rate">
                  <Icon set="shop" name="star" size={16} />
                  <b>5.0</b> (Sharhlar yo‘q)
                </span>
                {i === pick && inCart ? (
                  <span className="rs-shop__counter">
                    <span>
                      <Icon set="shop" name="minus" size={18} />
                    </span>
                    1
                    <span>
                      <Icon set="shop" name="plus" size={18} />
                    </span>
                  </span>
                ) : (
                  <span className={"rs-shop__buy" + (i === pick && scene === 1 ? " is-tap" : "")}>
                    <Icon set="shop" name="shop-bag" size={20} />
                    Sotib olish
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* pastki menyu */}
      <nav className="rs-shop__nav">
        <span className="is-on">
          <Icon set="shop" name="home-polygon-active" />
          Bosh sahifa
        </span>
        <span>
          <Icon set="shop" name="category-square" w={25} h={24} />
          Katalog
        </span>
        <span className="rs-shop__cart">
          <Icon set="shop" name="shopping-bag-remove" />
          <b key={inCart ? "2" : "1"}>{inCart ? 2 : 1}</b>
          Savat
        </span>
        <span>
          <Icon set="shop" name="heart" />
          Sevimlilar
        </span>
        <span>
          <Icon set="shop" name="user" />
          Profil
        </span>
      </nav>

      {/* savat → to'lov → qabul qilindi */}
      <div className="rs-shop__sheet-pay">
        <span className="rs-shop__grip" />
        <div className="rs-shop__pay-body">
          <b className="rs-shop__pay-title">Buyurtmani rasmiylashtirish</b>
          <span className="rs-shop__line">
            <img src={product.img} alt="" />
            <span>
              <b>{product.name}</b>
              <small>1 dona</small>
            </span>
            <b>{uzs(product.price)}</b>
          </span>
          <span className="rs-shop__methods">
            <span className={pay === "Click" ? "is-on" : undefined}>
              <Icon name="click" w={64} h={26} />
            </span>
            <span className={pay === "Payme" ? "is-on" : undefined}>
              <Icon name="payme" w={62} h={18} />
            </span>
            <span className={pay === "Robopay" ? "is-on" : undefined}>
              <Icon name="robo-pay" size={26} />
            </span>
          </span>
          <span className="rs-shop__total">
            Jami <b>{uzs(product.price)}</b>
          </span>
          <span className="rs-shop__order">
            <i className="rs-shop__spin" />
            <em>Buyurtma berish</em>
          </span>
        </div>
        <div className="rs-shop__done">
          <span className="rs-shop__ok">
            <Icon set="shop" name="tick-solid" size={30} />
          </span>
          <b>Buyurtmangiz qabul qilindi</b>
          <small>
            #{orderId} · {pay} orqali to‘landi
          </small>
        </div>
      </div>
    </div>
  );
}
