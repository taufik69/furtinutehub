"use client";

import { useEffect, useMemo, useState } from "react";
// import ProductCard from "../commonComponents/Productcard";
import { getBestSelling } from "@/app/api/api";
import CollectionProductCard from "../commonComponents/Productcardupdated";
import ProductCard from "../commonComponents/Productcard";

export default function SellingProductGrid() {
  const STEP = 8;

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(STEP);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      try {
        const data = await getBestSelling();
        if (mounted) setProducts(Array.isArray(data) ? data : []);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const visibleProducts = useMemo(
    () => products.slice(0, visibleCount),
    [products, visibleCount],
  );

  const hasMore = visibleCount < products.length;

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + STEP, products.length));
  };

  const handleViewLess = () => {
    setVisibleCount(STEP);
    window.scrollTo({ top: 1400, behavior: "smooth" });
  };

  return (
    <div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {loading
          ? Array.from({ length: STEP }).map((_, i) => (
              <div key={i} className="h-72 rounded bg-gray-200 animate-pulse" />
            ))
          : visibleProducts.map((product: any) => (
              <div key={product._id || product.id || product.slug}>
                <ProductCard product={product} />
              </div>
            ))}
      </div>

      {/* View More / View Less */}
      <div className="text-center mt-12 flex items-center justify-center gap-4">
        {!loading && products.length > 0 ? (
          hasMore ? (
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
          )
        ) : null}
      </div>
    </div>
  );
}
