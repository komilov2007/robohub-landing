// Mavzular va "Boshlang'ich yo'l" — qoraqalpoqcha matn (uz: academy.ts, mavzu slug'i bo'yicha)
import type { AcademyContent } from "./types";

export const topics: AcademyContent["topics"] = {
  analytics: {
    name: "Analitika",
    short: "Satıwlar, qárejetler, ózine túser baha hám ABC/XYZ-analiz",
    hero: {
      title: "Satıwlar, qárejetler hám payda —",
      highlight: "bir dashboardta",
      subtitle:
        "Barlıq marketpleyslerdiń tiykarǵı kórsetkishlerin bólek kabinetlerden jıynamay, bir orında baqlań.",
      bullets: [
        "Satıwlar hám buyırtpalar dinamikası",
        "Qárejetler hám ózine túser bahanı esapqa alǵan haqıyqıy nátiyje",
        "ABC-, XYZ- hám ABC × XYZ-analiz",
      ],
    },
    problem: {
      title: "Qansha satqanıńızdı biliw jetkiliksiz",
      text: "Ónim 200 000 swmǵa satıldı — biraq bul ele 200 000 swm payda degeni emes. Komissiya, logistika, reklama, ózine túser baha hám operaciyalıq qárejetler esapqa alınbaǵansha, haqıyqıy nátiyje kórinbeydi.",
    },
    solution: {
      title: "Robohub hámmesin bir orında esaplaydı",
      text: "Satıwlar, qárejetler, ózine túser baha hám operaciyalıq qárejetler — birden-bir analitikada. Qaysı ónimler payda ákeletuǵını hám talaptıń qanshelli turaqlı ekenligi birden kórinedi.",
    },
    flow: [
      "Satıw maǵlıwmatları marketpleyslerden keledi",
      "Siz ózine túser baha hám operaciyalıq qárejetlerdi kirgizesiz",
      "Dashboard haqıyqıy paydanı hám TOP-ónimlerdi kórsetedi",
    ],
    features: [
      {
        title: "Dashboard",
        text: "Ulıwma satıwlar, marketpleyslerdi salıstırıw hám dáwir boyınsha dinamika.",
      },
      {
        title: "Qárejetler quramı",
        text: "Komissiya, logistika, reklama, saqlaw hám shtraflardıń úlesi.",
      },
      {
        title: "TOP-ónimler",
        text: "Eń kóp satılatuǵın hám eń hálsiz SKU-lar.",
      },
      {
        title: "ABC × XYZ",
        text: "Payda hám talaptıń turaqlılıǵı boyınsha 9 topar.",
      },
    ],
    steps: [
      {
        title: "Ózine túser bahanı kirgiziń",
        text: "Ónimler boyınsha ózine túser bahanı júkleń (8-sabaq).",
      },
      {
        title: "Operaciyalıq qárejetlerdi kirgiziń",
        text: "Salıqlar, xızmetkerler hám basqa ay sayınǵı qárejetler (7-sabaq).",
      },
      {
        title: "Dashboardtı ashıń",
        text: "Kerekli dáwirdi tańlap, kórsetkishlerdi kóriń (1-sabaq).",
      },
      {
        title: "Ónimlerdi analizleń",
        text: "TOP, ABC hám XYZ boyınsha sheshim qabıl etiń (3–6-sabaqlar).",
      },
    ],
    faqs: [
      {
        q: "Ózine túser baha hám operaciyalıq qárejetlerdi qashan kirgiziw kerek?",
        a: "Analitikadan paydalanıwdı baslamastan burın — eń birinshi qádem retinde. Paydanı esaplaw ushın Robohub satıw summasınan barlıq qárejetlerdi alıp taslaydı: eger ózine túser baha yamasa operaciyalıq qárejetler kirgizilmegen bolsa, payda, marja hám ROI haqıyqıy muǵdarınan ádewir joqarı bolıp shıǵadı.\n\nTártibi ápiwayı: dáslep hár bir ónimniń ózine túser bahasın kirgiziń yamasa onı dizim túrinde júkleń (8-sabaq), soń operaciyalıq qárejetlerdi — salıq stavkasın, ay sayınǵı salıqlardı, xızmetkerlerdiń aylıqların sazlań (7-sabaq). Sonnan keyin barlıq esabatlar haqıyqıy sanlardı kórsetedi.",
      },
      {
        q: "ABC- hám XYZ-analizdiń parqı nede?",
        a: "Ekewi de ónimlerdi toparlarǵa bóledi, biraq hár túrli sorawlarǵa juwap beredi. ABC — «bul ónim bizneske qanday nátiyje ákeledi?»: A toparı tiykarǵı nátiyjeni, B — ortasha, C — kishi úlesti beredi (4-sabaq). XYZ — «bul ónimge talap qanshelli turaqlı?»: X turaqlı satıladı, Y — ózgerip turadı, Z — turaqsız hám onı boljaw qıyın (5-sabaq).\n\nEkewin birge qaraǵanda AX-tan CZ-ke shekem 9 topar payda boladı hám hár biri boyınsha anıq sheshim qabıl etiw ańsat: mısalı, AX ónimi hámme waqıt bolıwı kerek, al CZ-ke artıqsha pul baylap qoyıwdıń keregi joq (6-sabaq).",
      },
      {
        q: "Qanday qárejetlerdi baqlap barıw múmkin?",
        a: "Robohub satıwǵa baylanıslı barlıq tiykarǵı qárejetlerdi bir orında kórsetedi: operaciyalıq qárejetler, marketpleys komissiyaları, logistika, reklama, saqlaw, shtraflar hám basqa qárejetler.\n\nHár bir qárejettiń ulıwma summadaǵı úlesi de kórinedi — sonda pul eń kóp qayda ketip atırǵanın birden túsinip, tap sol qárejetti qısqartıwdan baslaysız (2-sabaq).",
      },
      {
        q: "Satıwlardı marketpleysler boyınsha salıstırıw múmkin be?",
        a: "Awa. Dashboardta ulıwma satıwlar menen birge hár bir marketpleystiń nátiyjesi bólek kórsetilgen — olardı qatar qoyıp salıstırıw múmkin.\n\nKerekli dáwirdi tańlap, qaysı marketpleyste satıwlar ósip, qaysısında túsip atırǵanın kóresiz — bul reklama menen qaldıqlardı qay jerge kóbirek baǵdarlaw kerekligin sheshiwge járdem beredi (1-sabaq).",
      },
      {
        q: "Qaysı ónim kóbirek payda ákeletuǵının qalay biliwge boladı?",
        a: "Bunıń ushın eki qural bar. TOP-ónimler bólimi eń jaqsı satılıp, eń kóp buyırtpa ákeletuǵın SKU-lardı, sonday-aq hálsiz satılatuǵınların kórsetedi (3-sabaq).\n\nABC-analiz hár bir ónimniń ulıwma nátiyjege qosqan úlesin — GMV, marja hám qárejetler menen birge kórsetedi (4-sabaq). Dál paydanı kóriw ushın ózine túser baha kirgizilgen bolıwı kerek (8-sabaq).",
      },
    ],
  },
  order: {
    name: "Buyırtpalar",
    short: "Uzum, Wildberries hám Yandex buyırtpaları, FBO",
    hero: {
      title: "Barlıq marketpleyslerdiń buyırtpaları —",
      highlight: "bir kabinette",
      subtitle:
        "Uzum Market, Wildberries hám Yandex Market buyırtpaların bir orında kóriń, tekseriń hám qayta isleń.",
      bullets: [
        "Jańa buyırtpanı ashıw hám tekseriw",
        "Statuslardı baqlaw",
        "FBO támiyinlewin jaratıw",
      ],
    },
    problem: {
      title: "Hár bir marketpleys — bólek kabinet",
      text: "Bir neshe marketpleyste satqanıńızda buyırtpalar menen islew barǵan sayın qıyınlasadı: hár birine bólek kiriw hám hámmesin bólek tekseriw kerek boladı.",
    },
    solution: {
      title: "Buyırtpa → qayta islew → qadaǵalaw",
      text: "Robohub barlıq marketpleyslerdiń buyırtpaların bir kabinetke jıynaydı. Kabinetler az — qol miyneti az — qadaǵalaw kóp.",
    },
    flow: [
      "Marketpleysten jańa buyırtpa keledi",
      "Siz onı Robohubta ashıp tekseresiz",
      "Qayta islep, statusın baqlaysız",
    ],
    features: [
      {
        title: "Uzum Market",
        text: "Uzum buyırtpaların kóriw hám qayta islew.",
      },
      {
        title: "Wildberries",
        text: "WB buyırtpaların Robohub kabinetinen basqarıw.",
      },
      {
        title: "Yandex Market",
        text: "Yandex buyırtpaların ashıw hám olardıń statusın baqlaw.",
      },
      {
        title: "FBO támiyinlew",
        text: "Marketpleys skladına jiberiw ushın támiyinlew jaratıw.",
      },
    ],
    steps: [
      {
        title: "«Buyırtpalar» bólimin ashıń",
        text: "Bul jerde barlıq marketpleyslerdiń buyırtpaları jıynalǵan.",
      },
      {
        title: "Jańa buyırtpanı ashıń",
        text: "Buyırtpa maǵlıwmatların tekseriń.",
      },
      { title: "Qayta isleń", text: "Buyırtpa statusın basqarıń." },
      {
        title: "Statustı baqlań",
        text: "Buyırtpanıń qaysı basqıshta turǵanın qadaǵalań.",
      },
    ],
    faqs: [
      {
        q: "Qaysı marketpleyslerdiń buyırtpaları menen islewge boladı?",
        a: "Sabaqlarda Uzum Market, Wildberries hám Yandex Market buyırtpaların qayta islew kórsetilgen — hár biri ushın bólek sabaq bar (10–12-sabaqlar).\n\nBarlıq marketpleyslerdiń buyırtpaları bir Robohub kabinetine keledi, sonlıqtan hár bir marketpleys kabinetine bólek kiriwdiń keregi joq. Bunıń ushın dáslep marketpleys akkauntı jalǵanǵan bolıwı kerek («Integraciya» teması).",
      },
      {
        q: "Buyırtpanı qayta islew qanday basqıshlardan ibarat?",
        a: "Process tórt qádemnen ibarat: 1) buyırtpalar dizimin ashasız; 2) jańa buyırtpanı ashıp, onıń quramın tekseresiz; 3) buyırtpanı qayta isleysiz; 4) keyin onıń statusın baqlap barasız.\n\nBul tártip Uzum Market, Wildberries hám Yandex Market ushın birdey — tek hár bir marketpleystegi basqıshlardıń atları parıq qıladı. Hár bir marketpleys sabaǵında usı qádemler ekranda kórsetilgen (10–12-sabaqlar).",
      },
      {
        q: "Buyırtpa statusın qay jerde basqarıwǵa boladı?",
        a: "«Buyırtpalar» bóliminde. Kerekli buyırtpanı ashıp, onıń maǵlıwmatların tekserip, statusın ózgertesiz.\n\nStatustı óz waqtında jańalap barıw áhmiyetli: sonda hár bir buyırtpanıń qaysı basqıshta turǵanı hámme waqıt anıq boladı, keshigiwler hám biykar etiwler azayadı. Bul process Uzum Market mısalında 14-sabaqta kórsetilgen.",
      },
      {
        q: "FBO támiyinlewi ne ushın kerek?",
        a: "FBO modelinde ónimińiz marketpleys skladında saqlanadı hám buyırtpanı marketpleystiń ózi jetkerip beredi. Támiyinlew — qaysı ónim qansha muǵdarda marketpleys skladına jiberiletuǵını rásmiylestiriletuǵın arza.\n\nRobohubta siz jańa támiyinlew jaratasız, ónimler menen olardıń sanın tańlaysız, maǵlıwmatlardı tekseresiz hám tayar támiyinlewlerdi basqarasız. Durıs rásmiylestirilgen támiyinlew ónimniń skladqa óz waqtında jetiwine hám satıwlardıń toqtamawına kepillik beredi (13-sabaq).",
      },
      {
        q: "Buyırtpalar azayǵanın qalay ańlawǵa boladı?",
        a: "Buyırtpalar dinamikası bóliminde. Ol tańlanǵan dáwirde buyırtpalar sanınıń qalay ózgergenin hám olardıń qaysı marketpleyslerden kelip atırǵanın kórsetedi.\n\nÓsiw hám túsiw grafikte birden kórinedi. Túsiwdi óz waqtında ańlasańız, onıń sebebin — baha, qaldıqlar yamasa básekilesler — tawıp, ilajın kóriwge úlgeresiz (9-sabaq).",
      },
    ],
  },
  product: {
    name: "Ónimler",
    short: "Ónim kartochkası hám bahalardı jańalaw",
    hero: {
      title: "Kartochkalar hám bahalar —",
      highlight: "bir orınnan",
      subtitle:
        "Ónim kartochkaların jaratıń hám bahalardı jańalań — ózgerisler Robohub arqalı marketpleyske jiberiledi.",
      bullets: [
        "Jańa ónim kartochkasın jaratıw",
        "Bahanı ózgertiw hám marketpleyske jiberiw",
        "Ónimlerdi bir kabinetten basqarıw",
      ],
    },
    problem: {
      title: "Hár bir ózgeris ushın — hár bir kabinetke kiriw",
      text: "Bahanı jańalaw yamasa jańa ónim qosıw ushın hár bir marketpleys kabinetine bólek kiriwge tuwra keledi.",
    },
    solution: {
      title: "Ónim → ózgeris → marketpleys",
      text: "Robohubta siz kartochka jaratasız yamasa bahanı ózgertesiz hám ózgerislerdi marketpleyske jiberesiz.",
    },
    flow: [
      "«Ónimler» bóliminde ónimdi tańlaysız",
      "Maǵlıwmatlardı yamasa bahanı ózgertesiz",
      "Robohub ózgerislerdi marketpleyske jiberedi",
    ],
    features: [
      {
        title: "Ónim kartochkası",
        text: "Maǵlıwmatlardı, bahanı hám basqa maydanlardı toltırıp, saqlań hám jiberiń.",
      },
      {
        title: "Bahalardı jańalaw",
        text: "Jańa bahanı kirgizip, onı marketpleyske jiberiń.",
      },
    ],
    steps: [
      {
        title: "«Ónimler» bólimine ótiń",
        text: "Barlıq ónimlerińizdiń dizimi.",
      },
      {
        title: "Kartochka jaratıń yamasa ónimdi tańlań",
        text: "Jańa ónim yamasa bar ónim.",
      },
      {
        title: "Maǵlıwmatlar menen bahanı kirgiziń",
        text: "Kerekli maydanlardı toltırıń.",
      },
      {
        title: "Saqlań hám jiberiń",
        text: "Ózgerisler marketpleyske jiberiledi.",
      },
    ],
    faqs: [
      {
        q: "Baha ózgerisi marketpleyske qalay jetedi?",
        a: "Hár bir marketpleys kabinetinde bahanı bólek ózgertiwdiń keregi joq. Robohubtıń «Ónimler» bóliminde kerekli ónimdi ashıp, jańa bahanı kirgizesiz hám onı tikkeley marketpleyske jiberesiz.\n\nSonda siz akciyalarǵa, mawsımǵa yamasa básekileslerdiń háreketlerine tez juwap beresiz hám bir neshe kabinette qolda ózgertkende júz beretuǵın qátelerden qashıq bolasız (15-sabaq).",
      },
      {
        q: "Robohubta ónim kartochkasın jaratıwǵa bola ma?",
        a: "Awa. Jańa ónim kartochkası Robohubta jaratıladı hám toltırıladı, sol jerden marketpleyske jiberiledi — marketpleys kabinetine bólek kiriwdiń keregi joq (16-sabaq).",
      },
      {
        q: "Kartochkada qanday maǵlıwmatlar toltırıladı?",
        a: "Ónim haqqındaǵı maǵlıwmatlar, baha hám kartochkanıń basqa maydanları. Hámmesi toltırılǵannan keyin kartochka saqlanadı hám marketpleyske jiberiledi.\n\nKartochka qanshelli tolıq hám dál toltırılsa, ónim izlewde sonshelli jaqsı kórinedi hám xarıydardı tezirek isendiredi. Pútkil process 16-sabaqta qádemme-qádem kórsetilgen.",
      },
      {
        q: "Bahanı ózgertiwden aldın neni tekseriw kerek?",
        a: "Ónimniń ózine túser bahası hám operaciyalıq qárejetler Robohubqa kirgizilgenin. Olarsız jańa bahada sizge qansha marja qalatuǵının túsiniw múmkin emes — zıyanǵa qalıwıńız múmkin.\n\nÓzine túser baha hám qárejetlerdi qalay kirgiziw «Analitika» temasınıń 7- hám 8-sabaqlarında kórsetilgen.",
      },
    ],
  },
  warehouse: {
    name: "Sklad",
    short: "Skladlardı toparlaw hám Missing",
    hero: {
      title: "Skladlardı basqarıń",
      highlight: "tolıq tártipte",
      subtitle:
        "Skladlardı toparlarǵa bóliń hám Missing statusındaǵı ónimlerdi bir kabinetten baqlań.",
      bullets: [
        "Skladlardı toparlarǵa bóliw",
        "Sklad toparların basqarıw",
        "Missing statusındaǵı ónimlerdi kóriw",
      ],
    },
    problem: {
      title: "Skladlar kóp, tártip joq",
      text: "Ónimler hár túrli skladlarda turadı, olardı birim-birim kóriw kóp waqıt aladı. Qaysı ónim qay jerde hám qanday jaǵdayda ekenin túsiniw qıyınlasadı.",
    },
    solution: {
      title: "Sklad → toparlaw → basqarıw",
      text: "Robohubta siz skladlardı toparlarǵa bólip, olar menen bir kabinetten isleysiz. Al Missing bóliminde mashqalalı statustaǵı ónimlerdi bólek kóresiz.",
    },
    flow: [
      "Bar skladlardı kóresiz",
      "Olardı toparlarǵa bólesiz",
      "Toparlardı hám Missing ónimlerin basqarasız",
    ],
    features: [
      {
        title: "Skladlardı toparlaw",
        text: "Bar skladlardı ózińizge qolaylı toparlarǵa bóliń.",
      },
      {
        title: "Toparlardı basqarıw",
        text: "Toparlanǵan skladlar menen bir orında isleń.",
      },
      {
        title: "Missing",
        text: "Missing statusındaǵı ónimlerdi kórip, olardıń maǵlıwmatların tekseriń.",
      },
      {
        title: "FBO támiyinlew",
        text: "Ónimlerdi marketpleys skladına jiberiwdi rejelestiriń.",
      },
    ],
    steps: [
      { title: "«Sklad» bólimine ótiń", text: "Shep menyudan «Sklad»." },
      { title: "Skladlardı kóriń", text: "Bar skladlardıń dizimi." },
      {
        title: "Toparlarǵa bóliń",
        text: "Skladlardı kerekli toparlarǵa qosıń.",
      },
      {
        title: "Toparlardı basqarıń",
        text: "Toparlanǵan skladlar menen isleń.",
      },
    ],
    faqs: [
      {
        q: "Skladlardı ne ushın toparlaw kerek?",
        a: "Marketpleysler hám óz skladlarıńız qanshelli kóp bolsa, hár bir skladtaǵı qaldıqlardı bólek baqlaw sonshelli qıyın. Toparlaw bir neshe skladtı ózińizge qolaylı toparǵa birlestiriwge múmkinshilik beredi — mısalı, bir qaladaǵı barlıq skladlardı bir toparǵa.\n\nNátiyjede qaldıqlardı tutas kóriw ańsatlasadı hám olar menen bir kabinetten tártipli isleysiz (18-sabaq).",
      },
      {
        q: "Missing statusındaǵı ónimlerdi qay jerden kóriwge boladı?",
        a: "«Sklad» bólimi ishindegi bólek Missing bóliminde. Sol jerde Missing statusındaǵı ónimler dizimi kórinedi hám olardıń hár biriniń maǵlıwmatların ashıp tekseriw múmkin.\n\nBul bólimdi turaqlı túrde qarap turıń: mashqalalı ónimdi qanshelli erte ańlasańız, máseleni sheshiw sonshelli ańsat boladı (19-sabaq).",
      },
      {
        q: "17- hám 18-sabaqlardıń parqı nede?",
        a: "Ekewi de skladlardı toparlawǵa arnalǵan. 17-sabaq — qısqasha sholıw: skladlar bólimine qalay kiriw, bar skladlardı kóriw hám olardı toparlarǵa bóliw.\n\n18-sabaq — tolıq process: bunnan tısqarı, onda sklad toparların basqarıw hám toparlanǵan skladlar menen islew kórsetilgen. Tez tanısıw ushın 17-sabaqtı, tolıq úyreniw ushın 18-sabaqtı kóriń.",
      },
      {
        q: "Ónimdi marketpleys skladına qalay jiberiwge boladı?",
        a: "FBO támiyinlewi arqalı. Robohubta siz jańa támiyinlew jaratasız, qaysı ónimdi qansha muǵdarda jiberiwdi tańlaysız, maǵlıwmatlardı tekserip, támiyinlewdi tayarlaysız.\n\nBul process «Buyırtpalar» temasınıń 13-sabaǵında tolıq kórsetilgen.",
      },
    ],
  },
  marketing: {
    name: "Marketing",
    short: "Promokodlar, akciyalar kalendarı, Boost TOP",
    hero: {
      title: "Promokodlar, akciyalar hám Boost TOP —",
      highlight: "bir kabinette",
      subtitle:
        "Marketpleystiń marketing quralların bólek kabinetlersiz baqlań hám basqarıń.",
      bullets: [
        "Promokodlardı basqarıw",
        "Akciyalar kalendarı hám olardıń shártleri",
        "Boost TOP penen islew",
      ],
    },
    problem: {
      title: "Akciyalardı qadaǵalap úlgeriw qıyın",
      text: "Qaysı akciya qashan baslanadı, onıń shártleri qanday, qaysı promokodlar ámel etedi — bulardıń hámmesin hár bir marketpleyste bólek baqlaw kerek boladı.",
    },
    solution: {
      title: "Marketing → Promokodlar → Kalendar",
      text: "Robohubtıń «Marketing» bóliminde promokodlar, akciyalar kalendarı hám Boost TOP bir orınǵa jıynalǵan.",
    },
    flow: [
      "«Marketing» bólimin ashasız",
      "Akciyalar kalendarın hám promokodlardı kóresiz",
      "Ónimlerdi Boost TOP arqalı basqarasız",
    ],
    features: [
      {
        title: "Promokodlar",
        text: "Promokodlardı kóriw hám basqarıw.",
      },
      {
        title: "Akciyalar kalendarı",
        text: "Akciyalardıń sáneleri hám shártleri bir orında.",
      },
      {
        title: "Boost TOP",
        text: "Boost TOP maǵlıwmatların kóriw hám ónimlerdi basqarıw.",
      },
    ],
    steps: [
      {
        title: "«Marketing» bólimine ótiń",
        text: "Shep menyudan «Marketing».",
      },
      { title: "Kalendardı kóriń", text: "Akciyalardıń sáneleri hám shártleri." },
      {
        title: "Promokodlardı basqarıń",
        text: "Ámeldegi promokodlar dizimi.",
      },
      {
        title: "Boost TOP bólimin ashıń",
        text: "Ónimlerdi Boost TOP arqalı basqarıń.",
      },
    ],
    faqs: [
      {
        q: "Promokodlardı Robohubtan basqarıwǵa bola ma?",
        a: "Awa. «Marketing» bóliminde marketpleystegi promokodlarıńızdı kóriw hám basqarıw múmkin — hár bir marketpleys kabinetine bólek kiriwdiń keregi joq (20-sabaq).",
      },
      {
        q: "Akciyalar kalendarında neler kórinedi?",
        a: "Marketpleys akciyalarınıń sáneleri hám shártleri — hámmesi bir kalendarda.\n\nAkciyanıń qashan baslanıp, qashan tamamlanatuǵının aldınnan bilseńiz, tayarlanıwǵa waqtıńız boladı: qaldıqlardı toltırıp, bahalardı dúzetip alasız (20-sabaq).",
      },
      {
        q: "Boost TOP-ta neler islewge boladı?",
        a: "Boost TOP ónimlerdi marketpleys izlewinde joqarıraq kóteriwge járdem beredi. Robohubtıń «Marketing» bóliminde Boost TOP-tı ashıp, onıń maǵlıwmatların kóresiz hám ónimlerdi usı funkciya arqalı basqarasız.\n\nNátiyjelerdi baqlap, qaysı ónimlerdi kóteriw nátiyjelirek ekenin anıqlaysız (21-sabaq).",
      },
      {
        q: "Akciyaǵa qalay tayarlanıw kerek?",
        a: "Dáslep akciyalar kalendarında sáneler hám shártlerdi kóriń (20-sabaq). Soń akciyaǵa qatnasatuǵın ónimlerdiń bahaların «Ónimler» bóliminde jańalań (15-sabaq).\n\nBahanı ózgertiwden aldın ózine túser baha hám qárejetler kirgizilgenin tekseriń — sonda shegirme menen de paydada qalatuǵınıńızdı bilesiz («Analitika»: 7–8-sabaqlar).",
      },
    ],
  },
  integration: {
    name: "Integraciya",
    short: "Uzum, Wildberries, Yandex hám Ozondı jalǵaw",
    hero: {
      title: "Marketpleys akkauntların jalǵań",
      highlight: "bir neshe minutta",
      subtitle:
        "Uzum Market, Wildberries, Yandex Market hám Ozon akkauntların Robohubqa jalǵap, olardı bir kabinetten basqarıń.",
      bullets: [
        "Integraciya maǵlıwmatların kirgiziw",
        "Jalǵanıwdı tekseriw",
        "Integraciyanı iske qosıw",
      ],
    },
    problem: {
      title: "Baslaw ushın birinshi qádem",
      text: "Robohub islewi ushın marketpleys akkauntların jalǵaw kerek — onsız maǵlıwmatlar kelmeydi.",
    },
    solution: {
      title: "Integraciya → marketpleys → jalǵanıw",
      text: "Hár bir marketpleys bir sxema boyınsha jalǵanadı: tańlaysız, maǵlıwmatlardı kirgizesiz, tekseresiz hám iske qosasız.",
    },
    flow: [
      "«Integraciya» bóliminde marketpleysti tańlaysız",
      "Akkaunt maǵlıwmatların kirgizesiz",
      "Jalǵanıwdı tekserip, iske qosasız",
    ],
    features: [
      { title: "Uzum Market", text: "Uzum akkauntın jalǵaw." },
      { title: "Wildberries", text: "WB akkauntın jalǵaw." },
      { title: "Yandex Market", text: "Yandex akkauntın jalǵaw." },
      { title: "Ozon", text: "Ozon akkauntın jalǵaw." },
    ],
    steps: [
      {
        title: "«Integraciya» bólimine ótiń",
        text: "Shep menyudan «Integraciya».",
      },
      {
        title: "Marketpleysti tańlań",
        text: "Uzum, Wildberries, Yandex yamasa Ozon.",
      },
      {
        title: "Maǵlıwmatlardı kirgiziń",
        text: "Integraciya ushın kerekli maǵlıwmatlar.",
      },
      {
        title: "Tekserip, iske qosıń",
        text: "Jalǵanıw islep turǵanına kóz jetkeriń.",
      },
    ],
    faqs: [
      {
        q: "Qaysı marketpleyslerdi jalǵawǵa boladı?",
        a: "Tórt marketpleysti: Uzum Market, Wildberries, Yandex Market hám Ozon. Hár birin jalǵaw bólek sabaqta kórsetilgen (22–25-sabaqlar).\n\nBirden bir neshewin yamasa hámmesin jalǵaw múmkin — olar bir Robohub kabinetinde birge isleydi.",
      },
      {
        q: "Robohubta jumıstı neden baslaw kerek?",
        a: "Integraciyadan. Marketpleys akkauntı Robohubqa jalǵanbaǵansha, buyırtpalar, ónimler hám analitika bólimlerinde maǵlıwmat bolmaydı — barlıq maǵlıwmatlar tap usı jalǵanıw arqalı keledi.\n\nDáslep ózińiz satıp atırǵan marketpleysti jalǵań (mısalı, Uzum Market — 22-sabaq), soń qalǵanların qosıń.",
      },
      {
        q: "Jalǵaw ushın ne islew kerek?",
        a: "Process bes qádemnen ibarat: 1) «Integraciya» bólimine ótesiz; 2) kerekli marketpleysti tańlaysız; 3) akkauntti jalǵaysız; 4) integraciya maǵlıwmatların kirgizesiz; 5) jalǵanıwdı tekserip, iske qosasız.\n\nHár bir marketpleys sabaǵında usı qádemler ekranda kórsetilgen (22–25-sabaqlar).",
      },
      {
        q: "Jalǵaǵannan keyin neni tekseriw kerek?",
        a: "Jalǵanıw tekserilip, iske qosılǵanın. Tek usı sońǵı qádemnen keyin ǵana maǵlıwmatlar marketpleysten Robohubqa kele baslaydı.\n\nEger jalǵanıw iske qosılmasa, kabinette buyırtpalar menen ónimler payda bolmaydı — sonlıqtan integraciya boyınsha hár bir sabaqtıń aqırında tap usı tekseriw kórsetilgen.",
      },
    ],
  },
  communication: {
    name: "Baylanıs",
    short: "Chat hám pikirlerge avtojuwaplar",
    hero: {
      title: "Xarıydarlar menen baylanıs",
      highlight: "bir aynada",
      subtitle:
        "Marketpleyslerdegi jazısıwlar hám pikirlerge juwaplardı bir kabinetten basqarıń.",
      bullets: [
        "Chatlar dizimi hám jazısıwlar",
        "Pikirlerge avtomatlıq juwaplar",
        "Avtojuwap sazlawları",
      ],
    },
    problem: {
      title: "Xabarlar menen pikirler shashılıp jatır",
      text: "Xarıydarlar menen jazısıwlar hám pikirler hár bir marketpleyste bólek — olardı óz waqtında kóriw qıyın.",
    },
    solution: {
      title: "Chat → xabarlar → avtojuwap",
      text: "Robohubta jazısıwlar bir «Chat» bólimine jıynalǵan, al pikirlerge avtomatlıq túrde juwap beriw múmkin.",
    },
    flow: [
      "Xarıydar jazadı yamasa pikir qaldıradı",
      "Siz onı Robohubtıń «Chat» yamasa «Avtojuwap» bóliminde kóresiz",
      "Ózińiz juwap beresiz yamasa avtojuwap iske túsedi",
    ],
    features: [
      {
        title: "Chat",
        text: "Xarıydarlar menen jazısıwlardı kóriw hám basqarıw.",
      },
      {
        title: "Avtojuwap",
        text: "Pikirlerge avtomatlıq juwaplar hám olardı sazlaw.",
      },
    ],
    steps: [
      { title: "«Chat» bólimin ashıń", text: "Chatlar dizimi." },
      { title: "Jazısıwlardı kóriń", text: "Xarıydarlardıń xabarları." },
      { title: "«Avtojuwap» bólimine ótiń", text: "Xarıydarlardıń pikirleri." },
      { title: "Sazlawlardı kóriń", text: "Avtomatlıq juwaplar qaǵıydaları." },
    ],
    faqs: [
      {
        q: "Hár túrli marketpleyslerdiń chatları bir orında kórine me?",
        a: "Awa. «Chat» bólimi barlıq marketpleyslerdegi xarıydarlar menen jazısıwlardı bir kabinetke jıynaydı — hár bir marketpleysti bólek ashıp, xabar izlewdiń keregi joq.\n\nSonıń arqasında xarıydardıń birde-bir sorawı juwapsız qalmaydı (26-sabaq).",
      },
      {
        q: "«Chat» bóliminde neler islewge boladı?",
        a: "Chatlar dizimin kóriw, kerekli xarıydar menen jazısıwdı ashıw hám xabarlardı basqarıw.\n\nXarıydardıń sorawına tez juwap beriw satıwlarǵa hám dúkannıń reytingine tikkeley tásir etedi — bul bólim pútkil processti tezletedi (26-sabaq).",
      },
      {
        q: "Pikirlerge juwaplardı avtomatlastırıwǵa bola ma?",
        a: "Awa. «Avtojuwap» bóliminde xarıydarlardıń pikirlerine avtomatlıq juwap beriwdi qosasız hám onı ózińizge moslap sazlaysız.\n\nSonda hár bir pikirge qolda juwap jazıwǵa waqıt ketpeydi, al xarıydarlar juwapsız qalmaydı (27-sabaq).",
      },
      {
        q: "Xarıydarlardıń pikirlerin qay jerden kóriwge boladı?",
        a: "«Avtojuwap» bóliminde — sol jerde xarıydarlardıń pikirleri dizimi kórinedi hám olarǵa berilgen juwaplardı da baqlaw múmkin (27-sabaq).",
      },
    ],
  },
  management: {
    name: "Basqarıw",
    short: "Hújjetler, xızmetkerler, rollar hám infografika",
    hero: {
      title: "Komanda hám hújjetler —",
      highlight: "qadaǵalawda",
      subtitle:
        "Xızmetkerlerge rol hám huqıqlar beriń, hújjetlerdi basqarıń, satıw maǵlıwmatların infografika túrinde kóriń.",
      bullets: [
        "Xızmetkerler ushın rollar hám huqıqlar",
        "Hújjetler dizimi hám olardı basqarıw",
        "Infografika: maǵlıwmatlar kórgizbeli túrde",
      ],
    },
    problem: {
      title: "Komandada hámme hámmesin kóredi",
      text: "Xızmetkerler qanshelli kóp bolsa, kimniń nege kiriw huqıqı bar ekenin hám hújjetler qay jerde turǵanın qadaǵalaw sonshelli qıyın.",
    },
    solution: {
      title: "Xızmetkerler → Rollar → Huqıqlar",
      text: "Robohubta hár bir xızmetkerge rol beriledi, al rol ushın kerekli huqıqlar belgilenedi. Hújjetler de bir bólimge jıynalǵan.",
    },
    flow: [
      "Rol jaratasız",
      "Rol ushın huqıqlardı belgileysiz",
      "Xızmetkerler usı huqıqlar menen isleydi",
    ],
    features: [
      {
        title: "Rollar",
        text: "Jańa rol qosıw hám huqıqlardı sazlaw.",
      },
      {
        title: "Hújjetler",
        text: "Hújjetler dizimi hám olardı basqarıw.",
      },
      {
        title: "Infografika",
        text: "Marketpleys maǵlıwmatların kórgizbeli kóriw.",
      },
    ],
    steps: [
      { title: "«Xızmetkerler» bólimine ótiń", text: "Shep menyudan «Xızmetkerler»." },
      { title: "Rollardı ashıń", text: "Bar rollardıń dizimi." },
      { title: "Jańa rol qosıń", text: "Oǵan at beriń." },
      {
        title: "Huqıqlardı sazlań",
        text: "Rol nege kire alatuǵının tańlań.",
      },
    ],
    faqs: [
      {
        q: "Xızmetkerlerge qalay kiriw huqıqın beriwge boladı?",
        a: "Rollar arqalı. «Xızmetkerler» bóliminde rollar bólimin ashasız, jańa rol qosıp, oǵan at beresiz hám bul rol qaysı bólimlerge kire alatuǵının — yaǵnıy onıń huqıqların — belgileysiz.\n\nSonnan keyin xızmetker tek ózine ruxsat berilgen bólimlerdi kóredi: jumıs tártipli boladı, al áhmiyetli maǵlıwmatlar qorǵalǵan boladı. Jaratılǵan rollardı keyin de basqarıw múmkin (29-sabaq).",
      },
      {
        q: "«Hújjetler» bóliminde neler islewge boladı?",
        a: "Hújjetler dizimin kóriw, hár bir hújjetti ashıp, onıń maǵlıwmatların kóriw, sonday-aq hújjetlerdi basqarıw (28-sabaq).",
      },
      {
        q: "Hújjetlerdi hár bir marketpleys kabinetinen izlew kerek pe?",
        a: "Yaq. Marketpleysler menen islesiw boyınsha hújjetler bir orınǵa — Robohubtıń «Hújjetler» bólimine jıynalǵan.\n\nKerekli hújjetti bir neshe kabinetten izlewdiń keregi joq — ol tez tabıladı hám onı qadaǵalaw ańsat (28-sabaq).",
      },
      {
        q: "Infografika qay jerde hám ol ne beredi?",
        a: "Infografika «Oqıw materialları» bóliminde jaylasqan. Ol marketpleys maǵlıwmatları menen satıw kórsetkishlerin keste túrinde emes, al kórgizbeli — grafikler hám súwretler túrinde kórsetedi.\n\nSonıń arqasında sanlar tezirek túsiniledi, al tendenciyalar hám ózgerisler bir qarawda kórinedi (30-sabaq).",
      },
    ],
  },
};

export const startPath: AcademyContent["startPath"] = {
  integration: "Marketpleystegi dúkanıńızdı Robohubqa jalǵań",
  product: "Ónim kartochkaları menen bahalardı bir orınnan jańalań",
  order: "Barlıq marketpleyslerdiń buyırtpaların bir aynada qayta isleń",
  analytics: "Satıwlar, qárejetler hám paydanı sanlarda kóriń",
};
