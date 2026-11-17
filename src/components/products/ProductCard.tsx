
import Image from "next/image";
import Link from "next/link";

export type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const hasDiscount =
    product.originalPrice !== undefined &&
    product.originalPrice > product.price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.originalPrice! - product.price) /
          product.originalPrice!) *
          100
      )
    : 0;

  return (
    <article className="group min-w-0">
      <Link
        href={`/products/${product.id}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        {/* Product image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-image-sand">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-4 transition-transform duration-300 ease-out group-hover:scale-[1.04] motion-reduce:transform-none sm:p-6"
          />

          {/* Discount badge */}
          {hasDiscount && (
            <span className="absolute left-3 top-3 bg-foreground px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white">
              -{discountPercentage}%
            </span>
          )}

          {/* Desktop hover indicator */}
          <span
            aria-hidden="true"
            className="absolute bottom-3 right-3 hidden h-9 w-9 items-center justify-center border border-border bg-background text-lg text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 md:flex"
          >
            ↗
          </span>
        </div>

        {/* Product details */}
        <div className="pt-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-secondary">
            {product.category.replaceAll("-", " ")}
          </p>

          <h3 className="mt-2 line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-foreground md:text-base md:leading-6">
            {product.title}
          </h3>

          <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span
              className={`text-base font-bold ${
                hasDiscount
                  ? "text-sale-price"
                  : "text-foreground"
              }`}
            >
              ${product.price.toFixed(2)}
            </span>

            {hasDiscount && (
              <span className="text-xs text-text-secondary line-through md:text-sm">
                ${product.originalPrice?.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
