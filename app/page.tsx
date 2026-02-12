import HeroBanner from "@/components/Homepage/Herobanner";
import ShopByCategory from "@/components/Homepage/Shopbycategory";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroBanner />

      {/* Rest of your page content */}
      <section className="">
        <ShopByCategory />
      </section>
    </main>
  );
}
