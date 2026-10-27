import { Onest } from "next/font/google";

// AI Studio shriftlari (o'zgaruvchilar .as ildiziga qo'yiladi).
//   Inter — asosiy matn va kichik yorliqlar; Space Grotesk — katta sarlavhalar va raqamlar (500/600/700).
// Inter va Space Grotesk — loyihadagi yagona instansiyalar (src/app/fonts.ts; Robohub bosh sahifasi ham shularni ishlatadi),
// o'zgaruvchilari --ff-inter va --ff-grotesk: bir xil faylni ikki marta yuklamaslik uchun
export { grotesk, inter } from "../../fonts";

// Onest — faqat header va footer uchun (Robohub Academy header/footer'i bilan bir xil ko'rinishi uchun).
export const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--ff-as-onest",
});
