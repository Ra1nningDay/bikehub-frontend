"use client";

import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMotorbikeStore } from "@/store/use-motorbike-store";

export function ActiveFilters() {
    const {
        activeFiltersCount,
        searchQuery,
        setSearchQuery,
        priceRange,
        setPriceRange,
        selectedBrands,
        toggleBrand,
        selectedCategories,
        toggleCategory,
        resetFilters,
        minPrice,
        maxPrice,
        updateFilteredMotorbikes, // เพิ่มเข้ามา
    } = useMotorbikeStore();

    if (activeFiltersCount === 0) return null;

    // ฟังก์ชันช่วยเพื่ออัปเดตการกรองหลังเปลี่ยน state
    const handleFilterChange = (action: () => void) => {
        action();
        updateFilteredMotorbikes();
    };

    return (
        <div className="mb-6 flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-600">Active filters:</span>

            {searchQuery && (
                <Badge
                    variant="outline"
                    className="flex items-center gap-1 px-3 py-1"
                >
                    Search: {searchQuery}
                    <button
                        onClick={() =>
                            handleFilterChange(() => setSearchQuery(""))
                        }
                    >
                        <X className="h-3 w-3 ml-1" />
                    </button>
                </Badge>
            )}

            {(priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
                <Badge
                    variant="outline"
                    className="flex items-center gap-1 px-3 py-1"
                >
                    Price: ${priceRange[0]} - ${priceRange[1]}
                    <button
                        onClick={() =>
                            handleFilterChange(() =>
                                setPriceRange([minPrice, maxPrice])
                            )
                        }
                    >
                        <X className="h-3 w-3 ml-1" />
                    </button>
                </Badge>
            )}

            {selectedBrands.map((brand) => (
                <Badge
                    key={brand}
                    variant="outline"
                    className="flex items-center gap-1 px-3 py-1"
                >
                    {brand}
                    <button
                        onClick={() =>
                            handleFilterChange(() => toggleBrand(brand))
                        }
                    >
                        <X className="h-3 w-3 ml-1" />
                    </button>
                </Badge>
            ))}

            {selectedCategories.map((category) => (
                <Badge
                    key={category}
                    variant="outline"
                    className="flex items-center gap-1 px-3 py-1"
                >
                    {category}
                    <button
                        onClick={() =>
                            handleFilterChange(() => toggleCategory(category))
                        }
                    >
                        <X className="h-3 w-3 ml-1" />
                    </button>
                </Badge>
            ))}

            <Button
                variant="ghost"
                size="sm"
                onClick={() => handleFilterChange(resetFilters)}
                className="text-sm"
            >
                Clear all
            </Button>
        </div>
    );
}
