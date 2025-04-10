"use client";

import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Clock, MapPin, User, Mail, Phone } from "lucide-react";
import { getBrandName } from "@/lib/booking-utils";
import type { BookingFormData } from "../../booking-form";
import type { Motorbike } from "@/types";

interface BookingSummaryStepProps {
    formData: BookingFormData;
    motorbike: Motorbike;
    onBack: () => void;
    onSubmit: () => void;
}

export function BookingSummaryStep({
    formData,
    motorbike,
    onBack,
    onSubmit,
}: BookingSummaryStepProps) {
    const brandName = getBrandName(motorbike);

    const imageUrl = motorbike?.image
        ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${motorbike.image.replace(
              /\\/g,
              "/"
          )}`
        : "/placeholder.svg?height=200&width=300";

    return (
        <div className="space-y-6">
            <Card className="overflow-hidden">
                <div className="relative h-40 w-full">
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
                <CardContent className="p-6">
                    <h3 className="text-xl font-bold">{motorbike.name}</h3>
                    <p className="text-gray-600">{brandName}</p>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardContent className="p-6 space-y-4">
                        <h3 className="font-semibold text-lg">
                            Booking Details
                        </h3>

                        <div className="flex items-start">
                            <CalendarIcon className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                            <div>
                                <p className="font-medium">Dates</p>
                                <p className="text-gray-600">
                                    {format(formData.startDate, "PPP")} -{" "}
                                    {format(formData.endDate, "PPP")}
                                </p>
                                <p className="text-sm text-gray-500">
                                    ({formData.days} days)
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <Clock className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                            <div>
                                <p className="font-medium">Times</p>
                                <p className="text-gray-600">
                                    Pickup: {formData.startTime} • Return:{" "}
                                    {formData.endTime}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                            <div>
                                <p className="font-medium">Pickup Location</p>
                                <p className="text-gray-600">
                                    {formData.pickupLocation}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 space-y-4">
                        <h3 className="font-semibold text-lg">
                            Personal Information
                        </h3>

                        <div className="flex items-start">
                            <User className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                            <div>
                                <p className="font-medium">Full Name</p>
                                <p className="text-gray-600">
                                    {formData.fullName}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                            <div>
                                <p className="font-medium">Email</p>
                                <p className="text-gray-600">
                                    {formData.email}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                            <div>
                                <p className="font-medium">Phone</p>
                                <p className="text-gray-600">
                                    {formData.phone}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">
                        Price Summary
                    </h3>

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Daily Rate:</span>
                            <span>${motorbike.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">
                                Number of Days:
                            </span>
                            <span>{formData.days}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between">
                            <span className="font-semibold">Subtotal:</span>
                            <span className="font-semibold">
                                ${formData.totalPrice.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Taxes & Fees:</span>
                            <span>
                                ${(formData.totalPrice * 0.1).toFixed(2)}
                            </span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between">
                            <span className="text-lg font-bold">Total:</span>
                            <span className="text-lg font-bold text-primary">
                                ${(formData.totalPrice * 1.1).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={onBack}>
                    Back
                </Button>
                <Button onClick={onSubmit}>Confirm Booking</Button>
            </div>
        </div>
    );
}
