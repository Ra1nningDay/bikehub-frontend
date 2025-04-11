import axios from "axios";
import type { Booking, CreateBookingDTO } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Booking API service
 */
export const BookingAPI = {
    /**
     * Get all bookings
     */
    getAll: async (): Promise<Booking[]> => {
        try {
            const response = await axios.get(`${API_URL}/bookings`);
            return response.data;
        } catch (error) {
            console.error("Error fetching bookings:", error);
            throw new Error("Failed to fetch bookings");
        }
    },

    /**
     * Get bookings by user ID
     */
    getByUserId: async (userId: string): Promise<Booking[]> => {
        try {
            const response = await axios.get(
                `${API_URL}/bookings/user/${userId}`
            );
            return response.data;
        } catch (error) {
            console.error(`Error fetching bookings for user ${userId}:`, error);
            throw new Error("Failed to fetch user bookings");
        }
    },

    /**
     * Get a booking by ID
     */
    getById: async (id: string): Promise<Booking> => {
        try {
            const response = await axios.get(`${API_URL}/bookings/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching booking ${id}:`, error);
            throw new Error("Failed to fetch booking details");
        }
    },

    /**
     * Create a new booking
     */
    create: async (bookingData: CreateBookingDTO): Promise<Booking> => {
        try {
            const formData = new FormData();

            formData.append("user_id", String(bookingData.user_id));
            formData.append("motorbike_id", String(bookingData.motorbike_id));
            formData.append("pickup_location", bookingData.pickup_location);
            formData.append("dropoff_location", bookingData.dropoff_location);
            formData.append("pickup_date", bookingData.pickup_date);
            formData.append("dropoff_date", bookingData.dropoff_date);
            formData.append("amount", String(bookingData.amount));
            formData.append("total_price", String(bookingData.total_price));
            formData.append("paymentMethod", bookingData.paymentMethod);

            if (bookingData.paymentProof) {
                formData.append("paymentProof", bookingData.paymentProof); // 👈 แนบไฟล์ตรงนี้
            }

            const response = await axios.post(`${API_URL}/payments`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Error creating booking:", error.response?.data);
            } else {
                console.error("Unknown error:", error);
            }
            throw new Error("Failed to create booking");
        }
    },
};
