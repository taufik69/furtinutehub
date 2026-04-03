import HeroBanner from "@/components/Homepage/Herobanner";
import FromVisionToSpace from "@/components/studio/Fromvisiontospace";
import OurProcess from "@/components/studio/Ourprocess";
import TransformingCorporateSpaces from "@/components/studio/Transformingcorporatespaces";
import WhatWeDo from "@/components/studio/Whatwedo";
import React from "react";
import { getBanners } from "@/app/api/api";

// ── Image paths (local static assets) ────────────────────────────────────────
const ABOUT_DUMMY_IMG = "/images/article-furniture-1.png";

const FurnitureStudio = async () => {
  const banners = await getBanners();

  return (
    <div>
      <HeroBanner title="About Us" images={banners} />
      <WhatWeDo />
      <OurProcess />
      <FromVisionToSpace />
      <TransformingCorporateSpaces />
    </div>
  );
};

export default FurnitureStudio;
