import { CartItem } from "@/types/cart.model";
import { Product } from "@/types/product.model";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemsCount: () => number;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(
          (item) => item.product.id === product.id
        );

        if (existingItem) {
          const updatedItems = items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          set({ items: updatedItems });
        } else {
          set({ items: [...items, { product, quantity }] });
        }
      },

      removeItem: (productId: number) => {
        const { items } = get();
        set({ items: items.filter((item) => item.product.id !== productId) });
      },

      updateQuantity: (productId: number, quantity: number) => {
        const { items } = get();
        if (quantity <= 0) {
          set({ items: items.filter((item) => item.product.id !== productId) });
          return;
        }

        const updatedItems = items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        );
        set({ items: updatedItems });
      },

      clearCart: () => set({ items: [] }),

      getCartTotal: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getItemsCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);

export default useCartStore;
