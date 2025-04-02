import type { Motorcycle } from "@/types";

// Mock data for motorcycles
const motorcyclesData: Motorcycle[] = [
  {
    id: 1,
    name: "Honda ADV 160 Red",
    brand: "Honda",
    category: "Adventure",
    price: 25,
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    reviews: 28,
    description: "Perfect for city rides and light off-road adventures.",
    available: true,
  },
  {
    id: 2,
    name: "Honda ADV 160 Green",
    brand: "Honda",
    category: "Adventure",
    price: 25,
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.3,
    reviews: 19,
    description: "Perfect for city rides and light off-road adventures.",
    available: true,
  },
  {
    id: 3,
    name: "Honda PCX 160",
    brand: "Honda",
    category: "Scooter",
    price: 22,
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.7,
    reviews: 42,
    description: "Comfortable and fuel-efficient scooter for daily commuting.",
    available: true,
  },
  {
    id: 4,
    name: "Yamaha NMAX 155",
    brand: "Yamaha",
    category: "Scooter",
    price: 22,
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.6,
    reviews: 35,
    description: "Stylish urban scooter with excellent handling.",
    available: true,
  },
  {
    id: 5,
    name: "Kawasaki Ninja 400",
    brand: "Kawasaki",
    category: "Sport",
    price: 35,
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.8,
    reviews: 31,
    description: "Lightweight sport bike with impressive performance.",
    available: true,
  },
  {
    id: 6,
    name: "Yamaha MT-03",
    brand: "Yamaha",
    category: "Naked",
    price: 30,
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.4,
    reviews: 23,
    description: "Agile naked bike perfect for urban environments.",
    available: false,
  },
];

// API functions
export async function getMotorcycles(): Promise<Motorcycle[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  return motorcyclesData;
}

export async function getMotorcycleById(
  id: number,
): Promise<Motorcycle | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return motorcyclesData.find((motorcycle) => motorcycle.id === id);
}

export async function createBooking(
  bookingData: any,
): Promise<{ success: boolean; bookingId: string }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Simulate successful booking
  return {
    success: true,
    bookingId: `BK-${Math.floor(Math.random() * 10000)}`,
  };
}

// Mock locations data
export async function getLocations(): Promise<string[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return ["Downtown", "Airport", "Beach Area", "City Center", "Mountain View"];
}
