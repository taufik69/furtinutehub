"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";

export default function CollectionProductCard({ productData }: any) {
  // --------- dynamic mapping from API product ----------
  const name = productData?.name ?? "";
  const slug = productData?.slug ?? "";
  const description =
    productData?.shortDescription ?? productData?.description ?? "";

  // image: prefer optimized_url then url
  const image =
    productData?.image?.[0]?.optimized_url ||
    productData?.image?.[0]?.url ||
    productData?.category?.image?.url ||
    "/images/placeholder.png";

  const rating = Number(productData?.rating ?? 0);
  const reviewCount = Number(productData?.totalReviews ?? 0);

  // prices
  const finalPrice = Number(productData?.finalPrice ?? 0);
  const discountPrice = productData?.price;

  // discount percent (if backend gives discountValue)
  const discount =
    productData?.discountType === "percentage"
      ? `${productData?.discountValue}%`
      : `${productData?.discountValue}৳`;

  // tags from backend booleans
  const tags = useMemo(() => {
    const t: string[] = [];
    if (productData?.isNew) t.push("new");
    if (productData?.isSale) t.push("sale");
    if (productData?.isHot) t.push("hot");
    if (productData?.isLimited) t.push("limited");
    return t;
  }, [productData]);

  //  --------- original UI logic (unchanged) ----------

  const formattedPrice = discountPrice.toLocaleString("en-BD");
  const formattedFinalPrice = finalPrice?.toLocaleString("en-BD");

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

  const getAvailabilityColor = (stock: number) => {
    if (stock === 0) return "text-red-600 ";
    if (stock > 0) return "text-green-600 ";
    if (stock < 5) return "text-yellow-600 ";
  };

  const getAvailabilityText = (stock: number) => {
    if (stock === 0) return "Out of Stock";
    if (stock > 0) return "In Stock";
    if (stock < 5) return "Low Stock";
  };

  return (
    <div className="group relative bg-colorBody border border-colorBorder rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Product Image */}
      <Link href={`/productdetails/${slug}`} className="block relative">
        <div className="relative aspect-square overflow-hidden bg-colorSmallImageBg">
          <Image
            src={image}
            alt={name}
            width={400}
            height={400}
            className={`object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ${
              productData.stock === 0 ? "opacity-50" : ""
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Out of Stock Overlay */}
          {productData.stock === 0 && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                OUT OF STOCK
              </span>
            </div>
          )}

          {/* Tags - Top Left */}
          {(tags.length > 0 || productData?.discountValue > 0) && (
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
              {productData?.discountValue > 0 && (
                <span className="bg-colorSaleTag text-colorSaleTagText px-3 py-1 rounded text-xs font-semibold">
                  {discount}
                </span>
              )}
            </div>
          )}

          {/* Quick Actions - Top Right */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Wishlist Button */}
            <button
              className="bg-colorBtnPrimaryText hover:bg-colorBtnPrimary text-colorTextBody hover:text-colorBtnPrimaryText p-2 rounded-full shadow-md transition-all duration-200"
              aria-label="Add to wishlist"
            >
              <svg
                className="w-5 h-5"
                fill={"currentColor"}
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
          {productData?.stock !== 0 && (
            <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button className="w-full bg-colorBtnPrimary hover:bg-colorBtnPrimaryDim text-colorBtnPrimaryText py-3 px-4 flex items-center justify-center gap-2 font-medium transition-colors duration-200 disabled:opacity-50">
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
              </button>
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Name */}
        <Link href={`/productdetails/${slug}`}>
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
          <span
            className={`text-xs font-medium ${getAvailabilityColor(productData?.stock)}`}
          >
            {getAvailabilityText(productData?.stock)}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          {finalPrice && (
            <span className="text-colorTextBody/40 text-sm line-through">
              ৳ {formattedFinalPrice}
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
