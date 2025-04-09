"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MotorbikeCard } from "./motorbike-card";
import { useMotorbikeStore } from "../../store/use-motorbike-store";

interface MotorbikeGridProps {
    isLoading: boolean;
    error: Error | null;
}

export function MotorbikeGrid({ isLoading, error }: MotorbikeGridProps) {
    const { filteredMotorbikes, resetFilters } = useMotorbikeStore();

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-500">Loading motorbikes...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12 bg-red-50 rounded-lg">
                <p className="text-red-500 text-lg mb-2">
                    {error.message || "An error occurred"}
                </p>
                <Button
                    variant="outline"
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </Button>
            </div>
        );
    }

    if (filteredMotorbikes.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-gray-50 rounded-lg"
            >
                <Image
                    src="/placeholder.svg?height=120&width=120"
                    alt="No results"
                    width={120}
                    height={120}
                    className="mx-auto mb-4 opacity-50"
                />
                <h3 className="text-xl font-semibold mb-2">
                    No motorbikes found
                </h3>
                <p className="text-gray-500 mb-4">
                    Try adjusting your filters to find what you're looking for.
                </p>
                <Button onClick={resetFilters}>Reset All Filters</Button>
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            <AnimatePresence>
                {filteredMotorbikes.map((motorbike) => (
                    <MotorbikeCard key={motorbike.id} motorbike={motorbike} />
                ))}
            </AnimatePresence>
        </motion.div>
    );
}
