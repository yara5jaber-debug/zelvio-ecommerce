
"use client";

import { useRef } from "react";

type FilterOption = {
  label: string;
  value: string;
};

type ShopFiltersProps = {
  query: string;
  category: string;
  sort: string;
  minPrice?: number;
  maxPrice?: number;
  categories: FilterOption[];
  sortOptions: FilterOption[];
};

type FilterFieldsProps = ShopFiltersProps & {
  prefix: string;
};

function FilterFields({
  prefix,
  query,
  category,
  sort,
  minPrice,
  maxPrice,
  categories,
  sortOptions,
}: FilterFieldsProps) {
  return (
    <>
      {query && (
        <input type="hidden" name="q" value={query} />
      )}

      <fieldset>
        <legend className="mb-4 text-xs font-bold uppercase tracking-[0.14em]">
          Category
        </legend>

        <div className="grid grid-cols-2 gap-2">
          {categories.map((item) => (
            <label key={item.value} className="relative">
              <input
                type="radio"
                name="category"
                value={item.value}
                defaultChecked={category === item.value}
                className="peer sr-only"
              />

              <span className="flex min-h-11 cursor-pointer items-center justify-center border border-border px-2 py-3 text-center text-[11px] font-semibold uppercase leading-4 transition-colors peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label
          htmlFor={`${prefix}-sort`}
          className="mb-3 block text-xs font-bold uppercase tracking-[0.14em]"
        >
          Sort By
        </label>

        <select
          id={`${prefix}-sort`}
          name="sort"
          defaultValue={sort}
          className="min-h-11 w-full rounded-[2px] border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-accent"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className="mb-3 text-xs font-bold uppercase tracking-[0.14em]">
          Price Range
        </legend>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor={`${prefix}-min`}
              className="mb-2 block text-xs text-text-secondary"
            >
              Min Price ($)
            </label>

            <input
              id={`${prefix}-min`}
              name="minPrice"
              type="number"
              min="0"
              step="0.01"
              defaultValue={minPrice ?? ""}
              placeholder="0"
              className="min-h-11 w-full min-w-0 rounded-[2px] border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-accent"
            />
          </div>

          <div>
            <label
              htmlFor={`${prefix}-max`}
              className="mb-2 block text-xs text-text-secondary"
            >
              Max Price ($)
            </label>

            <input
              id={`${prefix}-max`}
              name="maxPrice"
              type="number"
              min="0"
              step="0.01"
              defaultValue={maxPrice ?? ""}
              placeholder="500"
              className="min-h-11 w-full min-w-0 rounded-[2px] border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-accent"
            />
          </div>
        </div>
      </fieldset>
    </>
  );
}

export default function ShopFilters(props: ShopFiltersProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const {
    category,
    sort,
    minPrice,
    maxPrice,
  } = props;

  const activeCount = [
    category !== "",
    sort !== "featured",
    minPrice !== undefined,
    maxPrice !== undefined,
  ].filter(Boolean).length;

  return (
    <>
      {/* Mobile trigger */}
      <div className="mb-6 flex items-center justify-between gap-3 lg:hidden">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Refine your selection
        </span>

        <button
          type="button"
          onClick={() => dialogRef.current?.showModal()}
          className="inline-flex min-h-11 items-center gap-2 rounded-[2px] border border-foreground px-4 text-xs font-bold uppercase tracking-wider text-foreground"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 7h16M7 12h10M10 17h4" />
          </svg>

          Filter & Sort

          {activeCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] text-white">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile bottom sheet */}
      <dialog
        ref={dialogRef}
        aria-labelledby="mobile-filter-title"
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            dialogRef.current?.close();
          }
        }}
        className="fixed inset-x-0 bottom-0 top-auto m-0 max-h-[88dvh] w-full max-w-none overflow-y-auto rounded-t-[2px] border-0 bg-background p-0 text-foreground backdrop:bg-black/55 open:flex open:flex-col lg:hidden"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background px-5 py-4">
          <h2
            id="mobile-filter-title"
            className="text-sm font-extrabold uppercase tracking-wider"
          >
            Filter Products
          </h2>

          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close filters"
            className="flex h-11 w-11 items-center justify-center text-2xl"
          >
            ×
          </button>
        </div>

        <form
          action="/shop"
          method="GET"
          className="flex flex-col"
        >
          <div className="space-y-8 px-5 py-6">
            <FilterFields {...props} prefix="mobile" />
          </div>

          <div className="sticky bottom-0 border-t border-border bg-background px-5 py-4 pb-[max(16px,env(safe-area-inset-bottom))]">
            <button
              type="submit"
              className="min-h-12 w-full rounded-[2px] bg-foreground px-5 text-xs font-bold uppercase tracking-[0.12em] text-white"
            >
              Show Products
            </button>
          </div>
        </form>
      </dialog>

      {/* Desktop filters */}
      <aside
        aria-label="Product filters"
        className="hidden lg:block"
      >
        <div className="border-t border-border pt-6">
          <h2 className="mb-8 text-sm font-extrabold uppercase tracking-[0.14em]">
            Filter & Sort
          </h2>

          <form
            action="/shop"
            method="GET"
            className="space-y-8"
          >
            <FilterFields {...props} prefix="desktop" />

            <button
              type="submit"
              className="min-h-12 w-full rounded-[2px] bg-foreground px-4 text-xs font-bold uppercase tracking-wider text-white"
            >
              Apply Filters
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
