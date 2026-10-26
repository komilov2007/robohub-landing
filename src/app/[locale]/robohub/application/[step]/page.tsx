import { formSlugs } from "@/components/application/steps";

// Qadam sahifasi — bo'sh: forma layout'da turadi va qadamni URL'dan o'qiydi (useParams).
// step-1 … step-N va send oldindan statik yig'iladi; boshqa manzil ochilsa forma birinchi qadamga o'tkazadi.
export function generateStaticParams() {
  return formSlugs("robohub").map((step) => ({ step }));
}

export default function ApplicationStep() {
  return null;
}
