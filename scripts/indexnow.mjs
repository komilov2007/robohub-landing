// IndexNow — Bing va Yandex'ga yangi yoki o'zgargan sahifalar haqida darhol xabar berish (TZ "SEO, GEO", 3.4).
// Kalit fayli: public/a5b51812629a0d15bbd3b65a9fead120.txt (https://robohub.uz/<kalit>.txt da ochiq turishi shart).
//
// Ishlatish (deploy'dan keyin, faqat robohub.uz ulanganidan so'ng):
//   node scripts/indexnow.mjs                         — sitemap.xml dagi barcha manzillar
//   node scripts/indexnow.mjs /academy/order /ru      — faqat berilgan sahifalar (masalan, yangi Academy darsi)
const HOST = "robohub.uz";
const ORIGIN = `https://${HOST}`;
const KEY = "a5b51812629a0d15bbd3b65a9fead120";

async function sitemapUrls() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml: HTTP ${res.status}`);
  return [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const args = process.argv.slice(2);
const urls = args.length ? args.map((p) => (p.startsWith("http") ? p : ORIGIN + p)) : await sitemapUrls();

// IndexNow bitta so'rovda 10 000 tagacha manzil qabul qiladi
for (let i = 0; i < urls.length; i += 10000) {
  const urlList = urls.slice(i, i + 10000);
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList }),
  });
  console.log(`IndexNow: ${urlList.length} ta manzil → HTTP ${res.status}`);
}
