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

// Faqat ikki joyda (miniatyura oynalar ichida) ishlatiladi — oldindan yuklash shart emas
export const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  preload: false,
  variable: "--ff-inter",
});
