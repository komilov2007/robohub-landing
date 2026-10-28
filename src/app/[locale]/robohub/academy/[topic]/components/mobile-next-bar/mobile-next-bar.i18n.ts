import { defineMessages } from "@/i18n/config";

export const messages = defineMessages({
  uz: { next: (n: number) => `Keyingi dars · ${n}`, watch: "Ko‘rish" },
  ru: { next: (n: number) => `Следующий урок · ${n}`, watch: "Смотреть" },
  en: { next: (n: number) => `Next lesson · ${n}`, watch: "Watch" },
  kk: { next: (n: number) => `Келесі сабақ · ${n}`, watch: "Көру" },
  ky: { next: (n: number) => `Кийинки сабак · ${n}`, watch: "Көрүү" },
  kaa: { next: (n: number) => `Keyingi sabaq · ${n}`, watch: "Kóriw" },
  tg: { next: (n: number) => `Дарси навбатӣ · ${n}`, watch: "Тамошо" },
});
