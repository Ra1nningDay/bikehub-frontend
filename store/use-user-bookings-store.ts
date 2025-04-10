// import { create } from "zustand";
// import type { Booking } from "@/types";

// interface UserBookingsState {
//     // Bookings data
//     bookings: Booking[];
//     selectedBooking: Booking | null;
//     isLoading: boolean;
//     error: string | null;

//     // Actions
//     setBookings: (bookings: Booking[]) => void;
//     setSelectedBooking: (booking: Booking | null) => void;
//     addBooking: (booking: Booking) => void;
//     updateBooking: (bookingId: string, bookingData: Partial<Booking>) => void;
//     removeBooking: (bookingId: string) => void;
//     setLoading: (isLoading: boolean) => void;
//     setError: (error: string | null) => void;
// }

// export const useUserBookingsStore = create<UserBookingsState>((set) => ({
//     // Initial state
//     bookings: [],
//     selectedBooking: null,
//     isLoading: false,
//     error: null,

//     // Actions
//     setBookings: (bookings) => set({ bookings }),
//     setSelectedBooking: (booking) => set({ selectedBooking: booking }),
//     addBooking: (booking) =>
//         set((state) => ({
//             bookings: [...state.bookings, booking],
//         })),
//     updateBooking: (bookingId, bookingData) =>
//         set((state) => ({
//             bookings: state.bookings.map((booking) =>
//                 booking.id === bookingId
//                     ? { ...booking, ...bookingData }
//                     : booking
//             ),
//             selectedBooking:
//                 state.selectedBooking?.id === bookingId
//                     ? { ...state.selectedBooking, ...bookingData }
//                     : state.selectedBooking,
//         })),
//     removeBooking: (bookingId) =>
//         set((state) => ({
//             bookings: state.bookings.filter(
//                 (booking) => booking.id !== bookingId
//             ),
//             selectedBooking:
//                 state.selectedBooking?.id === bookingId
//                     ? null
//                     : state.selectedBooking,
//         })),
//     setLoading: (isLoading) => set({ isLoading }),
//     setError: (error) => set({ error }),
// }));
