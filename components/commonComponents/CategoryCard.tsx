import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  title: string;
  imageUrl: string;
  href: string;
}

export default function CategoryCard({
  title,
  imageUrl,
  href,
}: CategoryCardProps) {
  return (
    <Link
      href={`/allcollection?category=${href}`}
      target={"_self"}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
        {/* Image Container */}
        <div className="relative w-full aspect-3/4 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            width={400}
            loading="lazy"
            height={533}
            quality={100}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-colorBtnPrimary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Category Label */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="bg-colorBtnPrimaryText px-6 py-2.5 rounded-full text-colorBtnPrimary  hover:text-colorBtnPrimaryText shadow-lg hover:bg-colorBtnPrimaryDim/40 transition-all duration-400">
            <span className=" font-medium text-sm sm:text-base">{title}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
