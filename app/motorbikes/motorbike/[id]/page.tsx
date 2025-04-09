"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { use } from "react";
import { Motorbike } from "@/types";
import { MotorbikeDetailView } from "@/components/motorbikes/motorbike-detail-view";
import { MotorbikeDetailSkeleton } from "@/components/motorbikes/motorbike-detail-skeleton";
import { ErrorDisplay } from "@/components/motorbikes/error-display";

interface MotorbikeDetailPageProps {
    params: Promise<{ id: string }>;
}

export default function MotorbikeDetailPage({
    params: paramsPromise,
}: MotorbikeDetailPageProps) {
    const params = use(paramsPromise);
    const [motorbike, setMotorbike] = useState<Motorbike | null>(null);
    const [relatedMotorbikes, setRelatedMotorbikes] = useState<Motorbike[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

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

                // Fetch related motorbikes (same brand or similar price range)
                const brandName =
                    typeof response.data.brand === "object" &&
                    response.data.brand !== null
                        ? response.data.brand.name
                        : response.data.brand;

                const relatedResponse = await axios.get(
                    `${apiUrl}/motorbikes?limit=4&brand=${brandName}`
                );
                // Filter out the current motorbike and limit to 3 items
                const filteredRelated = relatedResponse.data
                    .filter((bike: Motorbike) => bike.id !== response.data.id)
                    .slice(0, 3);
                setRelatedMotorbikes(filteredRelated);
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

    if (loading) {
        return <MotorbikeDetailSkeleton />;
    }

    if (error || !motorbike) {
        return (
            <ErrorDisplay
                error={error || "Motorbike not found"}
                onBack={() => router.push("/motorbikes")}
            />
        );
    }

    return (
        <MotorbikeDetailView
            motorbike={motorbike}
            relatedMotorbikes={relatedMotorbikes}
            onBack={() => router.push("/motorbikes")}
        />
    );
}
