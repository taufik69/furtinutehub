import ShopByCategorySwipper from "../commonComponents/Categoryswipper";

async function getCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/get-category`,
    { cache: "no-store" },
  );

  console.log(res);
  if (!res.ok) throw new Error("Failed to fetch categories");

  const data = await res.json();

  return data.data;
}

export default async function ShopByCategory() {
  const categories = await getCategories();

  return (
    <section className="bg-colorBody">
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
