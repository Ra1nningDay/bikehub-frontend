"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Motorbike } from "@/types";
import axios from "axios";

interface MotorbikeDetailPageProps {
    params: { id: string };
}

export default function MotorbikeDetailPage({
    params,
}: MotorbikeDetailPageProps) {
    const [motorbike, setMotorbike] = useState<Motorbike | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // ดึงข้อมูลจาก API
    useEffect(() => {
        const fetchMotorbike = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                if (!apiUrl) {
                    throw new Error("API URL is not defined");
                }
                const response = await axios.get(
                    `${apiUrl}/motorbikes/${params.id}`
                );
                setMotorbike(response.data);
            } catch (err) {
                setError(
                    (err as Error).message ||
                        "Failed to fetch motorbike details"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMotorbike();
    }, [params.id]);

    // จัดการ brandName
    const brandName =
        motorbike &&
        typeof motorbike.brand === "object" &&
        motorbike.brand !== null
            ? (motorbike.brand as { name: string }).name
            : motorbike && typeof motorbike.brand === "string"
            ? motorbike.brand
            : "Unknown brand";

    // ประกอบ image URL
    const imageUrl = motorbike?.image
        ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${motorbike.image.replace(
              /\\/g,
              "/"
          )}`
        : "/placeholder.svg?height=400&width=600";

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <p>Loading motorbike details...</p>
            </div>
        );
    }

    if (error || !motorbike) {
        return (
            <div className="container mx-auto px-4 py-12">
                <p>Error: {error || "Motorbike not found"}</p>
                <Button onClick={() => router.push("/")}>Back to Home</Button>
            </div>
        );
    }

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <Button
                    variant="outline"
                    className="mb-6"
                    onClick={() => router.push("/")}
                >
                    Back to List
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* รูปภาพ */}
                    <div className="relative h-96">
                        <Image
                            src={imageUrl}
                            alt={motorbike.name}
                            fill
                            className="object-cover rounded-lg"
                            onError={(e) => {
                                e.currentTarget.src =
                                    "/placeholder.svg?height=400&width=600";
                            }}
                        />
                    </div>

                    {/* รายละเอียด */}
                    <div>
                        <h1 className="text-3xl font-bold mb-2">
                            {motorbike.name}
                        </h1>
                        <p className="text-lg text-gray-600 mb-4">
                            {brandName}
                        </p>

                        <div className="flex items-center mb-4">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-5 h-5 ${
                                        i < (motorbike.rating || 0)
                                            ? "text-yellow-400"
                                            : "text-gray-300"
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                            <span className="ml-2 text-sm text-gray-500">
                                ({motorbike.rating?.toFixed(1) || "N/A"})
                            </span>
                        </div>

                        <p className="text-2xl font-semibold text-blue-600 mb-4">
                            ${motorbike.price.toFixed(2)} / day
                        </p>

                        <div className="space-y-2 mb-6">
                            <p>
                                <strong>Engine Size:</strong>{" "}
                                {motorbike.engineSize || "N/A"}cc
                            </p>
                            <p>
                                <strong>Year:</strong>{" "}
                                {motorbike.createdAt
                                    ? new Date(
                                          motorbike.createdAt
                                      ).getFullYear()
                                    : "N/A"}
                            </p>
                            <p>
                                <strong>Created At:</strong>{" "}
                                {new Date(
                                    motorbike.createdAt
                                ).toLocaleDateString()}
                            </p>
                            {typeof motorbike.brand === "object" &&
                                motorbike.brand?.description && (
                                    <p>
                                        <strong>Brand Description:</strong>{" "}
                                        {motorbike.brand.description}
                                    </p>
                                )}
                        </div>

                        <div className="flex space-x-4">
                            <Button className="flex-1">Book Now</Button>
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => router.push("/")}
                            >
                                Back
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
