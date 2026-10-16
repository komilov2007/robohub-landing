import { onest } from "./fonts";
import Header from "./components/header/header";
import Hero from "./components/hero/hero";
import Muammo from "./components/muammo/muammo";
import Kanallar from "./components/kanallar/kanallar";
import Imkoniyatlar from "./components/imkoniyatlar/imkoniyatlar";
import Analitika from "./components/analitika/analitika";
import Integratsiyalar from "./components/integratsiyalar/integratsiyalar";
import QandayIshlaydi from "./components/qanday-ishlaydi/qanday-ishlaydi";
import Tariflar from "./components/tariflar/tariflar";
import Sharhlar from "./components/sharhlar/sharhlar";
import Yakun from "./components/yakun/yakun";
import Footer from "./components/footer/footer";
import Reveal from "./components/reveal/reveal";

// Robosell landingi. Konsepsiya — "do'kon chatdagi suhbat": hero'dan keyingi har bo'lim
// chat pufakchasi (.rs-sec): bir burchagi o'tkir va "dumcha"li, navbatma-navbat chap/o'ng,
// har biri oldingisi ustiga chiqadi. Uslublar: robosell.css, matnlar: robosell.content.ts.
export default function Page() {
  return (
    <div className={`rs ${onest.variable}`} id="top">
      <Header />
      <main>
        <Hero />
        <Muammo />
        <Kanallar />
        <Imkoniyatlar />
        <Analitika />
        <Integratsiyalar />
        <QandayIshlaydi />
        <Tariflar />
        <Sharhlar />
        <Yakun />
      </main>
      <Footer />
      <Reveal />
    </div>
  );
}
