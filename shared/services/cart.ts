import { axiosInstance } from './instance';
import { CartDTO } from './dto/cart.dto';

export const getCart = async (): Promise<CartDTO> => {
  const { data } = await axiosInstance.get<CartDTO>('/cart');
  return data;
};

export const updateItemQuantity = async (
  cartItemId: number,
  quantity: number,
): Promise<CartDTO> => {
  const { data } = await axiosInstance.patch<CartDTO>('/cart/' + cartItemId, { quantity });
  return data;
};
