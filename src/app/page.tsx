import Header from "@/components/header/header";
import Hero from "@/components/hero/hero";
import Ishonch from "@/components/ishonch/ishonch";
import Muammo from "@/components/muammo/muammo";
import Imkoniyatlar from "@/components/imkoniyatlar/imkoniyatlar";
import BepulVositalar from "@/components/bepul-vositalar/bepul-vositalar";
import QandayIshlaydi from "@/components/qanday-ishlaydi/qanday-ishlaydi";
import Integratsiyalar from "@/components/integratsiyalar/integratsiyalar";
import Bozor from "@/components/bozor/bozor";
import Sharhlar from "@/components/sharhlar/sharhlar";
import Tariflar from "@/components/tariflar/tariflar";
import Faq from "@/components/faq/faq";
import Aloqa from "@/components/aloqa/aloqa";
import Yakun from "@/components/yakun/yakun";
import ScrollReveal from "@/components/scroll-reveal/scroll-reveal";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Ishonch />
        <Muammo />
        <Imkoniyatlar />
        <BepulVositalar />
        <QandayIshlaydi />
        <Integratsiyalar />
        <Bozor />
        <Sharhlar />
        <Tariflar />
        <Faq />
        <Aloqa />
        <Yakun />
      </main>
      <ScrollReveal />
    </>
  );
}
