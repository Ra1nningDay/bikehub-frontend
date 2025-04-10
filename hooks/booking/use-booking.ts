"use client";

import { useCallback } from "react";
import { useBookingStore } from "@/store/use-booking-store";
import type { CreateBookingDTO } from "@/types";

export function useBooking() {
    const {
        bookings,
        currentBooking,
        isLoading,
        error,
        fetchBookings,
        fetchBookingById,
        createBooking,
        resetCurrentBooking,
        resetError,
    } = useBookingStore();

    const handleCreateBooking = useCallback(
        async (bookingData: CreateBookingDTO) => {
            console.log("Booking data being sent:", bookingData); // Log ข้อมูลที่ส่งไป
            try {
                const newBooking = await createBooking(bookingData);
                return newBooking;
            } catch (error) {
                console.error("Error in handleCreateBooking:", error);
                throw error;
            }
        },
        [createBooking]
    );

    return {
        // State
        bookings,
        currentBooking,
        isLoading,
        error,

        // Actions
        fetchBookings,
        fetchBookingById,
        createBooking: handleCreateBooking,
        resetCurrentBooking,
        resetError,
    };
}
