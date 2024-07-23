import { create } from 'zustand';

interface CategoryState {
  activeCategoryId: number;
  setActiveCategoryId: (activeId: number) => void;
}

export const useCategoryStore = create<CategoryState>()((set) => ({
  activeCategoryId: 1,
  setActiveCategoryId: (activeCategoryId: number) => set({ activeCategoryId }),
}));
