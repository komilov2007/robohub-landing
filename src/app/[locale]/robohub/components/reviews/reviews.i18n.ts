import { defineMessages } from "@/i18n/config";

// Sotuvchilar sharhlari: videosharhlar (reels bilan bir xil ro'yxat — reels/reels.tsx → REELS)
// va Telegram guruhidagi haqiqiy xabarlar (chats.ts).
// Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi.
export const messages = defineMessages({
  uz: {
    titleStart: "Bizga ishonmang — ",
    titleAccent: "sotuvchilarni tinglang",
    lead: "Robohub’dan foydalanayotgan sotuvchilarning videosharhlari va Telegram’dagi fikrlari.",
    videos: "Videosharhlar",
    chats: "Telegram’dagi fikrlar",
    prev: "Oldingi",
    next: "Keyingi",
    watch: "Videoni koʻrish",
    anon: "Robohub mijozi",
    more: "Toʻliq oʻqish",
    close: "Yopish",
  },
  ru: {
    titleStart: "Не верьте нам — ",
    titleAccent: "послушайте продавцов",
    lead: "Видеоотзывы продавцов, которые работают с Robohub, и их сообщения в Telegram.",
    videos: "Видеоотзывы",
    chats: "Отзывы в Telegram",
    prev: "Назад",
    next: "Вперёд",
    watch: "Смотреть видео",
    anon: "Клиент Robohub",
    more: "Читать полностью",
    close: "Закрыть",
  },
  en: {
    titleStart: "Don’t take our word — ",
    titleAccent: "hear it from sellers",
    lead: "Video reviews from sellers who use Robohub, and their messages on Telegram.",
    videos: "Video reviews",
    chats: "Reviews on Telegram",
    prev: "Previous",
    next: "Next",
    watch: "Watch video",
    anon: "Robohub customer",
    more: "Read more",
    close: "Close",
  },
});
