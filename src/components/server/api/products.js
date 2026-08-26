// DummyJSON (docs: https://dummyjson.com/docs/products). Swapped in after
// fakestoreapi.com blocked Vercel behind a Cloudflare challenge, and Platzi's
// Fake Store API turned out to be a shared, publicly-writable dataset full of
// years of other developers' test/junk products and categories.
// DummyJSON's write endpoints are simulated only (nothing is ever persisted
// to the shared dataset), so its catalog stays clean.
const BASE_URL = "https://dummyjson.com";

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

// Turns a category slug like "home-decoration" into "Home Decoration" for
// display, while the slug itself keeps being used for filtering/URLs.
export { formatCategoryLabel } from "@/lib/formatCategoryLabel";

function normalizeProduct(p) {
  return {
    id: p.id,
    title: p.title,
    price: p.price,
    description: p.description,
    category: p.category,
    image: p.thumbnail || p.images?.[0] || "https://placehold.co/600x400",
    rating: {
      rate:
        typeof p.rating === "number"
          ? Math.round(p.rating * 10) / 10
          : (p.rating?.rate ?? 4.5),
      count: Array.isArray(p.reviews) ? p.reviews.length : 0,
    },
  };
}

export async function getProducts(category) {
  const path = category
    ? `/products/category/${encodeURIComponent(category)}?limit=100`
    : "/products?limit=100";
  const data = await apiFetch(path, { revalidate: 3600 });
  return (data.products ?? []).map(normalizeProduct);
}

export async function getProduct(id) {
  const p = await apiFetch(`/products/${id}`, { revalidate: 3600 });
  return normalizeProduct(p);
}

export async function getCategories() {
  const data = await apiFetch("/products/categories", { revalidate: 86400 });
  // DummyJSON has returned either plain slug strings or {slug, name, url}
  // objects depending on version — handle both.
  return data.map((c) => (typeof c === "string" ? c : c.slug));
}
