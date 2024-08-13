import { CartItemDTO } from '@/shared/services/dto/cart.dto';

interface OrderSuccessTemplateProps {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSuccessTemplate: React.FC<OrderSuccessTemplateProps> = ({ orderId, items }) => {
  return (
    <div>
      <h1>Спасибо за ваш заказ!</h1>
      <p>Ваш заказ #{orderId} успешно оплачен!. Купленные товары:</p>
      <hr />
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.productItem.product.name} | {item.productItem.price} ₽ x {item.quantity} шт. ={' '}
            {item.productItem.price * item.quantity} ₽
          </li>
        ))}
      </ul>
      <hr />
      <p>Ждём вас вновь!</p>
    </div>
  );
};
