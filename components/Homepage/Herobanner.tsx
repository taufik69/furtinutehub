"use client";

import { Banner } from "@/app/api/api";
import HeroBgClient from "./HeroBgClient";
import HeroContentClient from "./HeroContentClient";
import { useState, useEffect } from "react";

// Fallback static data if no banners from API
const FALLBACK_BANNERS: Banner[] = [
  { title: "Modern Furniture", imageUrl: "/images/cover.webp" },
  { title: "Elegant Design", imageUrl: "/images/cover2.webp" },
  { title: "Comfort Living", imageUrl: "/images/cover3.webp" },
];

interface HeroBannerProps {
  banners?: Banner[];
  title?: string;
  images?: string[]; // Backward compatibility
}

export default function HeroBanner({ banners, title, images }: HeroBannerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Handle different prop combinations
  let bannerList: Banner[] = [];
  
  if (banners && banners.length > 0) {
    bannerList = banners;
  } else if (images && images.length > 0) {
    bannerList = images.map(img => ({ title: title || "Modern Furniture", imageUrl: img }));
  } else {
    bannerList = FALLBACK_BANNERS;
  }

  const imageUrls = bannerList.map(b => b.imageUrl);
  const displayTitle = title || bannerList[activeIndex]?.title || "Modern Furniture";

  // Synchronize index with the interval if needed, 
  // but HeroBgClient already has its own interval. 
  // To keep them perfectly synced, we should ideally manage the interval here.

  useEffect(() => {
    if (bannerList.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % bannerList.length);
    }, 9000); // Matching the 9s interval in HeroBgClient

    return () => clearInterval(interval);
  }, [bannerList.length]);

  return (
    <div className="relative w-full">
      <div className="relative h-[75vh] w-full overflow-hidden">
        {/* Background Zoom (Client) */}
        {/* We pass the active index to HeroBgClient to force sync if we modify it, 
            or we let it run its own logic if it's identical. 
            However, for perfect title sync, HeroBanner should control the index. */}
        <HeroBgClient images={imageUrls} externalIndex={activeIndex} />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content animation (Client) */}
        <HeroContentClient title={displayTitle} key={activeIndex} />
      </div>
    </div>
  );
}
