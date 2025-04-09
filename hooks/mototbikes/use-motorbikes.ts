"use client";

import { useQuery } from "@tanstack/react-query";
import { useMotorbikesStorePublic } from "@/store/motorBikesStore";
import axios from "axios";
import type { Motorbike } from "@/types";
import React from "react";

// Function to fetch motorbikes with error handling
const fetchMotorbikes = async (): Promise<Motorbike[]> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("API URL is not defined in environment variables");
  }

  try {
    const response = await axios.get(`${apiUrl}/motorbikes`);
    return response.data || [];
  } catch (error) {
    throw new Error("Failed to fetch motorbikes: " + (error as Error).message);
  }
};

export default function useMotorbikes() {
  const { setMotorbikes, setLoading, setError } = useMotorbikesStorePublic();

  // Use React Query with generic type
  const { data, isLoading, isError, error } = useQuery<Motorbike[], Error>({
    queryKey: ["motorbikes"],
    queryFn: fetchMotorbikes,
    retry: 3,
    retryDelay: 1000,
  });

  React.useEffect(() => {
    if (data) {
      setMotorbikes(data);
    }
    if (error) {
      setError(error.message || "Failed to fetch motorbikes");
    }
    setLoading(isLoading);
  }, [data, error, isLoading, setMotorbikes, setLoading, setError]);

  return {
    motorbikes: data || [],
    isLoading,
    isError,
    error,
  };
}
