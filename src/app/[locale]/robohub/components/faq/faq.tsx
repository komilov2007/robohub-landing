import { getMessages } from "@/i18n/server";
import FaqClient from "./faq-client";
import { messages } from "./faq.i18n";

// Server qismi: joriy tildagi matnlarni oladi va holatli (client) qismga uzatadi
export default async function Faq() {
  const t = await getMessages(messages);
  return <FaqClient t={t} />;
}
