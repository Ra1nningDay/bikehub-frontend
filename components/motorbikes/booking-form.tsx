"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth/use-auth";
import { createBooking } from "@/lib/api";
import type { Motorbike } from "@/types";
import { BookingDateStep } from "./booking/steps/booking-date-step";
import { BookingPersonalStep } from "./booking/steps/booking-personal-step";
import { BookingSummaryStep } from "./booking/steps/booking-summary-step";
import { BookingConfirmation } from "./booking/booking-confirmation";
import { BookingStepper } from "./booking/booking-stepper";

export interface BookingFormData {
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    fullName: string;
    email: string;
    phone: string;
    pickupLocation: string;
    totalPrice: number;
    days: number;
}

interface BookingFormProps {
    motorbike: Motorbike;
    onClose: () => void;
}

export function BookingForm({ motorbike, onClose }: BookingFormProps) {
    const { user } = useAuth();
    const { toast } = useToast();
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [bookingComplete, setBookingComplete] = useState(false);
    const [bookingId, setBookingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<BookingFormData>({
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 3)),
        startTime: "10:00",
        endTime: "10:00",
        fullName: user?.fullName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        pickupLocation: "Main Office",
        totalPrice: 0,
        days: 3,
    });

    const steps = [
        { title: "Dates", description: "Select booking dates" },
        { title: "Personal Info", description: "Enter your details" },
        { title: "Review", description: "Confirm your booking" },
    ];

    const handleNext = () => {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    };

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    const updateFormData = useCallback((data: Partial<BookingFormData>) => {
        setFormData((prev) => {
            // Check if any values are actually changing
            const hasChanges = Object.entries(data).some(
                ([key, value]) => prev[key as keyof BookingFormData] !== value
            );

            // Only update state if something is actually changing
            return hasChanges ? { ...prev, ...data } : prev;
        });
    }, []);

    const handleSubmit = async () => {
        try {
            // In a real app, you would call your API here
            const response = await createBooking({
                motorbikeId: motorbike.id,
                userId: user?.id,
                ...formData,
            });

            setBookingId(response.id);
            setBookingComplete(true);

            toast({
                title: "Booking Successful",
                description: `Your booking has been confirmed with ID: ${response.id}`,
            });
        } catch (error) {
            toast({
                title: "Booking Failed",
                description:
                    "There was an error processing your booking. Please try again.",
                variant: "destructive",
            });
        }
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
                        <h3 className="text-lg font-semibold">
                            {bookingComplete
                                ? "Booking Confirmed"
                                : `Book ${motorbike.name}`}
                        </h3>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="p-6">
                        {!bookingComplete ? (
                            <>
                                <BookingStepper
                                    steps={steps}
                                    currentStep={currentStep}
                                />

                                <div className="mt-6">
                                    {currentStep === 0 && (
                                        <BookingDateStep
                                            formData={formData}
                                            updateFormData={updateFormData}
                                            motorbike={motorbike}
                                            onNext={handleNext}
                                        />
                                    )}

                                    {currentStep === 1 && (
                                        <BookingPersonalStep
                                            formData={formData}
                                            updateFormData={updateFormData}
                                            isAuthenticated={!!user}
                                            onBack={handleBack}
                                            onNext={handleNext}
                                        />
                                    )}

                                    {currentStep === 2 && (
                                        <BookingSummaryStep
                                            formData={formData}
                                            motorbike={motorbike}
                                            onBack={handleBack}
                                            onSubmit={handleSubmit}
                                        />
                                    )}
                                </div>
                            </>
                        ) : (
                            <BookingConfirmation
                                bookingId={bookingId || ""}
                                motorbike={motorbike}
                                formData={formData}
                                isAuthenticated={!!user}
                                onClose={onClose}
                            />
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
