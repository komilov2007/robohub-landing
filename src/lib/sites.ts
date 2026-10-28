// Saytlar orasidagi havolalar (har sayt alohida domenda — src/proxy.ts).
// Robohub Academy — Robohub saytining /academy sahifasi (robohub.uz/academy, robohub-landing.vercel.app/academy).
// Nisbiy yo'l (qaysi domenda ochilgan bo'lsa, o'sha domendagi /academy).
export const ACADEMY_PATH = "/academy";

// Sotuvchi kabinetida ro'yxatdan o'tish — "Sinab ko'rish" tugmalari
export const REGISTER_URL = "https://seller.robohub.uz/register";

// Landingdan boshqa sahifaga (Academy, kalkulyator, AI Studio …) olib boradigan havola — yangi oynada ochiladi;
// sahifa ichidagi bo'limlarga (#…) havolalar o'sha oynada qoladi. Ishlatish: <a href={h} {...newTab(h)}>
export const newTab = (href: string) => (href.startsWith("#") ? {} : { target: "_blank", rel: "noopener" });
