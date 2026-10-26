// Ariza formalari (/application/step-N, Robohub va Robosell) → https://robo.uz/api/submit-form → amoCRM lead.
// Brauzer robo.uz'ga to'g'ridan-to'g'ri yubora olmaydi (CORS sarlavhalari yo'q), shuning uchun so'rov shu server orqali o'tadi.
// So'rov va javob — robo.uz bilan bir xil: { form_data: [{ …maydonlar }] } → { success, message, data: { _embedded: { leads: [{ id }] } } }.
// Maydonlar — ikki formadan biriniki (FORMS, components/application/steps.ts bilan bir xil); boshqa kalitlar tashlab yuboriladi.
// Kiritma tekshiriladi va qisqartiriladi; "website" — botlar uchun yashirin tuzoq maydon (to'ldirilsa — jim o'tkaziladi).

const API_URL = "https://robo.uz/api/submit-form";

const FORMS = [
  ["whichMarketplaces", "productCount", "salesModel", "marketplaceProblems", "storeName", "phone"], // Robohub
  ["businessType", "ordersPerDay", "beginnerReason", "beginnerPlatform", "storeName", "userName", "position", "city", "phone"], // Robosell
] as const;

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: { form_data?: unknown; website?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "bad_json" }, { status: 400 });
  }
  if (clean(body.website, 200)) return Response.json({ ok: true }); // bot

  const raw = Array.isArray(body.form_data) ? (body.form_data[0] as Record<string, unknown> | undefined) : undefined;
  // Qaysi forma ekani — birinchi o'ziga xos maydondan (whichMarketplaces / businessType)
  const fields = FORMS.find((f) => clean(raw?.[f[0]], 500));
  const form: Record<string, string> = {};
  for (const f of fields ?? []) form[f] = clean(raw?.[f], 500);
  if (!fields || fields.some((f) => !form[f]) || !/^\+998\d{9}$/.test(form.phone)) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ form_data: [form] }),
      cache: "no-store",
    });
    const data = (await res.json().catch(() => null)) as { success?: boolean; data?: { _embedded?: { leads?: { id?: number }[] } } } | null;
    if (!res.ok || !data?.success) return Response.json({ ok: false, error: "crm" }, { status: 502 });
    return Response.json({ ok: true, id: data.data?._embedded?.leads?.[0]?.id ?? null });
  } catch {
    return Response.json({ ok: false, error: "network" }, { status: 502 });
  }
}
