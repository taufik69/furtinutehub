import HeroBanner from "@/components/Homepage/Herobanner";
import FromVisionToSpace from "@/components/studio/Fromvisiontospace";
import OurProcess from "@/components/studio/Ourprocess";
import TransformingCorporateSpaces from "@/components/studio/Transformingcorporatespaces";
import WhatWeDo from "@/components/studio/Whatwedo";
import React from "react";

const FurnitureStudio = () => {
  return (
    <div>
      <HeroBanner title="About Us" />
      <WhatWeDo />
      <OurProcess />
      <FromVisionToSpace />
      <TransformingCorporateSpaces />
    </div>
  );
};

export default FurnitureStudio;
