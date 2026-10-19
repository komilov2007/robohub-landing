import { getMessages } from "@/i18n/server";
import ReviewsClient from "./reviews-client";
import { messages } from "./reviews.i18n";

// Server qobiq: joriy tildagi matnlarni olib, holatli (client) tabloga prop orqali beradi.
export default async function Reviews() {
  const t = await getMessages(messages);
  return <ReviewsClient t={t} />;
}
