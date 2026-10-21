// Hero sahnasi uchun NAMUNA ma'lumotlar: admin paneldagi buyurtmalar va do'kondagi mahsulotlar.
// Holat, rang va tugma matnlari rb-frontend'dagidek (constants/order.ts → STATUS, components/orders/action).

export type OrderStatus = "NEW" | "PROGRESS" | "READY" | "ON_THE_WAY" | "DELIVERED";
export type Platform = "telegram" | "globe" | "instagram" | "click-outline" | "user";

export type Order = {
  id: number;
  client: string;
  time: string; // "21.10.2026, 17:44"
  price: number;
  pay: string;
  service: "DELIVERY" | "PICKUP";
  status: OrderStatus;
  platform: Platform;
};

export const STATUS: Record<OrderStatus, { label: string; tone: string }> = {
  NEW: { label: "Yangi", tone: "new" },
  PROGRESS: { label: "Jarayonda", tone: "progress" },
  READY: { label: "Tayyor", tone: "ready" },
  ON_THE_WAY: { label: "Yo'lda", tone: "way" },
  DELIVERED: { label: "Yetkazib berildi", tone: "done" },
};

// keyingi holat — admin xodimi tugmani bosganda
export const NEXT: Partial<Record<OrderStatus, OrderStatus>> = {
  NEW: "PROGRESS",
  PROGRESS: "READY",
  READY: "ON_THE_WAY",
  ON_THE_WAY: "DELIVERED",
};

export const DAY = "21.10.2026";
export const FIRST_ID = 29178; // sahifada birinchi bo'lib "tushadigan" buyurtma

export const START_ORDERS: Order[] = [
  { id: 29177, client: "Dilshod R.", time: `${DAY}, 17:44`, price: 420000, pay: "Naqd", service: "DELIVERY", status: "PROGRESS", platform: "user" },
  { id: 29176, client: "Malika T.", time: `${DAY}, 17:31`, price: 1250000, pay: "Click", service: "DELIVERY", status: "READY", platform: "telegram" },
  { id: 29175, client: "Jasur A.", time: `${DAY}, 17:12`, price: 189000, pay: "Payme", service: "PICKUP", status: "READY", platform: "globe" },
  { id: 29174, client: "Nodira K.", time: `${DAY}, 16:58`, price: 690000, pay: "Click", service: "DELIVERY", status: "ON_THE_WAY", platform: "telegram" },
  { id: 29173, client: "Bekzod U.", time: `${DAY}, 16:40`, price: 215000, pay: "Robopay", service: "DELIVERY", status: "ON_THE_WAY", platform: "instagram" },
  { id: 29172, client: "Sevara M.", time: `${DAY}, 16:21`, price: 99000, pay: "Click", service: "PICKUP", status: "DELIVERED", platform: "click-outline" },
  { id: 29171, client: "Otabek N.", time: `${DAY}, 15:57`, price: 189000, pay: "Naqd", service: "DELIVERY", status: "DELIVERED", platform: "telegram" },
  { id: 29170, client: "Kamola Y.", time: `${DAY}, 15:30`, price: 1250000, pay: "Payme", service: "DELIVERY", status: "DELIVERED", platform: "globe" },
  { id: 29169, client: "Sardor B.", time: `${DAY}, 15:02`, price: 690000, pay: "Click", service: "PICKUP", status: "DELIVERED", platform: "telegram" },
];

// har aylanishda do'kondan keladigan buyurtma (navbat bilan)
export const INCOMING = [
  { client: "Aziza K.", product: 0, pay: "Click" },
  { client: "Timur S.", product: 1, pay: "Payme" },
  { client: "Gulnora H.", product: 0, pay: "Robopay" },
  { client: "Rustam E.", product: 1, pay: "Click" },
];

// do'kon (rb-shop) — rasmlar loyihaning o'z fotolari (public/categories, public/ai). NAMUNA mahsulot va narxlar.
export const SHOP = {
  hero: "/categories/clothing.webp",
  categories: [
    { img: "/categories/beauty.webp", name: "Go‘zallik" },
    { img: "/categories/electronics.webp", name: "Elektronika" },
    { img: "/categories/shoes.webp", name: "Poyabzal" },
    { img: "/categories/home.webp", name: "Uy uchun" },
  ],
  popular: [
    { img: "/categories/accessories.webp", price: 1250000, name: "Soat U-Boat Classic" },
    { img: "/categories/electronics.webp", price: 420000, name: "Quloqchin Koss Porta" },
    { img: "/categories/shoes.webp", price: 690000, name: "Krossovka White Glitter" },
  ],
  promo: { tag: "Kuzgi chegirma", title: "−20% go‘zallik", img: "/ai/cosmetics_studio.webp" },
  collectionTitle: "Go‘zallik kolleksiyasi",
  collection: [
    { img: "/ai/cosmetics_composition.webp", price: 149000, name: "Namlovchi krem, 50 ml" },
    { img: "/ai/cosmetics_in_use.webp", price: 189000, name: "Tungi krem, 50 ml" },
    { img: "/categories/beauty.webp", price: 215000, name: "Palitra Pro, 24 rang" },
    { img: "/ai/base_cosmetics.webp", price: 99000, name: "Kunduzgi krem, 30 ml" },
  ],
};

export const uzs = (n: number) => `${n.toLocaleString("en-US")} UZS`;
