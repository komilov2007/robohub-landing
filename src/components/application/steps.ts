// Ariza formalarining qadamlari — har sayt o'z savollari bilan, komponent va dizayn bitta (application.tsx):
//   Robohub  — marketpleys sellerlari uchun 6 qadam;
//   Robosell — onlayn savdo (do'kon/restoran) uchun 9 qadam (robo.uz/application formasidagi savollar).
// id — CRM'ga yuboriladigan kalit (form_data[0].<id>), tartib — URL'dagi qadam raqami (/application/step-N).
// value — CRM'ga ketadigan qiymat: sayt tilidan qat'i nazar doim o'zbekcha (menejerlar bir xil matn ko'radi).
// Ko'rinadigan matnlar *.i18n.ts da, variantlar shu yerdagi tartibda.
export type FormId = "robohub" | "robosell";
export type StepType = "checkbox" | "radio" | "text" | "phone";

export type StepOption = {
  value: string;
  icon?: string; // public/marketplaces/*.svg
  emoji?: string;
  other?: true; // tanlansa matn maydoni ochiladi, CRM'ga yozilgan matn ketadi
  exclusive?: true; // tanlansa qolganlari bekor bo'ladi (va aksincha)
};

export type StepConfig = {
  id: string;
  type: StepType;
  options?: readonly StepOption[];
  columns?: 2; // qisqa variantlar (shaharlar) — telefonda ham 2 ustun
  autoComplete?: string; // text qadam uchun
};

const OTHER: StepOption = { value: "Boshqa", other: true };

const ROBOHUB_STEPS: readonly StepConfig[] = [
  {
    id: "whichMarketplaces",
    type: "checkbox",
    options: [
      { value: "Uzum Market", icon: "uzum" },
      { value: "Wildberries", icon: "wildberries" },
      { value: "Ozon", icon: "ozon" },
      { value: "Yandex Market", icon: "yandex" },
      { value: "Hali sotmayman", exclusive: true },
      OTHER,
    ],
  },
  {
    id: "productCount",
    type: "radio",
    options: [{ value: "1 – 100 ta tovar" }, { value: "101 – 500 ta tovar" }, { value: "501 – 1000 ta tovar" }, { value: "1000+ ta tovar" }],
  },
  {
    id: "salesModel",
    type: "checkbox",
    options: [{ value: "FBO" }, { value: "FBS" }, { value: "DBS" }, { value: "EBDS" }, { value: "Bilmayman / aniqlashtirish qiyin" }],
  },
  {
    id: "marketplaceProblems",
    type: "checkbox",
    options: [
      { value: "Buyurtmalarni boshqarish qiyin" },
      { value: "Ombor hisobini yuritish qiyin" },
      { value: "Narxlarni yangilash qiyin" },
      { value: "Bir nechta marketpleyni boshqarish qiyin" },
      { value: "Analitika yetishmaydi" },
      OTHER,
    ],
  },
  { id: "storeName", type: "text", autoComplete: "organization" },
  { id: "phone", type: "phone" },
];

