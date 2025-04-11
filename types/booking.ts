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
    user_id: number; // user_id
    motorbike_id: number; // motorbike_id
    pickup_location: string; // pickup_location
    dropoff_location: string; // dropoff_location
    pickup_date: string; // pickup_date (ISO string)
    dropoff_date: string; // dropoff_date (ISO string)
    total_price: number; // total_price
    amount: number; // amount (amount ที่ต้องจ่าย)
    paymentProof?: File | null; // paymentProof (อาจจะเป็นไฟล์หรือ null)
    paymentMethod: "qr" | "credit" | "bank"; // paymentMethod
    status?: string; // status (optional)
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
