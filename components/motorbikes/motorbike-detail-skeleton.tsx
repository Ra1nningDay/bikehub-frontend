"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export function MotorbikeDetailSkeleton() {
    return (
        <div className="bg-gray-50">
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-4 mx-2" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        disabled
                        className="flex items-center text-gray-400"
                    >
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Back to Motorbikes
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Image Gallery Skeleton */}
                    <div className="space-y-4">
                        <Skeleton className="h-[400px] w-full rounded-xl" />

                        <div className="flex space-x-3">
                            <Skeleton className="h-20 w-20 rounded-md" />
                            <Skeleton className="h-20 w-20 rounded-md" />
                            <Skeleton className="h-20 w-20 rounded-md" />
                        </div>
                    </div>

                    {/* Details Skeleton */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <Skeleton className="h-8 w-64 mb-2" />
                                    <Skeleton className="h-6 w-40" />
                                </div>
                                <div className="flex space-x-2">
                                    <Skeleton className="h-10 w-10 rounded-md" />
                                    <Skeleton className="h-10 w-10 rounded-md" />
                                </div>
                            </div>

                            <div className="flex items-center mt-3 mb-4">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Skeleton
                                            key={i}
                                            className="h-5 w-5 mr-1 rounded-full"
                                        />
                                    ))}
                                </div>
                                <Skeleton className="h-4 w-24 ml-2" />
                            </div>

                            <Skeleton className="h-24 w-full rounded-lg mb-6" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[...Array(4)].map((_, i) => (
                                <Skeleton
                                    key={i}
                                    className="h-16 w-full rounded-lg"
                                />
                            ))}
                        </div>

                        <div className="flex space-x-4 pt-4">
                            <Skeleton className="h-10 flex-1 rounded-md" />
                            <Skeleton className="h-10 flex-1 rounded-md" />
                        </div>
                    </div>
                </div>

                {/* Tabs Skeleton */}
                <div className="mt-12">
                    <Skeleton className="h-10 w-full rounded-md mb-2" />
                    <Skeleton className="h-64 w-full rounded-lg" />
                </div>

                {/* Location Skeleton */}
                <div className="mt-12">
                    <Skeleton className="h-8 w-40 mb-4" />
                    <Skeleton className="h-64 w-full rounded-lg" />
                    <Skeleton className="h-6 w-64 mt-3" />
                </div>

                {/* Related Motorbikes Skeleton */}
                <div className="mt-16">
                    <Skeleton className="h-8 w-48 mb-6" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <Skeleton
                                key={i}
                                className="h-80 w-full rounded-lg"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
