
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";

export default function FeaturedCategories() {
  return (
    <section
      aria-labelledby="categories-heading"
      className="bg-background px-4 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-8 flex flex-col gap-4 border-b border-border pb-7 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              ZELVIO / DISCOVER / 002
            </p>

            <h2
              id="categories-heading"
              className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold uppercase leading-none tracking-[-0.03em] text-foreground"
            >
              SHOP BY CATEGORY
              <span className="text-accent">.</span>
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-text-secondary md:text-base">
              Find what fits your world.
              Explore our collections across everyday essentials.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex min-h-11 w-fit items-center gap-3 border-b border-foreground text-xs font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            EXPLORE ALL
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 lg:grid-cols-5">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/shop?category=${encodeURIComponent(category.slug)}`}
              className="group block min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-image-sand">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 20vw"
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04] motion-reduce:transform-none"
                />

                <span
                  aria-hidden="true"
                  className="absolute left-3 top-3 bg-background px-2 py-1 text-[10px] font-bold tracking-[0.1em] text-foreground"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex min-h-16 items-center justify-between gap-2 border-b border-border py-4 transition-colors group-hover:border-foreground">
                <h3 className="text-sm font-bold uppercase tracking-[0.06em] text-foreground md:text-base">
                  {category.name}
                </h3>

                <span
                  aria-hidden="true"
                  className="shrink-0 text-lg text-foreground transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
                >
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
