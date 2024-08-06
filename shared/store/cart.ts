import { create } from 'zustand';

import { Api } from '../services/api-client';
import { getCartDetails } from '../lib';
import { StateCartItem } from '../lib/get-cart-details';

export interface CartState {
  items: StateCartItem[];
  totalAmount: number;
  loading: boolean;
  error: boolean;
  fetchCartItems: () => Promise<void>;
  addCartItem: (values: any) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  loading: true,
  error: false,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.getCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
  addCartItem: async (values: any) => {},
  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.updateItemQuantity(id, quantity);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
  removeCartItem: async (id: number) => {},
}));
