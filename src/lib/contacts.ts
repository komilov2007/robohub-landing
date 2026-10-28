// Aloqa ma'lumotlari — barcha saytlar (Robohub, Robosell, Academy) footer'lari uchun bitta joyda.
// Telefon — barcha saytlarda bitta
export const PHONE = "+998 78 113 82 12";
export const PHONE_HREF = "tel:+998781138212";
// Mobil raqam — hozircha faqat ariza formasi (/application) header'ida
export const PHONE_MOBILE = "+998 99 985 72 26";
export const PHONE_MOBILE_HREF = "tel:+998999857226";
export const EMAIL = "info@robohub.uz";
export const EMAIL_HREF = `mailto:${EMAIL}`;
// Telegram orqali murojaat — barcha saytlarda (Robohub, Academy, AI Studio, Robosell) bitta: @robohubsupport
export const TELEGRAM_HANDLE = "@robohubsupport";
export const TELEGRAM_URL = "https://t.me/robohubsupport";
export const YOUTUBE_URL = "https://www.youtube.com/@robohub_ai";
export const INSTAGRAM_URL = {
  robohub: "https://www.instagram.com/robohub.ai",
  robosell: "https://www.instagram.com/robosell.uz",
} as const;
// Ofis manzili — barcha footerlarda "Aloqa" ro'yxati oxirida (components/office-address); bosilsa Yandex xaritada ochiladi
// (aniq koordinata bo'yicha — ofis nuqtasiga belgi qo'yilgan holda ochiladi).
export const OFFICE_MAP_URL = "https://yandex.uz/maps/?ll=69.274077,41.337263&pt=69.274077,41.337263&z=17&l=map";
export const OFFICE_ADDRESS = {
  uz: "Toshkent sh, Anhor boʻyi koʻchasi, 57A",
  ru: "г. Ташкент, ул. Анхор буйи, 57А",
  en: "57A Anhor Buyi St, Tashkent",
  kk: "Ташкент қ., Анхор бойы көшесі, 57А",
  ky: "Ташкент ш., Анхор бойу көчөсү, 57А",
  kaa: "Tashkent q., Anhor boyı kóshesi, 57A",
  tg: "ш. Тошкент, кӯчаи Анҳор бӯйи, 57А",
} as const;
