import { defineMessages } from "@/i18n/config";

export const messages = defineMessages({
  uz: { next: (n: number) => `Keyingi dars · ${n}`, watch: "Ko‘rish" },
  ru: { next: (n: number) => `Следующий урок · ${n}`, watch: "Смотреть" },
  en: { next: (n: number) => `Next lesson · ${n}`, watch: "Watch" },
});
