"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroContentClient({ title }: { title: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative z-10 h-full flex items-center justify-center">
      <div className="text-center px-4 max-w-4xl mx-auto">
        <h1
          className={`text-colorHeroText font-bold text-5xl md:text-7xl lg:text-8xl mb-4 transition-all duration-1000 delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {title || "Modern Furniture"}
        </h1>

        <p
          className={`text-colorHeroText text-lg md:text-xl lg:text-2xl tracking-[0.3em] mb-8 transition-all duration-1000 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          FOR A BETTER WAY TO WORK
        </p>

        <Link
          href="/allcollection"
          className={`bg-transparent border-2 border-colorHeroText text-colorHeroText px-10 py-3 text-sm tracking-wider hover:bg-colorHeroText hover:text-colorBtnPrimaryText transition-all duration-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "700ms" }}
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}
