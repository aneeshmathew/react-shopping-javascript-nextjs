const BASE_URL = "https://fakestoreapi.com";

// fakestoreapi.com sits behind Cloudflare and appears to challenge/block
// requests that don't look like they came from a real browser — Node's
// default fetch() sends no User-Agent at all, which trips this on Vercel's
// datacenter IPs even though it works fine from a local dev machine.
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

export async function getProducts(category) {
  const url = category
    ? `${BASE_URL}/products/category/${encodeURIComponent(category)}`
    : `${BASE_URL}/products`;

  const res = await fetch(url, {
    headers: DEFAULT_HEADERS,
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) await throwWithDetail(res, "Failed to fetch products");
  return res.json();
}

export async function getProduct(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    headers: DEFAULT_HEADERS,
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) await throwWithDetail(res, `Failed to fetch product ${id}`);
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/products/categories`, {
    headers: DEFAULT_HEADERS,
    next: { revalidate: 86400 },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) await throwWithDetail(res, "Failed to fetch categories");
  return res.json();
}
