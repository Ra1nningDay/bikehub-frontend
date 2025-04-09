"use client";

import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMotorbikeStore } from "../../store/use-motorbike-store";
import { FilterSheet } from "./filter-sheet";

export function HeroSection() {
    const {
        searchQuery,
        setSearchQuery,
        activeFiltersCount,
        updateFilteredMotorbikes,
    } = useMotorbikeStore();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        updateFilteredMotorbikes(); // อัปเดตการกรองทันที
    };

    return (
        <section className="bg-blue-600 py-16 text-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                        Explore Our Motorbikes
                    </h1>
                    <p className="text-center max-w-2xl mx-auto mb-8">
                        Choose the motorbike that suits your dream trip and
                        start enjoying the beauty of nature.
                    </p>

                    <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-2 flex items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" />
                            <Input
                                type="text"
                                placeholder="Search by name or brand..."
                                className="pl-10 bg-white/20 border-none text-white placeholder:text-blue-200 focus-visible:ring-blue-400"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <FilterSheet>
                            <Button
                                variant="ghost"
                                className="ml-2 text-white hover:bg-white/20"
                            >
                                <Filter className="mr-2 h-4 w-4" />
                                Filters
                                {activeFiltersCount > 0 && (
                                    <Badge className="ml-2 bg-orange-500 hover:bg-orange-600">
                                        {activeFiltersCount}
                                    </Badge>
                                )}
                            </Button>
                        </FilterSheet>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
