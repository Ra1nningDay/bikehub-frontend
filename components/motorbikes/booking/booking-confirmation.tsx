"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    CheckCircle2,
    Calendar,
    Clock,
    MapPin,
    Download,
    Share2,
} from "lucide-react";
import { getBrandName } from "@/lib/booking-utils";
import type { BookingFormData } from "../booking-form";
import type { Motorbike } from "@/types";

interface BookingConfirmationProps {
    bookingId: string;
    motorbike: Motorbike;
    formData: BookingFormData;
    isAuthenticated: boolean;
    onClose: () => void;
}

export function BookingConfirmation({
    bookingId,
    motorbike,
    formData,
    isAuthenticated,
    onClose,
}: BookingConfirmationProps) {
    const [copied, setCopied] = useState(false);
    const router = useRouter();
    const brandName = getBrandName(motorbike);

    const imageUrl = motorbike?.image
        ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${motorbike.image.replace(
              /\\/g,
              "/"
          )}`
        : "/placeholder.svg?height=200&width=300";

    const handleShare = () => {
        navigator.clipboard.writeText(
            `Booking confirmation: ${bookingId} for ${motorbike.name}`
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleViewBookings = () => {
        onClose();
        router.push("/account/bookings");
    };

    const handleCreateAccount = () => {
        onClose();
        router.push("/auth/register");
    };

    // Get location labels
    const getLocationLabel = (value: string) => {
        const locations = {
            "Main Office": "Main Office - 123 Motorbike St.",
            Downtown: "Downtown - 456 Center Ave.",
            Airport: "Airport Terminal - 789 Airport Rd.",
        };
        return locations[value as keyof typeof locations] || value;
    };

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-6"
            >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
                <p className="text-gray-600 mb-2">
                    Your booking has been successfully confirmed
                </p>
                <p className="text-gray-800 font-medium">
                    Booking ID: {bookingId}
                </p>
            </motion.div>

            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative h-40 w-full md:w-1/3 rounded-lg overflow-hidden">
                            <Image
                                src={imageUrl || "/placeholder.svg"}
                                alt={motorbike.name}
                                fill
                                className="object-cover"
                                onError={(e) => {
                                    e.currentTarget.src =
                                        "/placeholder.svg?height=200&width=300";
                                }}
                            />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold">
                                {motorbike.name}
                            </h2>
                            <p className="text-gray-600 mb-4">{brandName}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start">
                                    <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                                    <div>
                                        <p className="font-medium">Dates</p>
                                        <p className="text-gray-600">
                                            {format(formData.startDate, "PPP")}{" "}
                                            - {format(formData.endDate, "PPP")}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                                    <div>
                                        <p className="font-medium">
                                            Pickup Location
                                        </p>
                                        <p className="text-gray-600">
                                            {getLocationLabel(
                                                formData.pickupLocation
                                            )}
                                        </p>
                                    </div>
                                </div>

                                {formData.pickupLocation !==
                                    formData.dropoffLocation && (
                                    <div className="flex items-start">
                                        <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                                        <div>
                                            <p className="font-medium">
                                                Dropoff Location
                                            </p>
                                            <p className="text-gray-600">
                                                {getLocationLabel(
                                                    formData.dropoffLocation
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-start">
                                    <div className="bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full">
                                        $
                                        {(formData.totalPrice * 1.1).toFixed(2)}{" "}
                                        Total
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex flex-wrap gap-4 justify-center">
                <Button
                    variant="outline"
                    onClick={() => window.print()}
                    className="flex items-center gap-2"
                >
                    <Download className="h-4 w-4" />
                    Download Receipt
                </Button>
                <Button
                    variant="outline"
                    onClick={handleShare}
                    className="flex items-center gap-2"
                >
                    <Share2 className="h-4 w-4" />
                    {copied ? "Copied!" : "Share Booking"}
                </Button>
            </div>

            {!isAuthenticated && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center"
                >
                    <h3 className="text-lg font-semibold mb-2">
                        Create an Account
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Create an account to easily manage your bookings and get
                        access to special offers.
                    </p>
                    <Button onClick={handleCreateAccount}>
                        Create Account
                    </Button>
                </motion.div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {isAuthenticated ? (
                    <Button onClick={handleViewBookings}>
                        View My Bookings
                    </Button>
                ) : (
                    <Button onClick={onClose}>Continue Browsing</Button>
                )}
            </div>
        </div>
    );
}
