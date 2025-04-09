"use client";

import type { ReactNode } from "react";
import { useMotorbikeStore } from "../../store/use-motorbike-store";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface FilterSheetProps {
    children: ReactNode;
}

export function FilterSheet({ children }: FilterSheetProps) {
    const {
        priceRange,
        setPriceRange,
        selectedBrands,
        toggleBrand,
        resetFilters,
        minPrice,
        maxPrice,
        updateFilteredMotorbikes, // เพิ่มเข้ามา
    } = useMotorbikeStore();

    const brands = [
        "Honda",
        "Yamaha",
        "Kawasaki",
        "Suzuki",
        "Ducati",
        "BMW",
        "Harley-Davidson",
    ];

    // ฟังก์ชันช่วยเพื่ออัปเดตการกรอง
    const handleFilterChange = (action: () => void) => {
        action();
        updateFilteredMotorbikes();
    };

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>Filter Motorbikes</SheetTitle>
                    <SheetDescription>
                        Refine your search to find the perfect motorbike
                    </SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-4">
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                        defaultValue="price"
                    >
                        <AccordionItem value="price">
                            <AccordionTrigger>Price Range</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4 pt-2">
                                    <Slider
                                        defaultValue={[minPrice, maxPrice]}
                                        min={minPrice}
                                        max={maxPrice}
                                        step={10}
                                        value={priceRange}
                                        onValueChange={(value) =>
                                            handleFilterChange(() =>
                                                setPriceRange(
                                                    value as [number, number]
                                                )
                                            )
                                        }
                                    />
                                    <div className="flex justify-between">
                                        <span>${priceRange[0]}</span>
                                        <span>${priceRange[1]}</span>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="brands">
                            <AccordionTrigger>Brands</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-2 pt-2">
                                    {brands.map((brand) => (
                                        <div
                                            key={brand}
                                            className="flex items-center space-x-2"
                                        >
                                            <Checkbox
                                                id={`brand-${brand}`}
                                                checked={selectedBrands.includes(
                                                    brand
                                                )}
                                                onCheckedChange={() =>
                                                    handleFilterChange(() =>
                                                        toggleBrand(brand)
                                                    )
                                                }
                                            />
                                            <label
                                                htmlFor={`brand-${brand}`}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {brand}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <SheetFooter className="sm:justify-between flex-row gap-3">
                    <Button
                        variant="outline"
                        onClick={() => handleFilterChange(resetFilters)}
                    >
                        Reset Filters
                    </Button>
                    <SheetClose asChild>
                        <Button>Apply Filters</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
