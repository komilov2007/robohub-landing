import { getMessages } from "@/i18n/server";
import SharhlarClient from "./sharhlar-client";
import { messages } from "./sharhlar.i18n";

// Server qobiq: joriy tildagi matnlarni olib, holatli (client) tabloga prop orqali beradi.
export default async function Sharhlar() {
  const t = await getMessages(messages);
  return <SharhlarClient t={t} />;
}
