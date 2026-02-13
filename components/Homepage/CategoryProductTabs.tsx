import { products } from "@/data/data";
import Image from "next/image";
import Link from "next/link";

export default function ProductGridSection() {
  const categories = [
    "All",
    "Bedding Solutions",
    "Multipurpose Shelf",
    "Alna",
    "Laptop Table & Stool",
    "Oven Shelf",
    "Stool",
  ];

  // Varied size pattern for interesting layout
  const getSizeClass = (index: number) => {
    const pattern = index % 7;
    switch (pattern) {
      case 0:
        return "col-span-1 row-span-2"; // Tall left
      case 1:
        return "col-span-1 row-span-1"; // Small right top
      case 2:
        return "col-span-1 row-span-1"; // Small right bottom
      case 3:
        return "col-span-1 row-span-1"; // Wide full
      case 4:
        return "col-span-1 row-span-1"; // Small left
      case 5:
        return "col-span-1 row-span-2"; // Tall right
      case 6:
        return "col-span-2 row-span-1"; // Wide full
      case 7:
        return "col-span-1 row-span-1"; // Small
      default:
        return "col-span-1 row-span-1";
    }
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
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all ${
                index === 0
                  ? "bg-gray-900 text-colorBtnPrimaryText shadow-md"
                  : "bg-colorBtnPrimaryText text-colorBtnPrimaryDim hover:bg-colorBtnPrimaryText/60 border border-colorBtnPrimary/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Dense Grid - No Empty Spaces */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 auto-rows-[300px] grid-flow-dense">
          {products.slice(0, 12).map((product, index) => (
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
                      ৳{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm line-through text-colorInputBgDark">
                        ৳{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    -{product.discount}%
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
