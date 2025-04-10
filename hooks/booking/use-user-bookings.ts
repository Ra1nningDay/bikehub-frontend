"use client";

import { useEffect } from "react";
import { useBookingStore } from "@/store/use-booking-store";

export function useUserBookings(userId?: string) {
    const {
        bookings,
        isLoading,
        error,
        fetchBookings,
        resetError,
        selectedBooking,
        setSelectedBooking,
    } = useBookingStore();

    useEffect(() => {
        fetchBookings();

        return () => {
            resetError();
        };
    }, [fetchBookings, resetError]);

    // Filter bookings for the current user if userId is provided
    const userBookings = userId
        ? bookings.filter((booking) => booking.user_id === parseInt(userId))
        : bookings;

    return {
        bookings: userBookings,
        isLoading,
        error,
        selectedBooking,
        setSelectedBooking,
    };
}
