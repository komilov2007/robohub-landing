import { defineMessages } from "@/i18n/config";

// Kompaniya nomlari (companies.ts) tarjima qilinmaydi — ular xos nomlar.
// stats — kartalar tartibida: sotuvchi, mahsulot, buyurtma. Sondagi boʻshliq — uzilmas (NBSP), "+" belgisini komponent qoʻshadi.
// Kartalar ostidagi qator: marketpleys logotiplari (mps — ularning umumiy nomi, ekran oʻquvchilar uchun),
// keyin reach — trust.tsx dagi REACH_ICONS tartibida: mamlakatlar, bitta kabinet.
export const messages = defineMessages({
  uz: {
    label: "Bizga ishongan sotuvchilar",
    title: "1 000 dan ortiq sotuvchi",
    titleAccent: "allaqachon Robohub bilan ishlaydi",
    lead: "Kiyim-kechak va kosmetikadan elektronika va uy-roʻzgʻor buyumlarigacha — turli soha sotuvchilari savdosini Robohub orqali boshqaradi.",
    stats: [
      { value: "1 000", label: "ulangan sotuvchi" },
      { value: "500 000", label: "tizimdagi mahsulot" },
      { value: "900 000", label: "qayta ishlangan buyurtma" },
    ],
    mps: "Marketpleyslar",
    reach: [
      { value: "4 ta", label: "mamlakat" },
      { value: "Bitta", label: "kabinet" },
    ],
  },
  ru: {
    label: "Нам доверяют продавцы",
    title: "Более 1 000 продавцов",
    titleAccent: "уже работают с Robohub",
    lead: "От одежды и косметики до электроники и товаров для дома — продавцы из разных сфер управляют продажами через Robohub.",
    stats: [
      { value: "1 000", label: "подключённых продавцов" },
      { value: "500 000", label: "товаров в системе" },
      { value: "900 000", label: "обработанных заказов" },
    ],
    mps: "Маркетплейсы",
    reach: [
      { value: "4", label: "страны" },
      { value: "Один", label: "кабинет" },
    ],
  },
  en: {
    label: "Sellers who trust us",
    title: "Over 1,000 sellers",
    titleAccent: "already run on Robohub",
    lead: "From apparel and cosmetics to electronics and home goods — sellers from every niche manage their sales through Robohub.",
    stats: [
      { value: "1,000", label: "connected sellers" },
      { value: "500,000", label: "products in the system" },
      { value: "900,000", label: "orders processed" },
    ],
    mps: "Marketplaces",
    reach: [
      { value: "4", label: "countries" },
      { value: "One", label: "dashboard" },
    ],
  },
});
