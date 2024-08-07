import { CartDTO } from '../services/dto/cart.dto';
import { calcCartItemTotalPrice } from './calc-cart-item-total-price';

export type StateCartItem = {
  id: number;
  name: string;
  imageUrl: string;
  quantity: number;
  price: number;
  ingredients: Array<{ name: string; price: number }>;
  disabled?: boolean;
  pizzaSize?: number | null;
  pizzaType?: number | null;
};

interface ReturnProps {
  items: StateCartItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    name: item.productItem.product.name,
    imageUrl: item.productItem.product.imageUrl,
    quantity: item.quantity,
    price: calcCartItemTotalPrice(item),
    pizzaSize: item.productItem.size,
    pizzaType: item.productItem.pizzaType,
    disabled: false,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  })) as StateCartItem[];
  return {
    items,
    totalAmount: data.totalAmount,
  };
};
