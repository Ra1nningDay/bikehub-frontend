"use client";

import { useEffect, useState } from "react";
import { CalendarIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { format, differenceInDays } from "date-fns";
import { calculateTotalPrice } from "@/lib/booking-utils";
import type { BookingFormData } from "../../booking-form";
import type { Motorbike } from "@/types";

interface BookingDateStepProps {
    formData: BookingFormData;
    updateFormData: (data: Partial<BookingFormData>) => void;
    motorbike: Motorbike;
    onNext: () => void;
}

export function BookingDateStep({
    formData,
    updateFormData,
    motorbike,
    onNext,
}: BookingDateStepProps) {
    const [sameLocation, setSameLocation] = useState(true);

    // Location options
    const locationOptions = [
        { value: "Main Office", label: "Main Office - 123 Motorbike St." },
        { value: "Downtown", label: "Downtown - 456 Center Ave." },
        { value: "Airport", label: "Airport Terminal - 789 Airport Rd." },
    ];

    // Calculate days and total price when dates change
    useEffect(() => {
        if (formData.startDate && formData.endDate) {
            const days = Math.max(
                1,
                differenceInDays(formData.endDate, formData.startDate) + 1
            );
            const totalPrice = calculateTotalPrice(motorbike.price, days);

            // Only update if values have actually changed
            if (days !== formData.days || totalPrice !== formData.totalPrice) {
                updateFormData({
                    days,
                    totalPrice,
                });
            }
        }
    }, [
        formData.startDate,
        formData.endDate,
        motorbike.price,
        updateFormData,
        formData.days,
        formData.totalPrice,
    ]);

    // Handle same location checkbox change
    const handleSameLocationChange = (checked: boolean) => {
        setSameLocation(checked);
        if (checked) {
            updateFormData({ dropoffLocation: formData.pickupLocation });
        }
    };

    // Handle pickup location change
    const handlePickupLocationChange = (value: string) => {
        updateFormData({ pickupLocation: value });
        if (sameLocation) {
            updateFormData({ dropoffLocation: value });
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="start-date">Start Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                    id="start-date"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {formData.startDate ? (
                                        format(formData.startDate, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={formData.startDate}
                                    onSelect={(date) =>
                                        date &&
                                        updateFormData({ startDate: date })
                                    }
                                    disabled={(date) => date < new Date()}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="end-date">End Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                    id="end-date"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {formData.endDate ? (
                                        format(formData.endDate, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={formData.endDate}
                                    onSelect={(date) =>
                                        date &&
                                        updateFormData({ endDate: date })
                                    }
                                    disabled={(date) =>
                                        date < formData.startDate
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="pickup-location">Pickup Location</Label>
                    <Select
                        value={formData.pickupLocation}
                        onValueChange={handlePickupLocationChange}
                    >
                        <SelectTrigger id="pickup-location" className="w-full">
                            <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                            {locationOptions.map((location) => (
                                <SelectItem
                                    key={location.value}
                                    value={location.value}
                                >
                                    {location.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="same-location"
                        checked={sameLocation}
                        onCheckedChange={handleSameLocationChange}
                    />
                    <label
                        htmlFor="same-location"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Return to the same location
                    </label>
                </div>

                {!sameLocation && (
                    <div className="space-y-2">
                        <Label htmlFor="dropoff-location">
                            Dropoff Location
                        </Label>
                        <Select
                            value={formData.dropoffLocation}
                            onValueChange={(value) =>
                                updateFormData({ dropoffLocation: value })
                            }
                        >
                            <SelectTrigger
                                id="dropoff-location"
                                className="w-full"
                            >
                                <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                                {locationOptions.map((location) => (
                                    <SelectItem
                                        key={location.value}
                                        value={location.value}
                                    >
                                        {location.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>

            <Card className="bg-gray-50 border-gray-200">
                <CardContent className="pt-6">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Daily Rate:</span>
                            <span className="font-medium">
                                ${motorbike.price.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">
                                Number of Days:
                            </span>
                            <span className="font-medium">{formData.days}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                            <span className="font-semibold">Total Price:</span>
                            <span className="font-bold text-primary">
                                ${formData.totalPrice.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button onClick={onNext} size="lg">
                    Continue to Personal Details
                </Button>
            </div>
        </div>
    );
}
