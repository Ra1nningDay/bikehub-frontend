"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
    X,
    Calendar,
    Clock,
    MapPin,
    DollarSign,
    CreditCard,
    Info,
    XCircle,
    CheckCircle,
    AlertTriangle,
} from "lucide-react";
import { getBrandName } from "@/lib/booking-utils";
import type { Booking } from "@/types";

interface BookingDetailsModalProps {
    booking: Booking;
    onClose: () => void;
    onCancel: (booking: Booking) => void;
}

export function BookingDetailsModal({
    booking,
    onClose,
    onCancel,
}: BookingDetailsModalProps) {
    const isUpcoming = new Date(booking.pickup_date) > new Date();
    const canCancel = isUpcoming && booking.status !== "cancelled";

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case "confirmed":
                return "default";
            case "completed":
                return "default";
            case "cancelled":
                return "destructive";
            default:
                return "secondary";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "confirmed":
                return <Info className="h-5 w-5" />;
            case "completed":
                return <CheckCircle className="h-5 w-5" />;
            case "cancelled":
                return <XCircle className="h-5 w-5" />;
            default:
                return <AlertTriangle className="h-5 w-5" />;
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
        return "/placeholder.svg?height=200&width=300";
    };

    const calculateDuration = () => {
        const pickup = new Date(booking.pickup_date);
        const dropoff = new Date(booking.dropoff_date);
        const diffTime = Math.abs(dropoff.getTime() - pickup.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const modalVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.1 } },
    };

    return (
        <AnimatePresence>
            <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={modalVariants}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
                onClick={onClose}
            >
                <motion.div
                    variants={contentVariants}
                    className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">
                                Booking Details
                            </h3>
                            <Badge
                                variant={getStatusBadgeVariant(booking.status)}
                                className="ml-2"
                            >
                                {booking.status.charAt(0).toUpperCase() +
                                    booking.status.slice(1)}
                            </Badge>
                        </div>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-6 mb-6">
                            <div className="relative h-48 md:h-auto md:w-1/3 rounded-lg overflow-hidden">
                                <Image
                                    src={
                                        getMotorbikeImage() ||
                                        "/placeholder.svg"
                                    }
                                    alt={getMotorbikeName()}
                                    fill
                                    className="object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            "/placeholder.svg?height=200&width=300";
                                    }}
                                />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-1">
                                    {getMotorbikeName()}
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    {getMotorbikeBrand()}
                                </p>

                                <div className="flex items-center gap-2 mb-4">
                                    {getStatusIcon(booking.status)}
                                    <span className="font-medium">
                                        {booking.status === "confirmed"
                                            ? "Your booking is confirmed"
                                            : booking.status === "completed"
                                            ? "This booking has been completed"
                                            : booking.status === "cancelled"
                                            ? "This booking has been cancelled"
                                            : "Booking status: " +
                                              booking.status}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <DollarSign className="h-5 w-5 text-green-600" />
                                    <span className="font-bold text-lg">
                                        ${booking.total_price.toFixed(2)}
                                    </span>
                                    <span className="text-gray-500 text-sm">
                                        for {calculateDuration()}{" "}
                                        {calculateDuration() === 1
                                            ? "day"
                                            : "days"}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <span>Booking ID: {booking.id}</span>
                                    <span>•</span>
                                    <span>
                                        Created on{" "}
                                        {format(
                                            new Date(booking.created_at),
                                            "PPP"
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <Card>
                                <CardContent className="p-4 space-y-4">
                                    <h4 className="font-semibold">
                                        Pickup Details
                                    </h4>

                                    <div className="flex items-start gap-3">
                                        <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Date
                                            </p>
                                            <p className="font-medium">
                                                {formatDate(
                                                    booking.pickup_date
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Time
                                            </p>
                                            <p className="font-medium">
                                                {formatTime(
                                                    booking.pickup_date
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Location
                                            </p>
                                            <p className="font-medium">
                                                {booking.pickup_location}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-4 space-y-4">
                                    <h4 className="font-semibold">
                                        Dropoff Details
                                    </h4>

                                    <div className="flex items-start gap-3">
                                        <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Date
                                            </p>
                                            <p className="font-medium">
                                                {formatDate(
                                                    booking.dropoff_date
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Time
                                            </p>
                                            <p className="font-medium">
                                                {formatTime(
                                                    booking.dropoff_date
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Location
                                            </p>
                                            <p className="font-medium">
                                                {booking.dropoff_location}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="mb-6">
                            <CardContent className="p-4 space-y-4">
                                <h4 className="font-semibold">
                                    Payment Details
                                </h4>

                                <div className="flex items-start gap-3">
                                    <CreditCard className="h-5 w-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Payment Method
                                        </p>
                                        <p className="font-medium">
                                            Credit Card (ending in 1234)
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <DollarSign className="h-5 w-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Payment Status
                                        </p>
                                        <p className="font-medium">Paid</p>
                                    </div>
                                </div>

                                <Separator className="my-2" />

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Daily Rate:
                                        </span>
                                        <span>
                                            $
                                            {(
                                                booking.total_price /
                                                calculateDuration()
                                            ).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Number of Days:
                                        </span>
                                        <span>{calculateDuration()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Taxes & Fees:
                                        </span>
                                        <span>
                                            $
                                            {(
                                                booking.total_price * 0.1
                                            ).toFixed(2)}
                                        </span>
                                    </div>
                                    <Separator className="my-2" />
                                    <div className="flex justify-between">
                                        <span className="font-bold">
                                            Total:
                                        </span>
                                        <span className="font-bold">
                                            ${booking.total_price.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={onClose}>
                                Close
                            </Button>
                            {canCancel && (
                                <Button
                                    variant="destructive"
                                    className="flex items-center gap-2"
                                    onClick={() => onCancel(booking)}
                                >
                                    <XCircle className="h-4 w-4" />
                                    Cancel Booking
                                </Button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
