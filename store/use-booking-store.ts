import { create } from "zustand";
import axios from "axios";
import { BookingAPI } from "@/lib/api/booking";
import type { Booking, CreateBookingDTO } from "@/types";

interface BookingState {
    // Data state
    bookings: Booking[];
    currentBooking: Booking | null;
    isLoading: boolean;
    error: string | null;
    selectedBooking: Booking | null;

    // Actions
    fetchBookings: () => Promise<void>;
    fetchBookingById: (id: string) => Promise<void>;
    createBooking: (data: CreateBookingDTO) => Promise<Booking>;
    resetCurrentBooking: () => void;
    resetError: () => void;
    setSelectedBooking: (booking: Booking | null) => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
    // Initial state
    bookings: [],
    currentBooking: null,
    isLoading: false,
    error: null,
    selectedBooking: null,

    // Actions
    fetchBookings: async () => {
        try {
            set({ isLoading: true, error: null });
            const bookings = await BookingAPI.getAll();
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

    createBooking: async (data: CreateBookingDTO) => {
        try {
            set({ isLoading: true, error: null });
            const newBooking = await BookingAPI.create(data);
            console.log("New booking created:", newBooking); // Log ข้อมูลของการจองใหม่
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

    resetCurrentBooking: () => {
        set({ currentBooking: null });
    },

    resetError: () => {
        set({ error: null });
    },
}));
