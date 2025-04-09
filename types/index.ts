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

export interface MotorbikeBrand {
  id: number;
  name: string;
  description?: string;
}

export interface Motorbike {
  id: number;
  brand_id: number;
  name: string;
  price: number;
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
