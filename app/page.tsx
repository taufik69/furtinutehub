import BestSelling from "@/components/Homepage/BestSelling";
import HeroBanner from "@/components/Homepage/Herobanner";
import NewArrival from "@/components/Homepage/NewArrival";
import ShopByCategory from "@/components/Homepage/Shopbycategory";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroBanner />

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
    </main>
  );
}
