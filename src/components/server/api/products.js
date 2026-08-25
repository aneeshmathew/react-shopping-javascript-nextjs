// Platzi Fake Store API (docs: https://fakeapi.platzi.com, live host below).
// Swapped in after fakestoreapi.com turned out to be behind a Cloudflare bot
// challenge that blocks Vercel's server-side requests (returns a "Just a
// moment..." HTML page instead of JSON).
const BASE_URL = "https://api.escuelajs.co/api/v1";

const DEFAULT_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  Accept: "application/json",
};

async function throwWithDetail(res, label) {
  const body = await res.text().catch(() => "");
  throw new Error(
    `${label}: HTTP ${res.status} ${res.statusText}${body ? ` — ${body.slice(0, 200)}` : ""}`
  );
}

async function apiFetch(path, { revalidate } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: DEFAULT_HEADERS,
    next: revalidate ? { revalidate } : undefined,
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) await throwWithDetail(res, `Failed to fetch ${path}`);
  return res.json();
}

// Platzi's seed data occasionally stores an image entry as a
// JSON-stringified array or with stray quotes/brackets
// (e.g. `["https://picsum.photos/..."]` as a literal string). Pull the
// first real-looking URL out of whatever we got back.
function sanitizeImageUrl(raw) {
  if (!raw) return null;
  const match = String(raw).match(/https?:\/\/[^\s"'\]]+/);
  return match ? match[0] : null;
}

// Deterministic, purely cosmetic "rating" derived from the product id —
// Platzi's API doesn't provide ratings at all, and the existing
// ProductCard/ProductDetail UI expects product.rating.rate/.count.
function fakeRating(id) {
  const seed = Number(id) || 0;
  const rate = Math.round((3.5 + ((seed * 37) % 15) / 10) * 10) / 10; // 3.5–5.0
  const count = 10 + ((seed * 53) % 490); // 10–499
  return { rate: Math.min(rate, 5), count };
}

function normalizeProduct(p) {
  const image =
    sanitizeImageUrl(p.images?.[0]) ||
    sanitizeImageUrl(p.category?.image) ||
    "https://placehold.co/600x400";

  return {
    id: p.id,
    title: p.title,
    price: p.price,
    description: p.description,
    category: p.category?.slug ?? "others",
    image,
    rating: fakeRating(p.id),
  };
}

export async function getProducts(category) {
  const path = category
    ? `/products?categorySlug=${encodeURIComponent(category)}`
    : "/products";
  const data = await apiFetch(path, { revalidate: 3600 });
  return data.map(normalizeProduct);
}

export async function getProduct(id) {
  const p = await apiFetch(`/products/${id}`, { revalidate: 3600 });
  return normalizeProduct(p);
}

export async function getCategories() {
  const data = await apiFetch("/categories", { revalidate: 86400 });
  return data.map((c) => c.slug);
}
