import { Inter, Onest, Space_Grotesk } from "next/font/google";

// AI Studio shriftlari — faqat shu saytda (o'zgaruvchilar .as ildiziga qo'yiladi).
//   Inter — asosiy matn va kichik yorliqlar; Space Grotesk — katta sarlavhalar va raqamlar (500/600/700).
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--ff-as-inter",
});

export const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--ff-as-grotesk",
});

// Onest — faqat header va footer uchun (Robohub Academy header/footer'i bilan bir xil ko'rinishi uchun).
export const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--ff-as-onest",
});
