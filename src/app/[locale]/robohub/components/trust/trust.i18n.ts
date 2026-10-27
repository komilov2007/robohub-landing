import { defineMessages } from "@/i18n/config";

// Kompaniya nomlari (companies.ts) tarjima qilinmaydi — ular xos nomlar.
// stats — kartalar tartibida: kompaniya, mahsulot, buyurtma. Sondagi boʻshliq — uzilmas (NBSP), "+" belgisini komponent qoʻshadi.
export const messages = defineMessages({
  uz: {
    label: "Bizga ishongan sotuvchilar",
    title: "Minglab sotuvchilar",
    titleAccent: "Robohub bilan ishlaydi",
    lead: "Kiyim-kechak va sport anjomlaridan kitob va maishiy texnikagacha — turli sohadagi brendlar va doʻkonlar savdosini Robohub orqali yuritadi.",
    stats: [
      { value: "1 000", label: "kompaniya" },
      { value: "10 000", label: "mahsulot" },
      { value: "100 000", label: "buyurtma" },
    ],
  },
  ru: {
    label: "Нам доверяют продавцы",
    title: "Тысячи продавцов",
    titleAccent: "уже работают с Robohub",
    lead: "От одежды и спорттоваров до книг и бытовой техники — бренды и магазины из разных ниш ведут продажи через Robohub.",
    stats: [
      { value: "1 000", label: "компаний" },
      { value: "10 000", label: "товаров" },
      { value: "100 000", label: "заказов" },
    ],
  },
  en: {
    label: "Sellers who trust us",
    title: "Thousands of sellers",
    titleAccent: "already run on Robohub",
    lead: "From apparel and sportswear to books and home appliances — brands and stores across every niche run their sales through Robohub.",
    stats: [
      { value: "1,000", label: "companies" },
      { value: "10,000", label: "products" },
      { value: "100,000", label: "orders" },
    ],
  },
});
