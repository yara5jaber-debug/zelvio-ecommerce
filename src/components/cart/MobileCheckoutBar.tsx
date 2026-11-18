
"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";

type MobileCheckoutBarProps = {
  total: number;
};

export default function MobileCheckoutBar({
  total,
}: MobileCheckoutBarProps) {
  const { items } = useCart();

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-16 z-40 border-t border-border bg-background px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <div className="mx-auto flex max-w-7xl items-center gap-4">
        <div className="min-w-0 shrink-0">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
            Total
          </p>

          <p className="text-lg font-extrabold text-foreground">
            ${total.toFixed(2)}
          </p>
        </div>

        <Link
          href="/checkout"
          className="flex min-h-12 flex-1 items-center justify-center gap-2 bg-foreground px-4 text-center text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          CHECKOUT
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  );
}
