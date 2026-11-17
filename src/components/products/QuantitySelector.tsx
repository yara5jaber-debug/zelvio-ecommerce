
"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";

type QuantitySelectorProps = {
  id: number;
  title: string;
  price: number;
  image: string;
  stock: number;
};

export default function QuantitySelector({
  id,
  title,
  price,
  image,
  stock,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { addItem, items } = useCart();

  const cartQuantity =
    items.find((item) => item.id === id)?.quantity ?? 0;

  const remainingStock = Math.max(0, stock - cartQuantity);

  const selectedQuantity =
    remainingStock === 0
      ? 0
      : Math.min(quantity, remainingStock);

  const totalPrice = selectedQuantity * price;

  function decreaseQuantity() {
    setQuantity((current) => Math.max(1, current - 1));
    setAdded(false);
  }

  function increaseQuantity() {
    setQuantity((current) =>
      Math.min(remainingStock, current + 1)
    );
    setAdded(false);
  }

  function handleAddToCart() {
    if (selectedQuantity === 0) return;

    addItem({
      id,
      title,
      price,
      image,
      stock,
      quantity: selectedQuantity,
    });

    setQuantity(1);
    setAdded(true);
  }

  return (
    <div className="border-t border-border py-6">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
        Quantity
      </p>

      <div className="inline-flex items-center border border-border">
        <button
          type="button"
          onClick={decreaseQuantity}
          disabled={selectedQuantity <= 1}
          aria-label="Decrease quantity"
          className="flex h-12 w-12 items-center justify-center text-lg text-foreground transition-colors hover:bg-image-sand disabled:cursor-not-allowed disabled:opacity-30"
        >
          −
        </button>

        <output
          aria-live="polite"
          className="flex h-12 w-12 items-center justify-center border-x border-border text-sm font-semibold text-foreground"
        >
          {selectedQuantity}
        </output>

        <button
          type="button"
          onClick={increaseQuantity}
          disabled={
            remainingStock === 0 ||
            selectedQuantity >= remainingStock
          }
          aria-label="Increase quantity"
          className="flex h-12 w-12 items-center justify-center text-lg text-foreground transition-colors hover:bg-image-sand disabled:cursor-not-allowed disabled:opacity-30"
        >
          +
        </button>
      </div>

      <p className="mt-3 text-xs text-text-secondary">
        {stock <= 0
          ? "Currently unavailable"
          : remainingStock === 0
            ? "All available items are in your cart"
            : `${remainingStock} more available to add`}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Total Price
        </span>

        <output
          aria-live="polite"
          className="text-xl font-bold text-foreground"
        >
          ${totalPrice.toFixed(2)}
        </output>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={selectedQuantity === 0}
        className="mt-6 min-h-12 w-full bg-foreground px-6 text-xs font-semibold uppercase tracking-widest text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {stock <= 0
          ? "Out of Stock"
          : remainingStock === 0
            ? "Maximum Quantity in Cart"
            : "Add to Cart"}
      </button>

      {added && (
        <div
          role="status"
          className="mt-4 flex flex-wrap items-center justify-between gap-3 border border-border p-4"
        >
          <p className="text-sm font-medium text-foreground">
            ✓ Product added to your bag
          </p>

          <Link
            href="/cart"
            className="text-xs font-bold uppercase tracking-wider text-accent underline underline-offset-4"
          >
            View Cart
          </Link>
        </div>
      )}
    </div>
  );
}
