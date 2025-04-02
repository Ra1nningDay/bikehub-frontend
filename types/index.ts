export interface Motorcycle {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  available: boolean;
}

export interface BookingFormData {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
  motorcycle: string;
  name: string;
  email: string;
  phone: string;
}

export interface FilterState {
  brand: string;
  category: string;
  priceRange: string;
}
