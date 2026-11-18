
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your ZELVIO order.",
};

const checkoutSteps = [
  {
    number: "01",
    title: "ADDRESS",
    description: "Shipping details",
  },
  {
    number: "02",
    title: "PAYMENT",
    description: "Delivery & payment",
  },
  {
    number: "03",
    title: "REVIEW",
    description: "Order confirmation",
  },
];

export default function CheckoutPage() {
  return (
    <main
      id="main-content"
      className="min-h-[70vh] bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-8 md:px-8 md:pb-28 md:pt-16">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 text-xs text-text-secondary"
        >
          <Link
            href="/cart"
            className="transition-colors hover:text-accent"
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

        <header className="mb-10 border-b border-border pb-8 md:mb-14 md:pb-10">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            ZELVIO / SECURE CHECKOUT
          </p>

          <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-extrabold uppercase leading-none tracking-[-0.04em] text-foreground">
            CHECKOUT
            <span className="text-accent">.</span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-7 text-text-secondary md:text-base">
            A simple, considered way to complete your order.
          </p>
        </header>

        <ol className="mb-12 grid grid-cols-3 gap-2 border-b border-border pb-8 md:gap-8 md:pb-10">
          {checkoutSteps.map((step, index) => (
            <li
              key={step.number}
              className={`min-w-0 border-t-2 pt-4 ${
                index === 0
                  ? "border-accent"
                  : "border-border"
              }`}
            >
              <span
                className={`text-xs font-bold ${
                  index === 0
                    ? "text-accent"
                    : "text-text-secondary"
                }`}
              >
                {step.number}
              </span>

              <p
                className={`mt-2 text-[11px] font-bold tracking-[0.06em] md:text-sm ${
                  index === 0
                    ? "text-foreground"
                    : "text-text-secondary"
                }`}
              >
                {step.title}
              </p>

              <p className="mt-1 hidden text-xs text-text-secondary sm:block">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
          <section
            aria-labelledby="shipping-heading"
            className="min-w-0"
          >
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              STEP 01 / 03
            </p>

            <h2
              id="shipping-heading"
              className="text-2xl font-extrabold uppercase tracking-[-0.03em] text-foreground md:text-3xl"
            >
              SHIPPING ADDRESS
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-text-secondary">
              Tell us where you would like your order delivered.
            </p>

            <div className="mt-8 border border-border bg-image-sand p-6 md:p-10">
              <p className="text-sm font-semibold text-foreground">
                Shipping form
              </p>

              <p className="mt-3 text-sm leading-7 text-text-secondary">
                Your contact and delivery details will appear here
                in the next implementation step.
              </p>
            </div>
          </section>

          <aside
            aria-labelledby="summary-heading"
            className="border border-border p-6 md:p-8"
          >
            <h2
              id="summary-heading"
              className="border-b border-border pb-5 text-lg font-bold text-foreground"
            >
              Order Summary
            </h2>

            <p className="py-8 text-sm leading-7 text-text-secondary">
              Your selected products, shipping costs and order
              total will appear here when the cart is connected.
            </p>

            <div className="border-t border-border pt-6">
              <Link
                href="/cart"
                className="inline-flex min-h-11 items-center gap-3 text-xs font-bold uppercase tracking-[0.1em] text-foreground underline underline-offset-4 transition-colors hover:text-accent"
              >
                <span aria-hidden="true">←</span>
                RETURN TO BAG
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
