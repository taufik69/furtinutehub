"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NavbarWrapper = ({ children }: { children: React.ReactNode }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50  backdrop-blur-md ${
        scrolled
          ? "bg-transparent text-colorHeroText shadow-md backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      {children}
    </nav>
  );
};

export default NavbarWrapper;
