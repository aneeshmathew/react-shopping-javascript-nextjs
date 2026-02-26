import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/components/server/api/products";
import ProductDetail from "@/components/server/product/ProductDetail";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: String(p.id) }));
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const productId = Number(id);

  if (isNaN(productId)) notFound();

  const product = await getProduct(productId).catch(() => null);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
