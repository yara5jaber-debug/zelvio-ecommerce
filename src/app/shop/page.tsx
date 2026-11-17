
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import ProductCard from "@/components/products/ProductCard";
import ShopFilters from "@/components/shop/ShopFilters";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop All | ZELVIO",
  description:
    "Explore curated products across fashion, electronics, beauty, home and grocery.",
};

type ShopPageProps = {
  searchParams: Promise<{
    q?: string | string[];
    category?: string | string[];
    sort?: string | string[];
    minPrice?: string | string[];
    maxPrice?: string | string[];
  }>;
};

const categories = [
  { label: "All", value: "" },
  { label: "Electronics", value: "electronics" },
  { label: "Fashion & Accessories", value: "fashion" },
  { label: "Beauty & Personal Care", value: "beauty" },
  { label: "Home & Kitchen", value: "home" },
  { label: "Grocery & Food", value: "grocery" },
];

const categoryGroups: Record<string, string[]> = {
  electronics: [
    "electronics",
    "smartphones",
    "laptops",
    "tablets",
    "mobile-accessories",
  ],
  fashion: [
    "fashion",
    "fashion & accessories",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-dresses",
    "womens-bags",
    "womens-shoes",
    "womens-watches",
    "womens-jewellery",
    "tops",
    "sunglasses",
  ],
  beauty: [
    "beauty",
    "beauty & personal care",
    "fragrances",
    "skin-care",
  ],
  home: [
    "home",
    "home & kitchen",
    "home-decoration",
    "furniture",
    "kitchen-accessories",
  ],
  grocery: [
    "grocery",
    "grocery & food",
    "groceries",
  ],
};

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A to Z", value: "name-asc" },
];

function parsePrice(value: string | string[] | undefined) {
  if (typeof value !== "string" || value.trim() === "") {
    return undefined;
  }

  const price = Number(value);

  return Number.isFinite(price) && price >= 0
    ? price
    : undefined;
}

