"use client";

import { useState, useRef, useCallback } from "react";
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
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }, []);

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => {
    setIsZoomed(false);
    setZoomPos({ x: 50, y: 50 });
  };

  const handleImageClick = () => setLightboxOpen(true);

  const currentImage = images[selectedImage] || "/placeholder.jpg";

  return (
    <div className="space-y-3">
      {/* Main Image with Zoom */}
      <div
        ref={imageRef}
        className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#f7f7f5] cursor-zoom-in select-none"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleImageClick}
      >
        {/* Main image — zooms on hover */}
        <div
          className="absolute inset-0 transition-transform duration-100"
          style={{
            transform: isZoomed ? "scale(2)" : "scale(1)",
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
          }}
        >
          <Image
            src={currentImage}
            alt={productName}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Zoom icon hint */}
        <div
          className={`absolute bottom-3 right-3 bg-black/50 text-white p-1.5 rounded-full transition-opacity duration-200 ${
            isZoomed ? "opacity-0" : "opacity-100"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
            />
          </svg>
        </div>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow z-10">
            -{discountType === "percentage" ? `${discount}%` : `${discount} Tk`}
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-3 left-3 p-2 bg-white/90 hover:bg-white rounded-full shadow transition-all group z-10"
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

        {/* Zoom label */}
        {isZoomed && (
          <div className="absolute inset-0 pointer-events-none z-20 flex items-start justify-end pt-3 pr-3">
            <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-full">
              Zoomed
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img: string, idx: number) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`relative shrink-0 w-18 h-18 rounded-xl overflow-hidden border-2 transition-all ${
                selectedImage === idx
                  ? "border-[#111111] ring-2 ring-[#111111]/20 scale-105"
                  : "border-[#e8e8e1] hover:border-[#111111]/50"
              }`}
              style={{ width: 72, height: 72 }}
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

      {/* Lightbox Modal (click করলে full screen দেখাবে) */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/40 p-2 rounded-full transition-all"
            onClick={() => setLightboxOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              className="absolute left-4 text-white bg-white/20 hover:bg-white/40 p-3 rounded-full transition-all"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Full image */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedImage] || "/placeholder.jpg"}
              alt={productName}
              fill
              className="object-contain"
            />
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              className="absolute right-4 text-white bg-white/20 hover:bg-white/40 p-3 rounded-full transition-all"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/40 px-3 py-1 rounded-full">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
