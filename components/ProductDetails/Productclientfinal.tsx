"use client";

import { useState } from "react";
import Image from "next/image";

// Image Gallery Component - Self contained with wishlist
export function ProductImageGallery({
  images,
  discount,
  productName,
  colors,
  sizes,
  inStock,
}: {
  images: string[];
  discount: number;
  productName: string;
  colors: string[];
  sizes: string[];
  inStock: boolean;
}) {
  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToWishlist = () => {
    console.log("Add to wishlist");
    alert(`Added ${productName} to wishlist!`);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square rounded-lg overflow-hidden bg-colorBodyDim">
        <Image
          src={images[selectedImage] || "/placeholder.jpg"}
          alt={productName}
          fill
          className="object-cover"
          priority
        />
        {discount > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            -{discount}%
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleAddToWishlist}
          className="absolute top-4 left-4 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all group"
          aria-label="Add to wishlist"
        >
          <svg
            className="w-6 h-6 text-gray-600 group-hover:text-red-500 transition-colors"
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

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((img: string, idx: number) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === idx
                  ? "border-colorBtnPrimary ring-2 ring-colorBtnPrimary/20"
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

// Actions Component - Selections and cart/buy
export function ProductActions({
  colors,
  sizes,
  inStock,
  productName,
}: {
  colors: string[];
  sizes: string[];
  inStock: boolean;
  productName: string;
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(colors[0] || "");
  const [selectedSize, setSelectedSize] = useState(sizes[0] || "");

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    console.log("Add to cart:", {
      quantity,
      color: selectedColor,
      size: selectedSize,
    });
    alert(
      `Added ${quantity} ${productName} to cart!\nColor: ${selectedColor}${selectedSize ? `\nSize: ${selectedSize}` : ""}`,
    );
  };

  const handleBuyNow = () => {
    console.log("Buy now:", {
      quantity,
      color: selectedColor,
      size: selectedSize,
    });
    alert("Redirecting to checkout...");
  };

  return (
    <>
      {/* Color Selection */}
      {colors.length > 0 && (
        <div className="border-t border-colorBorder pt-6">
          <h3 className="font-semibold text-colorTextBody mb-3">
            Color:{" "}
            <span className="font-normal text-colorTextBody/70">
              {selectedColor}
            </span>
          </h3>
          <div className="flex flex-wrap gap-3">
            {colors.map((color: string) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  selectedColor === color
                    ? "border-colorBtnPrimary bg-colorBtnPrimary/10 text-colorBtnPrimary font-medium"
                    : "border-colorBorder hover:border-colorBtnPrimary/50 text-colorTextBody"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {sizes.length > 0 && (
        <div className="border-t border-colorBorder pt-6">
          <h3 className="font-semibold text-colorTextBody mb-3">
            Size:{" "}
            <span className="font-normal text-colorTextBody/70">
              {selectedSize}
            </span>
          </h3>
          <div className="flex flex-wrap gap-3">
            {sizes.map((size: string) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-lg border-2 transition-all min-w-20 ${
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

      {/* Quantity & Actions */}
      <div className="border-t border-colorBorder pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-colorTextBody">Quantity</h3>
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full ${
              inStock
                ? "text-green-700 bg-green-100"
                : "text-red-700 bg-red-100"
            }`}
          >
            {inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center border border-colorBorder rounded-lg">
            <button
              onClick={decrementQuantity}
              className="px-4 py-2 hover:bg-colorBodyDim transition-colors disabled:opacity-50"
              disabled={!inStock}
              aria-label="Decrease quantity"
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
            <span className="px-6 py-2 font-semibold text-colorTextBody min-w-15 text-center">
              {quantity}
            </span>
            <button
              onClick={incrementQuantity}
              className="px-4 py-2 hover:bg-colorBodyDim transition-colors disabled:opacity-50"
              disabled={!inStock}
              aria-label="Increase quantity"
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

          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
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
        </div>

        {/* Buy Now Button */}
        {inStock && (
          <button
            onClick={handleBuyNow}
            className="w-full py-3 px-6 rounded-lg font-semibold transition-all border-2 border-colorBtnPrimary text-colorBtnPrimary hover:bg-colorBtnPrimary hover:text-colorBtnPrimaryText active:scale-95"
          >
            Buy Now
          </button>
        )}
      </div>
    </>
  );
}
