"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ChevronLeft,
    Heart,
    Share2,
    Calendar,
    Gauge,
    Clock,
    Award,
    MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Motorbike } from "@/types";
import { MotorbikeCard } from "./motorbike-card";
import { BookingForm } from "./booking-form";
import { getBrandName } from "@/utils/motorbike-helpers";

interface MotorbikeDetailViewProps {
    motorbike: Motorbike;
    relatedMotorbikes: Motorbike[];
    onBack: () => void;
}

export function MotorbikeDetailView({
    motorbike,
    relatedMotorbikes,
    onBack,
}: MotorbikeDetailViewProps) {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const brandName = getBrandName(motorbike);

    const imageUrl = motorbike?.image
        ? `${process.env.NEXT_PUBLIC_API_URL}/${motorbike.image.replace(
              /\\/g,
              "/"
          )}`
        : "/placeholder.svg?height=400&width=600";

    const galleryImages = [
        imageUrl,
        "/placeholder.svg?height=400&width=600&text=Side+View",
        "/placeholder.svg?height=400&width=600&text=Back+View",
    ];

    const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <div className="bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center text-sm text-gray-500">
                        <Link
                            href="/motorbikes"
                            className="hover:text-blue-600"
                        >
                            Motorbikes
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="font-medium text-gray-900">
                            {motorbike.name}
                        </span>
                    </div>
                </div>
            </div>

            <motion.div
                className="container mx-auto px-4 py-8"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
            >
                {/* Back button */}
                <motion.div variants={fadeIn} className="mb-6">
                    <Button
                        variant="ghost"
                        onClick={onBack}
                        className="flex items-center text-gray-600 hover:text-blue-600"
                    >
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Back to Motorbikes
                    </Button>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Image Gallery */}
                    <motion.div variants={fadeIn} className="space-y-4">
                        <div className="relative h-[400px] rounded-xl overflow-hidden bg-white shadow-md">
                            <Image
                                src={selectedImage || "/placeholder.svg"}
                                alt={motorbike.name}
                                fill
                                className="object-contain p-4"
                                onError={(e) => {
                                    e.currentTarget.src =
                                        "/placeholder.svg?height=400&width=600";
                                }}
                            />
                        </div>

                        <div className="flex space-x-3 overflow-x-auto pb-2">
                            {galleryImages.map((img, index) => (
                                <div
                                    key={index}
                                    className={`relative h-20 w-20 rounded-md overflow-hidden cursor-pointer border-2 ${
                                        selectedImage === img
                                            ? "border-blue-500"
                                            : "border-transparent"
                                    }`}
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <Image
                                        src={img || "/placeholder.svg"}
                                        alt={`${motorbike.name} view ${
                                            index + 1
                                        }`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Details */}
                    <motion.div variants={fadeIn} className="space-y-6">
                        <div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        {motorbike.name}
                                    </h1>
                                    <p className="text-lg text-gray-600">
                                        {brandName}
                                    </p>
                                </div>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() =>
                                            setIsFavorite(!isFavorite)
                                        }
                                        className={
                                            isFavorite ? "text-red-500" : ""
                                        }
                                    >
                                        <Heart
                                            className={`h-5 w-5 ${
                                                isFavorite ? "fill-red-500" : ""
                                            }`}
                                        />
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <Share2 className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center mt-3 mb-4">
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
                                    ({motorbike.rating?.toFixed(1) || "N/A"}) •
                                    24 reviews
                                </span>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg mb-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Rental price
                                        </p>
                                        <p className="text-3xl font-bold text-blue-600">
                                            ${motorbike.price.toFixed(2)}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            per day
                                        </p>
                                    </div>
                                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1">
                                        Available Now
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                                <Gauge className="h-5 w-5 text-blue-500 mr-3" />
                                <div>
                                    <p className="text-xs text-gray-500">
                                        Engine
                                    </p>
                                    <p className="font-medium">
                                        {motorbike.engineSize || "N/A"}cc
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                                <Calendar className="h-5 w-5 text-blue-500 mr-3" />
                                <div>
                                    <p className="text-xs text-gray-500">
                                        Year
                                    </p>
                                    <p className="font-medium">
                                        {motorbike.createdAt
                                            ? new Date(
                                                  motorbike.createdAt
                                              ).getFullYear()
                                            : "N/A"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                                <Award className="h-5 w-5 text-blue-500 mr-3" />
                                <div>
                                    <p className="text-xs text-gray-500">
                                        Brand
                                    </p>
                                    <p className="font-medium">{brandName}</p>
                                </div>
                            </div>
                            <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                                <Clock className="h-5 w-5 text-blue-500 mr-3" />
                                <div>
                                    <p className="text-xs text-gray-500">
                                        Added
                                    </p>
                                    <p className="font-medium">
                                        {new Date(
                                            motorbike.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-4 pt-4">
                            <Button
                                className="flex-1"
                                onClick={() => setIsBookingOpen(true)}
                            >
                                Book Now
                            </Button>
                            <Button variant="outline" className="flex-1">
                                Contact Dealer
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Tabs for more information */}
                <motion.div variants={fadeIn} className="mt-12">
                    <Tabs defaultValue="description">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="description">
                                Description
                            </TabsTrigger>
                            <TabsTrigger value="specifications">
                                Specifications
                            </TabsTrigger>
                            <TabsTrigger value="reviews">Reviews</TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="description"
                            className="p-6 bg-white rounded-b-lg shadow-sm mt-2"
                        >
                            <h3 className="text-lg font-semibold mb-3">
                                About this motorbike
                            </h3>
                            <p className="text-gray-600">
                                {motorbike.description ||
                                    `The ${motorbike.name} is a premium motorbike from ${brandName}, designed for both comfort and performance. 
                  With its ${motorbike.engineSize}cc engine, it delivers exceptional power and handling for all your riding needs.`}
                            </p>

                            {typeof motorbike.brand === "object" &&
                                motorbike.brand?.description && (
                                    <div className="mt-4">
                                        <h4 className="font-medium mb-2">
                                            About {brandName}
                                        </h4>
                                        <p className="text-gray-600">
                                            {motorbike.brand.description}
                                        </p>
                                    </div>
                                )}
                        </TabsContent>
                        <TabsContent
                            value="specifications"
                            className="p-6 bg-white rounded-b-lg shadow-sm mt-2"
                        >
                            <h3 className="text-lg font-semibold mb-3">
                                Technical Specifications
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">
                                            Engine
                                        </span>
                                        <span className="font-medium">
                                            {motorbike.engineSize || "N/A"}cc
                                        </span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">
                                            Brand
                                        </span>
                                        <span className="font-medium">
                                            {brandName}
                                        </span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">
                                            Year
                                        </span>
                                        <span className="font-medium">
                                            {motorbike.createdAt
                                                ? new Date(
                                                      motorbike.createdAt
                                                  ).getFullYear()
                                                : "N/A"}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">
                                            Fuel Type
                                        </span>
                                        <span className="font-medium">
                                            Gasoline
                                        </span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">
                                            Transmission
                                        </span>
                                        <span className="font-medium">
                                            Manual
                                        </span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">
                                            Max Speed
                                        </span>
                                        <span className="font-medium">
                                            180 km/h
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent
                            value="reviews"
                            className="p-6 bg-white rounded-b-lg shadow-sm mt-2"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold">
                                    Customer Reviews
                                </h3>
                                <Button variant="outline" size="sm">
                                    Write a Review
                                </Button>
                            </div>

                            <div className="space-y-6">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold mr-3">
                                                JD
                                            </div>
                                            <div>
                                                <p className="font-medium">
                                                    John Doe
                                                </p>
                                                <div className="flex items-center">
                                                    {[...Array(5)].map(
                                                        (_, i) => (
                                                            <svg
                                                                key={i}
                                                                className={`w-4 h-4 ${
                                                                    i < 5
                                                                        ? "text-yellow-400"
                                                                        : "text-gray-300"
                                                                }`}
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        )
                                                    )}
                                                    <span className="text-xs text-gray-500 ml-1">
                                                        3 months ago
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600">
                                        Amazing motorbike! The power and
                                        handling are exceptional. I rented it
                                        for a weekend trip and couldn't be
                                        happier with the experience.
                                    </p>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold mr-3">
                                                AS
                                            </div>
                                            <div>
                                                <p className="font-medium">
                                                    Alice Smith
                                                </p>
                                                <div className="flex items-center">
                                                    {[...Array(5)].map(
                                                        (_, i) => (
                                                            <svg
                                                                key={i}
                                                                className={`w-4 h-4 ${
                                                                    i < 4
                                                                        ? "text-yellow-400"
                                                                        : "text-gray-300"
                                                                }`}
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        )
                                                    )}
                                                    <span className="text-xs text-gray-500 ml-1">
                                                        1 month ago
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600">
                                        Great bike, comfortable for long rides.
                                        The only minor issue was that the pickup
                                        process took longer than expected.
                                    </p>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </motion.div>

                {/* Location */}
                <motion.div
                    variants={fadeIn}
                    className="mt-12 bg-white p-6 rounded-lg shadow-sm"
                >
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                        Pickup Location
                    </h3>
                    <div className="aspect-video bg-gray-200 rounded-lg relative overflow-hidden">
                        <Image
                            src="/placeholder.svg?height=300&width=600&text=Map+Location"
                            alt="Location map"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <p className="mt-3 text-gray-600">
                        123 Motorbike Street, City Center, 10001
                    </p>
                </motion.div>

                {/* Related Motorbikes */}
                {relatedMotorbikes.length > 0 && (
                    <motion.div variants={fadeIn} className="mt-16">
                        <h2 className="text-2xl font-bold mb-6">
                            Similar Motorbikes
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedMotorbikes.map((bike) => (
                                <MotorbikeCard key={bike.id} motorbike={bike} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </motion.div>

            {/* Booking Form Modal */}
            {isBookingOpen && (
                <BookingForm
                    motorbike={motorbike}
                    onClose={() => setIsBookingOpen(false)}
                />
            )}
        </div>
    );
}
