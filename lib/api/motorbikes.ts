// lib/api/motorbikes.tsx
import axios from "axios";

// Create an Axios instance with the base URL and authorization
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000", // API URL
});

// Set up an interceptor to add the authorization token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Or use your state management for the token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API function to get motorbikes based on filters
export const fetchMotorbikes = async (filters: {
  brand: string;
  category: string;
  priceRange: string;
}) => {
  try {
    const { brand, category, priceRange } = filters;
    const response = await api.get("/motorbikes", {
      params: { brand, category, priceRange }, // Send filters as query params
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch motorbikes");
  }
};

// API function to get a single motorbike by ID
export const getMotorbikeById = async (id: number) => {
  try {
    const response = await api.get(`/motorbikes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch motorbike by ID");
  }
};
