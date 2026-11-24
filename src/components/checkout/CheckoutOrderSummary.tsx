
"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";

import { useCart } from "@/components/cart/CartProvider";
import {
  calculatePriceSummary,
  PROMO_CODE,
} from "@/lib/pricing";

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export default function CheckoutOrderSummary() {
  const { items, itemCount, appliedCode } = useCart();

  const isHydrated = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  const {
    subtotal,
    discount,
    totalBeforeShipping,
    freeShippingEligible,
  } = calculatePriceSummary(items, appliedCode);

  const hasDiscount =
    items.length > 0 &&
    appliedCode?.trim().toUpperCase() === PROMO_CODE;

  return (
    <aside
      aria-labelledby="summary-heading"
      className="min-w-0 border border-border bg-background p-4 sm:p-6 lg:p-7"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border pb-5">
        <h2
          id="summary-heading"
          className="min-w-0 text-lg font-bold tracking-tight text-foreground"
        >
          Order Summary
        </h2>

        <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          {isHydrated ? itemCount : "—"} ITEMS
        </span>
      </div>

      {!isHydrated ? (
        <p
          role="status"
          className="py-10 text-sm text-text-secondary"
        >
          Loading your bag...
        </p>
      ) : items.length === 0 ? (
        <div className="py-10 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center border border-border bg-image-sand">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-foreground"
            >
              <path d="M4 8h16l-1 13H5L4 8Z" />
              <path d="M9 9V6a3 3 0 0 1 6 0v3" />
            </svg>
          </div>

          <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
            YOUR BAG IS EMPTY
          </h3>

          <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-text-secondary">
            Add something to your bag before continuing
            with checkout.
          </p>

          <Link
            href="/shop"
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 border-b border-foreground text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            EXPLORE PRODUCTS
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      ) : (
        <>
          <div className="divide-y divide-border">
            {items.map((item) => (
              <article
                key={item.id}
                className="flex min-w-0 items-start gap-3 py-5 sm:gap-4"
              >
                <Link
                  href={`/products/${item.id}`}
                  className="relative h-24 w-20 shrink-0 overflow-hidden bg-image-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="80px"
                      className="object-contain p-2"
                    />
                  )}
                </Link>

                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <Link
                    href={`/products/${item.id}`}
                    className="line-clamp-2 break-words text-sm font-semibold leading-5 text-foreground hover:underline"
                  >
                    {item.title}
                  </Link>

                  <p className="text-xs text-text-secondary">
                    Qty: {item.quantity}
                  </p>

                  <p className="max-w-full break-all text-sm font-bold tabular-nums text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="space-y-4 border-t border-border py-6">
            <div className="flex min-w-0 items-start justify-between gap-3 text-sm">
              <span className="min-w-0 text-text-secondary">
                Subtotal
              </span>

              <span className="min-w-0 break-all text-right font-semibold tabular-nums text-foreground">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            {hasDiscount && (
              <div className="flex min-w-0 items-start justify-between gap-3 text-sm">
                <span className="min-w-0 text-text-secondary">
                  Discount ({PROMO_CODE})
                </span>

                <span className="min-w-0 break-all text-right font-semibold tabular-nums text-sale-price">
                  -${discount.toFixed(2)}
                </span>
              </div>
            )}

            <div className="flex min-w-0 items-start justify-between gap-3 text-sm">
              <span className="shrink-0 text-text-secondary">
                Shipping
              </span>

              <span className="min-w-0 text-right leading-5 text-foreground">
                {freeShippingEligible
                  ? "Eligible for free shipping"
                  : "Calculated at checkout"}
              </span>
            </div>

            <p className="text-xs leading-5 text-text-secondary">
              Final delivery charges will be confirmed
              before placing an order.
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              <span className="text-sm font-bold text-foreground">
                Total before shipping
              </span>

              <span className="max-w-full break-all text-2xl font-extrabold tracking-tight tabular-nums text-foreground sm:text-right">
                ${totalBeforeShipping.toFixed(2)}
              </span>
            </div>

            {hasDiscount && (
              <p className="mt-3 text-xs font-semibold text-sale-price">
                SAVE10 discount applied successfully.
              </p>
            )}

            <p className="mt-3 text-xs leading-5 text-text-secondary">
              This is not the final order total.
            </p>
          </div>

          <div className="mt-7 border-t border-border pt-5">
            <Link
              href="/cart"
              className="inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground underline underline-offset-4 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span aria-hidden="true">←</span>
              EDIT YOUR BAG
            </Link>
          </div>
        </>
      )}
    </aside>
  );
}
