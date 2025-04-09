"use client";

import { useMotorbikeStore } from "../../store/use-motorbike-store";
import { SortSelector } from "./sort-selector";

interface MotorbikeListHeaderProps {
    totalMotorbikes: number;
}

export function MotorbikeListHeader({
    totalMotorbikes,
}: MotorbikeListHeaderProps) {
    const { filteredMotorbikes } = useMotorbikeStore();

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div className="mb-4 sm:mb-0">
                <p className="text-gray-600">
                    Showing {filteredMotorbikes.length} of {totalMotorbikes}{" "}
                    motorbikes
                </p>
            </div>
            <SortSelector />
        </div>
    );
}
