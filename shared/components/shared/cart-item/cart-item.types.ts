export interface CartItemProps {
  id: number;
  name: string;
  price: number;
  details: string;
  imageUrl: string;
  quantity: number;
  disabled?: boolean;
}