// Namunaviy payload: {"businessType":"Restoran / Kafe","ordersPerDay":"Hali onlayn buyurtmalar yo'q",
// "beginnerReason":"Qanday boshlashni bilmayman","beginnerPlatform":"O'z saytim orqali","storeName":"…","userName":"…",
// "position":"Biznes egasi","city":"Toshkent","phone":"+998…"}
const ROBOSELL_STEPS: readonly StepConfig[] = [
  {
    id: "businessType",
    type: "radio",
    options: [
      { value: "Restoran / Kafe", emoji: "🍽️" },
      { value: "Kiyim do'koni", emoji: "👕" },
      { value: "Electronika do'koni", emoji: "📱" },
      { value: "Oziq-ovqat do'koni", emoji: "🛒" },
      { value: "Dorixona", emoji: "💊" },
      { value: "Gul do'koni", emoji: "💐" },
      { value: "Kosmetika do'koni", emoji: "💄" },
      { value: "Aksessuar do'koni", emoji: "👜" },
      { value: "Qo'llanilgan mahsulot do'koni", emoji: "♻️" },
      OTHER,
    ],
  },
  {
    id: "ordersPerDay",
    type: "radio",
    options: [{ value: "Hali onlayn buyurtmalar yo'q" }, { value: "1 — 10 tagacha" }, { value: "10 — 30" }, { value: "30 — 100" }, { value: "100 dan ortiq" }],
  },
  {
    id: "beginnerReason",
    type: "radio",
    options: [
      { value: "Qanday boshlashni bilmayman" },
      { value: "Juda qimmat deb o'ylayman" },
      { value: "Texnik jihatdan qiyin" },
      { value: "Hozir kuniga vaqt yo'q" },
      { value: "Hozicha ehtiyoj sezmayman" },
      OTHER,
    ],
  },
  {
    id: "beginnerPlatform",
    type: "checkbox",
    options: [
      { value: "Telegram" },
      { value: "Instagram" },
      { value: "Marketpleylar (Uzum, Wildberries va boshqalar)" },
      { value: "O'z saytim orqali" },
      { value: "Hali qaror qilmaganman", exclusive: true },
    ],
  },
  { id: "storeName", type: "text", autoComplete: "organization" },
  { id: "userName", type: "text", autoComplete: "name" },
  {
    id: "position",
    type: "radio",
    options: [{ value: "Biznes egasi" }, { value: "Boshqaruvchi" }, { value: "Marketing mutaxassisi" }, { value: "Administrator" }, OTHER],
  },
  {
    id: "city",
    type: "radio",
    columns: 2,
    options: [
      { value: "Toshkent" },
      { value: "Nukus" },
      { value: "Andijon" },
      { value: "Buxoro" },
      { value: "Fargʻona" },
      { value: "Guliston" },
      { value: "Jizzax" },
      { value: "Qarshi" },
      { value: "Navoi" },
      { value: "Namangan" },
      { value: "Samarqand" },
      { value: "Termiz" },
      { value: "Urganch" },
      OTHER,
    ],
  },
  { id: "phone", type: "phone" },
];

export const FORM_STEPS: Record<FormId, readonly StepConfig[]> = { robohub: ROBOHUB_STEPS, robosell: ROBOSELL_STEPS };

// Manzillar: /application/step-1 … /application/step-N, yuborilgandan keyin — /application/send
export const APPLICATION_PATH = "/application";
export const SEND_SLUG = "send";
export const stepSlug = (index: number) => `step-${index + 1}`;
export const formSlugs = (form: FormId) => [...FORM_STEPS[form].map((_, i) => stepSlug(i)), SEND_SLUG];

/** "step-3" → 2; noto'g'ri bo'lsa -1 */
export function stepIndex(slug: string | undefined, count: number): number {
  const m = /^step-(\d+)$/.exec(slug ?? "");
  const n = m ? Number(m[1]) : 0;
  return n >= 1 && n <= count ? n - 1 : -1;
}

// Javoblar: checkbox — tanlangan value'lar, radio/text — matn, phone — 9 ta mahalliy raqam ("901234567")
export type Answers = Partial<Record<string, string | string[]>>;
// "Boshqa" tanlanganda yozilgan matn — qadam bo'yicha
export type OtherAnswers = Partial<Record<string, string>>;

export const PHONE_DIGITS = 9;
export const TEXT_MIN = 2;

const pickedOther = (step: StepConfig, picked: string[]) => step.options?.some((o) => o.other && picked.includes(o.value));

export function isStepDone(step: StepConfig, answers: Answers, other: OtherAnswers): boolean {
  const v = answers[step.id];
  if (step.type === "checkbox" || step.type === "radio") {
    const picked = Array.isArray(v) ? v : typeof v === "string" && v ? [v] : [];
    if (picked.length === 0) return false;
    return !pickedOther(step, picked) || !!other[step.id]?.trim();
  }
  if (typeof v !== "string") return false;
  if (step.type === "phone") return v.length === PHONE_DIGITS;
  return v.trim().length >= TEXT_MIN;
}

// CRM'ga ketadigan ko'rinish — namunaviy payload bilan bir xil: ko'p javob vergul bilan, "Boshqa" o'rniga yozilgan matn,
// telefon "+998901234567"
export function toFormData(steps: readonly StepConfig[], answers: Answers, other: OtherAnswers): Record<string, string> {
  const out: Record<string, string> = {};
  for (const step of steps) {
    const v = answers[step.id];
    const label = (x: string) => (step.options?.find((o) => o.value === x)?.other ? other[step.id]?.trim() || x : x);
    if (step.type === "phone") out[step.id] = `+998${typeof v === "string" ? v : ""}`;
    else if (Array.isArray(v)) out[step.id] = v.map(label).join(", ");
    else out[step.id] = typeof v === "string" ? label(v.trim()) : "";
  }
  return out;
}
