// Ombor/hisob tizimlari va CRM — integratsiyalar bo'limi va /llms.txt uchun umumiy ro'yxat
// logo: public/integrations/ dagi fayl; logotipi yo'q tizim bosh harfi bilan chiqadi
// plate — shaffof fonli logotip (to'q fonda xira ko'rinadi): oq plitka ustida chiqadi
export type System = { name: string; logo?: string; plate?: boolean };
export const STOCK: System[] = [
  { name: "МойСклад", logo: "/integrations/moysklad.svg" },
  { name: "BILLZ", logo: "/integrations/billz.svg" },
  { name: "ERA", logo: "/integrations/era.svg" },
  { name: "Smartup", logo: "/integrations/smartup.svg" },
  { name: "YesPOS", logo: "/integrations/yespos.svg" },
  { name: "Bito", logo: "/integrations/bito.svg" },
  { name: "Sales Doctor", logo: "/integrations/sales-doctor.svg" },
  { name: "Apicore", logo: "/integrations/apicore-logo.svg", plate: true },
];
export const CRM: System[] = [{ name: "Retail CRM", logo: "/integrations/retail-crm.svg" }];

