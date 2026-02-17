"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const DEFAULT_LIMIT = 12;

export default function ProductGridSection() {
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);
  const [loadingCats, setLoadingCats] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Varied size pattern for interesting layout (unchanged)
  const getSizeClass = (index: number) => {
    const pattern = index % 7;
    switch (pattern) {
      case 0:
        return "col-span-1 row-span-2";
      case 1:
        return "col-span-1 row-span-1";
      case 2:
        return "col-span-1 row-span-1";
      case 3:
        return "col-span-1 row-span-1";
      case 4:
        return "col-span-1 row-span-1";
      case 5:
        return "col-span-1 row-span-2";
      case 6:
        return "col-span-2 row-span-1";
      default:
        return "col-span-1 row-span-1";
    }
  };

  // 1) Fetch categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      setLoadingCats(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories/get-category`,
          { cache: "no-store" },
        );
        const json = await res.json();
        const list = json?.data || [];

        setCategories(list);

        //  default active first category
        if (list?.length > 0) {
          setActiveCategoryId(list[0]?._id || list[0]?.id || "");
        }
      } catch (e) {
        console.error("categories fetch failed", e);
        setCategories([]);
      } finally {
        setLoadingCats(false);
      }
    };

    loadCategories();
  }, []);

  // 2) Fetch products by active category
  useEffect(() => {
    const loadProducts = async () => {
      if (!activeCategoryId) return;

      setLoadingProducts(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/product/get-products?category=${activeCategoryId}`,
          { cache: "no-store" },
        );
        const json = await res.json();
        const list = json?.data || [];

        setProducts(list);
      } catch (e) {
        console.error("products fetch failed", e);
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    loadProducts();
  }, [activeCategoryId]);

  // 3) Map API product -> UI fields (design untouched)
  const uiProducts = useMemo(() => {
    return (products || []).slice(0, DEFAULT_LIMIT).map((p: any) => {
      const price = Number(p?.finalPrice ?? p?.price ?? 0);
      const originalPrice =
        Number(p?.discountValue ?? 0) > 0 ? Number(p?.price ?? 0) : undefined;

      const discount =
        Number(p?.discountValue ?? 0) > 0 && p?.discountType === "percentage"
          ? Number(p?.discountValue)
          : undefined;

      return {
        id: p?._id || p?.slug,
        slug: p?.slug,
        name: p?.name,
        description: p?.shortDescription ?? p?.description ?? "",
        image:
          p?.image?.[0]?.optimized_url ||
          p?.image?.[0]?.url ||
          "/images/cover.webp",
        price,
        originalPrice,
        discount,
      };
    });
  }, [products]);

  // handleCategoryShow
  const handleCategoryShow = (categoryId: string) => {
    setActiveCategoryId(categoryId);
  };

  return (
    <section className="py-12 bg-colorBodyDim/20">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-colorBtnPrimary mb-8">
          More ideas and inspiration
        </h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {loadingCats ? (
            <div className="text-sm text-colorTextBody/60">Loading...</div>
          ) : (
            categories.map((category: any, index: number) => {
              const id = category?._id || category?.id;
              const isActive = id === activeCategoryId;

              return (
                <button
                  onClick={() => handleCategoryShow(id)}
                  key={id || index}
                  className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all ${
                    isActive
                      ? "bg-gray-900 text-colorBtnPrimaryText shadow-md"
                      : "bg-colorBtnPrimaryText text-colorBtnPrimaryDim hover:bg-colorBtnPrimaryText/60 border border-colorBtnPrimary/10"
                  }`}
                >
                  {category?.name}
                </button>
              );
            })
          )}
        </div>

        {/* Dense Grid - No Empty Spaces */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 auto-rows-[300px] grid-flow-dense">
          {loadingProducts
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-lg bg-colorBtnPrimaryText/60 animate-pulse ${getSizeClass(
                    i,
                  )}`}
                />
              ))
            : uiProducts.map((product: any, index: number) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className={`group relative overflow-hidden rounded-lg bg-colorBtnPrimaryText shadow-sm hover:shadow-xl transition-all duration-300 ${getSizeClass(
                    index,
                  )}`}
                >
                  {/* Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Product Info - Shows on Hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-colorBtnPrimaryText transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-colorBtnPrimaryText mb-2 line-clamp-1">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">
                          ৳{Number(product.price).toLocaleString("en-BD")}
                        </span>
                        {product.originalPrice ? (
                          <span className="text-sm line-through text-colorInputBgDark">
                            ৳
                            {Number(product.originalPrice).toLocaleString(
                              "en-BD",
                            )}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    {/* Discount Badge */}
                    {product.discount ? (
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        -{product.discount}%
                      </div>
                    ) : null}
                  </div>
                </Link>
              ))}
        </div>

        {/* Empty state */}
        {!loadingProducts && uiProducts.length === 0 ? (
          <div className="text-center text-colorTextBody/60 mt-10">
            No products found in this category.
          </div>
        ) : null}
      </div>
    </section>
  );
}
