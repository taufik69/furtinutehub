"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import CollectionProductCard from "@/components/commonComponents/Productcardupdated";
import { ProductImageGallery } from "@/components/ProductDetails/Productclientfinal";
import { useEffect, useMemo, useState } from "react";
import { addToCart } from "@/lib/cart.db";
import { Bounce, toast } from "react-toastify";

// ── CONFIG — reads from .env.local ────────────────────────────────────────────
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "8801616785862";
const MESSENGER_USERNAME = process.env.NEXT_PUBLIC_MESSENGER_USERNAME ?? "pervejfashion";
const CALL_NUMBER = process.env.NEXT_PUBLIC_CALL_NUMBER ?? "01616-785862";
// ──────────────────────────────────────────────────────────────────────────────

export default function ProductDetailsClient({
  product,
  relatedProducts,
}: {
  product: any;
  relatedProducts: any[];
}) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);

  // ── Variant setup ──────────────────────────────────────────────────────────
  const variants = Array.isArray(product?.variants) ? product.variants : [];
  const hasVariants = Boolean(product?.hasVariants) && variants.length > 0;

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

  useEffect(() => {
    if (availableColors.length > 0) setSelectedColor(availableColors[0]);
  }, [availableColors]);

  useEffect(() => {
    if (availableSizes.length > 0) {
      if (!availableSizes.includes(selectedSize)) setSelectedSize(availableSizes[0]);
    } else {
      setSelectedSize("");
    }
  }, [availableSizes]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Derived values ─────────────────────────────────────────────────────────
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

  // ── Cart payload builder ───────────────────────────────────────────────────
  const buildCartPayload = () => {
    const selectedVariantId = selectedVariant?._id || selectedVariant?.id;
    return {
      key: selectedVariantId
        ? `variant:${selectedVariantId}`
        : `product:${product?.slug || product?._id || product?.id}`,
      productId: String(product?._id || product?.id || ""),
      variantId: selectedVariantId ? String(selectedVariantId) : undefined,
      name: product?.name,
      slug: product?.slug,
      image:
        product?.image?.[0]?.optimized_url || product?.image?.[0]?.url || "",
      price: Number(price),
      qty: quantity,
      color: selectedColor || "",
      size: selectedSize || "",
    };
  };

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleAddToCart = async () => {
    if (!inStock) return;
    setIsAdding(true);
    try {
      await addToCart(buildCartPayload());
      toast.success(`Added ${quantity} × ${product?.name} to cart!`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        theme: "light",
        transition: Bounce,
      });
    } catch (err) {
      console.error("Add to cart failed", err);
      toast.error("Failed to add to cart.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (!inStock) return;
    setIsBuyingNow(true);
    try {
      await addToCart(buildCartPayload());
      router.push("/checkout");
    } catch (err) {
      console.error("Buy now failed", err);
      toast.error("Something went wrong.");
      setIsBuyingNow(false);
    }
  };

  const handleCallNow = () => {
    window.location.href = `tel:${CALL_NUMBER}`;
  };

  const handleWhatsApp = () => {
    const message = `হ্যালো! আমি এই পণ্যটি কিনতে চাই:\n\n*${product?.name}*${selectedColor ? `\nরঙ: ${selectedColor}` : ""}${selectedSize ? `\nসাইজ: ${selectedSize}` : ""}\nপরিমাণ: ${quantity}\nমূল্য: ৳${Number(price).toLocaleString("en-BD")}\n\nঅনুগ্রহ করে নিশ্চিত করুন।`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const handleMessenger = () => {
    window.open(`https://m.me/${MESSENGER_USERNAME}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/allcollection" className="hover:text-gray-700 transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium line-clamp-1">{product?.name}</span>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 mb-16">

          {/* LEFT — Image Gallery */}
          <ProductImageGallery
            images={images}
            discount={discountValue}
            discountType={discountType}
            productName={product?.name || "Product"}
          />

          {/* RIGHT — Product Info */}
          <div className="space-y-5">

            {/* Category breadcrumb */}
            {product?.category?.name && (
              <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
                {product.category.name}
                {subcategoryName && ` › ${subcategoryName}`}
              </p>
            )}

            {/* Title */}
            <h1 className="text-2xl lg:text-3xl font-bold text-[#1c1d1d] leading-tight">
              {product?.name}
            </h1>

            {/* Brand + SKU row */}
            <div className="flex items-center gap-4 text-sm">
              {sku && (
                <span className="text-gray-500">
                  SKU: <span className="font-semibold text-[#1c1d1d]">{sku}</span>
                </span>
              )}
              {brandName && (
                <span className="text-gray-500">
                  Brand: <span className="font-semibold text-[#1c1d1d]">{brandName}</span>
                </span>
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
                <span className="text-xs text-gray-400">
                  {product.rating} • {product.totalReviews || 0} reviews
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-3 py-2">
              <span className="text-3xl font-bold text-[#1c1d1d]">
                ৳ {Number(price).toLocaleString("en-BD")}
              </span>
              {discountValue > 0 && originalPrice !== price && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    ৳ {Number(originalPrice).toLocaleString("en-BD")}
                  </span>
                  <span className="text-xs font-bold text-white bg-red-500 px-2.5 py-1 rounded-full">
                    {discountType === "percentage"
                      ? `${discountValue}% off`
                      : `৳${discountValue} off`}
                  </span>
                </>
              )}
            </div>

            {/* Short description */}
            {product?.shortDescription && (
              <p className="text-sm text-gray-600 leading-relaxed border-l-4 border-gray-200 pl-3">
                {product.shortDescription}
              </p>
            )}

            {/* ── COLOR ────────────────────────────────────────────────────── */}
            {availableColors.length > 0 && (
              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm font-semibold text-[#1c1d1d] mb-2.5">
                  Color:{" "}
                  <span className="font-normal text-gray-500">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      className={`px-4 py-1.5 rounded-lg border-2 text-sm font-medium transition-all ${
                        selectedColor === col
                          ? "border-[#111] bg-[#111] text-white"
                          : "border-gray-200 hover:border-gray-400 text-[#1c1d1d]"
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── SIZE ─────────────────────────────────────────────────────── */}
            {availableSizes.length > 0 && (
              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm font-semibold text-[#1c1d1d] mb-2.5">
                  Size:{" "}
                  <span className="font-normal text-gray-500">{selectedSize}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-1.5 rounded-lg border-2 text-sm font-medium transition-all min-w-[52px] text-center ${
                        selectedSize === size
                          ? "border-[#111] bg-[#111] text-white"
                          : "border-gray-200 hover:border-gray-400 text-[#1c1d1d]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── QUANTITY + STOCK ──────────────────────────────────────────── */}
            <div className="border-t border-gray-100 pt-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#1c1d1d] mb-2">Quantity</p>
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden w-fit">
                  <button
                    onClick={() => setQuantity((p) => Math.max(1, p - 1))}
                    disabled={!inStock}
                    className="px-4 py-2.5 hover:bg-gray-100 disabled:opacity-40 transition-colors text-lg font-bold"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-bold text-[#1c1d1d] min-w-[56px] text-center border-x-2 border-gray-200">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((p) => p + 1)}
                    disabled={!inStock}
                    className="px-4 py-2.5 hover:bg-gray-100 disabled:opacity-40 transition-colors text-lg font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Stock status */}
              <div className="text-right">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${
                    inStock
                      ? "text-green-700 bg-green-100"
                      : "text-red-700 bg-red-100"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`}
                  />
                  {inStock
                    ? stock !== undefined && stock <= 5
                      ? `Only ${stock} left!`
                      : "In Stock"
                    : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* ── ACTION BUTTONS ────────────────────────────────────────────── */}
            <div className="space-y-3 pt-1">

              {/* Row 1: Add to Cart + Buy Now */}
              <div className="flex gap-3">
                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={!inStock || isAdding || isBuyingNow}
                  className={`flex-1 py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-95 ${
                    inStock
                      ? "bg-[#111111] hover:bg-[#333] text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  } ${isAdding ? "opacity-75" : ""}`}
                >
                  {isAdding ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Adding...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      {inStock ? "Add to Cart" : "Out of Stock"}
                    </>
                  )}
                </button>

                {/* Buy Now */}
                <button
                  onClick={handleBuyNow}
                  disabled={!inStock || isAdding || isBuyingNow}
                  className={`flex-1 py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-95 ${
                    inStock
                      ? "bg-rose-600 hover:bg-rose-700 text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  } ${isBuyingNow ? "opacity-75" : ""}`}
                >
                  {isBuyingNow ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Buy Now
                    </>
                  )}
                </button>
              </div>

              {/* Row 2: Call Now */}
              <button
                onClick={handleCallNow}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call Now
              </button>

              {/* Row 3: WhatsApp */}
              <button
                onClick={handleWhatsApp}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-[#25D366] hover:bg-[#1ebe57] text-white transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                হোয়াটসঅ্যাপ অর্ডার
              </button>

              {/* Row 4: Messenger */}
              <button
                onClick={handleMessenger}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-[#0084FF] hover:bg-[#006fd6] text-white transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.6l3.131 3.26 5.887-3.26-6.559 6.363z" />
                </svg>
                মেসেঞ্জার অর্ডার
              </button>
            </div>

            {/* Description */}
            {product?.description && (
              <div className="border-t border-gray-100 pt-5">
                <h3 className="text-base font-bold text-[#1c1d1d] mb-2">Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            {/* Product Details Table */}
            <div className="border-t border-gray-100 pt-5 space-y-2">
              <h3 className="text-base font-bold text-[#1c1d1d] mb-3">Product Details</h3>
              {[
                { label: "SKU", value: sku },
                { label: "Category", value: product?.category?.name },
                { label: "Subcategory", value: subcategoryName },
                { label: "Stock", value: stock !== undefined ? `${stock} units` : null },
              ]
                .filter((r) => r.value)
                .map((row) => (
                  <div key={row.label} className="flex items-center justify-between text-sm py-1.5 border-b border-gray-50">
                    <span className="text-gray-500">{row.label}</span>
                    <span className="text-[#1c1d1d] font-semibold">{row.value}</span>
                  </div>
                ))}

              {/* Tags */}
              <div className="flex items-center justify-between text-sm pt-1">
                <span className="text-gray-500">Tags</span>
                <div className="flex gap-1.5">
                  {product?.isNew && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">New</span>}
                  {product?.isSale && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">Sale</span>}
                  {product?.isLimited && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-semibold">Limited</span>}
                  {product?.isHot && <span className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full font-semibold">Hot</span>}
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="border-t border-gray-100 pt-4 grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2.5 p-3 bg-gray-50 rounded-xl">
                <svg className="w-5 h-5 text-[#111] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <div>
                  <p className="text-xs font-bold text-[#1c1d1d]">Fastest Delivery</p>
                  <p className="text-xs text-gray-500">Whole Bangladesh</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 bg-gray-50 rounded-xl">
                <svg className="w-5 h-5 text-[#111] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <p className="text-xs font-bold text-[#1c1d1d]">Secure Payment</p>
                  <p className="text-xs text-gray-500">100% safe transaction</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-100 pt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1c1d1d]">Related Products</h2>
              <Link
                href={`/allcollection?category=${product?.category?._id}`}
                className="text-sm text-gray-500 hover:text-[#111] hover:underline transition-colors"
              >
                View All →
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
