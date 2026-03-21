"use client";

import { useState } from "react";
import Image from "next/image";

export function ProductImageGallery({
  images,
  discount,
  productName,
  discountType,
}: {
  images: string[];
  discount: number;
  productName: string;
  discountType: string;
}) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-3">
      {/* Main Image — fixed height instead of aspect-square */}
      <div className="relative w-full h-[380px] lg:h-[420px] rounded-xl overflow-hidden bg-colorBodyDim">
        <Image
          src={images[selectedImage] || "/placeholder.jpg"}
          alt={productName}
          fill
          className="object-cover"
          priority
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow">
            -{discountType === "percentage" ? `${discount}%` : `${discount} Tk`}
          </div>
        )}

        {/* Wishlist */}
        <button
          className="absolute top-3 left-3 p-2 bg-white/90 hover:bg-white rounded-full shadow transition-all group"
          aria-label="Add to wishlist"
        >
          <svg
            className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img: string, idx: number) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === idx
                  ? "border-colorBtnPrimary ring-1 ring-colorBtnPrimary/20"
                  : "border-colorBorder hover:border-colorBtnPrimary/50"
              }`}
            >
              <Image
                src={img || "/placeholder.jpg"}
                alt={`${productName} view ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
