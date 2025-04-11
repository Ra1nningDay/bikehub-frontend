"use client";

import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, MapPin, User, Mail, Phone } from "lucide-react";
import { getBrandName } from "@/lib/booking-utils";
import { useAuth } from "@/hooks/auth/use-auth";
import { useState } from "react";
import AuthDialog from "@/components/auth/auth-dialog";
import type { BookingFormData } from "../../booking-form";
import type { Motorbike } from "@/types";

interface BookingSummaryStepProps {
    formData: BookingFormData;
    motorbike: Motorbike;
    onBack: () => void;
    onSubmit: (
        paymentMethod: "qr" | "credit" | "bank",
        paymentProof: File | null
    ) => void;
}

export function BookingSummaryStep({
    formData,
    motorbike,
    onBack,
    onSubmit,
}: BookingSummaryStepProps) {
    const { user } = useAuth();
    const brandName = getBrandName(motorbike);

    const [authDialogOpen, setAuthDialogOpen] = useState(false);
    const [authDialogMode, setAuthDialogMode] = useState<"signin" | "signup">(
        "signin"
    );
    const [paymentMethod, setPaymentMethod] = useState<
        "qr" | "credit" | "bank"
    >("qr");
    const [paymentProof, setPaymentProof] = useState<File | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const imageUrl = motorbike?.image
        ? `${process.env.NEXT_PUBLIC_API_URL}/${motorbike.image.replace(
              /\\/g,
              "/"
          )}`
        : "/placeholder.svg?height=200&width=300";

    const getLocationLabel = (value: string) => {
        const locations = {
            "Main Office": "Main Office - 123 Motorbike St.",
            Downtown: "Downtown - 456 Center Ave.",
            Airport: "Airport Terminal - 789 Airport Rd.",
        };
        return locations[value as keyof typeof locations] || value;
    };

    const openAuthDialog = (mode: "signin" | "signup") => {
        setAuthDialogMode(mode);
        setAuthDialogOpen(true);
    };

    const closeAuthDialog = () => {
        setAuthDialogOpen(false);
    };

    const handlePaymentProofChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            setPaymentProof(file);
        }
    };

    const handleConfirm = () => {
        if (!user) {
            openAuthDialog("signin");
            return;
        }

        // ส่ง paymentMethod และ paymentProof กลับไปยัง BookingForm
        onSubmit(paymentMethod, paymentProof);
    };

    return (
        <div className="space-y-6">
            {message && (
                <div
                    className={`p-4 rounded-md ${
                        message.includes("successfully")
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {message}
                </div>
            )}

            {!user && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
                    <p className="text-yellow-700">
                        Please sign in to confirm your booking.{" "}
                        <button
                            onClick={() => openAuthDialog("signin")}
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors inline-flex items-center"
                        >
                            <User size={18} className="mr-1" />
                            Sign In
                        </button>
                    </p>
                </div>
            )}

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
                            <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                            <div>
                                <p className="font-medium">Pickup Location</p>
                                <p className="text-gray-600">
                                    {getLocationLabel(formData.pickupLocation)}
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

            <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">
                        Payment Method
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="qr"
                                name="paymentMethod"
                                value="qr"
                                checked={paymentMethod === "qr"}
                                onChange={() => setPaymentMethod("qr")}
                                className="h-4 w-4 text-primary focus:ring-primary"
                            />
                            <label
                                htmlFor="qr"
                                className="ml-2 block text-sm text-gray-900"
                            >
                                QR Code Payment
                            </label>
                        </div>
                        {paymentMethod === "qr" && (
                            <div className="pl-6 space-y-2">
                                <p className="text-gray-600">
                                    Scan the QR code to pay and upload proof of
                                    payment.
                                </p>
                                <div className="relative h-32 w-32">
                                    <Image
                                        src="/placeholder-qr-code.png"
                                        alt="QR Code for Payment"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="paymentProof"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Upload Payment Proof
                                    </label>
                                    <input
                                        type="file"
                                        id="paymentProof"
                                        accept="image/jpeg,image/png,application/pdf"
                                        onChange={handlePaymentProofChange}
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
                                    />
                                    {paymentProof && (
                                        <p className="mt-1 text-sm text-gray-600">
                                            Selected file: {paymentProof.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="credit"
                                name="paymentMethod"
                                value="credit"
                                checked={paymentMethod === "credit"}
                                onChange={() => setPaymentMethod("credit")}
                                className="h-4 w-4 text-primary focus:ring-primary"
                            />
                            <label
                                htmlFor="credit"
                                className="ml-2 block text-sm text-gray-900"
                            >
                                Credit Card
                            </label>
                        </div>
                        {paymentMethod === "credit" && (
                            <div className="pl-6">
                                <p className="text-gray-600">
                                    Enter your credit card details to proceed.
                                </p>
                                <p className="text-sm text-gray-500">
                                    (Credit card form will be added here)
                                </p>
                            </div>
                        )}

                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="bank"
                                name="paymentMethod"
                                value="bank"
                                checked={paymentMethod === "bank"}
                                onChange={() => setPaymentMethod("bank")}
                                className="h-4 w-4 text-primary focus:ring-primary"
                            />
                            <label
                                htmlFor="bank"
                                className="ml-2 block text-sm text-gray-900"
                            >
                                Bank Transfer
                            </label>
                        </div>
                        {paymentMethod === "bank" && (
                            <div className="pl-6">
                                <p className="text-gray-600">
                                    Transfer to our bank account and upload
                                    proof.
                                </p>
                                <p className="text-sm text-gray-500">
                                    (Bank details and upload will be added here)
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={onBack}>
                    Back
                </Button>
                <Button onClick={handleConfirm} disabled={!user}>
                    Confirm Booking
                </Button>
            </div>

            <AuthDialog
                isOpen={authDialogOpen}
                onClose={closeAuthDialog}
                initialMode={authDialogMode}
            />
        </div>
    );
}
