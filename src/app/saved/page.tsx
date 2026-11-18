
"use client";

import Link from "next/link";

import ProductCard from "@/components/products/ProductCard";
import { useWishlist } from "@/components/wishlist/WishlistProvider";

export default function SavedPage() {
  const { items, count } = useWishlist();

  return (
    <main
      id="main-content"
      className="min-h-[70vh] bg-background"
    >
      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 md:px-8 md:pb-24 md:pt-16">

        {/* Page heading */}
        <header className="mb-8 border-b border-border pb-7 md:mb-12 md:pb-10">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent md:mb-5">
            ZELVIO / YOUR EDIT
          </p>

          <h1 className="text-[clamp(2.25rem,7vw,5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] text-foreground">
            SAVED ITEMS
            <span className="text-accent">.</span>
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-6 text-text-secondary md:mt-6 md:text-base md:leading-7">
            Your favorite finds, all in one place.
          </p>
        </header>

        {count > 0 ? (
          <section aria-label="Saved products">

            {/* Collection toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 md:mb-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary md:text-xs">
                {count}{" "}
                {count === 1
                  ? "SAVED ITEM"
                  : "SAVED ITEMS"}
              </p>

              <Link
                href="/shop"
                className="inline-flex min-h-11 items-center gap-2 border-b border-foreground text-[11px] font-bold uppercase tracking-[0.08em] text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:text-xs"
              >
                CONTINUE SHOPPING
                <span aria-hidden="true">↗</span>
              </Link>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 md:gap-x-6 md:gap-y-12 lg:grid-cols-4">
              {items.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>

          </section>
        ) : (
          /* Empty wishlist */
          <section
            aria-label="Empty wishlist"
            className="flex flex-col items-center justify-center pb-12 pt-8 text-center md:py-20"
          >
            <div className="mb-7 flex h-20 w-20 items-center justify-center border border-border bg-image-sand">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-9 w-9 text-foreground"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
              </svg>
            </div>

            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              YOUR COLLECTION
            </p>

            <h2 className="max-w-md text-2xl font-extrabold uppercase leading-tight tracking-[-0.03em] text-foreground md:text-3xl">
              NOTHING SAVED YET.
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-7 text-text-secondary">
              Found something you love? Tap the heart on
              any product to keep it here for later.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-[2px] bg-foreground px-8 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              EXPLORE PRODUCTS
              <span aria-hidden="true">↗</span>
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}
