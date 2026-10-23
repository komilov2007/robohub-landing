import { Inter, Manrope, Unbounded } from "next/font/google";

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

// Inter — butun loyihada bitta instansiya (o'zgaruvchan og'irlik): Robohub bosh sahifasidagi miniatyura oynalar,
// AI Studio va Kalkulyator (ai-studio/fonts.ts shuni qayta eksport qiladi). Ikki xil Inter bo'lsa, nomlari bir xil
// ("Inter") bo'lgani uchun brauzer bitta faylni ikki manzildan ikki marta yuklardi.
// Root layout'ga ulanmaydi — faqat ishlatadigan layout'lar o'z o'ramiga .variable qo'yadi.
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--ff-inter",
});
