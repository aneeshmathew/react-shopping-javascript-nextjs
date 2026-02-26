import { getProducts } from "@/components/server/api/products";
import ProductCard from "./ProductCard";

export default async function ProductList({ category }) {
  const products = await getProducts(category);

  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No products found in this category.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
