'use client';
import { useRouter } from 'next/navigation';

import { Dialog } from '@/components/ui';
import { Title } from '../title';
import { Product } from '@prisma/client';
import { cn } from '@/lib/utils';
import { DialogContent } from '@/components/ui/dialog';

interface ProductModalProps {
  product: Product;
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
        <Title text={product.name} />
      </DialogContent>
    </Dialog>
  );
};
