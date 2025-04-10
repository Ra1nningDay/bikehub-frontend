"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Motorbike } from "@/types";
import { useState } from "react";
import { BookingForm } from "./booking-form";

interface MotorbikeCardProps {
    motorbike: Motorbike;
}

export function MotorbikeCard({ motorbike }: MotorbikeCardProps) {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const brandName =
        typeof motorbike.brand === "object" && motorbike.brand !== null
            ? (motorbike.brand as unknown as { name: string }).name
            : typeof motorbike.brand === "string"
            ? motorbike.brand
            : "Unknown brand";

    const imageUrl = motorbike.image
        ? `${process.env.NEXT_PUBLIC_API_URL}/${motorbike.image.replace(
              /\\/g,
              "/"
          )}`
        : "/placeholder.svg?height=300&width=500";

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
            <div className="relative h-60 overflow-hidden group">
                <Image
                    src={imageUrl}
                    alt={motorbike.name || "Motorbike"}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-lg font-semibold">
                            {motorbike.name}
                        </h3>
                        <p className="text-sm text-gray-500">{brandName}</p>
                    </div>
                    <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
                        <span className="text-blue-600 font-semibold">
                            ${motorbike.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">/day</span>
                    </div>
                </div>

                <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                        <svg
                            key={i}
                            className={`w-4 h-4 ${
                                i < (motorbike.rating || 0)
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">
                        ({motorbike.rating?.toFixed(1) || "N/A"})
                    </span>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                    <span>{motorbike.engineSize || "N/A"}cc</span>
                    <span>
                        {motorbike.createdAt
                            ? new Date(motorbike.createdAt).getFullYear()
                            : "Year not available"}
                    </span>
                </div>

                <div className="flex space-x-2">
                    <Button asChild className="flex-1">
                        <Link href={`/motorbikes/motorbike/${motorbike.id}`}>
                            View Details
                        </Link>
                    </Button>
                    <Button
                        onClick={() => setIsBookingOpen(true)}
                        variant="outline"
                        className="flex-1"
                    >
                        Book Now
                    </Button>
                </div>
            </div>
            {/* Booking Form Modal */}
            {isBookingOpen && (
                <BookingForm
                    motorbike={motorbike}
                    onClose={() => setIsBookingOpen(false)}
                />
            )}
        </motion.div>
    );
}
