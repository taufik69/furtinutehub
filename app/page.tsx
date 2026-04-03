import HeroBanner from "@/components/Homepage/Herobanner";
import { getBanners } from "@/app/api/api";
import dynamic from "next/dynamic";
const BestSelling = dynamic(() => import("@/components/Homepage/BestSelling"));
const ProductGridSection = dynamic(
  () => import("@/components/Homepage/CategoryProductTabs"),
);

const CustomerFeedback = dynamic(
  () => import("@/components/Homepage/CustomerFeedback"),
);

const NewArrival = dynamic(() => import("@/components/Homepage/NewArrival"));

const ServicesSection = dynamic(
  () => import("@/components/Homepage/ServicesSection"),
);

const ShopByCategory = dynamic(
  () => import("@/components/Homepage/Shopbycategory"),
);

export default async function HomePage() {
  const banners = await getBanners();

  return (
    <main className="min-h-screen">
      <HeroBanner title="Modern Furniture" images={banners} />

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
