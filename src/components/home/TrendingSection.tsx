
import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";
import { mockProducts } from "@/data/mockProducts";
export default function TrendingSection() {
  const products = mockProducts;

  return (
    <section
      aria-labelledby="trending-heading"
      className="px-4 py-12 md:px-8 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4 border-b border-border pb-5">
          <h2
            id="trending-heading"
            className="text-2xl font-extrabold uppercase tracking-[-0.03em] md:text-4xl"
          >
            TRENDING NOW
          </h2>

          <Link
            href="/shop"
            className="shrink-0 text-xs font-semibold uppercase tracking-wider underline underline-offset-4"
          >
            VIEW ALL
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
