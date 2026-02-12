"use client";

import { useState } from "react";
import Link from "next/link";

const MobileNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-colorNav border-t border-colorBorder">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {[
              { id: 1, name: "All Collection", href: "#" },
              { id: 2, name: "Elevating Desk Series", href: "#" },
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
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
