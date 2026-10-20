// Har bir darsning nazariy tushuntirishi — mavzu sahifasidagi "Dars haqida" bo'limi (lesson-info.tsx).
//   concept — "Bu nima?": dars mavzusidagi tushuncha oddiy tilda;
//   why     — "Nega kerak?": sotuvchiga amaliy foydasi;
//   tip     — ixtiyoriy qisqa maslahat.
// Matnlar dars nomi, tavsifi va "Ushbu darsda" bandlariga (academy.ts) hamda umumiy marketpleys tushunchalariga
// tayanadi; Robohub interfeysining tafsilotlari videoning o'zida. Kontent jamoasi tekshirib, to'ldirishi mumkin.
// Yangi dars qo'shilsa — shu yerga uning raqami bilan yozuv qo'shiladi (bo'lmasa bo'lim faqat tavsifni ko'rsatadi).

export type LessonNote = { concept: string; why: string; tip?: string };

export const LESSON_NOTES: Record<number, LessonNote> = {
  // ───────── ANALITIKA ─────────
  1: {
    concept:
      "Dashboard — biznesingizning asosiy ko‘rsatkichlari bitta ekranda jamlangan sahifa. Umumiy savdo, buyurtmalar soni va har bir marketpleysning natijasi bir qarashda ko‘rinadi, kerakli davrni tanlab, ko‘rsatkichlarni solishtirish mumkin.",
    why: "To‘rtta marketpleys kabinetini alohida ochib, raqamlarni qo‘lda jamlash ko‘p vaqt oladi va xatoga olib keladi. Dashboard savdo qayerda o‘sayotganini va qayerda pasayayotganini darhol ko‘rsatadi — qaror qabul qilish tezlashadi.",
    tip: "Har kuni ishni dashboard’dan boshlang: avvalgi davr bilan solishtirish keskin o‘zgarishlarni erta payqashga yordam beradi.",
  },
  2: {
    concept:
      "Xarajatlar tahlili — savdodan tushgan pulning qayerga ketayotganini ko‘rsatadi: marketpleys komissiyasi, logistika, reklama, saqlash, jarimalar va operatsion xarajatlar. Har bir xarajatning umumiy xarajatdagi ulushi alohida ko‘rinadi.",
    why: "Katta savdo hali katta foyda degani emas. Qaysi xarajat eng ko‘p pul olayotganini bilsangiz, aynan o‘sha joyni optimallashtirib, sof foydani oshirish mumkin.",
    tip: "Ulushi eng katta 2–3 ta xarajatdan boshlang — foydaga eng tez ta’sir qiladigan joylar shular.",
  },
  3: {
    concept:
      "TOP mahsulotlar — eng ko‘p sotilayotgan va eng ko‘p daromad keltirayotgan SKU’lar ro‘yxati. Mahsulotlar sotuv natijasi bo‘yicha solishtiriladi, kuchli va sust tovarlar aniq ajralib turadi.",
    why: "Odatda daromadning asosiy qismini mahsulotlarning kichik bir guruhi beradi. Ularni bilish qoldiqni o‘z vaqtida to‘ldirish, reklama va assortiment bo‘yicha qarorlarni taxmin emas, ma’lumot asosida qabul qilish imkonini beradi.",
  },
  4: {
    concept:
      "ABC tahlili mahsulotlarni biznes natijasidagi hissasiga qarab uch guruhga bo‘ladi: A — asosiy natijani beradigan tovarlar, B — o‘rtacha natija, C — umumiy natijadagi ulushi kichik tovarlar. Har guruh bo‘yicha SKU soni, GMV, sotuv, marja, xarajat, qaytarish va bekor qilinganlar ko‘rinadi.",
    why: "Hamma mahsulotga bir xil e’tibor berib bo‘lmaydi. ABC qaysi tovarlar biznesni “ko‘tarib turganini” ko‘rsatadi: A guruhi doim omborda bo‘lishi kerak, C guruhini esa qayta ko‘rib chiqish yoki assortimentdan chiqarish mumkin.",
  },
  5: {
    concept:
      "XYZ tahlili mahsulotlarni talab barqarorligiga qarab guruhlaydi: X — sotuvi barqaror, Y — talabi o‘zgaruvchan, Z — sotuvi beqaror va prognoz qilish qiyin.",
    why: "Talabi barqaror tovarni oldindan aniq rejalashtirish mumkin, beqaror tovarda esa ehtiyot bo‘lish kerak. Bu qoldiqlarni aniqroq rejalashtirishga, ortiqcha zaxira va yetishmovchilik xavfini kamaytirishga yordam beradi.",
  },
  6: {
    concept:
      "ABC × XYZ — ikki tahlilning birlashmasi: mahsulotning biznesdagi ahamiyati (ABC) va talab barqarorligi (XYZ) birga baholanadi. Natijada AX dan CZ gacha 9 ta guruh hosil bo‘ladi, har biri ichida GMV, sotuv, marja va xarajatlar ko‘rinadi.",
    why: "Har guruhga o‘z strategiyasi kerak. Masalan, AX — muhim va barqaror tovar, uni doim yetarli zaxirada saqlash kerak; CZ — ulushi kichik va beqaror, unga ortiqcha mablag‘ bog‘lab qo‘ymaslik kerak.",
    tip: "Avval AX, AY va CZ guruhlariga qarang — eng muhim va eng xavfli mahsulotlar shu yerda.",
  },
  7: {
    concept:
      "Operatsion xarajatlar — mahsulot tannarxi va marketpleys komissiyalaridan tashqari, biznesni yuritish uchun har oy sarflanadigan pullar: soliq foizi, oylik qat’iy soliqlar, xodimlar maoshi va har bir mahsulotga to‘g‘ri keladigan o‘rtacha xarajat.",
    why: "Bu xarajatlar hisobga olinmasa, foyda haqiqatdagidan ko‘p bo‘lib ko‘rinadi. Ularni Robohub’ga kiritganingizdan keyin marja va ROI real raqamlar asosida hisoblanadi — qaysi mahsulot haqiqatan foyda keltirayotgani aniq bo‘ladi.",
    tip: "Xarajatlarni bir marta to‘liq kiriting va o‘zgarganda yangilab boring — shunda hisobotlar doim aniq bo‘ladi.",
  },
  8: {
    concept:
      "Tannarx — mahsulotni sotib olish yoki ishlab chiqarish uchun sarflangan narx. Robohub’ga har bir mahsulotning tannarxini kiritish yoki ro‘yxat bilan yuklash mumkin.",
    why: "Tannarx bo‘lmasa, tizim faqat tushumni ko‘radi, foydani emas. Tannarx kiritilgach, har bir mahsulotning real natijasi — qancha sotilgani emas, qancha pul qoldirgani ko‘rinadi.",
  },

  // ───────── BUYURTMALAR ─────────
  9: {
    concept:
      "Buyurtmalar dinamikasi — tanlangan davr ichida buyurtmalar soni qanday o‘zgargani: ko‘payyaptimi yoki kamayyaptimi, buyurtmalar qaysi marketpleyslardan kelyapti.",
    why: "Dinamika muammo yoki imkoniyatni raqamlar katta o‘zgarishidan oldin ko‘rsatadi. Pasayishni erta payqasangiz, sababini — narx, qoldiq yoki raqobatni — vaqtida topasiz.",
  },
  10: {
    concept:
      "Yandex Market’dan kelgan buyurtmalar Robohub kabinetida ko‘rinadi: yangi buyurtmani ochish, tarkibini tekshirish, u bilan ishlash va statusini kuzatish shu yerda bajariladi.",
    why: "Marketpleys kabinetiga alohida kirmasdan, barcha buyurtmalar bilan bitta joyda ishlaysiz — vaqt tejaladi va birorta buyurtma e’tibordan chetda qolmaydi.",
  },
  11: {
    concept:
      "Wildberries buyurtmalari Robohub kabinetida jamlanadi: yangi buyurtmani ko‘rish, tekshirish, qayta ishlash va statusini kuzatish bir joyda bajariladi.",
    why: "Bir nechta marketpleysda sotsangiz, buyurtmalarni har bir kabinetda alohida kuzatish qiyin. Hammasi bitta oynada bo‘lsa, buyurtmalar tezroq qayta ishlanadi va xato kamayadi.",
  },
  12: {
    concept:
      "Uzum Market’dan kelgan buyurtmalar Robohub kabinetida ko‘rinadi — ularni tekshirish, qayta ishlash va statusini kuzatish mumkin.",
    why: "Buyurtma qanchalik tez qayta ishlansa, mijoz shunchalik tez oladi — bu esa reyting va sharhlarga bevosita ta’sir qiladi. Bitta kabinet bu jarayonni tezlashtiradi.",
  },
  13: {
    concept:
      "FBO (Fulfillment by Operator) — tovarlaringiz marketpleys omborida saqlanadigan va buyurtmalarni marketpleysning o‘zi yetkazadigan model. Ta’minlash — marketpleys omboriga qaysi mahsulotdan qancha yuborilishini rasmiylashtiruvchi ariza.",
    why: "Ta’minlash to‘g‘ri tuzilsa, tovar omborga o‘z vaqtida yetib boradi va sotuv to‘xtab qolmaydi. Robohub’da mahsulot va miqdorni tanlab, ma’lumotlarni tekshirib, tayyor ta’minlashlarni boshqarish mumkin.",
    tip: "Ta’minlash yaratishdan oldin qoldiqlar va ABC/XYZ natijalariga qarang — eng kerakli tovarlarni birinchi yuboring.",
  },
  14: {
    concept:
      "Buyurtma holati — buyurtma qaysi bosqichda ekanini ko‘rsatadi. Buyurtmalar bo‘limida Uzum Market buyurtmalarini ko‘rib, ma’lumotlarini tekshirib, holatini boshqarish mumkin.",
    why: "Holat o‘z vaqtida yangilanib borsa, kechikish va bekor qilishlar kamayadi, har bir buyurtma qayerda turgani doim aniq bo‘ladi.",
  },

  // ───────── MAHSULOTLAR ─────────
  15: {
    concept:
      "Narxni yangilash — mahsulot narxini Robohub’da o‘zgartirib, yangi narxni to‘g‘ridan-to‘g‘ri marketpleysga yuborish.",
    why: "Narxni har bir marketpleys kabinetida alohida o‘zgartirish vaqt oladi va xatoga sabab bo‘ladi. Bitta joydan yangilash aksiya, mavsum yoki raqobatga tez javob berish imkonini beradi.",
    tip: "Narxni o‘zgartirishdan oldin tannarx va xarajatlar kiritilganini tekshiring — shunda yangi narxdagi marjani bilasiz.",
  },
  16: {
    concept:
      "Tovar kartochkasi — marketpleysda mahsulotingizni xaridorga tanishtiradigan sahifa: nomi, ma’lumotlari, narxi va boshqa maydonlar. Robohub’da yangi kartochka yaratib, to‘ldirib, saqlab, marketpleysga yuborish mumkin.",
    why: "Yaxshi to‘ldirilgan kartochka qidiruvda yaxshiroq ko‘rinadi va xaridorni tezroq ishontiradi. Kartochkani bitta joydan yaratish vaqtni tejaydi.",
  },

  // ───────── OMBOR ─────────
  17: {
    concept: "Omborlarni guruhlash — bir nechta omborni o‘zingizga qulay guruhlarga birlashtirish. Bu dars — jarayonning qisqa ko‘rinishi.",
    why: "Omborlar ko‘p bo‘lsa, ularni guruhlab ko‘rish qoldiqlarni boshqarishni ancha osonlashtiradi. Batafsil ko‘rinishi — keyingi darsda.",
  },
  18: {
    concept:
      "Ombor guruhlari — bir nechta omborni (masalan, bir shahar yoki bir marketpleys omborlarini) bitta guruhga birlashtirish va ular bilan bitta kabinetdan ishlash.",
    why: "Omborlar ko‘paygani sari qoldiqni har biri bo‘yicha alohida kuzatish qiyinlashadi. Guruhlar qoldiqni umumiy ko‘rish va ta’minlashni rejalashtirishni soddalashtiradi.",
  },
  19: {
    concept:
      "Missing — ombordagi hisobda bor, lekin haqiqatda topilmagan yoki holati noaniq mahsulotlar. Robohub’da ular alohida bo‘limda ko‘rinadi va ma’lumotlarini tekshirish mumkin.",
    why: "Missing holatidagi tovar — sotilmay qolgan pul. Ularni vaqtida aniqlab, marketpleys bilan masalani hal qilish yo‘qotishlarni kamaytiradi.",
    tip: "Missing bo‘limini muntazam tekshiring — qancha erta payqasangiz, masalani hal qilish shuncha oson.",
  },

  // ───────── MARKETING ─────────
  20: {
    concept:
      "Promokodlar va aksiyalar taqvimi — marketpleysdagi chegirma kodlari va aksiyalarning sanalari hamda shartlari bitta joyda ko‘rinadi.",
    why: "Qaysi aksiya qachon boshlanib, qachon tugashini bilsangiz, qoldiq va narxni oldindan tayyorlaysiz — aksiyadan maksimal foyda olasiz.",
  },
  21: {
    concept: "Boost TOP — mahsulotlarni marketpleys qidiruvida yuqoriroq ko‘tarishga yordam beradigan funksiya. Robohub’da uning ma’lumotlarini ko‘rib, mahsulotlarni boshqarish mumkin.",
    why: "Qidiruvda yuqorida turgan tovarni xaridor ko‘proq ko‘radi va ko‘proq sotib oladi. Boost TOP natijalarini kuzatib, eng samarali mahsulotlarga e’tibor qaratasiz.",
  },

  // ───────── INTEGRATSIYA ─────────
  22: {
    concept: "Integratsiya — Uzum Market sotuvchi akkauntingizni Robohub bilan bog‘lash. Ulangach, ma’lumotlar Robohub kabinetiga kela boshlaydi.",
    why: "Bu — Robohub bilan ishlashning birinchi qadami: buyurtmalar, mahsulotlar va analitika aynan shu ulanishdan keyin ishlaydi.",
    tip: "Ulangandan so‘ng ulanish faol ekanini tekshiring — shunda ma’lumotlar uzilishsiz keladi.",
  },
  23: {
    concept: "Integratsiya — Wildberries sotuvchi akkauntingizni Robohub bilan bog‘lash. Integratsiya ma’lumotlari kiritilib, ulanish tekshiriladi va faollashtiriladi.",
    why: "Ulangach, Wildberries buyurtmalari, mahsulotlari va analitikasi boshqa marketpleyslar bilan bitta kabinetda ko‘rinadi.",
  },
  24: {
    concept: "Integratsiya — Yandex Market sotuvchi akkauntingizni Robohub bilan bog‘lash. Integratsiya ma’lumotlari kiritilib, ulanish tekshiriladi va faollashtiriladi.",
    why: "Ulangach, Yandex Market buyurtmalari va ma’lumotlari boshqa marketpleyslar bilan birga bitta joyda boshqariladi.",
  },
  25: {
    concept: "Integratsiya — Ozon sotuvchi akkauntingizni Robohub bilan bog‘lash. Integratsiya ma’lumotlari kiritilib, ulanish tekshiriladi va faollashtiriladi.",
    why: "Ulangach, Ozon’dagi savdo ham umumiy analitika va buyurtmalar ro‘yxatiga qo‘shiladi — barcha marketpleyslar bitta kabinetda.",
  },

  // ───────── MULOQOT ─────────
  26: {
    concept: "Chat — marketpleyslardagi mijozlar bilan yozishmalar bitta joyga jamlangan bo‘lim: chatlar ro‘yxati, yozishmalar va xabarlarni boshqarish.",
    why: "Mijoz savoliga tez javob — sotuv va yaxshi sharh demak. Barcha chatlar bitta joyda bo‘lsa, birorta xabar javobsiz qolmaydi.",
  },
  27: {
    concept: "Avtojavob — mijozlar sharhlariga avtomatik javob berish funksiyasi. Sharhlarni ko‘rish va avtojavob sozlamalarini o‘zgartirish shu bo‘limda.",
    why: "Har bir sharhga qo‘lda javob yozish ko‘p vaqt oladi. Avtojavob har bir mijozga e’tibor ko‘rsatadi va do‘kon obro‘sini qo‘llab-quvvatlaydi.",
    tip: "Salbiy sharhlarga avtojavobdan keyin shaxsan ham javob bering — mijoz e’tiborni sezadi.",
  },

  // ───────── BOSHQARUV ─────────
  28: {
    concept: "Hujjatlar bo‘limi — marketpleyslar bilan ishlashdagi hujjatlar ro‘yxati va ularning ma’lumotlari bitta kabinetda.",
    why: "Hujjatlarni har bir marketpleys kabinetidan qidirish shart emas — kerakli hujjat tez topiladi va nazorat qilinadi.",
  },
  29: {
    concept: "Rollar — xodimlarga beriladigan kirish huquqlari to‘plami. Yangi rol qo‘shib, nom berib, unga kerakli huquqlarni belgilaysiz va rollarni boshqarasiz.",
    why: "Har bir xodim faqat o‘ziga kerakli bo‘limlarni ko‘radi: ish tartibli bo‘ladi, muhim ma’lumotlar xavfsiz qoladi.",
    tip: "Rollarni lavozim bo‘yicha yarating — yangi xodim kelganda unga tayyor rolni berish kifoya.",
  },
  30: {
    concept: "Infografika — o‘quv material bo‘limidagi funksiya: marketpleys ma’lumotlari va savdo ko‘rsatkichlari jadval o‘rniga vizual ko‘rinishda.",
    why: "Grafik va vizual ko‘rinish raqamlarni tezroq tushunishga yordam beradi — tendensiyalar va o‘zgarishlar bir qarashda ko‘rinadi.",
  },
};
