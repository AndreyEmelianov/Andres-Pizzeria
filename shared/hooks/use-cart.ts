import React from 'react';

import { useCartStore } from '../store';
import { StateCartItem } from '../lib/get-cart-details';
import { CreateCartItemValues } from '../services/dto/cart.dto';

type ReturnType = {
  items: StateCartItem[];
  totalAmount: number;
  loading: boolean;
  addCartItem: (values: CreateCartItemValues) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
};

export const useCart = (): ReturnType => {
  const cartState = useCartStore((state) => state);

  React.useEffect(() => {
    cartState.fetchCartItems();
  }, []);

  return cartState;
};
