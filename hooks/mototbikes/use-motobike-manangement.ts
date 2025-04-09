"use client";

import { useState, useEffect } from "react";
import type { Motorbike, MotorbikeBrand } from "@/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface UseMotorbikeManagementResult {
    brands: MotorbikeBrand[];
    motorbikes: Motorbike[];
    searchBrand: string;
    setSearchBrand: (searchBrand: string) => void;
    searchMotorbike: string;
    setSearchMotorbike: (searchMotorbike: string) => void;
    filteredBrands: MotorbikeBrand[];
    filteredMotorbikes: Motorbike[];
    getBrandName: (brandId: number) => string;
    handleAddBrand: (brand: MotorbikeBrand) => void;
    handleEditBrand: (brand: MotorbikeBrand) => void;
    handleDeleteBrand: (brandId: number) => void;
    handleAddMotorbike: (
        motorbike: Motorbike & { image?: File }
    ) => Promise<void>;
    handleEditMotorbike: (motorbike: Motorbike) => void;
    handleDeleteMotorbike: (motorbikeId: number) => void;
}

export const useMotorbikeManagement = (): UseMotorbikeManagementResult => {
    const [brands, setBrands] = useState<MotorbikeBrand[]>([]);
    const [motorbikes, setMotorbikes] = useState<Motorbike[]>([]);
    const [searchBrand, setSearchBrand] = useState<string>("");
    const [searchMotorbike, setSearchMotorbike] = useState<string>("");

    useEffect(() => {
        if (!API_URL) {
            console.error("API_URL is not defined!");
            return;
        }

        const fetchBrands = async () => {
            try {
                const response = await axios.get<MotorbikeBrand[]>(
                    `${API_URL}/motorbike-brands`
                );
                setBrands(response.data);
            } catch (error) {
                console.error("Failed to fetch brands:", error);
            }
        };

        const fetchMotorbikes = async () => {
            try {
                const response = await axios.get<Motorbike[]>(
                    `${API_URL}/motorbikes`
                );
                setMotorbikes(response.data);
            } catch (error) {
                console.error("Failed to fetch motorbikes:", error);
            }
        };

        fetchBrands();
        fetchMotorbikes();
    }, []);

    const filteredBrands = brands.filter((brand) =>
        brand.name.toLowerCase().includes(searchBrand.toLowerCase())
    );

    const filteredMotorbikes = motorbikes.filter((motorbike) =>
        motorbike.name.toLowerCase().includes(searchMotorbike.toLowerCase())
    );

    const getBrandName = (brandId: number): string => {
        const brand = brands.find((b) => b.id === brandId);
        return brand ? brand.name : "Unknown";
    };

    const handleAddBrand = async (brand: MotorbikeBrand) => {
        try {
            const response = await axios.post<MotorbikeBrand>(
                `${API_URL}/motorbike-brands`,
                brand
            );
            setBrands((prevBrands) => [...prevBrands, response.data]);
        } catch (error) {
            console.error("Failed to add brand:", error);
        }
    };

    const handleEditBrand = async (brand: MotorbikeBrand) => {
        try {
            await axios.put(`${API_URL}/motorbike-brands/${brand.id}`, brand);
            setBrands((prevBrands) =>
                prevBrands.map((b) => (b.id === brand.id ? brand : b))
            );
        } catch (error) {
            console.error("Failed to edit brand:", error);
        }
    };

    const handleDeleteBrand = async (brandId: number) => {
        try {
            await axios.delete(`${API_URL}/motorbike-brands/${brandId}`);
            setBrands((prevBrands) =>
                prevBrands.filter((brand) => brand.id !== brandId)
            );
            setMotorbikes((prevMotorbikes) =>
                prevMotorbikes.filter(
                    (motorbike) => motorbike.brand_id !== brandId
                )
            );
        } catch (error) {
            console.error("Failed to delete brand:", error);
        }
    };

    const handleAddMotorbike = async (
        motorbike: Motorbike & { image?: File }
    ) => {
        try {
            // Validate price before sending
            if (motorbike.price <= 0 || isNaN(motorbike.price)) {
                console.error("Price must be a positive number.");
                return; // Prevent further execution
            }

            const formData = new FormData();

            // Append motorbike properties to the formData
            Object.entries(motorbike).forEach(([key, value]) => {
                if (value === null || value === undefined) return;

                // If it's the image field and the value is a file, append it
                if (key === "image" && value instanceof File) {
                    formData.append("image", value);
                } else {
                    formData.append(key, value.toString());
                }
            });

            // Log the formData for debugging
            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            // Send the request with the formData containing the image
            const response = await axios.post<Motorbike>(
                `${API_URL}/motorbikes`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Motorbike added successfully:", response.data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error("Server response:", error.response?.data);
            } else {
                console.error("Failed to add motorbike:", error);
            }
        }
    };

    const handleEditMotorbike = async (motorbike: Motorbike) => {
        try {
            const formData = new FormData();
            Object.entries(motorbike).forEach(([key, value]) => {
                formData.append(key, value as string | Blob);
            });

            await axios.put(`${API_URL}/motorbikes/${motorbike.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMotorbikes((prevMotorbikes) =>
                prevMotorbikes.map((m) =>
                    m.id === motorbike.id ? motorbike : m
                )
            );
        } catch (error) {
            console.error("Failed to edit motorbike:", error);
        }
    };

    const handleDeleteMotorbike = async (motorbikeId: number) => {
        try {
            await axios.delete(`${API_URL}/motorbikes/${motorbikeId}`);
            setMotorbikes((prevMotorbikes) =>
                prevMotorbikes.filter(
                    (motorbike) => motorbike.id !== motorbikeId
                )
            );
        } catch (error) {
            console.error("Failed to delete motorbike:", error);
        }
    };

    return {
        brands,
        motorbikes,
        searchBrand,
        setSearchBrand,
        searchMotorbike,
        setSearchMotorbike,
        filteredBrands,
        filteredMotorbikes,
        getBrandName,
        handleAddBrand,
        handleEditBrand,
        handleDeleteBrand,
        handleAddMotorbike,
        handleEditMotorbike,
        handleDeleteMotorbike,
    };
};
