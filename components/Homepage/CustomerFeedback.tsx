"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { testimonials } from "@/data/data";

type Testimonial = {
  id: number;
  rating: number;
  text: string;
  name: string;
  title: string;
  avatar: string;
};

export default function CustomerFeedback() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  // ✅ mobile এ navigation off
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)"); // < md
    const update = () => setIsMobile(mq.matches);

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-colorBody">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-block">
            <span className="text-xs sm:text-sm font-semibold text-colorTextBody/60 uppercase tracking-widest mb-3 block">
              Testimonials
            </span>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-colorTextBody mb-4">
              Don&apos;t take our word for it
            </h2>

            <div className="w-16 sm:w-24 h-1 bg-colorBtnPrimary mx-auto rounded-full" />
          </div>

          <p className="text-colorTextBody/70 mt-4 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
            Hear what our happy customers have to say about their experience
            with us
          </p>
        </div>

        {/* Custom Navigation Buttons (hidden on mobile) */}
        <button
          ref={prevRef}
          aria-label="Previous testimonial"
          className="
            hidden md:flex
            absolute left-2 lg:left-[-4%] top-[70%] -translate-y-1/2 z-10
            bg-colorBtnPrimary/80 hover:bg-colorBtnPrimary
            text-colorBtnPrimaryText w-11 h-11 lg:w-12 lg:h-12
            items-center justify-center rounded-full
            backdrop-blur-sm transition-all duration-300 shadow-lg
          "
        >
          <svg
            className="w-5 h-5 lg:w-6 lg:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          ref={nextRef}
          aria-label="Next testimonial"
          className="
            hidden md:flex
            absolute right-2 lg:right-[-4%] top-[70%] -translate-y-1/2 z-10
            bg-colorBtnPrimary/80 hover:bg-colorBtnPrimary
            text-colorBtnPrimaryText w-11 h-11 lg:w-12 lg:h-12
            items-center justify-center rounded-full
            backdrop-blur-sm transition-all duration-300 shadow-lg
          "
        >
          <svg
            className="w-5 h-5 lg:w-6 lg:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          // ✅ mobile এ navigation off, অন্যথায় custom refs দিয়ে on
          navigation={
            isMobile
              ? false
              : {
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }
          }
          onInit={(swiper) => {
            if (isMobile) return;

            // custom refs attach
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;

            swiper.navigation.init();
            swiper.navigation.update();
          }}
          pagination={{
            clickable: true,
            el: ".testimonial-pagination",
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 18 },
            768: { slidesPerView: 2, spaceBetween: 22 },
            1024: { slidesPerView: 3, spaceBetween: 28 },
          }}
          className="pb-12 sm:pb-14"
        >
          {testimonials.map((t: Testimonial) => (
            <SwiperSlide key={t.id}>
              <div className="bg-colorBodyDim/20 rounded-xl p-5 sm:p-6 lg:p-8 shadow h-full flex flex-col">
                {/* Rating */}
                <div className="flex gap-1 mb-4 justify-center">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        index < t.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Text */}
                <p className="text-colorTextBody text-sm sm:text-base leading-relaxed mb-6 grow text-center">
                  “{t.text}”
                </p>

                {/* Customer */}
                <div className="flex flex-col items-center gap-3 mt-auto">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden ring-2 ring-colorBorder shadow-md">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      sizes="(max-width: 640px) 56px, (max-width: 1024px) 64px, 72px"
                      className="object-cover"
                    />
                  </div>

                  <div className="text-center">
                    <h4 className="font-semibold text-colorTextBody text-sm sm:text-base">
                      {t.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-colorTextBody/70">
                      {t.title}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination */}
        <div className="testimonial-pagination flex justify-center mt-4 sm:mt-6" />
      </div>
    </section>
  );
}
