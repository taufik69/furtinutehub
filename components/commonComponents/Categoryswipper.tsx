"use client";

import CategoryCard from "../commonComponents/CategoryCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CategoryType } from "@/types/types";

export default function ShopByCategorySwipper({
  categories,
}: {
  categories: CategoryType[];
}) {
  return (
    <section className="relative pt-12 sm:pt-16 bg-colorBody">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
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
        spaceBetween={12}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
        }}
      >
        {categories.map((category: CategoryType) => (
          <SwiperSlide key={category.id}>
            <CategoryCard
              title={category?.name}
              imageUrl={category?.image?.url}
              href={category?.id || ""}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Position */}
      <div className="custom-pagination  mt-8 flex justify-center"></div>
    </section>
  );
}
