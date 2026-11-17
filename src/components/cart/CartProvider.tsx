
"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "ecommerce-cart";

const CartContext = createContext<CartContextValue | null>(null);

const EMPTY_CART: CartItem[] = [];

let cachedRaw: string | null = null;
let cachedItems: CartItem[] = EMPTY_CART;

const listeners = new Set<() => void>();

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    typeof item.id === "number" &&
    Number.isInteger(item.id) &&
    typeof item.title === "string" &&
    typeof item.price === "number" &&
    Number.isFinite(item.price) &&
    item.price >= 0 &&
    typeof item.image === "string" &&
    typeof item.quantity === "number" &&
    Number.isInteger(item.quantity) &&
    item.quantity >= 1 &&
    typeof item.stock === "number" &&
    Number.isInteger(item.stock) &&
    item.stock >= item.quantity
  );
}

function getSnapshot(): CartItem[] {
  if (typeof window === "undefined") {
    return EMPTY_CART;
  }

  const raw = localStorage.getItem(STORAGE_KEY);

  if (raw === cachedRaw) {
    return cachedItems;
  }

  cachedRaw = raw;

  if (!raw) {
    cachedItems = EMPTY_CART;
    return cachedItems;
  }

  try {
    const parsed: unknown = JSON.parse(raw);

    cachedItems = Array.isArray(parsed)
      ? parsed.filter(isCartItem)
      : EMPTY_CART;
  } catch {
    cachedItems = EMPTY_CART;
  }

  return cachedItems;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY_CART;
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  function handleStorage(event: StorageEvent) {
    if (event.key === STORAGE_KEY || event.key === null) {
      listener();
    }
  }

  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

  listeners.forEach((listener) => listener());
}

export default function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const items = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const itemCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function addItem(item: CartItem) {
    if (item.stock <= 0 || item.quantity <= 0) return;

    const currentItems = getSnapshot();

    const existingItem = currentItems.find(
      (product) => product.id === item.id
    );

    if (existingItem) {
      saveCart(
        currentItems.map((product) =>
          product.id === item.id
            ? {
                ...item,
                quantity: Math.min(
                  product.quantity + item.quantity,
                  item.stock
                ),
              }
            : product
        )
      );

      return;
    }

    saveCart([
      ...currentItems,
      {
        ...item,
        quantity: Math.min(item.quantity, item.stock),
      },
    ]);
  }

  function removeItem(id: number) {
    saveCart(
      getSnapshot().filter((item) => item.id !== id)
    );
  }

  function updateQuantity(id: number, quantity: number) {
    saveCart(
      getSnapshot().map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(
                1,
                Math.min(quantity, item.stock)
              ),
            }
          : item
      )
    );
  }

  function clearCart() {
    saveCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}
