import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/components/server/api/products";
import ProductDetail from "@/components/server/product/ProductDetail";

export async function generateStaticParams() {
  // fakestoreapi.com is known to be flaky/intermittently down. If it fails
  // during the Vercel build, don't let that take down the whole deployment —
  // fall back to rendering these pages on-demand at request time instead
  // (dynamicParams defaults to true, and the page component below already
  // handles a failed fetch gracefully via .catch(() => null)).
  try {
    const products = await getProducts();
    return products.map((p) => ({ id: String(p.id) }));
  } catch (err) {
    console.error("generateStaticParams: failed to fetch products, falling back to on-demand rendering", err);
    return [];
  }
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const productId = Number(id);

  if (isNaN(productId)) notFound();

  const product = await getProduct(productId).catch(() => null);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
