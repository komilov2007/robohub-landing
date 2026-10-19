import { Onest } from "next/font/google";

// Academy matn shrifti (brend: matn — Onest, sarlavhalar — umumiy Unbounded).
// O'zgaruvchi faqat .ac ildiziga qo'yiladi — Robohub va Robosell sahifalari bu shriftni yuklamaydi.
export const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--ac-ff-onest",
});
