'use client';
import { useRouter } from 'next/navigation';

import { ProductWithRelations } from '@/types/product';
import { Dialog } from '../../ui';
import { DialogContent } from '../../ui/dialog';
import { cn } from '@/shared/lib/utils';
import { ProductForm } from '../product-form';

interface ProductModalProps {
  product: ProductWithRelations;
  className?: string;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, className }) => {
  const router = useRouter();
  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className,
        )}>
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
