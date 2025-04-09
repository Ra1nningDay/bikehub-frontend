// app/motorbikes/page.tsx
"use client";

import { useEffect } from "react";
import useMotorbikes from "@/hooks/mototbikes/use-motorbikes";
import { useMotorbikeStore } from "@/store/use-motorbike-store";
import { HeroSection } from "@/components/motorbikes/hero-section";
import { ActiveFilters } from "@/components/motorbikes/active-filter";
import { MotorbikeListHeader } from "@/components/motorbikes/motorbikes-list-header";
import { MotorbikeGrid } from "@/components/motorbikes/motorbike-grid";
import { FilterSheet } from "@/components/motorbikes/filter-sheet";
import { Button } from "@/components/ui/button";

export default function MotorbikePage() {
    const { allMotorbikes, isLoading, isError, error } = useMotorbikes();
    const { filteredMotorbikes, updatePriceRange } = useMotorbikeStore();

    useEffect(() => {
        updatePriceRange();
    }, [allMotorbikes, updatePriceRange]);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <p>Loading motorbikes...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="container mx-auto px-4 py-12">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <>
            <HeroSection />
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <MotorbikeListHeader
                        totalMotorbikes={allMotorbikes.length}
                    />
                    <div className="flex justify-between mb-4">
                        <ActiveFilters />
                        <FilterSheet>
                            <Button variant="outline">Filter</Button>
                        </FilterSheet>
                    </div>
                    <MotorbikeGrid
                        motorbikes={filteredMotorbikes}
                        isLoading={isLoading}
                        error={error ? new Error(error) : null}
                    />
                </div>
            </section>
        </>
    );
}
