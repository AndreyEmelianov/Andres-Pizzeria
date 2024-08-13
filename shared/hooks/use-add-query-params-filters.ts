import qs from 'qs';
import React from 'react';
import { useRouter } from 'next/navigation';

import { Filters } from './use-filters';

export const useAddQueryParamsFilters = (filters: Filters) => {
  const isMounted = React.useRef(false);
  const router = useRouter();

  React.useEffect(() => {
    if (isMounted.current) {
      const paramsFilters = {
        ...filters.priceRange,
        pizzaTypes: Array.from(filters.selectedPizzaTypes),
        sizes: Array.from(filters.selectedSizes),
        ingredients: Array.from(filters.selectedIngredients),
      };

      const urlQueryString = qs.stringify(paramsFilters, {
        arrayFormat: 'comma',
      });

      router.push(`?${urlQueryString}`, { scroll: false });
    }

    isMounted.current = true;
  }, [filters]);
};
