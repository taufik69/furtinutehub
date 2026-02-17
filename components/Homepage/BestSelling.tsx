import React, { Suspense } from "react";

import SellingProductGrid from "./SellingProductGrid";

const BestSelling = () => {
  return (
    <section className=" bg-colorBody">
      <div className="container mx-auto px-4 sm:px-6 lg:px-0">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-colorTextBody mb-3 sm:mb-4">
            Best Selling Products
          </h2>
          <p className="text-colorTextBody/70 text-base sm:text-lg max-w-2xl mx-auto">
            Discover our handpicked selection of modern furniture pieces that
            are sure to elevate your living space to new heights
          </p>
        </div>

        {/* Products Grid */}
        <Suspense fallback={<div>Loading...</div>}>
          <SellingProductGrid query="isBestSelling" />
        </Suspense>
      </div>
    </section>
  );
};

export default BestSelling;
