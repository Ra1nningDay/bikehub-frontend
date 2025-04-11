"use client";

import { create } from "zustand";
import { BookingAPI } from "@/lib/api/booking";
import type { Booking, CreatePaymentDTO } from "@/types";

interface BookingState {
    // Data state
    bookings: Booking[];
    currentBooking: Booking | null;
    isLoading: boolean;
    error: string | null;
    selectedBooking: Booking | null;

    // Actions
    fetchBookings: (userId?: string) => Promise<void>; // userId เป็น optional
    fetchBookingById: (id: string) => Promise<void>;
    createBooking: (data: CreatePaymentDTO) => Promise<Booking>;
    resetCurrentBooking: () => void;
    resetError: () => void;
    setSelectedBooking: (booking: Booking | null) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
    // Initial state
    bookings: [],
    currentBooking: null,
    isLoading: false,
    error: null,
    selectedBooking: null,

    // Actions
    fetchBookings: async (userId?: string) => {
        try {
            set({ isLoading: true, error: null });
            let bookings: Booking[];

            if (userId) {
                // ดึงการจองของ user เฉพาะเมื่อมี userId
                bookings = await BookingAPI.getByUserId(userId);
                console.log(bookings);
            } else {
                // ดึงการจองทั้งหมดเมื่อไม่มี userId (กรณี admin)
                bookings = await BookingAPI.getAll();
            }

            set({ bookings, isLoading: false });
        } catch (error) {
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to fetch bookings",
                isLoading: false,
            });
        }
    },

    fetchBookingById: async (id: string) => {
        try {
            set({ isLoading: true, error: null });
            const booking = await BookingAPI.getById(id);
            set({ currentBooking: booking, isLoading: false });
        } catch (error) {
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to fetch booking details",
                isLoading: false,
            });
        }
    },

    createBooking: async (data: CreatePaymentDTO) => {
        try {
            set({ isLoading: true, error: null });
            const newBooking = await BookingAPI.create(data);
            // console.log("New booking created:", newBooking);
            set((state) => ({
                bookings: [...state.bookings, newBooking],
                currentBooking: newBooking,
                isLoading: false,
            }));
            return newBooking;
        } catch (error) {
            console.error("Error creating booking:", error);
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to create booking",
                isLoading: false,
            });
            throw error;
        }
    },

    setSelectedBooking: (booking) => set({ selectedBooking: booking }),

    resetCurrentBooking: () => set({ currentBooking: null }),

    resetError: () => set({ error: null }),
}));
