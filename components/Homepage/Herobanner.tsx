import HeroBgClient from "./HeroBgClient";
import HeroContentClient from "./HeroContentClient";

// Fallback static images if no banners from API
const FALLBACK_IMAGES = [
  "/images/cover.webp",
  "/images/cover2.webp",
  "/images/cover3.webp",
];

interface HeroBannerProps {
  title: string;
  images?: string[];
}

export default function HeroBanner({ title, images }: HeroBannerProps) {
  // Use provided images or fallback to static
  const bannerImages =
    images && images.length > 0 ? images : FALLBACK_IMAGES;

  return (
    <div className="relative w-full">
      <div className="relative h-[75vh] w-full overflow-hidden">
        {/* Background Zoom (Client) */}
        <HeroBgClient images={bannerImages} />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content animation (Client) */}
        <HeroContentClient title={title} />
      </div>
    </div>
  );
}
