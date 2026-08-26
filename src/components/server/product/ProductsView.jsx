import { Suspense } from "react";
import ProductList from "./ProductList";
import ProductFilters from "@/components/client/product/ProductFilters";
import SearchBar from "@/components/client/product/SearchBar";
import { formatCategoryLabel } from "@/lib/formatCategoryLabel";

export default function ProductsView({
  categories,
  category,
  q,
  minPrice,
  maxPrice,
  minRating,
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            {q ? (
              <>Results for &ldquo;{q}&rdquo;</>
            ) : category ? (
              formatCategoryLabel(category)
            ) : (
              "All Products"
            )}
          </h1>
          <p className="text-gray-500 text-sm">
            Discover our curated collection of products
          </p>
        </div>
        <SearchBar initialQuery={q ?? ""} />
      </div>

      <div className="mb-8">
        <Suspense fallback={null}>
          <ProductFilters
            categories={categories}
            selectedCategory={category}
            minPrice={minPrice}
            maxPrice={maxPrice}
            minRating={minRating}
          />
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
        <ProductList
          category={category}
          q={q}
          minPrice={minPrice}
          maxPrice={maxPrice}
          minRating={minRating}
        />
      </Suspense>
    </div>
  );
}
