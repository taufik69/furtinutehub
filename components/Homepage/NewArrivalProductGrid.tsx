"use client";

import { useMemo, useState } from "react";
import ProductCard from "../commonComponents/Productcard";

import { ProductCardProps } from "@/types/types";

export default function NewArrivalProductGrid({
  newArrivalData,
}: {
  newArrivalData: ProductCardProps[];
}) {
  const STEP = 8;
  const [visibleCount, setVisibleCount] = useState(STEP);

  const visibleProducts = useMemo(
    () => newArrivalData.slice(0, visibleCount),
    [visibleCount],
  );

  const hasMore = visibleCount < newArrivalData.length;
  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + STEP, newArrivalData.length));
  };

  const handleViewLess = () => {
    setVisibleCount(STEP);

    window.scrollTo({ top: 3000, behavior: "smooth" });
  };
  return (
    <div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {visibleProducts.map((product) => (
          <div key={product.id}>
            <ProductCard key={product.id} {...product} />
          </div>
        ))}
      </div>

      {/* View More / View Less */}
      <div className="text-center mt-12 flex items-center justify-center gap-4">
        {hasMore ? (
          <button
            onClick={handleViewMore}
            className="bg-colorBtnPrimary hover:bg-colorBtnPrimaryDim text-colorBtnPrimaryText px-8 py-3 rounded font-medium transition-colors duration-200"
          >
            View More
          </button>
        ) : (
          <button
            onClick={handleViewLess}
            className="bg-colorBtnPrimary hover:bg-colorBtnPrimaryDim text-colorBtnPrimaryText px-8 py-3 rounded font-medium transition-colors duration-200"
          >
            View Less
          </button>
        )}
      </div>
    </div>
  );
}
