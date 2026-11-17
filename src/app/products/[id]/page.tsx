
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getProductById } from "@/lib/product-details";
import ProductImageGallery from "@/components/products/ProductImageGallery";
import QuantitySelector from "@/components/products/QuantitySelector";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  return {
    title: `${product.title} | E-Commerce`,
    description: product.description,
  };
}

async function ProductContent({
  params,
}: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  const hasDiscount = product.discountPercentage > 0;

  const originalPrice = hasDiscount
    ? product.price / (1 - product.discountPercentage / 100)
    : null;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex items-center gap-2 text-xs text-text-secondary"
      >
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>

        <span>/</span>

        <Link href="/shop" className="hover:text-foreground">
          Shop
        </Link>

        <span>/</span>

        <span
          className="truncate text-foreground"
          aria-current="page"
        >
          {product.title}
        </span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductImageGallery
          images={product.images}
          title={product.title}
        />

        <div className="flex flex-col">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-secondary">
            {product.category.replaceAll("-", " ")}
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {product.title}
          </h1>

          {product.brand && (
            <p className="mt-3 text-sm text-text-secondary">
              By {product.brand}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span
              className={`text-2xl font-bold ${
                hasDiscount
                  ? "text-sale-price"
                  : "text-foreground"
              }`}
            >
              ${product.price.toFixed(2)}
            </span>

            {originalPrice !== null && (
              <span className="text-base text-text-secondary line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}

            {hasDiscount && (
              <span className="border border-border px-2 py-1 text-xs font-semibold">
                -{Math.round(product.discountPercentage)}%
              </span>
            )}
          </div>

          <div className="mt-6 flex items-center gap-3 border-b border-border pb-6">
            <span className="text-sm font-semibold text-foreground">
              ★ {product.rating.toFixed(1)}
            </span>

            <span className="text-xs text-text-secondary">
              Customer rating
            </span>
          </div>

          <div className="py-6">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
              Product Description
            </h2>

            <p className="text-sm leading-7 text-text-secondary">
              {product.description}
            </p>
          </div>

          <div className="border-t border-border py-6">
            <p className="text-sm font-medium text-foreground">
              {product.stock > 0
                ? `In Stock (${product.stock} available)`
                : "Out of Stock"}
            </p>
          </div>

          <QuantitySelector
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.images[0] ?? ""}
            stock={product.stock}
          />
        </div>
      </div>
    </main>
  );
}

export default function ProductPage(props: ProductPageProps) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div role="status" className="animate-pulse">
            <div className="mb-8 h-4 w-48 bg-image-sand" />

            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="aspect-square bg-image-sand" />

              <div>
                <div className="mb-5 h-4 w-32 bg-image-sand" />
                <div className="mb-6 h-10 w-3/4 bg-image-sand" />
                <div className="mb-8 h-8 w-36 bg-image-sand" />
                <div className="h-24 bg-image-sand" />
              </div>
            </div>

            <span className="sr-only">
              Loading product details...
            </span>
          </div>
        </main>
      }
    >
      <ProductContent {...props} />
    </Suspense>
  );
}
