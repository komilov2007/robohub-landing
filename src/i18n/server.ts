import { locale } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale, type Locale, type Messages } from "./config";

// Joriy til — app/[locale] root parametridan. Faqat server komponentlarda ishlaydi;
// client komponentga kerakli matnlar prop orqali uzatiladi.
export async function getLocale(): Promise<Locale> {
  const value = await locale();
  if (!hasLocale(value)) notFound();
  return value;
}

// Komponentning o'z tarjimalaridan joriy tildagisini qaytaradi: const t = await getMessages(messages)
export async function getMessages<T>(messages: Messages<T>): Promise<T> {
  return messages[await getLocale()];
}
