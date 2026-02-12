import { CategoryCardProps } from "@/types/types";
import ShopByCategorySwipper from "../commonComponents/Categoryswipper";

const categories: CategoryCardProps[] = [
  {
    id: 1,
    title: "Living Room",
    imageUrl: "/images/easychair.webp",
    href: "/category/living-room",
  },
  {
    id: 2,
    title: "Bedroom",
    imageUrl: "/images/officedesk.webp",
    href: "/category/bedroom",
  },
  {
    id: 3,
    title: "Dining Room",
    imageUrl: "/images/sofa.webp",
    href: "/category/dining-room",
  },
  {
    id: 4,
    title: "Office",
    imageUrl: "/images/bed.webp",
    href: "/category/office",
  },
  {
    id: 5,
    title: "Outdoor",
    imageUrl: "/images/homeDecoram.webp",
    href: "/category/outdoor",
  },
  {
    id: 6,
    title: "Kitchen",
    imageUrl: "/images/desk.webp",
    href: "/category/kitchen",
  },
];

export default function ShopByCategory() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-colorBody">
      <div className="container mx-auto px-4 sm:px-2 lg:px-0">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-colorTextBody mb-3 sm:mb-4">
            Shop by Category
          </h2>
          <p className="text-colorTextBody/70 text-base sm:text-lg max-w-2xl mx-auto">
            Discover our curated collection of modern furniture for every room
            in your home
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6 sm:gap-8 lg:gap-10">
          <ShopByCategorySwipper categories={categories} />
        </div>
      </div>
    </section>
  );
}
