"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Props = {
  images?: string[];
  intervalMs?: number; // total time per slide
};

export default function HeroBgSliderClient({
  images = ["/images/cover.webp", "/images/cover2.webp", "/images/cover3.webp"],
  intervalMs = 9000,
}: Props) {
  const list = useMemo(() => images.filter(Boolean), [images]);

  const [active, setActive] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [run, setRun] = useState(false);

  const next = list.length ? (active + 1) % list.length : 0;

  useEffect(() => {
    if (list.length <= 1) return;
    //  start zoom animation after mount
    const raf = requestAnimationFrame(() => setRun(true));

    //  slower crossfade
    const fadeDuration = 3600; // 2.6s fade
    const fadeStart = Math.max(0, intervalMs - fadeDuration);

    const t1 = window.setTimeout(() => setShowNext(true), fadeStart);

    const t2 = window.setTimeout(() => {
      setActive(next);
      setShowNext(false);

      // restart zoom for the next slide
      setRun(false);
      requestAnimationFrame(() => setRun(true));
    }, intervalMs);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [active, intervalMs, list.length, next]);

  if (!list.length) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* ACTIVE slide (slow zoom out) */}
      <div
        className={`absolute inset-0 will-change-transform transition-transform duration-9000 ease-out ${
          run ? "scale-100" : "scale-110"
        }`}
      >
        <Image
          src={list[active]}
          alt="Hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={100}
        />
      </div>

      {/* NEXT slide (slow fade in while also zooming) */}
      {list.length > 1 && (
        <div
          className={`absolute inset-0 will-change-opacity transition-opacity duration-3600 ease-in-out ${
            showNext ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`absolute inset-0 will-change-transform transition-transform duration-9000 ease-out ${
              showNext ? "scale-100" : "scale-110"
            }`}
          >
            <Image
              src={list[next]}
              alt="Hero background next"
              fill
              sizes="100vw"
              className="object-cover"
              quality={100}
            />
          </div>
        </div>
      )}
    </div>
  );
}
