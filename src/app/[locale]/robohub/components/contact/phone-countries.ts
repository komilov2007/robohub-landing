// Aloqa formasidagi telefon kodlari. mask — mamlakat ichidagi raqam formati (X — raqam), uzunligi = X lar soni.
// Standart mamlakat sahifa tiliga qarab (contact.script.js → LANG_COUNTRY): uz/kaa — UZ, ru — RU, kk — KZ, ky — KG, tg — TJ, en — UZ.
// Bayroqlar — public/flags.
export const PHONE_COUNTRIES = [
  { id: "uz", code: "998", mask: "(XX) XXX-XX-XX", flag: "/flags/uz.svg" },
  { id: "ru", code: "7", mask: "(XXX) XXX-XX-XX", flag: "/flags/ru.svg" },
  { id: "kz", code: "7", mask: "(XXX) XXX-XX-XX", flag: "/flags/kz.svg" },
  { id: "kg", code: "996", mask: "(XXX) XXX-XXX", flag: "/flags/kg.svg" },
  { id: "tj", code: "992", mask: "(XX) XXX-XX-XX", flag: "/flags/tj.svg" },
  { id: "gb", code: "44", mask: "XXXX XXXXXX", flag: "/flags/gb.svg" },
] as const;
