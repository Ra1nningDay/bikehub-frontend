"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileInfo } from "@/components/account/profile-info";
import { BookingHistory } from "@/components/account/booking-history";
import { PageHeader } from "@/components/account/page-header";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/auth/use-auth";

export default function AccountPage() {
    const { user, isAuthenticated, fetchUserProfile, isLoading, error } =
        useAuth();
    const router = useRouter();
    const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

    // Load user profile if authenticated and not yet fetched
    useEffect(() => {
        if (isAuthenticated && !user && !isLoading) {
            setHasAttemptedFetch(true);
            fetchUserProfile();
        }
    }, [isAuthenticated, user, isLoading, fetchUserProfile]);

    // Redirect logic with better timing control
    useEffect(() => {
        // ถ้าไม่ authenticated หรือไม่มี user หลังจากที่พยายามโหลด
        if (!isAuthenticated || !user) {
            router.push("/"); // Redirect ไปหน้า login
        }
    }, [isAuthenticated, user, isLoading, router, hasAttemptedFetch]);

    // แสดง loading spinner ขณะโหลด
    if (isLoading || (isAuthenticated && !user && !hasAttemptedFetch)) {
        return (
            <div className="container mx-auto px-4 py-16 flex justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    // แสดง error ถ้ามี
    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        );
    }

    // ถ้าไม่มี user และพยายามโหลดแล้ว ไม่แสดงอะไร (จะ redirect)
    if (!user && hasAttemptedFetch) {
        return null;
    }

    // แสดงหน้า account ถ้าทุกอย่างพร้อม
    return (
        <div className="bg-gray-50 min-h-screen">
            <PageHeader title="My Account" />

            <div className="container mx-auto px-4 py-8">
                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="mb-8">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="bookings">
                            Booking History
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile">
                        <ProfileInfo user={user} />
                    </TabsContent>

                    <TabsContent value="bookings">
                        <BookingHistory userId={user?.id || ""} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
