interface OrderPayTemplateProps {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const OrderPayTemplate: React.FC<OrderPayTemplateProps> = ({
  orderId,
  totalAmount,
  paymentUrl,
}) => {
  return (
    <div>
      <h1>Заказ #{orderId}</h1>
      <p>
        Оплатите заказ на сумму <b>{totalAmount} ₽</b>. Чтобы оплатить заказ, перейдите по ссылке{' '}
        <a href={paymentUrl}>оплатить заказ</a> для заказа
      </p>
    </div>
  );
};
