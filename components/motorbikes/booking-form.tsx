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
import { CreateBookingDTO } from "@/types";

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
        dropoffLocation: "Main Office",
        totalPrice: 0,
        days: 3,
    });
    // เพิ่ม state สำหรับ paymentMethod และ paymentProof
    const [paymentMethod, setPaymentMethod] = useState<
        "qr" | "credit" | "bank"
    >("qr");
    const [paymentProof, setPaymentProof] = useState<File | null>(null);

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
            const hasChanges = Object.entries(data).some(
                ([key, value]) => prev[key as keyof BookingFormData] !== value
            );
            return hasChanges ? { ...prev, ...data } : prev;
        });
    }, []);

    const handleSubmit = async () => {
        try {
            // ตรวจสอบว่า user ได้ทำการ login หรือยัง
            if (!user) {
                toast({
                    title: "Authentication Required",
                    description: "Please sign in to confirm your booking.",
                    variant: "destructive",
                });
                return;
            }

            // ตรวจสอบว่า paymentProof ถูกอัปโหลดหรือยัง (กรณีที่ใช้ QR payment)
            if (paymentMethod === "qr" && !paymentProof) {
                toast({
                    title: "Payment Proof Required",
                    description:
                        "Please upload payment proof for QR code payment.",
                    variant: "destructive",
                });
                return;
            }

            // ตรวจสอบว่า formData มีข้อมูลที่จำเป็นหรือไม่
            if (
                !formData.pickupLocation ||
                !formData.dropoffLocation ||
                !formData.totalPrice
            ) {
                toast({
                    title: "Missing Information",
                    description:
                        "Please make sure all required fields are filled in.",
                    variant: "destructive",
                });
                return;
            }

            // ตรวจสอบวันที่ pickupDate และ dropoffDate ว่าเป็น Date instance หรือไม่
            const pickupDateTime = new Date(formData.startDate);
            const dropoffDateTime = new Date(formData.endDate);

            // ตรวจสอบว่าเป็นวันที่ถูกต้องหรือไม่
            if (
                isNaN(pickupDateTime.getTime()) ||
                isNaN(dropoffDateTime.getTime())
            ) {
                toast({
                    title: "Invalid Dates",
                    description:
                        "Please provide valid dates for pickup and dropoff.",
                    variant: "destructive",
                });
                return;
            }

            // เตรียมข้อมูลที่จะส่ง
            const dataToSend: CreateBookingDTO = {
                user_id: Number(user.id), // user_id
                motorbike_id: Number(motorbike.id), // motorbike_id
                pickup_location:
                    formData.pickupLocation || "Default Pickup Location", // pickup_location
                dropoff_location:
                    formData.dropoffLocation || formData.pickupLocation, // dropoff_location
                pickup_date: pickupDateTime.toISOString(), // ✅ ส่งเป็น ISO string
                dropoff_date: dropoffDateTime.toISOString(), // ✅ ส่งเป็น ISO string
                amount: formData.totalPrice, // amount (amount ที่ต้องจ่าย)
                total_price: formData.totalPrice, // total_price
                paymentMethod: paymentMethod, // paymentMethod
                paymentProof: paymentProof ?? null, // paymentProof (null ถ้าไม่มี)
            };

            // เรียกใช้ฟังก์ชันสร้าง booking
            const result = await createBooking(dataToSend);

            // ตั้งค่าการจองที่เสร็จสมบูรณ์
            setBookingId(result.id);
            setBookingComplete(true);

            // แสดงข้อความเมื่อการจองสำเร็จ
            toast({
                title: "Booking Successful",
                description: `Your booking has been confirmed with ID: ${result.id}`,
            });
        } catch (error: any) {
            // แสดงข้อความเมื่อเกิดข้อผิดพลาดในการจอง
            toast({
                title: "Booking Failed",
                description:
                    error.message ||
                    "There was an error processing your booking. Please try again.",
                variant: "destructive",
            });
        }
    };

    // เพิ่ม callback เพื่อรับ paymentMethod และ paymentProof จาก BookingSummaryStep
    const handleSummarySubmit = (
        paymentMethod: "qr" | "credit" | "bank",
        paymentProof: File | null
    ) => {
        setPaymentMethod(paymentMethod);
        setPaymentProof(paymentProof);
        handleSubmit();
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
                                            onSubmit={handleSummarySubmit} // เปลี่ยน onSubmit เพื่อส่ง paymentMethod และ paymentProof
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
