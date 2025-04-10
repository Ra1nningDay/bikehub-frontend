"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import type { BookingFormData } from "../../booking-form";

interface BookingPersonalStepProps {
    formData: BookingFormData;
    updateFormData: (data: Partial<BookingFormData>) => void;
    isAuthenticated: boolean;
    onBack: () => void;
    onNext: () => void;
}

const personalInfoSchema = z.object({
    fullName: z
        .string()
        .min(3, { message: "Full name must be at least 3 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phone: z.string().min(10, { message: "Please enter a valid phone number" }),
});

type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export function BookingPersonalStep({
    formData,
    updateFormData,
    isAuthenticated,
    onBack,
    onNext,
}: BookingPersonalStepProps) {
    const form = useForm<PersonalInfoValues>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
        },
    });

    const onSubmit = useCallback(
        (values: PersonalInfoValues) => {
            updateFormData(values);
            onNext();
        },
        [updateFormData, onNext]
    );

    return (
        <div className="space-y-6">
            {isAuthenticated && (
                <Alert className="bg-blue-50 border-blue-200">
                    <InfoIcon className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                        We've pre-filled your information from your profile. You
                        can update it if needed.
                    </AlertDescription>
                </Alert>
            )}

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Please enter your full name as it appears on
                                    your ID.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="john@example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    We'll send your booking confirmation to this
                                    email.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="+1 (555) 123-4567"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    We'll only contact you regarding this
                                    booking.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-between pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onBack}
                        >
                            Back
                        </Button>
                        <Button type="submit">Continue to Review</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
