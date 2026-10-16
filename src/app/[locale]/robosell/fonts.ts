import { Onest } from "next/font/google";

// Robosell'ning yagona shrifti. Faqat shu saytda ishlatiladi: o'zgaruvchi .rs ildiziga qo'yiladi,
// shuning uchun Robohub sahifalari uni yuklamaydi. Onest — o'zgaruvchan shrift, 400…800 bitta faylda.
export const onest = Onest({
  subsets: ["latin"],
  display: "swap",
  variable: "--ff-onest",
});
