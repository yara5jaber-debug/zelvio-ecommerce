
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { label: "Home", href: "/", icon: "⌂" },
  { label: "Shop", href: "/shop", icon: "▦" },
  { label: "Saved", href: "/saved", icon: "♡" },
  { label: "Bag", href: "/cart", icon: "♧" },
  { label: "Account", href: "/account", icon: "♙" },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <div className="grid grid-cols-5">
        {navigationItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-h-16 flex-col items-center justify-center gap-1 text-xs ${
                isActive
                  ? "font-semibold text-accent"
                  : "text-text-secondary"
              }`}
            >
              <span aria-hidden="true" className="text-2xl leading-none">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
