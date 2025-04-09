"use client";

import { useMotorbikeStore } from "../../store/use-motorbike-store";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function SortSelector() {
    const { sortOption, setSortOption, updateFilteredMotorbikes } =
        useMotorbikeStore();

    const handleSortChange = (value: string) => {
        setSortOption(value);
        updateFilteredMotorbikes(); // อัปเดตการกรองเมื่อเปลี่ยนการเรียง
    };

    return (
        <Select value={sortOption} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low-high">
                    Price: Low to High
                </SelectItem>
                <SelectItem value="price-high-low">
                    Price: High to Low
                </SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
        </Select>
    );
}
