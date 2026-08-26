"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { formatCategoryLabel } from "@/lib/formatCategoryLabel";

export default function CategoryFilter({ categories, selected }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (category) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) params.set("category", category);
    else params.delete("category");
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleChange("")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
          !selected
            ? "bg-indigo-600 text-white border-indigo-600"
            : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleChange(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
            selected === cat
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
          }`}
        >
          {formatCategoryLabel(cat)}
        </button>
      ))}
    </div>
  );
}
