"use client";

import Image from "next/image";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    Clock,
    MapPin,
    DollarSign,
    Eye,
    XCircle,
} from "lucide-react";
import { getBrandName } from "@/lib/booking-utils";
import type { Booking } from "@/types";

interface BookingCardProps {
    booking: Booking;
    onViewDetails: () => void;
    onCancelBooking: () => void;
}

export function BookingCard({
    booking,
    onViewDetails,
    onCancelBooking,
}: BookingCardProps) {
    const isUpcoming = new Date(booking.pickup_date) > new Date();
    const canCancel = isUpcoming && booking.status !== "cancelled";

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case "confirmed":
                return "default";
            case "completed":
                return "secondary";
            case "cancelled":
                return "destructive";
            default:
                return "secondary";
        }
    };

    const formatDate = (date: Date) => {
        return format(new Date(date), "PPP");
    };

    const formatTime = (date: Date) => {
        return format(new Date(date), "p");
    };

    const getMotorbikeName = () => {
        if (booking.motorbike) {
            return booking.motorbike.name;
        }
        return "Motorbike";
    };

    const getMotorbikeBrand = () => {
        if (booking.motorbike) {
            return getBrandName(booking.motorbike);
        }
        return "";
    };

    const getMotorbikeImage = () => {
        if (booking.motorbike?.image) {
            return `${
                process.env.NEXT_PUBLIC_API_URL
            }/${booking.motorbike.image.replace(/\\/g, "/")}`;
        }
        return "/placeholder.svg?height=100&width=150";
    };

    return (
        <Card className="overflow-hidden">
            <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                    <div className="relative h-48 md:h-auto md:w-48 bg-gray-100">
                        <Image
                            src={getMotorbikeImage() || "/placeholder.svg"}
                            alt={getMotorbikeName()}
                            fill
                            className="object-cover"
                            onError={(e) => {
                                e.currentTarget.src =
                                    "/placeholder.svg?height=100&width=150";
                            }}
                        />
                    </div>
                    <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-lg font-bold">
                                        {getMotorbikeName()}
                                    </h3>
                                    <Badge
                                        variant={getStatusBadgeVariant(
                                            booking.status
                                        )}
                                    >
                                        {booking.status
                                            .charAt(0)
                                            .toUpperCase() +
                                            booking.status.slice(1)}
                                    </Badge>
                                </div>
                                <p className="text-gray-600 mb-4">
                                    {getMotorbikeBrand()}
                                </p>
                            </div>
                            <div className="flex items-center mt-2 md:mt-0">
                                <DollarSign className="h-5 w-5 text-green-600" />
                                <span className="font-bold text-lg">
                                    {booking.total_price.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-start gap-2">
                                <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Pickup Date
                                    </p>
                                    <p className="font-medium">
                                        {formatDate(booking.pickup_date)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Dropoff Date
                                    </p>
                                    <p className="font-medium">
                                        {formatDate(booking.dropoff_date)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 mt-4">
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2"
                                onClick={onViewDetails}
                            >
                                <Eye className="h-4 w-4" />
                                View Details
                            </Button>
                            {canCancel && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-2 text-red-600 hover:bg-red-50"
                                    onClick={onCancelBooking}
                                >
                                    <XCircle className="h-4 w-4" />
                                    Cancel Booking
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
