"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth/use-auth";
import { useBooking } from "@/hooks/booking/use-booking";
import type { Motorbike } from "@/types";
import { BookingDateStep } from "./booking/steps/booking-date-step";
import { BookingPersonalStep } from "./booking/steps/booking-personal-step";
import { BookingSummaryStep } from "./booking/steps/booking-summary-step";
import { BookingConfirmation } from "./booking/booking-confirmation";
import { BookingStepper } from "./booking/booking-stepper";

export interface BookingFormData {
    startDate: Date;
    endDate: Date;
    fullName: string;
    email: string;
    phone: string;
    pickupLocation: string;
    dropoffLocation: string;
    totalPrice: number;
    days: number;
}

interface BookingFormProps {
    motorbike: Motorbike;
    onClose: () => void;
}

export function BookingForm({ motorbike, onClose }: BookingFormProps) {
    const { user } = useAuth();
    const { createBooking } = useBooking();
    const { toast } = useToast();
    const [currentStep, setCurrentStep] = useState(0);
    const [bookingComplete, setBookingComplete] = useState(false);
    const [bookingId, setBookingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<BookingFormData>({
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 3)),
        fullName: user?.fullName || user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        pickupLocation: "Main Office",
        dropoffLocation: "Main Office", // Default to same location
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
            // แปลงวันที่เป็น Date object
            const pickupDateTime = new Date(formData.startDate); // ใช้แค่วันที่
            const dropoffDateTime = new Date(formData.endDate); // ใช้แค่วันที่

            // แปลงเป็นรูปแบบ ISO 8601 (รวมเวลา) โดยการเพิ่มเวลา 00:00:00
            const formattedPickupDate = pickupDateTime.toISOString(); // จะได้ "2025-04-10T00:00:00.000Z"
            const formattedDropoffDate = dropoffDateTime.toISOString(); // จะได้ "2025-04-13T00:00:00.000Z"

            // Map form data to the DTO structure required by the backend
            const bookingDTO = {
                user_id: user?.id ? Number.parseInt(user.id) : 0,
                motorbike_id: motorbike.id,
                pickup_location:
                    formData.pickupLocation || "Default Pickup Location",
                dropoff_location:
                    formData.dropoffLocation || formData.pickupLocation,
                pickup_date: formattedPickupDate, // ส่งเป็น ISO 8601 ที่มีเวลา
                dropoff_date: formattedDropoffDate, // ส่งเป็น ISO 8601 ที่มีเวลา
                total_price: Number(formData.totalPrice),
            };

            // ใช้ฟังก์ชัน createBooking เพื่อสร้างการจอง
            const response = await createBooking(bookingDTO);

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
