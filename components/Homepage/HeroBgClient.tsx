"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Props = {
  images?: string[];
  intervalMs?: number; // total time per slide
  externalIndex?: number; // Sync with parent
};

export default function HeroBgSliderClient({
  images = ["/images/cover.webp", "/images/cover2.webp", "/images/cover3.webp"],
  intervalMs = 9000,
  externalIndex,
}: Props) {
  const list = useMemo(() => images.filter(Boolean), [images]);

  const [active, setActive] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [run, setRun] = useState(false);

  // Use external index if provided, otherwise internal
  const activeIdx = externalIndex !== undefined ? externalIndex : active;
  const next = list.length ? (activeIdx + 1) % list.length : 0;

  useEffect(() => {
    if (list.length <= 1) return;
    
    // If we're using external index, we just handle animations based on changes to that index
    if (externalIndex !== undefined) {
      setActive(externalIndex);
      // Restart zoom for the new slide
      setRun(false);
      const raf = requestAnimationFrame(() => setRun(true));
      
      const fadeDuration = 3600;
      const fadeStart = Math.max(0, intervalMs - fadeDuration);
      
      setShowNext(false);
      const t1 = window.setTimeout(() => setShowNext(true), fadeStart);
      
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(t1);
      };
    }

    // Original internal interval logic for backward compatibility or standalone use
    const raf = requestAnimationFrame(() => setRun(true));
    const fadeDuration = 3600;
    const fadeStart = Math.max(0, intervalMs - fadeDuration);
    const t1 = window.setTimeout(() => setShowNext(true), fadeStart);
    const t2 = window.setTimeout(() => {
      setActive(next);
      setShowNext(false);
      setRun(false);
      requestAnimationFrame(() => setRun(true));
    }, intervalMs);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [activeIdx, externalIndex, intervalMs, list.length, next]);

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
          quality={80}
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
              quality={80}
            />
          </div>
        </div>
      )}
    </div>
  );
}
