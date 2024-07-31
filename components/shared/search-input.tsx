'use client';
import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useClickAway, useDebounce } from 'react-use';

import { cn } from '@/lib/utils';
import { Api } from '@/services/api-client';
import { Product } from '@prisma/client';

interface SearchInputProps {
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ className }) => {
  const [isFocusedSearchInput, setIsFocusedSearchInput] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [foundProducts, setFoundProducts] = React.useState<Product[]>([]);

  const searchRef = React.useRef(null);

  useClickAway(searchRef, () => {
    setIsFocusedSearchInput(false);
  });

  useDebounce(
    async () => {
      try {
        const response = await Api.searchProducts.search(searchQuery);
        setFoundProducts(response);
      } catch (error) {
        console.log(error);
      }
    },
    250,
    [searchQuery],
  );

  const clickProductHandler = () => {
    setIsFocusedSearchInput(false);
    setSearchQuery('');
  };

  return (
    <>
      {isFocusedSearchInput && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/40 z-30" />
      )}

      <div
        ref={searchRef}
        className={cn('flex flex-1 justify-between rounded-2xl relative h-11 z-30', className)}>
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Найти товар..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          onFocus={() => setIsFocusedSearchInput(true)}
          className="w-full rounded-2xl outline-none pl-11 bg-gray-100"
        />

        {foundProducts.length > 0 && (
          <div
            className={cn(
              'absolute w-full rounded-xl py-2 top-14 bg-white shadow-md transition-all duration-200 invisible opacity-0 z-30',
              isFocusedSearchInput && 'visible opacity-100 top-12',
            )}>
            {foundProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                onClick={clickProductHandler}
                className="flex items-center gap-3 px-3 py-2 hover:bg-primary/10">
                <img src={product.imageUrl} alt={product.name} className="rounded-sm h-10 w-10" />
                <span className="font-bold">{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
