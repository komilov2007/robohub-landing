// Tovar toifalari va ularning rasmlari (public/categories/*.webp). Nomlari — market.i18n.ts da (img boʻyicha).
// Rasmlar jamoat mulki (CC0) — Openverse orqali topilgan; `source` — asl sahifa (kelib chiqishini tekshirish uchun).
export const CATEGORIES = [
  { img: "clothing", source: "https://stocksnap.io/photo/clothes-shirts-DDAA823B04" },
  { img: "shoes", source: "https://stocksnap.io/photo/sneakers-shoes-U20YIXFQBC" },
  { img: "electronics", source: "https://www.flickr.com/photos/57866029@N00/52459692877" },
  { img: "beauty", source: "https://stocksnap.io/photo/beauty-makeup-34MSYVUYS0" },
  { img: "home", source: "https://stocksnap.io/photo/house-interior-XCOZ3XTV7M" },
  { img: "kids", source: "https://stocksnap.io/photo/people-kid-PBHFF6RJPH" },
  { img: "accessories", source: "https://www.rawpixel.com/image/6113181/photo-image-background-public-domain-fashion" },
  { img: "sport", source: "https://stocksnap.io/photo/weights-dumbbells-QP7WI19WFG" },
  { img: "food", source: "https://www.rawpixel.com/image/5927583/photo-image-public-domain-plant-fruit" },
  { img: "auto", source: "https://www.rawpixel.com/image/5927404/photo-image-light-public-domain-logo" },
  { img: "health", source: "https://www.rawpixel.com/image/5969430/medicine-pills" },
  { img: "books", source: "https://www.rawpixel.com/image/3298137/free-photo-image-book-bookcase-cc0" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["img"];
