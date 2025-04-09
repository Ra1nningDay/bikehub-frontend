"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import type { Motorbike } from "@/types";

interface BookingFormProps {
    motorbike: Motorbike;
    onClose: () => void;
}

export function BookingForm({ motorbike, onClose }: BookingFormProps) {
    const [startDate, setStartDate] = useState<Date | undefined>(new Date());
    const [endDate, setEndDate] = useState<Date | undefined>(
        new Date(new Date().setDate(new Date().getDate() + 3))
    );
    const [step, setStep] = useState(1);

    const calculateDays = () => {
        if (!startDate || !endDate) return 0;
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const calculateTotal = () => {
        const days = calculateDays();
        return (days * motorbike.price).toFixed(2);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would submit the booking data to your API
        alert("Booking submitted successfully!");
        onClose();
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
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            >
                <motion.div
                    variants={contentVariants}
                    className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="text-lg font-semibold">
                            Book {motorbike.name}
                        </h3>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="p-6">
                        {step === 1 ? (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="pickup-date">
                                        Pickup Date
                                    </Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start text-left font-normal"
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {startDate ? (
                                                    format(startDate, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={startDate}
                                                onSelect={setStartDate}
                                                initialFocus
                                                disabled={(date) =>
                                                    date < new Date()
                                                }
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="return-date">
                                        Return Date
                                    </Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start text-left font-normal"
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {endDate ? (
                                                    format(endDate, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={endDate}
                                                onSelect={setEndDate}
                                                initialFocus
                                                disabled={(date) =>
                                                    date <
                                                    (startDate || new Date())
                                                }
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-lg mt-6">
                                    <div className="flex justify-between mb-2">
                                        <span>Daily Rate:</span>
                                        <span>
                                            ${motorbike.price.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>Number of Days:</span>
                                        <span>{calculateDays()}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                                        <span>Total:</span>
                                        <span>${calculateTotal()}</span>
                                    </div>
                                </div>

                                <Button
                                    className="w-full mt-4"
                                    onClick={() => setStep(2)}
                                >
                                    Continue to Personal Details
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="+1 (555) 123-4567"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="license">
                                        Driver's License Number
                                    </Label>
                                    <Input
                                        id="license"
                                        placeholder="DL12345678"
                                        required
                                    />
                                </div>

                                <div className="flex gap-4 mt-6">
                                    <Button
                                        variant="outline"
                                        type="button"
                                        className="flex-1"
                                        onClick={() => setStep(1)}
                                    >
                                        Back
                                    </Button>
                                    <Button type="submit" className="flex-1">
                                        Complete Booking
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
