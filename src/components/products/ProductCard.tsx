
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

  return (
    <article className="group min-w-0">
      <Link
        href={`/products/${product.id}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <div className="relative aspect-square overflow-hidden bg-image-sand">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-5 transition-transform duration-200 group-hover:scale-105"
          />

          {hasDiscount && (
            <span className="absolute top-3 left-3 bg-foreground px-2 py-1 text-xs font-semibold text-white">
              SALE
            </span>
          )}
        </div>

        <div className="pt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            {product.category}
          </p>

          <h3 className="mt-2 line-clamp-2 text-base font-semibold">
            {product.title}
          </h3>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span
              className={
                hasDiscount
                  ? "font-semibold text-sale-price"
                  : "font-semibold text-foreground"
              }
            >
              ${product.price.toFixed(2)}
            </span>

            {hasDiscount && (
              <span className="text-sm text-text-secondary line-through">
                ${product.originalPrice?.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
