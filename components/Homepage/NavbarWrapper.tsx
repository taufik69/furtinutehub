"use client";

import { useEffect, useRef, useState } from "react";

export default function NavbarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fixed, setFixed] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const [navH, setNavH] = useState(0);

  // navbar height measure (to avoid jump when fixed)
  useEffect(() => {
    const update = () => {
      if (navRef.current) setNavH(navRef.current.offsetHeight);
    };
    update();

    const ro = new ResizeObserver(update);
    if (navRef.current) ro.observe(navRef.current);

    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setFixed(window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {fixed && <div style={{ height: navH }} aria-hidden="true" />}

      <nav
        ref={navRef}
        className={[
          "top-0 left-0 right-0 z-50 transition-all duration-300",
          fixed ? "fixed" : "sticky",
          fixed
            ? "bg-colorBtnPrimaryText/10 text-colorBtnPrimary shadow-md backdrop-blur-md"
            : "bg-transparent",
        ].join(" ")}
      >
        {children}
      </nav>
    </>
  );
}
