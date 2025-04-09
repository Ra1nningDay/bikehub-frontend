import { create } from "zustand";
import type { Motorbike } from "@/types";

interface MotorbikeState {
    // API-related state
    motorbikes: Motorbike[]; // ข้อมูลดั้งเดิมจาก API
    loading: boolean; // สถานะการโหลด
    error: string | null; // ข้อผิดพลาด (ถ้ามี)

    // Search and filter state
    searchQuery: string;
    priceRange: [number, number];
    selectedBrands: string[];
    selectedCategories: string[];
    sortOption: string;
    activeFiltersCount: number;
    minPrice: number;
    maxPrice: number;
    filteredMotorbikes: Motorbike[];

    // Actions
    setMotorbikes: (motorbikes: Motorbike[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setSearchQuery: (query: string) => void;
    setPriceRange: (range: [number, number]) => void;
    toggleBrand: (brand: string) => void;
    toggleCategory: (category: string) => void;
    setSortOption: (option: string) => void;
    resetFilters: () => void;
    updateFilteredMotorbikes: () => void; // ปรับให้ใช้ state ภายใน
    updatePriceRange: () => void; // ปรับให้ใช้ state ภายใน
}

export const useMotorbikeStore = create<MotorbikeState>((set, get) => ({
    // Initial state
    motorbikes: [],
    loading: false,
    error: null,
    searchQuery: "",
    priceRange: [0, 1000],
    selectedBrands: [],
    selectedCategories: [],
    sortOption: "featured",
    activeFiltersCount: 0,
    minPrice: 0,
    maxPrice: 1000,
    filteredMotorbikes: [],

    // Actions
    setMotorbikes: (motorbikes) => set({ motorbikes }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),

    setSearchQuery: (query) => set({ searchQuery: query }),

    setPriceRange: (range) => set({ priceRange: range }),

    toggleBrand: (brand) =>
        set((state) => ({
            selectedBrands: state.selectedBrands.includes(brand)
                ? state.selectedBrands.filter((b) => b !== brand)
                : [...state.selectedBrands, brand],
        })),

    toggleCategory: (category) =>
        set((state) => ({
            selectedCategories: state.selectedCategories.includes(category)
                ? state.selectedCategories.filter((c) => c !== category)
                : [...state.selectedCategories, category],
        })),

    setSortOption: (option) => set({ sortOption: option }),

    resetFilters: () =>
        set((state) => ({
            searchQuery: "",
            priceRange: [state.minPrice, state.maxPrice],
            selectedBrands: [],
            selectedCategories: [],
            sortOption: "featured",
        })),

    updatePriceRange: () => {
        const { motorbikes } = get();
        if (!motorbikes.length) return;

        const minPrice = Math.min(...motorbikes.map((bike) => bike.price));
        const maxPrice = Math.max(...motorbikes.map((bike) => bike.price));

        set({
            minPrice,
            maxPrice,
            priceRange: [minPrice, maxPrice],
        });
    },

    updateFilteredMotorbikes: () => {
        const {
            motorbikes,
            searchQuery,
            priceRange,
            selectedBrands,
            selectedCategories,
            sortOption,
            minPrice,
            maxPrice,
        } = get();

        if (!motorbikes.length) {
            set({ filteredMotorbikes: [], activeFiltersCount: 0 });
            return;
        }

        let filtered = [...motorbikes];

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter((bike) => {
                const brandName =
                    typeof bike.brand === "object" && bike.brand !== null
                        ? (bike.brand as unknown as { name: string }).name
                        : bike.brand;

                return (
                    bike.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    (brandName &&
                        brandName
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()))
                );
            });
        }

        // Apply price range filter
        filtered = filtered.filter(
            (bike) => bike.price >= priceRange[0] && bike.price <= priceRange[1]
        );

        // Apply brand filter
        if (selectedBrands.length > 0) {
            filtered = filtered.filter((bike) => {
                const brandName =
                    typeof bike.brand === "object" && bike.brand !== null
                        ? (bike.brand as unknown as { name: string }).name
                        : bike.brand;
                return brandName && selectedBrands.includes(brandName);
            });
        }

        // Apply sorting
        const sortedFiltered = [...filtered];
        switch (sortOption) {
            case "price-low-high":
                sortedFiltered.sort((a, b) => a.price - b.price);
                break;
            case "price-high-low":
                sortedFiltered.sort((a, b) => b.price - a.price);
                break;
            case "newest":
                sortedFiltered.sort((a, b) => {
                    const dateA = a.createdAt
                        ? new Date(a.createdAt).getTime()
                        : 0;
                    const dateB = b.createdAt
                        ? new Date(b.createdAt).getTime()
                        : 0;
                    return dateB - dateA;
                });
                break;
            case "rating":
                sortedFiltered.sort(
                    (a, b) => (b.rating || 0) - (a.rating || 0)
                );
                break;
            default:
                break;
        }

        // Count active filters
        let count = 0;
        if (searchQuery) count++;
        if (priceRange[0] > minPrice || priceRange[1] < maxPrice) count++;
        count += selectedBrands.length;
        count += selectedCategories.length;

        set({
            filteredMotorbikes: sortedFiltered,
            activeFiltersCount: count,
        });
    },
}));
