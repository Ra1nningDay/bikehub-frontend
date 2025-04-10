import axios from "axios";
import type { User, Booking } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * User API service
 */

// ดึงโปรไฟล์ของผู้ใช้
export const getProfile = async (token: string): Promise<User> => {
    try {
        const response = await axios.get(`${API_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw new Error("Failed to fetch user profile");
    }
};

/**
 * Update user profile
 * (สังเกตว่า log บอกว่า route update user คือ PATCH `/users/:id` ดังนั้นต้องระบุ id ด้วย)
 */
export const updateProfile = async (userData: Partial<User>): Promise<User> => {
    try {
        if (!userData.id) {
            throw new Error("User ID is required to update profile");
        }
        const response = await axios.patch(
            `${API_URL}/users/${userData.id}`,
            userData
        );
        return response.data;
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw new Error("Failed to update user profile");
    }
};

/**
 * Get user bookings
 * (ไม่มีใน route log ให้คงไว้ถ้ายังไม่ได้เชื่อม)
 */
export const getBookings = async (): Promise<Booking[]> => {
    try {
        const response = await axios.get(`${API_URL}/bookings/me`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user bookings:", error);
        throw new Error("Failed to fetch user bookings");
    }
};

/**
 * Cancel a booking
 */
export const cancelBooking = async (bookingId: string): Promise<Booking> => {
    try {
        const response = await axios.delete(`${API_URL}/bookings/${bookingId}`);
        return response.data;
    } catch (error) {
        console.error(`Error cancelling booking ${bookingId}:`, error);
        throw new Error("Failed to cancel booking");
    }
};