async function ShopContent({ searchParams }: ShopPageProps) {
  const params = await searchParams;

  const query =
    typeof params.q === "string" ? params.q.trim() : "";

  const category =
    typeof params.category === "string"
      ? params.category.trim().toLowerCase()
      : "";

  const requestedSort =
    typeof params.sort === "string"
      ? params.sort
      : "featured";

  const sort = sortOptions.some(
    (option) => option.value === requestedSort
  )
    ? requestedSort
    : "featured";

  const minPrice = parsePrice(params.minPrice);
  const maxPrice = parsePrice(params.maxPrice);

  const products = await getProducts();

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(query.toLowerCase());

    const productCategory = product.category
      .trim()
      .toLowerCase();

    const matchesCategory =
      !category ||
      (categoryGroups[category]
        ? categoryGroups[category].includes(productCategory)
        : productCategory === category);

    const matchesMinPrice =
      minPrice === undefined || product.price >= minPrice;

    const matchesMaxPrice =
      maxPrice === undefined || product.price <= maxPrice;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });

  const sortedProducts = [...filteredProducts];

  switch (sort) {
    case "price-asc":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;

    case "price-desc":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;

    case "name-asc":
      sortedProducts.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      break;
  }

  const currentParams = new URLSearchParams();

  if (query) currentParams.set("q", query);
  if (category) currentParams.set("category", category);

  if (sort !== "featured") {
    currentParams.set("sort", sort);
  }

  if (minPrice !== undefined) {
    currentParams.set("minPrice", String(minPrice));
  }

  if (maxPrice !== undefined) {
    currentParams.set("maxPrice", String(maxPrice));
  }

  function createFilterUrl(key: string) {
    const url = new URLSearchParams(currentParams);
    url.delete(key);

    return url.toString()
      ? `/shop?${url.toString()}`
      : "/shop";
  }

  const activeFilters = [
    ...(query
      ? [{ key: "q", label: `Search: ${query}` }]
      : []),

    ...(category
      ? [
          {
            key: "category",
            label:
              categories.find(
                (item) => item.value === category
              )?.label ?? category,
          },
        ]
      : []),

    ...(sort !== "featured"
      ? [
          {
            key: "sort",
            label:
              sortOptions.find(
                (item) => item.value === sort
              )?.label ?? sort,
          },
        ]
      : []),

    ...(minPrice !== undefined
      ? [{ key: "minPrice", label: `Min: $${minPrice}` }]
      : []),

    ...(maxPrice !== undefined
      ? [{ key: "maxPrice", label: `Max: $${maxPrice}` }]
      : []),
  ];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight text-foreground">
          Shop All
        </h1>

        <p className="mt-3 text-sm text-text-secondary">
          Explore our curated collection of everyday essentials.
        </p>
      </header>

      {/* Search */}
      <form
        action="/shop"
        method="GET"
        role="search"
        className="mb-8 flex gap-3"
      >
        <label htmlFor="product-search" className="sr-only">
          Search products
        </label>

        <input
          id="product-search"
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Search products..."
          className="min-h-11 min-w-0 flex-1 border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none focus-visible:border-foreground"
        />

        {category && (
          <input
            type="hidden"
            name="category"
            value={category}
          />
        )}

        {sort !== "featured" && (
          <input type="hidden" name="sort" value={sort} />
        )}

        {minPrice !== undefined && (
          <input
            type="hidden"
            name="minPrice"
            value={minPrice}
          />
        )}

        {maxPrice !== undefined && (
          <input
            type="hidden"
            name="maxPrice"
            value={maxPrice}
          />
        )}

        <button
          type="submit"
          className="min-h-11 rounded-[2px] bg-foreground px-5 text-xs font-semibold uppercase tracking-wider text-white sm:px-6"
        >
          Search
        </button>
      </form>

      <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <ShopFilters
          query={query}
          category={category}
          sort={sort}
          minPrice={minPrice}
          maxPrice={maxPrice}
          categories={categories}
          sortOptions={sortOptions}
        />

        <section
          aria-label="All products"
          className="min-w-0"
        >
          {/* Active filters */}
          {activeFilters.length > 0 && (
            <div
              className="mb-6 flex flex-wrap items-center gap-2"
              aria-label="Active filters"
            >
              <span className="mr-2 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Active Filters
              </span>

              {activeFilters.map((filter) => (
                <Link
                  key={filter.key}
                  href={createFilterUrl(filter.key)}
                  aria-label={`Remove ${filter.label} filter`}
                  className="inline-flex min-h-11 items-center gap-2 border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {filter.label}
                  <span aria-hidden="true">×</span>
                </Link>
              ))}

              <Link
                href="/shop"
                className="inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-wider text-text-secondary underline underline-offset-4 hover:text-foreground"
              >
                Clear All
              </Link>
            </div>
          )}

          {/* Product count */}
          <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
            <p
              role="status"
              className="text-xs font-semibold uppercase tracking-wider text-text-secondary"
            >
              {sortedProducts.length} Products
            </p>

            <span className="hidden text-xs uppercase tracking-wider text-text-secondary lg:inline">
              Curated for your world
            </span>
          </div>

          {/* Product grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="border-t border-border py-16 text-center">
              <h2 className="text-lg font-semibold text-foreground">
                No products found
              </h2>

              <p className="mt-2 text-sm text-text-secondary">
                Try adjusting your filters.
              </p>

              <Link
                href="/shop"
                className="mt-6 inline-flex min-h-11 items-center border-b border-foreground text-xs font-semibold uppercase tracking-wider text-foreground"
              >
                Clear filters
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default function ShopPage(props: ShopPageProps) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p role="status" className="text-sm text-text-secondary">
            Loading products...
          </p>
        </main>
      }
    >
      <ShopContent {...props} />
    </Suspense>
  );
}
