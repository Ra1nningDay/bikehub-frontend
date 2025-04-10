"use client";

import { useEffect } from "react";
import { useBookingStore } from "@/store/use-booking-store";

export function useBookingDetails(bookingId: string) {
    const {
        currentBooking,
        isLoading,
        error,
        fetchBookingById,
        resetCurrentBooking,
        resetError,
    } = useBookingStore();

    useEffect(() => {
        fetchBookingById(bookingId);

        return () => {
            resetCurrentBooking();
            resetError();
        };
    }, [bookingId, fetchBookingById, resetCurrentBooking, resetError]);

    return {
        booking: currentBooking,
        isLoading,
        error,
    };
}
