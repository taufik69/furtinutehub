"use client";

import Link from "next/link";
import CollectionProductCard from "@/components/commonComponents/Productcardupdated";
import { ProductImageGallery } from "@/components/ProductDetails/Productclientfinal";
import { useEffect, useMemo, useState } from "react";
import { addToCart } from "@/lib/cart.db";
import { Bounce, toast } from "react-toastify";

export default function ProductDetailsClient({
  product,
  relatedProducts,
}: {
  product: any;
  relatedProducts: any[];
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // ── Variant setup ─────────────────────────────────────────────────────────
  const variants = Array.isArray(product?.variants) ? product.variants : [];
  const hasVariants = Boolean(product?.hasVariants) && variants.length > 0;

  // All unique colors
  const availableColors: string[] = useMemo(() => {
    if (hasVariants) {
      return Array.from(
        new Set(
          variants
            .filter((v: any) => v?.isActive !== false)
            .map((v: any) => String(v?.color || "").trim())
            .filter(Boolean),
        ),
      );
    }
    return Array.isArray(product?.color) ? product.color : [];
  }, [hasVariants, product?.color, variants]);

  // Sizes filtered by selected color (variants) or all sizes (no variant)
  const availableSizes: string[] = useMemo(() => {
    if (hasVariants) {
      const scoped = selectedColor
        ? variants.filter(
            (v: any) => v?.color === selectedColor && v?.isActive !== false,
          )
        : variants.filter((v: any) => v?.isActive !== false);
      return Array.from(
        new Set(
          scoped.map((v: any) => String(v?.size || "").trim()).filter(Boolean),
        ),
      );
    }
    return Array.isArray(product?.size) ? product.size : [];
  }, [hasVariants, product?.size, selectedColor, variants]);

  // Active variant based on color + size selection
  const selectedVariant = useMemo(() => {
    if (!hasVariants || !selectedColor) return null;
    return (
      variants.find(
        (v: any) =>
          v?.color === selectedColor &&
          (selectedSize ? v?.size === selectedSize : true) &&
          v?.isActive !== false,
      ) || null
    );
  }, [hasVariants, variants, selectedColor, selectedSize]);

  // Set default color on mount
  useEffect(() => {
    if (availableColors.length > 0) {
      setSelectedColor(availableColors[0]);
    }
  }, [availableColors]);

  // When color changes, reset size to first available for that color
  useEffect(() => {
    if (availableSizes.length > 0) {
      if (!availableSizes.includes(selectedSize)) {
        setSelectedSize(availableSizes[0]);
      }
    } else {
      setSelectedSize("");
    }
  }, [availableSizes]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Derived display values ─────────────────────────────────────────────────
  const images =
    product?.image?.map((img: any) => img.optimized_url || img.url) || [];

  const price =
    selectedVariant?.finalPrice ?? product?.finalPrice ?? product?.price ?? 0;
  const originalPrice = selectedVariant?.price ?? product?.price ?? 0;
  const discountValue =
    selectedVariant?.discountValue ?? product?.discountValue ?? 0;
  const discountType =
    selectedVariant?.discountType ?? product?.discountType ?? null;
  const inStock = selectedVariant
    ? selectedVariant.inStock
    : (product?.inStock ?? true);
  const sku = selectedVariant?.sku || product?.sku || "";
  const stock = selectedVariant?.stock ?? product?.stock;

  const brandName =
    product?.brandRef?.name ||
    (typeof product?.brand === "string" ? product.brand : "") ||
    "";
  const subcategoryName = product?.subcategory?.name || "";

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleAddToCart = async () => {
    if (!inStock) return;
    try {
      setIsAdding(true);
      await addToCart({
        key: `${product?.slug}:${selectedColor || "default"}:${selectedSize || "default"}`,
        productId: product?._id || product?.id,
        name: product?.name,
        slug: product?.slug,
        image:
          product?.image?.[0]?.optimized_url || product?.image?.[0]?.url || "",
        price: Number(price),
        qty: quantity,
        color: selectedColor || "",
        size: selectedSize || "",
      });
      toast.success(`Added ${quantity} × ${product?.name} to cart!`, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        theme: "light",
        transition: Bounce,
      });
    } catch (err) {
      console.error("Add to cart failed", err);
    } finally {
      setIsAdding(false);
    }
  };

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in purchasing:\n*${product?.name}*\nColor: ${selectedColor}${selectedSize ? `\nSize: ${selectedSize}` : ""}\nQuantity: ${quantity}\n\nPlease confirm availability.`;
    window.open(
      `https://wa.me/8801741659798?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className="min-h-screen bg-colorBody">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-colorTextBody/60 mb-6">
          <Link href="/" className="hover:text-colorLink">
            Home
          </Link>
          <span>/</span>
          <Link href="/allcollection" className="hover:text-colorLink">
            Shop
          </Link>
          <span>/</span>
          <span className="text-colorTextBody">{product?.name}</span>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Left — Image Gallery */}
          <ProductImageGallery
            images={images}
            discount={discountValue}
            discountType={discountType}
            productName={product?.name || "Product"}
          />

          {/* Right — Product Info */}
          <div className="space-y-5">
            {/* Title */}
            <div>
              {product?.category?.name && (
                <p className="text-xs text-colorTextBody/50 uppercase tracking-wide mb-1">
                  {product.category.name}
                  {subcategoryName && ` › ${subcategoryName}`}
                </p>
              )}
              <h1 className="text-2xl lg:text-3xl font-bold text-colorTextBody leading-tight">
                {product?.name}
              </h1>
              {brandName && (
                <p className="text-sm text-colorTextBody/60 mt-1">
                  Brand:{" "}
                  <span className="font-medium text-colorTextBody">
                    {brandName}
                  </span>
                </p>
              )}
            </div>

            {/* Rating */}
            {product?.rating > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-200"}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-colorTextBody/50">
                  {product.rating} • {product.totalReviews || 0} reviews
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-colorTextBody">
                ৳ {price.toLocaleString("en-BD")}
              </span>
              {discountValue > 0 && originalPrice !== price && (
                <>
                  <span className="text-lg text-colorTextBody/40 line-through">
                    ৳ {originalPrice.toLocaleString("en-BD")}
                  </span>
                  <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                    {discountType === "percentage"
                      ? `${discountValue}% off`
                      : `Save ৳${discountValue}`}
                  </span>
                </>
              )}
            </div>

            {/* Short description */}
            {product?.shortDescription && (
              <p className="text-sm text-colorTextBody/80 leading-relaxed">
                {product.shortDescription}
              </p>
            )}

            {/* ── COLOR SELECTION ─────────────────────────────────────────── */}
            {availableColors.length > 0 && (
              <div className="border-t border-colorBorder pt-4">
                <p className="text-sm font-semibold text-colorTextBody mb-2">
                  Color:{" "}
                  <span className="font-normal text-colorTextBody/60">
                    {selectedColor}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      className={`px-3 py-1.5 rounded-lg border-2 text-sm transition-all ${
                        selectedColor === col
                          ? "border-colorBtnPrimary bg-colorBtnPrimary/10 text-colorBtnPrimary font-medium"
                          : "border-colorBorder hover:border-colorBtnPrimary/40 text-colorTextBody"
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── SIZE SELECTION ───────────────────────────────────────────── */}
            {availableSizes.length > 0 && (
              <div className="border-t border-colorBorder pt-4">
                <p className="text-sm font-semibold text-colorTextBody mb-2">
                  Size:{" "}
                  <span className="font-normal text-colorTextBody/60">
                    {selectedSize}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded-lg border-2 text-sm transition-all min-w-[52px] text-center ${
                        selectedSize === size
                          ? "border-colorBtnPrimary bg-colorBtnPrimary/10 text-colorBtnPrimary font-medium"
                          : "border-colorBorder hover:border-colorBtnPrimary/40 text-colorTextBody"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── VARIANT PRICE NOTE ───────────────────────────────────────── */}
            {hasVariants && selectedVariant && (
              <div className="text-xs text-colorTextBody/50 bg-colorBodyDim px-3 py-2 rounded-lg">
                SKU:{" "}
                <span className="font-medium text-colorTextBody">
                  {selectedVariant.sku}
                </span>
                {" · "}
                Stock:{" "}
                <span className="font-medium text-colorTextBody">
                  {selectedVariant.stock} units
                </span>
              </div>
            )}

            {/* ── QUANTITY + STOCK ─────────────────────────────────────────── */}
            <div className="border-t border-colorBorder pt-4 flex items-center justify-between gap-4">
              <div className="flex items-center border border-colorBorder rounded-lg">
                <button
                  onClick={() => setQuantity((p) => Math.max(1, p - 1))}
                  disabled={!inStock}
                  className="px-4 py-2.5 hover:bg-colorBodyDim disabled:opacity-40 transition-colors rounded-l-lg"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <span className="px-6 py-2.5 font-semibold text-colorTextBody min-w-[56px] text-center border-x border-colorBorder">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((p) => p + 1)}
                  disabled={!inStock}
                  className="px-4 py-2.5 hover:bg-colorBodyDim disabled:opacity-40 transition-colors rounded-r-lg"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>

              <span
                className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                  inStock
                    ? "text-green-700 bg-green-100"
                    : "text-red-700 bg-red-100"
                }`}
              >
                {inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* ── ACTION BUTTONS ───────────────────────────────────────────── */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!inStock || isAdding}
                className={`flex-1 py-3.5 px-5 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                  inStock
                    ? "bg-colorBtnPrimary text-colorBtnPrimaryText hover:bg-colorBtnPrimary/90 active:scale-95"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                } ${isAdding ? "opacity-75" : ""}`}
              >
                {isAdding ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
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
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Adding...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    {inStock ? "Add to Cart" : "Out of Stock"}
                  </>
                )}
              </button>

              <button
                onClick={handleWhatsApp}
                className="flex-1 py-3.5 px-5 rounded-lg font-semibold text-sm bg-[#25D366] hover:bg-[#1ebe57] active:scale-95 text-white transition-all flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Order via WhatsApp
              </button>
            </div>

            {/* Description */}
            {product?.description && (
              <div className="border-t border-colorBorder pt-4">
                <h3 className="text-sm font-semibold text-colorTextBody mb-2">
                  Description
                </h3>
                <p className="text-sm text-colorTextBody/75 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Product Details Table */}
            <div className="border-t border-colorBorder pt-4 space-y-2">
              <h3 className="text-sm font-semibold text-colorTextBody mb-3">
                Product Details
              </h3>

              {[
                { label: "SKU", value: sku },
                { label: "Category", value: product?.category?.name },
                { label: "Subcategory", value: subcategoryName },
                {
                  label: "Stock",
                  value: stock !== undefined ? `${stock} units` : null,
                },
              ]
                .filter((r) => r.value)
                .map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-colorTextBody/50">{row.label}</span>
                    <span className="text-colorTextBody font-medium">
                      {row.value}
                    </span>
                  </div>
                ))}

              {/* Badges */}
              <div className="flex items-center justify-between text-sm pt-1">
                <span className="text-colorTextBody/50">Tags</span>
                <div className="flex gap-1.5">
                  {product?.isNew && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                      New
                    </span>
                  )}
                  {product?.isSale && (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                      Sale
                    </span>
                  )}
                  {product?.isLimited && (
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                      Limited
                    </span>
                  )}
                  {product?.isHot && (
                    <span className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">
                      Hot
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="border-t border-colorBorder pt-4 grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2.5 p-3 bg-colorBodyDim rounded-lg">
                <svg
                  className="w-5 h-5 text-colorBtnPrimary shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
                <div>
                  <p className="text-xs font-semibold text-colorTextBody">
                    Fastest Delivery
                  </p>
                  <p className="text-xs text-colorTextBody/50">
                    Whole Bangladesh
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 bg-colorBodyDim rounded-lg">
                <svg
                  className="w-5 h-5 text-colorBtnPrimary shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <div>
                  <p className="text-xs font-semibold text-colorTextBody">
                    Secure Payment
                  </p>
                  <p className="text-xs text-colorTextBody/50">
                    100% safe transaction
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-colorTextBody">
                Related Products
              </h2>
              <Link
                href={`/allcollection?category=${product?.category?._id}`}
                className="text-colorLink hover:underline text-sm"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((p: any) => (
                <CollectionProductCard key={p._id || p.slug} productData={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
