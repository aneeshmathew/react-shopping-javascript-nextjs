import { getCategories } from "@/components/server/api/products";
import ProductsView from "@/components/server/product/ProductsView";

export default async function HomePage({ searchParams }) {
  const { category } = await searchParams;
  const categories = await getCategories();

  return <ProductsView categories={categories} category={category} />;
}
