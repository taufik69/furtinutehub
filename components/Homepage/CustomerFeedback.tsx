"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useRef } from "react";
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

  return (
    <section className="relative py-16 sm:py-20 bg-colorBody">
      <div className="container mx-auto px-4">
        {/* Beautiful Heading Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block">
            <span className="text-sm font-semibold text-colorTextBody/60 uppercase tracking-widest mb-3 block">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-colorTextBody mb-4">
              Don't take our word for it
            </h2>
            <div className="w-24 h-1 bg-colorBtnPrimary mx-auto rounded-full"></div>
          </div>
          <p className="text-colorTextBody/70 mt-6 max-w-2xl mx-auto text-base sm:text-lg">
            Hear what our happy customers have to say about their experience
            with us
          </p>
        </div>

        {/* Custom Navigation Buttons */}
        <button
          ref={prevRef}
          className="absolute left-[5%] top-[63%] -translate-y-1/2 z-10 bg-colorBtnPrimary/80 hover:bg-colorBtnPrimary text-colorBtnPrimaryText w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300 cursor-pointer shadow-lg"
        >
          <svg
            className="w-6 h-6"
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
          className="absolute right-[5%] top-[63%] -translate-y-1/2 z-10 bg-colorBtnPrimary/80 hover:bg-colorBtnPrimary text-colorBtnPrimaryText w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300 cursor-pointer shadow-lg"
        >
          <svg
            className="w-6 h-6"
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
            el: ".testimonial-pagination",
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          centeredSlides={true}
          spaceBetween={15}
          slidesPerView={2.5}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 30,
            },
          }}
          slideToClickedSlide={true}
          className="pb-16 testimonial-swiper"
        >
          {testimonials.map((testimonial: Testimonial) => (
            <SwiperSlide key={testimonial.id}>
              {({ isActive }) => (
                <div
                  className={`bg-colorBodyDim/20 rounded-xl my-10 p-8 shadow h-full flex flex-col transition-all duration-500 ${
                    isActive ? "scale-110 opacity-100" : "scale-90 opacity-70"
                  }`}
                >
                  {/* Star Rating */}
                  <div className="flex gap-1 mb-4 justify-center">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-5 h-5 ${
                          index < testimonial.rating
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

                  {/* Testimonial Text */}
                  <p className="text-colorTextBody text-base leading-relaxed mb-6 grow text-center">
                    "{testimonial.text}"
                  </p>

                  {/* Customer Info */}
                  <div className="flex flex-col items-center gap-3 mt-auto">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-colorBorder shadow-md">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={400}
                        height={400}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold text-colorTextBody">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-colorTextBody/70">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination */}
        <div className="testimonial-pagination flex justify-center mt-8"></div>
      </div>
    </section>
  );
}
