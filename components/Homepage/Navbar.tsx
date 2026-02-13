"use client";

import Link from "next/link";
import { useState } from "react";
import MobileNavbar from "./MobileNavbar";
import NavbarWrapper from "./NavbarWrapper";
import BottomNavBar from "./Bottomnavbar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <div>
      <NavbarWrapper>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="shrink-0">
              <Link href="/" className="bg-[#FF6B4A] px-4 py-2 rounded block">
                <span className="text-white font-bold text-2xl italic">
                  GRID
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: 2, name: "Home", href: "/" },
                { id: 1, name: "All Collection", href: "/allcollection" },
                { id: 4, name: "Videos", href: "#" },
                { id: 5, name: "Articles", href: "/articles" },
                { id: 6, name: "About", href: "/studio" },
                { id: 7, name: "Contact", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="text-colorNavText hover:text-colorBtnPrimary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Desktop icons */}
              <div className="hidden md:flex items-center space-x-6">
                <button>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>

                <button className="transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>

                <button className="relative">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile hamburger (vertical bars) */}
              <button
                onClick={openMenu}
                className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-colorNavText"
                aria-label="Open menu"
                aria-expanded={isOpen}
              >
                {/* vertical bars icon */}
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 5v14M12 5v14M16 5v14"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu (ONLY ONCE) */}
        <MobileNavbar isOpen={isOpen} onClose={closeMenu} />
      </NavbarWrapper>
      <BottomNavBar />
    </div>
  );
}
