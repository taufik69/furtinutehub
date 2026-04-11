import HeroBanner from "@/components/Homepage/Herobanner";
import { getBanners } from "@/app/api/api";
import dynamic from "next/dynamic";
const BestSelling = dynamic(() => import("@/components/Homepage/BestSelling"), {
  loading: () => <SectionSkeleton />,
});
const ProductGridSection = dynamic(
  () => import("@/components/Homepage/CategoryProductTabs"),
  { loading: () => <SectionSkeleton /> },
);

const CustomerFeedback = dynamic(
  () => import("@/components/Homepage/CustomerFeedback"),
  { loading: () => <SectionSkeleton /> },
);

const NewArrival = dynamic(() => import("@/components/Homepage/NewArrival"), {
  loading: () => <SectionSkeleton />,
});

const ServicesSection = dynamic(
  () => import("@/components/Homepage/ServicesSection"),
  { loading: () => <SectionSkeleton /> },
);

const ShopByCategory = dynamic(
  () => import("@/components/Homepage/Shopbycategory"),
  { loading: () => <SectionSkeleton /> },
);

function SectionSkeleton() {
  return (
    <div className="w-full py-16 animate-pulse px-4 sm:px-6 lg:px-8">
      <div className="h-8 w-48 bg-gray-200 rounded mb-6 mx-auto"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-64 bg-gray-100 rounded-xl"></div>
        ))}
      </div>
    </div>
  );
}

export default async function HomePage() {
  const banners = await getBanners();
  

  return (
    <main className="min-h-screen">
      <HeroBanner banners={banners} />

      {/* Rest of your page content */}
      <section className="py-12 sm:py-16 lg:py-20 ">
        <ShopByCategory />
      </section>
      <section className="py-4 sm:py-4 lg:py-1 ">
        <BestSelling />
      </section>
      <section className="py-4 sm:py-4 lg:py-25 ">
        <NewArrival />
      </section>

      <section>
        <ProductGridSection />
      </section>

      <section>
        <ServicesSection />
      </section>
      <section>
        <CustomerFeedback />
      </section>
    </main>
  );
}
