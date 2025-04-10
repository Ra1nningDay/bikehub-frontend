"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUserBookings } from "@/hooks/booking/use-user-bookings";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { Booking } from "@/types";

interface CancelBookingDialogProps {
    booking: Booking;
    onClose: () => void;
}

export function CancelBookingDialog({
    booking,
    onClose,
}: CancelBookingDialogProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { cancelBooking } = useUserBookings();
    const { toast } = useToast();

    const handleCancel = async () => {
        try {
            setIsLoading(true);
            await cancelBooking(booking.id);
            toast({
                title: "Booking Cancelled",
                description: "Your booking has been successfully cancelled.",
            });
            onClose();
        } catch (error) {
            toast({
                title: "Cancellation Failed",
                description:
                    "There was an error cancelling your booking. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AlertDialog open onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to cancel this booking? This
                        action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>
                        No, Keep Booking
                    </AlertDialogCancel>
                    <Button
                        variant="destructive"
                        onClick={handleCancel}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Cancelling...
                            </>
                        ) : (
                            "Yes, Cancel Booking"
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
