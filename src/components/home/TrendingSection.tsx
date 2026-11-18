
import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";
import { getProducts } from "@/lib/products";

export default async function TrendingSection() {
  const products = (await getProducts()).slice(0, 8);

  return (
    <section
      aria-labelledby="trending-heading"
      className="bg-background px-4 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-6 border-b border-border pb-8 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              ZELVIO / THE EDIT / 001
            </p>

            <h2
              id="trending-heading"
              className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold uppercase leading-none tracking-[-0.03em] text-foreground"
            >
              TRENDING NOW
              <span className="text-accent">.</span>
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-text-secondary md:text-base">
              The pieces worth a closer look.
              Discover the everyday finds that stand out.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex min-h-11 w-fit items-center gap-3 border-b border-foreground text-xs font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            VIEW ALL PRODUCTS
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-12 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center border-t border-border pt-8 md:mt-16">
          <Link
            href="/shop"
            className="inline-flex min-h-12 items-center justify-center gap-4 rounded-[2px] border border-foreground px-8 py-3 text-xs font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:bg-foreground hover:text-white"
          >
            EXPLORE THE FULL COLLECTION
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
