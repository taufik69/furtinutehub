import ShopPage from "@/components/AllCollection/Shop";
import React, { Suspense } from "react";

const Collection = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ShopPage />
      </Suspense>
    </div>
  );
};

export default Collection;
