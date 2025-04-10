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
    ) => Promise<{ success: boolean; data?: Motorbike; error?: any }>;
    handleEditMotorbike: (
        motorbike: Motorbike & { image?: File | string }
    ) => Promise<{ success: boolean; data?: Motorbike; error?: any }>;
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

        const fetchData = async () => {
            try {
                const [brandsRes, motorbikesRes] = await Promise.all([
                    axios.get<MotorbikeBrand[]>(`${API_URL}/motorbike-brands`),
                    axios.get<Motorbike[]>(`${API_URL}/motorbikes`),
                ]);
                console.log("Motorbikes from API:", motorbikesRes.data);
                // กรอง id ซ้ำ และ id ที่เป็น undefined
                const uniqueMotorbikes = Array.from(
                    new Map(
                        motorbikesRes.data
                            .filter((m) => m.id !== undefined && m.id !== null)
                            .map((m) => [m.id, m])
                    ).values()
                );
                setBrands(brandsRes.data);
                setMotorbikes(uniqueMotorbikes);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const filteredBrands = brands.filter((brand) =>
        brand.name.toLowerCase().includes(searchBrand.toLowerCase())
    );

    const filteredMotorbikes = motorbikes.filter((motorbike) =>
        (motorbike.name || "")
            .toLowerCase()
            .includes(searchMotorbike.toLowerCase())
    );

    const getBrandName = (brandId: number): string => {
        return brands.find((b) => b.id === brandId)?.name || "Unknown";
    };

    const handleAddBrand = async (brand: MotorbikeBrand) => {
        if (!API_URL) return console.error("API_URL is not defined!");
        try {
            const res = await axios.post<MotorbikeBrand>(
                `${API_URL}/motorbike-brands`,
                brand
            );
            setBrands((prev) => [...prev, res.data]);
        } catch (error) {
            console.error("Failed to add brand:", error);
        }
    };

    const handleEditBrand = async (brand: MotorbikeBrand) => {
        if (!API_URL) return console.error("API_URL is not defined!");
        try {
            await axios.put(`${API_URL}/motorbike-brands/${brand.id}`, brand);
            setBrands((prev) =>
                prev.map((b) => (b.id === brand.id ? brand : b))
            );
        } catch (error) {
            console.error("Failed to edit brand:", error);
        }
    };

    const handleDeleteBrand = async (brandId: number) => {
        if (!API_URL) return console.error("API_URL is not defined!");
        try {
            await axios.delete(`${API_URL}/motorbike-brands/${brandId}`);
            setBrands((prev) => prev.filter((b) => b.id !== brandId));
            setMotorbikes((prev) => prev.filter((m) => m.brand_id !== brandId));
        } catch (error) {
            console.error("Failed to delete brand:", error);
        }
    };

    const handleAddMotorbike = async (
        motorbike: Motorbike & { image?: File }
    ) => {
        if (!API_URL) {
            console.error("API_URL is not defined!");
            return { success: false, error: "API_URL is not defined" };
        }
        try {
            const formData = new FormData();
            formData.append("name", motorbike.name);
            formData.append("price", motorbike.price.toString());
            formData.append("brand_id", motorbike.brand_id.toString());

            if (motorbike.image instanceof File) {
                formData.append("image", motorbike.image);
            }

            const res = await axios.post<Motorbike>(
                `${API_URL}/motorbikes`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            console.log("API Response data on Add:", res.data);

            // ใช้เฉพาะข้อมูลที่ต้องการจาก response
            const { brand, name, price, image } = res.data;

            // อัพเดต state ด้วยข้อมูลที่เลือก
            setMotorbikes((prev) => {
                return prev.map((m) =>
                    m.id === motorbike.id
                        ? { ...m, brand, name, price, image }
                        : m
                );
            });

            return { success: true, data: res.data };
        } catch (error) {
            console.error("Failed to add motorbike:", error);
            return { success: false, error };
        }
    };

    const handleEditMotorbike = async (
        motorbike: Motorbike & { image?: File | string }
    ) => {
        if (!API_URL) {
            console.error("API_URL is not defined!");
            return { success: false, error: "API_URL is not defined" };
        }
        try {
            let res;
            if (motorbike.image instanceof File) {
                // กรณีมี image ใหม่ ใช้ FormData
                const formData = new FormData();
                formData.append("name", motorbike.name);
                formData.append("price", String(motorbike.price)); // ใช้ String() เพื่อให้แน่ใจว่าเป็น string
                formData.append("brand_id", String(motorbike.brand_id));
                formData.append("image", motorbike.image);

                console.log("Data sent to edit motorbike (FormData):", {
                    name: motorbike.name,
                    price: motorbike.price,
                    brand_id: motorbike.brand_id,
                    image: motorbike.image,
                });

                res = await axios.put<Motorbike>(
                    `${API_URL}/motorbikes/${motorbike.id}`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );
            } else {
                // กรณีไม่มี image ใหม่ ใช้ JSON
                const data = {
                    name: motorbike.name,
                    price: motorbike.price, // ส่งเป็น number
                    brand_id: motorbike.brand_id, // ส่งเป็น number
                    ...(typeof motorbike.image === "string" && {
                        image: motorbike.image,
                    }), // ส่ง image ถ้ามี URL เดิม
                };

                console.log("Data sent to edit motorbike (JSON):", data);

                res = await axios.put<Motorbike>(
                    `${API_URL}/motorbikes/${motorbike.id}`,
                    data,
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                );
            }

            console.log("Edited motorbike response:", res.data);
            if (res.data.id === undefined || res.data.id === null) {
                console.error("Edited motorbike has undefined id:", res.data);
                return {
                    success: false,
                    error: "Invalid motorbike ID from server",
                };
            }
            setMotorbikes((prev) =>
                prev.map((m) =>
                    m.id === motorbike.id
                        ? {
                              ...motorbike,
                              image:
                                  motorbike.image instanceof File
                                      ? res.data.image
                                      : motorbike.image,
                          }
                        : m
                )
            );
            return { success: true, data: res.data };
        } catch (error) {
            console.error("Failed to edit motorbike:", error);
            return { success: false, error };
        }
    };

    const handleDeleteMotorbike = async (motorbikeId: number) => {
        if (!API_URL) return console.error("API_URL is not defined!");
        try {
            await axios.delete(`${API_URL}/motorbikes/${motorbikeId}`);
            setMotorbikes((prev) => prev.filter((m) => m.id !== motorbikeId));
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
