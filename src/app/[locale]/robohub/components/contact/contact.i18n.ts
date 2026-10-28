import { defineMessages } from "@/i18n/config";

export const messages = defineMessages({
  uz: {
    // Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi
    title: "Robohub jamoasi bilan ",
    titleAccent: "bog‘laning",
    lead: "Savolingiz bormi yoki demo kerakmi? Raqamingizni qoldiring — tez javob beramiz.",
    send: "Yuborish",
    close: "Yopish",   // modal oynani yopish tugmasi (contact-modal.tsx)
    // barcha savollardan keyin forma o'rnida chiqadigan tasdiq
    done: "Soʻrov yuborildi",
    doneSub: "Tez orada siz bilan bogʻlanamiz",
    // contact.script.js boshqaradi: savollar bitta inputda ketma-ket chiqadi,
    // oxirgisidan keyin javoblardan tayyor xat (mailto) tuziladi. label — xatdagi qator nomi.
    // options — 1-qadamdagi tayyor variantlar, other — "Boshqa" (nomini inputga yozadi);
    // methods — oxirgi qadamda telefon yoki email tanlovi
    quiz: {
      subject: "Robohub: sayt orqali murojaat",
      step: "Qadam",
      options: ["Uzum Market","Wildberries","Ozon","Yandex Market","Hali sotmayman"],
      other: "Boshqa",
      remove: "Olib tashlash",
      otherPlaceholder: "Marketpleys nomini yozing",
      pickError: "Variantni tanlang yoki nomini yozing",
      phoneError: "Raqamni toʻliq kiriting", // oxiriga tanlangan mamlakat formati qo'shiladi: ": +998 (XX) XXX-XX-XX" (contact.script.js)
      again: "Qayta yuborish", // tasdiqdan keyin formani qayta boshlash tugmasi
      country: "Mamlakat kodi", // telefon kodi tanlash tugmasi (ekran o'quvchilar uchun)
      methods: { phone: "Telefon", email: "Email" },
      emailPlaceholder: "Email manzilingiz",
      emailLabel: "Email: ",
      emailError: "Email manzilini toʻliq kiriting, masalan: name@mail.uz",
      steps: [
        { name: "marketplace", type: "text", autoComplete: "off", placeholder: "Qaysi marketpleysda sotasiz?", label: "Marketpleys: " },
        { name: "name", type: "text", autoComplete: "name", placeholder: "Ismingiz", label: "Ism: " },
        { name: "phone", type: "tel", autoComplete: "tel", placeholder: "Telefon raqamingiz", label: "Telefon: " },
      ],
    },
  },
  ru: {
    title: "Свяжитесь с командой ",
    titleAccent: "Robohub",
    lead: "Есть вопрос или нужна демонстрация? Оставьте номер — мы быстро ответим.",
    send: "Отправить",
    close: "Закрыть",
    done: "Заявка отправлена",
    doneSub: "Скоро свяжемся с вами",
    quiz: {
      subject: "Robohub: заявка с сайта",
      step: "Шаг",
      options: ["Uzum Market","Wildberries","Ozon","Яндекс Маркет","Пока не продаю"],
      other: "Другое",
      remove: "Убрать",
      otherPlaceholder: "Напишите название площадки",
      pickError: "Выберите вариант или напишите название",
      phoneError: "Введите номер полностью", // oxiriga tanlangan mamlakat formati qo'shiladi: ": +998 (XX) XXX-XX-XX" (contact.script.js)
      again: "Отправить ещё раз", // tasdiqdan keyin formani qayta boshlash tugmasi
      country: "Код страны", // telefon kodi tanlash tugmasi (ekran o'quvchilar uchun)
      methods: { phone: "Телефон", email: "Email" },
      emailPlaceholder: "Ваш email",
      emailLabel: "Email: ",
      emailError: "Введите email полностью, например: name@mail.uz",
      steps: [
        { name: "marketplace", type: "text", autoComplete: "off", placeholder: "На каком маркетплейсе продаёте?", label: "Маркетплейс: " },
        { name: "name", type: "text", autoComplete: "name", placeholder: "Ваше имя", label: "Имя: " },
        { name: "phone", type: "tel", autoComplete: "tel", placeholder: "Ваш номер телефона", label: "Телефон: " },
      ],
    },
  },
  en: {
    title: "Get in touch with the ",
    titleAccent: "Robohub team",
    lead: "Have a question or want a demo? Leave your number — we’ll get back to you fast.",
    send: "Send",
    close: "Close",
    done: "Request sent",
    doneSub: "We’ll get back to you soon",
    quiz: {
      subject: "Robohub: website inquiry",
      step: "Step",
      options: ["Uzum Market","Wildberries","Ozon","Yandex Market","Not selling yet"],
      other: "Other",
      remove: "Remove",
      otherPlaceholder: "Type the marketplace name",
      pickError: "Pick an option or type a name",
      phoneError: "Enter the full number", // oxiriga tanlangan mamlakat formati qo'shiladi: ": +998 (XX) XXX-XX-XX" (contact.script.js)
      again: "Send again", // tasdiqdan keyin formani qayta boshlash tugmasi
      country: "Country code", // telefon kodi tanlash tugmasi (ekran o'quvchilar uchun)
      methods: { phone: "Phone", email: "Email" },
      emailPlaceholder: "Your email",
      emailLabel: "Email: ",
      emailError: "Enter a full email address, e.g. name@mail.uz",
      steps: [
        { name: "marketplace", type: "text", autoComplete: "off", placeholder: "Which marketplace do you sell on?", label: "Marketplace: " },
        { name: "name", type: "text", autoComplete: "name", placeholder: "Your name", label: "Name: " },
        { name: "phone", type: "tel", autoComplete: "tel", placeholder: "Your phone number", label: "Phone: " },
      ],
    },
  },
  kk: {
    title: "Robohub командасымен ",
    titleAccent: "байланысыңыз",
    lead: "Сұрағыңыз бар ма немесе демо керек пе? Нөміріңізді қалдырыңыз — тез жауап береміз.",
    send: "Жіберу",
    close: "Жабу",
    done: "Өтінім жіберілді",
    doneSub: "Жақын арада сізбен хабарласамыз",
    quiz: {
      subject: "Robohub: сайт арқылы өтінім",
      step: "Қадам",
      options: ["Uzum Market","Wildberries","Ozon","Яндекс Маркет","Әзірге сатпаймын"],
      other: "Басқа",
      remove: "Алып тастау",
      otherPlaceholder: "Маркетплейс атауын жазыңыз",
      pickError: "Нұсқаны таңдаңыз немесе атауын жазыңыз",
      phoneError: "Нөмірді толық енгізіңіз", // oxiriga tanlangan mamlakat formati qo'shiladi: ": +998 (XX) XXX-XX-XX" (contact.script.js)
      again: "Қайта жіберу", // tasdiqdan keyin formani qayta boshlash tugmasi
      country: "Ел коды", // telefon kodi tanlash tugmasi (ekran o'quvchilar uchun)
      methods: { phone: "Телефон", email: "Email" },
      emailPlaceholder: "Email мекенжайыңыз",
      emailLabel: "Email: ",
      emailError: "Email мекенжайын толық енгізіңіз, мысалы: name@mail.uz",
      steps: [
        { name: "marketplace", type: "text", autoComplete: "off", placeholder: "Қай маркетплейсте сатасыз?", label: "Маркетплейс: " },
        { name: "name", type: "text", autoComplete: "name", placeholder: "Атыңыз", label: "Аты: " },
        { name: "phone", type: "tel", autoComplete: "tel", placeholder: "Телефон нөміріңіз", label: "Телефон: " },
      ],
    },
  },
  ky: {
    title: "Robohub командасы менен ",
    titleAccent: "байланышыңыз",
    lead: "Сурооңуз барбы же демо керекпи? Номериңизди калтырыңыз — тез жооп беребиз.",
    send: "Жөнөтүү",
    close: "Жабуу",
    done: "Өтүнмө жөнөтүлдү",
    doneSub: "Жакында сиз менен байланышабыз",
    quiz: {
      subject: "Robohub: сайт аркылуу өтүнмө",
      step: "Кадам",
      options: ["Uzum Market","Wildberries","Ozon","Яндекс Маркет","Азырынча сатпайм"],
      other: "Башка",
      remove: "Алып салуу",
      otherPlaceholder: "Маркетплейстин аталышын жазыңыз",
      pickError: "Вариантты тандаңыз же аталышын жазыңыз",
      phoneError: "Номерди толук киргизиңиз", // oxiriga tanlangan mamlakat formati qo'shiladi: ": +998 (XX) XXX-XX-XX" (contact.script.js)
      again: "Кайра жөнөтүү", // tasdiqdan keyin formani qayta boshlash tugmasi
      country: "Өлкө коду", // telefon kodi tanlash tugmasi (ekran o'quvchilar uchun)
      methods: { phone: "Телефон", email: "Email" },
      emailPlaceholder: "Email дарегиңиз",
      emailLabel: "Email: ",
      emailError: "Email дарегин толук киргизиңиз, мисалы: name@mail.uz",
      steps: [
        { name: "marketplace", type: "text", autoComplete: "off", placeholder: "Кайсы маркетплейсте сатасыз?", label: "Маркетплейс: " },
        { name: "name", type: "text", autoComplete: "name", placeholder: "Атыңыз", label: "Аты: " },
        { name: "phone", type: "tel", autoComplete: "tel", placeholder: "Телефон номериңиз", label: "Телефон: " },
      ],
    },
  },
  kaa: {
    title: "Robohub komandası menen ",
    titleAccent: "baylanısıń",
    lead: "Sorawıńız bar ma yamasa demo kerek pe? Nomerińizdi qaldırıń — tez juwap beremiz.",
    send: "Jiberiw",
    close: "Jabıw",
    done: "Soraw jiberildi",
    doneSub: "Tez arada siz benen baylanısamız",
    quiz: {
      subject: "Robohub: sayt arqalı múrájat",
      step: "Qádem",
      options: ["Uzum Market","Wildberries","Ozon","Yandex Market","Ele satpayman"],
      other: "Basqa",
      remove: "Alıp taslaw",
      otherPlaceholder: "Marketpleys atın jazıń",
      pickError: "Variantı tańlań yamasa atın jazıń",
      phoneError: "Nomerdi tolıq kiritiń", // oxiriga tanlangan mamlakat formati qo'shiladi: ": +998 (XX) XXX-XX-XX" (contact.script.js)
      again: "Qayta jiberiw", // tasdiqdan keyin formani qayta boshlash tugmasi
      country: "Mámleket kodı", // telefon kodi tanlash tugmasi (ekran o'quvchilar uchun)
      methods: { phone: "Telefon", email: "Email" },
      emailPlaceholder: "Email mánzilińiz",
      emailLabel: "Email: ",
      emailError: "Email mánzilin tolıq kiritiń, mısalı: name@mail.uz",
      steps: [
        { name: "marketplace", type: "text", autoComplete: "off", placeholder: "Qaysı marketpleyste satasız?", label: "Marketpleys: " },
        { name: "name", type: "text", autoComplete: "name", placeholder: "Atıńız", label: "Atı: " },
        { name: "phone", type: "tel", autoComplete: "tel", placeholder: "Telefon nomerińiz", label: "Telefon: " },
      ],
    },
  },
  tg: {
    title: "Бо дастаи Robohub ",
    titleAccent: "тамос гиред",
    lead: "Савол доред ё намоиш лозим аст? Рақами худро гузоред — зуд ҷавоб медиҳем.",
    send: "Фиристодан",
    close: "Пӯшидан",
    done: "Дархост фиристода шуд",
    doneSub: "Ба наздикӣ бо шумо тамос мегирем",
    quiz: {
      subject: "Robohub: дархост аз сайт",
      step: "Қадам",
      options: ["Uzum Market","Wildberries","Ozon","Яндекс Маркет","Ҳоло намефурӯшам"],
      other: "Дигар",
      remove: "Нест кардан",
      otherPlaceholder: "Номи маркетплейсро нависед",
      pickError: "Вариантро интихоб кунед ё номашро нависед",
      phoneError: "Рақамро пурра ворид кунед", // oxiriga tanlangan mamlakat formati qo'shiladi: ": +998 (XX) XXX-XX-XX" (contact.script.js)
      again: "Аз нав фиристодан", // tasdiqdan keyin formani qayta boshlash tugmasi
      country: "Рамзи кишвар", // telefon kodi tanlash tugmasi (ekran o'quvchilar uchun)
      methods: { phone: "Телефон", email: "Email" },
      emailPlaceholder: "Email-и шумо",
      emailLabel: "Email: ",
      emailError: "Email-ро пурра ворид кунед, масалан: name@mail.uz",
      steps: [
        { name: "marketplace", type: "text", autoComplete: "off", placeholder: "Дар кадом маркетплейс мефурӯшед?", label: "Маркетплейс: " },
        { name: "name", type: "text", autoComplete: "name", placeholder: "Номи шумо", label: "Ном: " },
        { name: "phone", type: "tel", autoComplete: "tel", placeholder: "Рақами телефони шумо", label: "Телефон: " },
      ],
    },
  },
});
