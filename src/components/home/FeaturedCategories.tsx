
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";

export default function FeaturedCategories() {
  return (
    <section
      aria-labelledby="categories-heading"
      className="px-5 py-16 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 border-b border-border pb-5">
          <h2
            id="categories-heading"
            className="text-2xl font-extrabold uppercase tracking-tight md:text-3xl"
          >
            SHOP BY CATEGORY
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop/${category.slug}`}
              className="group block min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <div className="relative aspect-square overflow-hidden bg-image-sand">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 20vw"
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </div>

              <div className="flex min-h-14 items-center justify-between gap-2 py-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide md:text-base">
                  {category.name}
                </h3>

                <span aria-hidden="true" className="shrink-0">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
