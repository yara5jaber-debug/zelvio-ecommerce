
"use client";

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

        <button
          type="button"
          disabled
          className="min-h-12 flex-1 cursor-not-allowed bg-foreground px-4 text-xs font-semibold uppercase tracking-wider text-white opacity-50"
        >
          Checkout — Soon
        </button>
      </div>
    </div>
  );
}
