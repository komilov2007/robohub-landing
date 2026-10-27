import { Inter, Manrope, Space_Grotesk, Unbounded } from "next/font/google";

// Shriftlar next/font orqali: fayllar o'z serverimizdan beriladi (Google'ga alohida so'rov yo'q),
// asosiylari oldindan yuklanadi va zaxira shrift o'lchami moslanadi — matn sakramaydi.
// subsets — oldindan yuklanadigani; kirill harflari unicode-range bo'yicha /ru da o'zi yuklanadi.
export const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--ff-unbounded",
});

export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--ff-manrope",
});

// Inter va Space Grotesk — butun loyihada bittadan instansiya: Robohub bosh sahifasi (robohub/fonts.ts),
// AI Studio va Kalkulyator (ai-studio/fonts.ts shularni qayta eksport qiladi). Ikki xil instansiya bo'lsa, nomlari bir xil
// bo'lgani uchun brauzer bitta faylni ikki manzildan ikki marta yuklardi.
// Root layout'ga ulanmaydi — faqat ishlatadigan layout'lar o'z o'ramiga .variable qo'yadi.
// Inter — asosiy matn (o'zgaruvchan og'irlik, kirillni ham qamraydi).
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--ff-inter",
});

// Space Grotesk — sarlavhalar va raqamlar (500/600/700). Kirill harflari yo'q — ular Inter'dan olinadi
// (CSS'da har doim var(--ff-grotesk),var(--ff-inter) tartibida yoziladi).
export const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--ff-grotesk",
});
