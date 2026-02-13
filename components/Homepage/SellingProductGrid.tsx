"use client";

import { useMemo, useState } from "react";
import ProductCard from "../commonComponents/Productcard";

const products = [
  {
    id: 1,
    name: "Legacy",
    description: "Wooden King Bed | BDH-301-3-1-20",
    image: "/bestselling/bed1.jpg",
    price: 39900,
    originalPrice: 42000,
    discount: 5,
    tags: ["new", "sale"],
    slug: "legacy-wooden-king-bed",
  },
  {
    id: 2,
    name: "Modern Sofa",
    description: "3-Seater Fabric Sofa | SOF-201-2-1",
    image: "/bestselling/bed2.jpg",
    price: 65000,
    originalPrice: 75000,
    discount: 13,
    tags: ["hot"],
    slug: "modern-fabric-sofa",
  },
  {
    id: 3,
    name: "Executive Desk",
    description: "Wooden Office Desk | DSK-401-1-5",
    image: "/bestselling/bed3.jpg",
    price: 28500,
    tags: ["new"],
    slug: "executive-wooden-desk",
  },
  {
    id: 4,
    name: "Dining Set",
    description: "6-Seater Dining Table | DIN-501-3-2",
    image: "/bestselling/bookself.jpg",
    price: 45000,
    originalPrice: 52000,
    discount: 13,
    tags: ["limited"],
    slug: "dining-set-6-seater",
  },
  {
    id: 5,
    name: "Accent Chair",
    description: "Velvet Lounge Chair | CHR-301-4-8",
    image: "/bestselling/cornar.jpg",
    price: 18900,
    tags: ["new"],
    slug: "velvet-accent-chair",
  },
  {
    id: 6,
    name: "Storage Cabinet",
    description: "Modern Storage Unit | CAB-201-2-3",
    image: "/bestselling/smallbed1.jpg",
    price: 32000,
    originalPrice: 38000,
    discount: 16,
    tags: ["sale"],
    slug: "modern-storage-cabinet",
  },
  {
    id: 7,
    name: "Coffee Table",
    description: "Marble Top Coffee Table | TBL-101-1-9",
    image: "/bestselling/smallbed2.jpg",
    price: 15500,
    slug: "marble-coffee-table",
  },
  {
    id: 8,
    name: "Bookshelf",
    description: "5-Tier Open Bookshelf | SHF-401-3-6",
    image: "/bestselling/bookself.jpg",
    price: 22000,
    originalPrice: 26000,
    discount: 15,
    tags: ["hot", "sale"],
    slug: "modern-bookshelf",
  },
  {
    id: 9,
    name: "Legacy",
    description: "Wooden King Bed | BDH-301-3-1-20",
    image: "/bestselling/bed1.jpg",
    price: 39900,
    originalPrice: 42000,
    discount: 5,
    tags: ["new", "sale"],
    slug: "legacy-wooden-king-bed",
  },
  {
    id: 10,
    name: "Modern Sofa",
    description: "3-Seater Fabric Sofa | SOF-201-2-1",
    image: "/bestselling/bed2.jpg",
    price: 65000,
    originalPrice: 75000,
    discount: 13,
    tags: ["hot"],
    slug: "modern-fabric-sofa",
  },
  {
    id: 11,
    name: "Executive Desk",
    description: "Wooden Office Desk | DSK-401-1-5",
    image: "/bestselling/bed3.jpg",
    price: 28500,
    tags: ["new"],
    slug: "executive-wooden-desk",
  },
  {
    id: 12,
    name: "Dining Set",
    description: "6-Seater Dining Table | DIN-501-3-2",
    image: "/bestselling/bookself.jpg",
    price: 45000,
    originalPrice: 52000,
    discount: 13,
    tags: ["limited"],
    slug: "dining-set-6-seater",
  },
  {
    id: 13,
    name: "Accent Chair",
    description: "Velvet Lounge Chair | CHR-301-4-8",
    image: "/bestselling/cornar.jpg",
    price: 18900,
    tags: ["new"],
    slug: "velvet-accent-chair",
  },
];

export default function SellingProductGrid() {
  const STEP = 8;
  const [visibleCount, setVisibleCount] = useState(STEP);

  const visibleProducts = useMemo(
    () => products.slice(0, visibleCount),
    [visibleCount],
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
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
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
