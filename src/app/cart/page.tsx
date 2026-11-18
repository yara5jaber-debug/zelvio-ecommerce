
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import FreeShippingProgress from "@/components/cart/FreeShippingProgress";
import PromoCode from "@/components/cart/PromoCode";
import MobileCheckoutBar from "@/components/cart/MobileCheckoutBar";

const FREE_SHIPPING_THRESHOLD = 100;
const PROMO_CODE = "SAVE10";
const DISCOUNT_RATE = 0.1;

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();

  const [appliedCode, setAppliedCode] = useState<string | null>(
    null
  );

  const hasDiscount = appliedCode === PROMO_CODE;

  const discount = hasDiscount
    ? Math.round(subtotal * DISCOUNT_RATE * 100) / 100
    : 0;

  const totalAfterDiscount = Math.max(
    0,
    Math.round((subtotal - discount) * 100) / 100
  );

  const hasFreeShipping =
    subtotal >= FREE_SHIPPING_THRESHOLD;

  function handleClearCart() {
    clearCart();
    setAppliedCode(null);
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 pt-10 pb-40 sm:px-6 md:px-8 md:pb-10">
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex items-center gap-2 text-xs text-text-secondary"
      >
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <span className="text-foreground">
          Shopping Cart
        </span>
      </nav>

      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-secondary">
            Your Selection
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Shopping Cart
          </h1>

          <p className="mt-3 text-sm text-text-secondary">
            {itemCount}{" "}
            {itemCount === 1 ? "item" : "items"}{" "}
            in your cart
          </p>
        </div>

        {items.length > 0 && (
          <button
            type="button"
            onClick={handleClearCart}
            className="text-xs font-semibold uppercase tracking-wider text-text-secondary underline underline-offset-4 hover:text-foreground"
          >
            Clear Cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-border px-6 py-24 text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Your cart is empty
          </h2>

          <p className="mt-3 max-w-sm text-sm leading-6 text-text-secondary">
            Looks like you haven&apos;t added anything yet.
            Explore our collection and find something you love.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-flex min-h-12 items-center justify-center bg-foreground px-8 text-xs font-semibold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
            <section aria-label="Cart items">
              <div className="hidden border-b border-border pb-4 text-xs font-semibold uppercase tracking-wider text-text-secondary sm:grid sm:grid-cols-[minmax(0,1fr)_120px_100px]">
                <span>Product</span>
                <span>Quantity</span>
                <span className="text-right">Total</span>
              </div>

              <div>
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="grid gap-5 border-b border-border py-6 sm:grid-cols-[minmax(0,1fr)_120px_100px] sm:items-center"
                  >
                    <div className="flex min-w-0 gap-4">
                      <Link
                        href={`/products/${item.id}`}
                        className="relative h-28 w-24 shrink-0 overflow-hidden bg-image-sand"
                      >
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="96px"
                            className="object-contain p-2"
                          />
                        )}
                      </Link>

                      <div className="flex min-w-0 flex-col items-start">
                        <Link
                          href={`/products/${item.id}`}
                          className="text-sm font-semibold leading-6 text-foreground hover:underline"
                        >
                          {item.title}
                        </Link>

                        <p className="mt-2 text-sm text-text-secondary">
                          ${item.price.toFixed(2)}
                        </p>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="mt-auto pt-3 text-xs text-text-secondary underline underline-offset-4 hover:text-sale-price"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="flex w-fit items-center border border-border">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${item.title}`}
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1
                          )
                        }
                        className="flex h-10 w-9 items-center justify-center text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        −
                      </button>

                      <span className="flex h-10 w-10 items-center justify-center border-x border-border text-sm font-semibold text-foreground">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.title}`}
                        disabled={item.quantity >= item.stock}
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1
                          )
                        }
                        className="flex h-10 w-9 items-center justify-center text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-sm font-bold text-foreground sm:text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </article>
                ))}
              </div>

              <Link
                href="/shop"
                className="mt-8 inline-block text-xs font-semibold uppercase tracking-wider text-foreground underline underline-offset-4"
              >
                Continue Shopping
              </Link>
            </section>

            <aside className="space-y-5">
              <FreeShippingProgress />

              <PromoCode
                appliedCode={appliedCode}
                onApply={setAppliedCode}
                onRemove={() => setAppliedCode(null)}
              />

              <div className="border border-border p-6">
                <h2 className="border-b border-border pb-5 text-lg font-bold text-foreground">
                  Order Summary
                </h2>

                <div className="space-y-5 py-6">
                  <div className="flex justify-between gap-3 text-sm">
                    <span className="text-text-secondary">
                      Subtotal ({itemCount} items)
                    </span>

                    <span className="font-semibold text-foreground">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {hasDiscount && (
                    <div className="flex justify-between gap-3 text-sm">
                      <span className="text-text-secondary">
                        Discount (SAVE10)
                      </span>

                      <span className="font-semibold text-sale-price">
                        -${discount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between gap-3 text-sm">
                    <span className="text-text-secondary">
                      Shipping
                    </span>

                    <span className="text-right text-foreground">
                      {hasFreeShipping
                        ? "Free Shipping"
                        : "Calculated at checkout"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border py-6">
                  <span className="font-bold text-foreground">
                    Total before shipping
                  </span>

                  <span className="text-xl font-extrabold text-foreground">
                    ${totalAfterDiscount.toFixed(2)}
                  </span>
                </div>

                <Link
                  href="/checkout"
                  className="hidden min-h-12 w-full items-center justify-center bg-foreground px-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:flex"
                >
                  PROCEED TO CHECKOUT
                  <span aria-hidden="true" className="ml-3">
                    ↗
                  </span>
                </Link>

                <p className="mt-4 text-center text-xs leading-5 text-text-secondary">
                  Checkout preview — orders and payments are not active yet.
                </p>
              </div>
            </aside>
          </div>

          <MobileCheckoutBar total={totalAfterDiscount} />
        </>

      )}
    </main>
  );
}
