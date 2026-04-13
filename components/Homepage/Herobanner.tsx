"use client";
import { Banner } from "@/app/api/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

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
                quality={80}
                sizes="100vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

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
