// Darslar va ularning izohlari — qoraqalpoqcha matn (uz: academy.ts / lesson-notes.ts, dars raqami bo'yicha)
import type { AcademyContent } from "./types";

export const lessons: AcademyContent["lessons"] = {
  // ───────── ANALITIKA ─────────
  1: {
    title: "Dashboard: satıwlar hám analitikanı qalay baqlaw kerek?",
    summary: "Marketpleyslerdegi satıwlardıń tiykarǵı kórsetkishleri — bir orında.",
    points: [
      "Satıwlardıń ulıwma kórsetkishleri",
      "Marketpleysler boyınsha nátiyjelerdi salıstırıw",
      "Buyırtpalar dinamikası",
      "Ónimler boyınsha kórsetkishlerdi analizlew",
      "Satıwlardıń ósiwin hám túsiwin anıqlaw",
      "Kerekli dáwir boyınsha maǵlıwmatlar",
    ],
  },
  2: {
    title: "Barlıq qárejetlerdi qalay baqlaw kerek?",
    summary:
      "Qansha satqanıńız ǵana emes, qansha qárejet etkenińiz hám qansha payda qalǵanı da áhmiyetli.",
    points: [
      "Operaciyalıq qárejetler",
      "Marketpleys komissiyaları",
      "Logistika",
      "Reklama",
      "Saqlaw qárejetleri",
      "Shtraflar hám basqa qárejetler",
      "Hár bir qárejettiń ulıwma qárejetlerdegi úlesi",
    ],
  },
  3: {
    title: "TOP-ónimlerdi qalay anıqlaw kerek?",
    summary: "Qaysı ónimler eń jaqsı satılıp, eń kóp túsim ákelip atır.",
    points: [
      "Eń kóp satılatuǵın ónimler",
      "Ónimler boyınsha satıw nátiyjelerin salıstırıw",
      "Qaysı SKU kóbirek buyırtpa ákeledi",
      "Kúshli hám hálsiz ónimler",
      "Maǵlıwmatlarǵa tiykarlanǵan assortiment sheshimleri",
    ],
  },
  4: {
    title: "ABC-analiz: qaysı ónimler kóbirek payda ákeledi?",
    summary: "Ónimlerdi nátiyjesine qarap A, B hám C toparlarına bóliw.",
    points: [
      "A — tiykarǵı nátiyjeni beretuǵın ónimler",
      "B — ortasha nátiyje",
      "C — ulıwma nátiyjedegi úlesi kishi",
      "Hár bir topar boyınsha: SKU sanı, GMV, satıw, marja, qárejetler, qaytarıwlar hám biykar etilgenler",
    ],
  },
  5: {
    title: "XYZ-analiz: ónimlerge talaptı qalay anıqlaw kerek?",
    summary: "Ónimlerdi satıwdıń turaqlılıǵına qarap X, Y hám Z toparlarına bóliw.",
    points: [
      "X — turaqlı satıwlar",
      "Y — ózgermeli talap",
      "Z — turaqsız satıwlar, boljaw qıyın",
      "Qaldıqlardı dálirek rejelestiriw",
      "Artıqsha qor hám tapshılıq qáwipi azayadı",
    ],
  },
  6: {
    title: "ABC × XYZ-analiz: ónimlerdi qalay basqarıw kerek?",
    summary:
      "Ónimniń biznes ushın áhmiyetin hám talaptıń turaqlılıǵın birge bahalaw: AX-tan CZ-ke shekem 9 topar.",
    points: [
      "ABC — biznes nátiyjesi ushın áhmiyeti",
      "XYZ — talaptıń turaqlılıǵı",
      "AX, AY, AZ, BX, BY, BZ, CX, CY, CZ toparları",
      "Topar ishinde: GMV, satıw, marja, qárejetler, qaytarıwlar hám biykar etilgenler",
    ],
  },
  7: {
    title: "Operaciyalıq qárejetlerdi qalay kirgiziw kerek?",
    summary:
      "Haqıyqıy paydanı kóriw ushın biznestiń operaciyalıq qárejetlerin kirgiziw hám sazlaw.",
    points: [
      "Salıq procenti",
      "Ay sayınǵı turaqlı salıqlar",
      "Ónim birligine tuwrı keletuǵın ortasha qárejet",
      "Xızmetkerler ushın ay sayınǵı qárejetler",
      "Marja hám ROI-dı dálirek esaplaw",
    ],
  },
  8: {
    title: "Ónimniń ózine túser bahasın qalay kirgiziw kerek?",
    summary: "Ózine túser bahanı Robohubqa júkleń hám satıwlardıń haqıyqıy nátiyjesin kóriń.",
    points: [
      "Ónimniń ózine túser bahasın kirgiziw",
      "Ózine túser baha maǵlıwmatların júklew",
      "Ózine túser baha nege áhmiyetli",
      "Túsim hám qárejetlerdi durıs analizlew",
      "Hár bir ónim boyınsha haqıyqıy nátiyje",
    ],
  },

  // ───────── BUYIRTPALAR ─────────
  9: {
    title: "Buyırtpalar dinamikasın qalay analizlew kerek?",
    summary: "Buyırtpalar ósip atır ma yamasa azayıp atır ma — dáwir boyınsha dinamikanı baqlań.",
    points: [
      "Buyırtpalar sanı",
      "Tańlanǵan dáwirdegi dinamika",
      "Buyırtpalar qay jerden kelip atır",
      "Ósiw hám túsiwdi anıqlaw",
    ],
  },
  10: {
    title: "Yandex Market buyırtpaların qalay basqarıw kerek?",
    summary:
      "Yandex Market buyırtpaların tikkeley Robohubta ashıń, tekseriń hám qayta isleń.",
    points: [
      "Buyırtpalardı qay jerden kóriw kerek",
      "Jańa buyırtpanı ashıw hám tekseriw",
      "Buyırtpa menen islew",
      "Statuslardı baqlaw",
    ],
  },
  11: {
    title: "Wildberries buyırtpaların qalay qayta islew kerek?",
    summary: "Wildberries buyırtpaların Robohub kabinetinen qayta islew.",
    points: [
      "Buyırtpalardı kóriw",
      "Jańa buyırtpanı tekseriw",
      "Buyırtpanı qayta islew",
      "Statustı baqlaw",
    ],
  },
  12: {
    title: "Uzum Market buyırtpaların qalay qayta islew kerek?",
    summary: "Uzum Market buyırtpaların Robohub kabinetinen qayta islew.",
    points: [
      "Buyırtpalardı kóriw",
      "Jańa buyırtpanı tekseriw",
      "Buyırtpanı qayta islew",
      "Statustı baqlaw",
    ],
  },
  13: {
    title: "FBO támiyinlewin qalay jaratıw kerek?",
    summary: "Ónimdi marketpleys skladına jiberiw ushın támiyinlew jaratıw.",
    points: [
      "FBO támiyinlew bólimine ótiw",
      "Jańa támiyinlew jaratıw",
      "Ónimlerdi hám olardıń sanın tańlaw",
      "Maǵlıwmatlardı tekseriw",
      "Tayar támiyinlewlerdi basqarıw",
    ],
  },
  14: {
    title: "Uzum Market buyırtpaları: statustı basqarıw",
    summary: "«Buyırtpalar» bóliminde Uzum Market buyırtpalarınıń statusın basqarıw.",
    points: [
      "«Buyırtpalar» bólimine ótiw",
      "Uzum Market buyırtpaların kóriw",
      "Maǵlıwmatlardı tekseriw",
      "Buyırtpa statusın basqarıw",
    ],
  },

  // ───────── ÓNIMLER ─────────
  15: {
    title: "Bahalardı qalay jańalaw kerek?",
    summary: "Ónim bahasın ózgertiń hám jańa bahanı marketpleyske jiberiń.",
    points: [
      "«Ónimler» bólimine ótiw",
      "Ónim bahasın ózgertiw",
      "Jańa bahanı kirgiziw",
      "Bahanı marketpleyske jiberiw",
    ],
  },
  16: {
    title: "Ónim kartochkasın qalay jaratıw kerek?",
    summary: "Jańa ónim kartochkasın jaratıw hám onı marketpleyske jiberiw.",
    points: [
      "Jańa kartochka jaratıw",
      "Ónim maǵlıwmatların kirgiziw",
      "Baha hám basqa maydanlardı toltırıw",
      "Saqlaw hám marketpleyske jiberiw",
    ],
  },

  // ───────── SKLAD ─────────
  17: {
    title: "Skladlardı toparlaw (qısqasha)",
    summary: "Skladlardı toparlawǵa qısqasha sholıw.",
    points: [
      "Skladlar bólimine ótiw",
      "Bar skladlardı kóriw",
      "Skladlardı toparlarǵa bóliw",
    ],
  },
  18: {
    title: "Skladlardı qalay toparlaw kerek?",
    summary:
      "Skladlardı toparlarǵa bólip, olardı bir kabinetten tártipli basqarıń.",
    points: [
      "«Sklad» bólimine ótiw",
      "Bar skladlardı kóriw",
      "Skladlardı toparlarǵa bóliw",
      "Sklad toparların basqarıw",
      "Toparlanǵan skladlar menen islew",
    ],
  },
  19: {
    title: "Missing degen ne hám onıń menen qalay islew kerek?",
    summary: "Skladtaǵı Missing statusındaǵı ónimlerdi kóriw hám olar menen islew.",
    points: [
      "«Sklad» bólimine ótiw",
      "Missing bólimin kóriw",
      "Missing statusındaǵı ónimler",
      "Ónim maǵlıwmatların tekseriw",
    ],
  },

  // ───────── MARKETING ─────────
  20: {
    title: "Promokodlar hám akciyalar kalendarın qalay basqarıw kerek?",
    summary: "Marketpleyslerdiń promokodları hám akciyaları — bir kabinette.",
    points: [
      "«Marketing» bólimine ótiw",
      "Promokodlardı kóriw hám basqarıw",
      "Akciyalar kalendarı",
      "Akciyalardıń sáneleri hám shártleri",
    ],
  },
  21: {
    title: "Boost TOP penen qalay islew kerek?",
    summary: "Boost TOP funkciyası járdeminde ónimlerdi basqarıw.",
    points: [
      "«Marketing» bólimine ótiw",
      "Boost TOP bólimin ashıw",
      "Boost TOP maǵlıwmatların kóriw",
      "Ónimlerdi Boost TOP arqalı basqarıw",
    ],
  },

  // ───────── INTEGRACIYA ─────────
  22: {
    title: "Uzum Marketti qalay jalǵaw kerek?",
    summary: "Uzum Market akkauntın Robohubqa jalǵaw hám integraciyanı iske qosıw.",
    points: [
      "«Integraciya» bólimine ótiw",
      "Uzum Marketti tańlaw",
      "Akkauntti jalǵaw",
      "Integraciya maǵlıwmatların kirgiziw",
      "Jalǵanıwdı tekseriw hám iske qosıw",
    ],
  },
  23: {
    title: "Wildberriesti qalay jalǵaw kerek?",
    summary: "Wildberries akkauntın Robohubqa jalǵaw hám integraciyanı iske qosıw.",
    points: [
      "«Integraciya» bólimine ótiw",
      "Wildberriesti tańlaw",
      "Akkauntti jalǵaw",
      "Integraciya maǵlıwmatların kirgiziw",
      "Jalǵanıwdı tekseriw hám iske qosıw",
    ],
  },
  24: {
    title: "Yandex Marketti qalay jalǵaw kerek?",
    summary: "Yandex Market akkauntın Robohubqa jalǵaw hám integraciyanı iske qosıw.",
    points: [
      "«Integraciya» bólimine ótiw",
      "Yandex Marketti tańlaw",
      "Akkauntti jalǵaw",
      "Integraciya maǵlıwmatların kirgiziw",
      "Jalǵanıwdı tekseriw hám iske qosıw",
    ],
  },
  25: {
    title: "Ozondı qalay jalǵaw kerek?",
    summary: "Ozon akkauntın Robohubqa jalǵaw hám integraciyanı iske qosıw.",
    points: [
      "«Integraciya» bólimine ótiw",
      "Ozondı tańlaw",
      "Akkauntti jalǵaw",
      "Integraciya maǵlıwmatların kirgiziw",
      "Jalǵanıwdı tekseriw hám iske qosıw",
    ],
  },

  // ───────── BAYLANIS ─────────
  26: {
    title: "«Chat» bólimi qalay isleydi?",
    summary: "Marketpleyslerdegi xarıydarlar menen jazısıwlar — bir kabinette.",
    points: [
      "«Chat» bólimine ótiw",
      "Chatlar dizimi",
      "Xarıydarlar menen jazısıwlardı kóriw",
      "Xabarlardı basqarıw",
    ],
  },
  27: {
    title: "Pikirlerge avtojuwap qalay isleydi?",
    summary: "«Avtojuwap» funkciyası járdeminde xarıydarlardıń pikirlerine avtomatlıq juwap beriw.",
    points: [
      "«Avtojuwap» bólimine ótiw",
      "Xarıydarlardıń pikirlerin kóriw",
      "Pikirlerge avtomatlıq juwaplar",
      "Avtojuwap sazlawları",
    ],
  },

  // ───────── BASQARIW ─────────
  28: {
    title: "«Hújjetler» bólimi qalay isleydi?",
    summary:
      "Marketpleysler menen islesiw boyınsha hújjetler — bir kabinette kóriw hám basqarıw.",
    points: [
      "«Hújjetler» bólimine ótiw",
      "Hújjetler dizimi",
      "Hújjet maǵlıwmatların kóriw",
      "Hújjetlerdi basqarıw",
    ],
  },
  29: {
    title: "Xızmetkerler ushın rollardı qalay qosıw kerek?",
    summary: "Xızmetkerlerge rol hám kiriw huqıqların belgilew.",
    points: [
      "«Xızmetkerler» bólimine ótiw",
      "Rollar bólimin ashıw",
      "Jańa rol qosıw hám oǵan at beriw",
      "Rol ushın huqıqlardı belgilew",
      "Rollardı basqarıw",
    ],
  },
  30: {
    title: "Infografika: satıw maǵlıwmatların qalay kórgizbeli kóriw múmkin?",
    summary:
      "Oqıw materialları bólimindegi «Infografika» funkciyası járdeminde marketpleys maǵlıwmatların kórgizbeli kóriw.",
    points: [
      "Oqıw materialları bólimine ótiw",
      "Infografika menen tanısıw",
      "Marketpleys maǵlıwmatların kórgizbeli kóriw",
      "Satıw kórsetkishlerin túsiniw",
    ],
  },
};

