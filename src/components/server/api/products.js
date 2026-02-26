const BASE_URL = "https://fakestoreapi.com";

export async function getProducts(category) {
  const url = category
    ? `${BASE_URL}/products/category/${encodeURIComponent(category)}`
    : `${BASE_URL}/products`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProduct(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Failed to fetch product ${id}`);
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/products/categories`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}
