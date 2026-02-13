import Link from "next/link";
import MobileNavbar from "./MobileNavbar";
import NavbarWrapper from "./NavbarWrapper";

export default function Navbar() {
  return (
    <NavbarWrapper>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="shrink-0">
            <div className="bg-[#FF6B4A] px-4 py-2 rounded">
              <span className="text-white font-bold text-2xl italic">GRID</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { id: 1, name: "All Collection", href: "/allcollection" },
              { id: 3, name: "Grid Studio", href: "#" },
              { id: 4, name: "Videos", href: "#" },
              { id: 5, name: "Articles", href: "#" },
              { id: 6, name: "About", href: "#" },
              { id: 7, name: "Contact", href: "#" },
            ].map((item) => (
              <Link key={item.id} href={item.href}>
                {item.name}
              </Link>
            ))}
          </div>

          {/* Icons section unchanged */}
          <div className="flex items-center space-x-6">
            {/* Icons */}
            <div className="flex items-center space-x-6">
              <button className="">
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
              <button className=" transition-colors">
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
              <button className=" relative">
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
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileNavbar />
    </NavbarWrapper>
  );
}
