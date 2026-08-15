"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { CartItem } from "@/lib/types";

const STORAGE_KEY = "ashmoss.cart";

const EMPTY: CartItem[] = [];
let cache: CartItem[] | null = null;
const listeners = new Set<() => void>();

function readCache(): CartItem[] {
  if (cache) return cache;
  try {
    cache = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as CartItem[];
  } catch {
    cache = [];
  }
  return cache;
}

function readHydrated(): boolean {
  return readCache() !== null;
}

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

function getServerSnapshot(): CartItem[] {
  return EMPTY;
}

function commit(next: CartItem[]) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage unavailable (private mode) → cart is session-only
  }
  listeners.forEach((l) => l());
}

const keyOf = (productId: number, variantId: number | null) =>
  `${productId}:${variantId ?? 0}`;

type AddInput = Omit<CartItem, "quantity"> & { quantity?: number };

type CartContextValue = {
  items: CartItem[];
  hydrated: boolean;
  count: number;
  subtotal: number;
  add: (item: AddInput) => void;
  setQty: (productId: number, variantId: number | null, qty: number) => void;
  remove: (productId: number, variantId: number | null) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  // getServerSnapshot keeps SSR/hydration in sync (empty cart on the server);
  // the real snapshot is read from localStorage after hydration. `hydrated`
  // flips false→true once that read happens.
  const items = useSyncExternalStore(subscribe, readCache, getServerSnapshot);
  const hydrated = useSyncExternalStore(subscribe, readHydrated, () => false);

  const value = useMemo<CartContextValue>(() => {
    const add: CartContextValue["add"] = (item) => {
      const next = [...readCache()];
      const k = keyOf(item.productId, item.variantId);
      const idx = next.findIndex((i) => keyOf(i.productId, i.variantId) === k);
      if (idx === -1) {
        next.push({ ...item, quantity: item.quantity ?? 1 });
      } else {
        next[idx] = {
          ...next[idx],
          quantity: Math.min(next[idx].quantity + (item.quantity ?? 1), next[idx].maxStock),
        };
      }
      commit(next);
    };

    const setQty: CartContextValue["setQty"] = (productId, variantId, qty) => {
      commit(
        readCache().map((i) =>
          keyOf(i.productId, i.variantId) === keyOf(productId, variantId)
            ? { ...i, quantity: Math.max(1, Math.min(qty, i.maxStock)) }
            : i,
        ),
      );
    };

    const remove: CartContextValue["remove"] = (productId, variantId) => {
      commit(readCache().filter((i) => keyOf(i.productId, i.variantId) !== keyOf(productId, variantId)));
    };

    const clear = () => commit([]);
    const count = items.reduce((n, i) => n + i.quantity, 0);
    const subtotal = items.reduce((n, i) => n + i.price * i.quantity, 0);

    return { items, hydrated, count, subtotal, add, setQty, remove, clear };
  }, [items, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
