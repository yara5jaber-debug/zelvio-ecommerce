
"use client";

import { useCart } from "@/components/cart/CartProvider";

const FREE_SHIPPING_THRESHOLD = 100;

export default function FreeShippingProgress() {
  const { subtotal } = useCart();

  const remaining = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal
  );

  const progress = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100
  );

  const hasFreeShipping =
    subtotal >= FREE_SHIPPING_THRESHOLD;

  return (
    <section
      aria-label="Free shipping progress"
      className="border border-border p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xs font-bold uppercase tracking-widest text-foreground">
          Free Shipping
        </h2>

        <span aria-hidden="true" className="text-xl">
          ↗
        </span>
      </div>

      <p
        aria-live="polite"
        className="mb-4 text-sm leading-6 text-text-secondary"
      >
        {hasFreeShipping ? (
          <span className="font-semibold text-foreground">
            You&apos;ve unlocked free shipping!
          </span>
        ) : (
          <>
          You&apos;re{" "}
            <span className="font-semibold text-foreground">
              ${remaining.toFixed(2)}
            </span>{" "}
            away from free shipping!
          </>
        )}
      </p>

      <div
        role="progressbar"
        aria-label="Progress toward free shipping"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        className="h-2 w-full overflow-hidden rounded-full bg-image-sand"
      >
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-text-secondary">
        <span>${subtotal.toFixed(2)}</span>

        <span>
          ${FREE_SHIPPING_THRESHOLD.toFixed(2)}
        </span>
      </div>
    </section>
  );
}

