
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";

const menuItems = [
  { label: "SHOP ALL", href: "/shop" },
  { label: "ELECTRONICS", href: "/shop?category=electronics" },
  { label: "FASHION", href: "/shop?category=mens-shirts" },
  { label: "BEAUTY", href: "/shop?category=beauty" },
  { label: "HOME", href: "/shop?category=home-decoration" },
  { label: "GROCERY", href: "/shop?category=groceries" },
];

export default function Header() {
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="relative z-40 border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((previous) => !previous)}
            className="flex min-h-11 min-w-11 items-center justify-center text-2xl text-foreground md:hidden"
          >
            <span aria-hidden="true">
              {isMenuOpen ? "×" : "☰"}
            </span>
          </button>

          <Link
            href="/"
            aria-label="ZELVIO homepage"
            className="text-xl font-extrabold uppercase tracking-[-0.04em] text-foreground md:text-2xl"
            onClick={() => setIsMenuOpen(false)}
          >
            ZELVIO<span className="text-accent">.</span>
          </Link>

          <Link
            href="/cart"
            aria-label={`Shopping bag with ${itemCount} items`}
            onClick={() => setIsMenuOpen(false)}
            className="flex min-h-11 items-center justify-center px-2 text-sm font-semibold text-foreground"
          >
            BAG ({itemCount})
          </Link>
        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsMenuOpen(false)}
            className="absolute inset-0 h-full w-full bg-black/50"
          />

          {/* Drawer */}
          <nav
            id="mobile-menu"
            aria-label="Mobile menu"
            className="absolute bottom-0 left-0 top-16 w-[min(85vw,340px)] overflow-y-auto border-r border-border bg-background px-6 py-8"
          >
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              EXPLORE ZELVIO
            </p>

            <div className="flex flex-col">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex min-h-14 items-center justify-between border-b border-border py-3 text-sm font-bold uppercase tracking-[0.08em] text-foreground transition-colors hover:text-accent"
                >
                  {item.label}
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>

            <div className="mt-10 border-t border-border pt-6">
              <Link
                href="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="flex min-h-11 items-center justify-between text-xs font-semibold uppercase tracking-wider text-foreground"
              >
                SHOPPING BAG
                <span>{itemCount}</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
