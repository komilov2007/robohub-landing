import { defineMessages } from "@/i18n/config";

// Sarlavha uch bo'lakda: before + <gradient>mark</gradient> + after
export const messages = defineMessages({
  uz: {
    kicker: "Amalda sinab ko‘ring",
    title: (name: string) => ({ before: `${name}ni bugun`, mark: "o‘z kabinetingizda", after: "sinab ko‘ring" }),
    text: "Darsdagi har bir qadamni o‘z kabinetingizda takrorlang.",
    start: "Hoziroq boshlash",
    next: (name: string) => `Keyingi: ${name}`,
    // darsga mos bepul vosita (cta.tsx): analitika — kalkulyator, mahsulotlar — AI Studio (TZ 8.9)
    toolCalc: "Bepul: marketpleys foyda kalkulyatori",
    toolStudio: "Bepul: AI bilan mahsulot kartochkasi (AI Studio)",
  },
  ru: {
    kicker: "Попробуйте на практике",
    title: (name: string) => ({ before: `Попробуйте «${name}» сегодня`, mark: "в своём кабинете", after: "" }),
    text: "Повторите каждый шаг из урока в своём кабинете.",
    start: "Начать сейчас",
    next: (name: string) => `Далее: ${name}`,
    // darsga mos bepul vosita (cta.tsx): analitika — kalkulyator, mahsulotlar — AI Studio (TZ 8.9)
    toolCalc: "Бесплатно: калькулятор прибыли на маркетплейсах",
    toolStudio: "Бесплатно: карточка товара с AI (AI Studio)",
  },
  en: {
    kicker: "Try it in practice",
    title: (name: string) => ({ before: `Try ${name} today`, mark: "in your own account", after: "" }),
    text: "Repeat every step from the lesson in your own account.",
    start: "Get started",
    next: (name: string) => `Next: ${name}`,
    // darsga mos bepul vosita (cta.tsx): analitika — kalkulyator, mahsulotlar — AI Studio (TZ 8.9)
    toolCalc: "Free: marketplace profit calculator",
    toolStudio: "Free: AI product cards (AI Studio)",
  },
  kk: {
    kicker: "Іс жүзінде сынап көріңіз",
    title: (name: string) => ({ before: `«${name}» мүмкіндіктерін бүгін`, mark: "өз кабинетіңізде", after: "сынап көріңіз" }),
    text: "Сабақтағы әр қадамды өз кабинетіңізде қайталаңыз.",
    start: "Қазір бастау",
    next: (name: string) => `Келесі: ${name}`,
    // darsga mos bepul vosita (cta.tsx): analitika — kalkulyator, mahsulotlar — AI Studio (TZ 8.9)
    toolCalc: "Тегін: маркетплейс пайда калькуляторы",
    toolStudio: "Тегін: AI арқылы тауар карточкасы (AI Studio)",
  },
  ky: {
    kicker: "Иш жүзүндө сынап көрүңүз",
    title: (name: string) => ({ before: `«${name}» мүмкүнчүлүктөрүн бүгүн`, mark: "өз кабинетиңизде", after: "сынап көрүңүз" }),
    text: "Сабактагы ар бир кадамды өз кабинетиңизде кайталаңыз.",
    start: "Азыр баштоо",
    next: (name: string) => `Кийинки: ${name}`,
    // darsga mos bepul vosita (cta.tsx): analitika — kalkulyator, mahsulotlar — AI Studio (TZ 8.9)
    toolCalc: "Акысыз: маркетплейс киреше калькулятору",
    toolStudio: "Акысыз: AI менен товар карточкасы (AI Studio)",
  },
  kaa: {
    kicker: "Ámelde sınap kóriń",
    title: (name: string) => ({ before: `“${name}” imkaniyatların búgin`, mark: "óz kabinetińizde", after: "sınap kóriń" }),
    text: "Sabaqtaǵı hár bir qádemdi óz kabinetińizde tákirarlań.",
    start: "Házir baslaw",
    next: (name: string) => `Keyingi: ${name}`,
    // darsga mos bepul vosita (cta.tsx): analitika — kalkulyator, mahsulotlar — AI Studio (TZ 8.9)
    toolCalc: "Biypul: marketpleys payda kalkulyatorı",
    toolStudio: "Biypul: AI menen tovar kartochkası (AI Studio)",
  },
  tg: {
    kicker: "Дар амал санҷед",
    title: (name: string) => ({ before: `Имрӯз «${name}»-ро`, mark: "дар кабинети худ", after: "санҷед" }),
    text: "Ҳар як қадами дарсро дар кабинети худ такрор кунед.",
    start: "Ҳозир оғоз кунед",
    next: (name: string) => `Навбатӣ: ${name}`,
    // darsga mos bepul vosita (cta.tsx): analitika — kalkulyator, mahsulotlar — AI Studio (TZ 8.9)
    toolCalc: "Ройгон: ҳисобкунаки фоида дар маркетплейс",
    toolStudio: "Ройгон: корти мол бо AI (AI Studio)",
  },
});
