"use client";

import Link from "next/link";
import CollectionProductCard from "@/components/commonComponents/Productcardupdated";
import { ProductImageGallery } from "@/components/ProductDetails/Productclientfinal";
import { useState } from "react";

export default function ProductDetailsClient({
  product,
  relatedProducts,
}: {
  product: any;
  relatedProducts: any[];
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.color?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product?.size?.[0] || "");
  const [wishlist, setWishlist] = useState(false);

  // Extract images from API structure
  const images =
    product?.image?.map((img: any) => img.optimized_url || img.url) || [];
  const price = product?.finalPrice || product?.price || 0;
  const originalPrice = product?.price || 0;
  const discountValue = product?.discountValue || 0;
  const inStock = product?.inStock ?? true;

  const handleAddToCart = () => {
    alert(
      `Added ${quantity} ${product?.name} to cart!\nColor: ${selectedColor}${
        selectedSize ? `\nSize: ${selectedSize}` : ""
      }`,
    );
  };

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in purchasing:\n*${product?.name}*\nColor: ${selectedColor}${
      selectedSize ? `\nSize: ${selectedSize}` : ""
    }\nQuantity: ${quantity}\n\nPlease let me know the availability.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

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

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Client Component for Interactive Parts */}
          <ProductImageGallery
            images={images}
            discount={discountValue}
            discountType={product?.discountType}
            productName={product?.name || "Product"}
          />

          {/* Product Info - Client Side now (same design) */}
          <div className="space-y-6">
            {/* Title & Category */}
            <div>
              {product?.category?.name && (
                <p className="text-sm text-colorTextBody/60 mb-2">
                  {product.category.name}
                </p>
              )}
              <h1 className="text-3xl lg:text-4xl font-bold text-colorTextBody mb-3">
                {product?.name}
              </h1>

              {/* Brand */}
              {product?.brand && (
                <p className="text-sm text-colorTextBody/60">
                  Brand:{" "}
                  <span className="font-medium text-colorTextBody">
                    {product.brand}
                  </span>
                </p>
              )}

              {/* Rating */}
              {product?.rating > 0 && (
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
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
                  <span className="text-sm text-colorTextBody/60">
                    ({product.rating} stars • {product.totalReviews || 0}{" "}
                    reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-colorTextBody">
                ৳ {price.toLocaleString("en-BD")}
              </span>
              {discountValue > 0 && (
                <>
                  <span className="text-xl text-colorTextBody/40 line-through">
                    ৳ {originalPrice.toLocaleString("en-BD")}
                  </span>
                  <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                    Save {discountValue}%
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            {product?.shortDescription && (
              <div className="bg-colorBodyDim/50  rounded-lg">
                <p className="text-colorTextBody font-medium">
                  {product.shortDescription}
                </p>
              </div>
            )}

            {/* Description */}
            {product?.description && (
              <div className="border-t border-colorBorder pt-6">
                <h3 className="font-semibold text-colorTextBody mb-2">
                  Description
                </h3>
                <p className="text-colorTextBody/80 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Product Details */}
            <div className="border-t border-colorBorder pt-6 space-y-3">
              <h3 className="font-semibold text-colorTextBody mb-4">
                Product Details
              </h3>

              {product?.sku && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-colorTextBody/60">SKU:</span>
                  <span className="text-colorTextBody font-medium">
                    {product.sku}
                  </span>
                </div>
              )}

              {product?.category?.name && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-colorTextBody/60">Category:</span>
                  <span className="text-colorTextBody font-medium">
                    {product.category.name}
                  </span>
                </div>
              )}

              {product?.stock !== undefined && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-colorTextBody/60">Stock:</span>
                  <span className="text-colorTextBody font-medium">
                    {product.stock} units available
                  </span>
                </div>
              )}

              {/* tag  */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-colorTextBody/60">Status:</span>
                <div className="flex items-center gap-2">
                  {product?.isNew && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      New
                    </span>
                  )}
                  {product?.isSale && (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                      Sale
                    </span>
                  )}
                  {product?.isLimited && (
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                      Limited
                    </span>
                  )}
                  {product?.isHot && (
                    <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">
                      Hot
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Color Selection */}
            {product?.color?.length > 0 && (
              <div>
                <h3 className="font-semibold text-colorTextBody mb-3 text-sm">
                  Color:{" "}
                  <span className="font-normal text-colorTextBody/70">
                    {selectedColor}
                  </span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.color.map((col: string) => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      className={`px-3 py-1.5 rounded-lg border-2 transition-all text-sm ${
                        selectedColor === col
                          ? "border-colorBtnPrimary bg-colorBtnPrimary/10 text-colorBtnPrimary font-medium"
                          : "border-colorBorder hover:border-colorBtnPrimary/50 text-colorTextBody"
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product?.size?.length > 0 && (
              <div>
                <h3 className="font-semibold text-colorTextBody mb-3 text-sm">
                  Size:{" "}
                  <span className="font-normal text-colorTextBody/70">
                    {selectedSize}
                  </span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.size.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded-lg border-2 transition-all text-sm min-w-17.5 ${
                        selectedSize === size
                          ? "border-colorBtnPrimary bg-colorBtnPrimary/10 text-colorBtnPrimary font-medium"
                          : "border-colorBorder hover:border-colorBtnPrimary/50 text-colorTextBody"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex justify-between items-center">
              <div className="flex items-center border border-colorBorder rounded-lg w-fit">
                <button
                  onClick={decrementQuantity}
                  disabled={!inStock}
                  className="px-4 py-2.5 hover:bg-colorBodyDim transition-colors disabled:opacity-50 rounded-l-lg"
                  aria-label="Decrease"
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

                <span className="px-6 py-2.5 font-semibold text-colorTextBody min-w-15 text-center border-x border-colorBorder">
                  {quantity}
                </span>

                <button
                  onClick={incrementQuantity}
                  disabled={!inStock}
                  className="px-4 py-2.5 hover:bg-colorBodyDim transition-colors disabled:opacity-50 rounded-r-lg"
                  aria-label="Increase"
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
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-colorTextBody text-sm">
                  Quantity
                </h3>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    inStock
                      ? "text-green-700 bg-green-100"
                      : "text-red-700 bg-red-100"
                  }`}
                >
                  {inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between ">
              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`w-full py-4 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                  inStock
                    ? "bg-colorBtnPrimary text-colorBtnPrimaryText hover:bg-colorBtnPrimary/90 active:scale-95"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {inStock ? "Add to Cart" : "Out of Stock"}
              </button>

              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsApp}
                className="w-full py-4 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2  text-black hover:bg-[#1ebe57] active:scale-95  bg-green-800"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="green">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Order via WhatsApp
              </button>
            </div>

            {/* Delivery Info */}
            <div className="border-t border-colorBorder pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-colorBodyDim rounded-lg">
                  <svg
                    className="w-6 h-6 text-colorBtnPrimary shrink-0 mt-1"
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
                    <h4 className="font-semibold text-colorTextBody text-sm mb-1">
                      Free Delivery
                    </h4>
                    <p className="text-xs text-colorTextBody/60">
                      On orders over ৳5000
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-colorBodyDim rounded-lg">
                  <svg
                    className="w-6 h-6 text-colorBtnPrimary shrink-0 mt-1"
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
                    <h4 className="font-semibold text-colorTextBody text-sm mb-1">
                      Secure Payment
                    </h4>
                    <p className="text-xs text-colorTextBody/60">
                      100% secure transaction
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-colorTextBody">
                Related Products
              </h2>

              {/* ✅ if your shop uses category id param now */}
              <Link
                href={`/allcollection?category=${product?.category?._id}`}
                className="text-colorLink hover:underline text-sm"
              >
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct: any) => (
                <CollectionProductCard
                  key={relatedProduct._id || relatedProduct.slug}
                  productData={relatedProduct}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
