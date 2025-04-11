// hooks/bookings/use-booking-management.ts
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export interface Booking {
    id: number;
    user_id: number;
    motorbike_id: number;
    start_date: string;
    end_date: string;
    status: "pending" | "confirmed" | "canceled";
}

export interface User {
    id: number;
    name: string;
}

export interface Motorbike {
    id: number;
    name: string;
    brand_id: number;
}

export const useBookingManagement = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [motorbikes, setMotorbikes] = useState<Motorbike[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [searchBooking, setSearchBooking] = useState("");

    // Fetch data (replace with your NestJS API calls)
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Mock data - replace with API calls
                setBookings([
                    {
                        id: 1,
                        user_id: 1,
                        motorbike_id: 1,
                        start_date: "2025-04-12",
                        end_date: "2025-04-15",
                        status: "confirmed",
                    },
                    {
                        id: 2,
                        user_id: 2,
                        motorbike_id: 2,
                        start_date: "2025-04-13",
                        end_date: "2025-04-14",
                        status: "pending",
                    },
                ]);
                setMotorbikes([
                    { id: 1, name: "Honda CBR", brand_id: 1 },
                    { id: 2, name: "Yamaha R1", brand_id: 2 },
                ]);
                setUsers([
                    { id: 1, name: "John Doe" },
                    { id: 2, name: "Jane Smith" },
                ]);
            } catch (error) {
                toast.error("Failed to load data");
            }
        };
        fetchData();
    }, []);

    const filteredBookings = bookings.filter(
        (booking) =>
            users
                .find((u) => u.id === booking.user_id)
                ?.name.toLowerCase()
                .includes(searchBooking.toLowerCase()) ||
            motorbikes
                .find((m) => m.id === booking.motorbike_id)
                ?.name.toLowerCase()
                .includes(searchBooking.toLowerCase())
    );

    const getUserName = (userId: number) =>
        users.find((u) => u.id === userId)?.name || "Unknown";
    const getMotorbikeName = (motorbikeId: number) =>
        motorbikes.find((m) => m.id === motorbikeId)?.name || "Unknown";

    const handleAddBooking = async (booking: Omit<Booking, "id">) => {
        try {
            // Replace with API call: await fetch("/api/bookings", { method: "POST", body: JSON.stringify(booking) });
            const newBooking = { ...booking, id: bookings.length + 1 };
            setBookings([...bookings, newBooking]);
            return { success: true };
        } catch (error) {
            return { success: false, error };
        }
    };

    const handleEditBooking = async (booking: Booking) => {
        try {
            // Replace with API call: await fetch(`/api/bookings/${booking.id}`, { method: "PUT", body: JSON.stringify(booking) });
            setBookings(
                bookings.map((b) => (b.id === booking.id ? booking : b))
            );
            return { success: true };
        } catch (error) {
            return { success: false, error };
        }
    };

    const handleDeleteBooking = async (id: number) => {
        try {
            // Replace with API call: await fetch(`/api/bookings/${id}`, { method: "DELETE" });
            setBookings(bookings.filter((b) => b.id !== id));
            toast.success("Booking deleted");
        } catch (error) {
            toast.error("Failed to delete booking");
        }
    };

    return {
        bookings,
        motorbikes,
        users,
        searchBooking,
        setSearchBooking,
        filteredBookings,
        getUserName,
        getMotorbikeName,
        handleAddBooking,
        handleEditBooking,
        handleDeleteBooking,
    };
};
