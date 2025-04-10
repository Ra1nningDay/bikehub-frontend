import type { Motorbike, User } from "./index";

export interface Booking {
    id: string;
    user_id: number;
    motorbike_id: number;
    pickup_location: string;
    dropoff_location: string;
    pickup_date: Date;
    dropoff_date: Date;
    total_price: number;
    status: string;
    created_at: string;
    motorbike?: Motorbike;
    user?: User;
}

export interface CreateBookingDTO {
    user_id: number;
    motorbike_id: number;
    pickup_location: string;
    dropoff_location: string;
    pickup_date: string;
    dropoff_date: string;
    total_price: number;
    status?: string;
}

export interface BookingFormData {
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    fullName: string;
    email: string;
    phone: string;
    pickupLocation: string;
    dropoffLocation: string;
    totalPrice: number;
    days: number;
}
