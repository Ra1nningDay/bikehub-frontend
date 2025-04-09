"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorDisplayProps {
    error: string;
    onBack: () => void;
}

export function ErrorDisplay({ error, onBack }: ErrorDisplayProps) {
    return (
        <div className="container mx-auto px-4 py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto text-center bg-white p-8 rounded-xl shadow-md"
            >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold mb-3">
                    Something went wrong
                </h2>
                <p className="text-gray-600 mb-6">{error}</p>
                <Button onClick={onBack} className="w-full">
                    Back to Motorbikes
                </Button>
            </motion.div>
        </div>
    );
}
