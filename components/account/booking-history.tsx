"use client";

import { useEffect, useState } from "react";
import { useUserBookings } from "@/hooks/booking/use-user-bookings";
import { BookingCard } from "./booking-card";
import { BookingDetailsModal } from "./booking-details-modal";
import { CancelBookingDialog } from "./cancel-booking-dialog";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Booking } from "@/types";

export function BookingHistory() {
    const { bookings, selectedBooking, isLoading, error, setSelectedBooking } =
        useUserBookings();
    const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("newest");
    const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(
        null
    );

    useEffect(() => {
        if (bookings) {
            let filtered = [...bookings];

            // Apply search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                filtered = filtered.filter(
                    (booking) =>
                        booking.motorbike?.name.toLowerCase().includes(query) ||
                        booking.pickup_location.toLowerCase().includes(query) ||
                        booking.id.toLowerCase().includes(query)
                );
            }

            // Apply sorting
            filtered.sort((a, b) => {
                switch (sortOption) {
                    case "newest":
                        return (
                            new Date(b.created_at).getTime() -
                            new Date(a.created_at).getTime()
                        );
                    case "oldest":
                        return (
                            new Date(a.created_at).getTime() -
                            new Date(b.created_at).getTime()
                        );
                    case "price-high-low":
                        return b.total_price - a.total_price;
                    case "price-low-high":
                        return a.total_price - b.total_price;
                    default:
                        return 0;
                }
            });

            setFilteredBookings(filtered);
        }
    }, [bookings, searchQuery, sortOption]);

    const handleOpenDetails = (booking: Booking) => {
        setSelectedBooking(booking);
    };

    const handleCloseDetails = () => {
        setSelectedBooking(null);
    };

    const handleCancelBooking = (booking: Booking) => {
        setBookingToCancel(booking);
    };

    const getUpcomingBookings = () => {
        return filteredBookings.filter(
            (booking) =>
                new Date(booking.pickup_date) > new Date() &&
                booking.status !== "cancelled"
        );
    };

    const getPastBookings = () => {
        return filteredBookings.filter(
            (booking) =>
                new Date(booking.pickup_date) <= new Date() ||
                booking.status === "cancelled"
        );
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-12">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    if (bookings.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                    No Bookings Found
                </h3>
                <p className="text-gray-500 mb-6">
                    You haven't made any bookings yet.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Search bookings..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="price-high-low">
                            Price: High to Low
                        </SelectItem>
                        <SelectItem value="price-low-high">
                            Price: Low to High
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="mb-6">
                    <TabsTrigger value="upcoming">
                        Upcoming Bookings
                    </TabsTrigger>
                    <TabsTrigger value="past">Past Bookings</TabsTrigger>
                    <TabsTrigger value="all">All Bookings</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming">
                    <div className="space-y-4">
                        {getUpcomingBookings().length === 0 ? (
                            <p className="text-center py-8 text-gray-500">
                                No upcoming bookings found.
                            </p>
                        ) : (
                            getUpcomingBookings().map((booking) => (
                                <BookingCard
                                    key={booking.id}
                                    booking={booking}
                                    onViewDetails={() =>
                                        handleOpenDetails(booking)
                                    }
                                    onCancelBooking={() =>
                                        handleCancelBooking(booking)
                                    }
                                />
                            ))
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="past">
                    <div className="space-y-4">
                        {getPastBookings().length === 0 ? (
                            <p className="text-center py-8 text-gray-500">
                                No past bookings found.
                            </p>
                        ) : (
                            getPastBookings().map((booking) => (
                                <BookingCard
                                    key={booking.id}
                                    booking={booking}
                                    onViewDetails={() =>
                                        handleOpenDetails(booking)
                                    }
                                    onCancelBooking={() =>
                                        handleCancelBooking(booking)
                                    }
                                />
                            ))
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="all">
                    <div className="space-y-4">
                        {filteredBookings.map((booking) => (
                            <BookingCard
                                key={booking.id}
                                booking={booking}
                                onViewDetails={() => handleOpenDetails(booking)}
                                onCancelBooking={() =>
                                    handleCancelBooking(booking)
                                }
                            />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>

            {selectedBooking && (
                <BookingDetailsModal
                    booking={selectedBooking}
                    onClose={handleCloseDetails}
                    onCancel={handleCancelBooking}
                />
            )}

            {bookingToCancel && (
                <CancelBookingDialog
                    booking={bookingToCancel}
                    onClose={() => setBookingToCancel(null)}
                />
            )}
        </div>
    );
}
