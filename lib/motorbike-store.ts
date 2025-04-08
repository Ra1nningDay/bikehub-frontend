import { create } from "zustand";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { Motorbike, MotorbikeBrand } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface CreateMotorbikeDto {
  brand_id: number;
  name: string;
  price: number;
}

interface UpdateMotorbikeDto {
  brand_id?: number;
  name?: string;
  price?: number;
}

interface MotorbikeStore {
  searchMotorbike: string;
  searchBrand: string;
  setSearchMotorbike: (search: string) => void;
  setSearchBrand: (search: string) => void;
}

export const useMotorbikeStore = create<MotorbikeStore>((set) => ({
  searchMotorbike: "",
  searchBrand: "",
  setSearchMotorbike: (search) => set({ searchMotorbike: search }),
  setSearchBrand: (search) => set({ searchBrand: search }),
}));

// React Query hooks
export const useMotorbikes = () => {
  const { searchMotorbike } = useMotorbikeStore();
  return useQuery<Motorbike[], Error>({
    queryKey: ["motorbikes", searchMotorbike],
    queryFn: async () => {
      const { data } = await api.get<Motorbike[]>("/motorbikes");
      return data.filter((motorbike) =>
        motorbike.name.toLowerCase().includes(searchMotorbike.toLowerCase()),
      );
    },
  });
};

export const useMotorbike = (id: number) => {
  return useQuery<Motorbike, Error>({
    queryKey: ["motorbike", id],
    queryFn: async () => {
      const { data } = await api.get<Motorbike>(`/motorbikes/${id}`);
      return data;
    },
  });
};

export const useCreateMotorbike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (motorbike: CreateMotorbikeDto) =>
      api.post<Motorbike>("/motorbikes", motorbike),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["motorbikes"] });
    },
  });
};

export const useUpdateMotorbike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateMotorbikeDto }) =>
      api.put<Motorbike>(`/motorbikes/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["motorbikes"] });
    },
  });
};

export const useDeleteMotorbike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/motorbikes/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["motorbikes"] });
    },
  });
};

export const useBrands = () => {
  const { searchBrand } = useMotorbikeStore();
  return useQuery<MotorbikeBrand[], Error>({
    queryKey: ["brands", searchBrand],
    queryFn: async () => {
      const { data } = await api.get<MotorbikeBrand[]>("/motorbike-brands"); // สมมติ endpoint
      return data.filter((brand) =>
        brand.name.toLowerCase().includes(searchBrand.toLowerCase()),
      );
    },
  });
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (brand: Omit<MotorbikeBrand, "id">) =>
      api.post<MotorbikeBrand>("/motorbike-brands", brand), // สมมติ endpoint
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<MotorbikeBrand> }) =>
      api.put<MotorbikeBrand>(`/motorbike-brands/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/motorbike-brands/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      queryClient.invalidateQueries({ queryKey: ["motorbikes"] });
    },
  });
};

export const getBrandName = (brands: MotorbikeBrand[], brandId: number) => {
  const brand = brands.find((b) => b.id === brandId);
  return brand ? brand.name : "Unknown";
};
