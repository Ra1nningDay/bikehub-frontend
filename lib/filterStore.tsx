import { create } from "zustand";

interface FilterState {
  brand: string;
  category: string;
  priceRange: string;
  setBrand: (brand: string) => void;
  setCategory: (category: string) => void;
  setPriceRange: (priceRange: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  brand: "",
  category: "",
  priceRange: "",
  setBrand: (brand) => set(() => ({ brand })),
  setCategory: (category) => set(() => ({ category })),
  setPriceRange: (priceRange) => set(() => ({ priceRange })),
}));
