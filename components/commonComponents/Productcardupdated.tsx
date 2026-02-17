"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function ProductCard({ productData }: { productData: any }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // --------- dynamic mapping from API product ----------
  const name = productData?.name ?? "";
  const slug = productData?.slug ?? "";
  const description =
    productData?.shortDescription ?? productData?.description ?? "";

  const image =
    productData?.image?.[0]?.optimized_url ||
    productData?.image?.[0]?.url ||
    productData?.category?.image?.url ||
    "/images/sofa.webp";

  // price mapping
  const price = Number(productData?.finalPrice ?? productData?.price ?? 0);
  const originalPrice =
    productData?.discountValue > 0
      ? Number(productData?.price ?? 0)
      : undefined;

  // discount label
  const discountLabel =
    productData?.discountType === "percentage"
      ? `${productData?.discountValue}%`
      : `${productData?.discountValue}৳`;

  const hasDiscount = Number(productData?.discountValue ?? 0) > 0;

  // tags from backend booleans
  const tags = useMemo(() => {
    const t: string[] = [];
    if (productData?.isNew) t.push("new");
    if (productData?.isSale) t.push("sale");
    if (productData?.isHot) t.push("hot");
    if (productData?.isLimited) t.push("limited");
    return t;
  }, [productData]);

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

  const getTagLabel = (tag: string) => tag.toUpperCase();

  // --------- UI (same design) ----------
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
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

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
                  -{discountLabel}
                </span>
              )}
            </div>
          )}

          {/* Quick Actions - Top Right */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Wishlist Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsWishlisted((p) => !p);
              }}
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
              onClick={(e) => e.preventDefault()}
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
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              disabled={isAddingToCart}
              onClick={(e) => {
                e.preventDefault();
                setIsAddingToCart(true);

                // TODO: এখানে তোমার indexedDB addToCart call বসাবে
                // await addToCart(...)

                setTimeout(() => setIsAddingToCart(false), 800);
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
        <p className="text-colorTextBody/60 text-sm mb-3 line-clamp-1">
          {description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2">
          {originalPrice ? (
            <span className="text-colorTextBody/40 text-sm line-through">
              ৳ {formattedOriginalPrice}
            </span>
          ) : null}
          <span className="text-colorSalePrice font-bold text-lg">
            ৳ {formattedPrice}
          </span>
        </div>
      </div>
    </div>
  );
}
