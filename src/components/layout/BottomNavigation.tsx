
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

import { useCart } from "@/components/cart/CartProvider";
import { useWishlist } from "@/components/wishlist/WishlistProvider";

type IconName = "home" | "shop" | "saved" | "bag" | "account";

type NavigationItem = {
  label: string;
  href: string;
  icon: IconName;
};

const navigationItems: NavigationItem[] = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Shop", href: "/shop", icon: "shop" },
  { label: "Saved", href: "/saved", icon: "saved" },
  { label: "Bag", href: "/cart", icon: "bag" },
  { label: "Account", href: "/account", icon: "account" },
];

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function NavigationIcon({
  name,
}: {
  name: IconName;
}) {
  const commonProps = {
    width: 23,
    height: 23,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "home":
      return (
        <svg {...commonProps}>
          <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10Z" />
          <path d="M9 21v-8h6v8" />
        </svg>
      );

    case "shop":
      return (
        <svg {...commonProps}>
          <path d="M3 9h18l-1.5 12h-15L3 9Z" />
          <path d="M7 9V7a5 5 0 0 1 10 0v2" />
          <path d="M9 13v2M15 13v2" />
        </svg>
      );

    case "saved":
      return (
        <svg {...commonProps}>
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
        </svg>
      );

    case "bag":
      return (
        <svg {...commonProps}>
          <path d="M4 8h16l-1 13H5L4 8Z" />
          <path d="M9 9V6a3 3 0 0 1 6 0v3" />
        </svg>
      );

    case "account":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      );
  }
}

export default function BottomNavigation() {
  const pathname = usePathname();

  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  const isHydrated = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  const visibleItemCount = isHydrated ? itemCount : 0;
  const visibleWishlistCount = isHydrated ? wishlistCount : 0;

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

          const isCart = item.href === "/cart";
          const isSaved = item.href === "/saved";

          const badgeCount = isCart
            ? visibleItemCount
            : isSaved
              ? visibleWishlistCount
              : 0;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              aria-label={
                isCart
                  ? `Bag, ${visibleItemCount} items`
                  : isSaved
                    ? `Saved, ${visibleWishlistCount} items`
                    : item.label
              }
              className={`relative flex min-h-16 flex-col items-center justify-center gap-1 px-1 text-[11px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent ${
                isActive
                  ? "font-semibold text-accent"
                  : "text-text-secondary hover:text-foreground"
              }`}
            >
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-4 top-0 h-[2px] bg-accent"
                />
              )}

              <span className="relative inline-flex">
                <NavigationIcon name={item.icon} />

                {(isCart || isSaved) && badgeCount > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold leading-none text-white"
                  >
                    {badgeCount > 99 ? "99+" : badgeCount}
                  </span>
                )}
              </span>

              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
