"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMotorcycles,
  getMotorcycleById,
  createBooking,
  getLocations,
} from "@/lib/api";
import type { FilterState } from "@/types";

export function useMotorcycles(filters?: FilterState) {
  const {
    data: motorcycles = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["motorcycles"],
    queryFn: getMotorcycles,
  });

  // Apply filters if provided
  const filteredMotorcycles = filters
    ? motorcycles.filter((motorcycle) => {
        let matches = true;

        if (filters.brand && motorcycle.brand !== filters.brand) {
          matches = false;
        }

        if (filters.category && motorcycle.category !== filters.category) {
          matches = false;
        }

        if (filters.priceRange) {
          const [min, max] = filters.priceRange.split("-").map(Number);
          if (motorcycle.price < min || motorcycle.price > max) {
            matches = false;
          }
        }

        return matches;
      })
    : motorcycles;

  // Extract unique brands and categories for filter options
  const brands = Array.from(new Set(motorcycles.map((m) => m.brand)));
  const categories = Array.from(new Set(motorcycles.map((m) => m.category)));

  return {
    motorcycles: filteredMotorcycles,
    allMotorcycles: motorcycles,
    isLoading,
    error,
    brands,
    categories,
  };
}

export function useMotorcycle(id: number) {
  return useQuery({
    queryKey: ["motorcycle", id],
    queryFn: () => getMotorcycleById(id),
    enabled: !!id,
  });
}

export function useLocations() {
  return useQuery({
    queryKey: ["locations"],
    queryFn: getLocations,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      // Invalidate relevant queries after successful booking
      queryClient.invalidateQueries({ queryKey: ["motorcycles"] });
    },
  });
}
