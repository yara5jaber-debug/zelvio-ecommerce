
import type { Metadata } from "next";
import Link from "next/link";

import CheckoutFlow from "@/components/checkout/CheckoutFlow";
import CheckoutOrderSummary from "@/components/checkout/CheckoutOrderSummary";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Review your order and delivery details at ZELVIO.",
};

export default function CheckoutPage() {
  return (
    <main
      id="main-content"
      className="min-h-[70vh] bg-background"
    >
        <div className="mx-auto max-w-7xl px-4 pb-36 pt-8 sm:px-6 md:px-8 md:pb-28 md:pt-16">        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 text-xs text-text-secondary"
        >
          <Link
            href="/cart"
            className="min-h-11 inline-flex items-center transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Shopping Bag
          </Link>

          <span aria-hidden="true">/</span>

          <span
            aria-current="page"
            className="text-foreground"
          >
            Checkout
          </span>
        </nav>

        {/* Page heading */}
        <header className="mb-8 border-b border-border pb-8 md:mb-12 md:pb-10">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            ZELVIO / CHECKOUT
          </p>

          <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-extrabold uppercase leading-none tracking-[-0.04em] text-foreground">
            CHECKOUT
            <span className="text-accent">.</span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-7 text-text-secondary md:text-base">
            A simple, considered way to complete your order.
          </p>
        </header>

        {/* Checkout layout */}
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12 xl:gap-16">
          {/* Interactive checkout steps */}
          <div className="min-w-0">
            <CheckoutFlow />
          </div>

          {/* Live order summary */}
          <div className="min-w-0 lg:sticky lg:top-8">
            <CheckoutOrderSummary />
          </div>
        </div>
      </div>
    </main>
  );
}
