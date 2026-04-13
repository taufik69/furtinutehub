"use client";

import { Banner } from "@/app/api/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  // Handle different prop combinations
  let bannerList: Banner[] = [];
  
  if (banners && banners.length > 0) {
    bannerList = banners;
  } else if (images && images.length > 0) {
    bannerList = images.map(img => ({ title: title || "Modern Furniture", imageUrl: img }));
  } else {
    bannerList = FALLBACK_BANNERS;
  }

  return (
    <div className="relative w-full h-[50vh] md:h-[85vh] group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        onSwiper={(swiper) => {
          // Force navigation refresh
          if (typeof swiper.params.navigation !== "boolean") {
            const nav = swiper.params.navigation!;
            nav.prevEl = prevRef.current;
            nav.nextEl = nextRef.current;
            swiper.navigation.destroy();
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{ 
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active !bg-white",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={bannerList.length > 1}
        className="h-full w-full"
      >
        {bannerList.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <Image
                src={banner.imageUrl}
                alt={banner.title || `Banner ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover"
                quality={100}
                sizes="100vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        ref={prevRef}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        ref={nextRef}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Custom Global Styles for Pagination */}
      <style dangerouslySetInnerHTML={{ __html: `
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5) !important;
          width: 10px !important;
          height: 10px !important;
          opacity: 1 !important;
        }
        .swiper-pagination-bullet-active {
          background: white !important;
          width: 24px !important;
          border-radius: 5px !important;
        }
      `}} />
    </div>
  );
}
