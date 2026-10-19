import localFont from "next/font/local";

// Robosell brandbook'idagi lotin shrifti — TT Fors (fayllar: src/app/fonts).
// Sarlavhalar — TT Fors Condensed, matn — TT Fors Display (variable, 200–700).
// Fontda "ʻ" (oʻ, gʻ) va Ққ Ғғ Ҳҳ yo'q — ular zaxiradagi Manrope'dan olinadi (robohub-two.css).
export const ttForsCond = localFont({
  src: [
    { path: "../../fonts/TT_Fors_Trial_Condensed_Medium.ttf", weight: "500", style: "normal" },
    { path: "../../fonts/TT_Fors_Trial_Condensed_Bold.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--ff-tt-fors-cond",
});

export const ttFors = localFont({
  src: "../../fonts/TT_Fors_Display_Trial_Variable.ttf",
  weight: "200 700",
  display: "swap",
  variable: "--ff-tt-fors",
});
