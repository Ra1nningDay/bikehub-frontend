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
        console.log(bookingData); // ตรวจสอบข้อมูลที่ส่งไป
        try {
            const response = await axios.post(
                `${API_URL}/bookings`,
                bookingData
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // แสดงรายละเอียดข้อผิดพลาดจาก API
                console.error("Error creating booking:", error.response?.data);
            } else {
                console.error("Unknown error:", error);
            }
            throw new Error("Failed to create booking");
        }
    },
};
