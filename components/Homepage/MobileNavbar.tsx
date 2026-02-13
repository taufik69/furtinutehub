"use client";

import Link from "next/link";
import { useEffect } from "react";

interface MobileNavbarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNavbar({ isOpen, onClose }: MobileNavbarProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className="
          fixed inset-x-0 top-20 -bottom-400 z-50 md:hidden overflow-y-auto
          bg-colorBtnPrimaryText backdrop-blur-md backdrop-saturate-150
          supports-backdrop-filter:bg-colorBtnPrimaryText
          animate-slide-down
        "
      >
        <div className="px-4 py-6">
          <div className="space-y-1 mb-6">
            {[
              { id: 1, name: "Home", href: "/" },
              { id: 2, name: "All Collection", href: "/allcollection" },
              { id: 3, name: "Videos", href: "/videos" },
              { id: 4, name: "Articles", href: "/articles" },
              { id: 5, name: "About", href: "/studio" },
              { id: 6, name: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={onClose}
                className="block px-4 py-3 text-colorNavText hover:bg-colorBodyDim rounded-lg transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-colorBorder my-6" />

          <div className="space-y-1">
            <button
              onClick={onClose}
              className="w-full text-left px-4 py-3 text-colorNavText hover:bg-colorBodyDim rounded-lg transition-colors font-medium flex items-center gap-3"
            >
              {/* icon */}
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
              Search
            </button>

            <button
              onClick={onClose}
              className="w-full text-left px-4 py-3 text-colorNavText hover:bg-colorBodyDim rounded-lg transition-colors font-medium flex items-center gap-3"
            >
              {/* icon */}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="black"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Settings
            </button>
            {/* close icons */}
            <button
              onClick={onClose}
              className="w-full bg-colorCartDot text-colorBtnPrimaryText  mt-4 text-left px-4 py-3  hover:bg-colorBodyDim rounded-lg transition-colors font-medium flex items-center gap-3"
            >
              {/* icon */}
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
