// Saytlar orasidagi havolalar (har sayt alohida domenda — src/proxy.ts).
// Robohub Academy — Robohub saytining /academy sahifasi (robohub.uz/academy, robohub-landing.vercel.app/academy).
// Nisbiy yo'l (qaysi domenda ochilgan bo'lsa, o'sha domendagi /academy).
export const ACADEMY_PATH = "/academy";

// Sotuvchi kabinetida ro'yxatdan o'tish — "Sinab ko'rish" tugmalari
export const REGISTER_URL = "https://seller.robohub.uz/register";

// Landingdan boshqa sahifaga (Academy, kalkulyator, AI Studio …) olib boradigan havola — yangi oynada ochiladi;
// sahifa ichidagi bo'limlarga (#…) havolalar o'sha oynada qoladi. Ishlatish: <a href={h} {...newTab(h)}>
export const newTab = (href: string) => (href.startsWith("#") ? {} : { target: "_blank", rel: "noopener" });

// Sotuvchi kabineti (seller.robohub.uz) — landingda tanlangan tilda ochiladi: ?lang=uz|ru|en.
// path: "/register" — ro'yxatdan o'tish, "" — kirish. Ishlatish: sellerUrl(locale), sellerUrl(locale, "")
export const SELLER_ORIGIN = "https://seller.robohub.uz";
// kabinet (admin panel) faqat uz/ru/en tillarida: qozoq, qirg'iz, tojik va qoraqalpoq sahifasidan — o'zbekcha ochiladi
const SELLER_LANG: Record<string, string> = { kk: "uz", ky: "uz", tg: "uz", kaa: "uz" };
export const sellerUrl = (locale: string, path = "/register") => `${SELLER_ORIGIN}${path}?lang=${SELLER_LANG[locale] ?? locale}`;

// Maxfiylik siyosati (Robohub saytidagi sahifa)
export const POLICY_URL = "https://robohub.uz/policy/";
