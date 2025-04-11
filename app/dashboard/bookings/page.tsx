// app/bookings/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingList } from "@/components/dashboard/bookings/booking-list";
import { BookingForm } from "@/components/dashboard/bookings/booking-form";
import { MotorbikeList } from "@/components/dashboard/motorbikes/motorbike-list";
import { useBookingManagement } from "@/hooks/booking/use-booking-management";
import { toast } from "react-toastify";

interface BookingFormData {
    id: number;
    user_id: number;
    motorbike_id: number;
    start_date: string;
    end_date: string;
    status: "pending" | "confirmed" | "canceled";
}

export default function BookingsPage() {
    const {
        bookings,
        motorbikes,
        users,
        searchBooking,
        setSearchBooking,
        filteredBookings,
        getUserName,
        getMotorbikeName,
        handleAddBooking,
        handleEditBooking,
        handleDeleteBooking,
    } = useBookingManagement();

    const [bookingForm, setBookingForm] = useState<BookingFormData>({
        id: 0,
        user_id: users[0]?.id || 0,
        motorbike_id: motorbikes[0]?.id || 0,
        start_date: "",
        end_date: "",
        status: "pending",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    // Update form defaults when users/motorbikes load
    useEffect(() => {
        if (users.length > 0 && bookingForm.user_id === 0) {
            setBookingForm((prev) => ({ ...prev, user_id: users[0].id }));
        }
        if (motorbikes.length > 0 && bookingForm.motorbike_id === 0) {
            setBookingForm((prev) => ({
                ...prev,
                motorbike_id: motorbikes[0].id,
            }));
        }
    }, [users, motorbikes, bookingForm.user_id, bookingForm.motorbike_id]);

    const onAddBooking = () => {
        setIsEditing(false);
        setBookingForm({
            id: 0,
            user_id: users[0]?.id || 0,
            motorbike_id: motorbikes[0]?.id || 0,
            start_date: "",
            end_date: "",
            status: "pending",
        });
        setDialogOpen(true);
    };

    const onEditBooking = (booking: BookingFormData) => {
        setIsEditing(true);
        setBookingForm(booking);
        setDialogOpen(true);
    };

    const onSaveBooking = async () => {
        if (
            !bookingForm.user_id ||
            !bookingForm.motorbike_id ||
            !bookingForm.start_date ||
            !bookingForm.end_date
        ) {
            toast.error("Please fill in all required fields.");
            return;
        }
        if (new Date(bookingForm.end_date) < new Date(bookingForm.start_date)) {
            toast.error("End date must be after start date.");
            return;
        }

        const result = isEditing
            ? await handleEditBooking(bookingForm)
            : await handleAddBooking({
                  user_id: bookingForm.user_id,
                  motorbike_id: bookingForm.motorbike_id,
                  start_date: bookingForm.start_date,
                  end_date: bookingForm.end_date,
                  status: bookingForm.status,
              });

        if (result.success) {
            toast.success(isEditing ? "Booking updated!" : "Booking added!");
            setDialogOpen(false);
        } else {
            toast.error("Failed to save booking.");
        }
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">
                    Booking Management
                </h2>
            </div>

            <Tabs defaultValue="bookings" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="bookings">Bookings</TabsTrigger>{" "}
                </TabsList>

                <TabsContent value="bookings" className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search bookings by user or motorbike..."
                                className="pl-8"
                                value={searchBooking}
                                onChange={(e) =>
                                    setSearchBooking(e.target.value)
                                }
                            />
                        </div>
                        <Button onClick={onAddBooking}>
                            <Plus className="mr-2 h-4 w-4" /> Add Booking
                        </Button>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Bookings</CardTitle>
                            <CardDescription>
                                Manage your booking records
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <BookingList
                                bookings={filteredBookings}
                                getUserName={getUserName}
                                getMotorbikeName={getMotorbikeName}
                                onEdit={onEditBooking}
                                onDelete={handleDeleteBooking}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <BookingForm
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                form={bookingForm}
                setForm={setBookingForm}
                onSave={onSaveBooking}
                isEditing={isEditing}
                motorbikes={motorbikes}
                users={users}
            />
        </>
    );
}
