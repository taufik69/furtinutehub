"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { colors } from "@/data/data";
import CollectionProductCard from "@/components/commonComponents/Productcardupdated";

const DEFAULT_MAX = 100000;

export default function ShopPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // API data
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // State for filters - synced with URL
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("name") || "",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "",
  );
  const [selectedColor, setSelectedColor] = useState(
    searchParams.get("color") || "",
  );
  const [priceRange, setPriceRange] = useState({
    min: Number(searchParams.get("minPrice")) || 0,
    max: Number(searchParams.get("maxPrice")) || DEFAULT_MAX,
  });
  const [selectedAvailability, setSelectedAvailability] = useState(
    searchParams.get("availability") || "",
  );
  const [minRating, setMinRating] = useState(
    Number(searchParams.get("rating")) || 0,
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "featured");

  // Search history
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Mobile filters toggle
  const [showFilters, setShowFilters] = useState(false);

  // Load search history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("searchHistory");
    if (saved) setSearchHistory(JSON.parse(saved));
  }, []);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories/get-category`,
          { cache: "no-store" },
        );
        const data = await response.json();
        setCategories(data?.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products with query params
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      // Add all query params
      if (searchQuery) params.set("name", searchQuery);
      if (selectedCategory) params.set("category", selectedCategory);
      if (selectedColor) params.set("color", selectedColor);
      if (priceRange.min > 0) params.set("minPrice", priceRange.min.toString());
      if (priceRange.max < DEFAULT_MAX)
        params.set("maxPrice", priceRange.max.toString());

      // Availability - convert to boolean params
      // Availability - only send the selected one as true
      if (selectedAvailability === "in-stock") {
        params.set("inStock", "true");
      } else if (selectedAvailability === "limited") {
        params.set("isLimited", "true");
      } else if (selectedAvailability === "out-of-stock") {
        params.set("outOfStock", "true");
      }

      if (minRating > 0) params.set("rating", minRating.toString());

      // Sorting - convert to boolean params
      if (sortBy === "price-low") params.set("lowToHigh", "true");
      else if (sortBy === "price-high") params.set("highToLow", "true");
      else if (sortBy === "newest") params.set("newest", "true");
      else if (sortBy === "oldest") params.set("oldest", "true");

      const url = `${process.env.NEXT_PUBLIC_API_URL}/product/get-products${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      const response = await fetch(url, { cache: "no-store" });
      const data = await response.json();

      setProducts(data?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // Immediate fetch for non-search filters
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedCategory,
    selectedColor,
    priceRange.min,
    priceRange.max,
    selectedAvailability,
    minRating,
    sortBy,
  ]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery) params.set("name", searchQuery);
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedColor) params.set("color", selectedColor);
    if (priceRange.min > 0) params.set("minPrice", priceRange.min.toString());
    if (priceRange.max < DEFAULT_MAX)
      params.set("maxPrice", priceRange.max.toString());
    if (selectedAvailability) params.set("availability", selectedAvailability);
    if (minRating > 0) params.set("rating", minRating.toString());
    if (sortBy !== "featured") params.set("sort", sortBy);

    const queryString = params.toString();
    router.replace(`/allcollection${queryString ? `?${queryString}` : ""}`, {
      scroll: false,
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedColor,
    priceRange.min,
    priceRange.max,
    selectedAvailability,
    minRating,
    sortBy,
    router,
  ]);

  // Handle search with history
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query && !searchHistory.includes(query)) {
      const newHistory = [query, ...searchHistory].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    }
    setShowHistory(false);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedColor("");
    setPriceRange({ min: 0, max: DEFAULT_MAX });
    setSelectedAvailability("");
    setMinRating(0);
    setSortBy("featured");
  };

  // Count active filters
  const activeFiltersCount =
    (selectedCategory ? 1 : 0) +
    (selectedColor ? 1 : 0) +
    (selectedAvailability ? 1 : 0) +
    (priceRange.min > 0 || priceRange.max < DEFAULT_MAX ? 1 : 0) +
    (minRating > 0 ? 1 : 0);

  return (
    <div className="min-h-screen bg-colorBody">
      {/* Top Search Section */}
      <div className="bg-colorBodyDim/60 border-b border-colorBorder ">
        <div className="container mx-auto px-4 py-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for furniture..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowHistory(true)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-colorBorder bg-colorInputBg text-colorInputText focus:outline-none focus:ring-1 focus:ring-colorBtnPrimary/20"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-colorTextBody/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Search History Dropdown */}
            {showHistory && searchHistory.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-colorBody border border-colorBorder rounded-lg shadow-lg overflow-hidden z-50">
                <div className="p-2 border-b border-colorBorder flex items-center justify-between">
                  <span className="text-sm text-colorTextBody/60 font-medium">
                    Recent Searches
                  </span>
                  <button
                    onClick={() => {
                      setSearchHistory([]);
                      localStorage.removeItem("searchHistory");
                    }}
                    className="text-xs text-colorTextBody/40 hover:text-colorTextBody"
                  >
                    Clear
                  </button>
                </div>
                {searchHistory.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(item)}
                    className="w-full px-4 py-2 text-left text-sm text-colorTextBody hover:bg-colorBodyDim transition-colors flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4 text-colorTextBody/40"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filter Summary */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-colorBtnPrimary text-colorBtnPrimaryText rounded-lg"
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
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
                Filters
                {activeFiltersCount > 0 && (
                  <span className="bg-colorCartDot text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <span className="text-sm text-colorTextBody/60">
                {loading ? "Loading..." : `${products.length} Products Found`}
              </span>

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-colorLink hover:underline"
                >
                  Clear All Filters
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg  bg-colorInputBg text-colorInputText focus:outline-none "
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`
            ${showFilters ? "fixed inset-0 z-50 bg-colorBody" : "hidden"}
            lg:block lg:sticky lg:top-24 lg:w-64 lg:h-fit lg:shrink-0
          `}
          >
            <div className="bg-colorBody lg:bg-transparent p-6 lg:p-0 h-full overflow-y-auto">
              {/* Mobile Close Button */}
              <div className="lg:hidden flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-colorTextBody">
                  Filters
                </h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-colorBodyDim rounded-lg"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-colorTextBody mb-4 flex items-center gap-2">
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
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category.id}
                        onChange={() => setSelectedCategory(category.id)}
                        className="w-4 h-4 border-colorBorder text-colorBtnPrimary focus:ring-colorBtnPrimary/20"
                      />
                      <span className="text-sm text-colorTextBody group-hover:text-colorLink">
                        {category.name}
                      </span>
                    </label>
                  ))}
                  {selectedCategory && (
                    <button
                      onClick={() => setSelectedCategory("")}
                      className="text-xs text-colorLink hover:underline ml-7"
                    >
                      Clear category
                    </button>
                  )}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-colorTextBody mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="green"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Price Range
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-colorTextBody/60 mb-1 block">
                      Min: ৳ {priceRange.min.toLocaleString("en-BD")}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max={DEFAULT_MAX}
                      step="1000"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          min: Number(e.target.value),
                        }))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-colorCartDot"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-colorTextBody/60 mb-1 block">
                      Max: ৳ {priceRange.max.toLocaleString("en-BD")}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max={DEFAULT_MAX}
                      step="1000"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          max: Number(e.target.value),
                        }))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-colorCartDot"
                    />
                  </div>
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-colorTextBody mb-4 flex items-center gap-2">
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
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                  Colors
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {colors.map((color) => (
                    <label
                      key={color}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="color"
                        checked={selectedColor === color}
                        onChange={() => setSelectedColor(color)}
                        className="w-4 h-4 border-colorBorder text-colorBtnPrimary focus:ring-colorBtnPrimary/20"
                      />
                      <span className="text-sm text-colorTextBody group-hover:text-colorLink">
                        {color}
                      </span>
                    </label>
                  ))}
                  {selectedColor && (
                    <button
                      onClick={() => setSelectedColor("")}
                      className="text-xs text-colorLink hover:underline ml-7"
                    >
                      Clear color
                    </button>
                  )}
                </div>
              </div>

              {/* Availability Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-colorTextBody mb-4 flex items-center gap-2">
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
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                  Availability
                </h3>
                <div className="space-y-2">
                  {["in-stock", "limited", "out-of-stock"].map((status) => (
                    <label
                      key={status}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="availability"
                        checked={selectedAvailability === status}
                        onChange={() => setSelectedAvailability(status)}
                        className="w-4 h-4 border-colorBorder text-colorBtnPrimary focus:ring-colorBtnPrimary/20"
                      />
                      <span className="text-sm text-colorTextBody group-hover:text-colorLink capitalize">
                        {status.replace("-", " ")}
                      </span>
                    </label>
                  ))}
                  {selectedAvailability && (
                    <button
                      onClick={() => setSelectedAvailability("")}
                      className="text-xs text-colorLink hover:underline ml-7"
                    >
                      Clear availability
                    </button>
                  )}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-colorTextBody mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  Minimum Rating
                </h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="rating"
                        checked={minRating === rating}
                        onChange={() => setMinRating(rating)}
                        className="w-4 h-4 border-colorBorder text-colorBtnPrimary focus:ring-colorBtnPrimary/20"
                      />
                      <div className="flex items-center gap-1">
                        {Array.from({ length: rating }).map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-yellow-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                        <span className="text-sm text-colorTextBody/60 ml-1">
                          & Up
                        </span>
                      </div>
                    </label>
                  ))}
                  {minRating > 0 && (
                    <button
                      onClick={() => setMinRating(0)}
                      className="text-xs text-colorLink hover:underline ml-7"
                    >
                      Clear rating
                    </button>
                  )}
                </div>
              </div>

              {/* Mobile Apply Button */}
              <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-colorBody border-t border-colorBorder">
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full bg-colorBtnPrimary text-colorBtnPrimaryText py-3 rounded-lg font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-72 rounded bg-gray-200 animate-pulse"
                  />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product: any) => (
                  <CollectionProductCard
                    key={product._id || product.slug}
                    productData={product}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <svg
                  className="w-24 h-24 mx-auto text-colorTextBody/20 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-colorTextBody mb-2">
                  No products found
                </h3>
                <p className="text-colorTextBody/60 mb-4">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={clearAllFilters}
                  className="text-colorLink hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
