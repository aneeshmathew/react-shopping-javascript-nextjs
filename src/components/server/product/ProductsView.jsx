import { Suspense } from "react";
import ProductList from "./ProductList";
import CategoryFilter from "@/components/client/product/CategoryFilter";

export default function ProductsView({ categories, category }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">
          {category ? (
            <span className="capitalize">{category}</span>
          ) : (
            "All Products"
          )}
        </h1>
        <p className="text-gray-500 text-sm">
          Discover our curated collection of products
        </p>
      </div>

      <div className="mb-8">
        <Suspense fallback={null}>
          <CategoryFilter categories={categories} selected={category} />
        </Suspense>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 h-80 animate-pulse"
              />
            ))}
          </div>
        }
      >
        <ProductList category={category} />
      </Suspense>
    </div>
  );
}
