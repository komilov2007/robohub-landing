// Landing arizalari → Telegram guruhi. Bot tokeni faqat serverda (.env.local: TELEGRAM_LEAD_BOT_TOKEN,
// TELEGRAM_LEAD_CHAT_ID) — brauzerga hech qachon chiqmaydi. Hozircha Robosell "Savolingiz qoldimi?" formasi ishlatadi.
// Kiritma tekshiriladi va qisqartiriladi; "website" — botlar uchun yashirin tuzoq maydon (to'ldirilsa — jim o'tkaziladi).

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max) : "";

// Toshkent vaqti: "2026-10-21 16:34"
function tashkentNow(): string {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Tashkent",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
      .formatToParts(new Date())
      .map((x) => [x.type, x.value]),
  );
  return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}`;
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_LEAD_BOT_TOKEN;
  const chat = process.env.TELEGRAM_LEAD_CHAT_ID;
  if (!token || !chat) return Response.json({ ok: false, error: "not_configured" }, { status: 500 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "bad_json" }, { status: 400 });
  }
  if (clean(body.website, 200)) return Response.json({ ok: true }); // bot

  const name = clean(body.name, 80);
  const company = clean(body.company, 120);
  const phone = clean(body.phone, 32);
  const digits = phone.replace(/\D/g, "");
  if (!name || !company || digits.length < 9 || digits.length > 15) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const text = `Ismi: ${name}\nKompaniya: ${company}\nTelefon: ${phone}\nSana: ${tashkentNow()}`;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text }),
      cache: "no-store",
    });
    const data = (await res.json()) as { ok?: boolean };
    if (!res.ok || !data.ok) return Response.json({ ok: false, error: "telegram" }, { status: 502 });
  } catch {
    return Response.json({ ok: false, error: "network" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
