import { DELIVERY_PRICE, VAT } from '../constants/pizza';

export const calcTotalOrderPrice = (totalAmount: number) => {
  const deliveryPrice = DELIVERY_PRICE;

  const vatPrice = Math.round((totalAmount * VAT) / 100);

  const totalPrice = totalAmount + deliveryPrice + vatPrice;

  return {
    vatPrice,
    deliveryPrice,
    totalPrice,
  };
};
