import { cn } from '@/lib/utils';
import { Title } from './title';
import { ProductCard } from './product-card';

interface ProductsGroupListProps {
  title: string;
  categoryId: number;
  products: any[];
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<ProductsGroupListProps> = ({
  title,
  products,
  className,
  listClassName,
}) => {
  return (
    <div className={className}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
          />
        ))}
      </div>
    </div>
  );
};
