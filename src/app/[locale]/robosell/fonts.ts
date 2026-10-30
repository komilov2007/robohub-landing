import { Onest } from "next/font/google";

// Robosell'ning yagona shrifti. Faqat shu saytda ishlatiladi: o'zgaruvchi .rs ildiziga qo'yiladi,
// shuning uchun Robohub sahifalari uni yuklamaydi. Onest — o'zgaruvchan shrift, 400…800 bitta faylda.
// preload: false — global-not-found Robosell 404'ini import qilgani uchun preload Robohub'ning barcha sahifalariga
// ham tushib, ular uchun keraksiz 34KB shriftni birinchi navbatda yuklatardi. display: swap — matn darhol ko'rinadi.
export const onest = Onest({
  subsets: ["latin"],
  display: "swap",
  variable: "--ff-onest",
  preload: false,
});