export const notes: AcademyContent["notes"] = {
  // ───────── ANALITIKA ─────────
  1: {
    concept:
      "Dashboard — biznesińizdiń tiykarǵı kórsetkishleri bir ekranǵa jıynalǵan bet. Ulıwma satıwlar, buyırtpalar sanı hám hár bir marketpleystiń nátiyjesi bir qarawda kórinedi; kerekli dáwirdi tańlap, kórsetkishlerdi salıstırıw múmkin.",
    why: "Tórt marketpleys kabinetin bólek-bólek ashıp, sanlardı qolda jıynaw — kóp waqıt aladı hám qátelerge alıp keledi. Dashboard satıwlar qay jerde ósip, qay jerde túsip atırǵanın birden kórsetedi — sheshimler tezirek qabıl etiledi.",
    tip: "Hár kúndi dashboardtan baslań: aldınǵı dáwir menen salıstırıw keskin ózgerislerdi óz waqtında ańlawǵa járdem beredi.",
  },
  2: {
    concept:
      "Qárejetler analizi satıwdan túsken pul qayda ketip atırǵanın kórsetedi: marketpleys komissiyası, logistika, reklama, saqlaw, shtraflar hám operaciyalıq qárejetler. Hár bir qárejettiń ulıwma qárejetlerdegi úlesi bólek kórinedi.",
    why: "Kóp satıw — ele kóp payda degeni emes. Qaysı qárejet eń kóp pul alıp atırǵanın bilseńiz, tap sonı optimallastırıp, taza paydanı arttıra alasız.",
    tip: "Úlesi eń úlken 2–3 qárejetten baslań — tap solar paydaǵa eń tez tásir etedi.",
  },
  3: {
    concept:
      "TOP-ónimler — eń jaqsı satılıp, eń kóp túsim ákeletuǵın SKU-lar dizimi. Ónimler satıw nátiyjeleri boyınsha salıstırıladı, kúshli hám hálsiz poziciyalar anıq ajıralıp turadı.",
    why: "Ádette túsimniń tiykarǵı bólegin kishi bir topar ónim beredi. Olardı bilseńiz, qaldıqlardı óz waqtında toltırasız, reklama hám assortiment boyınsha sheshimlerdi boljawǵa emes, maǵlıwmatlarǵa tiykarlanıp qabıl etesiz.",
  },
  4: {
    concept:
      "ABC-analiz ónimlerdi biznes nátiyjesine qosqan úlesine qarap úsh toparǵa bóledi: A — tiykarǵı nátiyjeni beretuǵın ónimler, B — ortasha nátiyje, C — ulıwma nátiyjedegi úlesi kishi ónimler. Hár bir topar boyınsha SKU sanı, GMV, satıw, marja, qárejetler, qaytarıwlar hám biykar etilgenler kórinedi.",
    why: "Barlıq ónimlerge birdey itibar beriw múmkin emes. ABC biznesti qaysı ónimler «uslap turǵanın» kórsetedi: A toparı skladta hámme waqıt bolıwı kerek, al C toparın qayta kórip shıǵıw yamasa assortimentten shıǵarıw múmkin.",
  },
  5: {
    concept:
      "XYZ-analiz ónimlerdi talaptıń turaqlılıǵına qarap toparlaydı: X — turaqlı satıwlar, Y — ózgermeli talap, Z — boljaw qıyın bolǵan turaqsız satıwlar.",
    why: "Talabı turaqlı ónimdi aldınnan dál rejelestiriw múmkin, al talabı turaqsız ónimde abaylı bolıw kerek. Bul qaldıqlardı dálirek rejelestiriwge hám artıqsha qor menen tapshılıq qáwipin azaytıwǵa járdem beredi.",
  },
  6: {
    concept:
      "ABC × XYZ — eki analizdiń birlesiwi: ónimniń biznes ushın áhmiyeti (ABC) hám talaptıń turaqlılıǵı (XYZ) birge bahalanadı. Nátiyjede AX-tan CZ-ke shekem 9 topar payda boladı, hár birinde GMV, satıw, marja hám qárejetler kórinedi.",
    why: "Hár bir toparǵa óz strategiyası kerek. Mısalı, AX — áhmiyetli hám turaqlı ónim, onı hámme waqıt jetkilikli qorda uslaw kerek; CZ — úlesi kishi hám talabı turaqsız ónim, oǵan artıqsha pul baylap qoyıwdıń keregi joq.",
    tip: "Dáslep AX, AY hám CZ toparlarına qarań — eń áhmiyetli hám eń qáwipli ónimler usı jerde.",
  },
  7: {
    concept:
      "Operaciyalıq qárejetler — ózine túser baha hám marketpleys komissiyalarınan tısqarı, biznesti júrgiziw ushın hár ay jumsalatuǵın pul: salıq procenti, ay sayınǵı turaqlı salıqlar, xızmetkerlerdiń aylıqları hám ónim birligine tuwrı keletuǵın ortasha qárejetler.",
    why: "Bul qárejetler esapqa alınbasa, payda haqıyqatında barınan kóbirek bolıp kórinedi. Olardı Robohubqa kirgizgennen keyin marja hám ROI haqıyqıy sanlar boyınsha esaplanadı — qaysı ónim haqıyqatında payda ákeletuǵını anıq boladı.",
    tip: "Qárejetlerdi bir ret tolıq kirgiziń hám ózgeris bolǵanda jańalap turıń — sonda esabatlar hámme waqıt dál boladı.",
  },
  8: {
    concept:
      "Ózine túser baha — ónimdi satıp alıwǵa yamasa islep shıǵarıwǵa jumsalǵan summa. Robohubta ózine túser bahanı hár bir ónim ushın qolda kirgiziw yamasa dizim túrinde júklew múmkin.",
    why: "Ózine túser bahasız sistema tek túsimdi kóredi, paydanı emes. Onı kirgizgennen keyin hár bir ónimniń haqıyqıy nátiyjesi kórinedi — qansha satılǵanı emes, qansha pul ákelgeni.",
  },

  // ───────── BUYIRTPALAR ─────────
  9: {
    concept:
      "Buyırtpalar dinamikası — tańlanǵan dáwirde buyırtpalar sanınıń qalay ózgergeni: ósip atır ma yamasa azayıp atır ma hám buyırtpalar qaysı marketpleyslerden kelip atır.",
    why: "Dinamika mashqala yamasa múmkinshilikti sanlar keskin ózgermesten burın kórsetedi. Túsiwdi óz waqtında ańlasańız, onıń sebebin — baha, qaldıqlar yamasa básekilesler — tabıwǵa úlgeresiz.",
  },
  10: {
    concept:
      "Yandex Market buyırtpaları Robohub kabinetinde kórinedi: bul jerde jańa buyırtpanı ashıw, onıń quramın tekseriw, onıń menen islew hám statusın baqlaw múmkin.",
    why: "Barlıq buyırtpalar menen marketpleys kabinetine bólek kirmey-aq bir orında isleysiz — waqıt únemlenedi hám birde-bir buyırtpa itibarsız qalmaydı.",
  },
  11: {
    concept:
      "Wildberries buyırtpaları Robohub kabinetine jıynaladı: jańa buyırtpanı kóriw, tekseriw, qayta islew hám statusın baqlaw — bir orında.",
    why: "Bir neshe marketpleyste satsańız, hár bir kabinettegi buyırtpalardı bólek baqlaw qıyın. Hámmesi bir aynada bolǵanda buyırtpalar tezirek qayta islenedi, qáteler azayadı.",
  },
  12: {
    concept:
      "Uzum Market buyırtpaları Robohub kabinetinde kórinedi — olardı tekseriw, qayta islew hám statusın baqlaw múmkin.",
    why: "Buyırtpa qanshelli tez qayta islense, xarıydar onı sonshelli tez aladı — bul reyting hám pikirlerge tikkeley tásir etedi. Bir kabinette islew bul processti tezletedi.",
  },
  13: {
    concept:
      "FBO (Fulfillment by Operator) — ónimlerińiz marketpleys skladında saqlanatuǵın, al buyırtpalardı marketpleystiń ózi jetkerip beretuǵın model. Támiyinlew — qaysı ónimler qansha muǵdarda marketpleys skladına jiberiletuǵını rásmiylestiriletuǵın arza.",
    why: "Támiyinlew durıs dúzilse, ónim skladqa óz waqtında jetedi hám satıwlar toqtap qalmaydı. Robohubta ónimlerdi hám olardıń sanın tańlap, maǵlıwmatlardı tekserip, tayar támiyinlewlerdi basqarıw múmkin.",
    tip: "Támiyinlew jaratıwdan aldın qaldıqlarǵa hám ABC/XYZ nátiyjelerine qarań — eń kerekli ónimlerdi birinshi gezekte jiberiń.",
  },
  14: {
    concept:
      "Buyırtpa statusı buyırtpanıń qaysı basqıshta turǵanın kórsetedi. «Buyırtpalar» bóliminde Uzum Market buyırtpaların kóriw, olardıń maǵlıwmatların tekseriw hám statusın basqarıw múmkin.",
    why: "Status óz waqtında jańalanıp barsa, keshigiwler hám biykar etiwler azayadı, hár bir buyırtpanıń qay jerde ekenligi hámme waqıt anıq boladı.",
  },

  // ───────── ÓNIMLER ─────────
  15: {
    concept:
      "Bahanı jańalaw — Robohubta ónim bahasın ózgertip, jańa bahanı tikkeley marketpleyske jiberiw.",
    why: "Hár bir marketpleys kabinetinde bahanı bólek ózgertiw kóp waqıt aladı hám qátelerge alıp keledi. Bir orınnan jańalaw akciyalarǵa, mawsımǵa yamasa básekileslerdiń háreketlerine tez juwap beriwge múmkinshilik beredi.",
    tip: "Bahanı ózgertiwden aldın ózine túser baha hám qárejetler kirgizilgenin tekseriń — sonda jańa bahadaǵı marjanı bilesiz.",
  },
  16: {
    concept:
      "Ónim kartochkası — ónimińizdi xarıydarǵa tanıstıratuǵın marketpleystegi bet: atı, xarakteristikaları, bahası hám basqa maydanlar. Robohubta jańa kartochka jaratıp, onı toltırıp, saqlap, marketpleyske jiberiw múmkin.",
    why: "Jaqsı toltırılǵan kartochka izlewde jaqsıraq kórinedi hám xarıydardı tezirek isendiredi. Kartochkalardı bir orınnan jaratıw waqıttı únemleydi.",
  },

  // ───────── SKLAD ─────────
  17: {
    concept:
      "Skladlardı toparlaw — bir neshe skladtı ózińizge qolaylı toparlarǵa birlestiriw. Bul sabaq — processke qısqasha sholıw.",
    why: "Skladlar kóp bolǵanda, olardı toparlar boyınsha kóriw qaldıqlardı basqarıwdı ádewir ańsatlastıradı. Tolıq túsindirme — keyingi sabaqta.",
  },
  18: {
    concept:
      "Sklad toparları — bir neshe skladtı (mısalı, bir qaladaǵı yamasa bir marketpleystiń skladların) bir toparǵa birlestirip, olar menen bir kabinetten islew.",
    why: "Skladlar qanshelli kóp bolsa, hár birindegi qaldıqlardı bólek baqlaw sonshelli qıyın. Toparlar qaldıqlarǵa ulıwma sholıw jasawdı hám támiyinlewlerdi rejelestiriwdi ańsatlastıradı.",
  },
  19: {
    concept:
      "Missing — esap boyınsha skladta turǵan, biraq is júzinde tabılmaǵan yamasa statusı anıq emes ónimler. Robohubta olar bólek bólimde kórinedi, sol jerde olardıń maǵlıwmatların tekseriw múmkin.",
    why: "Missing statusındaǵı ónim — satılmaǵan pul. Olardı óz waqtında anıqlap, máseleni marketpleys penen sheshseńiz, joǵaltıwlar azayadı.",
    tip: "Missing bólimin turaqlı túrde tekserip turıń — qanshelli erte ańlasańız, máseleni sheshiw sonshelli ańsat.",
  },

  // ───────── MARKETING ─────────
  20: {
    concept:
      "Promokodlar hám akciyalar kalendarı — marketpleystiń promokodları, sonday-aq akciyalardıń sáneleri hám shártleri bir orında.",
    why: "Akciyanıń qashan baslanıp, qashan tamamlanatuǵının bilseńiz, qaldıqlar menen bahalardı aldınnan tayarlaysız — hám akciyadan maksimum nátiyje alasız.",
  },
  21: {
    concept:
      "Boost TOP — marketpleys izlewinde ónimlerdi joqarıraq kóteriwge járdem beretuǵın funkciya. Robohubta onıń maǵlıwmatların kóriw hám ónimlerdi basqarıw múmkin.",
    why: "Izlew nátiyjeleriniń joqarısındaǵı ónimdi xarıydarlar jiyirek kóredi hám jiyirek satıp aladı. Boost TOP nátiyjelerin baqlap, eń nátiyjeli ónimlerge itibar qaratasız.",
  },

  // ───────── INTEGRACIYA ─────────
  22: {
    concept:
      "Integraciya — Uzum Market satıwshı akkauntıńızdıń Robohubqa jalǵanıwı. Jalǵaǵannan keyin maǵlıwmatlar Robohub kabinetine kele baslaydı.",
    why: "Bul — Robohubta islewdiń birinshi qádemi: buyırtpalar, ónimler hám analitika tap usı jalǵanıwdan keyin isleydi.",
    tip: "Jalǵaǵannan keyin integraciya iske qosılǵanına kóz jetkeriń — sonda maǵlıwmatlar úzilissiz kelip turadı.",
  },
  23: {
    concept:
      "Integraciya — Wildberries satıwshı akkauntıńızdıń Robohubqa jalǵanıwı. Siz integraciya maǵlıwmatların kirgizesiz, sonnan keyin jalǵanıw tekserilip, iske qosıladı.",
    why: "Jalǵaǵannan keyin Wildberries buyırtpaları, ónimleri hám analitikası basqa marketpleysler menen birge bir kabinette kórinedi.",
  },
  24: {
    concept:
      "Integraciya — Yandex Market satıwshı akkauntıńızdıń Robohubqa jalǵanıwı. Siz integraciya maǵlıwmatların kirgizesiz, sonnan keyin jalǵanıw tekserilip, iske qosıladı.",
    why: "Jalǵaǵannan keyin Yandex Market buyırtpaları hám maǵlıwmatları basqa marketpleysler menen birge bir orında basqarıladı.",
  },
  25: {
    concept:
      "Integraciya — Ozon satıwshı akkauntıńızdıń Robohubqa jalǵanıwı. Siz integraciya maǵlıwmatların kirgizesiz, sonnan keyin jalǵanıw tekserilip, iske qosıladı.",
    why: "Jalǵaǵannan keyin Ozondaǵı satıwlar da ulıwma analitikaǵa hám buyırtpalar dizimine túsedi — barlıq marketpleysler bir kabinette.",
  },

  // ───────── BAYLANIS ─────────
  26: {
    concept:
      "Chat — marketpleyslerdegi xarıydarlar menen jazısıwlar jıynalǵan bólim: chatlar dizimi, jazısıwlar hám xabarlardı basqarıw.",
    why: "Xarıydardıń sorawına tez juwap beriw — bul satıw hám jaqsı pikir. Barlıq chatlar bir orında bolǵanda, birde-bir xabar juwapsız qalmaydı.",
  },
  27: {
    concept:
      "Avtojuwap — xarıydarlardıń pikirlerine avtomatlıq túrde juwap beretuǵın funkciya. Bul bólimde pikirlerdi kóriw hám avtojuwap sazlawların ózgertiw múmkin.",
    why: "Hár bir pikirge qolda juwap jazıw kóp waqıt aladı. Avtojuwap hár bir xarıydarǵa itibar kórsetedi hám dúkannıń abırayın saqlaydı.",
    tip: "Unamsız pikirlerge avtojuwaptan keyin ózińiz de jeke juwap beriń — xarıydar itibardı sezedi.",
  },

  // ───────── BASQARIW ─────────
  28: {
    concept:
      "«Hújjetler» bólimi — marketpleysler menen islesiw boyınsha hújjetler dizimi hám olardıń maǵlıwmatları bir kabinette.",
    why: "Hújjetlerdi hár bir marketpleys kabinetinen izlewdiń keregi joq — kerekli hújjet tez tabıladı hám hámme waqıt qadaǵalawda boladı.",
  },
  29: {
    concept:
      "Rollar — xızmetkerlerge beriletuǵın kiriw huqıqlarınıń jıynaǵı. Siz jańa rol qosasız, oǵan at beresiz, kerekli huqıqlardı belgileysiz hám rollardı basqarasız.",
    why: "Hár bir xızmetker tek ózine kerekli bólimlerdi kóredi: jumıs tártipli júredi, al áhmiyetli maǵlıwmatlar qáwipsiz qaladı.",
    tip: "Rollardı lawazımlar boyınsha jaratıń — jańa xızmetker kelgende, oǵan tayar roldi belgilew jetkilikli boladı.",
  },
  30: {
    concept:
      "Infografika — oqıw materialları bólimindegi funkciya: marketpleys maǵlıwmatları hám satıw kórsetkishleri kesteler ornına kórgizbeli túrde kórsetiledi.",
    why: "Grafikler hám vizualizaciya sanlardı tezirek túsiniwge járdem beredi — tendenciyalar hám ózgerisler bir qarawda kórinedi.",
  },
};
