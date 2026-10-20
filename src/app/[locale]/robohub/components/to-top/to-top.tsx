import { getMessages } from "@/i18n/server";
import { messages } from "./to-top.i18n";
import ToTopClient from "./to-top-client";

// "Tepaga" tugmasi: o'ng pastki burchakda, sahifa biroz pastga aylantirilgach chiqadi
export default async function ToTop() {
  const t = await getMessages(messages);
  return <ToTopClient label={t.label} />;
}
