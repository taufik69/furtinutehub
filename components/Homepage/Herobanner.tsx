import Navbar from "./Navbar";
import HeroBgClient from "./HeroBgClient";
import HeroContentClient from "./HeroContentClient";

export default function HeroBanner({ title }: { title: string }) {
  return (
    <div className="relative w-full">
      <div className="relative h-[75vh] w-full overflow-hidden">
        {/* Background Zoom (Client) */}
        <HeroBgClient />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content animation (Client) */}
        <HeroContentClient title={title} />
      </div>
    </div>
  );
}
