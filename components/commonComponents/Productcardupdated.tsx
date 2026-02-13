"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductCardProps {
  id: string | number;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  tags?: string[];
  slug: string;
  availability: "in-stock" | "out-of-stock" | "limited";
  rating: number;
  reviewCount: number;
}

export default function CollectionProductCard({
  name,
  description,
  image,
  price,
  originalPrice,
  discount,
  tags = [],
  slug,
  availability,
  rating,
  reviewCount,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const hasDiscount = discount && discount > 0;
  const formattedPrice = price.toLocaleString("en-BD");
  const formattedOriginalPrice = originalPrice?.toLocaleString("en-BD");

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "new":
        return "bg-green-600 text-white";
      case "sale":
        return "bg-colorSaleTag text-colorSaleTagText";
      case "hot":
        return "bg-red-600 text-white";
      case "limited":
        return "bg-purple-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  const getTagLabel = (tag: string) => {
    return tag.toUpperCase();
  };

  const getAvailabilityColor = () => {
    switch (availability) {
      case "in-stock":
        return "text-green-600";
      case "limited":
        return "text-orange-500";
      case "out-of-stock":
        return "text-red-600";
    }
  };

  const getAvailabilityText = () => {
    switch (availability) {
      case "in-stock":
        return "In Stock";
      case "limited":
        return "Limited Stock";
      case "out-of-stock":
        return "Out of Stock";
    }
  };

  const isOutOfStock = availability === "out-of-stock";

  return (
    <div className="group relative bg-colorBody border border-colorBorder rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Product Image */}
      <Link href={`/product/${slug}`} className="block relative">
        <div className="relative aspect-square overflow-hidden bg-colorSmallImageBg">
          <Image
            src={image}
            alt={name}
            width={400}
            height={400}
            className={`object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ${
              isOutOfStock ? "opacity-50" : ""
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                OUT OF STOCK
              </span>
            </div>
          )}

          {/* Tags - Top Left */}
          {(tags.length > 0 || hasDiscount) && (
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className={`${getTagColor(
                    tag,
                  )} px-3 py-1 rounded text-xs font-semibold uppercase tracking-wide`}
                >
                  {getTagLabel(tag)}
                </span>
              ))}
              {hasDiscount && (
                <span className="bg-colorSaleTag text-colorSaleTagText px-3 py-1 rounded text-xs font-semibold">
                  -{discount}%
                </span>
              )}
            </div>
          )}

          {/* Quick Actions - Top Right */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="bg-colorBtnPrimaryText hover:bg-colorBtnPrimary text-colorTextBody hover:text-colorBtnPrimaryText p-2 rounded-full shadow-md transition-all duration-200"
              aria-label="Add to wishlist"
            >
              <svg
                className="w-5 h-5"
                fill={isWishlisted ? "currentColor" : "none"}
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

            {/* Quick View Button */}
            <button
              className="bg-colorBtnPrimaryText hover:bg-colorBtnPrimary text-colorTextBody hover:text-colorBtnPrimaryText p-2 rounded-full shadow-md transition-all duration-200"
              aria-label="Quick view"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </div>

          {/* Add to Cart Button - Slides up on hover */}
          {!isOutOfStock && (
            <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button
                disabled={isAddingToCart}
                onClick={() => {
                  setIsAddingToCart(true);
                  setTimeout(() => setIsAddingToCart(false), 1000);
                }}
                className="w-full bg-colorBtnPrimary hover:bg-colorBtnPrimaryDim text-colorBtnPrimaryText py-3 px-4 flex items-center justify-center gap-2 font-medium transition-colors duration-200 disabled:opacity-50"
              >
                {isAddingToCart ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Adding...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Name */}
        <Link href={`/product/${slug}`}>
          <h3 className="font-semibold text-colorTextBody text-base mb-1 hover:text-colorLink transition-colors line-clamp-1">
            {name}
          </h3>
        </Link>

        {/* Product Description */}
        <p className="text-colorTextBody/60 text-sm mb-2 line-clamp-1">
          {description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? "text-yellow-500"
                    : i < rating
                      ? "text-yellow-500"
                      : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-colorTextBody/60">
            {rating} ({reviewCount})
          </span>
        </div>

        {/* Availability */}
        <div className="mb-3">
          <span className={`text-xs font-medium ${getAvailabilityColor()}`}>
            {getAvailabilityText()}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          {originalPrice && (
            <span className="text-colorTextBody/40 text-sm line-through">
              ৳ {formattedOriginalPrice}
            </span>
          )}
          <span className="text-colorSalePrice font-bold text-lg">
            ৳ {formattedPrice}
          </span>
        </div>
      </div>
    </div>
  );
}
