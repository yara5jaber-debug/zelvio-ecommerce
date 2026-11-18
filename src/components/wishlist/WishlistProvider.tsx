
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import type { Product } from "@/components/products/ProductCard";

const STORAGE_KEY = "zelvio-wishlist";
const EMPTY_WISHLIST = "[]";

type WishlistContextType = {
  items: Product[];
  count: number;
  isSaved: (id: number) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
};

const WishlistContext =
  createContext<WishlistContextType | null>(null);

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);

  window.addEventListener("storage", listener);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getSnapshot() {
  return (
    window.localStorage.getItem(STORAGE_KEY) ??
    EMPTY_WISHLIST
  );
}

function getServerSnapshot() {
  return EMPTY_WISHLIST;
}

function readWishlist(snapshot: string): Product[] {
  try {
    const parsed: unknown = JSON.parse(snapshot);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is Product =>
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "number" &&
        typeof item.title === "string" &&
        typeof item.category === "string" &&
        typeof item.price === "number" &&
        typeof item.image === "string"
    );
  } catch {
    return [];
  }
}

function saveWishlist(items: Product[]) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items)
    );

    listeners.forEach((listener) => listener());
  } catch {
    // Storage may be unavailable or full.
  }
}

export function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const items = useMemo(
    () => readWishlist(snapshot),
    [snapshot]
  );

  const isSaved = useCallback(
    (id: number) =>
      items.some((item) => item.id === id),
    [items]
  );

  const toggleWishlist = useCallback(
    (product: Product) => {
      const exists = items.some(
        (item) => item.id === product.id
      );

      const updated = exists
        ? items.filter(
            (item) => item.id !== product.id
          )
        : [...items, product];

      saveWishlist(updated);
    },
    [items]
  );

  const removeFromWishlist = useCallback(
    (id: number) => {
      saveWishlist(
        items.filter((item) => item.id !== id)
      );
    },
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      isSaved,
      toggleWishlist,
      removeFromWishlist,
    }),
    [
      items,
      isSaved,
      toggleWishlist,
      removeFromWishlist,
    ]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}
