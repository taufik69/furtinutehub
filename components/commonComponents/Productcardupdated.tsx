"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { addToCart } from "@/lib/cart.db";
import { toast } from "react-toastify";

export default function ProductCard({ productData }: { productData: any }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // --------- dynamic mapping from API product ----------
  const name = productData?.name ?? "";
  const slug = productData?.slug ?? "";
  const description =
    productData?.shortDescription ?? productData?.description ?? "";

  const sku = productData?.sku ?? productData?.SKU ?? "";

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
      ? `${productData?.discountValue}% Off`
      : `${productData?.discountValue}৳ Off`;

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
        return "bg-emerald-500 text-white";
      case "sale":
        return "bg-colorSaleTag text-colorSaleTagText";
      case "hot":
        return "bg-rose-500 text-white";
      case "limited":
        return "bg-violet-500 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAddingToCart) return;
    setIsAddingToCart(true);
    try {
      await addToCart({
        key: `${productData?._id || productData?.id || slug}`,
        productId: String(productData?._id || productData?.id || slug),
        name,
        slug,
        image,
        price,
        qty: 1,
      });
      toast.success("Added to cart!");
    } catch {
      toast.error("Failed to add to cart.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  // --------- UI ----------
  return (
    <div className="group relative bg-white border border-[#e8e8e1] rounded-xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      {/* Product Image */}
      <Link href={`/productdetails/${slug}`} className="block relative">
        <div className="relative overflow-hidden bg-[#f7f7f5]" style={{ aspectRatio: "4/3" }}>
          <Image
            src={image}
            alt={name}
            width={400}
            height={300}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            quality={80}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Discount Badge - Top Left */}
          {hasDiscount && (
            <div className="absolute top-3 left-3">
              <span className="bg-[#1c1d1d] text-white px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide">
                {discountLabel}
              </span>
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className={`absolute ${hasDiscount ? "top-10" : "top-3"} left-3 flex flex-col gap-1.5`}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className={`${getTagColor(tag)} px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wide`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Wishlist Button - Top Right */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsWishlisted((p) => !p);
            }}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-rose-500 p-2 rounded-full shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100"
            aria-label="Add to wishlist"
          >
            <svg
              className="w-4 h-4"
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
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Name */}
        <Link href={`/productdetails/${slug}`}>
          <h3 className="font-semibold text-[#1c1d1d] text-base mb-1 hover:text-gray-600 transition-colors line-clamp-1">
            {name}
          </h3>
        </Link>

        {/* SKU */}
        {sku && (
          <p className="text-[#1c1d1d]/50 text-xs mb-1 font-medium tracking-wide">
            SKU : <span className="font-semibold">{sku}</span>
          </p>
        )}

        {/* Price Row */}
        <div className="flex items-center gap-2 mb-4">
          {originalPrice && (
            <span className="text-[#1c1d1d]/40 text-sm line-through">
              ৳ {formattedOriginalPrice}
            </span>
          )}
          <span className="text-[#1c1d1d] font-bold text-lg">
            ৳ {formattedPrice}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="flex-1 bg-[#111111] hover:bg-[#333333] text-white py-2.5 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95"
          >
            {isAddingToCart ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Adding...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Add To Cart</span>
              </>
            )}
          </button>

          {/* Buy Now Button */}
          <Link href={`/productdetails/${slug}`} className="flex-1">
            <button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2.5 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Buy Now</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
