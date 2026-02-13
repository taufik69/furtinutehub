"use client";

import CategoryCard from "../commonComponents/CategoryCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useRef } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CategoryCardProps } from "@/types/types";

export default function ShopByCategorySwipper({
  categories,
}: {
  categories: CategoryCardProps[];
}) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="relative pt-12 sm:pt-16  bg-colorBody">
      {/* Custom Navigation Buttons */}
      <button
        ref={prevRef}
        className="absolute left-[-4%] top-1/2 -translate-y-1/2 z-10 bg-colorBtnPrimaryDim text-colorBtnPrimaryText w-10 h-10 flex items-center justify-center rounded-full hover:bg-colorBtnPrimaryDim/90 hover:scale-110 transition-all duration-300  cursor-pointer"
      >
        ←
      </button>

      <button
        ref={nextRef}
        className="absolute right-[-5%] top-1/2 -translate-y-1/2 z-10 bg-colorBtnPrimaryDim text-colorBtnPrimaryText w-10 h-10 flex items-center justify-center rounded-full hover:bg-colorBtnPrimaryDim/90 hover:scale-110 transition-all duration-300  cursor-pointer"
      >
        →
      </button>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        onBeforeInit={(swiper) => {
          if (typeof swiper.params.navigation !== "boolean") {
            swiper.params.navigation!.prevEl = prevRef.current;
            swiper.params.navigation!.nextEl = nextRef.current;
          }
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <CategoryCard
              title={category.title}
              imageUrl={category.imageUrl}
              href={category.href}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Position */}
      <div className="custom-pagination  mt-8 flex justify-center"></div>
    </section>
  );
}
