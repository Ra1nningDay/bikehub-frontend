"use client";

import { useEffect } from "react";
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
    // Generate time options (every 30 minutes from 8:00 to 20:00)
    const timeOptions = [];
    for (let hour = 8; hour <= 20; hour++) {
        const hourStr = hour.toString().padStart(2, "0");
        timeOptions.push(`${hourStr}:00`);
        if (hour < 20) {
            timeOptions.push(`${hourStr}:30`);
        }
    }

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

                    <div className="space-y-2">
                        <Label htmlFor="start-time">Start Time</Label>
                        <Select
                            value={formData.startTime}
                            onValueChange={(value) =>
                                updateFormData({ startTime: value })
                            }
                        >
                            <SelectTrigger id="start-time" className="w-full">
                                <div className="flex items-center">
                                    <Clock className="mr-2 h-4 w-4 text-gray-500" />
                                    <SelectValue placeholder="Select time" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                {timeOptions.map((time) => (
                                    <SelectItem
                                        key={`start-${time}`}
                                        value={time}
                                    >
                                        {time}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
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

                    <div className="space-y-2">
                        <Label htmlFor="end-time">End Time</Label>
                        <Select
                            value={formData.endTime}
                            onValueChange={(value) =>
                                updateFormData({ endTime: value })
                            }
                        >
                            <SelectTrigger id="end-time" className="w-full">
                                <div className="flex items-center">
                                    <Clock className="mr-2 h-4 w-4 text-gray-500" />
                                    <SelectValue placeholder="Select time" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                {timeOptions.map((time) => (
                                    <SelectItem
                                        key={`end-${time}`}
                                        value={time}
                                    >
                                        {time}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="pickup-location">Pickup Location</Label>
                <Select
                    value={formData.pickupLocation}
                    onValueChange={(value) =>
                        updateFormData({ pickupLocation: value })
                    }
                >
                    <SelectTrigger id="pickup-location" className="w-full">
                        <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Main Office">
                            Main Office - 123 Motorbike St.
                        </SelectItem>
                        <SelectItem value="Downtown">
                            Downtown - 456 Center Ave.
                        </SelectItem>
                        <SelectItem value="Airport">
                            Airport Terminal - 789 Airport Rd.
                        </SelectItem>
                    </SelectContent>
                </Select>
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
