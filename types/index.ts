export type User = {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    displayName?: string;
    provider?: "email" | "google";
    roles: string[];
    createdAt?: string;
    updatedAt?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
    fullName?: string;
    bio?: string;
};

export interface Motorcycle {
    id: number;
    name?: string;
    brand: string;
    category: string;
    price?: number;
    image?: string;
    rating: number;
    reviews: number;
    description: string;
    available: boolean;
}

export interface BookingFormData {
    startDate: Date;
    endDate: Date;
    pickupLocation: string;
    dropoffLocation: string;
    pickupDate: string;
    dropoffDate: string;
    name: string;
    motorcycle: string;
    email: string;
    phone: string;
    totalPrice: number;
    days: number;
}

export interface FilterState {
    brand: string;
    category: string;
    priceRange: string;
}

export interface MotorbikeBrand {
    id: number;
    name: string;
    description?: string;
}

export interface Motorbike {
    id: number;
    name: string;
    price: number;
    image: string;
    brand: string;
    brand_id: number;
    category: string;
    engineSize?: number;
    createdAt?: string;
    updatedAt?: string;
    rating?: number;
    description?: string;
    status?: string;
    available?: boolean;
    reviews?: number;
}
export interface MotorbikeUnit {
    id: number;
    motorbike_id: number;
    license_plate: string;
    color?: string;
    image?: string;
    status: string;
    detail: string;
}

export interface MotorbikeForm {
    id: number;
    brand_id: number;
    name: string;
    price: number;
}

export interface BrandListProps {
    brands: MotorbikeBrand[];
    motorbikes: Motorbike[];
    onEdit: (brand: MotorbikeBrand) => void;
    onDelete: (brandId: number) => void;
}

export interface BrandFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    form: MotorbikeBrand;
    setForm: (form: MotorbikeBrand) => void;
    onSave: () => void;
    isEditing: boolean;
}

export interface BookingData {
    user_id: number;
    motorbike_id: number;
    pickup_location: string;
    dropoff_location: string;
    pickup_date: string;
    dropoff_date: string;
    total_price: number;
    payment_id?: number;
    status: string;
}

export * from "./booking";
