import { getCategories } from "@/components/server/api/products";
import ProductsView from "@/components/server/product/ProductsView";

export default async function HomePage({ searchParams }) {
  const { category, q, minPrice, maxPrice, minRating } = await searchParams;
  const categories = await getCategories().catch(() => []);

  return (
    <ProductsView
      categories={categories}
      category={category}
      q={q}
      minPrice={minPrice}
      maxPrice={maxPrice}
      minRating={minRating}
    />
  );
}
