import { defineMessages } from "@/i18n/config";

export const messages = defineMessages({
  uz: {
    kicker: (lesson: string) => `Amaliy video · ${lesson}`,
    position: (pos: number, total: number) => `${pos} / ${total} dars`,
    main: "Asosiy dars",
    watched: "Ko‘rildi",
    theory: "Nazariy qism",
    what: "Bu nima?",
    why: "Nega kerak?",
    inVideo: "Videoda",
    tip: "Maslahat.",
    date: "Sana",

    author: "Muallif: Robohub jamoasi", // muallif (JSON-LD TechArticle.author bilan bir xil)
  },
  ru: {
    kicker: (lesson: string) => `Практическое видео · ${lesson}`,
    position: (pos: number, total: number) => `урок ${pos} из ${total}`,
    main: "Основной урок",
    watched: "Просмотрено",
    theory: "Теория",
    what: "Что это?",
    why: "Зачем это нужно?",
    inVideo: "В видео",
    tip: "Совет.",
    date: "Дата",

    author: "Автор: команда Robohub", // muallif (JSON-LD TechArticle.author bilan bir xil)
  },
  en: {
    kicker: (lesson: string) => `Hands-on video · ${lesson}`,
    position: (pos: number, total: number) => `lesson ${pos} of ${total}`,
    main: "Main lesson",
    watched: "Watched",
    theory: "Theory",
    what: "What is it?",
    why: "Why does it matter?",
    inVideo: "In the video",
    tip: "Tip.",
    date: "Date",

    author: "By the Robohub team", // muallif (JSON-LD TechArticle.author bilan bir xil)
  },
  kk: {
    kicker: (lesson: string) => `Практикалық бейне · ${lesson}`,
    position: (pos: number, total: number) => `${pos} / ${total} сабақ`,
    main: "Негізгі сабақ",
    watched: "Көрілді",
    theory: "Теориялық бөлім",
    what: "Бұл не?",
    why: "Не үшін керек?",
    inVideo: "Бейнеде",
    tip: "Кеңес.",
    date: "Күні",

    author: "Авторы: Robohub командасы", // muallif (JSON-LD TechArticle.author bilan bir xil)
  },
  ky: {
    kicker: (lesson: string) => `Практикалык видео · ${lesson}`,
    position: (pos: number, total: number) => `${pos} / ${total} сабак`,
    main: "Негизги сабак",
    watched: "Көрүлдү",
    theory: "Теориялык бөлүк",
    what: "Бул эмне?",
    why: "Эмне үчүн керек?",
    inVideo: "Видеодо",
    tip: "Кеңеш.",
    date: "Күнү",

    author: "Автору: Robohub командасы", // muallif (JSON-LD TechArticle.author bilan bir xil)
  },
  kaa: {
    kicker: (lesson: string) => `Ámeliy video · ${lesson}`,
    position: (pos: number, total: number) => `${pos} / ${total} sabaq`,
    main: "Tiykarǵı sabaq",
    watched: "Kórildi",
    theory: "Teoriyalıq bólim",
    what: "Bul ne?",
    why: "Ne ushın kerek?",
    inVideo: "Videoda",
    tip: "Másláhát.",
    date: "Sáne",

    author: "Avtor: Robohub komandası", // muallif (JSON-LD TechArticle.author bilan bir xil)
  },
  tg: {
    kicker: (lesson: string) => `Видеои амалӣ · ${lesson}`,
    position: (pos: number, total: number) => `дарси ${pos} аз ${total}`,
    main: "Дарси асосӣ",
    watched: "Тамошо шуд",
    theory: "Қисми назариявӣ",
    what: "Ин чист?",
    why: "Барои чӣ лозим аст?",
    inVideo: "Дар видео",
    tip: "Маслиҳат.",
    date: "Сана",

    author: "Муаллиф: дастаи Robohub", // muallif (JSON-LD TechArticle.author bilan bir xil)
  },
});
