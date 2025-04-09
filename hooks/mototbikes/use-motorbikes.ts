"use client";

import { useQuery } from "@tanstack/react-query";
import { useMotorbikeStore } from "@/store/use-motorbike-store";
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
        throw new Error(
            "Failed to fetch motorbikes: " + (error as Error).message
        );
    }
};

export default function useMotorbikes() {
    const {
        setMotorbikes,
        setLoading,
        setError,
        updateFilteredMotorbikes,
        updatePriceRange,
    } = useMotorbikeStore();

    // Use React Query to fetch data
    const { isLoading, isError, error, data } = useQuery<Motorbike[], Error>({
        queryKey: ["motorbikes"],
        queryFn: fetchMotorbikes,
        retry: 3,
        retryDelay: 1000,
    });

    React.useEffect(() => {
        if (data) {
            setMotorbikes(data);
            updatePriceRange(); // อัปเดตช่วงราคาเมื่อได้ข้อมูล
            updateFilteredMotorbikes(); // อัปเดตข้อมูลที่กรองแล้ว
        }
        if (error) {
            setError(error.message || "Failed to fetch motorbikes");
        }
    }, [
        data,
        error,
        setMotorbikes,
        updatePriceRange,
        updateFilteredMotorbikes,
        setError,
    ]);

    // อัปเดตสถานะการโหลด
    React.useEffect(() => {
        setLoading(isLoading);
    }, [isLoading, setLoading]);

    // คืนค่า state จาก Store
    const {
        motorbikes,
        filteredMotorbikes,
        loading,
        error: storeError,
    } = useMotorbikeStore();

    return {
        motorbikes: filteredMotorbikes, // คืนข้อมูลที่กรองแล้ว
        allMotorbikes: motorbikes, // คืนข้อมูลดั้งเดิม (ถ้าต้องการ)
        isLoading: loading,
        isError,
        error: storeError,
    };
}
