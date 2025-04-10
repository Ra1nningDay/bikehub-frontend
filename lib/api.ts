import { BookingAPI } from "./api/booking";
import { CreateBookingDTO } from "@/types";

/**
 * Create a new booking
 * This is now a wrapper around our BookingAPI service
 */
export async function createBooking(
    bookingData: CreateBookingDTO
): Promise<{ id: string }> {
    try {
        const booking = await BookingAPI.create(bookingData);
        return { id: booking.id };
    } catch (error) {
        throw new Error("Failed to create booking");
    }
}
