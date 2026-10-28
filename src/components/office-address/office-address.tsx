import ContactIcon from "@/components/contact-icon/contact-icon";
import { getLocale } from "@/i18n/server";
import { OFFICE_ADDRESS, OFFICE_MAP_URL } from "@/lib/contacts";

// Footer "Aloqa" ro'yxatidagi ofis manzili (joriy tilda) — bosilsa Yandex xaritada yangi oynada ochiladi.
// Barcha footerlarda ro'yxatning oxirgi bandi: <ul> ichiga qo'yiladi, uslubi o'sha ro'yxatnikidan (li > a > svg).
export default async function OfficeAddress() {
  const locale = await getLocale();
  return (
    <li>
      <a href={OFFICE_MAP_URL} target="_blank" rel="noopener">
        <ContactIcon name="location" />
        {OFFICE_ADDRESS[locale]}
      </a>
    </li>
  );
}
